export interface User {
  id: number
  name: string
  username: string | null
  email: string | null
  avatarUrl: string | null
}

export interface Participant {
  id: number
  userId: number
  gameId: number
  position: number
  isReady: boolean
  hand: string[]
  isWinner: boolean | null
  rank: number | null
  user: User
}

export interface Game {
  id: number
  code: string
  status: 'waiting' | 'in_progress' | 'finished'
  currentPlayers: number
  maxPlayers: number
  deck: string[]
  discardPile: string[]
  currentTurn: number | null
  createdBy: number
  createdAt: Date | string
  updatedAt: Date | string
  participants: Participant[]
  creator: User
}
