"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Wand2, FileText, Bot, Lightbulb, Target, Users, Zap } from "lucide-react"

interface CreatePromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePromptDialog({ open, onOpenChange }: CreatePromptDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    tags: "",
    difficulty: "beginner",
    useCase: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const categories = [
    { value: "customer-service", label: "Customer Service", icon: Users },
    { value: "content-creation", label: "Content Creation", icon: FileText },
    { value: "data-analysis", label: "Data Analysis", icon: Target },
    { value: "creative-writing", label: "Creative Writing", icon: Lightbulb },
    { value: "technical", label: "Technical", icon: Bot },
    { value: "marketing", label: "Marketing", icon: Zap },
  ]

  const templates = [
    {
      title: "Customer Support Agent",
      description: "Professional customer service responses with empathy",
      content:
        "You are a helpful customer service representative. Always respond with empathy and provide clear solutions. When a customer has an issue:\n\n1. Acknowledge their concern\n2. Apologize for any inconvenience\n3. Provide a clear solution or next steps\n4. Ask if there's anything else you can help with\n\nTone: Professional, empathetic, solution-focused",
      category: "customer-service",
      tags: "support, customer-service, empathy",
    },
    {
      title: "Content Creator Assistant",
      description: "Generate engaging content for various platforms",
      content:
        "You are a creative content creator specializing in engaging, platform-appropriate content. For each request:\n\n1. Consider the target audience\n2. Match the platform's tone and style\n3. Include relevant hashtags or keywords\n4. Ensure content is engaging and shareable\n\nFocus on: Creativity, engagement, brand consistency",
      category: "content-creation",
      tags: "content, social-media, creativity",
    },
    {
      title: "Data Analysis Expert",
      description: "Analyze data and provide actionable insights",
      content:
        "You are a data analysis expert who transforms complex data into clear, actionable insights. When analyzing data:\n\n1. Identify key patterns and trends\n2. Highlight significant findings\n3. Provide context and implications\n4. Suggest actionable recommendations\n\nApproach: Analytical, clear, insight-driven",
      category: "data-analysis",
      tags: "data, analysis, insights",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsGenerating(false)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      content: "",
      tags: "",
      difficulty: "beginner",
      useCase: "",
    })
  }

  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setFormData({
      ...formData,
      title: template.title,
      description: template.description,
      content: template.content,
      category: template.category,
      tags: template.tags,
    })
  }

  const generateWithAI = async () => {
    setIsGenerating(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const aiGeneratedContent = `You are an AI assistant specialized in ${formData.category || "general tasks"}. Your role is to ${formData.description || "help users accomplish their goals"}.

Key responsibilities:
1. Understand user requirements clearly
2. Provide accurate and helpful responses
3. Maintain a professional and friendly tone
4. Offer additional assistance when appropriate

Guidelines:
- Be concise but comprehensive
- Use examples when helpful
- Ask clarifying questions if needed
- Provide step-by-step guidance when applicable

Remember to always prioritize user satisfaction and provide value in every interaction.`

    setFormData({
      ...formData,
      content: aiGeneratedContent,
    })

    setIsGenerating(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            Create New Prompt
          </DialogTitle>
          <DialogDescription>Create a new AI prompt template or choose from our curated collection</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Custom</TabsTrigger>
            <TabsTrigger value="templates">Use Template</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Prompt Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Customer Service Assistant"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center">
                              <Icon className="mr-2 h-4 w-4" />
                              {category.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of what this prompt does"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Prompt Content</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateWithAI}
                    disabled={isGenerating || !formData.description}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
                <Textarea
                  id="content"
                  placeholder="Enter your prompt content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Be specific about the AI's role, tone, and expected output format
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., customer-service, support, empathy"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Input
                  id="useCase"
                  placeholder="e.g., Handle customer complaints and provide solutions"
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Create Prompt
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template, index) => {
                const category = categories.find((c) => c.value === template.category)
                const Icon = category?.icon || FileText

                return (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base">
                        <Icon className="mr-2 h-4 w-4 text-primary" />
                        {template.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {category?.label}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {template.tags.split(", ").map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button size="sm" className="w-full" onClick={() => handleTemplateSelect(template)}>
                          Use This Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
