"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

export interface NavigationUsage {
  itemId: string
  title: string
  href: string
  category: string
  clickCount: number
  lastAccessed: Date
  timeSpent: number // in milliseconds
  accessHistory: Array<{
    timestamp: Date
    sessionId: string
    timeSpent?: number
  }>
}

export interface NavigationAnalytics {
  totalClicks: number
  totalTimeSpent: number
  mostUsedItems: NavigationUsage[]
  leastUsedItems: NavigationUsage[]
  categoryUsage: Record<
    string,
    {
      clickCount: number
      timeSpent: number
      itemCount: number
    }
  >
  dailyUsage: Record<string, number>
  weeklyUsage: Record<string, number>
  sessionData: {
    sessionId: string
    startTime: Date
    currentPage: string
    pageStartTime: Date
  }
}

interface NavigationAnalyticsContextType {
  analytics: NavigationAnalytics
  trackNavigation: (itemId: string, title: string, href: string, category: string) => void
  getItemUsage: (itemId: string) => NavigationUsage | undefined
  getMostUsedItems: (limit?: number) => NavigationUsage[]
  getLeastUsedItems: (limit?: number) => NavigationUsage[]
  getCategoryAnalytics: () => Record<string, any>
  getUsageTrends: () => {
    daily: Record<string, number>
    weekly: Record<string, number>
    hourly: Record<string, number>
  }
  exportAnalytics: () => string
  clearAnalytics: () => void
  getRecommendations: () => Array<{
    type: "hide" | "promote" | "reorder"
    itemId: string
    reason: string
    confidence: number
  }>
}

const NavigationAnalyticsContext = createContext<NavigationAnalyticsContextType | undefined>(undefined)

const STORAGE_KEY = "navigation-analytics"
const SESSION_STORAGE_KEY = "navigation-session"

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function NavigationAnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [analytics, setAnalytics] = useState<NavigationAnalytics>({
    totalClicks: 0,
    totalTimeSpent: 0,
    mostUsedItems: [],
    leastUsedItems: [],
    categoryUsage: {},
    dailyUsage: {},
    weeklyUsage: {},
    sessionData: {
      sessionId: generateSessionId(),
      startTime: new Date(),
      currentPage: pathname,
      pageStartTime: new Date(),
    },
  })

  const [usageData, setUsageData] = useState<Record<string, NavigationUsage>>({})

  // Load analytics data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setUsageData(parsed)
        updateAnalytics(parsed)
      } catch (error) {
        console.error("Failed to parse navigation analytics:", error)
      }
    }

    // Initialize or continue session
    const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!sessionData) {
      const newSession = {
        sessionId: generateSessionId(),
        startTime: new Date(),
        currentPage: pathname,
        pageStartTime: new Date(),
      }
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession))
      setAnalytics((prev) => ({ ...prev, sessionData: newSession }))
    }
  }, [])

  // Track page changes and time spent
  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || "{}")

    if (sessionData.currentPage && sessionData.currentPage !== pathname) {
      // Calculate time spent on previous page
      const timeSpent = Date.now() - new Date(sessionData.pageStartTime).getTime()

      // Update time spent for the previous page
      setUsageData((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((itemId) => {
          if (updated[itemId].href === sessionData.currentPage) {
            updated[itemId].timeSpent += timeSpent
            updated[itemId].accessHistory[updated[itemId].accessHistory.length - 1].timeSpent = timeSpent
          }
        })
        return updated
      })
    }

    // Update current page
    const updatedSession = {
      ...sessionData,
      currentPage: pathname,
      pageStartTime: new Date(),
    }
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedSession))
    setAnalytics((prev) => ({ ...prev, sessionData: updatedSession }))
  }, [pathname])

  // Save usage data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(usageData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usageData))
      updateAnalytics(usageData)
    }
  }, [usageData])

  const updateAnalytics = (data: Record<string, NavigationUsage>) => {
    const items = Object.values(data)
    const totalClicks = items.reduce((sum, item) => sum + item.clickCount, 0)
    const totalTimeSpent = items.reduce((sum, item) => sum + item.timeSpent, 0)

    const mostUsedItems = [...items].sort((a, b) => b.clickCount - a.clickCount).slice(0, 10)

    const leastUsedItems = [...items]
      .filter((item) => item.clickCount > 0)
      .sort((a, b) => a.clickCount - b.clickCount)
      .slice(0, 5)

    // Calculate category usage
    const categoryUsage: Record<string, any> = {}
    items.forEach((item) => {
      if (!categoryUsage[item.category]) {
        categoryUsage[item.category] = {
          clickCount: 0,
          timeSpent: 0,
          itemCount: 0,
        }
      }
      categoryUsage[item.category].clickCount += item.clickCount
      categoryUsage[item.category].timeSpent += item.timeSpent
      categoryUsage[item.category].itemCount += 1
    })

    // Calculate daily and weekly usage
    const dailyUsage: Record<string, number> = {}
    const weeklyUsage: Record<string, number> = {}

    items.forEach((item) => {
      item.accessHistory.forEach((access) => {
        const date = new Date(access.timestamp).toISOString().split("T")[0]
        const week = getWeekKey(new Date(access.timestamp))

        dailyUsage[date] = (dailyUsage[date] || 0) + 1
        weeklyUsage[week] = (weeklyUsage[week] || 0) + 1
      })
    })

    setAnalytics((prev) => ({
      ...prev,
      totalClicks,
      totalTimeSpent,
      mostUsedItems,
      leastUsedItems,
      categoryUsage,
      dailyUsage,
      weeklyUsage,
    }))
  }

  const trackNavigation = (itemId: string, title: string, href: string, category: string) => {
    const sessionData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || "{}")

    setUsageData((prev) => {
      const existing = prev[itemId] || {
        itemId,
        title,
        href,
        category,
        clickCount: 0,
        lastAccessed: new Date(),
        timeSpent: 0,
        accessHistory: [],
      }

      return {
        ...prev,
        [itemId]: {
          ...existing,
          clickCount: existing.clickCount + 1,
          lastAccessed: new Date(),
          accessHistory: [
            ...existing.accessHistory,
            {
              timestamp: new Date(),
              sessionId: sessionData.sessionId || generateSessionId(),
            },
          ],
        },
      }
    })
  }

  const getItemUsage = (itemId: string): NavigationUsage | undefined => {
    if (!itemId || typeof itemId !== "string") {
      return undefined
    }
    return usageData[itemId]
  }

  const getMostUsedItems = (limit = 10): NavigationUsage[] => {
    return analytics.mostUsedItems.slice(0, limit)
  }

  const getLeastUsedItems = (limit = 5): NavigationUsage[] => {
    return analytics.leastUsedItems.slice(0, limit)
  }

  const getCategoryAnalytics = () => {
    return analytics.categoryUsage
  }

  const getUsageTrends = () => {
    const hourlyUsage: Record<string, number> = {}

    Object.values(usageData).forEach((item) => {
      item.accessHistory.forEach((access) => {
        const hour = new Date(access.timestamp).getHours()
        hourlyUsage[hour] = (hourlyUsage[hour] || 0) + 1
      })
    })

    return {
      daily: analytics.dailyUsage,
      weekly: analytics.weeklyUsage,
      hourly: hourlyUsage,
    }
  }

  const getRecommendations = () => {
    const recommendations: Array<{
      type: "hide" | "promote" | "reorder"
      itemId: string
      reason: string
      confidence: number
    }> = []

    const items = Object.values(usageData)
    const avgClickCount = items.reduce((sum, item) => sum + item.clickCount, 0) / items.length

    // Recommend hiding rarely used items
    items.forEach((item) => {
      if (item.clickCount < avgClickCount * 0.1 && item.clickCount > 0) {
        recommendations.push({
          type: "hide",
          itemId: item.itemId,
          reason: `Only used ${item.clickCount} times (${Math.round((item.clickCount / avgClickCount) * 100)}% of average)`,
          confidence: 0.8,
        })
      }
    })

    // Recommend promoting frequently used items
    items.forEach((item) => {
      if (item.clickCount > avgClickCount * 2) {
        recommendations.push({
          type: "promote",
          itemId: item.itemId,
          reason: `Highly used (${item.clickCount} times, ${Math.round((item.clickCount / avgClickCount) * 100)}% of average)`,
          confidence: 0.9,
        })
      }
    })

    return recommendations.sort((a, b) => b.confidence - a.confidence)
  }

  const exportAnalytics = (): string => {
    return JSON.stringify(
      {
        analytics,
        usageData,
        exportDate: new Date(),
      },
      null,
      2,
    )
  }

  const clearAnalytics = () => {
    setUsageData({})
    setAnalytics((prev) => ({
      ...prev,
      totalClicks: 0,
      totalTimeSpent: 0,
      mostUsedItems: [],
      leastUsedItems: [],
      categoryUsage: {},
      dailyUsage: {},
      weeklyUsage: {},
    }))
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <NavigationAnalyticsContext.Provider
      value={{
        analytics,
        trackNavigation,
        getItemUsage,
        getMostUsedItems,
        getLeastUsedItems,
        getCategoryAnalytics,
        getUsageTrends,
        exportAnalytics,
        clearAnalytics,
        getRecommendations,
      }}
    >
      {children}
    </NavigationAnalyticsContext.Provider>
  )
}

export function useNavigationAnalytics() {
  const context = useContext(NavigationAnalyticsContext)
  if (context === undefined) {
    // Return a safe default instead of throwing
    console.warn("useNavigationAnalytics must be used within a NavigationAnalyticsProvider")
    return {
      analytics: {
        totalClicks: 0,
        totalTimeSpent: 0,
        mostUsedItems: [],
        leastUsedItems: [],
        categoryUsage: {},
        dailyUsage: {},
        weeklyUsage: {},
        sessionData: {
          sessionId: "",
          startTime: new Date(),
          currentPage: "",
          pageStartTime: new Date(),
        },
      },
      trackNavigation: () => {},
      getItemUsage: () => undefined,
      getMostUsedItems: () => [],
      getLeastUsedItems: () => [],
      getCategoryAnalytics: () => ({}),
      getUsageTrends: () => ({ daily: {}, weekly: {}, hourly: {} }),
      exportAnalytics: () => "{}",
      clearAnalytics: () => {},
      getRecommendations: () => [],
    }
  }
  return context
}

function getWeekKey(date: Date): string {
  const year = date.getFullYear()
  const week = Math.ceil(((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7)
  return `${year}-W${week}`
}
