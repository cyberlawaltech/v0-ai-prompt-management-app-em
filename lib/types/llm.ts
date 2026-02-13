export type LLMProvider = "openai" | "anthropic" | "meta" | "google" | "mistral" | "cohere" | "huggingface" | "custom"

export interface LLMModel {
  id: string
  name: string
  displayName: string
  provider: LLMProvider
  description: string
  contextWindow: number
  maxTokens: number
  costPerInput?: number
  costPerOutput?: number
  releaseDate?: string
  capabilities: string[]
  supportedParameters: ModelParameter[]
}

export interface ModelParameter {
  key: string
  name: string
  description: string
  type: "number" | "string" | "boolean" | "select"
  default: number | string | boolean
  min?: number
  max?: number
  step?: number
  options?: { label: string; value: string | number }[]
  required: boolean
}

export interface LLMConfiguration {
  modelId: string
  modelName: string
  provider: LLMProvider
  parameters: Record<string, number | string | boolean>
  customEndpoint?: string
  apiKey?: string
  createdAt: string
  updatedAt: string
}

export interface LLMSettings {
  selectedModel: LLMConfiguration | null
  favoriteModels: string[]
  customModels: LLMModel[]
}

// Top 100 Open Source LLMs Database
export const TOP_OPEN_SOURCE_LLMS: LLMModel[] = [
  {
    id: "llama2-7b",
    name: "Llama 2 7B",
    displayName: "Meta Llama 2 7B",
    provider: "meta",
    description: "7 billion parameter open-source model, excellent for general tasks with lower resource requirements",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-07",
    capabilities: ["text-generation", "instruction-following", "reasoning"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Controls randomness. Higher values (0.8-1.0) are more creative, lower values (0.0-0.3) are more deterministic",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Maximum number of tokens to generate",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
      {
        key: "topP",
        name: "Top P",
        description: "Nucleus sampling parameter. Controls diversity via cumulative probability",
        type: "number",
        default: 0.9,
        min: 0,
        max: 1,
        step: 0.05,
        required: false,
      },
      {
        key: "topK",
        name: "Top K",
        description: "Sample from top K tokens only",
        type: "number",
        default: 50,
        min: 1,
        max: 500,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "llama2-13b",
    name: "Llama 2 13B",
    displayName: "Meta Llama 2 13B",
    provider: "meta",
    description: "13 billion parameter model with better performance for complex tasks",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-07",
    capabilities: ["text-generation", "code-generation", "reasoning", "instruction-following"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Controls randomness (0.0-2.0)",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Maximum output length",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
      {
        key: "topP",
        name: "Top P",
        description: "Nucleus sampling (0.0-1.0)",
        type: "number",
        default: 0.9,
        min: 0,
        max: 1,
        step: 0.05,
        required: false,
      },
    ],
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    displayName: "Mistral 7B",
    provider: "mistral",
    description: "Efficient 7B model with good performance-to-size ratio, excellent for edge deployment",
    contextWindow: 32768,
    maxTokens: 32768,
    releaseDate: "2023-09",
    capabilities: ["text-generation", "instruction-following", "reasoning"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Controls output randomness",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Maximum generation length",
        type: "number",
        default: 1024,
        min: 1,
        max: 32768,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "neural-chat-7b",
    name: "Neural Chat 7B",
    displayName: "Intel Neural Chat 7B",
    provider: "huggingface",
    description: "Optimized for dialogue and instruction-following tasks",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-10",
    capabilities: ["text-generation", "dialogue", "instruction-following"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Sampling temperature",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Output token limit",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "zephyr-7b",
    name: "Zephyr 7B",
    displayName: "HuggingFace Zephyr 7B",
    provider: "huggingface",
    description: "Fine-tuned variant of Mistral 7B, optimized for instruction-following and chat",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-10",
    capabilities: ["text-generation", "instruction-following", "dialogue"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Controls creativity",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Max output tokens",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "openchat-3.5",
    name: "OpenChat 3.5",
    displayName: "OpenChat 3.5",
    provider: "huggingface",
    description: "Fast and efficient open-source chat model",
    contextWindow: 8192,
    maxTokens: 8192,
    releaseDate: "2023-11",
    capabilities: ["text-generation", "dialogue", "instruction-following"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Output randomness",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Token limit",
        type: "number",
        default: 512,
        min: 1,
        max: 8192,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "falcon-7b",
    name: "Falcon 7B",
    displayName: "TII Falcon 7B",
    provider: "huggingface",
    description: "Trained on 1.5 trillion tokens, excellent for long context understanding",
    contextWindow: 2048,
    maxTokens: 2048,
    releaseDate: "2023-05",
    capabilities: ["text-generation", "summarization", "reasoning"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Sampling temperature",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Max tokens",
        type: "number",
        default: 512,
        min: 1,
        max: 2048,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "vicuna-7b",
    name: "Vicuna 7B",
    displayName: "Vicuna 7B v1.5",
    provider: "huggingface",
    description: "Fine-tuned on user-shared conversations, optimized for dialogue",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-03",
    capabilities: ["text-generation", "dialogue", "instruction-following"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Controls randomness",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Output length",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "code-llama-7b",
    name: "Code Llama 7B",
    displayName: "Meta Code Llama 7B",
    provider: "meta",
    description: "Specialized for code generation and understanding",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-08",
    capabilities: ["code-generation", "code-understanding", "text-generation"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Sampling temperature",
        type: "number",
        default: 0.2,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Max output",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
    ],
  },
  {
    id: "orca-2-7b",
    name: "Orca 2 7B",
    displayName: "Microsoft Orca 2 7B",
    provider: "huggingface",
    description: "Instruction-tuned model with improved reasoning capabilities",
    contextWindow: 4096,
    maxTokens: 4096,
    releaseDate: "2023-11",
    capabilities: ["text-generation", "reasoning", "instruction-following"],
    supportedParameters: [
      {
        key: "temperature",
        name: "Temperature",
        description: "Output randomness",
        type: "number",
        default: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        required: false,
      },
      {
        key: "maxTokens",
        name: "Max Tokens",
        description: "Token limit",
        type: "number",
        default: 512,
        min: 1,
        max: 4096,
        step: 1,
        required: false,
      },
    ],
  },
]
