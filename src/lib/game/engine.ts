/**
 * Game engine - processes card plays and updates game state
 * Implements all rules from GAME-RULES.md
 */

import { Card, GameState, PlayCardResult, Player, Trick, TrickCard } from "./types";
import { findHighestCard, removeCard, hasCard } from "./utils";
import {
  validateCardPlay,
  isTochoo,
  isShootoutMode,
  isGameOver,
  getNextPlayer,
  countActivePlayers,
} from "./validation";

/**
 * Process a card play and return the updated game state + result
 */
export function playCard(
  gameState: GameState,
  playerId: number,
  card: Card
): { newState: GameState; result: PlayCardResult } {
  // Validate the move
  const validation = validateCardPlay(gameState, playerId, card);
  if (!validation.valid) {
    return {
      newState: gameState,
      result: { success: false, error: validation.error },
    };
  }

  // Create a copy of game state
  const newState: GameState = JSON.parse(JSON.stringify(gameState));
  const player = newState.players.find(p => p.id === playerId)!;

  // Remove card from player's hand
  player.hand = removeCard(player.hand, card);

  // Initialize trick if needed
  if (!newState.currentTrick) {
    newState.currentTrick = {
      leaderId: playerId,
      leadSuit: card.suit,
      playedCards: [],
    };
    newState.trickNumber = gameState.trickNumber + 1;
  }

  // Add card to current trick
  const trickCard: TrickCard = {
    userId: playerId,
    card,
    order: newState.currentTrick.playedCards.length,
  };
  newState.currentTrick.playedCards.push(trickCard);

  // Check if this is a tochoo
  const isTochooPlay = isTochoo(card, newState.currentTrick.leadSuit);

  // Determine if trick should end
  const shouldEndTrick = shouldTrickEnd(newState, isTochooPlay);

  if (shouldEndTrick) {
    return resolveTrick(newState, isTochooPlay);
  }

  // Trick continues - move to next player
  const nextPlayer = getNextPlayer(playerId, newState.players, newState.turnOrder);
  newState.currentTurn = nextPlayer!;

  return {
    newState,
    result: {
      success: true,
      nextTurn: nextPlayer!,
    },
  };
}

/**
 * Determine if trick should end after this card
 */
function shouldTrickEnd(gameState: GameState, isTochooPlay: boolean): boolean {
  const trick = gameState.currentTrick!;

  // First trick always completes fully (Rule 9)
  if (!gameState.firstTrickCompleted) {
    const activePlayers = gameState.players.filter(p => !p.hasFinished);
    return trick.playedCards.length >= activePlayers.length;
  }

  // After first trick: tochoo ends trick immediately (Rule 10)
  if (isTochooPlay) {
    return true;
  }

  // All active players have played
  const activePlayers = gameState.players.filter(p => !p.hasFinished);
  return trick.playedCards.length >= activePlayers.length;
}

/**
 * Resolve the trick and update game state
 */
function resolveTrick(
  gameState: GameState,
  wasTochoo: boolean
): { newState: GameState; result: PlayCardResult } {
  const trick = gameState.currentTrick!;

  // Find the highest card of lead suit
  const leadSuitCards = trick.playedCards
    .filter(tc => tc.card.suit === trick.leadSuit)
    .map(tc => tc.card);

  const highestCard = findHighestCard(leadSuitCards)!;
  const winningPlay = trick.playedCards.find(tc =>
    tc.card.suit === highestCard.suit && tc.card.rank === highestCard.rank
  )!;
  const winnerId = winningPlay.userId;

  // Tochoo: winner picks up all cards (Rule 10)
  if (wasTochoo) {
    return handleTochooResolution(gameState, winnerId, trick);
  }

  // Clean trick: cards go to waste pile (Rule 11)
  return handleCleanTrick(gameState, winnerId, trick);
}

/**
 * Handle tochoo resolution (pick up cards)
 */
function handleTochooResolution(
  gameState: GameState,
  winnerId: number,
  trick: Trick
): { newState: GameState; result: PlayCardResult } {
  const newState = { ...gameState };
  const winner = newState.players.find(p => p.id === winnerId)!;

  // Winner picks up all cards from trick
  const trickCards = trick.playedCards.map(tc => tc.card);
  winner.hand.push(...trickCards);

  // Winner keeps power
  newState.playerWithPower = winnerId;
  newState.currentTurn = winnerId;
  newState.currentTrick = null;

  // Mark first trick as completed
  if (!newState.firstTrickCompleted && newState.trickNumber >= 1) {
    newState.firstTrickCompleted = true;
  }

  // Check if any non-winner players finished (played last card without winning)
  // Note: In tochoo, winner picks up cards so their hand is NOT empty
  // But other players might have played their last card
  for (const playedCard of trick.playedCards) {
    if (playedCard.userId !== winnerId) {
      const player = newState.players.find(p => p.id === playedCard.userId)!;
      if (player.hand.length === 0 && !player.hasFinished) {
        player.hasFinished = true;
      }
    }
  }

  // Check if game is over (non-winner finished and only 1 active player left)
  if (isGameOver(newState.players)) {
    const bhabhi = newState.players.find(p => !p.hasFinished);
    const bhabhiId = bhabhi ? bhabhi.id : winnerId;

    return {
      newState,
      result: {
        success: true,
        trickEnded: true,
        trickWinner: winnerId,
        gameEnded: true,
        bhabhi: bhabhiId,
      },
    };
  }

  return {
    newState,
    result: {
      success: true,
      trickEnded: true,
      trickWinner: winnerId,
      nextTurn: winnerId,
    },
  };
}

/**
 * Handle clean trick (no tochoo)
 */
function handleCleanTrick(
  gameState: GameState,
  winnerId: number,
  trick: Trick
): { newState: GameState; result: PlayCardResult } {
  const newState = { ...gameState };

  // Cards go to waste pile
  const trickCards = trick.playedCards.map(tc => tc.card);
  newState.wastePile.push(...trickCards);

  // Winner gains power
  newState.playerWithPower = winnerId;
  newState.currentTrick = null;

  // Mark first trick as completed
  if (!newState.firstTrickCompleted && newState.trickNumber >= 1) {
    newState.firstTrickCompleted = true;
  }

  // Check if any non-winner players finished (played last card without winning)
  // They don't have power, so they get away immediately
  for (const playedCard of trick.playedCards) {
    if (playedCard.userId !== winnerId) {
      const player = newState.players.find(p => p.id === playedCard.userId)!;
      if (player.hand.length === 0 && !player.hasFinished) {
        player.hasFinished = true;
      }
    }
  }

  // Check if winner finished (played last card)
  const winner = newState.players.find(p => p.id === winnerId)!;

  if (winner.hand.length === 0) {
    return handlePlayerFinishing(newState, winnerId);
  }

  // Check if game is over (non-winner finished and only 1 active player left)
  if (isGameOver(newState.players)) {
    const bhabhi = newState.players.find(p => !p.hasFinished);
    const bhabhiId = bhabhi ? bhabhi.id : winnerId;

    return {
      newState,
      result: {
        success: true,
        trickEnded: true,
        trickWinner: winnerId,
        gameEnded: true,
        bhabhi: bhabhiId,
      },
    };
  }

  // Winner leads next trick
  newState.currentTurn = winnerId;

  return {
    newState,
    result: {
      success: true,
      trickEnded: true,
      trickWinner: winnerId,
      nextTurn: winnerId,
    },
  };
}

/**
 * Handle player finishing (attempting to get away)
 */
function handlePlayerFinishing(
  gameState: GameState,
  playerId: number
): { newState: GameState; result: PlayCardResult } {
  const newState = { ...gameState };
  const player = newState.players.find(p => p.id === playerId)!;

  // Shootout power restriction (Rule 15)
  if (isShootoutMode(newState.players) && newState.playerWithPower === playerId) {
    // Must draw one card from waste pile
    if (newState.wastePile.length > 0) {
      const drawnCard = newState.wastePile.pop()!;
      player.hand.push(drawnCard);

      // Player leads with drawn card immediately
      newState.currentTurn = playerId;

      return {
        newState,
        result: {
          success: true,
          trickEnded: true,
          nextTurn: playerId,
        },
      };
    }
  }

  // Normal finish - player gets away (Rule 13)
  player.hasFinished = true;

  // Check if game is over
  if (isGameOver(newState.players)) {
    const bhabhi = newState.players.find(p => !p.hasFinished);

    // Safety check: if no Bhabhi found (shouldn't happen), last player to finish wins
    const bhabhiId = bhabhi ? bhabhi.id : newState.players.find(p => p.hasFinished)!.id;

    return {
      newState,
      result: {
        success: true,
        trickEnded: true,
        gameEnded: true,
        bhabhi: bhabhiId,
      },
    };
  }

  // Game continues - next active player gets power
  const nextPlayer = getNextPlayer(playerId, newState.players, newState.turnOrder);
  newState.playerWithPower = nextPlayer!;
  newState.currentTurn = nextPlayer!;

  return {
    newState,
    result: {
      success: true,
      trickEnded: true,
      nextTurn: nextPlayer!,
    },
  };
}
