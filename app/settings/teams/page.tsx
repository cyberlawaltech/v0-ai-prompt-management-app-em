"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Trash2, Save, UserPlus, Settings, Users, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define team types
type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

type Team = {
  id: string
  name: string
  description: string
  members: TeamMember[]
  projects: number
  createdAt: string
}

export default function TeamsPage() {
  // Sample teams data
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "team-1",
      name: "Research Team Alpha",
      description: "Main research team for AI prompt engineering",
      members: [
        {
          id: "user-1",
          name: "John Doe",
          email: "john@example.com",
          role: "Team Lead",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Researcher",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-3",
          name: "Bob Johnson",
          email: "bob@example.com",
          role: "Prompt Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      projects: 5,
      createdAt: "2023-01-15",
    },
    {
      id: "team-2",
      name: "Prompt Development",
      description: "Team focused on developing and testing prompts",
      members: [
        {
          id: "user-4",
          name: "Alice Williams",
          email: "alice@example.com",
          role: "Team Lead",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-5",
          name: "Charlie Brown",
          email: "charlie@example.com",
          role: "Prompt Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      projects: 3,
      createdAt: "2023-03-22",
    },
    {
      id: "team-3",
      name: "Agent Development",
      description: "Team responsible for creating and training AI agents",
      members: [
        {
          id: "user-6",
          name: "David Miller",
          email: "david@example.com",
          role: "Team Lead",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-7",
          name: "Eva Garcia",
          email: "eva@example.com",
          role: "AI Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "user-8",
          name: "Frank Wilson",
          email: "frank@example.com",
          role: "Data Scientist",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      projects: 7,
      createdAt: "2023-02-10",
    },
  ])

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isCreatingTeam, setIsCreatingTeam] = useState(false)
  const [newTeam, setNewTeam] = useState<Partial<Team>>({
    name: "",
    description: "",
    members: [],
  })
  const [isAddingMember, setIsAddingMember] = useState(false)

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team)
    setIsCreatingTeam(false)
  }

  const handleCreateNewTeam = () => {
    setSelectedTeam(null)
    setNewTeam({
      name: "",
      description: "",
      members: [],
    })
    setIsCreatingTeam(true)
  }

  const handleSaveTeam = () => {
    if (isCreatingTeam) {
      // Create new team
      const teamId = `team-${Date.now()}`
      const newTeamObj: Team = {
        id: teamId,
        name: newTeam.name || "New Team",
        description: newTeam.description || "",
        members: newTeam.members || [],
        projects: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTeams([...teams, newTeamObj])
      setSelectedTeam(newTeamObj)
      setIsCreatingTeam(false)
    } else if (selectedTeam) {
      // Update existing team
      const updatedTeams = teams.map((team) => (team.id === selectedTeam.id ? selectedTeam : team))
      setTeams(updatedTeams)
    }
  }

  const handleDeleteTeam = (teamId: string) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId)
    setTeams(updatedTeams)
    setSelectedTeam(null)
  }

  const handleRemoveMember = (memberId: string) => {
    if (selectedTeam) {
      const updatedMembers = selectedTeam.members.filter((member) => member.id !== memberId)
      setSelectedTeam({
        ...selectedTeam,
        members: updatedMembers,
      })
    }
  }

  const handleAddMember = (member: TeamMember) => {
    if (selectedTeam) {
      setSelectedTeam({
        ...selectedTeam,
        members: [...selectedTeam.members, member],
      })
    }
    setIsAddingMember(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Button onClick={handleCreateNewTeam}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Teams</CardTitle>
            <CardDescription>Manage your organization's teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className={`p-3 rounded-md cursor-pointer ${
                    selectedTeam?.id === team.id ? "bg-secondary" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectTeam(team)}
                >
                  <div className="font-medium">{team.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{team.description}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members.length > 3 && (
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs border-2 border-background">
                          +{team.members.length - 3}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline">{team.projects} Projects</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {isCreatingTeam ? "Create New Team" : selectedTeam ? selectedTeam.name : "Select a Team"}
            </CardTitle>
            <CardDescription>
              {isCreatingTeam
                ? "Configure your new team"
                : selectedTeam
                  ? "Manage team details and members"
                  : "Select a team from the list or create a new one"}
            </CardDescription>
          </CardHeader>
          {(selectedTeam || isCreatingTeam) && (
            <>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="w-full">
                    <TabsTrigger value="details">Team Details</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="team-name">Team Name</Label>
                      <Input
                        id="team-name"
                        value={isCreatingTeam ? newTeam.name : selectedTeam?.name}
                        onChange={(e) =>
                          isCreatingTeam
                            ? setNewTeam({ ...newTeam, name: e.target.value })
                            : setSelectedTeam({ ...selectedTeam!, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team-description">Description</Label>
                      <Input
                        id="team-description"
                        value={isCreatingTeam ? newTeam.description : selectedTeam?.description}
                        onChange={(e) =>
                          isCreatingTeam
                            ? setNewTeam({ ...newTeam, description: e.target.value })
                            : setSelectedTeam({ ...selectedTeam!, description: e.target.value })
                        }
                      />
                    </div>
                    {!isCreatingTeam && selectedTeam && (
                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Created</span>
                          <span>{selectedTeam.createdAt}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Members</span>
                          <span>{selectedTeam.members.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Projects</span>
                          <span>{selectedTeam.projects}</span>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="members" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
                        <DialogTrigger asChild>
                          <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Team Member</DialogTitle>
                            <DialogDescription>Add a new member to the team.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="member-email">Email</Label>
                              <Input id="member-email" placeholder="Enter email address" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="member-role">Role</Label>
                              <Select defaultValue="member">
                                <SelectTrigger id="member-role">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lead">Team Lead</SelectItem>
                                  <SelectItem value="researcher">Researcher</SelectItem>
                                  <SelectItem value="engineer">Prompt Engineer</SelectItem>
                                  <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={() =>
                                handleAddMember({
                                  id: `user-${Date.now()}`,
                                  name: "New Member",
                                  email: "new@example.com",
                                  role: "Member",
                                  avatar: "/placeholder.svg?height=40&width=40",
                                })
                              }
                            >
                              Add Member
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Member</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(isCreatingTeam ? [] : selectedTeam?.members || []).map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-sm text-muted-foreground">{member.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue={member.role.toLowerCase().replace(/\s+/g, "-")}>
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="team-lead">Team Lead</SelectItem>
                                  <SelectItem value="researcher">Researcher</SelectItem>
                                  <SelectItem value="prompt-engineer">Prompt Engineer</SelectItem>
                                  <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>2 weeks ago</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(member.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Team Projects</h3>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Project
                      </Button>
                    </div>

                    {!isCreatingTeam && selectedTeam && selectedTeam.projects > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: selectedTeam.projects }).map((_, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Research Project {index + 1}</CardTitle>
                              <CardDescription>Last updated 2 days ago</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant="outline">In Progress</Badge>
                              </div>
                              <div className="flex justify-between text-sm mt-2">
                                <span className="text-muted-foreground">Members</span>
                                <div className="flex -space-x-2">
                                  {selectedTeam.members.slice(0, 3).map((member, idx) => (
                                    <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button variant="outline" size="sm" className="w-full">
                                View Project
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Projects Yet</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">
                          This team doesn't have any projects yet. Create your first project to get started.
                        </p>
                        <Button>Create First Project</Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="permissions" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Team Permissions</h3>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Advanced Settings
                      </Button>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Access Control</CardTitle>
                        <CardDescription>Configure what team members can access</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          {[
                            {
                              title: "Research Projects",
                              description: "Access to research projects created by the team",
                              icon: FileText,
                            },
                            {
                              title: "Prompt Library",
                              description: "Access to the team's prompt library",
                              icon: FileText,
                            },
                            {
                              title: "Agent Management",
                              description: "Ability to create and manage AI agents",
                              icon: Users,
                            },
                            {
                              title: "Team Settings",
                              description: "Ability to modify team settings and add members",
                              icon: Settings,
                            },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                  <item.icon className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                              </div>
                              <Select defaultValue="all-members">
                                <SelectTrigger className="w-[160px]">
                                  <SelectValue placeholder="Select access" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all-members">All Members</SelectItem>
                                  <SelectItem value="team-leads">Team Leads Only</SelectItem>
                                  <SelectItem value="custom">Custom Roles</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Privacy Settings</CardTitle>
                        <CardDescription>Control team visibility and sharing options</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          {[
                            {
                              title: "Team Visibility",
                              description: "Who can see this team in the organization",
                              options: [
                                { value: "public", label: "Public" },
                                { value: "private", label: "Private" },
                              ],
                              defaultValue: "private",
                            },
                            {
                              title: "Project Sharing",
                              description: "Default sharing settings for team projects",
                              options: [
                                { value: "organization", label: "Organization" },
                                { value: "team-only", label: "Team Only" },
                                { value: "project-specific", label: "Project Specific" },
                              ],
                              defaultValue: "team-only",
                            },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <Select defaultValue={item.defaultValue}>
                                <SelectTrigger className="w-[160px]">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                  {item.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                {!isCreatingTeam && selectedTeam && (
                  <Button variant="destructive" onClick={() => handleDeleteTeam(selectedTeam.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Team
                  </Button>
                )}
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    onClick={() => (isCreatingTeam ? setIsCreatingTeam(false) : setSelectedTeam(null))}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTeam}>
                    <Save className="mr-2 h-4 w-4" />
                    {isCreatingTeam ? "Create Team" : "Save Changes"}
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
