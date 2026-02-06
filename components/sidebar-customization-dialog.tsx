"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings, GripVertical, Plus, Trash2, Download, Upload, RotateCcw, ChevronDown } from "lucide-react"
import { useSidebarCustomization } from "@/lib/contexts/sidebar-customization-context"
import { usePermissions } from "@/lib/rbac/rbac-context"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SortableItemProps {
  id: string
  children: React.ReactNode
}

function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center gap-2">
        <div {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        {children}
      </div>
    </div>
  )
}

export function SidebarCustomizationDialog() {
  const {
    sections,
    updateSectionVisibility,
    updateSectionCollapsed,
    updateItemVisibility,
    reorderSections,
    reorderItems,
    addCustomItem,
    removeCustomItem,
    resetToDefaults,
    exportSettings,
    importSettings,
  } = useSidebarCustomization()
  const { hasPermission } = usePermissions()
  const [importText, setImportText] = useState("")
  const [newItemForm, setNewItemForm] = useState({
    sectionId: "",
    title: "",
    href: "",
    description: "",
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id)
      const newIndex = sections.findIndex((section) => section.id === over.id)

      reorderSections(arrayMove(sections, oldIndex, newIndex))
    }
  }

  const handleItemDragEnd = (sectionId: string) => (event: DragEndEvent) => {
    const { active, over } = event
    const section = sections.find((s) => s.id === sectionId)
    if (!section || !over || active.id === over.id) return

    const oldIndex = section.items.findIndex((item) => item.id === active.id)
    const newIndex = section.items.findIndex((item) => item.id === over.id)

    reorderItems(sectionId, arrayMove(section.items, oldIndex, newIndex))
  }

  const handleExport = () => {
    const settings = exportSettings()
    const blob = new Blob([settings], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sidebar-settings.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    try {
      importSettings(importText)
      setImportText("")
    } catch (error) {
      alert("Invalid settings format")
    }
  }

  const handleAddCustomItem = () => {
    if (newItemForm.title && newItemForm.href && newItemForm.sectionId) {
      addCustomItem(newItemForm.sectionId, {
        title: newItemForm.title,
        href: newItemForm.href,
        icon: require("lucide-react").Link,
        category: newItemForm.sectionId,
        description: newItemForm.description,
      })
      setNewItemForm({ sectionId: "", title: "", href: "", description: "" })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Customize Sidebar</DialogTitle>
          <DialogDescription>
            Personalize your navigation experience by customizing sections, items, and their visibility.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="sections" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="custom">Custom Items</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Section Management</CardTitle>
                <CardDescription>Reorder sections and control their visibility and collapsed state.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSectionDragEnd}>
                    <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-2">
                        {sections.map((section) => (
                          <SortableItem key={section.id} id={section.id}>
                            <Card className="flex-1">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <h4 className="font-medium">{section.title}</h4>
                                    <Badge variant="secondary">
                                      {section.items.filter((item) => item.isVisible).length} items
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor={`section-${section.id}-visible`} className="text-sm">
                                        Visible
                                      </Label>
                                      <Switch
                                        id={`section-${section.id}-visible`}
                                        checked={section.isVisible}
                                        onCheckedChange={(checked) => updateSectionVisibility(section.id, checked)}
                                      />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor={`section-${section.id}-collapsed`} className="text-sm">
                                        Collapsed
                                      </Label>
                                      <Switch
                                        id={`section-${section.id}-collapsed`}
                                        checked={section.isCollapsed}
                                        onCheckedChange={(checked) => updateSectionCollapsed(section.id, checked)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </SortableItem>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {sections.map((section) => (
                  <Card key={section.id}>
                    <Collapsible defaultOpen>
                      <CardHeader className="pb-2">
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center justify-between cursor-pointer">
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </CollapsibleTrigger>
                      </CardHeader>
                      <CollapsibleContent>
                        <CardContent>
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleItemDragEnd(section.id)}
                          >
                            <SortableContext
                              items={section.items.map((item) => item.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="space-y-2">
                                {section.items.map((item) => {
                                  const hasRequiredPermission = !item.permission || hasPermission(item.permission)

                                  return (
                                    <SortableItem key={item.id} id={item.id}>
                                      <div className="flex items-center justify-between flex-1 p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                          <item.icon className="h-4 w-4" />
                                          <div>
                                            <div className="font-medium">{item.title}</div>
                                            {item.description && (
                                              <div className="text-sm text-muted-foreground">{item.description}</div>
                                            )}
                                          </div>
                                          {item.isCustom && <Badge variant="outline">Custom</Badge>}
                                          {item.permission && (
                                            <Badge variant={hasRequiredPermission ? "default" : "destructive"}>
                                              {item.permission}
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Switch
                                            checked={item.isVisible}
                                            onCheckedChange={(checked) => updateItemVisibility(item.id, checked)}
                                            disabled={!hasRequiredPermission}
                                          />
                                          {item.isCustom && (
                                            <Button variant="ghost" size="sm" onClick={() => removeCustomItem(item.id)}>
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </SortableItem>
                                  )
                                })}
                              </div>
                            </SortableContext>
                          </DndContext>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Custom Navigation Item</CardTitle>
                <CardDescription>Create custom navigation items for your frequently used pages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section-select">Section</Label>
                    <select
                      id="section-select"
                      className="w-full p-2 border rounded-md"
                      value={newItemForm.sectionId}
                      onChange={(e) => setNewItemForm((prev) => ({ ...prev, sectionId: e.target.value }))}
                    >
                      <option value="">Select a section</option>
                      {sections.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-title">Title</Label>
                    <Input
                      id="item-title"
                      placeholder="Navigation item title"
                      value={newItemForm.title}
                      onChange={(e) => setNewItemForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-href">URL</Label>
                  <Input
                    id="item-href"
                    placeholder="/custom-page"
                    value={newItemForm.href}
                    onChange={(e) => setNewItemForm((prev) => ({ ...prev, href: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-description">Description (Optional)</Label>
                  <Textarea
                    id="item-description"
                    placeholder="Brief description of this navigation item"
                    value={newItemForm.description}
                    onChange={(e) => setNewItemForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddCustomItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Item
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Export Settings</CardTitle>
                  <CardDescription>Download your sidebar configuration as a JSON file.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleExport} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Import Settings</CardTitle>
                  <CardDescription>Import a previously exported sidebar configuration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your exported settings JSON here..."
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleImport} className="w-full" disabled={!importText}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Reset to Defaults</CardTitle>
                  <CardDescription>Reset all sidebar customizations to the default configuration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={resetToDefaults} variant="destructive" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
