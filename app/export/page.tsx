import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExportPage() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Export & Share</h1>
        <p className="text-muted-foreground">Export your research findings and share them with others</p>
      </div>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
        </TabsList>
        <TabsContent value="export" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>PDF Export</CardTitle>
                <CardDescription>Export your research as a PDF document</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project1">AI Ethics Research</SelectItem>
                        <SelectItem value="project2">Machine Learning Trends</SelectItem>
                        <SelectItem value="project3">NLP Advancements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Include</label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="include-summary" className="h-4 w-4" defaultChecked />
                        <label htmlFor="include-summary">Executive Summary</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="include-findings" className="h-4 w-4" defaultChecked />
                        <label htmlFor="include-findings">Key Findings</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="include-sources" className="h-4 w-4" defaultChecked />
                        <label htmlFor="include-sources">Sources</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="include-visualizations" className="h-4 w-4" defaultChecked />
                        <label htmlFor="include-visualizations">Visualizations</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Export as PDF</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Word Document</CardTitle>
                <CardDescription>Export your research as a Word document</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project1">AI Ethics Research</SelectItem>
                        <SelectItem value="project2">Machine Learning Trends</SelectItem>
                        <SelectItem value="project3">NLP Advancements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template1">Academic</SelectItem>
                        <SelectItem value="template2">Business</SelectItem>
                        <SelectItem value="template3">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Export as DOCX</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSV/Excel</CardTitle>
                <CardDescription>Export your data in spreadsheet format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="research">Research Findings</SelectItem>
                        <SelectItem value="sources">Source References</SelectItem>
                        <SelectItem value="metrics">Performance Metrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Export Data</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="share" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Share Link</CardTitle>
                <CardDescription>Generate a shareable link to your research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project1">AI Ethics Research</SelectItem>
                        <SelectItem value="project2">Machine Learning Trends</SelectItem>
                        <SelectItem value="project3">NLP Advancements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Access Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View Only</SelectItem>
                        <SelectItem value="comment">Comment</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiration</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expiration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="1day">1 Day</SelectItem>
                        <SelectItem value="7days">7 Days</SelectItem>
                        <SelectItem value="30days">30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Link</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>Send your research directly via email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recipient Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      placeholder="Research Findings"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">Word Document</SelectItem>
                        <SelectItem value="link">Shareable Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Send Email</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Share with your team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Team</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team1">Research Team</SelectItem>
                        <SelectItem value="team2">Development Team</SelectItem>
                        <SelectItem value="team3">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Access Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View Only</SelectItem>
                        <SelectItem value="comment">Comment</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notification</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="send-notification" className="h-4 w-4" defaultChecked />
                      <label htmlFor="send-notification">Send notification</label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Share with Team</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
