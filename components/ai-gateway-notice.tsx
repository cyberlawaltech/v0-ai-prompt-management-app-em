'use client'

import { AlertCircle, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AIGatewayNotice() {
  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
          <CardTitle className="text-yellow-900 dark:text-yellow-100">AI Features Require Setup</CardTitle>
        </div>
        <CardDescription className="text-yellow-800 dark:text-yellow-200">
          AI-powered search and voice commands require credit card verification in your Vercel account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          The application is functioning normally with mock data fallbacks. To enable advanced AI features like:
        </p>
        <ul className="ml-4 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
          <li>• AI-powered search suggestions</li>
          <li>• Voice command interpretation</li>
          <li>• Natural language query processing</li>
        </ul>
        <Button
          asChild
          variant="outline"
          className="border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-900 bg-transparent"
        >
          <a href="https://vercel.com/account/billing/overview" target="_blank" rel="noopener noreferrer">
            Add Credit Card to Vercel
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
