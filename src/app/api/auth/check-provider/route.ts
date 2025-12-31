import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists in our database and what auth provider they use
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        authProvider: true,
      },
    })

    if (!user) {
      return NextResponse.json({
        exists: false,
        authProvider: null,
      })
    }

    return NextResponse.json({
      exists: true,
      authProvider: user.authProvider, // "email" | "google" | null
    })

  } catch (error: any) {
    console.error('[CHECK-PROVIDER] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check provider' },
      { status: 500 }
    )
  }
}
