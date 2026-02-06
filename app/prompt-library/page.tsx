import { TTSControls } from "@/components/tts-controls"

const PromptLibraryPage = () => {
  const prompts = [
    {
      id: 1,
      title: "Write a short story about a cat detective.",
      description: "A feline detective investigates a mysterious disappearance in a small town.",
    },
    {
      id: 2,
      title: "Generate a poem about the beauty of nature.",
      description: "Capture the essence of nature's beauty in a heartfelt poem.",
    },
    {
      id: 3,
      title: "Create a marketing slogan for a new coffee shop.",
      description: "Develop a catchy and memorable slogan for a coffee shop.",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Prompt Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{prompt.title}</h2>
              <TTSControls text={prompt.title} />
            </div>
            <p className="text-gray-700">{prompt.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromptLibraryPage
