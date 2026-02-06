"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Lightbulb, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"

export default function UIGuidance() {
  const [selectedTip, setSelectedTip] = useState<string | null>(null)

  const tips = [
    {
      id: "clarity",
      title: "Clarity and Simplicity",
      description: "Keep UI elements clear and simple to reduce cognitive load",
      content:
        "Users should be able to understand your interface at a glance. Use clear labels, consistent patterns, and remove unnecessary elements. Remember that every additional element adds cognitive load for the user.",
      icon: Lightbulb,
    },
    {
      id: "hierarchy",
      title: "Visual Hierarchy",
      description: "Guide users' attention to the most important elements first",
      content:
        "Create a clear visual hierarchy using size, color, contrast, and spacing. Important elements should be more prominent, while secondary elements should be visually subdued. This helps users navigate your interface intuitively.",
      icon: Info,
    },
    {
      id: "feedback",
      title: "Provide Feedback",
      description: "Always let users know what's happening in the system",
      content:
        "Users should always know what's happening when they interact with your interface. Use loading states, success/error messages, and subtle animations to provide feedback. This builds trust and reduces uncertainty.",
      icon: AlertTriangle,
    },
    {
      id: "consistency",
      title: "Consistency",
      description: "Maintain consistent patterns throughout your interface",
      content:
        "Consistency in design patterns, interaction behaviors, and visual elements helps users learn your interface faster. Once a user learns how something works in one part of your app, they should be able to apply that knowledge elsewhere.",
      icon: CheckCircle,
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description: "Design for users of all abilities",
      content:
        "Ensure your interface is usable by people with diverse abilities. Use sufficient color contrast, provide text alternatives for images, ensure keyboard navigability, and test with screen readers. Accessible design benefits everyone.",
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
      id: "ui-elements",
      title: "UI Elements",
      description: "Best practices for common UI elements",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Buttons</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Make buttons look clickable with visual affordances</li>
            <li>Use clear, action-oriented labels (e.g., "Save Changes" instead of "Submit")</li>
            <li>Position primary actions prominently</li>
            <li>Maintain adequate spacing between multiple buttons</li>
          </ul>

          <h3 className="text-lg font-medium">Forms</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Group related fields together</li>
            <li>Use clear labels positioned above input fields</li>
            <li>Provide helpful placeholder text and validation messages</li>
            <li>Indicate required fields consistently</li>
          </ul>

          <h3 className="text-lg font-medium">Navigation</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Keep navigation consistent across all pages</li>
            <li>Highlight the current section/page</li>
            <li>Use breadcrumbs for complex hierarchies</li>
            <li>Ensure navigation is accessible via keyboard</li>
          </ul>
        </div>
      ),
    },
    {
      id: "color-typography",
      title: "Color & Typography",
      description: "Guidelines for effective use of color and text",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use a limited color palette (3-5 colors plus shades)</li>
            <li>Ensure sufficient contrast (4.5:1 minimum for normal text)</li>
            <li>Don't rely on color alone to convey information</li>
            <li>Use color consistently to reinforce meaning</li>
          </ul>

          <h3 className="text-lg font-medium">Typography</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Limit to 2-3 font families maximum</li>
            <li>Use a clear hierarchy with different sizes and weights</li>
            <li>Ensure adequate line height (1.5 for body text)</li>
            <li>Maintain comfortable line length (50-75 characters)</li>
            <li>Use left-aligned text for most content</li>
          </ul>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Common Mistake</AlertTitle>
            <AlertDescription>
              Using too many colors or fonts creates visual noise and makes interfaces harder to understand. Simplicity
              and consistency are key.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">UI Guidance</h1>
      </div>

      <Tabs defaultValue="principles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="principles">Design Principles</TabsTrigger>
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
                      : "Click on a design principle to see details"}
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
                          When designing prompts, apply these same principles. Clear structure, visual hierarchy, and
                          feedback are just as important in prompt design as they are in UI design.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                      <HelpCircle className="h-12 w-12 mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Select a Design Principle</h3>
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
              <CardDescription>
                Helpful resources for learning more about UI design and prompt engineering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">UI Design Resources</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Nielsen Norman Group</h4>
                      <p className="text-sm text-muted-foreground">Research-based UX guidance</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Refactoring UI</h4>
                      <p className="text-sm text-muted-foreground">Practical UI design tips</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Laws of UX</h4>
                      <p className="text-sm text-muted-foreground">Psychology principles in design</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                  <li>
                    <Card className="p-4">
                      <h4 className="font-medium">Material Design</h4>
                      <p className="text-sm text-muted-foreground">Google's design system</p>
                      <Button variant="link" className="px-0">
                        Visit Website
                      </Button>
                    </Card>
                  </li>
                </ul>
              </div>

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
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
