import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { transcript } = await request.json()

  const commands = [
    "go to dashboard",
    "open chat",
    "show files",
    "open knowledge base",
    "create agent",
    "show prompts",
    "open research",
    "show settings",
    "close",
  ]

  // Use fallback: match against commands using basic string matching
  // In production, this would call the actual AI service after credit card is added
  const lowerTranscript = transcript.toLowerCase()
  const matched = commands.find(
    (cmd) => lowerTranscript.includes(cmd) || cmd.split(" ").some((word) => lowerTranscript.includes(word))
  )

  return NextResponse.json({
    command: matched || "unknown",
    source: "local-matching",
  })
}
