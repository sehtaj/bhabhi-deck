'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition-all',
  {
    variants: {
      variant: {
        default: 'bg-red-500/20 text-red-400 border border-red-500/30',
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        secondary: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
        outline: 'border border-gray-700 text-gray-400 bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
      glow: {
        true: 'shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      glow: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export function Badge({
  className,
  variant,
  size,
  glow,
  icon: Icon,
  iconPosition = 'left',
  children,
  ...props
}: BadgeProps) {
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <div
      className={cn(badgeVariants({ variant, size, glow, className }))}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={iconSize} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
    </div>
  );
}
