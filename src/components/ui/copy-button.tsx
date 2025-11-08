'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CopyButtonProps {
  text: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onCopy?: () => void;
  className?: string;
  showText?: boolean;
  successDuration?: number;
}

export function CopyButton({
  text,
  variant = 'default',
  size = 'md',
  onCopy,
  className,
  showText = false,
  successDuration = 2000,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();

      setTimeout(() => {
        setCopied(false);
      }, successDuration);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const variantStyles = {
    default: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white',
    outline: 'bg-transparent border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200',
        variantStyles[variant],
        sizeStyles[size],
        copied && 'bg-green-600 hover:bg-green-700',
        className
      )}
    >
      {copied ? (
        <>
          <Check size={iconSize} />
          {showText && <span>Copied!</span>}
        </>
      ) : (
        <>
          <Copy size={iconSize} />
          {showText && <span>Copy</span>}
        </>
      )}
    </button>
  );
}
