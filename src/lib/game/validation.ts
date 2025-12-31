/**
 * Game rule validation
 * All functions are pure and return validation results
 */

import { Card, GameState, Player, Suit } from "./types";
import { hasCard, hasSuit, cardsEqual } from "./utils";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate if a player can play a specific card
 */
export function validateCardPlay(
  gameState: GameState,
  playerId: number,
  card: Card
): ValidationResult {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) {
    return { valid: false, error: "Player not found" };
  }

  // Check if player has finished
  if (player.hasFinished) {
    return { valid: false, error: "You have already finished" };
  }

  // Check if it's player's turn
  if (gameState.currentTurn !== playerId) {
    return { valid: false, error: "Not your turn" };
  }

  // Check if player has the card
  if (!hasCard(player.hand, card)) {
    return { valid: false, error: "You don't have this card" };
  }

  // First trick, first card MUST be Ace of Spades
  if (gameState.trickNumber === 0 && !gameState.currentTrick) {
    const aceOfSpades: Card = { suit: "spades", rank: 14 };
    if (!cardsEqual(card, aceOfSpades)) {
      return { valid: false, error: "First card must be Ace of Spades" };
    }
    return { valid: true };
  }

  // If leading a trick (no current trick or player has power)
  if (!gameState.currentTrick || gameState.currentTrick.playedCards.length === 0) {
    // Any card is valid when leading
    return { valid: true };
  }

  // Following suit
  const leadSuit = gameState.currentTrick.leadSuit;

  // Must follow suit if possible
  if (hasSuit(player.hand, leadSuit)) {
    if (card.suit !== leadSuit) {
      return { valid: false, error: `You must follow suit (${leadSuit})` };
    }
  }

  // If player doesn't have lead suit, any card is valid (tochoo)
  return { valid: true };
}

/**
 * Check if a card play is a tochoo (different suit when lead suit exists)
 */
export function isTochoo(card: Card, leadSuit: Suit): boolean {
  return card.suit !== leadSuit;
}

/**
 * Determine if we're in shootout mode (exactly 2 active players)
 */
export function isShootoutMode(players: Player[]): boolean {
  const activePlayers = players.filter(p => !p.hasFinished);
  return activePlayers.length === 2;
}

/**
 * Check if game is over
 */
export function isGameOver(players: Player[]): boolean {
  const activePlayers = players.filter(p => !p.hasFinished);
  return activePlayers.length <= 1;
}

/**
 * Get the next active player in turn order
 */
export function getNextPlayer(
  currentPlayerId: number,
  players: Player[],
  turnOrder: number[]
): number | null {
  const currentIndex = turnOrder.indexOf(currentPlayerId);
  if (currentIndex === -1) return null;

  // Find next active player
  for (let i = 1; i <= turnOrder.length; i++) {
    const nextIndex = (currentIndex + i) % turnOrder.length;
    const nextPlayerId = turnOrder[nextIndex];
    const nextPlayer = players.find(p => p.id === nextPlayerId);

    if (nextPlayer && !nextPlayer.hasFinished) {
      return nextPlayerId;
    }
  }

  return null;
}

/**
 * Count active players
 */
export function countActivePlayers(players: Player[]): number {
  return players.filter(p => !p.hasFinished).length;
}
