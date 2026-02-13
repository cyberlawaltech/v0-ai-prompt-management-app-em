import type { AgentConfig, AgentType, WebScrapingProvider, WebScrapingConfig } from "@/lib/types/agent"
import type { OpenClawSettings, FirecrawlSettings, SpiderCreatorSettings } from "@/lib/types/agent"

export interface AgentFormData {
  name: string
  description: string
  category: string
  agentType: AgentType
  capabilities: {
    webBrowsing: boolean
    fileAccess: boolean
    codeExecution: boolean
    apiAccess: boolean
    memory: boolean
    voiceOutput: boolean
  }
  framework?: string
  model?: string
  scrapingProvider?: WebScrapingProvider
  scrapingSettings?: OpenClawSettings | FirecrawlSettings | SpiderCreatorSettings
  temperature?: number
  maxTokens?: number
  autonomousMode?: boolean
  memoryType?: string
  memoryWindowSize?: number
  persistentMemory?: boolean
  systemPrompt?: string
  topP?: number
  frequencyPenalty?: number
  debugMode?: boolean
}

export function buildAgentConfig(formData: AgentFormData): AgentConfig {
  const config: AgentConfig = {
    name: formData.name,
    description: formData.description,
    category: formData.category,
    agentType: formData.agentType,
    capabilities: formData.capabilities,
    framework: formData.framework,
  }

  // Add web scraping configuration if applicable
  if (formData.agentType === "web-scraping" && formData.scrapingProvider) {
    config.scrapingConfig = {
      provider: formData.scrapingProvider,
      providerSettings: formData.scrapingSettings || {},
    } as WebScrapingConfig
  }

  return config
}

export async function saveAgent(agentConfig: AgentConfig): Promise<void> {
  // This would typically make an API call to save the agent
  // For now, we'll just validate and store locally
  if (!agentConfig.name || !agentConfig.description) {
    throw new Error("Agent name and description are required")
  }

  // Save to localStorage for demo purposes
  const agents = JSON.parse(localStorage.getItem("agents") || "[]")
  agents.push({
    ...agentConfig,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem("agents", JSON.stringify(agents))
}

export function validateScrapingConfig(
  provider: WebScrapingProvider,
  settings: OpenClawSettings | FirecrawlSettings | SpiderCreatorSettings,
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check for required API key
  if (!settings.apiKey) {
    errors.push(`API key is required for ${provider}`)
  }

  // Provider-specific validation
  switch (provider) {
    case "openclaw":
      const openClawSettings = settings as OpenClawSettings
      if (openClawSettings.timeout && openClawSettings.timeout < 5) {
        errors.push("OpenClaw timeout must be at least 5 seconds")
      }
      break
    case "firecrawl":
      const firecrawlSettings = settings as FirecrawlSettings
      if (firecrawlSettings.maxPages && firecrawlSettings.maxPages < 1) {
        errors.push("Firecrawl max pages must be at least 1")
      }
      break
    case "spidercreator":
      const spiderSettings = settings as SpiderCreatorSettings
      if (spiderSettings.maxDepth && spiderSettings.maxDepth < 1) {
        errors.push("SpiderCreator max depth must be at least 1")
      }
      break
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
