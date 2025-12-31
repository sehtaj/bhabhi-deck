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
  hasFinished: boolean
  hand: string[]
  rank: number | null
  user: User
}

export interface Game {
  id: number
  code: string
  status: 'waiting' | 'in_progress' | 'finished'
  currentPlayers: number
  maxPlayers: number
  currentTurn: number | null
  playerWithPower: number | null
  turnOrder: number[] | null
  trickNumber: number
  firstTrickCompleted: boolean
  currentTrickLeader: number | null
  currentTrickSuit: string | null
  currentTrickCards: any[] | null
  wastePile: string[]
  createdBy: number
  createdAt: Date | string
  participants: Participant[]
  creator: User
}
