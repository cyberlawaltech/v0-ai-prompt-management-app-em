"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, Save, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the role types
type Permission = {
  id: string
  name: string
  description: string
  category: "research" | "prompt" | "agent" | "admin" | "collaboration"
}

type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  isDefault?: boolean
  isSystem?: boolean
}

export default function RolesPage() {
  // Sample permissions data
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "create-research",
      name: "Create Research",
      description: "Can create new research projects",
      category: "research",
    },
    {
      id: "edit-research",
      name: "Edit Research",
      description: "Can edit existing research projects",
      category: "research",
    },
    {
      id: "delete-research",
      name: "Delete Research",
      description: "Can delete research projects",
      category: "research",
    },
    {
      id: "view-research",
      name: "View Research",
      description: "Can view research projects",
      category: "research",
    },
    {
      id: "create-prompt",
      name: "Create Prompt",
      description: "Can create new prompts",
      category: "prompt",
    },
    {
      id: "edit-prompt",
      name: "Edit Prompt",
      description: "Can edit existing prompts",
      category: "prompt",
    },
    {
      id: "delete-prompt",
      name: "Delete Prompt",
      description: "Can delete prompts",
      category: "prompt",
    },
    {
      id: "view-prompt",
      name: "View Prompt",
      description: "Can view prompts",
      category: "prompt",
    },
    {
      id: "create-agent",
      name: "Create Agent",
      description: "Can create new agents",
      category: "agent",
    },
    {
      id: "edit-agent",
      name: "Edit Agent",
      description: "Can edit existing agents",
      category: "agent",
    },
    {
      id: "delete-agent",
      name: "Delete Agent",
      description: "Can delete agents",
      category: "agent",
    },
    {
      id: "view-agent",
      name: "View Agent",
      description: "Can view agents",
      category: "agent",
    },
    {
      id: "manage-users",
      name: "Manage Users",
      description: "Can manage users",
      category: "admin",
    },
    {
      id: "manage-roles",
      name: "Manage Roles",
      description: "Can manage roles and permissions",
      category: "admin",
    },
    {
      id: "manage-settings",
      name: "Manage Settings",
      description: "Can manage application settings",
      category: "admin",
    },
    {
      id: "invite-users",
      name: "Invite Users",
      description: "Can invite new users to the platform",
      category: "collaboration",
    },
    {
      id: "create-team",
      name: "Create Team",
      description: "Can create new teams",
      category: "collaboration",
    },
    {
      id: "manage-team",
      name: "Manage Team",
      description: "Can manage team members and settings",
      category: "collaboration",
    },
  ])

  // Sample roles data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all features",
      permissions: permissions.map((p) => p.id),
      isSystem: true,
    },
    {
      id: "researcher",
      name: "Researcher",
      description: "Can create and manage research projects",
      permissions: [
        "create-research",
        "edit-research",
        "view-research",
        "create-prompt",
        "edit-prompt",
        "view-prompt",
        "view-agent",
        "invite-users",
      ],
      isDefault: true,
    },
    {
      id: "prompt-engineer",
      name: "Prompt Engineer",
      description: "Can create and manage prompts",
      permissions: ["view-research", "create-prompt", "edit-prompt", "delete-prompt", "view-prompt", "view-agent"],
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "Can only view content",
      permissions: ["view-research", "view-prompt", "view-agent"],
    },
  ])

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: "",
    description: "",
    permissions: [],
  })
  const [isCreatingRole, setIsCreatingRole] = useState(false)

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role)
    setIsCreatingRole(false)
  }

  const handleCreateNewRole = () => {
    setSelectedRole(null)
    setNewRole({
      name: "",
      description: "",
      permissions: [],
    })
    setIsCreatingRole(true)
  }

  const handleSaveRole = () => {
    if (isCreatingRole) {
      // Create new role
      const roleId = newRole.name?.toLowerCase().replace(/\s+/g, "-") || `role-${Date.now()}`
      const newRoleObj: Role = {
        id: roleId,
        name: newRole.name || "New Role",
        description: newRole.description || "",
        permissions: newRole.permissions || [],
      }
      setRoles([...roles, newRoleObj])
      setSelectedRole(newRoleObj)
      setIsCreatingRole(false)
    } else if (selectedRole) {
      // Update existing role
      const updatedRoles = roles.map((role) => (role.id === selectedRole.id ? selectedRole : role))
      setRoles(updatedRoles)
    }
  }

  const handleDeleteRole = (roleId: string) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId)
    setRoles(updatedRoles)
    setSelectedRole(null)
  }

  const handleTogglePermission = (permissionId: string) => {
    if (isCreatingRole) {
      const updatedPermissions = newRole.permissions || []
      if (updatedPermissions.includes(permissionId)) {
        setNewRole({
          ...newRole,
          permissions: updatedPermissions.filter((id) => id !== permissionId),
        })
      } else {
        setNewRole({
          ...newRole,
          permissions: [...updatedPermissions, permissionId],
        })
      }
    } else if (selectedRole) {
      const updatedPermissions = [...selectedRole.permissions]
      if (updatedPermissions.includes(permissionId)) {
        setSelectedRole({
          ...selectedRole,
          permissions: updatedPermissions.filter((id) => id !== permissionId),
        })
      } else {
        setSelectedRole({
          ...selectedRole,
          permissions: [...updatedPermissions, permissionId],
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Roles & Permissions</h1>
        <Button onClick={handleCreateNewRole}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Manage user roles in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                    selectedRole?.id === role.id ? "bg-secondary" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectRole(role)}
                >
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                    <div className="flex gap-1 mt-1">
                      {role.isSystem && <Badge variant="outline">System</Badge>}
                      {role.isDefault && <Badge>Default</Badge>}
                    </div>
                  </div>
                  {!role.isSystem && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteRole(role.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {isCreatingRole ? "Create New Role" : selectedRole ? selectedRole.name : "Select a Role"}
            </CardTitle>
            <CardDescription>
              {isCreatingRole
                ? "Configure permissions for the new role"
                : selectedRole
                  ? "Manage permissions for this role"
                  : "Select a role from the list or create a new one"}
            </CardDescription>
          </CardHeader>
          {(selectedRole || isCreatingRole) && (
            <>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      value={isCreatingRole ? newRole.name : selectedRole?.name}
                      onChange={(e) =>
                        isCreatingRole
                          ? setNewRole({ ...newRole, name: e.target.value })
                          : setSelectedRole({ ...selectedRole!, name: e.target.value })
                      }
                      disabled={selectedRole?.isSystem}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">Description</Label>
                    <Input
                      id="role-description"
                      value={isCreatingRole ? newRole.description : selectedRole?.description}
                      onChange={(e) =>
                        isCreatingRole
                          ? setNewRole({ ...newRole, description: e.target.value })
                          : setSelectedRole({ ...selectedRole!, description: e.target.value })
                      }
                      disabled={selectedRole?.isSystem}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="is-default">Default Role</Label>
                      <Switch
                        id="is-default"
                        checked={isCreatingRole ? !!newRole.isDefault : !!selectedRole?.isDefault}
                        onCheckedChange={(checked) =>
                          isCreatingRole
                            ? setNewRole({ ...newRole, isDefault: checked })
                            : setSelectedRole({ ...selectedRole!, isDefault: checked })
                        }
                        disabled={selectedRole?.isSystem}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If enabled, new users will be assigned this role by default
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Permissions</h3>
                  <Tabs defaultValue="research">
                    <TabsList className="w-full flex-wrap">
                      <TabsTrigger value="research">Research</TabsTrigger>
                      <TabsTrigger value="prompt">Prompts</TabsTrigger>
                      <TabsTrigger value="agent">Agents</TabsTrigger>
                      <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                      <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    {["research", "prompt", "agent", "collaboration", "admin"].map((category) => (
                      <TabsContent key={category} value={category} className="space-y-4">
                        {permissions
                          .filter((p) => p.category === category)
                          .map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={
                                  isCreatingRole
                                    ? newRole.permissions?.includes(permission.id)
                                    : selectedRole?.permissions.includes(permission.id)
                                }
                                onCheckedChange={() => handleTogglePermission(permission.id)}
                                disabled={selectedRole?.isSystem}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor={permission.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {permission.name}
                                </label>
                                <p className="text-sm text-muted-foreground">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => (isCreatingRole ? setIsCreatingRole(false) : setSelectedRole(null))}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveRole} disabled={selectedRole?.isSystem}>
                  <Save className="mr-2 h-4 w-4" />
                  {isCreatingRole ? "Create Role" : "Save Changes"}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Role Assignments</CardTitle>
          <CardDescription>Manage role assignments for users in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Input placeholder="Search users..." className="pr-10" />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    role: "Administrator",
                    status: "Active",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    role: "Researcher",
                    status: "Active",
                  },
                  {
                    name: "Bob Johnson",
                    email: "bob@example.com",
                    role: "Prompt Engineer",
                    status: "Active",
                  },
                  {
                    name: "Alice Williams",
                    email: "alice@example.com",
                    role: "Viewer",
                    status: "Pending",
                  },
                ].map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select defaultValue={user.role.toLowerCase().replace(/\s+/g, "-")}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "outline"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
