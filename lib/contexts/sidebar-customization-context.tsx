"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  Home,
  MessageSquare,
  FolderKanban,
  FileText,
  Bot,
  BarChart3,
  Network,
  Sparkles,
  Code,
  FlaskConical,
  Users,
  Share2,
  Settings,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavigationItem {
  id: string
  title: string
  href: string
  icon: LucideIcon
  category: string
  isVisible: boolean
  isCustom: boolean
  order: number
  permission?: string
  description?: string
}

export interface SidebarSection {
  id: string
  title: string
  isVisible: boolean
  isCollapsed: boolean
  order: number
  items: NavigationItem[]
}

interface SidebarCustomizationContextType {
  sections: SidebarSection[]
  updateSectionVisibility: (sectionId: string, isVisible: boolean) => void
  updateSectionCollapsed: (sectionId: string, isCollapsed: boolean) => void
  updateItemVisibility: (itemId: string, isVisible: boolean) => void
  reorderSections: (sections: SidebarSection[]) => void
  reorderItems: (sectionId: string, items: NavigationItem[]) => void
  addCustomItem: (sectionId: string, item: Omit<NavigationItem, "id" | "isCustom" | "order">) => void
  removeCustomItem: (itemId: string) => void
  resetToDefaults: () => void
  exportSettings: () => string
  importSettings: (settings: string) => void
}

const SidebarCustomizationContext = createContext<SidebarCustomizationContextType | undefined>(undefined)

const STORAGE_KEY = "sidebar-customization"

export function SidebarCustomizationProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<SidebarSection[]>([])

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY)
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSections(parsed)
      } catch (error) {
        console.error("Failed to parse sidebar settings:", error)
        setSections(getDefaultSections())
      }
    } else {
      setSections(getDefaultSections())
    }
  }, [])

  // Save settings to localStorage whenever sections change
  useEffect(() => {
    if (sections.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
    }
  }, [sections])

  const updateSectionVisibility = (sectionId: string, isVisible: boolean) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, isVisible } : section)))
  }

  const updateSectionCollapsed = (sectionId: string, isCollapsed: boolean) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, isCollapsed } : section)))
  }

  const updateItemVisibility = (itemId: string, isVisible: boolean) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.map((item) => (item.id === itemId ? { ...item, isVisible } : item)),
      })),
    )
  }

  const reorderSections = (newSections: SidebarSection[]) => {
    setSections(newSections.map((section, index) => ({ ...section, order: index })))
  }

  const reorderItems = (sectionId: string, newItems: NavigationItem[]) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: newItems.map((item, index) => ({ ...item, order: index })),
            }
          : section,
      ),
    )
  }

  const addCustomItem = (sectionId: string, item: Omit<NavigationItem, "id" | "isCustom" | "order">) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: [
                ...section.items,
                {
                  ...item,
                  id: `custom-${Date.now()}`,
                  isCustom: true,
                  order: section.items.length,
                  isVisible: true,
                },
              ],
            }
          : section,
      ),
    )
  }

  const removeCustomItem = (itemId: string) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.filter((item) => item.id !== itemId),
      })),
    )
  }

  const resetToDefaults = () => {
    setSections(getDefaultSections())
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportSettings = () => {
    return JSON.stringify(sections, null, 2)
  }

  const importSettings = (settings: string) => {
    try {
      const parsed = JSON.parse(settings)
      setSections(parsed)
    } catch (error) {
      throw new Error("Invalid settings format")
    }
  }

  return (
    <SidebarCustomizationContext.Provider
      value={{
        sections,
        updateSectionVisibility,
        updateSectionCollapsed,
        updateItemVisibility,
        reorderSections,
        reorderItems,
        addCustomItem,
        removeCustomItem,
        resetToDefaults,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SidebarCustomizationContext.Provider>
  )
}

export function useSidebarCustomization() {
  const context = useContext(SidebarCustomizationContext)
  if (context === undefined) {
    throw new Error("useSidebarCustomization must be used within a SidebarCustomizationProvider")
  }
  return context
}

// Default sections configuration
function getDefaultSections(): SidebarSection[] {
  return [
    {
      id: "main",
      title: "Main",
      isVisible: true,
      isCollapsed: false,
      order: 0,
      items: [
        {
          id: "dashboard",
          title: "Dashboard",
          href: "/",
          icon: Home,
          category: "main",
          isVisible: true,
          isCustom: false,
          order: 0,
          description: "Main dashboard overview",
        },
        {
          id: "chat",
          title: "Chat Mode",
          href: "/chat",
          icon: MessageSquare,
          category: "main",
          isVisible: true,
          isCustom: false,
          order: 1,
          description: "Interactive chat interface",
        },
        {
          id: "file-manager",
          title: "File Manager",
          href: "/file-manager",
          icon: FolderKanban,
          category: "main",
          isVisible: true,
          isCustom: false,
          order: 2,
          description: "Manage your files and documents",
        },
        {
          id: "knowledge-base",
          title: "Knowledge Base",
          href: "/knowledge-base",
          icon: FileText,
          category: "main",
          isVisible: true,
          isCustom: false,
          order: 3,
          description: "Access knowledge base articles",
        },
      ],
    },
    {
      id: "agents",
      title: "Agents",
      isVisible: true,
      isCollapsed: false,
      order: 1,
      items: [
        {
          id: "create-agent",
          title: "Create Agent",
          href: "/create-agent",
          icon: Bot,
          category: "agents",
          isVisible: true,
          isCustom: false,
          order: 0,
          permission: "create-agent",
          description: "Create new AI agents",
        },
        {
          id: "agent-performance",
          title: "Performance Metrics",
          href: "/agent-performance",
          icon: BarChart3,
          category: "agents",
          isVisible: true,
          isCustom: false,
          order: 1,
          permission: "view-agent",
          description: "View agent performance analytics",
        },
      ],
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      isVisible: true,
      isCollapsed: false,
      order: 2,
      items: [
        {
          id: "prompt-library",
          title: "Prompt Library",
          href: "/prompt-library",
          icon: FileText,
          category: "prompt-engineering",
          isVisible: true,
          isCustom: false,
          order: 0,
          permission: "view-prompt",
          description: "Browse prompt templates",
        },
        {
          id: "prompt-database",
          title: "Prompt Database",
          href: "/prompt-database",
          icon: Network,
          category: "prompt-engineering",
          isVisible: true,
          isCustom: false,
          order: 1,
          permission: "view-prompt",
          description: "Manage prompt database",
        },
        {
          id: "prompt-guidance",
          title: "Prompt Guidance",
          href: "/prompt-guidance",
          icon: Sparkles,
          category: "prompt-engineering",
          isVisible: true,
          isCustom: false,
          order: 2,
          permission: "view-prompt",
          description: "Get prompt writing guidance",
        },
        {
          id: "reverse-engineering",
          title: "Reverse Engineering",
          href: "/reverse-engineering",
          icon: Code,
          category: "prompt-engineering",
          isVisible: true,
          isCustom: false,
          order: 3,
          permission: "view-prompt",
          description: "Reverse engineer prompts",
        },
        {
          id: "test-centre",
          title: "Test Centre",
          href: "/test-centre",
          icon: FlaskConical,
          category: "prompt-engineering",
          isVisible: true,
          isCustom: false,
          order: 4,
          permission: "view-prompt",
          description: "Test and validate prompts",
        },
      ],
    },
    {
      id: "research-center",
      title: "Research Center",
      isVisible: true,
      isCollapsed: false,
      order: 3,
      items: [
        {
          id: "research-dashboard",
          title: "Dashboard",
          href: "/research-center",
          icon: Home,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 0,
          permission: "view-research",
          description: "Research center overview",
        },
        {
          id: "agent-orchestration",
          title: "Agent Orchestration",
          href: "/research-center/orchestration",
          icon: Bot,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 1,
          permission: "view-research",
          description: "Orchestrate research agents",
        },
        {
          id: "communication-logs",
          title: "Communication Logs",
          href: "/research-center/communication-logs",
          icon: MessageSquare,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 2,
          permission: "view-research",
          description: "View agent communication logs",
        },
        {
          id: "knowledge-graph",
          title: "Knowledge Graph",
          href: "/research-center/knowledge",
          icon: Network,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 3,
          permission: "view-research",
          description: "Explore knowledge connections",
        },
        {
          id: "research-templates",
          title: "Research Templates",
          href: "/research-center/templates",
          icon: FileText,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 4,
          permission: "view-research",
          description: "Use research templates",
        },
        {
          id: "data-visualization",
          title: "Data Visualization",
          href: "/research-center/visualization",
          icon: BarChart3,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 5,
          permission: "view-research",
          description: "Visualize research data",
        },
        {
          id: "code-testing",
          title: "Code Testing",
          href: "/research-center/code-testing",
          icon: Code,
          category: "research-center",
          isVisible: true,
          isCustom: false,
          order: 6,
          permission: "view-research",
          description: "Test and validate code",
        },
      ],
    },
    {
      id: "collaboration",
      title: "Collaboration",
      isVisible: true,
      isCollapsed: false,
      order: 4,
      items: [
        {
          id: "collaborative-research",
          title: "Collaborative Research",
          href: "/collaborative-research",
          icon: Users,
          category: "collaboration",
          isVisible: true,
          isCustom: false,
          order: 0,
          permission: "view-research",
          description: "Collaborate on research projects",
        },
        {
          id: "export-share",
          title: "Export & Share",
          href: "/export",
          icon: Share2,
          category: "collaboration",
          isVisible: true,
          isCustom: false,
          order: 1,
          permission: "view-research",
          description: "Export and share your work",
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      isVisible: true,
      isCollapsed: false,
      order: 5,
      items: [
        {
          id: "settings",
          title: "Settings",
          href: "/settings",
          icon: Settings,
          category: "settings",
          isVisible: true,
          isCustom: false,
          order: 0,
          description: "Application settings",
        },
      ],
    },
  ]
}
