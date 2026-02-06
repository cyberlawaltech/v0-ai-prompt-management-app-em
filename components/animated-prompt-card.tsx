"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Edit, Star, Clock, Bookmark, BookmarkCheck } from "lucide-react"

interface PromptCardProps {
  id: number
  title: string
  description: string
  category: string
  lastUsed: string
  rating: number
  onEdit?: (id: number) => void
  onUse?: (id: number) => void
}

export function AnimatedPromptCard({
  id,
  title,
  description,
  category,
  lastUsed,
  rating,
  onEdit,
  onUse,
}: PromptCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const toggleSaved = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col h-full">
          <CardHeader className="relative">
            <motion.div className="absolute right-4 top-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={toggleSaved}>
                {isSaved ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
                <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
              </Button>
            </motion.div>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{description}</CardDescription>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <Badge variant="outline" className="mt-2">
                {category}
              </Badge>
            </motion.div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Last used: {lastUsed}</span>
              <div className="ml-4 flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{rating}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-3">
            <div className="flex flex-row gap-2 w-full">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                <Button variant="outline" size="sm" className="w-full transition-colors" onClick={() => onEdit?.(id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                <Button size="sm" className="w-full transition-colors" onClick={() => onUse?.(id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Use
                </Button>
              </motion.div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
