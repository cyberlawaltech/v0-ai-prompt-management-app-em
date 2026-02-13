'use client'

import React, { useState, useMemo } from 'react'
import { Search, Star, Plus, Zap, Info, Code } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLLMConfig } from '@/lib/contexts/llm-config-context'
import { LLMModelSelector } from './llm-model-selector'
import { LLMParametersPanel } from './llm-parameters-panel'
import type { LLMModel } from '@/lib/types/llm'

export function LLMConfigPanel() {
  const { currentConfig, availableModels, favoriteModels, addFavoriteModel, removeFavoriteModel, saveSettings } = useLLMConfig()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('browse')
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const filteredModels = useMemo(() => {
    return availableModels.filter((model) => {
      const matchesSearch = model.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesProvider = !selectedProvider || model.provider === selectedProvider

      return matchesSearch && matchesProvider
    })
  }, [availableModels, searchQuery, selectedProvider])

  const providers = useMemo(() => {
    return Array.from(new Set(availableModels.map((m) => m.provider)))
  }, [availableModels])

  const currentModel = currentConfig ? availableModels.find((m) => m.id === currentConfig.modelId) : null
  const isFavorited = currentConfig ? favoriteModels.includes(currentConfig.modelId) : false

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">LLM Configuration</h2>
        <p className="text-muted-foreground">Select and customize your preferred large language model</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Models</TabsTrigger>
          <TabsTrigger value="configure">Configure Selected</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Available Models
              </CardTitle>
              <CardDescription>Browse from {availableModels.length} open-source LLMs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search models by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Provider Filter */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedProvider === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedProvider(null)}
                  >
                    All Providers
                  </Button>
                  {providers.map((provider) => (
                    <Button
                      key={provider}
                      variant={selectedProvider === provider ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Models Grid */}
              <div className="grid gap-4">
                {filteredModels.map((model) => (
                  <LLMModelSelector key={model.id} model={model} />
                ))}
                {filteredModels.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No models found matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="space-y-4">
          {currentConfig && currentModel ? (
            <>
              {/* Current Model Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        {currentModel.displayName}
                      </CardTitle>
                      <CardDescription>{currentModel.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (isFavorited) {
                          removeFavoriteModel(currentConfig.modelId)
                        } else {
                          addFavoriteModel(currentConfig.modelId)
                        }
                      }}
                    >
                      <Star className={`h-5 w-5 ${isFavorited ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Provider</p>
                      <Badge variant="outline">{currentModel.provider}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Context Window</p>
                      <p className="font-semibold">{currentModel.contextWindow.toLocaleString()} tokens</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Max Output</p>
                      <p className="font-semibold">{currentModel.maxTokens.toLocaleString()} tokens</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Release Date</p>
                      <p className="font-semibold">{currentModel.releaseDate || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Capabilities</p>
                    <div className="flex flex-wrap gap-2">
                      {currentModel.capabilities.map((capability) => (
                        <Badge key={capability} variant="secondary">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Parameter Configuration */}
              <LLMParametersPanel model={currentModel} config={currentConfig} />

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setActiveTab('browse')}>
                  Change Model
                </Button>
                <Button onClick={saveSettings}>
                  Save Configuration
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <Info className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold">No Model Selected</h3>
                    <p className="text-sm text-muted-foreground">Select a model from the Browse Models tab to configure it</p>
                  </div>
                  <Button onClick={() => setActiveTab('browse')}>Browse Models</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
