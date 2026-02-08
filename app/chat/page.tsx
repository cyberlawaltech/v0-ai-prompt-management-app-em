"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Send, Bot, User, Settings, Plus, Sparkles } from "lucide-react"
import { TTSControls } from "@/components/tts-controls"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response with mock data (AI Gateway requires credit card verification)
      // In production, this would call the actual AI service
      const mockResponse =
        "Great question! Here's how I can help you with that:\n\n1. **Define Your Goal**: First, clarify what you want to achieve.\n2. **Draft Your Prompt**: Write a clear, detailed initial prompt.\n3. **Test & Iterate**: Use the Test Centre to validate and refine.\n4. **Optimize**: Apply best practices from our Research Guidance.\n\nWould you like specific guidance on any of these steps?"

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Chat Mode</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Select defaultValue="gpt-4o">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="sm:w-auto bg-transparent">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
          <Card className="flex-1 overflow-hidden flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
                  <Bot className="h-8 w-8 sm:h-12 sm:w-12 mb-4 text-muted-foreground" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Start a conversation</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md">
                    Use chat mode to plan out your project without making edits. Use clear, detailed, and iterative
                    prompts for best results.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                    <Button
                      variant="outline"
                      className="justify-start text-xs sm:text-sm h-auto p-3 bg-transparent"
                      onClick={() => setInput("Help me create a landing page for a SaaS product")}
                    >
                      <Sparkles className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-left">Design a landing page</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-xs sm:text-sm h-auto p-3 bg-transparent"
                      onClick={() => setInput("I need a prompt to generate blog post ideas")}
                    >
                      <Sparkles className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-left">Create a blog prompt</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-xs sm:text-sm h-auto p-3 bg-transparent"
                      onClick={() => setInput("Help me plan a React component structure")}
                    >
                      <Sparkles className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-left">Plan React components</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-xs sm:text-sm h-auto p-3 bg-transparent"
                      onClick={() => setInput("I need to improve my AI prompt engineering skills")}
                    >
                      <Sparkles className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-left">Improve prompt skills</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex group ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[85%] sm:max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <Avatar
                          className={`h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 ${message.role === "user" ? "ml-2" : "mr-2"}`}
                        >
                          <AvatarFallback className="text-xs">
                            {message.role === "user" ? (
                              <User className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                              <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-2 sm:p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="whitespace-pre-wrap text-sm sm:text-base flex-1">{message.content}</p>
                            <TTSControls
                              text={message.content}
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>
            <div className="p-3 sm:p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Button type="button" size="icon" variant="outline" className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 bg-transparent">
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="text-sm sm:text-base"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="shrink-0 h-9 w-9 sm:h-10 sm:w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="flex-1 mt-4">
          <Card className="h-full flex flex-col">
            <CardContent className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
              <Plus className="h-8 w-8 sm:h-12 sm:w-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Create a Project</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md">
                Projects help you organize your prompts and plan your work. Create a new project to get started.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
