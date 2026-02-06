"use client"

import type * as React from "react"
import {
  Home,
  Database,
  Bot,
  FileText,
  Puzzle,
  BookOpen,
  RotateCcw,
  TestTube,
  Search,
  MessageSquare,
  Settings,
  Users,
  Brain,
  Download,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

/* ------------------------------------------------------------------ */
/* Navigation data                                                    */
/* ------------------------------------------------------------------ */

const data = {
  navMain: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Prompt Database", url: "/prompt-database", icon: Database },
    { title: "Create Agent", url: "/create-agent", icon: Bot },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "File Manager", url: "/file-manager", icon: FileText },
    { title: "Integrations", url: "/integrations", icon: Puzzle },
    { title: "Prompt Library", url: "/prompt-library", icon: BookOpen },
    { title: "Knowledge Base", url: "/knowledge-base", icon: BookOpen },
    {
      title: "Research Guidance", // renamed
      url: "/research-guidance",
      icon: Brain,
    },
    { title: "Prompt Guidance", url: "/prompt-guidance", icon: FileText },
    { title: "Reverse Engineering", url: "/reverse-engineering", icon: RotateCcw },
    { title: "Test Centre", url: "/test-centre", icon: TestTube },
  ],

  navResearch: [
    {
      title: "Research Center",
      url: "/research-center",
      icon: Search,
      items: [
        { title: "Agent Orchestration", url: "/research-center/orchestration" },
        { title: "Code Testing Graph", url: "/research-center/code-testing" },
        { title: "Communication Logs", url: "/research-center/communication-logs" },
        { title: "Knowledge Explorer", url: "/research-center/knowledge" },
        { title: "Research Templates", url: "/research-center/templates" },
        { title: "Visualization", url: "/research-center/visualization" },
      ],
    },
    { title: "Collaborative Research", url: "/collaborative-research", icon: Users },
  ],

  navSettings: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        { title: "Roles", url: "/settings/roles" },
        { title: "Teams", url: "/settings/teams" },
      ],
    },
    { title: "Export", url: "/export", icon: Download },
  ],
}

/* ------------------------------------------------------------------ */
/* Sidebar component                                                  */
/* ------------------------------------------------------------------ */

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ------------------------------------------------------------- */}
      {/* Brand / header                                               */}
      {/* ------------------------------------------------------------- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Brain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Prompt Improver</span>
                  <span className="truncate text-xs">AI Assistant</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* --------------------  Main  ------------------------------ */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* -------------------- Research ---------------------------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Research</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navResearch.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={false}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>

                    {/* nested submenu */}
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenu className="pl-6">
                            {item.items.map((sub) => (
                              <SidebarMenuItem key={sub.title}>
                                <SidebarMenuButton asChild>
                                  <a href={sub.url}>
                                    <span>{sub.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* -------------------- Settings ---------------------------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSettings.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={false}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>

                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenu className="pl-6">
                            {item.items.map((sub) => (
                              <SidebarMenuItem key={sub.title}>
                                <SidebarMenuButton asChild>
                                  <a href={sub.url}>
                                    <span>{sub.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
