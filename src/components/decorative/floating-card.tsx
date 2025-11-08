'use client';

import { motion } from 'framer-motion';

type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

interface FloatingCardProps {
  suit: Suit;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  animationConfig?: {
    yRange?: [number, number, number];
    rotateRange?: [number, number, number];
    duration?: number;
    delay?: number;
  };
  opacity?: number;
}

const suitSymbols: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

const suitColors: Record<Suit, string> = {
  spades: 'text-red-500',
  hearts: 'text-red-600',
  diamonds: 'text-red-500',
  clubs: 'text-red-500',
};

export function FloatingCard({
  suit,
  position,
  animationConfig = {},
  opacity = 0.25,
}: FloatingCardProps) {
  const {
    yRange = [0, -30, 0],
    rotateRange = [-5, 5, -5],
    duration = 6,
    delay = 0,
  } = animationConfig;

  const suitSymbol = suitSymbols[suit];
  const suitColor = suitColors[suit];
  const positionStyles = position;

  return (
    <motion.div
      className="absolute"
      style={{
        ...positionStyles,
        opacity,
      }}
      animate={{
        y: yRange,
        rotate: rotateRange,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <div className="w-36 h-52 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-red-500/30 rounded-xl shadow-2xl shadow-red-900/30 p-4 relative backdrop-blur-sm">
        {/* Top left corner */}
        <div className="absolute top-3 left-3">
          <div className={`${suitColor} text-2xl font-bold tracking-tight`}>A</div>
          <div className={`${suitColor} text-3xl -mt-1`}>{suitSymbol}</div>
        </div>

        {/* Center symbol */}
        <div
          className={`${suitColor} text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]`}
        >
          {suitSymbol}
        </div>

        {/* Bottom right corner (rotated) */}
        <div className="absolute bottom-3 right-3 rotate-180">
          <div className={`${suitColor} text-2xl font-bold tracking-tight`}>A</div>
          <div className={`${suitColor} text-3xl -mt-1`}>{suitSymbol}</div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent rounded-xl" />
      </div>
    </motion.div>
  );
}
