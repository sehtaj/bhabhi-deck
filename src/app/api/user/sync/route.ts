import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()

    if (error || !supabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already exists in Prisma
    let user = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    // If user doesn't exist, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          supabaseId: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Anonymous',
          username: supabaseUser.user_metadata?.username || supabaseUser.email?.split('@')[0],
          avatarUrl: supabaseUser.user_metadata?.avatar_url,
        },
      })
    } else {
      // Update user info if it changed
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name || user.name,
          avatarUrl: supabaseUser.user_metadata?.avatar_url || user.avatarUrl,
          lastPlayedAt: new Date(),
        },
      })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    console.error('Error syncing user:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
