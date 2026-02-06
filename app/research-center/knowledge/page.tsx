"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Network, FileText, Database, Globe, Book, Lightbulb, Plus } from "lucide-react"

export default function KnowledgeExplorer() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  // Sample knowledge nodes
  const knowledgeNodes = [
    {
      id: "node-1",
      title: "Prompt Engineering Techniques",
      type: "concept",
      sources: 12,
      connections: 8,
      lastUpdated: "2 hours ago",
    },
    {
      id: "node-2",
      title: "Chain of Thought Reasoning",
      type: "concept",
      sources: 7,
      connections: 5,
      lastUpdated: "1 day ago",
    },
    {
      id: "node-3",
      title: "Retrieval Augmented Generation",
      type: "concept",
      sources: 9,
      connections: 6,
      lastUpdated: "3 days ago",
    },
    {
      id: "node-4",
      title: "LLM Fine-tuning Methods",
      type: "research",
      sources: 15,
      connections: 10,
      lastUpdated: "5 hours ago",
    },
    {
      id: "node-5",
      title: "Prompt Engineering Dataset",
      type: "dataset",
      sources: 1,
      connections: 4,
      lastUpdated: "1 week ago",
    },
    {
      id: "node-6",
      title: "Academic Paper: 'Improving Chain of Thought'",
      type: "document",
      sources: 1,
      connections: 3,
      lastUpdated: "2 days ago",
    },
    {
      id: "node-7",
      title: "Web Resource: OpenAI Documentation",
      type: "web",
      sources: 1,
      connections: 2,
      lastUpdated: "4 days ago",
    },
  ]

  // Filter nodes based on search query and type filter
  const filteredNodes = knowledgeNodes.filter((node) => {
    const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || node.type === filterType
    return matchesSearch && matchesType
  })

  // Get icon for node type
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <Lightbulb className="h-5 w-5 text-amber-500" />
      case "research":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "dataset":
        return <Database className="h-5 w-5 text-green-500" />
      case "document":
        return <Book className="h-5 w-5 text-purple-500" />
      case "web":
        return <Globe className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-slate-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Explorer</h1>
          <p className="text-muted-foreground">Explore and visualize research knowledge</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Knowledge
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search knowledge graph..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="concept">Concepts</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="dataset">Datasets</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="web">Web Resources</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="graph" className="space-y-4">
        <TabsList>
          <TabsTrigger value="graph">Graph View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="graph">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Knowledge Graph</CardTitle>
              <CardDescription>Interactive visualization of knowledge connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full bg-slate-50 rounded-md border p-4 flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Knowledge Graph Visualization</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This area would display an interactive network graph showing knowledge nodes and their connections.
                    Nodes would be color-coded by type and sized by importance.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-amber-500 mr-1"></span>
                  <span>Concepts</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
                  <span>Research</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
                  <span>Datasets</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-purple-500 mr-1"></span>
                  <span>Documents</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-1"></span>
                  <span>Web Resources</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Nodes</CardTitle>
              <CardDescription>List of all knowledge nodes in the graph</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 text-sm font-medium border-b bg-slate-50">
                  <div className="col-span-5">Title</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Sources</div>
                  <div className="col-span-2">Connections</div>
                  <div className="col-span-1">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredNodes.map((node) => (
                    <div
                      key={node.id}
                      className={`grid grid-cols-12 p-3 text-sm items-center cursor-pointer hover:bg-accent ${
                        selectedNode === node.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedNode(node.id)}
                    >
                      <div className="col-span-5 flex items-center">
                        {getNodeIcon(node.type)}
                        <span className="ml-2 font-medium">{node.title}</span>
                      </div>
                      <div className="col-span-2">
                        <Badge
                          variant="outline"
                          className={
                            node.type === "concept"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : node.type === "research"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : node.type === "dataset"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : node.type === "document"
                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-muted-foreground">{node.sources}</div>
                      <div className="col-span-2 text-muted-foreground">{node.connections}</div>
                      <div className="col-span-1">
                        <Button variant="ghost" size="sm">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Connections</CardTitle>
              <CardDescription>Relationships between knowledge nodes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-medium">Prompt Engineering Techniques</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      <span>Supports</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Chain of Thought Reasoning</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span>Uses</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Prompt Engineering Dataset</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                      <span>References</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Academic Paper: 'Improving Chain of Thought'</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-medium">Chain of Thought Reasoning</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      <span>Related to</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Retrieval Augmented Generation</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      <span>Documented in</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Web Resource: OpenAI Documentation</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium">LLM Fine-tuning Methods</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                      <span>Improves</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Prompt Engineering Techniques</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                      <span>Enhances</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">Retrieval Augmented Generation</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
