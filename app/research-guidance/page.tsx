"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Bot,
  FileText,
  Lightbulb,
  Search,
  Filter,
  Brain,
  Microscope,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Share2,
  Bookmark,
  Zap,
  MessageSquare,
  TestTube,
  Settings,
  Play,
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  Code,
  Database,
  GitBranch,
  Layers,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"
import { TTSControls } from "@/components/tts-controls"

const promptEngineeringMethodologies = [
  {
    id: "iterative-refinement",
    title: "Iterative Prompt Refinement",
    description: "Systematically improve prompts through testing and iteration using our Test Center",
    category: "Optimization",
    difficulty: "Beginner",
    duration: "1-2 hours",
    icon: GitBranch,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    appFeatures: ["Test Centre", "Prompt Database", "Version Control"],
    steps: [
      "Start with a basic prompt in the Prompt Database",
      "Run initial tests in the Test Centre with sample inputs",
      "Analyze results and identify improvement areas",
      "Create prompt variations using our templates",
      "A/B test different versions systematically",
      "Document successful patterns for reuse",
    ],
    practicalExample: {
      scenario: "Creating a customer service response prompt",
      initialPrompt: "Help the customer with their issue.",
      refinedPrompt:
        "You are a helpful customer service representative. Analyze the customer's issue, show empathy, provide a clear solution, and offer follow-up assistance. Use a professional yet friendly tone.",
      improvements: ["Added role definition", "Specified response structure", "Defined tone requirements"],
    },
    tools: ["Test Centre", "Prompt Templates", "Analytics Dashboard"],
    bestPractices: [
      "Test with diverse input scenarios",
      "Track performance metrics consistently",
      "Version control all prompt iterations",
      "Document what works and what doesn't",
    ],
  },
  {
    id: "agent-orchestration",
    title: "Multi-Agent Prompt Orchestration",
    description: "Design complex workflows using multiple specialized agents for sophisticated tasks",
    category: "Advanced Workflows",
    difficulty: "Advanced",
    duration: "4-8 hours",
    icon: Bot,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    appFeatures: ["Create Agent", "Research Center", "Communication Logs"],
    steps: [
      "Define the complex task and break it into subtasks",
      "Create specialized agents for each subtask",
      "Design the communication flow between agents",
      "Set up orchestration logic in Research Center",
      "Test agent interactions and handoffs",
      "Monitor and optimize the workflow",
    ],
    practicalExample: {
      scenario: "Content creation pipeline",
      agents: [
        "Research Agent: Gathers information and sources",
        "Writing Agent: Creates initial content draft",
        "Editor Agent: Reviews and improves content",
        "SEO Agent: Optimizes for search engines",
      ],
      workflow: "Research → Draft → Edit → Optimize → Final Review",
    },
    tools: ["Agent Creator", "Workflow Designer", "Communication Logs"],
    bestPractices: [
      "Keep agent responsibilities clearly defined",
      "Design robust error handling between agents",
      "Monitor agent communication patterns",
      "Optimize handoff points for efficiency",
    ],
  },
  {
    id: "context-engineering",
    title: "Context-Aware Prompt Engineering",
    description: "Leverage dynamic context and knowledge base integration for adaptive prompts",
    category: "Context Management",
    difficulty: "Intermediate",
    duration: "2-4 hours",
    icon: Database,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    appFeatures: ["Knowledge Base", "File Manager", "Dynamic Context"],
    steps: [
      "Identify context requirements for your use case",
      "Organize relevant knowledge in the Knowledge Base",
      "Design context injection strategies",
      "Create dynamic prompt templates",
      "Test context relevance and accuracy",
      "Implement context optimization rules",
    ],
    practicalExample: {
      scenario: "Technical documentation assistant",
      contextSources: ["API documentation", "Code examples", "User guides", "FAQ database"],
      dynamicElements: ["User role", "Technical level", "Specific product version"],
      adaptiveResponse: "Adjusts explanation depth and examples based on user context",
    },
    tools: ["Knowledge Base", "Context Manager", "Template Engine"],
    bestPractices: [
      "Keep context relevant and focused",
      "Implement context freshness checks",
      "Balance context depth with response speed",
      "Test with various context combinations",
    ],
  },
  {
    id: "performance-optimization",
    title: "Prompt Performance Optimization",
    description: "Optimize prompts for speed, accuracy, and cost-effectiveness using analytics",
    category: "Performance",
    difficulty: "Intermediate",
    duration: "3-6 hours",
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    appFeatures: ["Analytics Dashboard", "Test Centre", "Performance Metrics"],
    steps: [
      "Establish baseline performance metrics",
      "Identify optimization opportunities",
      "Implement prompt compression techniques",
      "Test response quality vs. efficiency trade-offs",
      "Monitor real-world performance",
      "Continuously refine based on data",
    ],
    practicalExample: {
      scenario: "High-volume customer query processing",
      metrics: ["Response time", "Accuracy rate", "Token usage", "User satisfaction"],
      optimizations: ["Shorter prompts", "Better examples", "Structured outputs"],
      results: "40% faster responses, 25% lower costs, maintained accuracy",
    },
    tools: ["Performance Monitor", "A/B Testing", "Cost Analyzer"],
    bestPractices: [
      "Monitor key performance indicators",
      "Balance quality with efficiency",
      "Use structured outputs when possible",
      "Implement caching for common queries",
    ],
  },
]

const appIntegrationGuides = [
  {
    title: "Test Centre Mastery",
    description: "Master systematic prompt testing and validation",
    icon: TestTube,
    features: [
      "Automated test suite creation",
      "Batch testing with multiple inputs",
      "Performance benchmarking",
      "Regression testing for prompt changes",
    ],
    workflow: [
      "Create test scenarios in Test Centre",
      "Define success criteria and metrics",
      "Run automated test batches",
      "Analyze results and identify patterns",
      "Iterate based on test feedback",
    ],
  },
  {
    title: "Agent Ecosystem Design",
    description: "Build sophisticated multi-agent systems",
    icon: Bot,
    features: [
      "Specialized agent creation",
      "Inter-agent communication",
      "Workflow orchestration",
      "Performance monitoring",
    ],
    workflow: [
      "Map out your complex task requirements",
      "Design agent specializations",
      "Set up communication protocols",
      "Test agent interactions",
      "Deploy and monitor the ecosystem",
    ],
  },
  {
    title: "Research Center Integration",
    description: "Leverage research tools for prompt innovation",
    icon: Microscope,
    features: [
      "Knowledge graph exploration",
      "Research template utilization",
      "Collaborative research workflows",
      "Insight visualization",
    ],
    workflow: [
      "Define research objectives",
      "Gather relevant knowledge sources",
      "Apply research methodologies",
      "Synthesize findings into prompts",
      "Validate through testing",
    ],
  },
  {
    title: "Knowledge Base Optimization",
    description: "Create and maintain effective knowledge repositories",
    icon: Database,
    features: [
      "Structured knowledge organization",
      "Dynamic context injection",
      "Knowledge freshness monitoring",
      "Semantic search capabilities",
    ],
    workflow: [
      "Audit existing knowledge assets",
      "Structure information hierarchically",
      "Implement search and retrieval",
      "Test knowledge integration",
      "Maintain and update regularly",
    ],
  },
]

const advancedTechniques = [
  {
    title: "Chain-of-Thought Engineering",
    description: "Design prompts that guide logical reasoning processes",
    techniques: [
      "Step-by-step reasoning templates",
      "Problem decomposition strategies",
      "Verification and validation steps",
      "Error correction mechanisms",
    ],
    example: "Break down complex problems into logical steps, show your reasoning, then provide the final answer.",
  },
  {
    title: "Few-Shot Learning Optimization",
    description: "Craft effective examples for in-context learning",
    techniques: [
      "Example selection strategies",
      "Diversity and representation",
      "Quality over quantity principles",
      "Dynamic example injection",
    ],
    example: "Select diverse, high-quality examples that represent the full range of expected inputs and outputs.",
  },
  {
    title: "Prompt Chaining & Composition",
    description: "Build complex workflows through prompt sequences",
    techniques: [
      "Sequential prompt design",
      "State management between prompts",
      "Error handling and recovery",
      "Output formatting for chaining",
    ],
    example: "Design each prompt to produce outputs that serve as perfect inputs for the next prompt in the chain.",
  },
  {
    title: "Meta-Prompt Engineering",
    description: "Create prompts that generate and improve other prompts",
    techniques: [
      "Self-improving prompt systems",
      "Automated prompt generation",
      "Quality assessment mechanisms",
      "Evolutionary prompt optimization",
    ],
    example: "Design prompts that can analyze and improve other prompts based on performance metrics.",
  },
]

export default function ResearchGuidancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMethodology, setSelectedMethodology] = useState<string | null>(null)
  const [aiGuidanceQuery, setAiGuidanceQuery] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [voiceInput, setVoiceInput] = useState(false)

  const { speak, stop, isSpeaking } = useTextToSpeech()

  const filteredMethodologies = promptEngineeringMethodologies.filter((method) => {
    const matchesSearch =
      method.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || method.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(promptEngineeringMethodologies.map((m) => m.category)))]

  const handleAiGuidance = async () => {
    if (!aiGuidanceQuery.trim()) return

    setIsAiThinking(true)
    try {
      // Simulate AI response - in real implementation, this would call your LLM
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockResponse = `Based on your query about "${aiGuidanceQuery}", here's my guidance:

For prompt engineering research, I recommend starting with the Iterative Refinement methodology. Here's a tailored approach:

1. **Initial Setup**: Use our Prompt Database to create your base prompt
2. **Testing Phase**: Leverage the Test Centre to run systematic evaluations
3. **Analysis**: Review performance metrics in the Analytics Dashboard
4. **Iteration**: Apply the insights to refine your prompt structure

Key considerations for your specific use case:
- Focus on clear instruction formatting
- Include relevant examples in your prompt
- Test with edge cases to ensure robustness
- Monitor token usage for cost optimization

Would you like me to elaborate on any specific aspect of this guidance?`

      setAiResponse(mockResponse)

      // Auto-speak the response if TTS is available
      if (isSpeaking) {
        stop()
      }
      speak(mockResponse)
    } catch (error) {
      setAiResponse("I apologize, but I'm having trouble processing your request right now. Please try again later.")
    } finally {
      setIsAiThinking(false)
    }
  }

  const handleVoiceInput = () => {
    // Voice input implementation would go here
    setVoiceInput(!voiceInput)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              Prompt Engineering Research Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Master advanced prompt engineering using our integrated research tools and AI guidance
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4" />
            <span>4 Advanced Methodologies</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bot className="h-4 w-4" />
            <span>AI-Powered Guidance</span>
          </div>
          <div className="flex items-center space-x-1">
            <TestTube className="h-4 w-4" />
            <span>Integrated Testing</span>
          </div>
        </div>
      </div>

      {/* AI Research Assistant */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Research Assistant</span>
            <Badge variant="secondary" className="ml-2">
              <Volume2 className="h-3 w-3 mr-1" />
              Speech Enabled
            </Badge>
          </CardTitle>
          <CardDescription>
            Get personalized guidance on prompt engineering research methodologies and app integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Ask me about prompt engineering research, testing strategies, agent orchestration, or how to use specific app features..."
                value={aiGuidanceQuery}
                onChange={(e) => setAiGuidanceQuery(e.target.value)}
                className="min-h-[100px] pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 ${voiceInput ? "text-red-500" : "text-muted-foreground"}`}
                onClick={handleVoiceInput}
              >
                {voiceInput ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button onClick={handleAiGuidance} disabled={isAiThinking || !aiGuidanceQuery.trim()}>
              {isAiThinking ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  AI is thinking...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Get AI Guidance
                </>
              )}
            </Button>

            {aiResponse && <TTSControls text={aiResponse} showSettings={true} variant="outline" />}
          </div>

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-background/50 rounded-lg border"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">AI Research Guidance</h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">{aiResponse}</div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prompt engineering methodologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="methodologies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methodologies">Research Methodologies</TabsTrigger>
          <TabsTrigger value="integration">App Integration</TabsTrigger>
          <TabsTrigger value="techniques">Advanced Techniques</TabsTrigger>
          <TabsTrigger value="workflows">Research Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="methodologies" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMethodologies.map((methodology, index) => {
              const Icon = methodology.icon
              return (
                <motion.div
                  key={methodology.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{methodology.title}</CardTitle>
                            <CardDescription className="mt-1">{methodology.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className={methodology.color}>{methodology.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{methodology.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{methodology.duration}</span>
                        </div>
                      </div>

                      {/* App Features Integration */}
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <Settings className="h-4 w-4 mr-1" />
                          App Features Used:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {methodology.appFeatures.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Research Steps */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">Research Process:</h4>
                        <ul className="space-y-1">
                          {methodology.steps.slice(0, 3).map((step, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <span className="text-primary font-medium">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                          {methodology.steps.length > 3 && (
                            <li className="text-sm text-muted-foreground">
                              +{methodology.steps.length - 3} more steps...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Practical Example */}
                      {methodology.practicalExample && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <Lightbulb className="h-4 w-4 mr-1" />
                            Practical Example:
                          </h4>
                          <p className="text-xs text-muted-foreground">{methodology.practicalExample.scenario}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Start Research
                        </Button>
                        <div className="flex items-center space-x-1">
                          <TTSControls
                            text={`${methodology.title}: ${methodology.description}`}
                            size="sm"
                            variant="ghost"
                          />
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {appIntegrationGuides.map((guide, index) => {
              const Icon = guide.icon
              return (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{guide.title}</CardTitle>
                          <CardDescription className="mt-1">{guide.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {guide.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Research Workflow:</h4>
                        <div className="space-y-2">
                          {guide.workflow.map((step, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                {idx + 1}
                              </div>
                              <span className="text-muted-foreground">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Start Integration
                        </Button>
                        <TTSControls text={`${guide.title}: ${guide.description}`} size="sm" variant="outline" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="techniques" className="space-y-6">
          <div className="grid gap-6">
            {advancedTechniques.map((technique, index) => (
              <motion.div
                key={technique.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Code className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{technique.title}</CardTitle>
                          <CardDescription className="mt-1">{technique.description}</CardDescription>
                        </div>
                      </div>
                      <TTSControls
                        text={`${technique.title}: ${technique.description}. ${technique.example}`}
                        size="sm"
                        variant="ghost"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Core Techniques:</h4>
                        <ul className="space-y-1">
                          {technique.techniques.map((tech, idx) => (
                            <li key={idx} className="text-sm flex items-start space-x-2">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-3">
                        <h4 className="font-medium text-sm mb-2">Implementation Guide:</h4>
                        <p className="text-sm text-muted-foreground">{technique.example}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <TestTube className="h-4 w-4 mr-2" />
                        Test Technique
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Examples
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>Complete Research Workflow</span>
                </CardTitle>
                <CardDescription>End-to-end process for prompt engineering research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Define research objectives and success metrics",
                    "Set up knowledge base with relevant context",
                    "Create initial prompt versions in Prompt Database",
                    "Design test scenarios in Test Centre",
                    "Create specialized agents for complex tasks",
                    "Run systematic testing and collect data",
                    "Analyze results in Research Center",
                    "Iterate and optimize based on findings",
                    "Deploy and monitor in production",
                    "Document learnings for future research",
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Play className="h-4 w-4 mr-2" />
                  Start Complete Workflow
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Quick Research Templates</span>
                </CardTitle>
                <CardDescription>Pre-configured workflows for common scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Customer Service Optimization",
                      description: "Optimize prompts for customer support scenarios",
                      duration: "2-3 hours",
                    },
                    {
                      name: "Content Generation Pipeline",
                      description: "Multi-agent content creation workflow",
                      duration: "4-6 hours",
                    },
                    {
                      name: "Code Assistant Enhancement",
                      description: "Improve programming assistance prompts",
                      duration: "3-4 hours",
                    },
                    {
                      name: "Data Analysis Automation",
                      description: "Create prompts for automated data insights",
                      duration: "2-4 hours",
                    },
                  ].map((template, idx) => (
                    <div key={idx} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {template.duration}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
