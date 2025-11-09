import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') || '/play'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Sync user to Prisma database after successful authentication
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()

      if (supabaseUser) {
        try {
          // Check if user already exists in Prisma
          let user = await prisma.user.findUnique({
            where: { supabaseId: supabaseUser.id },
          })

          // If user doesn't exist, create them
          if (!user) {
            await prisma.user.create({
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
            await prisma.user.update({
              where: { id: user.id },
              data: {
                email: supabaseUser.email,
                name: supabaseUser.user_metadata?.full_name || user.name,
                avatarUrl: supabaseUser.user_metadata?.avatar_url || user.avatarUrl,
                lastPlayedAt: new Date(),
              },
            })
          }
        } catch (error) {
          console.error('Error syncing user to Prisma:', error)
          // Continue with redirect even if sync fails
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}${redirectTo}`)
}
