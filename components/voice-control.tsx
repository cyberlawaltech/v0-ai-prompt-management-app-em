"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface VoiceCommand {
  command: string
  action: () => void
}

export function VoiceControl() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [processingCommand, setProcessingCommand] = useState(false)
  const [commandFeedback, setCommandFeedback] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const router = useRouter()

  // Available voice commands
  const commands: VoiceCommand[] = [
    { command: "go to dashboard", action: () => router.push("/") },
    { command: "open chat", action: () => router.push("/chat") },
    { command: "show files", action: () => router.push("/file-manager") },
    { command: "open knowledge base", action: () => router.push("/knowledge-base") },
    { command: "create agent", action: () => router.push("/create-agent") },
    { command: "show prompts", action: () => router.push("/prompt-library") },
    { command: "open research", action: () => router.push("/research-center") },
    { command: "show settings", action: () => router.push("/settings") },
    { command: "close", action: () => setIsModalOpen(false) },
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("")

          setTranscript(transcript)
        }

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current?.start()
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          if (event.error === "not-allowed") {
            setCommandFeedback("Microphone access denied")
            setIsListening(false)
          } else if (event.error === "network") {
            setCommandFeedback("Network error - check your connection")
            setIsListening(false)
          } else if (event.error === "no-speech") {
            setCommandFeedback("No speech detected")
            setIsListening(false)
          }
        }
      } else {
        setIsSupported(false)
        console.log("Speech Recognition API not supported in this browser")
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening])

  useEffect(() => {
    const processTranscript = async () => {
      if (!transcript || processingCommand) return

      const exactMatch = commands.find((cmd) => transcript.toLowerCase().includes(cmd.command.toLowerCase()))

      if (exactMatch) {
        setProcessingCommand(true)
        setCommandFeedback(`Executing: ${exactMatch.command}`)

        setTimeout(() => {
          exactMatch.action()
          setTranscript("")
          setProcessingCommand(false)
        }, 1000)
        return
      }

      if (transcript.length > 5) {
        setProcessingCommand(true)
        try {
          const response = await fetch("/api/voice-command", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ transcript }),
          })

          if (!response.ok) {
            throw new Error("Failed to process command")
          }

          const data = await response.json()
          const matchedCommand = data.command

          if (matchedCommand !== "unknown") {
            const command = commands.find((cmd) => cmd.command.toLowerCase() === matchedCommand)
            if (command) {
              setCommandFeedback(`Executing: ${command.command}`)
              setTimeout(() => {
                command.action()
                setTranscript("")
                setProcessingCommand(false)
              }, 1000)
            }
          } else {
            setCommandFeedback("Command not recognized")
            setTimeout(() => {
              setTranscript("")
              setProcessingCommand(false)
            }, 1500)
          }
        } catch (error) {
          console.error("Error processing voice command:", error)
          setCommandFeedback("Error processing command")
          setProcessingCommand(false)
        }
      }
    }

    const debounceTimeout = setTimeout(() => {
      processTranscript()
    }, 1000)

    return () => clearTimeout(debounceTimeout)
  }, [transcript, router, processingCommand])

  const toggleListening = () => {
    if (!isSupported) {
      setCommandFeedback("Speech recognition not supported in this browser")
      setIsModalOpen(true)
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      setIsModalOpen(true)
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        setCommandFeedback("Error starting speech recognition")
      }
    }
  }

  const closeModal = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
    setIsModalOpen(false)
    setTranscript("")
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative h-8 w-8 rounded-full bg-transparent"
        onClick={toggleListening}
      >
        {isListening ? <Mic className="h-4 w-4 text-primary animate-pulse" /> : <Mic className="h-4 w-4" />}
        <span className="sr-only">Voice Control</span>
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Card className="w-[90vw] max-w-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Voice Control</CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeModal}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Speak a command to navigate the app</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    {isSupported ? (
                      <Button
                        variant={isListening ? "default" : "outline"}
                        size="lg"
                        className={`h-16 w-16 rounded-full ${isListening ? "bg-primary" : ""}`}
                        onClick={toggleListening}
                      >
                        {isListening ? (
                          <Mic className="h-8 w-8 text-primary-foreground" />
                        ) : (
                          <MicOff className="h-8 w-8" />
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-16 w-16 rounded-full opacity-50 bg-transparent"
                        disabled
                      >
                        <MicOff className="h-8 w-8" />
                      </Button>
                    )}
                  </div>

                  <div className="min-h-20 rounded-md border p-3 text-center">
                    {!isSupported ? (
                      <p className="text-sm text-muted-foreground">
                        Speech recognition is not supported in this browser.
                      </p>
                    ) : processingCommand ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="h-4 w-4 mb-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <p className="text-sm font-medium">{commandFeedback}</p>
                      </div>
                    ) : transcript ? (
                      <p className="text-sm">{transcript}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {isListening ? "Listening..." : "Click the microphone to start"}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <p className="text-sm font-medium mb-2">Available commands:</p>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {commands.slice(0, 8).map((cmd, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        "{cmd.command}"
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
