import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
export const dynamic = "force-dynamic"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProgressProvider } from "@/lib/contexts/progress-context"
import { ProgressObserver } from "@/components/progress-observer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prompt Improver",
  description: "AI-powered prompt improvement suggestions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProgressProvider>
            <SidebarProvider>
              <ProgressObserver />
              <div className="flex min-h-screen w-full bg-background">
                <AppSidebar />
                <SidebarInset className="flex flex-1 flex-col min-w-0">
                  <Header />
                  <main className="flex-1 overflow-auto">
                    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">{children}</div>
                  </main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
