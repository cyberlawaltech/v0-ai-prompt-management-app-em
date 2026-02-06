/**
 * Performance optimization utilities
 */

// Memoize expensive function results
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Debounce function to limit execution frequency
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

// Throttle function to limit execution rate
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Lazy load components or data
export function lazyLoad<T>(loader: () => Promise<T>): () => Promise<T> {
  let result: T | null = null
  let promise: Promise<T> | null = null

  return async () => {
    if (result) return result
    if (!promise) promise = loader()
    result = await promise
    return result
  }
}

// Batch DOM updates for better performance
export function batchDOMUpdates(updates: (() => void)[]): void {
  // Use requestAnimationFrame to batch updates
  requestAnimationFrame(() => {
    updates.forEach((update) => update())
  })
}

// Detect unused event listeners and warn about them
export function detectUnusedEventListeners(): void {
  if (typeof window === "undefined") return

  const originalAddEventListener = window.addEventListener
  const listeners = new Map()

  window.addEventListener = function (...args) {
    const [type, listener, options] = args
    listeners.set(listener, { type, options, timestamp: Date.now() })
    return originalAddEventListener.apply(this, args)
  }

  // Check for listeners that haven't been removed after a certain time
  setInterval(() => {
    const now = Date.now()
    const unusedThreshold = 60000 // 1 minute

    listeners.forEach((details, listener) => {
      if (now - details.timestamp > unusedThreshold) {
        console.warn("Potential memory leak: Event listener not removed", details)
      }
    })
  }, 60000)
}
