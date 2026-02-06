"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Save, Copy, RotateCcw, AlertCircle, CheckCircle } from "lucide-react"

export default function TestCentre() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState("gpt-4o")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Example result
      const sampleResult = `Here's a sample response to your prompt. This would be the actual output from the AI model you selected (${model}).

The response would reflect the temperature setting (${temperature}) you chose, with higher values producing more creative and varied outputs.

This test center allows you to:
1. Try different prompts
2. Test with various models
3. Adjust parameters like temperature and max tokens
4. Compare results across different configurations

You can save effective prompts to your database for future use.`

      setResult(sampleResult)
    } catch (err) {
      setError("Failed to generate response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPrompt("")
    setResult(null)
    setError(null)
    setModel("gpt-4o")
    setTemperature(0.7)
    setMaxTokens(1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Centre</h1>
          <p className="text-muted-foreground">Test and refine your prompts with different models</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
              <CardDescription>Enter your prompt to test</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt-input">Prompt</Label>
                  <Textarea
                    id="prompt-input"
                    placeholder="Enter your prompt here..."
                    rows={8}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-select">Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="model-select">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="advanced-settings" className="cursor-pointer">
                    Advanced Settings
                  </Label>
                  <Switch id="advanced-settings" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                </div>

                {showAdvanced && (
                  <div className="space-y-4 pt-2 border-t">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="temperature">Temperature: {temperature}</Label>
                      </div>
                      <Slider
                        id="temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[temperature]}
                        onValueChange={(value) => setTemperature(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Lower values produce more predictable outputs, higher values more creative ones.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
                      </div>
                      <Slider
                        id="max-tokens"
                        min={100}
                        max={4000}
                        step={100}
                        value={[maxTokens]}
                        onValueChange={(value) => setMaxTokens(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">Maximum length of the generated response.</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading || !prompt.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Prompt"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Prompts</CardTitle>
              <CardDescription>Load a previously saved prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setPrompt(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a saved prompt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="You are a professional content writer. Write a blog post about [TOPIC] that includes at least 5 key points, each with a brief explanation. The tone should be informative but conversational.">
                    Blog Post Generator
                  </SelectItem>
                  <SelectItem value="You are a marketing expert. Create 5 social media posts for [PRODUCT] highlighting its key benefits. Each post should be under 280 characters and include a call to action.">
                    Social Media Campaign
                  </SelectItem>
                  <SelectItem value="You are a technical documentation writer. Create a step-by-step guide for [PROCESS] that is clear, concise, and easy to follow. Include any prerequisites and potential troubleshooting tips.">
                    Technical Guide Template
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Output from the model</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin mb-4" />
                  <p>Generating response...</p>
                </div>
              ) : result ? (
                <div className="bg-slate-50 p-4 rounded-md h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-muted-foreground">Test your prompt to see the result here</p>
                </div>
              )}
            </CardContent>
            {result && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(result)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Result
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Prompt
                </Button>
              </CardFooter>
            )}
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && !error && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Prompt tested successfully with {model}.</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
