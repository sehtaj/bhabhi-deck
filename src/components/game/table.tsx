// components/Table.tsx
"use client";

import { motion } from "framer-motion";

export type CardType = {
  id: number;
  cardName: string;
  dealt: boolean;
  playerIndex: number;
};

interface TableProps {
  cards: CardType[];
  getPlayerCardPosition: (playerIndex: number, cardIndexInHand: number) => { x: number; y: number };
}

export default function Table({ cards, getPlayerCardPosition }: TableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-[800px] h-[400px] max-w-full mx-auto"
      style={{ perspective: "1400px" }}
    >
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg)" }}>
        {/* Table design */}
        <div className="absolute inset-0 rounded-none">
          <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 blur-2xl" />
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl border border-slate-700/50 shadow-[0_20px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-slate-800/40 border border-slate-700/30 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
              {/* Subtle grid */}
              <div className="absolute inset-0 rounded-[2.5rem] opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
            <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_60px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]" />
          </div>
        </div>

        {/* Opponent Cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            {cards.map((card, index) => {
              if (!card.dealt || card.playerIndex === 2) return null;

              const cardIndexInHand = cards
                .slice(0, index + 1)
                .filter(c => c.playerIndex === card.playerIndex && c.dealt).length - 1;

              const targetPos = getPlayerCardPosition(card.playerIndex, cardIndexInHand);

              return (
                <motion.div
                  key={card.id}
                  animate={{ x: targetPos.x, y: targetPos.y, scale: 0.85 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: "translate(-50%, -50%) scale(0.85)", zIndex: 10 + index }}
                >
                  <img src="/cards/card_back.jpg" alt="Card back" className="w-16 h-24 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] border border-slate-700/30 object-cover" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}