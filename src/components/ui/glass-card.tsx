'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const glassCardVariants = cva(
  'backdrop-blur-xl rounded-3xl shadow-2xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-red-950/40 to-red-950/20 border-red-900/50 shadow-red-900/50',
        secondary:
          'bg-gradient-to-b from-gray-950/40 to-gray-950/20 border-gray-800/50 shadow-gray-900/50',
        primary:
          'bg-gradient-to-b from-red-950/60 to-red-950/30 border-red-800/60 shadow-red-900/60',
      },
      glow: {
        true: 'shadow-[0_0_25px_rgba(255,0,0,0.2)]',
        false: '',
      },
      hover: {
        true: 'hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:border-red-800/60 hover:scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      glow: false,
      hover: false,
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  as?: 'div' | 'section' | 'article';
}

export function GlassCard({
  className,
  variant,
  glow,
  hover,
  as: Component = 'div',
  children,
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={cn(glassCardVariants({ variant, glow, hover, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
