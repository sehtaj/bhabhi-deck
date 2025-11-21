import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()

    if (error || !supabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user exists and has username set
    const user = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
      select: { username: true, id: true },
    })

    return NextResponse.json({
      hasUsername: !!user?.username,
      userId: user?.id,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error checking username:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
