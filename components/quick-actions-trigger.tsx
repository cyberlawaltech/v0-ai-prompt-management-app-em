"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuickActions } from "@/lib/contexts/quick-actions-context"
import { Zap } from "lucide-react"

export function QuickActionsTrigger() {
  const { setIsOpen } = useQuickActions()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsOpen(true)}
      className="gap-2 text-muted-foreground hover:text-foreground"
    >
      <Zap className="h-4 w-4" />
      <span className="hidden sm:inline">Quick Actions</span>
      <Badge variant="secondary" className="text-xs font-mono">
        Ctrl+K
      </Badge>
    </Button>
  )
}
