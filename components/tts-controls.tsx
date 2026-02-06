"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Play, Pause, Square, Settings } from "lucide-react"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"

interface TTSControlsProps {
  text: string
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
  showSettings?: boolean
}

export function TTSControls({
  text,
  className = "",
  size = "sm",
  variant = "ghost",
  showSettings = false,
}: TTSControlsProps) {
  const {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    isSupported,
    voices,
    settings,
    updateSettings,
    currentText,
  } = useTextToSpeech()

  const [showSettingsPopover, setShowSettingsPopover] = useState(false)

  if (!isSupported) {
    return null
  }

  const isCurrentText = currentText === text
  const canSpeak = !isSpeaking || !isCurrentText

  const handlePlay = () => {
    if (isCurrentText && isPaused) {
      resume()
    } else {
      speak(text)
    }
  }

  const handlePause = () => {
    if (isCurrentText && isSpeaking && !isPaused) {
      pause()
    }
  }

  const handleStop = () => {
    stop()
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {canSpeak ? (
        <Button variant={variant} size={size} onClick={handlePlay} disabled={!text.trim()} title="Play text-to-speech">
          <Play className="h-4 w-4" />
          <span className="sr-only">Play text-to-speech</span>
        </Button>
      ) : (
        <div className="flex items-center gap-1">
          {isPaused ? (
            <Button variant={variant} size={size} onClick={handlePlay} title="Resume text-to-speech">
              <Play className="h-4 w-4" />
              <span className="sr-only">Resume text-to-speech</span>
            </Button>
          ) : (
            <Button variant={variant} size={size} onClick={handlePause} title="Pause text-to-speech">
              <Pause className="h-4 w-4" />
              <span className="sr-only">Pause text-to-speech</span>
            </Button>
          )}
          <Button variant={variant} size={size} onClick={handleStop} title="Stop text-to-speech">
            <Square className="h-4 w-4" />
            <span className="sr-only">Stop text-to-speech</span>
          </Button>
        </div>
      )}

      {showSettings && (
        <Popover open={showSettingsPopover} onOpenChange={setShowSettingsPopover}>
          <PopoverTrigger asChild>
            <Button variant={variant} size={size} title="TTS Settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">TTS Settings</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Text-to-Speech Settings</h4>

              <div className="space-y-2">
                <Label htmlFor="voice-select">Voice</Label>
                <Select
                  value={settings.voice?.name || ""}
                  onValueChange={(value) => {
                    const voice = voices.find((v) => v.name === value)
                    updateSettings({ voice: voice || null })
                  }}
                >
                  <SelectTrigger id="voice-select">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate-slider">Speed: {settings.rate.toFixed(1)}x</Label>
                <Slider
                  id="rate-slider"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[settings.rate]}
                  onValueChange={([value]) => updateSettings({ rate: value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pitch-slider">Pitch: {settings.pitch.toFixed(1)}</Label>
                <Slider
                  id="pitch-slider"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[settings.pitch]}
                  onValueChange={([value]) => updateSettings({ pitch: value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume-slider">Volume: {Math.round(settings.volume * 100)}%</Label>
                <Slider
                  id="volume-slider"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[settings.volume]}
                  onValueChange={([value]) => updateSettings({ volume: value })}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
