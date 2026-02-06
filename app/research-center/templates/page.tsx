"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, ArrowRight, Check, Star, Clock, Download } from "lucide-react"

export default function ResearchTemplates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Sample templates
  const templates = [
    {
      id: "template-1",
      title: "Comprehensive Literature Review",
      description: "Structured template for conducting thorough literature reviews on research topics",
      category: "Academic",
      popularity: 4.8,
      usageCount: 245,
      lastUsed: "2 hours ago",
      steps: [
        "Define research question and scope",
        "Identify relevant databases and search terms",
        "Screen and select papers based on criteria",
        "Extract and analyze key findings",
        "Synthesize information and identify gaps",
        "Document methodology and results",
      ],
      agentRoles: ["Lead Researcher", "Literature Reviewer", "Data Analyst"],
    },
    {
      id: "template-2",
      title: "Prompt Engineering Analysis",
      description: "Template for analyzing and optimizing prompt engineering techniques",
      category: "AI Development",
      popularity: 4.6,
      usageCount: 189,
      lastUsed: "1 day ago",
      steps: [
        "Define prompt engineering objectives",
        "Collect baseline prompts and results",
        "Analyze prompt structures and patterns",
        "Test variations and document outcomes",
        "Measure performance improvements",
        "Create optimization guidelines",
      ],
      agentRoles: ["Lead Researcher", "Data Analyst", "Code Tester"],
    },
    {
      id: "template-3",
      title: "Model Comparison Framework",
      description: "Structured approach to comparing different AI models on specific tasks",
      category: "AI Development",
      popularity: 4.7,
      usageCount: 156,
      lastUsed: "3 days ago",
      steps: [
        "Define evaluation criteria and metrics",
        "Select benchmark datasets",
        "Configure models with comparable parameters",
        "Run standardized tests across models",
        "Analyze performance differences",
        "Document strengths and weaknesses",
      ],
      agentRoles: ["Lead Researcher", "Data Analyst", "Code Tester"],
    },
    {
      id: "template-4",
      title: "Domain Adaptation Research",
      description: "Template for researching how to adapt models to specific domains",
      category: "AI Development",
      popularity: 4.5,
      usageCount: 112,
      lastUsed: "1 week ago",
      steps: [
        "Identify domain-specific requirements",
        "Analyze domain data characteristics",
        "Evaluate baseline model performance",
        "Test adaptation techniques",
        "Measure improvements in domain-specific tasks",
        "Document adaptation methodology",
      ],
      agentRoles: ["Lead Researcher", "Data Analyst", "Domain Expert"],
    },
    {
      id: "template-5",
      title: "Ethical AI Assessment",
      description: "Framework for evaluating ethical implications of AI systems",
      category: "Ethics",
      popularity: 4.9,
      usageCount: 203,
      lastUsed: "5 days ago",
      steps: [
        "Define ethical principles and concerns",
        "Identify potential biases and harms",
        "Test system across diverse scenarios",
        "Analyze fairness and transparency",
        "Document ethical considerations",
        "Propose mitigation strategies",
      ],
      agentRoles: ["Lead Researcher", "Ethics Specialist", "Data Analyst"],
    },
  ]

  // Filter templates based on search query
  const filteredTemplates = templates.filter((template) => {
    return (
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Research Templates</h1>
          <p className="text-muted-foreground">Pre-defined structures for research projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="ai">AI Development</TabsTrigger>
          <TabsTrigger value="ethics">Ethics</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{template.popularity}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{template.lastUsed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedTemplate ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{templates.find((t) => t.id === selectedTemplate)?.title}</CardTitle>
                        <CardDescription>
                          {templates.find((t) => t.id === selectedTemplate)?.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{templates.find((t) => t.id === selectedTemplate)?.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Research Process</h3>
                      <div className="space-y-3">
                        {templates
                          .find((t) => t.id === selectedTemplate)
                          ?.steps.map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mr-3 shrink-0">
                                {index + 1}
                              </div>
                              <div className="pt-0.5">{step}</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-3">Agent Roles</h3>
                      <div className="space-y-3">
                        {templates
                          .find((t) => t.id === selectedTemplate)
                          ?.agentRoles.map((role, index) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-5 w-5 text-green-500 mr-2" />
                              <span>{role}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-3">Template Statistics</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Rating</div>
                          <div className="text-xl font-bold flex items-center">
                            {templates.find((t) => t.id === selectedTemplate)?.popularity}
                            <Star className="ml-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                          </div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Usage Count</div>
                          <div className="text-xl font-bold">
                            {templates.find((t) => t.id === selectedTemplate)?.usageCount}
                          </div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-md">
                          <div className="text-sm text-muted-foreground">Last Used</div>
                          <div className="text-xl font-bold">
                            {templates.find((t) => t.id === selectedTemplate)?.lastUsed}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t flex justify-between">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Template
                    </Button>
                    <Button>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a Template</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a research template from the list to view its details and structure
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {filteredTemplates
                .filter((template) => template.category === "Academic")
                .map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{template.popularity}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{template.lastUsed}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="lg:col-span-2">
              {selectedTemplate ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{templates.find((t) => t.id === selectedTemplate)?.title}</CardTitle>
                        <CardDescription>
                          {templates.find((t) => t.id === selectedTemplate)?.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{templates.find((t) => t.id === selectedTemplate)?.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">{/* Same content as in the "all" tab */}</CardContent>
                  <CardFooter className="border-t flex justify-between">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Template
                    </Button>
                    <Button>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a Template</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a research template from the list to view its details and structure
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {filteredTemplates
                .filter((template) => template.category === "AI Development")
                .map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{template.popularity}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{template.lastUsed}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="lg:col-span-2">
              {selectedTemplate ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{templates.find((t) => t.id === selectedTemplate)?.title}</CardTitle>
                        <CardDescription>
                          {templates.find((t) => t.id === selectedTemplate)?.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{templates.find((t) => t.id === selectedTemplate)?.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">{/* Same content as in the "all" tab */}</CardContent>
                  <CardFooter className="border-t flex justify-between">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Template
                    </Button>
                    <Button>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a Template</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a research template from the list to view its details and structure
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ethics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {filteredTemplates
                .filter((template) => template.category === "Ethics")
                .map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{template.popularity}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{template.lastUsed}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="lg:col-span-2">
              {selectedTemplate ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{templates.find((t) => t.id === selectedTemplate)?.title}</CardTitle>
                        <CardDescription>
                          {templates.find((t) => t.id === selectedTemplate)?.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{templates.find((t) => t.id === selectedTemplate)?.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">{/* Same content as in the "all" tab */}</CardContent>
                  <CardFooter className="border-t flex justify-between">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Template
                    </Button>
                    <Button>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Select a Template</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a research template from the list to view its details and structure
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
