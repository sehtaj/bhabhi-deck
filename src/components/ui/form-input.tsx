'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: LucideIcon;
  showPasswordToggle?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className = '', error, icon: Icon, showPasswordToggle, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;
    const hasPasswordToggle = showPasswordToggle && type === 'password';

    return (
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <Icon size={20} />
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent
            transition-all duration-200 hover:border-gray-600
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-12' : ''}
            ${hasPasswordToggle ? 'pr-12' : ''}
            ${error ? 'border-red-500/50 focus:ring-red-500' : ''}
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Password Toggle */}
        {hasPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
