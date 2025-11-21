'use client'

import { useState } from 'react'

interface AvatarProps {
  src?: string | null
  alt: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  onClick,
  className = ''
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  const shouldShowImage = src && !imageError

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        overflow-hidden
        flex
        items-center
        justify-center
        bg-gradient-to-br from-red-600 to-red-800
        text-white
        font-semibold
        border-2 border-red-500/50
        ${onClick ? 'cursor-pointer hover:border-red-400 transition-all duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{fallback ? getInitials(fallback) : '?'}</span>
      )}
    </div>
  )
}
