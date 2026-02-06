"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  Bell,
  Plus,
  Settings,
  User,
  Menu,
  X,
  Home,
  ArrowLeft,
  Zap,
  FileText,
  Bot,
  BarChart3,
  Brain,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CreatePromptDialog } from "@/components/create-prompt-dialog"
import { AISearchAssistant } from "@/components/ai-search-assistant"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"

const navigationItems = [
  {
    title: "Workspace",
    items: [
      { title: "Dashboard", href: "/", description: "Overview and quick actions", icon: Home },
      { title: "Prompt Database", href: "/prompt-database", description: "Manage your prompts", icon: FileText },
      { title: "Create Agent", href: "/create-agent", description: "Build AI agents", icon: Bot },
      { title: "Chat", href: "/chat", description: "Interact with agents", icon: Bot },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "File Manager", href: "/file-manager", description: "Organize your files", icon: FileText },
      { title: "Integrations", href: "/integrations", description: "Connect external services", icon: Zap },
      { title: "Prompt Library", href: "/prompt-library", description: "Browse templates", icon: FileText },
      { title: "Knowledge Base", href: "/knowledge-base", description: "Access documentation", icon: FileText },
    ],
  },
  {
    title: "Research",
    items: [
      { title: "Research Center", href: "/research-center", description: "Manage research projects", icon: BarChart3 },
      {
        title: "Agent Orchestration",
        href: "/research-center/orchestration",
        description: "Coordinate multiple agents",
        icon: Bot,
      },
      {
        title: "Knowledge Explorer",
        href: "/research-center/knowledge",
        description: "Explore knowledge graphs",
        icon: BarChart3,
      },
      {
        title: "Collaborative Research",
        href: "/collaborative-research",
        description: "Team research projects",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Guidance",
    items: [
      {
        title: "Research Guidance",
        href: "/research-guidance",
        description: "Research methodologies and best practices",
        icon: Brain,
      },
      { title: "Prompt Guidance", href: "/prompt-guidance", description: "Prompt engineering tips", icon: FileText },
      {
        title: "Reverse Engineering",
        href: "/reverse-engineering",
        description: "Analyze existing prompts",
        icon: BarChart3,
      },
      { title: "Test Centre", href: "/test-centre", description: "Test and validate prompts", icon: BarChart3 },
    ],
  },
]

const quickActions = [
  { title: "Create Prompt", href: "/prompt-database", icon: FileText, shortcut: "Ctrl+P" },
  { title: "New Agent", href: "/create-agent", icon: Bot, shortcut: "Ctrl+A" },
  { title: "Start Chat", href: "/chat", icon: Bot, shortcut: "Ctrl+T" },
  { title: "Research", href: "/research-center", icon: BarChart3, shortcut: "Ctrl+R" },
]

export default function Header() {
  const [createPromptOpen, setCreatePromptOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "p":
            e.preventDefault()
            setCreatePromptOpen(true)
            break
          case "k":
            e.preventDefault()
            // Focus search input
            const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
            if (searchInput) {
              searchInput.focus()
            }
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const isAdminPath = pathname.startsWith("/admin")

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-lg bg-background/98 border-b-2 border-primary/10",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center px-6">
        {/* Brand Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {!isAdminPath && (
            <div className="flex md:hidden">
              <SidebarTrigger className="-ml-1" />
            </div>
          )}

          {isAdminPath && (
            <Button variant="ghost" size="sm" asChild className="md:hidden">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to App
              </Link>
            </Button>
          )}

          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <motion.div
              className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg ring-2 ring-primary/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="size-5" />
            </motion.div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  Prompt Improver
                </span>
                <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                  AI
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground font-medium">Intelligent Research Platform</div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isAdminPath && (
          <div className="hidden lg:flex flex-1 items-center justify-center px-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50",
                        section.items.some((item) => isActivePath(item.href)) && "bg-accent text-accent-foreground",
                      )}
                    >
                      {section.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <motion.div
                        className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/95 backdrop-blur-sm border shadow-xl rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {section.items.map((item) => {
                          const Icon = item.icon
                          return (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md",
                                  isActivePath(item.href) && "bg-accent/50 text-accent-foreground shadow-sm",
                                )}
                              >
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="p-2 rounded-lg bg-primary/10">
                                    <Icon className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="text-sm font-semibold leading-none">{item.title}</div>
                                  {isActivePath(item.href) && (
                                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                      Active
                                    </Badge>
                                  )}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          )
                        })}
                      </motion.div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}

        {/* Admin Navigation */}
        {isAdminPath && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-8">
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent/50",
                  pathname === "/admin" ? "text-primary bg-accent/50" : "text-muted-foreground",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/users"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent/50",
                  pathname === "/admin/users" ? "text-primary bg-accent/50" : "text-muted-foreground",
                )}
              >
                <User className="h-4 w-4" />
                <span>Users</span>
              </Link>
              <Link
                href="/admin/system"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent/50",
                  pathname === "/admin/system" ? "text-primary bg-accent/50" : "text-muted-foreground",
                )}
              >
                <Settings className="h-4 w-4" />
                <span>System</span>
              </Link>
              <Link
                href="/admin/analytics"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent/50",
                  pathname === "/admin/analytics" ? "text-primary bg-accent/50" : "text-muted-foreground",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </nav>
          </div>
        )}

        {/* AI Search Assistant */}
        {!isAdminPath && (
          <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
            <AISearchAssistant />
          </div>
        )}

        {/* Quick Actions & User Menu */}
        <div className="flex items-center space-x-3">
          {/* Quick Action Shortcuts */}
          {!isAdminPath && (
            <div className="hidden xl:flex items-center space-x-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <motion.div key={action.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 px-3 py-2"
                    >
                      <Link href={action.href}>
                        <Icon className="h-4 w-4" />
                        <span className="hidden 2xl:inline text-xs font-medium">{action.title}</span>
                        <Badge variant="outline" className="hidden 2xl:inline text-xs font-mono ml-1 bg-muted/50">
                          {action.shortcut}
                        </Badge>
                      </Link>
                    </Button>
                  </motion.div>
                )
              })}
              <Separator orientation="vertical" className="h-6 mx-2" />
            </div>
          )}

          {/* Create Prompt Button */}
          {!isAdminPath && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setCreatePromptOpen(true)}
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create
                <Badge
                  variant="secondary"
                  className="ml-2 text-xs font-mono bg-primary-foreground/20 text-primary-foreground"
                >
                  Ctrl+P
                </Badge>
              </Button>
            </motion.div>
          )}

          {/* Admin Back Button */}
          {isAdminPath && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" asChild className="hidden sm:flex bg-transparent hover:bg-accent/50">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to App
                </Link>
              </Button>
            </motion.div>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="relative hover:bg-accent/50">
                  <Bell className="h-4 w-4" />
                  <motion.div
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                  >
                    3
                  </motion.div>
                  <span className="sr-only">Notifications</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-sm border shadow-xl">
              <DropdownMenuLabel className="flex items-center justify-between p-4">
                <span className="font-semibold">Notifications</span>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  3 new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start space-y-2 p-4 hover:bg-accent/50">
                <div className="flex items-center space-x-3 w-full">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium">New research template created</p>
                </div>
                <p className="text-xs text-muted-foreground pl-5">Market analysis template ready for review</p>
                <p className="text-xs text-muted-foreground pl-5">2 minutes ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-2 p-4 hover:bg-accent/50">
                <div className="flex items-center space-x-3 w-full">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium">Research agent deployed successfully</p>
                </div>
                <p className="text-xs text-muted-foreground pl-5">Data analysis agent is now active</p>
                <p className="text-xs text-muted-foreground pl-5">15 minutes ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-2 p-4 hover:bg-accent/50">
                <div className="flex items-center space-x-3 w-full">
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium">Research project completed</p>
                </div>
                <p className="text-xs text-muted-foreground pl-5">Customer behavior analysis finished</p>
                <p className="text-xs text-muted-foreground pl-5">1 hour ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center p-4 hover:bg-accent/50">
                <span className="text-sm text-primary font-medium">View all notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm border shadow-xl">
              <DropdownMenuLabel className="p-4 font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="p-3 hover:bg-accent/50">
                <Link href="/settings">
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              {/* Settings Submenu with Admin Dashboard */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="p-3 hover:bg-accent/50">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Advanced Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-background/95 backdrop-blur-sm border shadow-xl">
                  <DropdownMenuItem asChild className="p-3 hover:bg-accent/50">
                    <Link href="/settings/roles">
                      <span>Roles & Permissions</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-3 hover:bg-accent/50">
                    <Link href="/settings/teams">
                      <span>Team Management</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="p-3 hover:bg-accent/50">
                    <Link href="/admin" className="text-primary font-medium flex items-center">
                      <Shield className="mr-3 h-4 w-4" />
                      <span>Admin Dashboard</span>
                      <Badge variant="secondary" className="ml-2 text-xs bg-primary/10 text-primary">
                        New
                      </Badge>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 hover:bg-accent/50 text-red-600 hover:text-red-700">
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-accent/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && !isAdminPath && (
        <motion.div
          className="lg:hidden border-t bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container py-6 space-y-6 px-6">
            {/* Mobile AI Search */}
            <div className="w-full">
              <AISearchAssistant />
            </div>

            {/* Mobile Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <motion.div key={action.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" asChild className="bg-transparent hover:bg-accent/50 w-full">
                      <Link href={action.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        {action.title}
                      </Link>
                    </Button>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-6">
              {navigationItems.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-3">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <motion.div key={item.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                              isActivePath(item.href)
                                ? "bg-accent text-accent-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                            )}
                          >
                            <div className="p-1 rounded-md bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                              <span>{item.title}</span>
                              {isActivePath(item.href) && (
                                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                  Active
                                </Badge>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Admin Mobile Menu */}
      {mobileMenuOpen && isAdminPath && (
        <motion.div
          className="md:hidden border-t bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container py-6 space-y-2 px-6">
            <Link
              href="/admin"
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === "/admin"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === "/admin/users"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <User className="h-4 w-4" />
              <span>Users</span>
            </Link>
            <Link
              href="/admin/system"
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === "/admin/system"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <Settings className="h-4 w-4" />
              <span>System</span>
            </Link>
            <Link
              href="/admin/analytics"
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === "/admin/analytics"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>
        </motion.div>
      )}

      <CreatePromptDialog open={createPromptOpen} onOpenChange={setCreatePromptOpen} />
    </motion.header>
  )
}
