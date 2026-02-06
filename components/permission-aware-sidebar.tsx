"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { usePermissions } from "@/lib/rbac/rbac-context"
import { cn } from "@/lib/utils"

interface PermissionAwareSidebarProps {
  className?: string
}

export default function PermissionAwareSidebar({ className }: PermissionAwareSidebarProps) {
  const { hasPermission } = usePermissions()
  const [isLoaded, setIsLoaded] = useState(false)

  // Delay rendering until client-side to avoid hydration mismatch
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div className={cn("w-60 border-r", className)} />
  }

  return <AppSidebar />
}
