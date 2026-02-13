"use client"

import type { AgentType } from "@/lib/types/agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe } from "lucide-react"

interface AgentTypeSelectorProps {
  selectedType?: AgentType
  onSelectType: (type: AgentType) => void
}

export function AgentTypeSelector({ selectedType, onSelectType }: AgentTypeSelectorProps) {
  const agentTypes = [
    {
      id: "general" as AgentType,
      name: "General Purpose Agent",
      description: "A versatile AI agent for various tasks",
      icon: Bot,
    },
    {
      id: "web-scraping" as AgentType,
      name: "Web Scraping Agent",
      description: "Specialized agent for web data extraction",
      icon: Globe,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agentTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id
          return (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className="text-left"
            >
              <Card
                className={`cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-blue-500 border-blue-500" : "hover:shadow-md"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {type.name}
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                    {isSelected && <div className="h-3 w-3 rounded-full bg-blue-500 mt-2" />}
                  </div>
                </CardHeader>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
