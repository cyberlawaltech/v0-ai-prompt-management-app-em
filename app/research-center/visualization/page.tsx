"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResearchVisualizationPage() {
  const [timeRange, setTimeRange] = useState("7days")

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Research Data Visualization</h1>
        <p className="text-muted-foreground">Visualize your research data and insights</p>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Tabs defaultValue="charts" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="charts">
                <BarChart className="mr-2 h-4 w-4" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="trends">
                <LineChart className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="distribution">
                <PieChart className="mr-2 h-4 w-4" />
                Distribution
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 hours</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Research Sources</CardTitle>
            <CardDescription>Distribution by type</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <PieChart className="mx-auto h-16 w-16 mb-2" />
              <p>Source distribution chart</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Research Progress</CardTitle>
            <CardDescription>Completion over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LineChart className="mx-auto h-16 w-16 mb-2" />
              <p>Progress line chart</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Agent Activity</CardTitle>
            <CardDescription>Tasks completed by agent</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart className="mx-auto h-16 w-16 mb-2" />
              <p>Agent activity bar chart</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Topic Relevance</CardTitle>
            <CardDescription>Relevance score by topic</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart className="mx-auto h-16 w-16 mb-2" />
              <p>Topic relevance chart</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Citation Network</CardTitle>
            <CardDescription>Connections between sources</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto h-16 w-16 mb-2 border-2 border-dashed rounded-full flex items-center justify-center">
                <div className="h-8 w-8 border-2 border-dashed rounded-full"></div>
              </div>
              <p>Citation network graph</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Sentiment of research findings</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto h-16 w-16 mb-2 flex items-center justify-between">
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                <div className="h-8 w-4 rounded-full bg-yellow-500"></div>
                <div className="h-12 w-4 rounded-full bg-green-500"></div>
              </div>
              <p>Sentiment distribution chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Insights Timeline</CardTitle>
          <CardDescription>Key insights discovered over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <LineChart className="mx-auto h-16 w-16 mb-2" />
            <p>Research insights timeline chart</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
