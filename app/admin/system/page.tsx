"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Server,
  Database,
  Shield,
  Settings,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Network,
  Activity,
  Lock,
  Key,
  Globe,
} from "lucide-react"
import { motion } from "framer-motion"

interface SystemConfig {
  maintenance: boolean
  backupEnabled: boolean
  autoUpdates: boolean
  debugMode: boolean
  apiRateLimit: number
  maxFileSize: number
  sessionTimeout: number
}

interface BackupInfo {
  lastBackup: string
  nextBackup: string
  backupSize: string
  status: "success" | "running" | "failed"
}

export default function AdminSystemPage() {
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    maintenance: false,
    backupEnabled: true,
    autoUpdates: true,
    debugMode: false,
    apiRateLimit: 1000,
    maxFileSize: 100,
    sessionTimeout: 30,
  })

  const [backupInfo, setBackupInfo] = useState<BackupInfo>({
    lastBackup: "2024-01-07 02:00:00",
    nextBackup: "2024-01-08 02:00:00",
    backupSize: "2.4 GB",
    status: "success",
  })

  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 156,
    uptime: "15 days, 4 hours",
    version: "v2.1.3",
    lastUpdate: "2024-01-05",
  })

  const [logs, setLogs] = useState([
    {
      id: "1",
      timestamp: "2024-01-07 14:30:25",
      level: "INFO",
      message: "System backup completed successfully",
      component: "Backup Service",
    },
    {
      id: "2",
      timestamp: "2024-01-07 14:25:12",
      level: "WARN",
      message: "High memory usage detected (68%)",
      component: "System Monitor",
    },
    {
      id: "3",
      timestamp: "2024-01-07 14:20:08",
      level: "INFO",
      message: "User authentication service restarted",
      component: "Auth Service",
    },
    {
      id: "4",
      timestamp: "2024-01-07 14:15:33",
      level: "ERROR",
      message: "Failed to connect to external API endpoint",
      component: "Integration Service",
    },
  ])

  const updateConfig = (key: keyof SystemConfig, value: any) => {
    setSystemConfig((prev) => ({ ...prev, [key]: value }))
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "WARN":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "INFO":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "running":
        return "text-blue-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Management</h1>
          <p className="text-muted-foreground">Configure system settings and monitor health</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-lg font-semibold">Online</span>
              </div>
              <p className="text-xs text-muted-foreground">Uptime: {systemHealth.uptime}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Version</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemHealth.version}</div>
              <p className="text-xs text-muted-foreground">Updated: {systemHealth.lastUpdate}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className={`h-4 w-4 ${getStatusColor(backupInfo.status)}`} />
                <span className="text-sm font-medium">{backupInfo.backupSize}</span>
              </div>
              <p className="text-xs text-muted-foreground">{new Date(backupInfo.lastBackup).toLocaleString()}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-lg font-semibold">Secure</span>
              </div>
              <p className="text-xs text-muted-foreground">All systems protected</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="health" className="space-y-6">
        <TabsList>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Resource Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Resource Usage</span>
                </CardTitle>
                <CardDescription>Real-time system resource monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <span className="text-sm">{systemHealth.cpu}%</span>
                  </div>
                  <Progress value={systemHealth.cpu} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Memory className="h-4 w-4" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <span className="text-sm">{systemHealth.memory}%</span>
                  </div>
                  <Progress value={systemHealth.memory} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4" />
                      <span className="text-sm font-medium">Disk Usage</span>
                    </div>
                    <span className="text-sm">{systemHealth.disk}%</span>
                  </div>
                  <Progress value={systemHealth.disk} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Network className="h-4 w-4" />
                      <span className="text-sm font-medium">Network I/O</span>
                    </div>
                    <span className="text-sm">{systemHealth.network} MB/s</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full w-1/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>Service Status</span>
                </CardTitle>
                <CardDescription>Status of critical system services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Web Server</div>
                      <div className="text-sm text-muted-foreground">nginx v1.20.2</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Running</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Database</div>
                      <div className="text-sm text-muted-foreground">PostgreSQL 14.5</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Running</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Cache Service</div>
                      <div className="text-sm text-muted-foreground">Redis 7.0.5</div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Warning
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">AI Service</div>
                      <div className="text-sm text-muted-foreground">Custom v2.1.3</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Running</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure core system behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <div className="text-sm text-muted-foreground">Enable to prevent user access during updates</div>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={systemConfig.maintenance}
                    onCheckedChange={(checked) => updateConfig("maintenance", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="backup">Automatic Backups</Label>
                    <div className="text-sm text-muted-foreground">Enable daily automated backups</div>
                  </div>
                  <Switch
                    id="backup"
                    checked={systemConfig.backupEnabled}
                    onCheckedChange={(checked) => updateConfig("backupEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="updates">Auto Updates</Label>
                    <div className="text-sm text-muted-foreground">Automatically install security updates</div>
                  </div>
                  <Switch
                    id="updates"
                    checked={systemConfig.autoUpdates}
                    onCheckedChange={(checked) => updateConfig("autoUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug">Debug Mode</Label>
                    <div className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</div>
                  </div>
                  <Switch
                    id="debug"
                    checked={systemConfig.debugMode}
                    onCheckedChange={(checked) => updateConfig("debugMode", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Settings</CardTitle>
                <CardDescription>Configure system performance parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">API Rate Limit (requests/hour)</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={systemConfig.apiRateLimit}
                    onChange={(e) => updateConfig("apiRateLimit", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileSize">Max File Size (MB)</Label>
                  <Input
                    id="fileSize"
                    type="number"
                    value={systemConfig.maxFileSize}
                    onChange={(e) => updateConfig("maxFileSize", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemConfig.sessionTimeout}
                    onChange={(e) => updateConfig("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>

                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Backup Status</CardTitle>
                <CardDescription>Current backup information and schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Backup:</span>
                    <span className="text-sm">{new Date(backupInfo.lastBackup).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Next Backup:</span>
                    <span className="text-sm">{new Date(backupInfo.nextBackup).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Backup Size:</span>
                    <span className="text-sm">{backupInfo.backupSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge
                      className={
                        backupInfo.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : backupInfo.status === "running"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }
                    >
                      {backupInfo.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Run Backup Now
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recovery Options</CardTitle>
                <CardDescription>Restore system from backup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFile">Select Backup File</Label>
                  <Input id="backupFile" type="file" accept=".backup,.sql,.tar.gz" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restoreNotes">Recovery Notes</Label>
                  <Textarea id="restoreNotes" placeholder="Add notes about this recovery operation..." rows={3} />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800 dark:text-yellow-200">Warning</div>
                      <div className="text-yellow-700 dark:text-yellow-300">
                        System recovery will overwrite current data. Ensure you have a recent backup before proceeding.
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="destructive" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Start Recovery
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <Badge className={getLogLevelColor(log.level)}>{log.level}</Badge>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{log.component}</p>
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-4">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Load More Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Configure system security parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sslCert">SSL Certificate</Label>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Valid until Dec 31, 2024</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firewall">Firewall Status</Label>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Active - 23 rules configured</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="encryption">Data Encryption</Label>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">AES-256 encryption enabled</span>
                  </div>
                </div>

                <Button className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Regenerate API Keys
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>Recent security events and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">No security threats detected</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Last scan: 5 min ago</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Failed login attempts: 3</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Last hour</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">API requests: 1,247</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Last hour</span>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
