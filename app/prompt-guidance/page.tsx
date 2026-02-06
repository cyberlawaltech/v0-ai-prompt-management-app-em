"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Lightbulb, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"

export default function PromptGuidance() {
  const [selectedTip, setSelectedTip] = useState<string | null>(null)

  const tips = [
    {
      id: "clarity",
      title: "Clarity and Specificity",
      description: "Be clear and specific in your prompts",
      content:
        "Effective prompts are clear, specific, and unambiguous. Avoid vague instructions and provide concrete details about what you want. The more specific your prompt, the more likely you are to get the desired output from the AI.",
      icon: Lightbulb,
    },
    {
      id: "structure",
      title: "Structured Format",
      description: "Use a consistent structure for complex prompts",
      content:
        "For complex tasks, structure your prompts with clear sections: context, instruction, examples, format requirements, and constraints. This helps the AI understand exactly what you need and how to deliver it in the most useful way.",
      icon: Info,
    },
    {
      id: "iteration",
      title: "Iterative Refinement",
      description: "Refine prompts based on results",
      content:
        "Prompt engineering is an iterative process. Start with a basic prompt, evaluate the results, and refine your prompt based on what worked and what didn't. Keep track of your changes to understand what improvements were most effective.",
      icon: AlertTriangle,
    },
    {
      id: "consistency",
      title: "Consistency",
      description: "Maintain consistent language and terminology",
      content:
        "Use consistent language, terminology, and formatting throughout your prompts. This helps the AI understand your requirements better and produces more consistent results across multiple generations.",
      icon: CheckCircle,
    },
    {
      id: "examples",
      title: "Few-Shot Learning",
      description: "Include examples for better results",
      content:
        "Provide examples of the input and desired output to guide the AI. This technique, known as few-shot learning, helps the model understand the pattern you want it to follow and significantly improves the quality of results.",
      icon: HelpCircle,
    },
  ]

  const examples = [
    {
      id: "prompt-structure",
      title: "Prompt Structure",
      description: "How to structure prompts for better results",
      content: (
        <div className="space-y-4">
          <p>A well-structured prompt typically includes:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Context:</strong> Background information the AI needs
            </li>
            <li>
              <strong>Instruction:</strong> What you want the AI to do
            </li>
            <li>
              <strong>Examples:</strong> Sample inputs and outputs (few-shot learning)
            </li>
            <li>
              <strong>Format:</strong> How you want the response structured
            </li>
            <li>
              <strong>Constraints:</strong> Any limitations or requirements
            </li>
          </ol>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Example</AlertTitle>
            <AlertDescription>
              <pre className="mt-2 whitespace-pre-wrap text-sm bg-slate-100 p-2 rounded-md">
                {`Context: You are helping a marketing team create social media content.
Instruction: Write 3 engaging Twitter posts about our new eco-friendly product line.
Examples: 
- "🌱 Our new bamboo toothbrushes are here! Save the planet one brush at a time. #EcoFriendly"
Format: Each post should be under 280 characters and include at least one emoji and hashtag.
Constraints: Don't mention competitors. Focus on sustainability benefits.`}
              </pre>
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      id: "chain-of-thought",
      title: "Chain of Thought",
      description: "Prompting techniques for complex reasoning",
      content: (
        <div className="space-y-4">
          <p>Chain of Thought (CoT) prompting improves complex reasoning by asking the AI to show its work:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ask the AI to "think step by step" before providing an answer</li>
            <li>Provide examples that demonstrate the reasoning process</li>
            <li>Break down complex problems into smaller, manageable steps</li>
            <li>Use this technique for math problems, logical reasoning, and complex decisions</li>
          </ul>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Example</AlertTitle>
            <AlertDescription>
              <pre className="mt-2 whitespace-pre-wrap text-sm bg-slate-100 p-2 rounded-md">
                {`Instruction: Solve this math problem step by step.
Problem: If a store offers a 25% discount on a $120 item, and then applies a 10% coupon on the discounted price, what is the final price including 8% sales tax?
Think through this step by step to find the answer.`}
              </pre>
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      id: "role-prompting",
      title: "Role Prompting",
      description: "Assigning roles for specialized responses",
      content: (
        <div className="space-y-4">
          <p>Role prompting involves asking the AI to assume a specific role or persona:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Define a specific role with relevant expertise (e.g., "You are an expert physicist")</li>
            <li>Provide context about the role's knowledge and perspective</li>
            <li>Frame your request in terms of what you'd ask that expert</li>
            <li>Use role prompting to get specialized, domain-specific responses</li>
          </ul>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Best Practice</AlertTitle>
            <AlertDescription>
              Be specific about the expertise level and perspective you want. "You are a senior software engineer with
              15 years of experience in Python" will yield better results than simply "You are a programmer."
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Prompt Guidance</h1>
      </div>

      <Tabs defaultValue="principles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="principles">Prompting Principles</TabsTrigger>
          <TabsTrigger value="examples">Prompt Examples</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="principles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              {tips.map((tip) => (
                <Card
                  key={tip.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTip === tip.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTip(tip.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <tip.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {selectedTip ? tips.find((t) => t.id === selectedTip)?.title : "Select a principle"}
                  </CardTitle>
                  <CardDescription>
                    {selectedTip
                      ? tips.find((t) => t.id === selectedTip)?.description
                      : "Click on a prompting principle to see details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedTip ? (
                    <div className="space-y-4">
                      <p>{tips.find((t) => t.id === selectedTip)?.content}</p>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Pro Tip</AlertTitle>
                        <AlertDescription>
                          The best prompts evolve through testing and refinement. Keep a record of your prompts and
                          their results to build a library of effective techniques for different use cases.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                      <HelpCircle className="h-12 w-12 mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Select a Prompting Principle</h3>
                      <p className="text-muted-foreground">
                        Click on one of the principles on the left to view detailed information and examples.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <Accordion type="single" collapsible className="w-full">
            {examples.map((example) => (
              <AccordionItem key={example.id} value={example.id}>
                <AccordionTrigger>
                  <div>
                    <h3 className="text-lg font-medium">{example.title}</h3>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">{example.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Helpful resources for learning more about prompt engineering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Prompt Engineering Resources</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Prompt Engineering Guide</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive guide to prompt engineering</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Learn Prompting</h4>
                      <p className="text-sm text-muted-foreground">Free course on prompt engineering</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">OpenAI Cookbook</h4>
                      <p className="text-sm text-muted-foreground">Examples and guides for GPT models</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Anthropic's Prompt Engineering Guide</h4>
                      <p className="text-sm text-muted-foreground">Best practices for Claude models</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Dair.ai Prompt Engineering Guide</h4>
                      <p className="text-sm text-muted-foreground">Research-focused prompt engineering techniques</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Awesome Prompt Engineering</h4>
                      <p className="text-sm text-muted-foreground">Curated list of prompt engineering resources</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Research Papers</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Chain-of-Thought Prompting</h4>
                      <p className="text-sm text-muted-foreground">
                        Research on improving reasoning in language models
                      </p>
                      <Button variant="link" className="px-0">
                        Read Paper
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">ReAct: Reasoning and Acting</h4>
                      <p className="text-sm text-muted-foreground">Framework for reasoning and action in LLMs</p>
                      <Button variant="link" className="px-0">
                        Read Paper
                      </Button>
                    </Card>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
