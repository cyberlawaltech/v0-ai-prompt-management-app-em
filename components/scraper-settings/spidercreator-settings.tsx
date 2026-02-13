"use client"

import type { SpiderCreatorSettings } from "@/lib/types/agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SpiderCreatorSettingsProps {
  settings: Partial<SpiderCreatorSettings>
  onChange: (settings: Partial<SpiderCreatorSettings>) => void
}

export function SpiderCreatorSettingsComponent({
  settings,
  onChange,
}: SpiderCreatorSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge>SpiderCreator Configuration</Badge>
          </CardTitle>
          <CardDescription>Configure SpiderCreator advanced web scraping settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="spider-api-key">API Key</Label>
            <Input
              id="spider-api-key"
              type="password"
              placeholder="Enter your SpiderCreator API key"
              value={settings.apiKey || ""}
              onChange={(e) => onChange({ ...settings, apiKey: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from SpiderCreator console
            </p>
          </div>

          {/* Timeout */}
          <div className="space-y-2">
            <Label htmlFor="spider-timeout">
              Request Timeout (seconds): {settings.timeout || 60}
            </Label>
            <Slider
              id="spider-timeout"
              min={10}
              max={300}
              step={10}
              value={[settings.timeout || 60]}
              onValueChange={(value) => onChange({ ...settings, timeout: value[0] })}
            />
          </div>

          {/* Max Depth */}
          <div className="space-y-2">
            <Label htmlFor="spider-max-depth">
              Max Crawl Depth: {settings.maxDepth || 3}
            </Label>
            <Slider
              id="spider-max-depth"
              min={1}
              max={10}
              step={1}
              value={[settings.maxDepth || 3]}
              onValueChange={(value) => onChange({ ...settings, maxDepth: value[0] })}
            />
            <p className="text-xs text-muted-foreground">
              How many levels deep to crawl from the starting URL
            </p>
          </div>

          {/* Browser Type */}
          <div className="space-y-2">
            <Label htmlFor="spider-browser">Browser Type</Label>
            <Select
              value={settings.browserType || "chrome"}
              onValueChange={(value) =>
                onChange({
                  ...settings,
                  browserType: value as "chrome" | "firefox" | "safari",
                })
              }
            >
              <SelectTrigger id="spider-browser">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chrome">Chrome</SelectItem>
                <SelectItem value="firefox">Firefox</SelectItem>
                <SelectItem value="safari">Safari</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* JavaScript Enabled */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Enable JavaScript</Label>
              <p className="text-sm text-muted-foreground">Execute JavaScript on pages</p>
            </div>
            <Switch
              checked={settings.enableJavaScript ?? true}
              onCheckedChange={(value) => onChange({ ...settings, enableJavaScript: value })}
            />
          </div>

          {/* Follow External Links */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Follow External Links</Label>
              <p className="text-sm text-muted-foreground">Crawl outside the main domain</p>
            </div>
            <Switch
              checked={settings.followExternalLinks ?? false}
              onCheckedChange={(value) => onChange({ ...settings, followExternalLinks: value })}
            />
          </div>

          {/* Custom Scripts */}
          <Tabs defaultValue="css" className="w-full">
            <TabsList>
              <TabsTrigger value="css">Custom CSS</TabsTrigger>
              <TabsTrigger value="js">Custom JavaScript</TabsTrigger>
              <TabsTrigger value="extraction">Data Extraction</TabsTrigger>
            </TabsList>

            <TabsContent value="css" className="space-y-2">
              <Label htmlFor="spider-css">Custom CSS Selectors</Label>
              <Textarea
                id="spider-css"
                placeholder={`.article-title: Get article titles\n.article-content: Get article content`}
                value={settings.customCss || ""}
                onChange={(e) => onChange({ ...settings, customCss: e.target.value })}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Define CSS selectors for extracting specific elements
              </p>
            </TabsContent>

            <TabsContent value="js" className="space-y-2">
              <Label htmlFor="spider-js">Custom JavaScript</Label>
              <Textarea
                id="spider-js"
                placeholder="// Custom script to run on each page\nreturn document.querySelectorAll('.item').length;"
                value={settings.customJs || ""}
                onChange={(e) => onChange({ ...settings, customJs: e.target.value })}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                JavaScript code to execute before scraping
              </p>
            </TabsContent>

            <TabsContent value="extraction" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable Data Extraction</Label>
                  <p className="text-sm text-muted-foreground">
                    Extract structured data from pages
                  </p>
                </div>
                <Switch
                  checked={settings.dataExtraction?.enableDataExtraction ?? false}
                  onCheckedChange={(value) =>
                    onChange({
                      ...settings,
                      dataExtraction: {
                        ...settings.dataExtraction,
                        enableDataExtraction: value,
                      },
                    })
                  }
                />
              </div>

              {settings.dataExtraction?.enableDataExtraction && (
                <div className="space-y-2">
                  <Label htmlFor="spider-extraction-rules">Extraction Rules (JSON)</Label>
                  <Textarea
                    id="spider-extraction-rules"
                    placeholder={`{
  "title": ".product-title",
  "price": ".product-price",
  "description": ".product-desc"
}`}
                    value={settings.dataExtraction?.extractionRules || ""}
                    onChange={(e) =>
                      onChange({
                        ...settings,
                        dataExtraction: {
                          ...settings.dataExtraction,
                          extractionRules: e.target.value,
                        },
                      })
                    }
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    JSON object mapping field names to CSS selectors
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
