"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  FileText,
  Bot,
  Brain,
  Download,
  Clock,
  Target,
  Eye,
  Globe,
  Smartphone,
} from "lucide-react"
import { motion } from "framer-motion"

interface AnalyticsData {
  period: string
  users: number
  sessions: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: string
}

interface FeatureUsage {
  feature: string
  usage: number
  growth: number
  icon: any
}

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  const analyticsData: AnalyticsData = {
    period: "Last 7 days",
    users: 1247,
    sessions: 3456,
    pageViews: 12890,
    bounceRate: 34.2,
    avgSessionDuration: "4m 32s",
  }

  const featureUsage: FeatureUsage[] = [
    { feature: "Prompt Creation", usage: 2847, growth: 12.5, icon: FileText },
    { feature: "AI Agents", usage: 1234, growth: 8.3, icon: Bot },
    { feature: "Research Tools", usage: 567, growth: 23.1, icon: Brain },
    { feature: "File Manager", usage: 890, growth: -2.1, icon: FileText },
    { feature: "Chat Interface", usage: 1567, growth: 15.7, icon: Bot },
    { feature: "Knowledge Base", usage: 445, growth: 5.2, icon: Brain },
  ]

  const topPages = [
    { page: "/", views: 3456, percentage: 26.8 },
    { page: "/prompt-database", views: 2134, percentage: 16.6 },
    { page: "/create-agent", views: 1789, percentage: 13.9 },
    { page: "/research-center", views: 1456, percentage: 11.3 },
    { page: "/chat", views: 1234, percentage: 9.6 },
    { page: "/knowledge-base", views: 987, percentage: 7.7 },
    { page: "/research-guidance", views: 834, percentage: 6.5 },
    { page: "/settings", views: 567, percentage: 4.4 },
  ]

  const userEngagement = {
    dailyActiveUsers: 892,
    weeklyActiveUsers: 1247,
    monthlyActiveUsers: 2134,
    retentionRate: 68.5,
    avgSessionsPerUser: 2.8,
    avgTimeOnSite: "6m 45s",
  }

  const deviceStats = [
    { device: "Desktop", percentage: 65.4, users: 815 },
    { device: "Mobile", percentage: 28.7, users: 358 },
    { device: "Tablet", percentage: 5.9, users: 74 },
  ]

  const trafficSources = [
    { source: "Direct", percentage: 42.3, sessions: 1462 },
    { source: "Organic Search", percentage: 31.7, sessions: 1095 },
    { source: "Social Media", percentage: 15.2, sessions: 525 },
    { source: "Referral", percentage: 8.1, sessions: 280 },
    { source: "Email", percentage: 2.7, sessions: 94 },
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into platform usage and performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.users.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.sessions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.3%</span> from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.pageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15.7%</span> from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.avgSessionDuration}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.2%</span> from last period
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Top Pages</span>
                </CardTitle>
                <CardDescription>Most visited pages in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{page.page}</div>
                          <div className="text-xs text-muted-foreground">{page.views.toLocaleString()} views</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{page.percentage}%</div>
                        <Progress value={page.percentage} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Device Breakdown</span>
                </CardTitle>
                <CardDescription>User device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceStats.map((device) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{device.device}</span>
                        <div className="text-right">
                          <span className="text-sm">{device.percentage}%</span>
                          <div className="text-xs text-muted-foreground">{device.users} users</div>
                        </div>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Performance Metrics</span>
              </CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-600">{analyticsData.bounceRate}%</div>
                  <div className="text-sm text-muted-foreground">Bounce Rate</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-green-600">{userEngagement.retentionRate}%</div>
                  <div className="text-sm text-muted-foreground">Retention Rate</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-blue-600">{userEngagement.avgSessionsPerUser}</div>
                  <div className="text-sm text-muted-foreground">Sessions/User</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-purple-600">{userEngagement.avgTimeOnSite}</div>
                  <div className="text-sm text-muted-foreground">Avg. Time on Site</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Analytics</CardTitle>
              <CardDescription>How users interact with different platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureUsage.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.feature} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{feature.feature}</div>
                          <div className="text-sm text-muted-foreground">{feature.usage.toLocaleString()} uses</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            feature.growth > 0
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {feature.growth > 0 ? "+" : ""}
                          {feature.growth}%
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Active user metrics and engagement patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Active Users</span>
                  <span className="text-lg font-bold">{userEngagement.dailyActiveUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weekly Active Users</span>
                  <span className="text-lg font-bold">{userEngagement.weeklyActiveUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monthly Active Users</span>
                  <span className="text-lg font-bold">{userEngagement.monthlyActiveUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">User Retention Rate</span>
                  <span className="text-lg font-bold text-green-600">{userEngagement.retentionRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Analytics</CardTitle>
                <CardDescription>Detailed session behavior metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Sessions per User</span>
                  <span className="text-lg font-bold">{userEngagement.avgSessionsPerUser}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Time on Site</span>
                  <span className="text-lg font-bold">{userEngagement.avgTimeOnSite}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bounce Rate</span>
                  <span className="text-lg font-bold text-red-600">{analyticsData.bounceRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pages per Session</span>
                  <span className="text-lg font-bold">3.7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Traffic Sources</span>
              </CardTitle>
              <CardDescription>Where your users are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <div className="text-right">
                        <span className="text-sm">{source.percentage}%</span>
                        <div className="text-xs text-muted-foreground">{source.sessions.toLocaleString()} sessions</div>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
