"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useQuickActions } from "@/lib/contexts/quick-actions-context"
import {
  Home,
  MessageSquare,
  FolderOpen,
  BookOpen,
  Bot,
  BarChart3,
  FileText,
  Library,
  TestTube,
  Search,
  Network,
  GitBranch,
  Share2,
  Users,
  Settings,
  Layout,
  Palette,
  Clock,
  Zap,
} from "lucide-react"

const iconMap = {
  Home,
  MessageSquare,
  FolderOpen,
  BookOpen,
  Bot,
  BarChart3,
  FileText,
  Library,
  TestTube,
  Search,
  Network,
  GitBranch,
  Share2,
  Users,
  Settings,
  Layout,
  Palette,
  Clock,
  Zap,
}

const categoryColors = {
  Navigation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Agents: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Prompts: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Research: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Collaboration: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Settings: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "Quick Actions": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
}

export function QuickActionsDialog() {
  const { isOpen, setIsOpen, searchActions, executeAction, recentActions } = useQuickActions()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = searchActions(query)

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % results.length)
          break
        case "ArrowUp":
          event.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
          break
        case "Enter":
          event.preventDefault()
          if (results[selectedIndex]) {
            executeAction(results[selectedIndex].id)
          }
          break
        case "Escape":
          event.preventDefault()
          setIsOpen(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex, executeAction, setIsOpen])

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="border-b">
          <div className="flex items-center px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <Input
              ref={inputRef}
              placeholder="Search for actions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-base"
            />
            <Badge variant="outline" className="ml-2 text-xs">
              Ctrl+K
            </Badge>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {!query && recentActions.length > 0 && (
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                Recent Actions
              </div>
            </div>
          )}

          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No actions found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((action, index) => {
                const Icon = iconMap[action.icon as keyof typeof iconMap] || Search
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={action.id}
                    onClick={() => executeAction(action.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors ${
                      isSelected ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{action.title}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              categoryColors[action.category as keyof typeof categoryColors] ||
                              categoryColors["Quick Actions"]
                            }`}
                          >
                            {action.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                      </div>
                      {action.shortcut && (
                        <Badge variant="outline" className="text-xs font-mono">
                          {action.shortcut}
                        </Badge>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Use ↑↓ to navigate, ↵ to select, esc to close</span>
            <span>{results.length} actions available</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
