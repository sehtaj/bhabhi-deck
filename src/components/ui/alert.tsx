'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const alertVariants = cva(
  'px-4 py-3 rounded-lg text-sm border flex items-start gap-3 relative',
  {
    variants: {
      variant: {
        error: 'bg-red-500/10 border-red-500/20 text-red-400',
        success: 'bg-green-500/10 border-green-500/20 text-green-400',
        warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
        info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconMap = {
  error: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  showIcon?: boolean;
}

export function Alert({
  className,
  variant = 'info',
  dismissible = false,
  onDismiss,
  showIcon = true,
  children,
  ...props
}: AlertProps) {
  const Icon = iconMap[variant || 'info'];

  return (
    <div className={cn(alertVariants({ variant, className }))} {...props}>
      {showIcon && Icon && (
        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      )}

      <div className="flex-1">{children}</div>

      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 hover:opacity-70 transition-opacity ml-2"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
