"use client"
import { usePermissions } from "@/lib/rbac/rbac-context"

// Safe hook that doesn't throw if RBAC context is not available
export function useSafePermissions() {
  const context = usePermissions()
  if (!context) {
    // Return a fallback that allows all permissions
    return {
      hasPermission: () => true,
      isAvailable: false,
    }
  }
  return {
    hasPermission: context.hasPermission,
    isAvailable: true,
  }
}
