"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Bot, Brain, Code, Settings } from "lucide-react"

export default function CreateAgent() {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Agent</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full p-2 ${step >= 1 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}
          >
            <Bot className="h-5 w-5" />
          </div>
          <div>Basic Info</div>
        </div>
        <div className="h-px w-12 bg-slate-200" />
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full p-2 ${step >= 2 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}
          >
            <Brain className="h-5 w-5" />
          </div>
          <div>Capabilities</div>
        </div>
        <div className="h-px w-12 bg-slate-200" />
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full p-2 ${step >= 3 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}
          >
            <Code className="h-5 w-5" />
          </div>
          <div>Framework</div>
        </div>
        <div className="h-px w-12 bg-slate-200" />
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full p-2 ${step >= 4 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}
          >
            <Settings className="h-5 w-5" />
          </div>
          <div>Configuration</div>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide basic information about your agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input id="agent-name" placeholder="e.g., Research Assistant" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-description">Description</Label>
              <Textarea id="agent-description" placeholder="Describe what your agent does..." rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-category">Category</Label>
              <Select>
                <SelectTrigger id="agent-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="customer-support">Customer Support</SelectItem>
                  <SelectItem value="data-analysis">Data Analysis</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={nextStep}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Capabilities</CardTitle>
            <CardDescription>Define what your agent can do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Web Browsing</Label>
                  <p className="text-sm text-muted-foreground">Allow agent to browse the web</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">File Access</Label>
                  <p className="text-sm text-muted-foreground">Allow agent to access files</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Code Execution</Label>
                  <p className="text-sm text-muted-foreground">Allow agent to execute code</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">API Access</Label>
                  <p className="text-sm text-muted-foreground">Allow agent to make API calls</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Memory</Label>
                  <p className="text-sm text-muted-foreground">Allow agent to remember past interactions</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Voice Output</Label>
                  <p className="text-sm text-muted-foreground">Enable text-to-speech for agent responses</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Previous Step
              </Button>
              <Button onClick={nextStep}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Framework</CardTitle>
            <CardDescription>Choose the framework for your agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">ReAct</CardTitle>
                  <CardDescription>Reasoning and Acting</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Combines reasoning and acting in an iterative process. Best for complex problem-solving tasks.
                  </p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reflexion</CardTitle>
                  <CardDescription>Self-reflection framework</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Enables agents to reflect on past actions and improve future decisions.</p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chain of Thought</CardTitle>
                  <CardDescription>Step-by-step reasoning</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Breaks down complex problems into smaller, manageable steps for better reasoning.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="model">Base Model</Label>
              <Select defaultValue="gpt-4o">
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                  <SelectItem value="custom">Custom LitGPT Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Previous Step
              </Button>
              <Button onClick={nextStep}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>Configure advanced settings for your agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="memory">Memory</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <div className="flex items-center space-x-2">
                    <Slider defaultValue={[0.7]} max={1} step={0.1} />
                    <span className="w-12 text-center">0.7</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Max Tokens</Label>
                  <div className="flex items-center space-x-2">
                    <Slider defaultValue={[2048]} max={4096} step={256} />
                    <span className="w-12 text-center">2048</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Autonomous Mode</Label>
                    <p className="text-sm text-muted-foreground">Allow agent to operate independently</p>
                  </div>
                  <Switch />
                </div>
              </TabsContent>

              <TabsContent value="memory" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="memory-type">Memory Type</Label>
                  <Select defaultValue="conversation">
                    <SelectTrigger id="memory-type">
                      <SelectValue placeholder="Select memory type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conversation">Conversation History</SelectItem>
                      <SelectItem value="summary">Summary Memory</SelectItem>
                      <SelectItem value="buffer">Buffer Memory</SelectItem>
                      <SelectItem value="vector">Vector Store</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Memory Window Size</Label>
                  <div className="flex items-center space-x-2">
                    <Slider defaultValue={[10]} max={20} step={1} />
                    <span className="w-12 text-center">10</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Persistent Memory</Label>
                    <p className="text-sm text-muted-foreground">Save memory between sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    placeholder="Enter system prompt for your agent..."
                    rows={4}
                    defaultValue="You are a helpful AI assistant designed to provide accurate and useful information."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="top-p">Top P</Label>
                  <div className="flex items-center space-x-2">
                    <Slider id="top-p" defaultValue={[0.9]} max={1} step={0.05} />
                    <span className="w-12 text-center">0.9</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency-penalty">Frequency Penalty</Label>
                  <div className="flex items-center space-x-2">
                    <Slider id="frequency-penalty" defaultValue={[0.5]} max={2} step={0.1} />
                    <span className="w-12 text-center">0.5</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Show detailed logs and reasoning</p>
                  </div>
                  <Switch />
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Previous Step
              </Button>
              <Button>Create Agent</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
