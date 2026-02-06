'use client'

import { useState } from 'react'
import { useProgress } from '@/hooks/use-progress'
import { Button } from '@/components/ui/button'

export function ProgressDemo() {
  const { start, complete, increment, setConfig } = useProgress()
  const [demoActive, setDemoActive] = useState(false)

  const handleStart = () => {
    setDemoActive(true)
    start()
  }

  const handleComplete = () => {
    complete()
    setDemoActive(false)
  }

  const handleIncrement = () => {
    increment(10)
  }

  const handleColorChange = (color: string) => {
    setConfig({ color })
  }

  const handleHeightChange = (height: number) => {
    setConfig({ height })
  }

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      <div>
        <h3 className="text-lg font-semibold mb-4">Progress Bar Demo</h3>
        <p className="text-sm text-muted-foreground mb-6">Test the progress bar with different configurations and manual controls.</p>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleStart}
          disabled={demoActive}
          className="bg-primary hover:bg-primary/90"
        >
          Start Loading
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!demoActive}
          variant="outline"
        >
          Complete
        </Button>
        <Button
          onClick={handleIncrement}
          disabled={!demoActive}
          variant="secondary"
        >
          Increment +10%
        </Button>
      </div>

      {/* Color Configuration */}
      <div>
        <label className="text-sm font-medium mb-2 block">Bar Color</label>
        <div className="flex gap-2 flex-wrap">
          {[
            { name: 'Blue', color: 'hsl(var(--primary))' },
            { name: 'Green', color: '#10b981' },
            { name: 'Purple', color: '#8b5cf6' },
            { name: 'Red', color: '#ef4444' },
            { name: 'Amber', color: '#f59e0b' },
          ].map(({ name, color }) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: color,
                color: 'white',
                opacity: 0.8,
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Height Configuration */}
      <div>
        <label className="text-sm font-medium mb-2 block">Bar Height</label>
        <div className="flex gap-2 flex-wrap">
          {[2, 3, 4, 6, 8].map((h) => (
            <Button
              key={h}
              onClick={() => handleHeightChange(h)}
              variant="outline"
              size="sm"
            >
              {h}px
            </Button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground pt-4 border-t">
        <p>The progress bar automatically appears when navigating between pages or can be controlled manually using the useProgress hook.</p>
      </div>
    </div>
  )
}
