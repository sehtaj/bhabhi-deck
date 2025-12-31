FULL & AUTHORITATIVE PROMPT — BHABHI (TOCHOO / THULLA)

Implement the traditional Indian card game “Bhabhi” (also called Tochoo/Thulla) using the following rules. This specification is the single source of truth. Do not assume any rules not explicitly stated here.

1. Game Overview

Multiplayer, trick-based card game

Goal: get rid of all cards

Players who finish successfully “get away”

The last remaining player is the Bhabhi (loser)

2. Players

Minimum: 2

Maximum: 8

Each player has:

Player {
  id: string
  hand: Card[]
  hasFinished: boolean
  hasPower: boolean
}


Finished players are skipped from all future play.

3. Deck

Standard 52-card deck

No jokers

Card {
  suit: "spades" | "hearts" | "diamonds" | "clubs"
  rank: 2–14  // J=11, Q=12, K=13, A=14
}


Card ranking applies only within the same suit.

4. Dealing

Shuffle the deck

Deal all cards to players

Unequal hand sizes are allowed (difference ≤ 1)

5. Starting the Game (Mandatory)

The player holding the Ace of Spades (♠A) starts the game

They must play ♠A as the lead card of the first trick

No other opening move is allowed

6. Game Structure

The game is played as a sequence of tricks

Each trick has:

Trick {
  leaderId: playerId
  leadSuit: Suit
  playedCards: { playerId, card }[]
}

7. Leading a Trick (Power)

The player who has power leads the trick

Power means:

You start the next trick

The leader plays exactly one card

That card’s suit becomes the lead suit

8. Following Suit

Turns proceed clockwise

Each active player must:

Follow the lead suit if possible

If they do not have the lead suit:

They must play any other card

This is called a tochoo / thulla

There is no passing in this game.

9. First Trick Exception (Critical)

The first trick always completes fully

Even if a tochoo is played:

All players still play a card

The trick does NOT end early

This exception applies only to the first trick.

10. Tochoo (Thulla) Rule — After First Trick

From the second trick onward:

The moment a player plays a tochoo:

The trick ends immediately

Remaining players do not participate

Resolution:

Determine the highest card of the lead suit played so far

The player who played that card:

Picks up all cards in the trick

Adds them to their hand

Keeps power

Leads the next trick

Only the first tochoo matters; multiple tochoos in one trick are impossible.

11. Clean Trick (No Tochoo)

If all players follow suit:

Determine the highest card in the lead suit

That player:

Gains power

All cards from the trick:

Are placed into the waste pile

Are removed from active play

12. Waste Pile Invariant

The waste pile may be empty before the first trick completes

After the first trick completes, the waste pile is guaranteed to never be empty for the remainder of the game

Any rule that draws from the waste pile is therefore always safe after trick 1

13. Finishing & Getting Away

When a player plays their last card, they attempt to get away

Normal Play (More than 2 players left)

A player immediately gets away

Power does NOT matter

No restriction applies

player.hasFinished = true

14. Shootout Mode (Exactly 2 Players Left)
Definition

Shootout begins when:

activePlayers.length === 2

15. Power Restriction Rule (Shootout ONLY)

This rule applies only during shootout

Outside shootout, this rule does NOT apply

If a player:

Empties their hand

AND still has power

Then they must:

Draw exactly one card from the waste pile

Immediately lead the next trick with that card

They may only get away when they finish without holding power.

17. End of Game

The game ends when:

One player remains (normal)

That remaining / losing player is the Bhabhi.

18. Turn Flow Summary
Find ♠A holder → play ♠A
Resolve first trick fully
WHILE game not ended:
  Leader plays card
  Players follow suit clockwise
  IF tochoo (after trick 1):
    end trick → pickup → leader continues
  ELSE:
    highest lead suit wins → discard to waste
  Check finishing rules
  Check shootout rules

19. Implementation Constraints

No passing

One card per turn

Finished players are skipped

Waste pile is guaranteed non-empty after trick 1

No hidden rules, penalties, or bonuses

20. Final Instruction

Do not introduce any additional mechanics, interpretations, or variants. Implement exactly what is written above.