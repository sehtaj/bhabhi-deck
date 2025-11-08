'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const gradientTextVariants = cva('bg-clip-text text-transparent', {
  variants: {
    variant: {
      red: 'bg-gradient-to-r from-red-500 via-red-600 to-red-700',
      redVertical: 'bg-gradient-to-b from-red-500 via-red-600 to-red-700',
      fire: 'bg-gradient-to-r from-orange-500 via-red-600 to-red-700',
      purple: 'bg-gradient-to-r from-purple-500 via-pink-600 to-red-600',
      gold: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600',
    },
    animate: {
      true: 'bg-[length:200%_auto] animate-gradient',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'red',
    animate: false,
  },
});

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export function GradientText({
  className,
  variant,
  animate,
  as: Component = 'span',
  children,
  ...props
}: GradientTextProps) {
  return (
    <Component
      className={cn(gradientTextVariants({ variant, animate, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
