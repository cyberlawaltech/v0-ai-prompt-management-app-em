"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function SidebarControl() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMobile()

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  useEffect(() => {
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.getElementById("main-content")

    if (sidebar && mainContent) {
      if (sidebarOpen) {
        sidebar.style.display = "block"
        sidebar.style.width = "15rem" // 60 in tailwind
        mainContent.style.marginLeft = "0" // Remove margin to reduce gap
      } else {
        sidebar.style.display = "none"
        sidebar.style.width = "0"
        mainContent.style.marginLeft = "0"
      }
    }
  }, [sidebarOpen])

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 left-4 z-50 rounded-full shadow-md"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Button>
  )
}
