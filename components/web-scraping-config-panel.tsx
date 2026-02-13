'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export function WebScrapingConfigPanel() {
  const [selectedProvider] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">OpenClaw</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Fast parsing with proxy support</p>
            <Badge variant="outline">Ready to Configure</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Firecrawl</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Enterprise-grade crawling</p>
            <Badge variant="outline">Ready to Configure</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">SpiderCreator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Visual scraping with CSS rules</p>
            <Badge variant="outline">Ready to Configure</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Web Scraping Configuration</CardTitle>
          <CardDescription>
            Configure your web scraping providers and their advanced settings for agent creation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="openclaw">OpenClaw</TabsTrigger>
              <TabsTrigger value="firecrawl">Firecrawl</TabsTrigger>
              <TabsTrigger value="spider">Spider</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Select a provider above to view and configure its specific settings. Each provider has unique
                  configurations optimized for different use cases.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Available Providers:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>
                      <strong>OpenClaw:</strong> Ideal for fast parsing with proxy and header support
                    </li>
                    <li>
                      <strong>Firecrawl:</strong> Best for enterprise-grade crawling with advanced filtering
                    </li>
                    <li>
                      <strong>SpiderCreator:</strong> Perfect for visual scraping with CSS selectors and JavaScript
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="openclaw" className="space-y-4 mt-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  OpenClaw configuration is managed during agent creation. Visit the agent creation flow to configure
                  OpenClaw-specific settings.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="firecrawl" className="space-y-4 mt-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Firecrawl configuration is managed during agent creation. Visit the agent creation flow to configure
                  Firecrawl-specific settings.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="spider" className="space-y-4 mt-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  SpiderCreator configuration is managed during agent creation. Visit the agent creation flow to
                  configure SpiderCreator-specific settings.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
