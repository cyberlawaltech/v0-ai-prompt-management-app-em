"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface TTSSettings {
  enabled: boolean
  autoPlay: boolean
  rate: number
  pitch: number
  volume: number
  voice: string | null
}

interface TTSContextType {
  settings: TTSSettings
  updateSettings: (newSettings: Partial<TTSSettings>) => void
  resetSettings: () => void
}

const defaultSettings: TTSSettings = {
  enabled: true,
  autoPlay: false,
  rate: 1,
  pitch: 1,
  volume: 0.8,
  voice: null,
}

const TTSContext = createContext<TTSContextType | undefined>(undefined)

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<TTSSettings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("tts-settings")
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings)
          setSettings({ ...defaultSettings, ...parsed })
        } catch (error) {
          console.error("Failed to parse TTS settings:", error)
        }
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tts-settings", JSON.stringify(settings))
    }
  }, [settings])

  const updateSettings = (newSettings: Partial<TTSSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return <TTSContext.Provider value={{ settings, updateSettings, resetSettings }}>{children}</TTSContext.Provider>
}

export function useTTSContext() {
  const context = useContext(TTSContext)
  if (context === undefined) {
    throw new Error("useTTSContext must be used within a TTSProvider")
  }
  return context
}
