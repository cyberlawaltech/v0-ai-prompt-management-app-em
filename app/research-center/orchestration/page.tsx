"use client"

import { Textarea } from "@/components/ui/textarea"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Brain, Settings, ArrowRight, Plus, Trash2 } from "lucide-react"

export default function AgentOrchestration() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents = [
    {
      id: "1",
      name: "Lead Researcher",
      type: "orchestrator",
      status: "active",
      model: "gpt-4o",
      description: "Coordinates research activities and delegates tasks to specialized agents",
      capabilities: ["Task delegation", "Research planning", "Result synthesis", "Knowledge integration"],
    },
    {
      id: "2",
      name: "Data Analyst",
      type: "specialist",
      status: "active",
      model: "claude-3-opus",
      description: "Specializes in data analysis and statistical evaluation",
      capabilities: ["Statistical analysis", "Data visualization", "Trend identification", "Anomaly detection"],
    },
    {
      id: "3",
      name: "Literature Reviewer",
      type: "specialist",
      status: "active",
      model: "llama-3-70b",
      description: "Reviews academic papers and extracts relevant information",
      capabilities: [
        "Paper summarization",
        "Citation analysis",
        "Key finding extraction",
        "Research gap identification",
      ],
    },
    {
      id: "4",
      name: "Code Tester",
      type: "specialist",
      status: "inactive",
      model: "gpt-4-turbo",
      description: "Tests and evaluates code implementations from research",
      capabilities: ["Code review", "Performance testing", "Bug identification", "Implementation suggestions"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agent Orchestration</h1>
          <p className="text-muted-foreground">Manage your research agent team</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Agents</CardTitle>
              <CardDescription>Configure and manage your agent team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${
                    selectedAgent === agent.id ? "bg-primary/10 border-primary" : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.type}</div>
                      </div>
                    </div>
                    <Badge variant={agent.status === "active" ? "default" : "outline"}>{agent.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Connections</CardTitle>
              <CardDescription>How agents communicate with each other</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Lead Researcher → Data Analyst</div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Data requests, analysis tasks</span>
                  </div>
                </div>

                <div className="p-2 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Lead Researcher → Literature Reviewer</div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Research questions, topic exploration</span>
                  </div>
                </div>

                <div className="p-2 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Lead Researcher → Code Tester</div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Implementation verification, performance testing</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedAgent ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{agents.find((a) => a.id === selectedAgent)?.name}</CardTitle>
                    <CardDescription>{agents.find((a) => a.id === selectedAgent)?.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Agent Type</Label>
                    <div className="font-medium">{agents.find((a) => a.id === selectedAgent)?.type}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center">
                      <Switch checked={agents.find((a) => a.id === selectedAgent)?.status === "active"} />
                      <span className="ml-2">
                        {agents.find((a) => a.id === selectedAgent)?.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select defaultValue={agents.find((a) => a.id === selectedAgent)?.model}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Framework</Label>
                    <Select defaultValue="react">
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">ReAct</SelectItem>
                        <SelectItem value="reflexion">Reflexion</SelectItem>
                        <SelectItem value="cot">Chain of Thought</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Capabilities</Label>
                  <div className="flex flex-wrap gap-2">
                    {agents
                      .find((a) => a.id === selectedAgent)
                      ?.capabilities.map((capability, index) => (
                        <Badge key={index} variant="secondary">
                          {capability}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Knowledge Access</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="kb" />
                      <label
                        htmlFor="kb"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Knowledge Base
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="db" defaultChecked />
                      <label
                        htmlFor="db"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Database
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="litgpt" defaultChecked />
                      <label
                        htmlFor="litgpt"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        LitGPT Storage
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="web" />
                      <label
                        htmlFor="web"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Web Access
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>System Prompt</Label>
                  <Textarea
                    rows={4}
                    defaultValue={`You are a ${agents.find((a) => a.id === selectedAgent)?.type} AI research agent specializing in ${agents.find((a) => a.id === selectedAgent)?.name.toLowerCase()} tasks. Your goal is to assist the research team by ${agents.find((a) => a.id === selectedAgent)?.description.toLowerCase()}`}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Select an Agent</h3>
                <p className="text-muted-foreground mb-4">
                  Choose an agent from the list to view and configure its details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
