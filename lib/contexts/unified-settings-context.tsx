'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

// Feature sections that can be extended
export type FeatureSection = 'profile' | 'account' | 'appearance' | 'notifications' | 'ai' | 'accessibility' | 'integrations' | 'advanced'

interface FeatureSettings {
  [key: string]: Record<string, unknown>
}

interface UnifiedSettingsContextType {
  settings: FeatureSettings
  expandedSections: Set<FeatureSection>
  updateSettings: (section: FeatureSection, key: string, value: unknown) => void
  updateMultipleSettings: (section: FeatureSection, updates: Record<string, unknown>) => void
  getSectionSettings: (section: FeatureSection) => Record<string, unknown>
  toggleSection: (section: FeatureSection) => void
  resetSettings: (section?: FeatureSection) => void
  exportSettings: () => string
  importSettings: (json: string) => boolean
}

const UnifiedSettingsContext = createContext<UnifiedSettingsContextType | undefined>(undefined)

const DEFAULT_SECTIONS: FeatureSection[] = ['profile', 'account', 'appearance', 'notifications', 'ai', 'accessibility', 'integrations', 'advanced']

export function UnifiedSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<FeatureSettings>({})
  const [expandedSections, setExpandedSections] = useState<Set<FeatureSection>>(new Set(['profile']))

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('unified-settings')
      const savedExpanded = localStorage.getItem('expanded-sections')

      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings))
        } catch (error) {
          console.error('Failed to parse unified settings:', error)
        }
      }

      if (savedExpanded) {
        try {
          const sections = JSON.parse(savedExpanded)
          setExpandedSections(new Set(sections))
        } catch (error) {
          console.error('Failed to parse expanded sections:', error)
        }
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('unified-settings', JSON.stringify(settings))
    }
  }, [settings])

  // Save expanded sections to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('expanded-sections', JSON.stringify(Array.from(expandedSections)))
    }
  }, [expandedSections])

  const updateSettings = (section: FeatureSection, key: string, value: unknown) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  const updateMultipleSettings = (section: FeatureSection, updates: Record<string, unknown>) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }))
  }

  const getSectionSettings = (section: FeatureSection): Record<string, unknown> => {
    return settings[section] || {}
  }

  const toggleSection = (section: FeatureSection) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const resetSettings = (section?: FeatureSection) => {
    if (section) {
      setSettings((prev) => ({
        ...prev,
        [section]: {},
      }))
    } else {
      setSettings({})
    }
  }

  const exportSettings = (): string => {
    return JSON.stringify(settings, null, 2)
  }

  const importSettings = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json)
      if (typeof parsed === 'object' && parsed !== null) {
        setSettings(parsed)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import settings:', error)
      return false
    }
  }

  return (
    <UnifiedSettingsContext.Provider
      value={{
        settings,
        expandedSections,
        updateSettings,
        updateMultipleSettings,
        getSectionSettings,
        toggleSection,
        resetSettings,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </UnifiedSettingsContext.Provider>
  )
}

export function useUnifiedSettings() {
  const context = useContext(UnifiedSettingsContext)
  if (context === undefined) {
    throw new Error('useUnifiedSettings must be used within a UnifiedSettingsProvider')
  }
  return context
}
