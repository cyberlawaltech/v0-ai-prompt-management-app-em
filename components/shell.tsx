import type React from "react"

interface ShellProps {
  children: React.ReactNode
  className?: string
}

/**
 * Shell component - A layout wrapper for page content
 * Provides consistent spacing and styling for page containers
 */
export function Shell({ children, className = "" }: ShellProps) {
  return (
    <div className={`w-full space-y-6 ${className}`}>
      {children}
    </div>
  )
}

export default Shell
