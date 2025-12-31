import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createDeck, dealCards, findAceOfSpadesHolder, cardsToStrings } from '@/lib/game/utils'

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !supabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    const gameId = parseInt(params.gameId)

    if (isNaN(gameId)) {
      return NextResponse.json({ error: 'Invalid game ID' }, { status: 400 })
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        participants: {
          orderBy: { position: 'asc' },
        },
      },
    })

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 })
    }

    if (game.createdBy !== user.id) {
      return NextResponse.json({ error: 'Only the room creator can start the game' }, { status: 403 })
    }

    if (game.status !== 'waiting') {
      return NextResponse.json({ error: 'Game has already started' }, { status: 400 })
    }

    if (game.currentPlayers < 2) {
      return NextResponse.json({ error: 'Need at least 2 players to start' }, { status: 400 })
    }

    if (game.currentPlayers > 8) {
      return NextResponse.json({ error: 'Maximum 8 players allowed' }, { status: 400 })
    }

    const allReady = game.participants.every(p => p.isReady)
    if (!allReady) {
      return NextResponse.json({ error: 'All players must be ready' }, { status: 400 })
    }

    // Initialize game: shuffle and deal cards
    const deck = createDeck()
    const hands = dealCards(deck, game.currentPlayers)

    // Convert hands to players with Cards format for finding Ace of Spades
    const playersWithHands = game.participants.map((p, index) => ({
      id: p.userId,
      hand: hands[index],
    }))

    // Find player with Ace of Spades (they start the game)
    const firstPlayerId = findAceOfSpadesHolder(playersWithHands)

    if (!firstPlayerId) {
      return NextResponse.json({ error: 'Failed to find Ace of Spades holder' }, { status: 500 })
    }

    // Create turn order (clockwise from first player)
    const turnOrder = game.participants.map(p => p.userId)

    // Update game and participants in transaction
    await prisma.$transaction(async (tx) => {
      // Update each participant's hand
      for (let i = 0; i < game.participants.length; i++) {
        await tx.participant.update({
          where: {
            gameId_userId: {
              gameId: gameId,
              userId: game.participants[i].userId,
            },
          },
          data: {
            hand: cardsToStrings(hands[i]),
            hasFinished: false,
          },
        })
      }

      // Update game state
      await tx.game.update({
        where: { id: gameId },
        data: {
          status: 'in_progress',
          startedAt: new Date(),
          currentTurn: firstPlayerId,
          playerWithPower: firstPlayerId,
          turnOrder: turnOrder,
          trickNumber: 0,
          firstTrickCompleted: false,
          currentTrickLeader: null,
          currentTrickSuit: null,
          wastePile: [],
        },
      })
    })

    // Fetch updated game to return
    const updatedGame = await prisma.game.findUnique({
      where: { id: gameId },
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
          orderBy: {
            position: 'asc',
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    })

    return NextResponse.json({ game: updatedGame }, { status: 200 })
  } catch (error: any) {
    console.error('Error starting game:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
