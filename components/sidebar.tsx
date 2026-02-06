"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Library,
  Database,
  BookOpen,
  MessageSquare,
  Settings,
  Users,
  FileText,
  Folder,
  Bot,
  Sparkles,
  Zap,
  FlaskConical,
  Search,
  BarChart,
  Brain,
  Network,
  MessageCircle,
  FileCode,
  UserPlus,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { PermissionGate } from "@/lib/rbac/rbac-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  mobile?: boolean
  onNavClick?: () => void
}

export default function Sidebar({ className, mobile = false, onNavClick, ...props }: SidebarProps) {
  const pathname = usePathname()
  const [isPromptEngOpen, setIsPromptEngOpen] = useState(true)
  const [isResearchCenterOpen, setIsResearchCenterOpen] = useState(false)
  const [isAgentSectionOpen, setIsAgentSectionOpen] = useState(false)
  const [isTeamSectionOpen, setIsTeamSectionOpen] = useState(false)

  const handleNavClick = () => {
    if (onNavClick) onNavClick()
  }

  const promptEngRoutes = [
    {
      label: "Prompt Library",
      icon: Library,
      href: "/prompt-library",
      active: pathname === "/prompt-library",
      permission: "view-prompt" as const,
    },
    {
      label: "Prompt Database",
      icon: Database,
      href: "/prompt-database",
      active: pathname === "/prompt-database",
      permission: "view-prompt" as const,
    },
    {
      label: "Prompt Guidance",
      icon: BookOpen,
      href: "/prompt-guidance",
      active: pathname === "/prompt-guidance",
      permission: "view-prompt" as const,
    },
    {
      label: "Reverse Eng.",
      icon: Sparkles,
      href: "/reverse-engineering",
      active: pathname === "/reverse-engineering",
      permission: "view-prompt" as const,
    },
    {
      label: "Test Centre",
      icon: FlaskConical,
      href: "/test-centre",
      active: pathname === "/test-centre",
      permission: "view-prompt" as const,
    },
  ]

  const researchCenterRoutes = [
    {
      label: "Research Dashboard",
      icon: BarChart,
      href: "/research-center",
      active: pathname === "/research-center",
      permission: "view-research" as const,
    },
    {
      label: "Agent Orchestration",
      icon: Brain,
      href: "/research-center/orchestration",
      active: pathname === "/research-center/orchestration",
      permission: "view-research" as const,
    },
    {
      label: "Communication Logs",
      icon: MessageCircle,
      href: "/research-center/communication-logs",
      active: pathname === "/research-center/communication-logs",
      permission: "view-research" as const,
    },
    {
      label: "Knowledge Explorer",
      icon: Search,
      href: "/research-center/knowledge",
      active: pathname === "/research-center/knowledge",
      permission: "view-research" as const,
    },
    {
      label: "Research Templates",
      icon: FileCode,
      href: "/research-center/templates",
      active: pathname === "/research-center/templates",
      permission: "view-research" as const,
    },
    {
      label: "Code Testing Graph",
      icon: Network,
      href: "/research-center/code-testing",
      active: pathname === "/research-center/code-testing",
      permission: "view-research" as const,
    },
  ]

  const agentRoutes = [
    {
      label: "Create Agent",
      icon: Bot,
      href: "/create-agent",
      active: pathname === "/create-agent",
      permission: "create-agent" as const,
    },
    {
      label: "Agent Library",
      icon: Library,
      href: "/agent-library",
      active: pathname === "/agent-library",
      permission: "view-agent" as const,
    },
    {
      label: "Agent Performance",
      icon: BarChart,
      href: "/agent-performance",
      active: pathname === "/agent-performance",
      permission: "view-agent" as const,
    },
  ]

  const teamRoutes = [
    {
      label: "Team Projects",
      icon: FileText,
      href: "/collaborative-research",
      active: pathname === "/collaborative-research",
      permission: "view-research" as const,
    },
    {
      label: "Team Members",
      icon: Users,
      href: "/settings/teams",
      active: pathname === "/settings/teams",
      permission: "manage-team" as const,
    },
    {
      label: "Invite Users",
      icon: UserPlus,
      href: "/invite",
      active: pathname === "/invite",
      permission: "invite-users" as const,
    },
    {
      label: "Shared with Me",
      icon: Share2,
      href: "/shared",
      active: pathname === "/shared",
      permission: "view-research" as const,
    },
  ]

  const mainRoutes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Chat Mode",
      icon: MessageSquare,
      href: "/chat",
      active: pathname === "/chat",
    },
    {
      label: "File Manager",
      icon: Folder,
      href: "/file-manager",
      active: pathname === "/file-manager",
    },
    {
      label: "Knowledge Base",
      icon: FileText,
      href: "/knowledge-base",
      active: pathname === "/knowledge-base",
    },
    {
      label: "Integrations",
      icon: Users,
      href: "/integrations",
      active: pathname === "/integrations",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className={cn("h-full pb-12 w-full md:w-60 bg-background border-r", className)} {...props}>
      <div className="space-y-4 py-4 h-full flex flex-col">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight truncate">Prompt Improver</h2>
        </div>
        <ScrollArea className="px-1 flex-1">
          <div className="space-y-1 p-2">
            {/* Main navigation items */}
            {mainRoutes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", route.active ? "bg-secondary hover:bg-secondary" : "")}
                asChild
                onClick={handleNavClick}
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{route.label}</span>
                </Link>
              </Button>
            ))}

            {/* Team section */}
            <Collapsible open={isTeamSectionOpen} onOpenChange={setIsTeamSectionOpen} className="space-y-1">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center truncate">
                    <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Teams</span>
                  </div>
                  {isTeamSectionOpen ? (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                {teamRoutes.map((route) => (
                  <PermissionGate key={route.href} permission={route.permission}>
                    <Button
                      variant={route.active ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", route.active ? "bg-secondary hover:bg-secondary" : "")}
                      asChild
                      onClick={handleNavClick}
                    >
                      <Link href={route.href}>
                        <route.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{route.label}</span>
                      </Link>
                    </Button>
                  </PermissionGate>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Agent section */}
            <Collapsible open={isAgentSectionOpen} onOpenChange={setIsAgentSectionOpen} className="space-y-1">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center truncate">
                    <Bot className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Agents</span>
                  </div>
                  {isAgentSectionOpen ? (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                {agentRoutes.map((route) => (
                  <PermissionGate key={route.href} permission={route.permission}>
                    <Button
                      variant={route.active ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", route.active ? "bg-secondary hover:bg-secondary" : "")}
                      asChild
                      onClick={handleNavClick}
                    >
                      <Link href={route.href}>
                        <route.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{route.label}</span>
                      </Link>
                    </Button>
                  </PermissionGate>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Prompt Engineering section */}
            <PermissionGate permission="view-prompt">
              <Collapsible open={isPromptEngOpen} onOpenChange={setIsPromptEngOpen} className="space-y-1">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center truncate">
                      <Zap className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Prompt Eng.</span>
                    </div>
                    {isPromptEngOpen ? (
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-1">
                  {promptEngRoutes.map((route) => (
                    <PermissionGate key={route.href} permission={route.permission}>
                      <Button
                        variant={route.active ? "secondary" : "ghost"}
                        className={cn("w-full justify-start", route.active ? "bg-secondary hover:bg-secondary" : "")}
                        asChild
                        onClick={handleNavClick}
                      >
                        <Link href={route.href}>
                          <route.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{route.label}</span>
                        </Link>
                      </Button>
                    </PermissionGate>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </PermissionGate>

            {/* Research Center section */}
            <PermissionGate permission="view-research">
              <Collapsible open={isResearchCenterOpen} onOpenChange={setIsResearchCenterOpen} className="space-y-1">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center truncate">
                      <Brain className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Research Center</span>
                    </div>
                    {isResearchCenterOpen ? (
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-1">
                  {researchCenterRoutes.map((route) => (
                    <PermissionGate key={route.href} permission={route.permission}>
                      <Button
                        variant={route.active ? "secondary" : "ghost"}
                        className={cn("w-full justify-start", route.active ? "bg-secondary hover:bg-secondary" : "")}
                        asChild
                        onClick={handleNavClick}
                      >
                        <Link href={route.href}>
                          <route.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{route.label}</span>
                        </Link>
                      </Button>
                    </PermissionGate>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </PermissionGate>
          </div>
        </ScrollArea>
        <div className="px-3 py-2">
          <div className="text-xs text-muted-foreground">v1.2.0</div>
        </div>
      </div>
    </div>
  )
}
