"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRBAC, PermissionGate, TeamMemberGate } from "@/lib/rbac/rbac-context"
import {
  PlusCircle,
  Users,
  FileText,
  Clock,
  Search,
  Filter,
  SlidersHorizontal,
  Share2,
  MessageSquare,
  Lock,
} from "lucide-react"

// Define project types
type Project = {
  id: string
  title: string
  description: string
  status: "draft" | "in-progress" | "completed" | "archived"
  teamId: string
  members: {
    id: string
    name: string
    role: string
    avatar?: string
  }[]
  lastUpdated: string
  createdBy: string
}

export default function CollaborativeResearch() {
  const { currentUser, hasPermission } = useRBAC()
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "project-1",
      title: "AI Prompt Engineering Best Practices",
      description: "Research on effective prompt engineering techniques for various AI models",
      status: "in-progress",
      teamId: "team-1",
      members: [
        {
          id: "user-1",
          name: "John Doe",
          role: "Lead Researcher",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-2",
          name: "Jane Smith",
          role: "Prompt Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-3",
          name: "Bob Johnson",
          role: "Data Scientist",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      lastUpdated: "2 hours ago",
      createdBy: "John Doe",
    },
    {
      id: "project-2",
      title: "LLM Fine-tuning Comparison",
      description: "Comparative analysis of fine-tuning approaches for large language models",
      status: "draft",
      teamId: "team-2",
      members: [
        {
          id: "user-1",
          name: "John Doe",
          role: "Contributor",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-4",
          name: "Alice Williams",
          role: "Lead Researcher",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      lastUpdated: "1 day ago",
      createdBy: "Alice Williams",
    },
    {
      id: "project-3",
      title: "Multi-modal Prompt Techniques",
      description: "Exploring effective prompting strategies for multi-modal AI models",
      status: "completed",
      teamId: "team-1",
      members: [
        {
          id: "user-2",
          name: "Jane Smith",
          role: "Lead Researcher",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-3",
          name: "Bob Johnson",
          role: "AI Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      lastUpdated: "1 week ago",
      createdBy: "Jane Smith",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Collaborative Research</h1>
        <PermissionGate permission="create-research">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Research Project
          </Button>
        </PermissionGate>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="team">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="team-1">Research Team Alpha</SelectItem>
                    <SelectItem value="team-2">Prompt Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort">Sort By</Label>
                <Select defaultValue="updated">
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Last Updated</SelectItem>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="name">Project Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your Teams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Research Team Alpha", "Prompt Development"].map((team, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{team}</span>
                  </div>
                  <Badge variant="outline">{index === 0 ? "5" : "3"} Projects</Badge>
                </div>
              ))}
              <PermissionGate permission="create-team">
                <Button variant="ghost" className="w-full mt-2" size="sm">
                  <PlusCircle className="mr-2 h-3 w-3" />
                  Create New Team
                </Button>
              </PermissionGate>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Research Projects</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search projects..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="my">My Projects</TabsTrigger>
                  <TabsTrigger value="shared">Shared with Me</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {projects.map((project) => (
                    <TeamMemberGate
                      key={project.id}
                      teamId={project.teamId}
                      fallback={
                        <Card className="bg-muted/30">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base text-muted-foreground">{project.title}</CardTitle>
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <CardDescription>
                              This project is private to{" "}
                              {project.teamId === "team-1" ? "Research Team Alpha" : "Prompt Development"}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      }
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{project.title}</CardTitle>
                            <Badge
                              variant={
                                project.status === "in-progress"
                                  ? "default"
                                  : project.status === "completed"
                                    ? "success"
                                    : "outline"
                              }
                            >
                              {project.status === "in-progress"
                                ? "In Progress"
                                : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {project.members.map((member, index) => (
                                <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {project.lastUpdated}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <div className="flex gap-2 w-full">
                            <Button variant="outline" size="sm" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <PermissionGate permission="edit-research">
                              {project.members.some((m) => m.id === currentUser?.id) && (
                                <Button variant="outline" size="sm" className="flex-1">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Collaborate
                                </Button>
                              )}
                            </PermissionGate>
                            <PermissionGate permission="manage-team">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </Button>
                            </PermissionGate>
                          </div>
                        </CardFooter>
                      </Card>
                    </TeamMemberGate>
                  ))}
                </TabsContent>

                <TabsContent value="my" className="space-y-4">
                  {projects
                    .filter((project) => project.members.some((m) => m.id === currentUser?.id))
                    .map((project) => (
                      <Card key={project.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{project.title}</CardTitle>
                            <Badge
                              variant={
                                project.status === "in-progress"
                                  ? "default"
                                  : project.status === "completed"
                                    ? "success"
                                    : "outline"
                              }
                            >
                              {project.status === "in-progress"
                                ? "In Progress"
                                : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {project.members.map((member, index) => (
                                <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {project.lastUpdated}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <div className="flex gap-2 w-full">
                            <Button variant="outline" size="sm" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Collaborate
                            </Button>
                            <PermissionGate permission="manage-team">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </Button>
                            </PermissionGate>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="shared" className="space-y-4">
                  {projects
                    .filter(
                      (project) =>
                        !project.members.some((m) => m.id === currentUser?.id) &&
                        currentUser?.teams.includes(project.teamId),
                    )
                    .map((project) => (
                      <Card key={project.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{project.title}</CardTitle>
                            <Badge
                              variant={
                                project.status === "in-progress"
                                  ? "default"
                                  : project.status === "completed"
                                    ? "success"
                                    : "outline"
                              }
                            >
                              {project.status === "in-progress"
                                ? "In Progress"
                                : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {project.members.map((member, index) => (
                                <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {project.lastUpdated}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <div className="flex gap-2 w-full">
                            <Button variant="outline" size="sm" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Comment
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
