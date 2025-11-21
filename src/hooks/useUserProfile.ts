'use client'

import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

interface UserProfile {
  id: number
  username: string | null
  name: string
  email: string | null
  avatarUrl: string | null
}

export function useUserProfile() {
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/sync', {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user profile')
        }

        const data = await response.json()
        setProfile(data.user)
        setError(null)
      } catch (err) {
        console.error('Error fetching user profile:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchProfile()
    }
  }, [user, authLoading])

  return { profile, loading: loading || authLoading, error }
}
