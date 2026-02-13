"use client"

import type { OpenClawSettings } from "@/lib/types/agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface OpenClawSettingsProps {
  settings: Partial<OpenClawSettings>
  onChange: (settings: Partial<OpenClawSettings>) => void
}

export function OpenClawSettingsComponent({ settings, onChange }: OpenClawSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge>OpenClaw Configuration</Badge>
          </CardTitle>
          <CardDescription>Configure OpenClaw web scraping settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="openclaw-api-key">API Key</Label>
            <Input
              id="openclaw-api-key"
              type="password"
              placeholder="Enter your OpenClaw API key"
              value={settings.apiKey || ""}
              onChange={(e) => onChange({ ...settings, apiKey: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from OpenClaw dashboard
            </p>
          </div>

          {/* Timeout */}
          <div className="space-y-2">
            <Label htmlFor="openclaw-timeout">
              Request Timeout (seconds): {settings.timeout || 30}
            </Label>
            <Slider
              id="openclaw-timeout"
              min={5}
              max={120}
              step={5}
              value={[settings.timeout || 30]}
              onValueChange={(value) => onChange({ ...settings, timeout: value[0] })}
            />
          </div>

          {/* Retry Attempts */}
          <div className="space-y-2">
            <Label htmlFor="openclaw-retry">
              Retry Attempts: {settings.retryAttempts || 3}
            </Label>
            <Slider
              id="openclaw-retry"
              min={0}
              max={10}
              step={1}
              value={[settings.retryAttempts || 3]}
              onValueChange={(value) => onChange({ ...settings, retryAttempts: value[0] })}
            />
          </div>

          {/* Robots.txt Respect */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Respect robots.txt</Label>
              <p className="text-sm text-muted-foreground">Follow website crawling restrictions</p>
            </div>
            <Switch
              checked={settings.respectRobotsTxt ?? true}
              onCheckedChange={(value) => onChange({ ...settings, respectRobotsTxt: value })}
            />
          </div>

          {/* JavaScript Rendering */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">JavaScript Rendering</Label>
              <p className="text-sm text-muted-foreground">Execute JavaScript on pages</p>
            </div>
            <Switch
              checked={settings.javascriptRendering ?? false}
              onCheckedChange={(value) => onChange({ ...settings, javascriptRendering: value })}
            />
          </div>

          {/* User Agent */}
          <div className="space-y-2">
            <Label htmlFor="openclaw-user-agent">Custom User Agent</Label>
            <Input
              id="openclaw-user-agent"
              placeholder="Leave blank for default"
              value={settings.userAgent || ""}
              onChange={(e) => onChange({ ...settings, userAgent: e.target.value })}
            />
          </div>

          {/* Proxy URL */}
          <div className="space-y-2">
            <Label htmlFor="openclaw-proxy">Proxy URL</Label>
            <Input
              id="openclaw-proxy"
              placeholder="http://proxy.example.com:8080"
              value={settings.proxyUrl || ""}
              onChange={(e) => onChange({ ...settings, proxyUrl: e.target.value })}
            />
          </div>

          {/* Custom Headers */}
          <div className="space-y-2">
            <Label htmlFor="openclaw-headers">Custom Headers (JSON)</Label>
            <Textarea
              id="openclaw-headers"
              placeholder={'{"Authorization": "Bearer token"}'}
              value={JSON.stringify(settings.customHeaders || {}, null, 2)}
              onChange={(e) => {
                try {
                  const headers = JSON.parse(e.target.value)
                  onChange({ ...settings, customHeaders: headers })
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
