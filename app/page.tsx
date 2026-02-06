"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  FileText,
  Zap,
  TrendingUp,
  Plus,
  ArrowRight,
  Brain,
  Activity,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export default function Dashboard() {
  const stats = [
    {
      title: "Total Prompts",
      value: "2,847",
      change: "+12%",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Active Agents",
      value: "24",
      change: "+3",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ]

  const quickActions = [
    {
      title: "Create New Prompt",
      description: "Start building a new prompt",
      icon: Plus,
      href: "/prompt-database",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Deploy Agent",
      description: "Deploy an agent to production",
      icon: Zap,
      href: "/create-agent",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    },
    {
      title: "Browse Templates",
      description: "Explore prompt templates",
      icon: FileText,
      href: "/prompt-library",
      color: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      icon: BarChart3,
      href: "/research-center",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
  ]

  return (
    <motion.div className="space-y-8 p-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/50"
        variants={itemVariants}
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">Welcome back! Here's what's happening with your prompts.</p>
        </div>
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">System Online</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants} whileHover="hover">
            <motion.div variants={cardHoverVariants}>
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">{stat.change}</span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                      <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
                <CardDescription className="text-base">Get started with common tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
              {quickActions.map((action, index) => (
                <motion.div key={index} variants={itemVariants} whileHover="hover">
                  <Link href={action.href}>
                    <motion.div variants={cardHoverVariants}>
                      <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center space-y-4">
                          <motion.div
                            className={`inline-flex p-4 rounded-2xl text-white ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}
                            whileHover={{ rotate: 5 }}
                          >
                            <action.icon className="h-6 w-6" />
                          </motion.div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{action.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-12 p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="text-sm font-medium">
              Overview
            </TabsTrigger>
            <TabsTrigger value="prompts" className="text-sm font-medium">
              Prompts
            </TabsTrigger>
            <TabsTrigger value="agents" className="text-sm font-medium">
              Agents
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-sm font-medium">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Recent Prompts</CardTitle>
                        <CardDescription>Your latest prompt creations</CardDescription>
                      </div>
                    </div>
                    <Link href="/prompt-database">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                      >
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {[
                        { name: "Email Marketing Assistant", created: "2 hours ago", status: "Active" },
                        { name: "Code Review Helper", created: "1 day ago", status: "Active" },
                        { name: "Content Writer", created: "2 days ago", status: "Active" },
                      ].map((prompt, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-gradient-to-r from-background to-background/50 hover:shadow-md transition-all duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="space-y-1">
                            <h4 className="font-semibold">{prompt.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{prompt.created}</span>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                          >
                            {prompt.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                        <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">System Status</CardTitle>
                        <CardDescription>Current system performance</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-0">
                    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 border border-green-200/50 dark:border-green-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">API Response Time</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-green-950/20"
                      >
                        142ms
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10 border border-blue-200/50 dark:border-blue-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Model Availability</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:bg-blue-950/20"
                      >
                        99.9%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-50/50 dark:from-purple-950/20 dark:to-purple-950/10 border border-purple-200/50 dark:border-purple-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Active Connections</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-purple-600 border-purple-200 bg-purple-50 dark:text-purple-400 dark:border-purple-800 dark:bg-purple-950/20"
                      >
                        1,247
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="prompts" className="space-y-8 mt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                      <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Prompt Performance</CardTitle>
                      <CardDescription>Top performing prompts this week</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {[
                      { name: "Email Marketing Assistant", usage: 847, rating: 4.8, rank: 1 },
                      { name: "Code Review Helper", usage: 623, rating: 4.7, rank: 2 },
                      { name: "Content Writer", usage: 512, rating: 4.9, rank: 3 },
                    ].map((prompt, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-gradient-to-r from-background to-background/50 hover:shadow-md transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-sm">
                            #{prompt.rank}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold">{prompt.name}</h4>
                            <p className="text-sm text-muted-foreground">{prompt.usage} uses this week</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant="secondary"
                            className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400"
                          >
                            ★ {prompt.rating}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-8 mt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { name: "Research Assistant", status: "active", tasks: 23, color: "from-blue-500 to-blue-600" },
                { name: "Content Writer", status: "active", tasks: 18, color: "from-green-500 to-green-600" },
                { name: "Code Reviewer", status: "idle", tasks: 7, color: "from-gray-500 to-gray-600" },
              ].map((agent, index) => (
                <motion.div key={index} variants={itemVariants} whileHover="hover">
                  <motion.div variants={cardHoverVariants}>
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                      <div className={`h-2 w-full bg-gradient-to-r ${agent.color} rounded-t-lg`} />
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Brain className="h-5 w-5" />
                            <span>{agent.name}</span>
                          </CardTitle>
                          <Badge
                            variant={agent.status === "active" ? "default" : "secondary"}
                            className={agent.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                          >
                            {agent.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tasks</span>
                          <span className="text-2xl font-bold">{agent.tasks}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-8 mt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                      <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Recent Activity</CardTitle>
                      <CardDescription>Latest actions across your workspace</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {[
                      { title: "New prompt created: Email Marketing Assistant", time: "2 minutes ago", type: "create" },
                      { title: "Research Agent deployed to production", time: "15 minutes ago", type: "deploy" },
                      { title: "Content Writer template shared with team", time: "1 hour ago", type: "share" },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 border border-border/50 rounded-xl bg-gradient-to-r from-background to-background/50 hover:shadow-md transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full mt-2 ${
                            activity.type === "create"
                              ? "bg-blue-500"
                              : activity.type === "deploy"
                                ? "bg-green-500"
                                : "bg-purple-500"
                          } animate-pulse`}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
