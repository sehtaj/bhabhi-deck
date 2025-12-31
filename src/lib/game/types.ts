/**
 * Core game types for Bhabhi card game
 * Based on GAME-RULES.md specification
 */

export type Suit = "spades" | "hearts" | "diamonds" | "clubs";

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
// J=11, Q=12, K=13, A=14

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface Player {
  id: number;        // userId
  hand: Card[];
  hasFinished: boolean;
  position: number;
}

export interface TrickCard {
  userId: number;
  card: Card;
  order: number;     // Play order in trick
}

export interface Trick {
  leaderId: number;  // userId who led the trick
  leadSuit: Suit;
  playedCards: TrickCard[];
}

export interface GameState {
  gameId: number;
  trickNumber: number;
  firstTrickCompleted: boolean;
  currentTurn: number;        // userId
  playerWithPower: number;    // userId who leads next trick
  currentTrick: Trick | null;
  wastePile: Card[];
  players: Player[];
  turnOrder: number[];        // Array of userIds in play order
}

/**
 * Result of playing a card
 */
export interface PlayCardResult {
  success: boolean;
  error?: string;
  trickEnded?: boolean;
  trickWinner?: number;      // userId
  gameEnded?: boolean;
  bhabhi?: number;           // userId of loser
  nextTurn?: number;         // userId
}

/**
 * Card string format: "rank_of_suit" (e.g., "ace_of_spades", "10_of_hearts")
 */
export type CardString = string;

/**
 * Convert between Card object and string representation
 */
export function cardToString(card: Card): CardString {
  const rankNames: Record<Rank, string> = {
    2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10",
    11: "jack", 12: "queen", 13: "king", 14: "ace"
  };
  return `${rankNames[card.rank]}_of_${card.suit}`;
}

export function stringToCard(str: CardString): Card {
  const parts = str.split("_of_");
  const rankStr = parts[0];
  const suit = parts[1] as Suit;

  const rankMap: Record<string, Rank> = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "jack": 11, "queen": 12, "king": 13, "ace": 14
  };

  return {
    suit,
    rank: rankMap[rankStr]
  };
}
