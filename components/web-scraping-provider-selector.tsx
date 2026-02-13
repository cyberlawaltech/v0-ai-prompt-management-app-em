"use client"

import type { WebScrapingProvider } from "@/lib/types/agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Zap, Cpu } from "lucide-react"

interface WebScrapingProviderSelectorProps {
  selectedProvider?: WebScrapingProvider
  onSelectProvider: (provider: WebScrapingProvider) => void
}

export function WebScrapingProviderSelector({
  selectedProvider,
  onSelectProvider,
}: WebScrapingProviderSelectorProps) {
  const providers = [
    {
      id: "openclaw" as WebScrapingProvider,
      name: "OpenClaw",
      description: "High-performance web scraping with intelligent parsing",
      icon: Database,
      features: ["Fast parsing", "JavaScript support", "Proxy support"],
      tier: "Professional",
    },
    {
      id: "firecrawl" as WebScrapingProvider,
      name: "Firecrawl",
      description: "Enterprise-grade web crawling with advanced filtering",
      icon: Zap,
      features: ["Smart filtering", "CSS removal", "Screenshot capture"],
      tier: "Enterprise",
    },
    {
      id: "spidercreator" as WebScrapingProvider,
      name: "SpiderCreator",
      description: "Visual web scraping with custom extraction rules",
      icon: Cpu,
      features: ["Visual builder", "Deep crawling", "Data extraction"],
      tier: "Advanced",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((provider) => {
          const Icon = provider.icon
          const isSelected = selectedProvider === provider.id

          return (
            <button
              key={provider.id}
              onClick={() => onSelectProvider(provider.id)}
              className="text-left"
            >
              <Card
                className={`cursor-pointer transition-all h-full ${
                  isSelected ? "ring-2 ring-purple-500 border-purple-500" : "hover:shadow-md"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Icon className="h-6 w-6 text-purple-600" />
                    {isSelected && <div className="h-2 w-2 rounded-full bg-purple-500" />}
                  </div>
                  <CardTitle className="mt-2">{provider.name}</CardTitle>
                  <CardDescription>{provider.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {provider.tier}
                  </Badge>
                </CardContent>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
