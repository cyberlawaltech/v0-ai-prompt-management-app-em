"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Mic, X, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "use-debounce"
import { getSearchSuggestions } from "@/lib/actions/search-actions"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"
import { useRouter } from "next/navigation"

interface SearchSuggestion {
  id: string
  text: string
  type: "prompt" | "category" | "agent" | "research"
  icon?: string
  href?: string
}

export function AISearchSuggestions() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      setLoading(true)
      getSearchSuggestions(debouncedQuery)
        .then((results) => {
          setSuggestions(results)
          setOpen(true)
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error)
          setSuggestions([])
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setSuggestions([])
      setOpen(query.length > 0)
    }
  }, [debouncedQuery, query])

  const handleSelect = (suggestion: SearchSuggestion) => {
    // Save to recent searches
    const newRecentSearches = [suggestion.text, ...recentSearches.filter((s) => s !== suggestion.text)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem("recent-searches", JSON.stringify(newRecentSearches))

    // Navigate based on suggestion type
    if (suggestion.href) {
      router.push(suggestion.href)
    } else {
      // Default navigation based on type
      switch (suggestion.type) {
        case "prompt":
          router.push("/prompt-database")
          break
        case "agent":
          router.push("/create-agent")
          break
        case "research":
          router.push("/research-center")
          break
        default:
          router.push("/")
      }
    }

    setOpen(false)
    setQuery("")
  }

  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    setOpen(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search prompts, agents, research..."
          className="w-full rounded-lg border border-input bg-background pl-8 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-8 top-1.5 h-5 w-5 rounded-full opacity-70 hover:opacity-100"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-7 w-7 rounded-full"
          onClick={() => {
            // Toggle voice search
          }}
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only">Voice search</span>
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 w-full z-50 mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <Command className="rounded-lg border shadow-md bg-background">
              <CommandList>
                {loading ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span>Searching...</span>
                    </div>
                  </div>
                ) : query.length === 0 && recentSearches.length > 0 ? (
                  <CommandGroup heading="Recent Searches">
                    {recentSearches.map((search, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => setQuery(search)}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                      >
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{search}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : suggestions.length > 0 ? (
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.id}
                        onSelect={() => handleSelect(suggestion)}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                      >
                        {suggestion.type === "prompt" && <Search className="h-4 w-4 text-blue-500" />}
                        {suggestion.type === "category" && <Search className="h-4 w-4 text-green-500" />}
                        {suggestion.type === "agent" && <Search className="h-4 w-4 text-purple-500" />}
                        {suggestion.type === "research" && <Search className="h-4 w-4 text-orange-500" />}
                        <span className="flex-1">{suggestion.text}</span>
                        <span className="text-xs text-muted-foreground capitalize">{suggestion.type}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : query.length > 1 ? (
                  <CommandEmpty>No results found for "{query}"</CommandEmpty>
                ) : null}
              </CommandList>
            </Command>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
