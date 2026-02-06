"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Brain, Play, PauseCircle, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react"
import { TTSControls } from "@/components/tts-controls"

export default function ResearchCenter() {
  const [activeResearch, setActiveResearch] = useState<string | null>(null)

  const researchProjects = [
    {
      id: "1",
      title: "AI Prompt Engineering Techniques",
      description: "Research on latest prompt engineering methods and their effectiveness",
      status: "active",
      progress: 65,
      agents: 3,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      title: "LLM Fine-tuning Comparison",
      description: "Comparative analysis of different fine-tuning approaches for LLMs",
      status: "completed",
      progress: 100,
      agents: 4,
      lastUpdated: "Yesterday",
    },
    {
      id: "3",
      title: "Multimodal AI Applications",
      description: "Exploring applications of multimodal AI in creative industries",
      status: "paused",
      progress: 42,
      agents: 2,
      lastUpdated: "3 days ago",
    },
    {
      id: "4",
      title: "Retrieval Augmented Generation",
      description: "Research on RAG techniques for improving LLM accuracy",
      status: "active",
      progress: 28,
      agents: 3,
      lastUpdated: "5 hours ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-4 w-4 text-green-500" />
      case "paused":
        return <PauseCircle className="h-4 w-4 text-amber-500" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Paused
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Research Center</h1>
          <p className="text-muted-foreground">Manage your AI research projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Research Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Research Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Knowledge Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed Research</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search research projects..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center">
                        {getStatusIcon(project.status)}
                        <span className="ml-2">{project.title}</span>
                      </CardTitle>
                      <CardDescription className="flex items-start justify-between gap-2">
                        <span className="flex-1">{project.description}</span>
                        <TTSControls
                          text={`${project.title}. ${project.description}`}
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </CardDescription>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Brain className="h-3 w-3 mr-1" />
                        <span>{project.agents} agents</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{project.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full" onClick={() => setActiveResearch(project.id)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchProjects
              .filter((p) => p.status === "active")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {getStatusIcon(project.status)}
                          <span className="ml-2">{project.title}</span>
                        </CardTitle>
                        <CardDescription className="flex items-start justify-between gap-2">
                          <span className="flex-1">{project.description}</span>
                          <TTSControls
                            text={`${project.title}. ${project.description}`}
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </CardDescription>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Brain className="h-3 w-3 mr-1" />
                          <span>{project.agents} agents</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{project.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => setActiveResearch(project.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchProjects
              .filter((p) => p.status === "completed")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {getStatusIcon(project.status)}
                          <span className="ml-2">{project.title}</span>
                        </CardTitle>
                        <CardDescription className="flex items-start justify-between gap-2">
                          <span className="flex-1">{project.description}</span>
                          <TTSControls
                            text={`${project.title}. ${project.description}`}
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </CardDescription>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Brain className="h-3 w-3 mr-1" />
                          <span>{project.agents} agents</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{project.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => setActiveResearch(project.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="paused">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchProjects
              .filter((p) => p.status === "paused")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {getStatusIcon(project.status)}
                          <span className="ml-2">{project.title}</span>
                        </CardTitle>
                        <CardDescription className="flex items-start justify-between gap-2">
                          <span className="flex-1">{project.description}</span>
                          <TTSControls
                            text={`${project.title}. ${project.description}`}
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </CardDescription>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Brain className="h-3 w-3 mr-1" />
                          <span>{project.agents} agents</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{project.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => setActiveResearch(project.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
