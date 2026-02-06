# Progress Bar Implementation Guide

## Overview

The application now includes a beautiful, customizable progress bar system that provides visual feedback during page loads and data fetches. The solution is built with performance in mind and integrates seamlessly with the existing design system.

## Features

- **Automatic Route Tracking**: Automatically starts and completes when navigating between pages
- **Manual Control**: Use the `useProgress` hook for fine-grained control over progress
- **Customizable Styling**: Configure color, height, animations, and more
- **Smooth Animations**: Silk-smooth progress transitions with shimmer effects
- **Performance Optimized**: Minimal repaints, hardware-accelerated animations
- **Dark Mode Support**: Respects the application's theme system
- **Responsive**: Works seamlessly on all screen sizes
- **Optional Spinner**: Displays a rotating spinner while loading (configurable)

## Components

### ProgressBar (`/components/progress-bar.tsx`)
The main visual component that renders the progress bar. It displays:
- Main progress bar with gradient and glow effect
- Shimmer animation for visual appeal
- Optional spinner indicator
- Smooth transitions and animations

### ProgressProvider (`/lib/contexts/progress-context.tsx`)
React Context provider that manages global progress state:
- `progress`: Current progress percentage (0-100)
- `isLoading`: Loading state flag
- `config`: Configuration object for customization

### ProgressObserver (`/components/progress-observer.tsx`)
Client component that automatically observes Next.js router events and triggers progress updates.

### useProgress Hook (`/hooks/use-progress.tsx`)
React hook to access and control the progress bar from any component.

## Usage

### Basic Usage (Automatic)

The progress bar works automatically when navigating between pages. No additional code needed!

```tsx
// In any component, just navigate normally
import Link from 'next/link'

export function MyComponent() {
  return <Link href="/other-page">Go to other page</Link>
}
```

### Manual Control

For data fetches or async operations, use the `useProgress` hook:

```tsx
'use client'

import { useProgress } from '@/hooks/use-progress'
import { Button } from '@/components/ui/button'

export function DataFetch() {
  const { start, complete, increment } = useProgress()

  const handleFetch = async () => {
    start() // Start the progress bar

    try {
      const response = await fetch('/api/data')
      increment(50) // Manually increment progress
      
      const data = await response.json()
      increment(30) // More increments
      
      // Process data...
    } finally {
      complete() // Complete and reset
    }
  }

  return <Button onClick={handleFetch}>Fetch Data</Button>
}
```

### Configuration

Customize the progress bar appearance:

```tsx
'use client'

import { useProgress } from '@/hooks/use-progress'

export function ConfigureProgress() {
  const { setConfig } = useProgress()

  // Set custom configuration
  const handleConfigure = () => {
    setConfig({
      color: '#8b5cf6', // Custom color
      height: 5,        // Height in pixels
      showSpinner: true, // Show/hide spinner
      duration: 2000,   // Animation duration
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Custom easing
    })
  }

  return <button onClick={handleConfigure}>Configure</button>
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | string | `hsl(var(--primary))` | Progress bar color (hex, rgb, hsl) |
| `height` | number | 3 | Height in pixels |
| `duration` | number | 2000 | Animation duration in milliseconds |
| `showSpinner` | boolean | true | Show spinning indicator |
| `easing` | string | `cubic-bezier(0.4, 0, 0.2, 1)` | CSS easing function |
| `minimumTime` | number | 400 | Minimum time to show progress bar |

## API Reference

### useProgress Hook

```tsx
const {
  progress,      // Current progress (0-100)
  isLoading,     // Is currently loading
  config,        // Current configuration
  start,         // Start progress
  complete,      // Complete progress
  increment,     // Increment by amount (default: 10)
  setProgress,   // Set to specific value
  setConfig,     // Update configuration
} = useProgress()
```

## Examples

### Example 1: File Upload with Progress

```tsx
'use client'

import { useProgress } from '@/hooks/use-progress'

export function FileUpload() {
  const { start, complete, setProgress } = useProgress()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    start()

    const formData = new FormData()
    formData.append('file', file)

    try {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100
          setProgress(percentComplete)
        }
      })

      xhr.addEventListener('load', () => {
        complete()
      })

      xhr.open('POST', '/api/upload')
      xhr.send(formData)
    } catch (error) {
      complete()
    }
  }

  return <input type="file" onChange={handleUpload} />
}
```

### Example 2: API Call with Simulated Progress

```tsx
'use client'

import { useProgress } from '@/hooks/use-progress'
import { Button } from '@/components/ui/button'

export function SlowApiCall() {
  const { start, complete, increment } = useProgress()

  const handleFetch = async () => {
    start()

    try {
      // Simulate delay stages
      await new Promise(resolve => setTimeout(resolve, 500))
      increment(30)

      await new Promise(resolve => setTimeout(resolve, 500))
      increment(30)

      const response = await fetch('/api/slow-endpoint')
      increment(20)

      const data = await response.json()
      // Process data...
    } finally {
      complete()
    }
  }

  return <Button onClick={handleFetch}>Slow API Call</Button>
}
```

### Example 3: Sequential Operations

```tsx
'use client'

import { useProgress } from '@/hooks/use-progress'

export function SequentialOps() {
  const { start, complete, increment } = useProgress()

  const handleProcess = async () => {
    start()

    try {
      // Step 1: Fetch data
      await fetchData()
      increment(25)

      // Step 2: Process data
      await processData()
      increment(25)

      // Step 3: Validate data
      await validateData()
      increment(25)

      // Step 4: Save data
      await saveData()
      increment(25)
    } finally {
      complete()
    }
  }

  return <button onClick={handleProcess}>Process</button>
}
```

## Performance Considerations

- **Hardware Acceleration**: Uses CSS transforms for smooth 60fps animations
- **Minimal Repaints**: Progress bar is positioned fixed and doesn't trigger layout recalculations
- **Debounced Updates**: Prevents excessive state updates
- **Cleanup**: Automatically stops animations and cleans up resources

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Troubleshooting

### Progress bar not showing

1. Ensure `ProgressProvider` wraps your app (it does in `app/layout.tsx`)
2. Check that `ProgressBar` component is rendered
3. Verify `useProgress` is called within a component wrapped by `ProgressProvider`

### Progress bar stuck

The progress bar has a maximum time it will show. If stuck:
1. Call `complete()` to finish
2. Reset will occur automatically after animation

### Color not applying

1. Check color format (hex, rgb, hsl all supported)
2. Verify color value is valid CSS
3. Use browser DevTools to inspect the element

## Best Practices

1. **Use for meaningful operations**: Show progress for operations taking >500ms
2. **Call `complete()`**: Always call `complete()` in a finally block
3. **Increment sensibly**: Use realistic progress increments (don't jump to 100% at 10%)
4. **Consider UX**: Don't show progress for very quick operations (<100ms)
5. **Test on slow networks**: Use DevTools throttling to verify behavior

## Future Enhancements

- [ ] Indeterminate progress mode (infinite animation)
- [ ] Multiple simultaneous progress bars
- [ ] Progress buffer/secondary progress
- [ ] Custom easing functions library
- [ ] Progress bar position options (top/bottom)
- [ ] Sound effects support

## Support

For issues or questions, refer to the component source files:
- `/lib/contexts/progress-context.tsx` - State management
- `/components/progress-bar.tsx` - Visual component
- `/components/progress-observer.tsx` - Router integration
- `/hooks/use-progress.tsx` - Hook API
