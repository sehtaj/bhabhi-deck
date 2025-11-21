'use client'

import { useState, useRef, useEffect } from 'react'

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 border border-red-900/50 shadow-lg z-50 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownMenuItemProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export function DropdownMenuItem({ onClick, children, className = '' }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        px-4
        py-3
        text-sm
        text-gray-300
        hover:bg-red-950/50
        hover:text-white
        transition-colors
        duration-150
        ${className}
      `}
    >
      {children}
    </button>
  )
}
