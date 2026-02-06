"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  logo: string
  connected: boolean
}

export default function Integrations() {
  const integrations: Integration[] = [
    {
      id: "1",
      name: "OpenAI",
      description: "Connect to OpenAI's GPT models",
      category: "AI",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
    },
    {
      id: "2",
      name: "Anthropic",
      description: "Connect to Anthropic's Claude models",
      category: "AI",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
    {
      id: "3",
      name: "Hugging Face",
      description: "Access thousands of open-source models",
      category: "AI",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
    {
      id: "4",
      name: "Pinecone",
      description: "Vector database for embeddings",
      category: "Database",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
    },
    {
      id: "5",
      name: "Supabase",
      description: "Open source Firebase alternative",
      category: "Database",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
    {
      id: "6",
      name: "GitHub",
      description: "Connect to your GitHub repositories",
      category: "Development",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
    },
    {
      id: "7",
      name: "Slack",
      description: "Send prompts and results to Slack",
      category: "Communication",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
    {
      id: "8",
      name: "Discord",
      description: "Integrate with Discord channels",
      category: "Communication",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
    },
    {
      id: "9",
      name: "Notion",
      description: "Save prompts and results to Notion",
      category: "Productivity",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
    {
      id: "10",
      name: "Google Drive",
      description: "Store and retrieve files from Google Drive",
      category: "Storage",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
    },
    {
      id: "11",
      name: "Zapier",
      description: "Connect to thousands of apps",
      category: "Automation",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
    {
      id: "12",
      name: "Make.com",
      description: "Create complex automation workflows",
      category: "Automation",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
    },
  ]

  const categories = Array.from(new Set(integrations.map((i) => i.category)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Integrations</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search integrations..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
          <TabsTrigger value="connected">Connected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                        <img src={integration.logo || "/placeholder.svg"} alt={integration.name} className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{integration.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant={integration.connected ? "outline" : "default"}>
                    {integration.connected ? "Disconnect" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations
                .filter((i) => i.category === category)
                .map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                            <img
                              src={integration.logo || "/placeholder.svg"}
                              alt={integration.name}
                              className="w-8 h-8"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <CardDescription>{integration.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{integration.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant={integration.connected ? "outline" : "default"}>
                        {integration.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}

        <TabsContent value="connected">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((i) => i.connected)
              .map((integration) => (
                <Card key={integration.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                          <img
                            src={integration.logo || "/placeholder.svg"}
                            alt={integration.name}
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription>{integration.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{integration.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Disconnect
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
