"use client"

import type { FirecrawlSettings } from "@/lib/types/agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FirecrawlSettingsProps {
  settings: Partial<FirecrawlSettings>
  onChange: (settings: Partial<FirecrawlSettings>) => void
}

export function FirecrawlSettingsComponent({ settings, onChange }: FirecrawlSettingsProps) {
  const addPattern = (list: string[] | undefined, newPattern: string) => {
    if (newPattern.trim()) {
      onChange({ ...settings, [list === settings.excludePatterns ? "excludePatterns" : "onlyIncludePatterns"]: [...(list || []), newPattern] })
    }
  }

  const removePattern = (list: string[] | undefined, index: number) => {
    if (list) {
      const updated = list.filter((_, i) => i !== index)
      onChange({
        ...settings,
        [list === settings.excludePatterns ? "excludePatterns" : "onlyIncludePatterns"]: updated,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge>Firecrawl Configuration</Badge>
          </CardTitle>
          <CardDescription>Configure Firecrawl web crawling settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="firecrawl-api-key">API Key</Label>
            <Input
              id="firecrawl-api-key"
              type="password"
              placeholder="Enter your Firecrawl API key"
              value={settings.apiKey || ""}
              onChange={(e) => onChange({ ...settings, apiKey: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from Firecrawl dashboard
            </p>
          </div>

          {/* Timeout */}
          <div className="space-y-2">
            <Label htmlFor="firecrawl-timeout">
              Request Timeout (seconds): {settings.timeout || 30}
            </Label>
            <Slider
              id="firecrawl-timeout"
              min={5}
              max={180}
              step={5}
              value={[settings.timeout || 30]}
              onValueChange={(value) => onChange({ ...settings, timeout: value[0] })}
            />
          </div>

          {/* Max Pages */}
          <div className="space-y-2">
            <Label htmlFor="firecrawl-max-pages">
              Max Pages to Crawl: {settings.maxPages || 100}
            </Label>
            <Slider
              id="firecrawl-max-pages"
              min={1}
              max={1000}
              step={10}
              value={[settings.maxPages || 100]}
              onValueChange={(value) => onChange({ ...settings, maxPages: value[0] })}
            />
          </div>

          {/* Crawl Subpages */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Crawl Subpages</Label>
              <p className="text-sm text-muted-foreground">Follow links to subpages</p>
            </div>
            <Switch
              checked={settings.crawlSubpages ?? true}
              onCheckedChange={(value) => onChange({ ...settings, crawlSubpages: value })}
            />
          </div>

          {/* Remove CSS */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Remove CSS</Label>
              <p className="text-sm text-muted-foreground">Strip CSS from content</p>
            </div>
            <Switch
              checked={settings.removeCss ?? true}
              onCheckedChange={(value) => onChange({ ...settings, removeCss: value })}
            />
          </div>

          {/* Remove JavaScript */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Remove JavaScript</Label>
              <p className="text-sm text-muted-foreground">Remove scripts from content</p>
            </div>
            <Switch
              checked={settings.removeJavaScript ?? true}
              onCheckedChange={(value) => onChange({ ...settings, removeJavaScript: value })}
            />
          </div>

          {/* Block Resources */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Block Resources</Label>
              <p className="text-sm text-muted-foreground">Block images and media files</p>
            </div>
            <Switch
              checked={settings.blockResources ?? false}
              onCheckedChange={(value) => onChange({ ...settings, blockResources: value })}
            />
          </div>

          {/* Screenshot */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Take Screenshots</Label>
              <p className="text-sm text-muted-foreground">Capture page screenshots</p>
            </div>
            <Switch
              checked={settings.screenshot ?? false}
              onCheckedChange={(value) => onChange({ ...settings, screenshot: value })}
            />
          </div>

          {/* Wait For Selector */}
          <div className="space-y-2">
            <Label htmlFor="firecrawl-wait-for">Wait For CSS Selector</Label>
            <Input
              id="firecrawl-wait-for"
              placeholder=".main-content"
              value={settings.waitFor || ""}
              onChange={(e) => onChange({ ...settings, waitFor: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Wait for element to load before crawling
            </p>
          </div>

          {/* Exclude Patterns */}
          <div className="space-y-2">
            <Label>URL Exclude Patterns</Label>
            <div className="space-y-2">
              {settings.excludePatterns?.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-100 p-2 rounded">
                  <code className="text-sm">{pattern}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePattern(settings.excludePatterns, index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Input
                placeholder="e.g., /admin/*, *.pdf"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addPattern(settings.excludePatterns, e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
            </div>
          </div>

          {/* Include Patterns */}
          <div className="space-y-2">
            <Label>URL Include Patterns</Label>
            <div className="space-y-2">
              {settings.onlyIncludePatterns?.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-100 p-2 rounded">
                  <code className="text-sm">{pattern}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePattern(settings.onlyIncludePatterns, index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Input
                placeholder="e.g., /blog/*, /products/*"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addPattern(settings.onlyIncludePatterns, e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
