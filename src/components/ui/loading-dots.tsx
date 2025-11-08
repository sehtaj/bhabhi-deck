'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingDotsProps {
  color?: 'red' | 'white' | 'blue' | 'green';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const colorMap = {
  red: 'bg-red-500',
  white: 'bg-white',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
};

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function LoadingDots({
  color = 'red',
  size = 'md',
  message,
  className,
}: LoadingDotsProps) {
  const dotColor = colorMap[color];
  const dotSize = sizeMap[size];

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="flex justify-center gap-2">
        <div
          className={cn(
            dotSize,
            dotColor,
            'rounded-full animate-pulse'
          )}
        />
        <div
          className={cn(
            dotSize,
            dotColor,
            'rounded-full animate-pulse'
          )}
          style={{ animationDelay: '150ms' }}
        />
        <div
          className={cn(
            dotSize,
            dotColor,
            'rounded-full animate-pulse'
          )}
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {message && (
        <p className="text-sm text-gray-400 animate-pulse">{message}</p>
      )}
    </div>
  );
}
