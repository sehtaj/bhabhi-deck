'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormInput } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { GradientText } from '@/components/ui/gradient-text'
import { Icon } from '@iconify/react'

// Avatar options - using Iconify icons
const AVATAR_OPTIONS = [
  'solar:user-bold-duotone',
  'solar:user-id-bold-duotone',
  'solar:user-circle-bold-duotone',
  'solar:ghost-bold-duotone',
  'solar:mask-happly-bold-duotone',
  'solar:smile-circle-bold-duotone',
  'solar:heart-bold-duotone',
  'solar:star-bold-duotone',
  'solar:sun-bold-duotone',
  'solar:moon-bold-duotone',
  'solar:fire-bold-duotone',
  'solar:snowflake-bold-duotone',
]

export default function SetupUsernamePage() {
  const [username, setUsername] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate username (alphanumeric, underscore, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    if (!usernameRegex.test(username)) {
      setError('Username must be 3-20 characters and contain only letters, numbers, and underscores')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/set-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, avatarUrl: selectedAvatar }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to set username')
      }

      // Get redirect destination from query params, default to home
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get('redirectTo') || '/'

      router.push(redirectTo)
      router.refresh()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="p-10 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-950/50 border-2 border-red-800/50 flex items-center justify-center">
                <Icon icon={selectedAvatar} className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                <GradientText variant="red">
                  Create Your Profile
                </GradientText>
              </h1>
              <p className="text-zinc-400">
                Choose your username and avatar
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Choose Avatar
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                        ${selectedAvatar === avatar
                          ? 'bg-red-950/70 border-red-600 scale-105'
                          : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                        }`}
                    >
                      <Icon icon={avatar} className={`w-6 h-6 ${selectedAvatar === avatar ? 'text-red-500' : 'text-zinc-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-2">
                  Username
                </label>
                <FormInput
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="text-base"
                  required
                  minLength={3}
                  maxLength={20}
                />
                <p className="text-xs text-zinc-500 mt-2">
                  3-20 characters, letters, numbers, and underscores only
                </p>
              </div>

              {error && <Alert variant="error">{error}</Alert>}

              <Button
                type="submit"
                disabled={loading || !username.trim()}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 text-base font-medium"
              >
                {loading ? (
                  <>
                    <Icon icon="solar:loading-bold" className="mr-2 h-5 w-5 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    Continue
                    <Icon icon="solar:alt-arrow-right-bold" className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
