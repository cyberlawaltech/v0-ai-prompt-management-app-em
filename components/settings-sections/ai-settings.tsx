'use client'

import { useUnifiedSettings } from '@/lib/contexts/unified-settings-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LLMConfigProvider } from '@/lib/contexts/llm-config-context'
import { LLMConfigPanel } from '@/components/llm-config-panel'
import { WebScrapingConfigPanel } from '@/components/web-scraping-config-panel'

export function AISettings() {
  const { getSectionSettings } = useUnifiedSettings()

  return (
    <div className="space-y-6">
      <Tabs defaultValue="llm" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="llm">Language Models</TabsTrigger>
          <TabsTrigger value="scraping">Web Scraping</TabsTrigger>
        </TabsList>

        <TabsContent value="llm" className="space-y-4 mt-4">
          <LLMConfigProvider>
            <LLMConfigPanel />
          </LLMConfigProvider>
        </TabsContent>

        <TabsContent value="scraping" className="space-y-4 mt-4">
          <WebScrapingConfigPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
