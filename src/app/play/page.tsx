"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { useState, useEffect } from "react";

const tableVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Card suits and ranks
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

// Create deck of 52 cards with card names
const createDeck = () => {
  const deck = [];
  let id = 0;
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        id: id++,
        cardName: `${rank}_of_${suit}`, // e.g., "ace_of_spades"
        dealt: false,
        playerIndex: -1,
      });
    }
  }
  return deck;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function PlayPage() {
  const [cards, setCards] = useState(createDeck());
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  const [isDealing, setIsDealing] = useState(false);
  const [dealingStarted, setDealingStarted] = useState(false);
  const [myCards, setMyCards] = useState<typeof cards>([]);

  const players = [
    { name: "Player 1", position: "top" },
    { name: "Player 2", position: "right" },
    { name: "You", position: "bottom" }, // Player 3 is "You"
    { name: "Player 4", position: "left" },
  ];

  // Shuffle deck on mount
  useEffect(() => {
    const indices = Array.from({ length: 52 }, (_, i) => i);
    setShuffledOrder(shuffleArray(indices));
  }, []);

  // Start dealing cards after 1 second
  useEffect(() => {
    if (shuffledOrder.length === 0) return;
    
    const timer = setTimeout(() => {
      startDealing();
    }, 1000);
    return () => clearTimeout(timer);
  }, [shuffledOrder]);

  const startDealing = () => {
    setIsDealing(true);
    setDealingStarted(true);
    
    // Deal cards one by one in shuffled order
    let dealCount = 0;
    const dealInterval = setInterval(() => {
      if (dealCount >= 52) {
        clearInterval(dealInterval);
        setIsDealing(false);
        return;
      }

      const cardIndex = shuffledOrder[dealCount];
      const playerIndex = dealCount % 4; // Round-robin distribution

      setCards(prev => {
        const newCards = [...prev];
        newCards[cardIndex] = {
          ...newCards[cardIndex],
          dealt: true,
          playerIndex: playerIndex,
        };
        return newCards;
      });

      // If this card is for "You" (player 2), add to myCards separately
      if (playerIndex === 2) {
        setMyCards(current => {
          const card = cards[cardIndex];
          // Check if card already exists
          if (current.some(c => c.id === card.id)) {
            return current;
          }
          return [...current, { ...card, dealt: true, playerIndex: 2 }];
        });
      }

      dealCount++;
    }, 80); // Deal a card every 80ms
  };

  const getPlayerCardPosition = (playerIndex: number, cardIndexInHand: number) => {
    const positions = {
      0: { x: 0, y: -280 }, // top
      1: { x: 480, y: 0 },  // right
      2: { x: 0, y: 280 },  // bottom
      3: { x: -480, y: 0 }, // left
    };
    
    const basePos = positions[playerIndex as keyof typeof positions];
    const spreadOffset = (cardIndexInHand - 6) * 8; // Spread cards horizontally
    
    return {
      x: basePos.x + (playerIndex % 2 === 0 ? spreadOffset : 0),
      y: basePos.y + (playerIndex % 2 === 1 ? spreadOffset : 0),
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl aspect-video relative"
        style={{ perspective: "1400px" }}
      >
        {/* Table with 3D perspective */}
        <div  
          className="relative w-full h-full"
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(12deg)" 
          }}
        >
          {/* Outer frame - Futuristic metal/glass edge */}
          <div className="absolute -inset-6 rounded-[4rem] bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(139,92,246,0.15)]">
            <div className="absolute inset-0 rounded-[4rem] bg-[linear-gradient(145deg,transparent_0%,rgba(139,92,246,0.1)_30%,transparent_50%,rgba(59,130,246,0.1)_70%,transparent_100%)]" />
            <div className="absolute inset-0 rounded-[4rem] shadow-[inset_0_0_40px_rgba(139,92,246,0.2),inset_0_-4px_20px_rgba(59,130,246,0.15)]" />
            <div className="absolute inset-3 rounded-[3.5rem] border border-violet-500/20" />
            <div className="absolute inset-4 rounded-[3.25rem] border border-blue-500/10" />
          </div>

          {/* Main table surface */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_-12px_40px_rgba(0,0,0,0.6),inset_0_12px_30px_rgba(139,92,246,0.08)]">
            <div className="absolute inset-0 rounded-[3rem] opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImhleGFnb25zIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0zMCAwTDYwIDE1TDYwIDQ1TDMwIDYwTDAgNDVMMCAxNVoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksMTkyLDI0NiwwLjMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNoZXhhZ29ucykiLz48L3N2Zz4=')] bg-[length:60px_60px]" />
            <div className="absolute inset-x-[10%] top-[5%] h-[30%] rounded-[60%] bg-gradient-to-b from-violet-400/10 via-purple-400/5 to-transparent blur-3xl" />
            <div className="absolute inset-0 rounded-[3rem] border-2 border-violet-500/10 shadow-[inset_0_0_60px_rgba(139,92,246,0.1)]" />
            
            {/* Center holographic play zone */}
            <div className="absolute inset-[16%] rounded-[50%] bg-gradient-to-br from-indigo-900/20 via-violet-900/10 to-blue-900/20 border-2 border-violet-500/20 shadow-[inset_0_4px_24px_rgba(0,0,0,0.5),0_0_40px_rgba(139,92,246,0.15)]">
              <div className="absolute inset-6 rounded-[50%] border border-violet-400/10" />
            </div>
            
            {/* Corner accent lights */}
            <div className="absolute top-6 left-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-violet-400/30" />
            </div>
            <div className="absolute top-6 right-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-blue-400/30" />
            </div>
            <div className="absolute bottom-6 left-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-blue-400/30" />
            </div>
            <div className="absolute bottom-6 right-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-violet-400/30" />
            </div>
          </div>

          {/* Cards Layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full">
              {cards.map((card, index) => {
                if (!card.dealt) return null; // Don't render undealt cards
                if (card.playerIndex === 2) return null; // Don't show "Your" cards on table, only in hand panel below
                
                const cardIndexInHand = cards
                  .slice(0, index + 1)
                  .filter(c => c.playerIndex === card.playerIndex && c.dealt).length - 1;
                
                const targetPos = getPlayerCardPosition(card.playerIndex, cardIndexInHand);

                return (
                  <motion.div
                    key={card.id}
                    initial={{ x: 0, y: 0, scale: 1 }}
                    animate={{
                      x: targetPos.x,
                      y: targetPos.y,
                      scale: 0.9,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${targetPos.x}px) translateY(${targetPos.y}px) scale(0.9)`,
                      zIndex: 10 + index,
                    }}
                  >
                    {/* Card Image - Face down for other players */}
                    <img 
                      src="/cards/card_back.jpg"
                      alt="Card back"
                      className="w-16 h-24 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)] object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Player Avatars */}
          {players.map((player, index) => {
            const positions = [
              "top-4 left-1/2 -translate-x-1/2",
              "right-4 top-1/2 -translate-y-1/2",
              "bottom-4 left-1/2 -translate-x-1/2",
              "left-4 top-1/2 -translate-y-1/2",
            ];

            const playerCardCount = cards.filter(
              c => c.dealt && c.playerIndex === index
            ).length;

            const isYou = index === 2;

            return (
              <div key={index} className={`absolute ${positions[index]} z-[200]`}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-900/60 to-indigo-900/60 border-2 border-violet-500/40 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-violet-300" />
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-black/80 border border-violet-500/30 backdrop-blur-sm">
                    <p className="text-xs text-violet-200 font-medium">{player.name}</p>
                  </div>
                  {dealingStarted && (
                    <div className="px-2 py-1 rounded bg-violet-500/20 border border-violet-400/30">
                      <p className="text-xs text-violet-300 font-bold">{playerCardCount} cards</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Your Cards Display - Bottom of screen */}
          {myCards.length > 0 && (
            <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 z-[300] bg-black/90 border-2 border-violet-500/40 rounded-2xl p-4 backdrop-blur-md shadow-[0_0_40px_rgba(139,92,246,0.3)] w-full max-w-5xl">
              <h3 className="text-violet-200 font-bold text-sm mb-3 text-center">Your Cards ({myCards.length})</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {myCards.map((card) => (
                  <motion.div
                    key={`hand-${card.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.15, y: -12 }}
                    className="cursor-pointer"
                  >
                    <img 
                      src={`/cards/${card.cardName}.svg`}
                      alt={card.cardName}
                      className="w-16 h-24 rounded-lg shadow-[0_6px_24px_rgba(0,0,0,0.7)]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}