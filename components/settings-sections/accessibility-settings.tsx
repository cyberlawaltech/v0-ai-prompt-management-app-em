'use client'

import { useState, useEffect } from 'react'
import { useUnifiedSettings } from '@/lib/contexts/unified-settings-context'
import { useTTSContext } from '@/lib/contexts/tts-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TTSControls } from '@/components/tts-controls'

export function AccessibilitySettings() {
  const { getSectionSettings, updateMultipleSettings } = useUnifiedSettings()
  const { settings: ttsSettings, updateSettings: updateTTSSettings, resetSettings: resetTTSSettings } = useTTSContext()
  const [testText, setTestText] = useState('Hello! This is a test of the text-to-speech functionality.')

  const accessibilitySettings = getSectionSettings('accessibility') as any || {}

  const handleTTSToggle = (enabled: boolean) => {
    updateTTSSettings({ enabled })
    updateMultipleSettings('accessibility', { ttsEnabled: enabled })
  }

  const handleAutoPlayToggle = (autoPlay: boolean) => {
    updateTTSSettings({ autoPlay })
    updateMultipleSettings('accessibility', { ttsAutoPlay: autoPlay })
  }

  const handleRateChange = (rate: number) => {
    updateTTSSettings({ rate })
    updateMultipleSettings('accessibility', { ttsRate: rate })
  }

  const handlePitchChange = (pitch: number) => {
    updateTTSSettings({ pitch })
    updateMultipleSettings('accessibility', { ttsPitch: pitch })
  }

  const handleVolumeChange = (volume: number) => {
    updateTTSSettings({ volume })
    updateMultipleSettings('accessibility', { ttsVolume: volume })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech</CardTitle>
          <CardDescription>Configure voice synthesis settings for enhanced accessibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Text-to-Speech</Label>
              <div className="text-sm text-muted-foreground">Allow text content to be read aloud</div>
            </div>
            <Switch checked={ttsSettings.enabled} onCheckedChange={handleTTSToggle} />
          </div>

          {ttsSettings.enabled && (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-play Responses</Label>
                  <div className="text-sm text-muted-foreground">Automatically read new chat responses</div>
                </div>
                <Switch checked={ttsSettings.autoPlay} onCheckedChange={handleAutoPlayToggle} />
              </div>

              <div className="space-y-4 border-t pt-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base">Speech Rate</Label>
                    <span className="text-sm text-muted-foreground">{(ttsSettings.rate * 100).toFixed(0)}%</span>
                  </div>
                  <Slider
                    value={[ttsSettings.rate]}
                    onValueChange={(value) => handleRateChange(value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base">Pitch</Label>
                    <span className="text-sm text-muted-foreground">{(ttsSettings.pitch * 100).toFixed(0)}%</span>
                  </div>
                  <Slider
                    value={[ttsSettings.pitch]}
                    onValueChange={(value) => handlePitchChange(value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base">Volume</Label>
                    <span className="text-sm text-muted-foreground">{(ttsSettings.volume * 100).toFixed(0)}%</span>
                  </div>
                  <Slider
                    value={[ttsSettings.volume]}
                    onValueChange={(value) => handleVolumeChange(value[0])}
                    min={0}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <Label className="text-base">Test Voice</Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter text to test voice..."
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                  />
                  <TTSControls text={testText} variant="outline" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Reset to Defaults</h4>
                    <p className="text-sm text-muted-foreground">Reset all TTS settings to their default values</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetTTSSettings()}>
                    Reset TTS Settings
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation</CardTitle>
          <CardDescription>Configure keyboard shortcuts and navigation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Keyboard Shortcuts</Label>
              <div className="text-sm text-muted-foreground">Use keyboard shortcuts to navigate the application</div>
            </div>
            <Switch
              checked={accessibilitySettings.keyboardShortcuts !== false}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('accessibility', { keyboardShortcuts: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Options</CardTitle>
          <CardDescription>Adjust display settings for better readability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">High Contrast Mode</Label>
              <div className="text-sm text-muted-foreground">Increase contrast for better visibility</div>
            </div>
            <Switch
              checked={accessibilitySettings.highContrast === true}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('accessibility', { highContrast: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Reduce Motion</Label>
              <div className="text-sm text-muted-foreground">Minimize animations and transitions</div>
            </div>
            <Switch
              checked={accessibilitySettings.reduceMotion === true}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('accessibility', { reduceMotion: enabled })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Larger Text</Label>
              <div className="text-sm text-muted-foreground">Increase default text size</div>
            </div>
            <Switch
              checked={accessibilitySettings.largerText === true}
              onCheckedChange={(enabled) =>
                updateMultipleSettings('accessibility', { largerText: enabled })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
