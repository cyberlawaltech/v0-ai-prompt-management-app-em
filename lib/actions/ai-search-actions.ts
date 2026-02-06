// Import necessary modules or declare variables here
// For example, if 'use server' is a directive, it should be at the top

interface SearchResult {
  id: string
  title: string
  description: string
  type: "prompt" | "agent" | "research" | "file" | "user" | "setting"
  href: string
  icon: string
  relevance: number
  preview?: string
  metadata?: {
    category?: string
    tags?: string[]
    lastModified?: string
    author?: string
  }
}

interface ProactiveSuggestion {
  id: string
  title: string
  description: string
  action: string
  href: string
  icon: any
  priority: number
}

interface UserBehavior {
  frequentSearches: string[]
  preferredCategories: string[]
  recentActivity: string[]
}

interface ProcessedQuery {
  enhancedQuery: string
  intent: string
  entities: string[]
  suggestions: string[]
}

// Declare generateText function here or import it
async function generateText(options: any): Promise<any> {
  // Mock implementation for demonstration purposes
  return { text: JSON.stringify([{ id: "mock-id", title: "Mock Title", description: "Mock Description", type: "prompt", href: "/mock-path", icon: "mock-icon", relevance: 0.9 }]) };
}

async function safeGenerateText(prompt: string): Promise<string | null> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key not configured")
      return null
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      maxTokens: 500,
    })

    return text
  } catch (error: any) {
    // Handle specific AI Gateway errors
    if (error?.message?.includes("customer_verification_required") || error?.status === 403) {
      console.warn("AI Gateway requires credit card verification. Using fallback data.")
      return null
    }
    
    // Handle other API errors
    if (error?.message?.includes("ai-gateway") || error?.status === 401 || error?.status === 429) {
      console.warn("AI service temporarily unavailable:", error?.message)
      return null
    }
    
    console.warn("AI generation failed, using fallback:", error)
    return null
  }
}

export async function generateSearchSuggestions(
  query: string,
  options?: {
    userPreferences?: string[]
    recentActivity?: string[]
    contextualHints?: string[]
  },
): Promise<SearchResult[]> {
  const aiResponse = await safeGenerateText(`
    Generate search suggestions for a prompt engineering application based on this query: "${query}"
    
    Context: This is an AI prompt management app with features like:
    - Prompt Database for storing and organizing prompts
    - Test Centre for systematic prompt testing
    - Agent creation for multi-agent workflows
    - Research Center for prompt engineering research
    - Knowledge Base for context management
    
    User preferences: ${options?.userPreferences?.join(", ") || "none"}
    Recent activity: ${options?.recentActivity?.join(", ") || "none"}
    
    Return 5-8 relevant suggestions as a JSON array with this structure:
    {
      "id": "unique-id",
      "title": "Result Title",
      "description": "Brief description",
      "type": "prompt|agent|research|file|user|setting",
      "href": "/relevant-path",
      "icon": "icon-name",
      "relevance": 0.9,
      "preview": "Optional preview text",
      "metadata": {
        "category": "Category Name",
        "tags": ["tag1", "tag2"],
        "lastModified": "2024-01-15",
        "author": "System"
      }
    }
  `)

  if (aiResponse) {
    try {
      const parsed = JSON.parse(aiResponse)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (error) {
      console.warn("Failed to parse AI response, using fallback")
    }
  }

  // Fallback mock data when AI is unavailable
  return [
    {
      id: "prompt-customer-service",
      title: "Customer Service Prompt Templates",
      description: "Pre-built prompts for customer support scenarios",
      type: "prompt",
      href: "/prompt-library?category=customer-service",
      icon: "message-square",
      relevance: 0.9,
      preview: "You are a helpful customer service representative...",
      metadata: {
        category: "Customer Service",
        tags: ["support", "templates", "customer"],
        lastModified: "2024-01-15",
        author: "System",
      },
    },
    {
      id: "test-centre-guide",
      title: "Test Centre Tutorial",
      description: "Learn how to systematically test your prompts",
      type: "research",
      href: "/test-centre",
      icon: "test-tube",
      relevance: 0.8,
      metadata: {
        category: "Testing",
        tags: ["tutorial", "testing", "validation"],
        lastModified: "2024-01-14",
        author: "System",
      },
    },
    {
      id: "agent-orchestration",
      title: "Multi-Agent Workflow Builder",
      description: "Create complex workflows with multiple specialized agents",
      type: "agent",
      href: "/create-agent",
      icon: "bot",
      relevance: 0.85,
      metadata: {
        category: "Agents",
        tags: ["workflow", "automation", "agents"],
        lastModified: "2024-01-13",
        author: "System",
      },
    },
  ]
}

export async function processNaturalLanguageQuery(
  query: string,
  context?: {
    context?: string
    userBehavior?: UserBehavior
    previousQuery?: string
  },
): Promise<ProcessedQuery> {
  const aiResponse = await safeGenerateText(`
    Process this natural language query for a prompt engineering application: "${query}"
    
    Previous context: ${context?.context || "none"}
    Previous query: ${context?.previousQuery || "none"}
    User behavior: ${JSON.stringify(context?.userBehavior) || "none"}
    
    Return a JSON object with:
    {
      "enhancedQuery": "Improved search query",
      "intent": "User's likely intent",
      "entities": ["extracted", "entities"],
      "suggestions": ["auto", "completion", "suggestions"]
    }
  `)

  if (aiResponse) {
    try {
      const parsed = JSON.parse(aiResponse)
      return parsed
    } catch (error) {
      console.warn("Failed to parse AI response, using fallback")
    }
  }

  // Fallback processing when AI is unavailable
  return {
    enhancedQuery: query,
    intent: "search",
    entities: query.split(" ").filter((word) => word.length > 3),
    suggestions: [`${query} templates`, `${query} examples`, `${query} best practices`],
  }
}

export async function getProactiveSuggestions(userBehavior: UserBehavior): Promise<ProactiveSuggestion[]> {
  const aiResponse = await safeGenerateText(`
    Generate proactive suggestions for a prompt engineering app user based on their behavior:
    
    Frequent searches: ${userBehavior.frequentSearches.join(", ")}
    Preferred categories: ${userBehavior.preferredCategories.join(", ")}
    Recent activity: ${userBehavior.recentActivity.join(", ")}
    
    Return 3-5 personalized suggestions as JSON array:
    {
      "id": "suggestion-id",
      "title": "Suggestion Title",
      "description": "Why this is relevant",
      "action": "Suggested action",
      "href": "/relevant-path",
      "priority": 1-10
    }
  `)

  if (aiResponse) {
    try {
      const parsed = JSON.parse(aiResponse)
      if (Array.isArray(parsed)) {
        return parsed.map((suggestion) => ({
          ...suggestion,
          icon: "lightbulb", // Default icon
        }))
      }
    } catch (error) {
      console.warn("Failed to parse AI response, using fallback")
    }
  }

  // Fallback suggestions when AI is unavailable
  return [
    {
      id: "explore-test-centre",
      title: "Try the Test Centre",
      description: "Based on your prompt creation activity, testing would help optimize your prompts",
      action: "Start Testing",
      href: "/test-centre",
      icon: "test-tube",
      priority: 8,
    },
    {
      id: "create-agent",
      title: "Create Your First Agent",
      description: "Automate complex tasks with specialized AI agents",
      action: "Create Agent",
      href: "/create-agent",
      icon: "bot",
      priority: 7,
    },
    {
      id: "research-guidance",
      title: "Explore Research Methods",
      description: "Learn advanced prompt engineering techniques",
      action: "View Guide",
      href: "/research-guidance",
      icon: "brain",
      priority: 6,
    },
  ]
}
