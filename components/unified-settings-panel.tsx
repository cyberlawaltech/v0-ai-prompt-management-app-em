'use client'

import { useState } from 'react'
import { ChevronDown, Search, Download, Upload, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUnifiedSettings } from '@/lib/contexts/unified-settings-context'
import { AISettings } from './settings-sections/ai-settings'
import { AccessibilitySettings } from './settings-sections/accessibility-settings'
import { AppearanceSettings } from './settings-sections/appearance-settings'
import { NotificationSettings } from './settings-sections/notification-settings'

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ComponentType
}

export function UnifiedSettingsPanel() {
  const { expandedSections, toggleSection, exportSettings, importSettings, resetSettings } = useUnifiedSettings()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllSections, setShowAllSections] = useState(true)

  const sections: SettingsSection[] = [
    {
      id: 'ai',
      title: 'AI & Models',
      description: 'LLM configuration, voice control, and AI-powered features',
      icon: '🤖',
      component: AISettings,
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      description: 'Text-to-speech, keyboard navigation, and assistive features',
      icon: '♿',
      component: AccessibilitySettings,
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Theme, layout, and visual preferences',
      icon: '🎨',
      component: AppearanceSettings,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Configure alerts and notification preferences',
      icon: '🔔',
      component: NotificationSettings,
    },
  ]

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleExport = () => {
    const data = exportSettings()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'app-settings.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const json = event.target?.result as string
          if (importSettings(json)) {
            alert('Settings imported successfully')
          } else {
            alert('Failed to import settings. Please check the file format.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Settings</h1>
        <p className="text-muted-foreground">Manage all application settings in one unified interface</p>
      </div>

      <Card className="bg-muted/40">
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllSections(!showAllSections)}
              className="text-xs"
            >
              {showAllSections ? 'Collapse All' : 'Expand All'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="text-xs gap-1"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImport}
              className="text-xs gap-1"
            >
              <Upload className="h-3 w-3" />
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('Reset all settings to defaults?')) {
                  resetSettings()
                }
              }}
              className="text-xs gap-1 text-destructive"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredSections.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No settings found matching your search</p>
            </CardContent>
          </Card>
        ) : (
          filteredSections.map((section) => {
            const isExpanded = expandedSections.has(section.id as any)
            const Component = section.component

            return (
              <Card key={section.id} className="overflow-hidden transition-all">
                <button
                  onClick={() => toggleSection(section.id as any)}
                  className="w-full text-left"
                >
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl mt-1">{section.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {section.title}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent className="border-t pt-6">
                    <Component />
                  </CardContent>
                )}
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
