import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function PATCH(
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

    const body = await request.json()
    const { isReady } = body

    if (typeof isReady !== 'boolean') {
      return NextResponse.json({ error: 'isReady must be a boolean' }, { status: 400 })
    }

    const participant = await prisma.participant.findFirst({
      where: {
        gameId: gameId,
        userId: user.id,
      },
    })

    if (!participant) {
      return NextResponse.json({ error: 'You are not in this game' }, { status: 404 })
    }

    await prisma.participant.update({
      where: { id: participant.id },
      data: { isReady },
    })

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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
