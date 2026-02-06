'use client'

import React, { useContext } from 'react'
import { ProgressContext } from '@/lib/contexts/progress-context'

export function ProgressBar() {
  const context = useContext(ProgressContext)

  if (!context) {
    return null
  }

  const { progress, isLoading, config } = context
  const { color = 'hsl(var(--primary))', height = 3, showSpinner = true } = config

  if (!isLoading && progress === 0) {
    return null
  }

  return (
    <div
      className="fixed top-0 left-0 h-full w-full pointer-events-none z-50"
      style={{ height: `${height}px` }}
    >
      {/* Background bar */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0" />

      {/* Progress bar */}
      <div
        className="h-full transition-all"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          transitionDuration: progress === 100 ? '300ms' : '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute top-0 left-0 h-full w-full opacity-60"
          style={{
            background: `linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            )`,
            animation: `shimmer 2s infinite`,
          }}
        />
      </div>

      {/* Spinner (optional) */}
      {showSpinner && progress < 100 && (
        <div
          className="absolute top-1/2 right-2 w-4 h-4 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
            animation: `spin 1s linear infinite`,
          }}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
