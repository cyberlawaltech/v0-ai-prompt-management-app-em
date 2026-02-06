"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Copy, Star, ArrowUpDown } from "lucide-react"

// Generate a large number of sample prompts
const generatePrompts = (count: number) => {
  const categories = ["Marketing", "Development", "Customer Support", "Design", "Writing", "SEO"]
  const prompts = []

  for (let i = 1; i <= count; i++) {
    prompts.push({
      id: i,
      title: `Sample Prompt ${i}`,
      description: `This is a description for sample prompt ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      rating: (3 + Math.random() * 2).toFixed(1),
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toLocaleDateString(),
    })
  }

  return prompts
}

const samplePrompts = generatePrompts(100)

export default function PromptDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPrompts = samplePrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? prompt.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(samplePrompts.map((p) => p.category)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Prompt Database</h1>
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search prompts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
                </div>
                <Badge variant="outline">{prompt.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{prompt.rating}</span>
                </div>
                <span className="text-muted-foreground">{prompt.date}</span>
                <Button size="sm" variant="ghost">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
