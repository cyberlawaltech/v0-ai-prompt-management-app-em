import { AnimatedPromptCard } from "@/components/animated-prompt-card"

const recentPrompts = [
  {
    id: 1,
    title: "SEO Content Generator",
    description: "Generate SEO-optimized content for blog posts",
    category: "Marketing",
    lastUsed: "2 hours ago",
    rating: 4.8,
  },
  {
    id: 2,
    title: "React Component Creator",
    description: "Create React components with TypeScript",
    category: "Development",
    lastUsed: "Yesterday",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Customer Support Email",
    description: "Generate professional customer support responses",
    category: "Customer Support",
    lastUsed: "3 days ago",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Product Description Writer",
    description: "Create compelling product descriptions for e-commerce",
    category: "Marketing",
    lastUsed: "1 week ago",
    rating: 4.6,
  },
]

export function RecentPrompts() {
  const handleEdit = (id: number) => {
    console.log("Edit prompt:", id)
  }

  const handleUse = (id: number) => {
    console.log("Use prompt:", id)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {recentPrompts.map((prompt) => (
        <AnimatedPromptCard
          key={prompt.id}
          id={prompt.id}
          title={prompt.title}
          description={prompt.description}
          category={prompt.category}
          lastUsed={prompt.lastUsed}
          rating={prompt.rating}
          onEdit={handleEdit}
          onUse={handleUse}
        />
      ))}
    </div>
  )
}
