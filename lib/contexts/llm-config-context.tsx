'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { LLMConfiguration, LLMSettings, LLMModel } from '@/lib/types/llm'
import { TOP_OPEN_SOURCE_LLMS } from '@/lib/types/llm'

interface LLMConfigContextType {
  currentConfig: LLMConfiguration | null
  availableModels: LLMModel[]
  favoriteModels: string[]
  setCurrentConfig: (config: LLMConfiguration) => void
  updateModelParameter: (key: string, value: string | number | boolean) => void
  addFavoriteModel: (modelId: string) => void
  removeFavoriteModel: (modelId: string) => void
  addCustomModel: (model: LLMModel) => void
  getModelById: (modelId: string) => LLMModel | undefined
  resetToDefaults: () => void
  saveSettings: () => void
}

const LLMConfigContext = createContext<LLMConfigContextType | undefined>(undefined)

export function LLMConfigProvider({ children }: { children: ReactNode }) {
  const [currentConfig, setCurrentConfigState] = useState<LLMConfiguration | null>(null)
  const [availableModels, setAvailableModels] = useState<LLMModel[]>(TOP_OPEN_SOURCE_LLMS)
  const [favoriteModels, setFavoriteModels] = useState<string[]>([])

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('llm-settings')
    if (savedSettings) {
      try {
        const settings: LLMSettings = JSON.parse(savedSettings)
        if (settings.selectedModel) {
          setCurrentConfigState(settings.selectedModel)
        }
        if (settings.favoriteModels) {
          setFavoriteModels(settings.favoriteModels)
        }
        if (settings.customModels) {
          setAvailableModels([...TOP_OPEN_SOURCE_LLMS, ...settings.customModels])
        }
      } catch (error) {
        console.error('Failed to load LLM settings:', error)
      }
    }
  }, [])

  const setCurrentConfig = (config: LLMConfiguration) => {
    setCurrentConfigState(config)
  }

  const updateModelParameter = (key: string, value: string | number | boolean) => {
    if (!currentConfig) return
    const updatedConfig = {
      ...currentConfig,
      parameters: {
        ...currentConfig.parameters,
        [key]: value,
      },
      updatedAt: new Date().toISOString(),
    }
    setCurrentConfigState(updatedConfig)
  }

  const addFavoriteModel = (modelId: string) => {
    setFavoriteModels((prev) => {
      if (prev.includes(modelId)) return prev
      return [...prev, modelId]
    })
  }

  const removeFavoriteModel = (modelId: string) => {
    setFavoriteModels((prev) => prev.filter((id) => id !== modelId))
  }

  const addCustomModel = (model: LLMModel) => {
    setAvailableModels((prev) => [...prev, model])
  }

  const getModelById = (modelId: string): LLMModel | undefined => {
    return availableModels.find((model) => model.id === modelId)
  }

  const resetToDefaults = () => {
    setCurrentConfigState(null)
    setFavoriteModels([])
    localStorage.removeItem('llm-settings')
  }

  const saveSettings = () => {
    const settings: LLMSettings = {
      selectedModel: currentConfig,
      favoriteModels,
      customModels: availableModels.filter((m) => !TOP_OPEN_SOURCE_LLMS.find((o) => o.id === m.id)),
    }
    localStorage.setItem('llm-settings', JSON.stringify(settings))
  }

  return (
    <LLMConfigContext.Provider
      value={{
        currentConfig,
        availableModels,
        favoriteModels,
        setCurrentConfig,
        updateModelParameter,
        addFavoriteModel,
        removeFavoriteModel,
        addCustomModel,
        getModelById,
        resetToDefaults,
        saveSettings,
      }}
    >
      {children}
    </LLMConfigContext.Provider>
  )
}

export function useLLMConfig(): LLMConfigContextType {
  const context = useContext(LLMConfigContext)
  if (!context) {
    throw new Error('useLLMConfig must be used within LLMConfigProvider')
  }
  return context
}
