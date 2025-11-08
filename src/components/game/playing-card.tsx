'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<CardSize, string> = {
  sm: 'w-12 h-18',
  md: 'w-16 h-24',
  lg: 'w-20 h-30',
  xl: 'w-24 h-36',
};

export interface PlayingCardProps {
  cardName: string;
  isBackFacing?: boolean;
  isInteractive?: boolean;
  size?: CardSize;
  onClick?: () => void;
  className?: string;
  hoverEffect?: 'scale' | 'lift' | 'none';
  motionProps?: any;
}

export function PlayingCard({
  cardName,
  isBackFacing = false,
  isInteractive = true,
  size = 'md',
  onClick,
  className,
  hoverEffect = 'lift',
  motionProps = {},
}: PlayingCardProps) {
  const cardSrc = isBackFacing ? '/cards/back.svg' : `/cards/${cardName}.svg`;

  const hoverVariants = {
    scale: { scale: 1.1 },
    lift: { scale: 1.1, y: -8 },
    none: {},
  };

  const Component = isInteractive ? motion.div : 'div';
  const props = isInteractive
    ? {
        whileHover: hoverVariants[hoverEffect],
        whileTap: { scale: 0.95 },
        ...motionProps,
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={cn(
        isInteractive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      <Image
        src={cardSrc}
        alt={isBackFacing ? 'Card back' : cardName}
        width={100}
        height={150}
        className={cn(
          'rounded-xl shadow border border-slate-700/30 select-none',
          sizeMap[size]
        )}
        draggable={false}
        priority={false}
      />
    </Component>
  );
}
