"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Upload, LinkIcon, FileText, ImageIcon, AlertCircle, CheckCircle } from "lucide-react"

export default function ReverseEngineering() {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)
  const [inputText, setInputText] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setGeneratedPrompt(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Example generated prompt
      const prompt = `You are an expert content writer. Write a comprehensive article about ${inputText.includes("climate") ? "climate change" : "technology trends"} that covers the following points:
1. Current state and recent developments
2. Key challenges and opportunities
3. Future predictions and their implications
4. Actionable insights for readers

Use a professional tone, include relevant statistics, and structure the article with clear headings and subheadings.`

      setGeneratedPrompt(prompt)
      setSuccess(true)
    } catch (err) {
      setError("Failed to generate prompt. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputUrl.trim()) return

    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setGeneratedPrompt(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Example generated prompt
      const prompt = `You are a web content analyzer. Analyze the content from the website ${inputUrl} and provide:
1. A summary of the main topics and themes
2. The target audience and their needs
3. The key value propositions presented
4. Suggestions for improving the content's clarity and persuasiveness

Format your response as a structured report with clear sections and bullet points where appropriate.`

      setGeneratedPrompt(prompt)
      setSuccess(true)
    } catch (err) {
      setError("Failed to generate prompt. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const saveToDatabase = async () => {
    if (!generatedPrompt) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (err) {
      setError("Failed to save prompt to database.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reverse Engineering</h1>
          <p className="text-muted-foreground">Generate prompts from existing content</p>
        </div>
      </div>

      <Tabs defaultValue="text" className="space-y-4">
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="file">File</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text to Prompt</CardTitle>
              <CardDescription>
                Paste text content to generate a prompt that could create similar output
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleTextSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text Content</Label>
                  <Textarea
                    id="text-input"
                    placeholder="Paste the text content here..."
                    rows={8}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="resize-none"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setInputText("")}>
                  Clear
                </Button>
                <Button type="submit" disabled={isLoading || !inputText.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Prompt"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>URL to Prompt</CardTitle>
              <CardDescription>Enter a URL to analyze its content and generate a prompt</CardDescription>
            </CardHeader>
            <form onSubmit={handleUrlSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url-input">Website URL</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="url-input"
                        type="url"
                        placeholder="https://example.com"
                        className="pl-8"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading || !inputUrl.trim()}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image to Prompt</CardTitle>
              <CardDescription>Upload an image to generate a prompt that could create similar content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload an image</h3>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>File to Prompt</CardTitle>
              <CardDescription>
                Upload a document to generate a prompt that could create similar content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <div className="flex flex-col items-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload a document</h3>
                  <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOCX, TXT, and MD files</p>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Prompt</CardTitle>
            <CardDescription>This prompt was reverse engineered from your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{generatedPrompt}</pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(generatedPrompt)}>
              Copy to Clipboard
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={saveToDatabase} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save to Database"}
              </Button>
              <Button onClick={() => (window.location.href = "/test-centre")}>Test Prompt</Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            {generatedPrompt ? "Prompt successfully generated." : "Prompt saved to database."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
