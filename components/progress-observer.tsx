'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProgress } from '@/hooks/use-progress'

export function ProgressObserver() {
  const router = useRouter()
  const { start, complete } = useProgress()

  useEffect(() => {
    // Handle route changes
    const handleStart = () => {
      start()
    }

    const handleComplete = () => {
      complete()
    }

    // Intercept router events
    const handleRouterEvent = (event: any) => {
      if (event.type === 'routeChangeStart') {
        handleStart()
      } else if (event.type === 'routeChangeComplete' || event.type === 'routeChangeError') {
        handleComplete()
      }
    }

    // For Next.js 13+, we need to use a different approach
    // Listen for navigation using performance observer or manual tracking
    const originalPush = router.push
    const originalReplace = router.replace

    router.push = function (...args: any[]) {
      handleStart()
      return originalPush.apply(this, args).finally(handleComplete)
    }

    router.replace = function (...args: any[]) {
      handleStart()
      return originalReplace.apply(this, args).finally(handleComplete)
    }

    return () => {
      router.push = originalPush
      router.replace = originalReplace
    }
  }, [router, start, complete])

  return null
}
