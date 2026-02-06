import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shell } from "@/components/shell"
import { TTSControls } from "@/components/tts-controls"

const knowledgeBaseItems = [
  {
    title: "What is Acme Corp?",
    description: "Acme Corp is a fictional company that sells various products.",
    category: "General",
  },
  {
    title: "How do I contact support?",
    description: "You can contact support by emailing support@example.com.",
    category: "Support",
  },
  {
    title: "What are the shipping options?",
    description: "We offer standard and expedited shipping options.",
    category: "Shipping",
  },
  {
    title: "What is the return policy?",
    description: "We offer a 30-day return policy for most items.",
    category: "Returns",
  },
]

const KnowledgeBasePage = () => {
  return (
    <Shell>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {knowledgeBaseItems.map((item) => (
          <Card key={item.title}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <TTSControls text={`${item.title}. ${item.description}`} variant="ghost" size="sm" />
                  <Badge variant="outline">{item.category}</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Shell>
  )
}

export default KnowledgeBasePage
