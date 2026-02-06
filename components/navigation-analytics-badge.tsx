"use client"

import { Badge } from "@/components/ui/badge"
import { useNavigationAnalytics } from "@/lib/contexts/navigation-analytics-context"

interface NavigationAnalyticsBadgeProps {
  itemId: string
}

export function NavigationAnalyticsBadge({ itemId }: NavigationAnalyticsBadgeProps) {
  const { getItemUsage } = useNavigationAnalytics()

  try {
    if (!itemId || typeof itemId !== "string") {
      return null
    }

    const usage = getItemUsage(itemId)

    if (!usage || typeof usage.clickCount !== "number" || usage.clickCount <= 0) {
      return null
    }

    return (
      <Badge variant="secondary" className="text-xs px-1 py-0 h-4 min-w-[16px]">
        {usage.clickCount}
      </Badge>
    )
  } catch (error) {
    console.warn("NavigationAnalyticsBadge error:", error)
    return null
  }
}
