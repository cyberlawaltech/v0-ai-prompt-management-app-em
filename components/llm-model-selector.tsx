'use client'

import React from 'react'
import { Check, Star, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLLMConfig } from '@/lib/contexts/llm-config-context'
import type { LLMModel } from '@/lib/types/llm'

interface LLMModelSelectorProps {
  model: LLMModel
}

export function LLMModelSelector({ model }: LLMModelSelectorProps) {
  const { currentConfig, favoriteModels, setCurrentConfig, addFavoriteModel, removeFavoriteModel } = useLLMConfig()

  const isSelected = currentConfig?.modelId === model.id
  const isFavorited = favoriteModels.includes(model.id)

  const handleSelectModel = () => {
    const config = {
      modelId: model.id,
      modelName: model.displayName,
      provider: model.provider,
      parameters: Object.fromEntries(
        model.supportedParameters.map((param) => [param.key, param.default])
      ),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setCurrentConfig(config)
  }

  return (
    <Card className={`overflow-hidden transition-all ${isSelected ? 'ring-2 ring-primary border-primary' : ''}`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg truncate">{model.displayName}</h3>
              <Badge variant="outline" className="whitespace-nowrap">
                {model.provider}
              </Badge>
              {isSelected && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Selected
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{model.description}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              if (isFavorited) {
                removeFavoriteModel(model.id)
              } else {
                addFavoriteModel(model.id)
              }
            }}
            className="flex-shrink-0"
          >
            <Star className={`h-4 w-4 ${isFavorited ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </Button>
        </div>

        {/* Specs Row */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Context:</span>
            <span className="font-medium">{model.contextWindow.toLocaleString()} tokens</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Max Output:</span>
            <span className="font-medium">{model.maxTokens.toLocaleString()} tokens</span>
          </div>
          {model.releaseDate && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Release:</span>
              <span className="font-medium">{model.releaseDate}</span>
            </div>
          )}
        </div>

        {/* Capabilities */}
        <div className="mt-3 flex flex-wrap gap-2">
          {model.capabilities.slice(0, 3).map((capability) => (
            <Badge key={capability} variant="secondary" className="text-xs">
              {capability}
            </Badge>
          ))}
          {model.capabilities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{model.capabilities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Select Button */}
        <div className="mt-4">
          <Button
            onClick={handleSelectModel}
            variant={isSelected ? 'default' : 'outline'}
            className="w-full"
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Model Selected
              </>
            ) : (
              <>
                Select Model
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
