'use client'

import { useUnifiedSettings } from '@/lib/contexts/unified-settings-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function NotificationSettings() {
  const { getSectionSettings, updateMultipleSettings } = useUnifiedSettings()
  const notificationSettings = getSectionSettings('notifications') as any || {}

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Notifications</CardTitle>
          <CardDescription>Control when and how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Notifications</Label>
              <div className="text-sm text-muted-foreground">Receive in-app notifications</div>
            </div>
            <Switch
              checked={notificationSettings.enabled !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Desktop Notifications</Label>
              <div className="text-sm text-muted-foreground">Receive browser desktop notifications</div>
            </div>
            <Switch
              checked={notificationSettings.desktop === true}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { desktop: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Sound</Label>
              <div className="text-sm text-muted-foreground">Play sound on notifications</div>
            </div>
            <Switch
              checked={notificationSettings.sound !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { sound: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Choose which types of notifications to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">AI Responses</Label>
              <div className="text-sm text-muted-foreground">Get notified when AI completes tasks</div>
            </div>
            <Switch
              checked={notificationSettings.aiResponses !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { aiResponses: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Prompt Updates</Label>
              <div className="text-sm text-muted-foreground">Notifications for prompt changes</div>
            </div>
            <Switch
              checked={notificationSettings.promptUpdates !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { promptUpdates: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">System Updates</Label>
              <div className="text-sm text-muted-foreground">Get informed about system events</div>
            </div>
            <Switch
              checked={notificationSettings.systemUpdates !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { systemUpdates: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Agent Activity</Label>
              <div className="text-sm text-muted-foreground">Track agent operations and status</div>
            </div>
            <Switch
              checked={notificationSettings.agentActivity !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { agentActivity: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Schedule</CardTitle>
          <CardDescription>Set quiet hours to avoid notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Do Not Disturb</Label>
              <div className="text-sm text-muted-foreground">Disable notifications during quiet hours</div>
            </div>
            <Switch
              checked={notificationSettings.doNotDisturb === true}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('notifications', { doNotDisturb: enabled })
              }
            />
          </div>

          {notificationSettings.doNotDisturb && (
            <>
              <div>
                <Label htmlFor="dnd-start" className="text-sm">
                  Start Time
                </Label>
                <input
                  id="dnd-start"
                  type="time"
                  value={notificationSettings.dndStartTime || '22:00'}
                  onChange={(e) =>
                    updateMultipleSettings('notifications', { dndStartTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dnd-end" className="text-sm">
                  End Time
                </Label>
                <input
                  id="dnd-end"
                  type="time"
                  value={notificationSettings.dndEndTime || '08:00'}
                  onChange={(e) =>
                    updateMultipleSettings('notifications', { dndEndTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground mt-1"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
