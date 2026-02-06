"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FolderPlus,
  FilePlus,
  Folder,
  File,
  MoreHorizontal,
  Star,
  Clock,
  Trash2,
  Download,
  Share,
  Edit,
  Copy,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  category: string
  lastModified: string
  size?: string
  starred?: boolean
}

export default function FileManager() {
  const [searchTerm, setSearchTerm] = useState("")

  const files: FileItem[] = [
    {
      id: "1",
      name: "Marketing Prompts",
      type: "folder",
      category: "Prompts",
      lastModified: "2 hours ago",
      starred: true,
    },
    { id: "2", name: "Development Prompts", type: "folder", category: "Prompts", lastModified: "Yesterday" },
    { id: "3", name: "Customer Support", type: "folder", category: "Prompts", lastModified: "3 days ago" },
    {
      id: "4",
      name: "Blog Post Generator",
      type: "file",
      category: "Prompt",
      lastModified: "1 hour ago",
      size: "4 KB",
      starred: true,
    },
    {
      id: "5",
      name: "SEO Title Generator",
      type: "file",
      category: "Prompt",
      lastModified: "5 hours ago",
      size: "2 KB",
    },
    { id: "6", name: "Product Description", type: "file", category: "Prompt", lastModified: "Yesterday", size: "3 KB" },
    { id: "7", name: "Email Templates", type: "file", category: "Prompt", lastModified: "2 days ago", size: "5 KB" },
    { id: "8", name: "Landing Page Copy", type: "file", category: "Prompt", lastModified: "3 days ago", size: "7 KB" },
    { id: "9", name: "Social Media Posts", type: "file", category: "Prompt", lastModified: "1 week ago", size: "6 KB" },
  ]

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const renderFileIcon = (file: FileItem) => {
    if (file.type === "folder") {
      return <Folder className="h-5 w-5 text-blue-500" />
    } else {
      return <File className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">File Manager</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            New File
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files and folders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="trash">Trash</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Files</CardTitle>
              <CardDescription>Manage your files and folders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-2">Modified</div>
                </div>
                <div className="divide-y">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="grid grid-cols-12 p-4 text-sm items-center">
                      <div className="col-span-6 flex items-center gap-2">
                        {renderFileIcon(file)}
                        <span className="font-medium">{file.name}</span>
                        {file.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <div className="col-span-2 text-muted-foreground">{file.category}</div>
                      <div className="col-span-2 text-muted-foreground">{file.size || "-"}</div>
                      <div className="col-span-1 text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {file.lastModified}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              {file.starred ? "Unstar" : "Star"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>Files you've recently accessed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="divide-y">
                  {filteredFiles
                    .sort((a, b) => {
                      if (a.lastModified.includes("hour") && !b.lastModified.includes("hour")) return -1
                      if (!a.lastModified.includes("hour") && b.lastModified.includes("hour")) return 1
                      if (a.lastModified.includes("Yesterday") && !b.lastModified.includes("Yesterday")) return -1
                      if (!a.lastModified.includes("Yesterday") && b.lastModified.includes("Yesterday")) return 1
                      return 0
                    })
                    .slice(0, 5)
                    .map((file) => (
                      <div key={file.id} className="grid grid-cols-12 p-4 text-sm items-center">
                        <div className="col-span-6 flex items-center gap-2">
                          {renderFileIcon(file)}
                          <span className="font-medium">{file.name}</span>
                          {file.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <div className="col-span-2 text-muted-foreground">{file.category}</div>
                        <div className="col-span-2 text-muted-foreground">{file.size || "-"}</div>
                        <div className="col-span-1 text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {file.lastModified}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="starred">
          <Card>
            <CardHeader>
              <CardTitle>Starred Files</CardTitle>
              <CardDescription>Your favorite files and folders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="divide-y">
                  {filteredFiles
                    .filter((file) => file.starred)
                    .map((file) => (
                      <div key={file.id} className="grid grid-cols-12 p-4 text-sm items-center">
                        <div className="col-span-6 flex items-center gap-2">
                          {renderFileIcon(file)}
                          <span className="font-medium">{file.name}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="col-span-2 text-muted-foreground">{file.category}</div>
                        <div className="col-span-2 text-muted-foreground">{file.size || "-"}</div>
                        <div className="col-span-1 text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {file.lastModified}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trash">
          <Card>
            <CardHeader>
              <CardTitle>Trash</CardTitle>
              <CardDescription>Recently deleted files</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-8">
              <Trash2 className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Trash is Empty</h3>
              <p className="text-muted-foreground mb-4">Items in trash will be automatically deleted after 30 days</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
