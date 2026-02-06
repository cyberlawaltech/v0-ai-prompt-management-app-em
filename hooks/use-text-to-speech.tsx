"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface TTSSettings {
  rate: number
  pitch: number
  volume: number
  voice: SpeechSynthesisVoice | null
}

interface UseTTSReturn {
  speak: (text: string) => void
  stop: () => void
  pause: () => void
  resume: () => void
  isSpeaking: boolean
  isPaused: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
  settings: TTSSettings
  updateSettings: (newSettings: Partial<TTSSettings>) => void
  currentText: string
}

export function useTextToSpeech(): UseTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentText, setCurrentText] = useState("")
  const [settings, setSettings] = useState<TTSSettings>({
    rate: 1,
    pitch: 1,
    volume: 0.8,
    voice: null,
  })

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true)

      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices()
        setVoices(availableVoices)

        // Set default voice to first English voice or first available
        if (availableVoices.length > 0 && !settings.voice) {
          const englishVoice = availableVoices.find((voice) => voice.lang.startsWith("en"))
          setSettings((prev) => ({
            ...prev,
            voice: englishVoice || availableVoices[0],
          }))
        }
      }

      loadVoices()
      speechSynthesis.addEventListener("voiceschanged", loadVoices)

      return () => {
        speechSynthesis.removeEventListener("voiceschanged", loadVoices)
      }
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return

      // Stop any current speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = settings.rate
      utterance.pitch = settings.pitch
      utterance.volume = settings.volume

      if (settings.voice) {
        utterance.voice = settings.voice
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
        setIsPaused(false)
        setCurrentText(text)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        setIsPaused(false)
        setCurrentText("")
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setIsPaused(false)
        setCurrentText("")
      }

      utterance.onpause = () => {
        setIsPaused(true)
      }

      utterance.onresume = () => {
        setIsPaused(false)
      }

      utteranceRef.current = utterance
      speechSynthesis.speak(utterance)
    },
    [isSupported, settings],
  )

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
    setCurrentText("")
  }, [])

  const pause = useCallback(() => {
    if (isSpeaking && !isPaused) {
      speechSynthesis.pause()
    }
  }, [isSpeaking, isPaused])

  const resume = useCallback(() => {
    if (isSpeaking && isPaused) {
      speechSynthesis.resume()
    }
  }, [isSpeaking, isPaused])

  const updateSettings = useCallback((newSettings: Partial<TTSSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }, [])

  return {
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
  }
}
