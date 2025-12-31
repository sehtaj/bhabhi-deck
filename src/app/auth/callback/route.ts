import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') || '/play'

  console.log('[AUTH CALLBACK] Starting auth callback...')
  console.log('[AUTH CALLBACK] Code:', code ? 'Present' : 'Missing')
  console.log('[AUTH CALLBACK] RedirectTo:', redirectTo)

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[AUTH CALLBACK] Error exchanging code for session:', error)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    console.log('[AUTH CALLBACK] Session exchange successful')

    // Sync user to Prisma database after successful authentication
    const { data: { user: supabaseUser } } = await supabase.auth.getUser()

    if (supabaseUser) {
      console.log('[AUTH CALLBACK] Supabase user found:', supabaseUser.email)

      try {
        // Check if user already exists in Prisma
        let user = await prisma.user.findUnique({
          where: { supabaseId: supabaseUser.id },
        })

        console.log('[AUTH CALLBACK] Prisma user lookup result:', user ? 'Found' : 'Not found')

        // If user doesn't exist, create them without username
        if (!user) {
          console.log('[AUTH CALLBACK] Creating new user in Prisma...')

          // Determine auth provider from user metadata
          const authProvider = supabaseUser.app_metadata?.provider ||
                              (supabaseUser.user_metadata?.provider) ||
                              'email'

          user = await prisma.user.create({
            data: {
              supabaseId: supabaseUser.id,
              email: supabaseUser.email,
              name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Anonymous',
              avatarUrl: supabaseUser.user_metadata?.avatar_url,
              authProvider: authProvider,
            },
          })
          console.log('[AUTH CALLBACK] New user created:', user.id, 'Provider:', authProvider)
        } else {
          console.log('[AUTH CALLBACK] Updating existing user...')
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
          console.log('[AUTH CALLBACK] User updated')
        }

        // Check if user needs to set up username
        console.log('[AUTH CALLBACK] Checking username:', user.username ? 'Has username' : 'No username')
        if (!user.username) {
          const setupUrl = `${origin}/setup-username?redirectTo=${encodeURIComponent(redirectTo)}`
          console.log('[AUTH CALLBACK] Redirecting to setup-username:', setupUrl)
          return NextResponse.redirect(setupUrl)
        }
      } catch (error) {
        console.error('[AUTH CALLBACK] Error syncing user to Prisma:', error)
        // Continue with redirect even if sync fails
      }
    } else {
      console.log('[AUTH CALLBACK] No Supabase user found after session exchange')
    }
  }

  console.log('[AUTH CALLBACK] Falling through to default redirect:', `${origin}${redirectTo}`)
  return NextResponse.redirect(`${origin}${redirectTo}`)
}
