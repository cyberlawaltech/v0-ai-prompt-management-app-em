// Agent type definitions
export type AgentType = "general" | "web-scraping"

export interface AgentConfig {
  name: string
  description: string
  category: string
  agentType: AgentType
  capabilities: {
    webBrowsing: boolean
    fileAccess: boolean
    codeExecution: boolean
    apiAccess: boolean
  }
  framework?: string
  scrapingConfig?: WebScrapingConfig
}

// Web Scraping Agent Types
export type WebScrapingProvider = "openclaw" | "firecrawl" | "spidercreator"

export interface WebScrapingConfig {
  provider: WebScrapingProvider
  providerSettings: OpenClawSettings | FirecrawlSettings | SpiderCreatorSettings
}

// OpenClaw Configuration
export interface OpenClawSettings {
  apiKey?: string
  timeout?: number
  retryAttempts?: number
  respectRobotsTxt?: boolean
  userAgent?: string
  customHeaders?: Record<string, string>
  javascriptRendering?: boolean
  proxyUrl?: string
}

// Firecrawl Configuration
export interface FirecrawlSettings {
  apiKey?: string
  timeout?: number
  maxPages?: number
  crawlSubpages?: boolean
  excludePatterns?: string[]
  onlyIncludePatterns?: string[]
  blockResources?: boolean
  removeCss?: boolean
  removeJavaScript?: boolean
  screenshot?: boolean
  waitFor?: string
}

// SpiderCreator Configuration
export interface SpiderCreatorSettings {
  apiKey?: string
  timeout?: number
  maxDepth?: number
  followExternalLinks?: boolean
  customCss?: string
  customJs?: string
  enableJavaScript?: boolean
  browserType?: "chrome" | "firefox" | "safari"
  dataExtraction?: {
    enableDataExtraction?: boolean
    extractionRules?: string
  }
}
