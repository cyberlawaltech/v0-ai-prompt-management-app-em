"use client"

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { usePermissions } from "@/lib/rbac/rbac-context"

// Define action types
export interface QuickAction {
  id: string
  title: string
  description: string
  category: string
  icon: string
  shortcut?: string
  keywords: string[]
  action: () => void
  permission?: string
}

// Define context type
interface QuickActionsContextType {
  actions: QuickAction[]
  recentActions: QuickAction[]
  executeAction: (actionId: string) => void
  searchActions: (query: string) => QuickAction[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const QuickActionsContext = createContext<QuickActionsContextType | undefined>(undefined)

export function QuickActionsProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [recentActions, setRecentActions] = useState<QuickAction[]>([])
  const [actionFrequency, setActionFrequency] = useState<Record<string, number>>({})
  const permissionsContext = usePermissions()

  // Safe permission check with fallback
  const hasPermission = useCallback(
    (permission: string) => {
      if (permissionsContext) {
        return permissionsContext.hasPermission(permission)
      }
      // Fallback: allow all permissions if RBAC is not available
      console.warn("RBAC context not available, allowing all permissions")
      return true
    },
    [permissionsContext],
  )

  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quick-actions-preferences")
      if (saved) {
        try {
          const { recent, frequency } = JSON.parse(saved)
          setRecentActions(recent || [])
          setActionFrequency(frequency || {})
        } catch (error) {
          console.error("Failed to load quick actions preferences:", error)
        }
      }
    }
  }, [])

  // Save preferences to localStorage
  const savePreferences = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "quick-actions-preferences",
        JSON.stringify({
          recent: recentActions,
          frequency: actionFrequency,
        }),
      )
    }
  }, [recentActions, actionFrequency])

  useEffect(() => {
    savePreferences()
  }, [savePreferences])

  // Define all available actions
  const allActions: QuickAction[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-dashboard",
        title: "Go to Dashboard",
        description: "Navigate to the main dashboard",
        category: "Navigation",
        icon: "Home",
        shortcut: "Ctrl+H",
        keywords: ["dashboard", "home", "main"],
        action: () => router.push("/"),
      },
      {
        id: "nav-chat",
        title: "Open Chat Mode",
        description: "Start a new chat session",
        category: "Navigation",
        icon: "MessageSquare",
        shortcut: "Ctrl+T",
        keywords: ["chat", "conversation", "talk"],
        action: () => router.push("/chat"),
      },
      {
        id: "nav-file-manager",
        title: "Open File Manager",
        description: "Browse and manage files",
        category: "Navigation",
        icon: "FolderOpen",
        shortcut: "Ctrl+F",
        keywords: ["files", "documents", "manager"],
        action: () => router.push("/file-manager"),
      },
      {
        id: "nav-knowledge-base",
        title: "Browse Knowledge Base",
        description: "Access the knowledge repository",
        category: "Navigation",
        icon: "BookOpen",
        shortcut: "Ctrl+K",
        keywords: ["knowledge", "base", "repository", "docs"],
        action: () => router.push("/knowledge-base"),
      },

      // Agents
      {
        id: "agent-create",
        title: "Create New Agent",
        description: "Set up a new AI agent",
        category: "Agents",
        icon: "Bot",
        shortcut: "Ctrl+N",
        keywords: ["agent", "create", "new", "ai"],
        permission: "create-agent",
        action: () => router.push("/create-agent"),
      },
      {
        id: "agent-performance",
        title: "View Agent Performance",
        description: "Check agent metrics and analytics",
        category: "Agents",
        icon: "BarChart3",
        keywords: ["performance", "metrics", "analytics", "stats"],
        permission: "view-agent",
        action: () => router.push("/research-center/communication-logs"),
      },

      // Prompts
      {
        id: "prompt-create",
        title: "Create New Prompt",
        description: "Design a new prompt template",
        category: "Prompts",
        icon: "FileText",
        shortcut: "Ctrl+P",
        keywords: ["prompt", "create", "new", "template"],
        permission: "create-prompt",
        action: () => router.push("/prompt-database"),
      },
      {
        id: "prompt-library",
        title: "Browse Prompt Library",
        description: "Explore existing prompt templates",
        category: "Prompts",
        icon: "Library",
        keywords: ["library", "browse", "templates", "prompts"],
        permission: "view-prompt",
        action: () => router.push("/prompt-library"),
      },
      {
        id: "prompt-test",
        title: "Test Prompt",
        description: "Test and validate prompt performance",
        category: "Prompts",
        icon: "TestTube",
        keywords: ["test", "validate", "check", "performance"],
        permission: "edit-prompt",
        action: () => router.push("/test-centre"),
      },

      // Research
      {
        id: "research-start",
        title: "Start New Research",
        description: "Begin a new research project",
        category: "Research",
        icon: "Search",
        keywords: ["research", "start", "new", "project"],
        permission: "create-research",
        action: () => router.push("/research-center"),
      },
      {
        id: "research-orchestration",
        title: "Orchestrate Agents",
        description: "Manage agent coordination",
        category: "Research",
        icon: "Network",
        keywords: ["orchestrate", "coordinate", "manage", "agents"],
        permission: "edit-research",
        action: () => router.push("/research-center/orchestration"),
      },
      {
        id: "research-knowledge",
        title: "View Knowledge Graph",
        description: "Explore the knowledge network",
        category: "Research",
        icon: "GitBranch",
        keywords: ["knowledge", "graph", "network", "connections"],
        permission: "view-research",
        action: () => router.push("/research-center/knowledge"),
      },

      // Collaboration
      {
        id: "collab-share",
        title: "Share Project",
        description: "Share current project with team",
        category: "Collaboration",
        icon: "Share2",
        keywords: ["share", "collaborate", "team", "project"],
        permission: "manage-team",
        action: () => router.push("/export"),
      },
      {
        id: "collab-research",
        title: "Join Collaborative Research",
        description: "Participate in team research",
        category: "Collaboration",
        icon: "Users",
        keywords: ["collaborate", "team", "research", "join"],
        permission: "view-research",
        action: () => router.push("/collaborative-research"),
      },

      // Settings
      {
        id: "settings-open",
        title: "Open Settings",
        description: "Configure application preferences",
        category: "Settings",
        icon: "Settings",
        shortcut: "Ctrl+,",
        keywords: ["settings", "preferences", "config", "options"],
        action: () => router.push("/settings"),
      },
      {
        id: "settings-sidebar",
        title: "Customize Sidebar",
        description: "Personalize navigation layout",
        category: "Settings",
        icon: "Layout",
        keywords: ["sidebar", "customize", "navigation", "layout"],
        action: () => {
          // This would trigger the sidebar customization dialog
          console.log("Opening sidebar customization")
        },
      },

      // Quick Actions
      {
        id: "quick-search",
        title: "Quick Search",
        description: "Search across all content",
        category: "Quick Actions",
        icon: "Search",
        shortcut: "Ctrl+/",
        keywords: ["search", "find", "lookup", "query"],
        action: () => {
          // Focus search input
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
          if (searchInput) {
            searchInput.focus()
          }
        },
      },
      {
        id: "toggle-theme",
        title: "Toggle Theme",
        description: "Switch between light and dark mode",
        category: "Quick Actions",
        icon: "Palette",
        shortcut: "Ctrl+Shift+T",
        keywords: ["theme", "dark", "light", "mode", "toggle"],
        action: () => {
          // This would trigger theme toggle
          console.log("Toggling theme")
        },
      },
    ],
    [router],
  )

  // Filter actions based on permissions
  const actions = useMemo(() => {
    return allActions.filter((action) => {
      if (!action.permission) return true
      return hasPermission(action.permission)
    })
  }, [allActions, hasPermission])

  // Execute an action and track usage
  const executeAction = useCallback(
    (actionId: string) => {
      const action = actions.find((a) => a.id === actionId)
      if (!action) return

      // Execute the action
      action.action()

      // Update frequency
      setActionFrequency((prev) => ({
        ...prev,
        [actionId]: (prev[actionId] || 0) + 1,
      }))

      // Update recent actions
      setRecentActions((prev) => {
        const filtered = prev.filter((a) => a.id !== actionId)
        return [action, ...filtered].slice(0, 5)
      })

      // Close the dialog
      setIsOpen(false)
    },
    [actions],
  )

  // Search actions with fuzzy matching
  const searchActions = useCallback(
    (query: string): QuickAction[] => {
      if (!query.trim()) {
        // Return recent actions if no query
        return recentActions.length > 0 ? recentActions : actions.slice(0, 8)
      }

      const lowercaseQuery = query.toLowerCase()
      const results = actions.filter((action) => {
        const searchText = [action.title, action.description, ...action.keywords].join(" ").toLowerCase()
        return searchText.includes(lowercaseQuery)
      })

      // Sort by frequency
      return results.sort((a, b) => (actionFrequency[b.id] || 0) - (actionFrequency[a.id] || 0))
    },
    [actions, recentActions, actionFrequency],
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K to open quick actions
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault()
        setIsOpen(true)
        return
      }

      // Handle individual action shortcuts
      if (event.ctrlKey) {
        const shortcutAction = actions.find((action) => {
          if (!action.shortcut) return false
          const keys = action.shortcut.toLowerCase().split("+")
          const hasCtrl = keys.includes("ctrl")
          const hasShift = keys.includes("shift")
          const key = keys[keys.length - 1]

          return hasCtrl === event.ctrlKey && hasShift === event.shiftKey && key === event.key.toLowerCase()
        })

        if (shortcutAction) {
          event.preventDefault()
          executeAction(shortcutAction.id)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [actions, executeAction])

  return (
    <QuickActionsContext.Provider
      value={{
        actions,
        recentActions,
        executeAction,
        searchActions,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </QuickActionsContext.Provider>
  )
}

export function useQuickActions() {
  const context = useContext(QuickActionsContext)
  if (context === undefined) {
    throw new Error("useQuickActions must be used within a QuickActionsProvider")
  }
  return context
}
