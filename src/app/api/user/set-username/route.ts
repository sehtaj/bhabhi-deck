import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()

    if (error || !supabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { username, avatarUrl } = body

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' },
        { status: 400 }
      )
    }

    // Check if user exists in Prisma
    let user = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    // Check if username is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser && existingUser.supabaseId !== supabaseUser.id) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 409 })
    }

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          supabaseId: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Anonymous',
          username,
          avatarUrl: avatarUrl || supabaseUser.user_metadata?.avatar_url,
        },
      })
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          ...(avatarUrl && { avatarUrl }),
        },
      })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    console.error('Error setting username:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
