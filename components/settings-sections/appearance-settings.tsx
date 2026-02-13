'use client'

import { useUnifiedSettings } from '@/lib/contexts/unified-settings-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function AppearanceSettings() {
  const { getSectionSettings, updateMultipleSettings } = useUnifiedSettings()
  const appearanceSettings = getSectionSettings('appearance') as any || {}

  const handleThemeChange = (theme: string) => {
    updateMultipleSettings('appearance', { theme })
  }

  const handleLayoutChange = (layout: string) => {
    updateMultipleSettings('appearance', { layout })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={appearanceSettings.theme || 'system'} onValueChange={handleThemeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light" className="font-normal cursor-pointer">
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark" className="font-normal cursor-pointer">
                Dark
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system" className="font-normal cursor-pointer">
                System Default
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>Choose your preferred layout style</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="layout-select" className="text-base">
              Default Layout
            </Label>
            <Select value={appearanceSettings.layout || 'default'} onValueChange={handleLayoutChange}>
              <SelectTrigger id="layout-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Sidebar Auto-collapse</Label>
              <div className="text-sm text-muted-foreground">Automatically collapse sidebar on small screens</div>
            </div>
            <Switch
              checked={appearanceSettings.sidebarAutoCollapse !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('appearance', { sidebarAutoCollapse: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visual Effects</CardTitle>
          <CardDescription>Control visual enhancements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Animations</Label>
              <div className="text-sm text-muted-foreground">Show smooth transitions and animations</div>
            </div>
            <Switch
              checked={appearanceSettings.animations !== false}
              onCheckedChange={(enabled) => updateMultipleSettings('appearance', { animations: enabled })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Tooltips</Label>
              <div className="text-sm text-muted-foreground">Display helpful tooltips on hover</div>
            </div>
            <Switch
              checked={appearanceSettings.tooltips !== false}
              onCheckedChange={(enabled) => updateMultipleSettings('appearance', { tooltips: enabled })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Rounded Corners</Label>
              <div className="text-sm text-muted-foreground">Use rounded corner style</div>
            </div>
            <Switch
              checked={appearanceSettings.roundedCorners !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('appearance', { roundedCorners: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sidebar Customization</CardTitle>
          <CardDescription>Customize your sidebar layout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Icons</Label>
              <div className="text-sm text-muted-foreground">Display icons in the sidebar</div>
            </div>
            <Switch
              checked={appearanceSettings.sidebarIcons !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('appearance', { sidebarIcons: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Labels</Label>
              <div className="text-sm text-muted-foreground">Display text labels in the sidebar</div>
            </div>
            <Switch
              checked={appearanceSettings.sidebarLabels !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('appearance', { sidebarLabels: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
