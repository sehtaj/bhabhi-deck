'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  user: any
  currentPath: string
}

export default function AuthGuard({ children, user, currentPath }: AuthGuardProps) {
  const router = useRouter()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              Authentication Required
            </h2>

            <p className="text-muted-foreground mb-6">
              You must be logged in to access this page.
            </p>

            <button
              onClick={() => router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium transition-colors"
            >
              Login to Continue
            </button>

            <button
              onClick={() => router.push('/')}
              className="mt-3 w-full bg-background border border-input text-foreground py-3 px-6 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
