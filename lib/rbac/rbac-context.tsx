"use client"

import { createContext, useContext, type ReactNode, useState } from "react"

type Permission =
  | "view-prompt"
  | "create-prompt"
  | "edit-prompt"
  | "delete-prompt"
  | "view-research"
  | "create-research"
  | "edit-research"
  | "delete-research"
  | "view-agent"
  | "create-agent"
  | "edit-agent"
  | "delete-agent"
  | "manage-team"
  | "invite-users"
  | "admin"

interface RBACContextType {
  hasPermission: (permission: Permission) => boolean
  userRoles: string[]
  userPermissions: Permission[]
  currentUser?: {
    id: string
    name: string
    role: string
  }
}

const RBACContext = createContext<RBACContextType | undefined>(undefined)

export function RBACProvider({ children }: { children: ReactNode }) {
  // For demo purposes, we'll give the user all permissions
  const [userPermissions] = useState<Permission[]>([
    "view-prompt",
    "create-prompt",
    "edit-prompt",
    "delete-prompt",
    "view-research",
    "create-research",
    "edit-research",
    "delete-research",
    "view-agent",
    "create-agent",
    "edit-agent",
    "delete-agent",
    "manage-team",
    "invite-users",
    "admin",
  ])

  const [userRoles] = useState<string[]>(["admin", "researcher", "prompt-engineer"])

  const hasPermission = (permission: Permission) => {
    return userPermissions.includes(permission) || userPermissions.includes("admin")
  }

  const currentUser = {
    id: "user-1",
    name: "Demo User",
    role: "admin",
  }

  return <RBACContext.Provider value={{ hasPermission, userRoles, userPermissions, currentUser }}>{children}</RBACContext.Provider>
}

export function usePermissions() {
  const context = useContext(RBACContext)
  if (context === undefined) {
    throw new Error("usePermissions must be used within a RBACProvider")
  }
  return context
}

export function useRBAC() {
  return usePermissions()
}

export function PermissionGate({
  children,
  permission,
}: {
  children: ReactNode
  permission: Permission
}) {
  const { hasPermission } = usePermissions()

  if (hasPermission(permission)) {
    return <>{children}</>
  }

  return null
}

export function TeamMemberGate({
  children,
  teamId,
  userId,
}: {
  children: ReactNode
  teamId: string
  userId?: string
}) {
  const { currentUser } = usePermissions()

  // Check if user is a team member (demo: always true for now)
  const isTeamMember = userId ? userId === currentUser?.id : !!currentUser?.id

  if (isTeamMember) {
    return <>{children}</>
  }

  return null
}
