"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Download, Filter, RefreshCw, Bot, Calendar, Clock } from "lucide-react"
import { TTSControls } from "@/components/tts-controls"

export default function CommunicationLogs() {
  const [selectedLog, setSelectedLog] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAgent, setFilterAgent] = useState<string>("all")

  // Sample communication logs
  const logs = [
    {
      id: "log-1",
      timestamp: "2023-05-21T14:32:00Z",
      sender: "Lead Researcher",
      receiver: "Data Analyst",
      message:
        "Please analyze the following dataset and identify key trends related to prompt engineering effectiveness.",
      attachments: ["dataset-1.csv"],
      status: "completed",
    },
    {
      id: "log-2",
      timestamp: "2023-05-21T14:35:00Z",
      sender: "Data Analyst",
      receiver: "Lead Researcher",
      message:
        "Analysis complete. I've identified three key trends: (1) Longer prompts with specific instructions yield better results, (2) Including examples improves consistency by 27%, (3) Domain-specific terminology increases accuracy by 18%.",
      attachments: ["analysis-results.json"],
      status: "completed",
    },
    {
      id: "log-3",
      timestamp: "2023-05-21T14:40:00Z",
      sender: "Lead Researcher",
      receiver: "Literature Reviewer",
      message:
        "Based on the data analysis, please find academic papers that support or contradict these findings about prompt engineering effectiveness.",
      attachments: [],
      status: "completed",
    },
    {
      id: "log-4",
      timestamp: "2023-05-21T15:10:00Z",
      sender: "Literature Reviewer",
      receiver: "Lead Researcher",
      message:
        "I've found 12 relevant papers. 9 support the findings, especially regarding example inclusion. 3 papers suggest domain-specific terminology may vary in effectiveness depending on the model architecture. Full summaries attached.",
      attachments: ["literature-review.pdf"],
      status: "completed",
    },
    {
      id: "log-5",
      timestamp: "2023-05-21T15:30:00Z",
      sender: "Lead Researcher",
      receiver: "Code Tester",
      message: "Please implement a test framework to verify these prompt engineering findings across different models.",
      attachments: [],
      status: "in-progress",
    },
  ]

  // Filter logs based on search query and agent filter
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.receiver.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAgent =
      filterAgent === "all" ||
      log.sender.toLowerCase().includes(filterAgent.toLowerCase()) ||
      log.receiver.toLowerCase().includes(filterAgent.toLowerCase())

    return matchesSearch && matchesAgent
  })

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Get avatar for agent
  const getAgentAvatar = (agent: string) => {
    if (agent.includes("Lead")) return "LR"
    if (agent.includes("Data")) return "DA"
    if (agent.includes("Literature")) return "LR"
    if (agent.includes("Code")) return "CT"
    return "AG"
  }

  // Get avatar color for agent
  const getAgentColor = (agent: string) => {
    if (agent.includes("Lead")) return "bg-blue-500"
    if (agent.includes("Data")) return "bg-green-500"
    if (agent.includes("Literature")) return "bg-purple-500"
    if (agent.includes("Code")) return "bg-amber-500"
    return "bg-slate-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agent Communication Logs</h1>
          <p className="text-muted-foreground">Track interactions between research agents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search communications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterAgent} onValueChange={setFilterAgent}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="Lead Researcher">Lead Researcher</SelectItem>
              <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              <SelectItem value="Literature Reviewer">Literature Reviewer</SelectItem>
              <SelectItem value="Code Tester">Code Tester</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Communication Logs</CardTitle>
              <CardDescription>Recent agent interactions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                      selectedLog === log.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedLog(log.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className={getAgentColor(log.sender)}>
                            {getAgentAvatar(log.sender)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{log.sender}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimestamp(log.timestamp)}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={log.status === "completed" ? "default" : "outline"}
                        className={log.status === "in-progress" ? "bg-amber-100 text-amber-800 border-amber-300" : ""}
                      >
                        {log.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>To: {log.receiver}</span>
                    </div>
                    <p className="text-sm line-clamp-2">{log.message}</p>
                    {log.attachments.length > 0 && (
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></div>
                          <span>{log.attachments.length} attachment(s)</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedLog ? (
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Communication Details</CardTitle>
                    <CardDescription>
                      {logs.find((log) => log.id === selectedLog)?.sender} →{" "}
                      {logs.find((log) => log.id === selectedLog)?.receiver}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        logs.find((log) => log.id === selectedLog)?.status === "completed" ? "default" : "outline"
                      }
                      className={
                        logs.find((log) => log.id === selectedLog)?.status === "in-progress"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : ""
                      }
                    >
                      {logs.find((log) => log.id === selectedLog)?.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback
                        className={getAgentColor(logs.find((log) => log.id === selectedLog)?.sender || "")}
                      >
                        {getAgentAvatar(logs.find((log) => log.id === selectedLog)?.sender || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{logs.find((log) => log.id === selectedLog)?.sender}</div>
                      <div className="text-sm text-muted-foreground">Sender</div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="h-0.5 w-full bg-slate-200 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback
                        className={getAgentColor(logs.find((log) => log.id === selectedLog)?.receiver || "")}
                      >
                        {getAgentAvatar(logs.find((log) => log.id === selectedLog)?.receiver || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{logs.find((log) => log.id === selectedLog)?.receiver}</div>
                      <div className="text-sm text-muted-foreground">Receiver</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(logs.find((log) => log.id === selectedLog)?.timestamp || "").toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <div className="flex items-start justify-between gap-2">
                      <p className="whitespace-pre-wrap flex-1">
                        {logs.find((log) => log.id === selectedLog)?.message}
                      </p>
                      <TTSControls
                        text={logs.find((log) => log.id === selectedLog)?.message || ""}
                        variant="outline"
                        size="sm"
                        showSettings={true}
                      />
                    </div>
                  </div>
                </div>

                {logs.find((log) => log.id === selectedLog)?.attachments.length ? (
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {logs
                        .find((log) => log.id === selectedLog)
                        ?.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center p-2 border rounded-md">
                            <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                              <div className="text-xs font-medium text-blue-700">
                                {attachment.split(".").pop()?.toUpperCase()}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{attachment}</div>
                              <div className="text-xs text-muted-foreground">
                                {attachment.includes("dataset")
                                  ? "Dataset"
                                  : attachment.includes("analysis")
                                    ? "Analysis Results"
                                    : "Document"}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Select a Communication Log</h3>
                <p className="text-muted-foreground mb-4">
                  Choose a log from the list to view detailed communication between agents
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
