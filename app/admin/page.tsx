"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Activity,
  Database,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw,
  Settings,
  BarChart3,
  FileText,
  Bot,
  Brain,
} from "lucide-react"
import { motion } from "framer-motion"

interface SystemMetric {
  label: string
  value: number
  unit: string
  status: "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
}

interface UserActivity {
  id: string
  user: string
  action: string
  timestamp: string
  status: "success" | "warning" | "error"
}

export default function AdminDashboard() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { label: "CPU Usage", value: 45, unit: "%", status: "good", trend: "stable" },
    { label: "Memory Usage", value: 68, unit: "%", status: "warning", trend: "up" },
    { label: "Disk Usage", value: 32, unit: "%", status: "good", trend: "down" },
    { label: "Network I/O", value: 156, unit: "MB/s", status: "good", trend: "up" },
  ])

  const [userStats, setUserStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 34,
    premiumUsers: 156,
  })

  const [recentActivity, setRecentActivity] = useState<UserActivity[]>([
    {
      id: "1",
      user: "john.doe@example.com",
      action: "Created new research template",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: "2",
      user: "sarah.smith@example.com",
      action: "Deployed AI research agent",
      timestamp: "5 minutes ago",
      status: "success",
    },
    {
      id: "3",
      user: "mike.johnson@example.com",
      action: "Failed login attempt",
      timestamp: "8 minutes ago",
      status: "error",
    },
    {
      id: "4",
      user: "emma.wilson@example.com",
      action: "Updated prompt library",
      timestamp: "12 minutes ago",
      status: "success",
    },
    {
      id: "5",
      user: "david.brown@example.com",
      action: "Exported research data",
      timestamp: "15 minutes ago",
      status: "warning",
    },
  ])

  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "warning",
      title: "High Memory Usage",
      description: "System memory usage is approaching 70%",
      timestamp: "5 minutes ago",
    },
    {
      id: "2",
      type: "info",
      title: "Scheduled Maintenance",
      description: "System maintenance scheduled for tonight at 2 AM",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      type: "success",
      title: "Backup Completed",
      description: "Daily backup completed successfully",
      timestamp: "2 hours ago",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "success":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200"
      case "critical":
      case "error":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management controls</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.newUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+23%</span> from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.premiumUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> conversion rate
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* System Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Performance</span>
                </CardTitle>
                <CardDescription>Real-time system metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                        <span className="text-sm">
                          {metric.value.toFixed(1)}
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={metric.value}
                      className={`h-2 ${
                        metric.status === "critical"
                          ? "bg-red-100"
                          : metric.status === "warning"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest user actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className={`p-1 rounded-full ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Platform Usage</span>
              </CardTitle>
              <CardDescription>Feature usage and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-sm text-muted-foreground">Prompts Created</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Bot className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-sm text-muted-foreground">AI Agents</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">567</div>
                  <div className="text-sm text-muted-foreground">Research Projects</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Database className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">89.2GB</div>
                  <div className="text-sm text-muted-foreground">Data Processed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5" />
                  <span>CPU & Memory</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span>{systemMetrics[0]?.value.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemMetrics[0]?.value || 0} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span>{systemMetrics[1]?.value.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemMetrics[1]?.value || 0} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5" />
                  <span>Storage & Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Disk Usage</span>
                    <span>{systemMetrics[2]?.value.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemMetrics[2]?.value || 0} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Network I/O</span>
                    <span>{systemMetrics[3]?.value.toFixed(1)} MB/s</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Connection stable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Log</CardTitle>
              <CardDescription>Detailed log of user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getStatusColor(alert.type)}`}>
                      {alert.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                      {alert.type === "success" && <CheckCircle className="h-4 w-4" />}
                      {alert.type === "info" && <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
