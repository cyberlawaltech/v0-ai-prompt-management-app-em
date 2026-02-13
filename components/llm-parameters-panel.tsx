'use client'

import React from 'react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLLMConfig } from '@/lib/contexts/llm-config-context'
import type { LLMConfiguration, LLMModel } from '@/lib/types/llm'

interface LLMParametersPanelProps {
  model: LLMModel
  config: LLMConfiguration
}

export function LLMParametersPanel({ model, config }: LLMParametersPanelProps) {
  const { updateModelParameter } = useLLMConfig()

  const handleParameterChange = (key: string, value: string | number | boolean) => {
    updateModelParameter(key, value)
  }

  if (model.supportedParameters.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Parameters</CardTitle>
        <CardDescription>Configure advanced settings for your selected model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {model.supportedParameters.map((param) => {
          const currentValue = config.parameters[param.key] ?? param.default

          return (
            <div key={param.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor={param.key} className="font-semibold">
                  {param.name}
                  {param.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {param.type === 'number' && (
                  <span className="text-sm font-medium text-muted-foreground">
                    {typeof currentValue === 'number' ? currentValue.toFixed(param.step ? 2 : 0) : currentValue}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{param.description}</p>

              {param.type === 'number' && (
                <div className="space-y-2">
                  <Slider
                    id={param.key}
                    min={param.min ?? 0}
                    max={param.max ?? 100}
                    step={param.step ?? 1}
                    value={[typeof currentValue === 'number' ? currentValue : parseFloat(String(currentValue))]}
                    onValueChange={(value) => handleParameterChange(param.key, value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{param.min ?? 0}</span>
                    <span>{param.max ?? 100}</span>
                  </div>
                </div>
              )}

              {param.type === 'string' && !param.options && (
                <Input
                  id={param.key}
                  type="text"
                  value={String(currentValue)}
                  onChange={(e) => handleParameterChange(param.key, e.target.value)}
                  placeholder={String(param.default)}
                />
              )}

              {param.type === 'select' && param.options && (
                <Select value={String(currentValue)} onValueChange={(value) => handleParameterChange(param.key, value)}>
                  <SelectTrigger id={param.key}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {param.options.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {param.type === 'boolean' && (
                <div className="flex items-center gap-2">
                  <input
                    id={param.key}
                    type="checkbox"
                    checked={Boolean(currentValue)}
                    onChange={(e) => handleParameterChange(param.key, e.target.checked)}
                    className="rounded border border-input"
                  />
                  <label htmlFor={param.key} className="text-sm cursor-pointer">
                    Enable {param.name}
                  </label>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
