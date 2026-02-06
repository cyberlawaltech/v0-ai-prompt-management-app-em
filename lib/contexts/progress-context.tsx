'use client'

import React, { createContext, useState, useCallback, ReactNode } from 'react'

export interface ProgressConfig {
  color?: string
  height?: number
  duration?: number
  showSpinner?: boolean
  easing?: string
  minimumTime?: number
}

interface ProgressContextType {
  progress: number
  isLoading: boolean
  config: ProgressConfig
  start: () => void
  complete: () => void
  increment: (amount?: number) => void
  setProgress: (value: number) => void
  setConfig: (config: Partial<ProgressConfig>) => void
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressState] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfigState] = useState<ProgressConfig>({
    color: 'hsl(var(--primary))',
    height: 3,
    duration: 2000,
    showSpinner: true,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    minimumTime: 400,
  })

  const start = useCallback(() => {
    setIsLoading(true)
    setProgressState(0)
    
    // Simulate progress with decreasing increments
    const interval = setInterval(() => {
      setProgressState((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * (50 - 10) + 10
        return Math.min(prev + increment, 90)
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const complete = useCallback(() => {
    setProgressState(100)
    
    // Reset after animation completes
    const timeout = setTimeout(() => {
      setProgressState(0)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timeout)
  }, [])

  const increment = useCallback((amount = 10) => {
    setProgressState((prev) => Math.min(prev + amount, 99))
  }, [])

  const setProgress = useCallback((value: number) => {
    setProgressState(Math.max(0, Math.min(value, 100)))
  }, [])

  const setConfig = useCallback((newConfig: Partial<ProgressConfig>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }))
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        config,
        start,
        complete,
        increment,
        setProgress,
        setConfig,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
