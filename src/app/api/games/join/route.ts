import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
    const { code } = body

    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 })
    }

    // Find the game
    const game = await prisma.game.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        participants: true,
      },
    })

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 })
    }

    // Check if game is full
    if (game.currentPlayers >= game.maxPlayers) {
      return NextResponse.json({ error: 'Game is full' }, { status: 400 })
    }

    // Check if game has already started
    if (game.status !== 'waiting') {
      return NextResponse.json({ error: 'Game has already started' }, { status: 400 })
    }

    // Check if user is already in the game
    const existingParticipant = game.participants.find((p) => p.userId === user.id)
    if (existingParticipant) {
      return NextResponse.json({ error: 'You are already in this game' }, { status: 400 })
    }

    // Find the next available position
    const occupiedPositions = game.participants.map((p) => p.position)
    let nextPosition = 0
    for (let i = 0; i < game.maxPlayers; i++) {
      if (!occupiedPositions.includes(i)) {
        nextPosition = i
        break
      }
    }

    // Add user to the game
    const updatedGame = await prisma.game.update({
      where: { id: game.id },
      data: {
        currentPlayers: game.currentPlayers + 1,
        participants: {
          create: {
            userId: user.id,
            position: nextPosition,
            hand: [],
            isReady: false,
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

    return NextResponse.json({ game: updatedGame }, { status: 200 })
  } catch (error: any) {
    console.error('Error joining game:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
