"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Search,
  Mic,
  MicOff,
  Sparkles,
  Clock,
  ArrowRight,
  Zap,
  FileText,
  Bot,
  Users,
  Settings,
  Brain,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import {
  generateSearchSuggestions,
  processNaturalLanguageQuery,
  getProactiveSuggestions,
} from "@/lib/actions/ai-search-actions"

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

interface VoiceSearchState {
  isListening: boolean
  transcript: string
  isSupported: boolean
  confidence: number
}

interface AIAssistantState {
  isActive: boolean
  suggestions: ProactiveSuggestion[]
  context: string
  lastQuery: string
  userBehavior: {
    frequentSearches: string[]
    preferredCategories: string[]
    recentActivity: string[]
  }
}

export function AISearchAssistant() {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [autoCompletions, setAutoCompletions] = useState<string[]>([])

  const [voiceSearch, setVoiceSearch] = useState<VoiceSearchState>({
    isListening: false,
    transcript: "",
    isSupported: false,
    confidence: 0,
  })

  const [aiAssistant, setAiAssistant] = useState<AIAssistantState>({
    isActive: true,
    suggestions: [],
    context: "",
    lastQuery: "",
    userBehavior: {
      frequentSearches: [],
      preferredCategories: [],
      recentActivity: [],
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const router = useRouter()

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onstart = () => {
          setVoiceSearch((prev) => ({ ...prev, isListening: true }))
        }

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("")

          const confidence = event.results[0]?.[0]?.confidence || 0

          setVoiceSearch((prev) => ({
            ...prev,
            transcript,
            confidence,
          }))

          if (event.results[0]?.isFinal) {
            setQuery(transcript)
            setVoiceSearch((prev) => ({ ...prev, isListening: false }))
          }
        }

        recognitionRef.current.onend = () => {
          setVoiceSearch((prev) => ({ ...prev, isListening: false }))
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setVoiceSearch((prev) => ({ ...prev, isListening: false }))
        }

        setVoiceSearch((prev) => ({ ...prev, isSupported: true }))
      }
    }
  }, [])

  // Load user behavior and recent searches
  useEffect(() => {
    const loadUserData = () => {
      const savedSearches = localStorage.getItem("recent-searches")
      const savedBehavior = localStorage.getItem("user-search-behavior")

      if (savedSearches) {
        try {
          setRecentSearches(JSON.parse(savedSearches))
        } catch (error) {
          console.error("Error loading recent searches:", error)
        }
      }

      if (savedBehavior) {
        try {
          const behavior = JSON.parse(savedBehavior)
          setAiAssistant((prev) => ({ ...prev, userBehavior: behavior }))
        } catch (error) {
          console.error("Error loading user behavior:", error)
        }
      }
    }

    loadUserData()
  }, [])

  // Generate proactive suggestions based on user behavior
  useEffect(() => {
    const generateProactiveSuggestions = async () => {
      if (!aiAssistant.isActive) return

      try {
        const suggestions = await getProactiveSuggestions(aiAssistant.userBehavior)
        setAiAssistant((prev) => ({ ...prev, suggestions }))
      } catch (error) {
        console.error("Error generating proactive suggestions:", error)
      }
    }

    generateProactiveSuggestions()
  }, [aiAssistant.userBehavior, aiAssistant.isActive])

  // AI-powered search with enhanced features
  useEffect(() => {
    const performEnhancedSearch = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        setAutoCompletions([])
        setIsOpen(query.length > 0)
        return
      }

      setLoading(true)
      try {
        // Process natural language query with context
        const processedQuery = await processNaturalLanguageQuery(debouncedQuery, {
          context: aiAssistant.context,
          userBehavior: aiAssistant.userBehavior,
          previousQuery: aiAssistant.lastQuery,
        })

        // Generate AI suggestions with enhanced context
        const suggestions = await generateSearchSuggestions(processedQuery.enhancedQuery || debouncedQuery, {
          userPreferences: aiAssistant.userBehavior.preferredCategories,
          recentActivity: aiAssistant.userBehavior.recentActivity,
          contextualHints: processedQuery.entities,
        })

        setResults(suggestions)
        setAutoCompletions(processedQuery.suggestions || [])
        setIsOpen(true)
        setSelectedIndex(-1)

        // Update AI assistant context
        setAiAssistant((prev) => ({
          ...prev,
          context: processedQuery.intent,
          lastQuery: debouncedQuery,
        }))
      } catch (error) {
        console.error("Enhanced search error:", error)
        setResults([])
        setAutoCompletions([])
      } finally {
        setLoading(false)
      }
    }

    performEnhancedSearch()
  }, [debouncedQuery, query, aiAssistant.context, aiAssistant.userBehavior])

  // Keyboard navigation with enhanced features
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      const totalItems = results.length + autoCompletions.length

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % Math.max(totalItems, 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + Math.max(totalItems, 1)) % Math.max(totalItems, 1))
          break
        case "Enter":
          e.preventDefault()
          if (selectedIndex >= 0) {
            if (selectedIndex < autoCompletions.length) {
              // Auto-completion selected
              setQuery(autoCompletions[selectedIndex])
            } else {
              // Search result selected
              const resultIndex = selectedIndex - autoCompletions.length
              if (results[resultIndex]) {
                handleResultSelect(results[resultIndex])
              }
            }
          }
          break
        case "Tab":
          e.preventDefault()
          if (autoCompletions.length > 0) {
            setQuery(autoCompletions[0])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          setSelectedIndex(-1)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, autoCompletions, selectedIndex])

  const handleResultSelect = useCallback(
    (result: SearchResult) => {
      // Update user behavior
      const newBehavior = {
        ...aiAssistant.userBehavior,
        frequentSearches: [query, ...aiAssistant.userBehavior.frequentSearches.filter((s) => s !== query)].slice(0, 10),
        preferredCategories: [
          result.type,
          ...aiAssistant.userBehavior.preferredCategories.filter((c) => c !== result.type),
        ].slice(0, 5),
        recentActivity: [
          result.href,
          ...aiAssistant.userBehavior.recentActivity.filter((a) => a !== result.href),
        ].slice(0, 20),
      }

      // Save to localStorage
      const newRecentSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
      setRecentSearches(newRecentSearches)
      localStorage.setItem("recent-searches", JSON.stringify(newRecentSearches))
      localStorage.setItem("user-search-behavior", JSON.stringify(newBehavior))

      setAiAssistant((prev) => ({ ...prev, userBehavior: newBehavior }))

      // Navigate to result
      router.push(result.href)
      setIsOpen(false)
      setQuery("")
    },
    [query, recentSearches, router, aiAssistant.userBehavior],
  )

  const handleAutoCompletionSelect = (completion: string) => {
    setQuery(completion)
    inputRef.current?.focus()
  }

  const toggleVoiceSearch = () => {
    if (!voiceSearch.isSupported) return

    if (voiceSearch.isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "prompt":
        return FileText
      case "agent":
        return Bot
      case "research":
        return Sparkles
      case "user":
        return Users
      case "setting":
        return Settings
      default:
        return Search
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prompt":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "agent":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "research":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "file":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "user":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      case "setting":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          <Brain className="h-4 w-4 text-primary mr-2 animate-pulse" />
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>

        <Input
          ref={inputRef}
          type="search"
          placeholder="Ask AI anything... Try 'create a research prompt' or 'show me agent templates'"
          className="w-full pl-12 pr-12 py-3 text-base bg-background/50 backdrop-blur border-2 focus:border-primary/50 transition-all duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {voiceSearch.isSupported && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${voiceSearch.isListening ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}
              onClick={toggleVoiceSearch}
            >
              {voiceSearch.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}

          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </div>
      </div>

      {/* Voice Search Feedback */}
      {voiceSearch.isListening && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-1 p-3 bg-primary/10 border border-primary/20 rounded-lg backdrop-blur"
        >
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150" />
            </div>
            <span className="text-sm font-medium">AI is listening...</span>
            {voiceSearch.transcript && (
              <span className="text-sm text-muted-foreground">"{voiceSearch.transcript}"</span>
            )}
            {voiceSearch.confidence > 0 && (
              <Badge variant="outline" className="text-xs">
                {Math.round(voiceSearch.confidence * 100)}% confident
              </Badge>
            )}
          </div>
        </motion.div>
      )}

      {/* Enhanced Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-2xl border-2 bg-background/95 backdrop-blur-xl">
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Brain className="h-5 w-5 animate-pulse text-primary" />
                      <span className="text-sm font-medium">AI Assistant is thinking...</span>
                    </div>
                  </div>
                ) : query.length === 0 ? (
                  <div className="p-4">
                    {/* Proactive AI Suggestions */}
                    {aiAssistant.suggestions.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium text-muted-foreground">AI Suggestions for You</span>
                        </div>
                        <div className="space-y-2">
                          {aiAssistant.suggestions.slice(0, 3).map((suggestion) => (
                            <button
                              key={suggestion.id}
                              onClick={() => router.push(suggestion.href)}
                              className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <suggestion.icon className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="text-sm font-medium">{suggestion.title}</div>
                                  <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Recent Searches</span>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-2">
                    <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                      <Brain className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm font-medium">AI-Enhanced Results</span>
                      <Badge variant="secondary" className="text-xs">
                        {results.length} found
                      </Badge>
                      {aiAssistant.context && (
                        <Badge variant="outline" className="text-xs">
                          Intent: {aiAssistant.context}
                        </Badge>
                      )}
                    </div>

                    {/* Auto-completions */}
                    {autoCompletions.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 px-3 py-1 mb-2">
                          <Zap className="h-3 w-3 text-amber-500" />
                          <span className="text-xs font-medium text-muted-foreground">Quick Completions</span>
                        </div>
                        <div className="flex flex-wrap gap-1 px-3">
                          {autoCompletions.slice(0, 3).map((completion, index) => (
                            <button
                              key={index}
                              onClick={() => handleAutoCompletionSelect(completion)}
                              className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                                selectedIndex === index
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-accent"
                              }`}
                            >
                              {completion}
                            </button>
                          ))}
                        </div>
                        <Separator className="my-2" />
                      </div>
                    )}

                    {/* Search Results */}
                    {results.length > 0 ? (
                      <div className="space-y-1">
                        {results.map((result, index) => {
                          const Icon = getResultIcon(result.type)
                          const resultIndex = index + autoCompletions.length
                          const isSelected = resultIndex === selectedIndex

                          return (
                            <motion.button
                              key={result.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleResultSelect(result)}
                              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                                isSelected ? "bg-accent shadow-md" : "hover:bg-accent/50"
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  <div className="p-2 rounded-md bg-primary/10">
                                    <Icon className="h-4 w-4 text-primary" />
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="font-medium text-sm truncate">{result.title}</h3>
                                    <Badge className={`text-xs ${getTypeColor(result.type)}`}>{result.type}</Badge>
                                    {result.relevance > 0.8 && (
                                      <Badge variant="outline" className="text-xs">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        Best Match
                                      </Badge>
                                    )}
                                  </div>

                                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {result.description}
                                  </p>

                                  {result.preview && (
                                    <div className="text-xs bg-muted/50 rounded px-2 py-1 mb-2 font-mono">
                                      {result.preview}
                                    </div>
                                  )}

                                  {result.metadata && (
                                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                      {result.metadata.category && <span>Category: {result.metadata.category}</span>}
                                      {result.metadata.author && <span>By: {result.metadata.author}</span>}
                                      {result.metadata.lastModified && (
                                        <span>Modified: {result.metadata.lastModified}</span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-shrink-0">
                                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                        <p className="text-sm font-medium mb-1">No results found</p>
                        <p className="text-xs text-muted-foreground">
                          Try different keywords or let AI help refine your search
                        </p>
                      </div>
                    )}

                    <Separator className="my-3" />

                    <div className="px-3 py-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Use ↑↓ to navigate, Tab for completion, Enter to select, Esc to close
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
