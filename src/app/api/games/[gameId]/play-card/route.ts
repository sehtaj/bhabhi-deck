import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { playCard } from '@/lib/game/engine'
import { GameState, Player, stringToCard, cardToString } from '@/lib/game/types'
import { cardsToStrings, stringsToCards } from '@/lib/game/utils'

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    // Authenticate user
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Parse request body
    const body = await request.json()
    const { cardString } = body // Format: "ace_of_spades"

    if (!cardString) {
      return NextResponse.json({ error: 'Card is required' }, { status: 400 })
    }

    // Get game with participants
    const game = await prisma.game.findUnique({
      where: { id: parseInt(params.gameId) },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { position: 'asc' },
        },
      },
    })

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 })
    }

    if (game.status !== 'in_progress') {
      return NextResponse.json({ error: 'Game is not in progress' }, { status: 400 })
    }

    // Build game state from database
    const players: Player[] = game.participants.map(p => ({
      id: p.userId,
      hand: stringsToCards(p.hand as string[]),
      hasFinished: p.hasFinished,
      position: p.position,
    }))

    const currentTrick = game.currentTrickCards && (game.currentTrickCards as any[]).length > 0
      ? {
          leaderId: game.currentTrickLeader!,
          leadSuit: game.currentTrickSuit as any,
          playedCards: (game.currentTrickCards as any[]).map(tc => ({
            userId: tc.userId,
            card: stringToCard(tc.card),
            order: tc.order,
          })),
        }
      : null

    const gameState: GameState = {
      gameId: game.id,
      trickNumber: game.trickNumber,
      firstTrickCompleted: game.firstTrickCompleted,
      currentTurn: game.currentTurn!,
      playerWithPower: game.playerWithPower!,
      currentTrick,
      wastePile: stringsToCards((game.wastePile as string[]) || []),
      players,
      turnOrder: game.turnOrder as number[],
    }

    // Play the card
    const card = stringToCard(cardString)
    const { newState, result } = playCard(gameState, dbUser.id, card)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Update database with new state
    await prisma.$transaction(async (tx) => {
      // Update participant hands and hasFinished status
      for (const player of newState.players) {
        await tx.participant.update({
          where: {
            gameId_userId: {
              gameId: game.id,
              userId: player.id,
            },
          },
          data: {
            hand: cardsToStrings(player.hand),
            hasFinished: player.hasFinished,
          },
        })
      }

      // Update game state
      const gameUpdateData: any = {
        currentTurn: newState.currentTurn,
        playerWithPower: newState.playerWithPower,
        trickNumber: newState.trickNumber,
        firstTrickCompleted: newState.firstTrickCompleted,
        wastePile: cardsToStrings(newState.wastePile),
        status: result.gameEnded ? 'finished' : 'in_progress',
      };

      if (newState.currentTrick) {
        gameUpdateData.currentTrickLeader = newState.currentTrick.leaderId;
        gameUpdateData.currentTrickSuit = newState.currentTrick.leadSuit;
        gameUpdateData.currentTrickCards = newState.currentTrick.playedCards.map(tc => ({
          userId: tc.userId,
          card: cardToString(tc.card),
          order: tc.order,
        }));
      } else {
        gameUpdateData.currentTrickLeader = null;
        gameUpdateData.currentTrickSuit = null;
        gameUpdateData.currentTrickCards = null;
      }

      if (result.gameEnded) {
        gameUpdateData.endedAt = new Date();
      }

      await tx.game.update({
        where: { id: game.id },
        data: gameUpdateData,
      })

      // If game ended, assign final ranks
      if (result.gameEnded && result.bhabhi) {
        const finishedPlayers = newState.players.filter(p => p.hasFinished && p.id !== result.bhabhi)

        // Assign ranks to finished players: 1, 2, 3...
        for (let i = 0; i < finishedPlayers.length; i++) {
          await tx.participant.update({
            where: {
              gameId_userId: {
                gameId: game.id,
                userId: finishedPlayers[i].id,
              },
            },
            data: {
              rank: i + 1,
            },
          })
        }

        // Bhabhi gets last rank
        await tx.participant.update({
          where: {
            gameId_userId: {
              gameId: game.id,
              userId: result.bhabhi,
            },
          },
          data: {
            rank: finishedPlayers.length + 1,
          },
        })
      }
    })

    return NextResponse.json({
      success: true,
      result: {
        ...result,
        gameState: {
          currentTurn: newState.currentTurn,
          playerWithPower: newState.playerWithPower,
          trickEnded: result.trickEnded,
          gameEnded: result.gameEnded,
          bhabhi: result.bhabhi,
        },
      },
    })
  } catch (error) {
    console.error('Error playing card:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
