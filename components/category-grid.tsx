import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Code, PenTool, Brain, ChevronRight, BarChart } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Customer Support",
    description: "Prompts for customer service and support",
    icon: MessageSquare,
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    count: 24,
    href: "/prompt-library/customer-support",
  },
  {
    title: "Developer Tools",
    description: "Prompts for coding and development",
    icon: Code,
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    count: 32,
    href: "/prompt-library/developer-tools",
  },
  {
    title: "Growth Marketing",
    description: "Prompts for marketing and growth",
    icon: BarChart,
    color: "bg-green-100",
    iconColor: "text-green-500",
    count: 18,
    href: "/prompt-library/growth-marketing",
  },
  {
    title: "Design Tools",
    description: "Prompts for design and creativity",
    icon: PenTool,
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    count: 27,
    href: "/prompt-library/design-tools",
  },
  {
    title: "AI Agents",
    description: "Prompts for creating AI agents",
    icon: Brain,
    color: "bg-red-100",
    iconColor: "text-red-500",
    count: 15,
    href: "/prompt-library/ai-agents",
  },
]

export function CategoryGrid() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-semibold">Categories</h2>
        <Button variant="ghost" size="sm" asChild className="self-start sm:self-auto">
          <Link href="/prompt-library">
            See all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 group"
          >
            <CardHeader className={`${category.color} pb-2 transition-colors duration-200`}>
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-md ${category.color} mr-3 transition-transform duration-200 group-hover:scale-110`}
                >
                  <category.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${category.iconColor}`} />
                </div>
                <CardTitle className="text-sm sm:text-lg leading-tight">{category.title}</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-3 sm:pt-4">
              <div className="text-xs sm:text-sm text-muted-foreground">{category.count} prompts available</div>
            </CardContent>
            <CardFooter className="border-t p-2 sm:p-3 bg-slate-50">
              <Button variant="ghost" size="sm" className="w-full text-xs sm:text-sm h-8 sm:h-9" asChild>
                <Link href={category.href}>
                  Browse prompts
                  <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
