'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Game } from '@/types/game'
import type { RealtimeChannel } from '@supabase/supabase-js'

export function useGameRealtime(gameId: number | null) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const supabase = useMemo(() => createClient(), [])

  const fetchGame = useCallback(async () => {
    if (!gameId) {
      setGame(null)
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/games/${gameId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch game')
      }

      const data = await response.json()
      setGame(data.game)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [gameId])

  useEffect(() => {
    if (!gameId) {
      setLoading(false)
      return
    }

    // Initial fetch
    fetchGame()

    // Set up realtime subscription
    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Game',
          filter: `id=eq.${gameId}`,
        },
        () => {
          fetchGame()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Participant',
          filter: `gameId=eq.${gameId}`,
        },
        () => {
          fetchGame()
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setIsConnected(false)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [gameId, fetchGame, supabase])

  return { game, loading, error, isConnected, refetch: fetchGame }
}
