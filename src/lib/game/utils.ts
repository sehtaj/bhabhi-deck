/**
 * Pure utility functions for card operations
 * No side effects, easily testable
 */

import { Card, Suit, Rank, CardString, cardToString, stringToCard } from "./types";

/**
 * Compare two cards of the SAME suit
 * Returns positive if card1 > card2, negative if card1 < card2, 0 if equal
 */
export function compareCards(card1: Card, card2: Card): number {
  if (card1.suit !== card2.suit) {
    throw new Error("Cannot compare cards of different suits");
  }
  return card1.rank - card2.rank;
}

/**
 * Find the highest card in an array (all must be same suit)
 */
export function findHighestCard(cards: Card[]): Card | null {
  if (cards.length === 0) return null;

  return cards.reduce((highest, card) => {
    if (!highest) return card;
    return compareCards(card, highest) > 0 ? card : highest;
  });
}

/**
 * Check if two cards are equal
 */
export function cardsEqual(card1: Card, card2: Card): boolean {
  return card1.suit === card2.suit && card1.rank === card2.rank;
}

/**
 * Check if a player has a specific card in their hand
 */
export function hasCard(hand: Card[], card: Card): boolean {
  return hand.some(c => cardsEqual(c, card));
}

/**
 * Check if a player has any card of a specific suit
 */
export function hasSuit(hand: Card[], suit: Suit): boolean {
  return hand.some(c => c.suit === suit);
}

/**
 * Remove a card from a hand (returns new hand, doesn't mutate)
 */
export function removeCard(hand: Card[], card: Card): Card[] {
  const index = hand.findIndex(c => cardsEqual(c, card));
  if (index === -1) {
    throw new Error("Card not found in hand");
  }
  return [...hand.slice(0, index), ...hand.slice(index + 1)];
}

/**
 * Create and shuffle a standard 52-card deck
 */
export function createDeck(): Card[] {
  const suits: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
  const ranks: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }

  return shuffleDeck(deck);
}

/**
 * Shuffle a deck using Fisher-Yates algorithm
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deal cards evenly to players
 * Returns array of hands (unequal sizes allowed, max difference of 1)
 */
export function dealCards(deck: Card[], numPlayers: number): Card[][] {
  const hands: Card[][] = Array.from({ length: numPlayers }, () => []);

  deck.forEach((card, index) => {
    const playerIndex = index % numPlayers;
    hands[playerIndex].push(card);
  });

  return hands;
}

/**
 * Find the player with Ace of Spades
 */
export function findAceOfSpadesHolder(players: { hand: Card[]; id: number }[]): number | null {
  const aceOfSpades: Card = { suit: "spades", rank: 14 };

  for (const player of players) {
    if (hasCard(player.hand, aceOfSpades)) {
      return player.id;
    }
  }

  return null;
}

/**
 * Convert Card array to CardString array (for database storage)
 */
export function cardsToStrings(cards: Card[]): CardString[] {
  return cards.map(cardToString);
}

/**
 * Convert CardString array to Card array (from database)
 */
export function stringsToCards(strings: CardString[]): Card[] {
  return strings.map(stringToCard);
}
