import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Generate a random 6-character room code
function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Create a shuffled deck
function createDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
  const deck = []

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(`${rank}_of_${suit}`)
    }
  }

  // Shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }

  return deck
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !supabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from Prisma
    const user = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    const body = await request.json()
    const { maxPlayers = 4 } = body

    // Generate unique room code
    let code = generateRoomCode()
    let existingGame = await prisma.game.findUnique({ where: { code } })

    // Keep generating until we get a unique code
    while (existingGame) {
      code = generateRoomCode()
      existingGame = await prisma.game.findUnique({ where: { code } })
    }

    // Create the game with the creator as the first participant
    const game = await prisma.game.create({
      data: {
        code,
        maxPlayers,
        currentPlayers: 1,
        deck: createDeck(),
        discardPile: [],
        createdBy: user.id,
        participants: {
          create: {
            userId: user.id,
            position: 0,
            hand: [],
            isReady: true,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    })

    return NextResponse.json({ game }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating game:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
