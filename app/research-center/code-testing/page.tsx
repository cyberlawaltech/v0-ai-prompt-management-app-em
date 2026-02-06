"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Code, CheckCircle, XCircle, AlertTriangle, FileCode } from "lucide-react"

export default function CodeTestingGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Code Testing Graph</h1>
          <p className="text-muted-foreground">Visualize code testing results and dependencies</p>
        </div>
        <Button>
          <FileCode className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <Tabs defaultValue="graph" className="space-y-4">
        <TabsList>
          <TabsTrigger value="graph">Graph View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="graph">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Code Testing Visualization</CardTitle>
              <CardDescription>Interactive graph of code components and test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full bg-slate-50 rounded-md border p-4 flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Knowledge Graph Visualization</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This area would display an interactive network graph showing code components, their relationships,
                    and test results. Nodes would be color-coded by test status.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
                  <span>Passed (24)</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-1"></span>
                  <span>Failed (3)</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-amber-500 mr-1"></span>
                  <span>Warning (7)</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-slate-300 mr-1"></span>
                  <span>Not Tested (12)</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Detailed list of all code components and their test status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 text-sm font-medium border-b bg-slate-50">
                  <div className="col-span-5">Component</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-3">Last Tested</div>
                  <div className="col-span-2">Coverage</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Research Agent Core",
                      status: "passed",
                      lastTested: "2 hours ago",
                      coverage: "92%",
                    },
                    {
                      name: "Knowledge Graph Parser",
                      status: "warning",
                      lastTested: "1 day ago",
                      coverage: "78%",
                    },
                    {
                      name: "Data Extraction Module",
                      status: "failed",
                      lastTested: "3 hours ago",
                      coverage: "65%",
                    },
                    {
                      name: "Agent Communication Protocol",
                      status: "passed",
                      lastTested: "5 hours ago",
                      coverage: "89%",
                    },
                    {
                      name: "Research Template Engine",
                      status: "not-tested",
                      lastTested: "Never",
                      coverage: "0%",
                    },
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-12 p-3 text-sm items-center">
                      <div className="col-span-5 flex items-center">
                        <Code className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="col-span-2">
                        {item.status === "passed" && (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>Passed</span>
                          </div>
                        )}
                        {item.status === "failed" && (
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span>Failed</span>
                          </div>
                        )}
                        {item.status === "warning" && (
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                            <span>Warning</span>
                          </div>
                        )}
                        {item.status === "not-tested" && (
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full border mr-1"></div>
                            <span>Not Tested</span>
                          </div>
                        )}
                      </div>
                      <div className="col-span-3 text-muted-foreground">{item.lastTested}</div>
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                item.status === "passed"
                                  ? "bg-green-500"
                                  : item.status === "warning"
                                    ? "bg-amber-500"
                                    : item.status === "failed"
                                      ? "bg-red-500"
                                      : "bg-slate-300"
                              }`}
                              style={{ width: item.coverage }}
                            ></div>
                          </div>
                          <span>{item.coverage}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
              <CardDescription>Historical test runs and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "run-123",
                    date: "Today, 14:32",
                    components: 46,
                    passed: 42,
                    failed: 1,
                    warnings: 3,
                  },
                  {
                    id: "run-122",
                    date: "Today, 10:15",
                    components: 46,
                    passed: 40,
                    failed: 3,
                    warnings: 3,
                  },
                  {
                    id: "run-121",
                    date: "Yesterday, 18:45",
                    components: 45,
                    passed: 39,
                    failed: 4,
                    warnings: 2,
                  },
                ].map((run, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <div className="font-medium">Test Run #{run.id}</div>
                      <div className="text-sm text-muted-foreground">{run.date}</div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span>{run.passed}</span>
                      </div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span>{run.failed}</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                        <span>{run.warnings}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
