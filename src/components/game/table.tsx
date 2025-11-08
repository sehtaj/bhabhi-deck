// components/Table.tsx
"use client";

import { motion } from "framer-motion";
import { PlayingCard } from "./playing-card";

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
<div
  className="relative w-full h-full"
  style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg)" }}
>
  {/* Table design */}
  <div className="absolute inset-0 rounded-none">
    {/* Modern red metallic border with accent lines */}
    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-red-950 via-red-900/80 to-black p-[12px]">
      
      {/* Accent corner details */}
      <div className="absolute top-[12px] left-[12px] w-20 h-20 border-t-2 border-l-2 border-red-500/50 rounded-tl-[2.8rem]" />
      <div className="absolute top-[12px] right-[12px] w-20 h-20 border-t-2 border-r-2 border-red-500/50 rounded-tr-[2.8rem]" />
      <div className="absolute bottom-[12px] left-[12px] w-20 h-20 border-b-2 border-l-2 border-red-500/50 rounded-bl-[2.8rem]" />
      <div className="absolute bottom-[12px] right-[12px] w-20 h-20 border-b-2 border-r-2 border-red-500/50 rounded-br-[2.8rem]" />
      
      {/* Inner tech lines */}
      <div className="absolute inset-[8px] rounded-[2.8rem] border border-red-900/40" />
      <div className="absolute inset-[14px] rounded-[2.6rem] border border-red-500/25" />
      
      {/* Matte black surface */}
      <div className="absolute inset-[12px] rounded-[2.6rem] bg-[#0a0a0a] border border-red-950/40 shadow-[inset_0_2px_15px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Hexagonal tech pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239,68,68,0.4) 100px, rgba(239,68,68,0.4) 2px),
              repeating-linear-gradient(60deg, transparent, transparent 2px, rgba(239,68,68,0.4) 100px, rgba(239,68,68,0.4) 2px),
              repeating-linear-gradient(120deg, transparent, transparent 2px, rgba(239,68,68,0.4) 10px, rgba(239,68,68,0.4) 2px)
            `,
            backgroundSize: "100px 174px",
          }}
        />

        {/* Subtle radial glow matching background */}
        <div className="absolute inset-0 bg-gradient-radial from-red-950/10 via-transparent to-transparent" />
        
        {/* Edge lighting effect */}
        <div className="absolute inset-0 rounded-[2.6rem] shadow-[inset_0_0_60px_rgba(220,38,38,0.08)]" />
      </div>
    </div>
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
                  <PlayingCard
                    cardName="card_back"
                    isBackFacing={true}
                    isInteractive={false}
                    size="md"
                    className="shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}