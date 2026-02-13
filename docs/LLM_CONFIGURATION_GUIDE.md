# LLM Configuration Panel Guide

## Overview

The LLM Configuration Panel provides a comprehensive interface for selecting and customizing large language models directly within the application settings. With support for 10+ open-source LLMs and extensible architecture, users can seamlessly switch between models and fine-tune their parameters.

## Features

### 1. **Model Browser**
- Browse 10+ curated open-source LLMs
- Search by name and description
- Filter by provider (Meta, Mistral, HuggingFace, etc.)
- Star/favorite models for quick access
- Detailed model specifications and capabilities

### 2. **Dynamic Parameter Configuration**
- Temperature control for output randomness
- Max tokens configuration for output length
- Top-P (nucleus sampling) for diversity control
- Top-K sampling for filtering
- Custom endpoint and API key configuration
- Type-safe parameter validation

### 3. **Model Information Display**
- Context window specifications
- Maximum output token limits
- Model capabilities overview
- Provider information
- Release date tracking
- Pricing estimates (when available)

### 4. **Persistence & Favorites**
- Automatic settings persistence to localStorage
- Favorite models for quick access
- Configuration history tracking
- Export/import capabilities

## Supported Open-Source LLMs

### Meta Models
- **Llama 2 7B** - Efficient general-purpose model
- **Llama 2 13B** - Enhanced performance model
- **Code Llama 7B** - Code generation specialist

### Mistral Models
- **Mistral 7B** - Efficient with large context window (32K)

### HuggingFace Models
- **Neural Chat 7B** - Dialogue-optimized
- **Zephyr 7B** - Instruction-tuned variant
- **OpenChat 3.5** - Fast and efficient
- **Falcon 7B** - Large training corpus
- **Vicuna 7B v1.5** - Conversation specialist
- **Orca 2 7B** - Enhanced reasoning

## Architecture

### Components

#### LLMConfigPanel
Main configuration interface with two tabs:
- **Browse Models**: Discovery and selection interface
- **Configure Selected**: Parameter customization

#### LLMModelSelector
Individual model card component showing:
- Model name and description
- Provider badge
- Context/output specifications
- Capability tags
- Favorite toggle
- Selection button

#### LLMParametersPanel
Dynamic parameter configuration based on model capabilities:
- Slider inputs for numeric values
- Text inputs for string values
- Dropdown selects for predefined options
- Boolean toggles for feature flags

### Context (LLMConfigContext)

Provides global state management:
```typescript
{
  currentConfig: LLMConfiguration | null
  availableModels: LLMModel[]
  favoriteModels: string[]
  setCurrentConfig: (config: LLMConfiguration) => void
  updateModelParameter: (key: string, value: any) => void
  addFavoriteModel: (modelId: string) => void
  removeFavoriteModel: (modelId: string) => void
  addCustomModel: (model: LLMModel) => void
  getModelById: (modelId: string) => LLMModel | undefined
  resetToDefaults: () => void
  saveSettings: () => void
}
```

## Extensibility

### Adding New Models

To add new models to the system:

1. **Add to TOP_OPEN_SOURCE_LLMS in `/lib/types/llm.ts`:**

```typescript
{
  id: "model-id",
  name: "Display Name",
  displayName: "Full Display Name",
  provider: "provider-name",
  description: "Model description",
  contextWindow: 4096,
  maxTokens: 4096,
  releaseDate: "YYYY-MM",
  capabilities: ["capability1", "capability2"],
  supportedParameters: [
    {
      key: "temperature",
      name: "Temperature",
      description: "Parameter description",
      type: "number",
      default: 0.7,
      min: 0,
      max: 2,
      step: 0.1,
      required: false,
    },
    // ... more parameters
  ],
}
```

2. **Custom Parameter Types:**

The system supports multiple parameter types:
- `number`: Numeric values with min/max/step
- `string`: Text input fields
- `select`: Dropdown with predefined options
- `boolean`: Toggle switches

### Adding New Providers

1. Update the `LLMProvider` type in `/lib/types/llm.ts`:

```typescript
export type LLMProvider = "openai" | "anthropic" | "meta" | "google" | "mistral" | "cohere" | "huggingface" | "custom" | "new-provider"
```

2. Create models with the new provider value
3. No UI changes needed - filtering works automatically

### Custom Model Management

Users can add custom models programmatically:

```typescript
const { addCustomModel } = useLLMConfig()

const customModel: LLMModel = {
  // ... model definition
}

addCustomModel(customModel)
```

## Usage Example

### In Components

```typescript
import { useLLMConfig } from '@/lib/contexts/llm-config-context'

export function MyComponent() {
  const { currentConfig, updateModelParameter, saveSettings } = useLLMConfig()

  const handleTemperatureChange = (value: number) => {
    updateModelParameter('temperature', value)
  }

  const handleSave = () => {
    saveSettings()
  }

  return (
    <div>
      {currentConfig && (
        <>
          <p>Selected: {currentConfig.modelName}</p>
          {/* Components */}
        </>
      )}
    </div>
  )
}
```

### Configuration Shape

```typescript
interface LLMConfiguration {
  modelId: string
  modelName: string
  provider: LLMProvider
  parameters: Record<string, number | string | boolean>
  customEndpoint?: string
  apiKey?: string
  createdAt: string
  updatedAt: string
}
```

## Storage

Configuration is persisted to localStorage as `llm-settings`:

```json
{
  "selectedModel": {
    "modelId": "llama2-7b",
    "modelName": "Meta Llama 2 7B",
    "provider": "meta",
    "parameters": {
      "temperature": 0.7,
      "maxTokens": 512,
      "topP": 0.9
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "favoriteModels": ["llama2-7b", "mistral-7b"],
  "customModels": []
}
```

## Performance Considerations

- Model list is loaded once and cached in context
- Search/filter operations are memoized
- localStorage updates are debounced
- Parameter updates don't trigger full re-renders

## Future Enhancements

- API key management with encryption
- Model performance benchmarks
- Pricing calculator for API-based models
- Model comparison tool
- Configuration presets/templates
- Import/export configurations
- Real-time model health status
- Fine-tuning interface
- Model version management

## Troubleshooting

### Settings Not Saving
- Check browser localStorage limits
- Clear browser cache and retry
- Check browser console for errors

### Model Not Appearing
- Ensure model ID is unique
- Check parameter definitions for syntax errors
- Verify provider name is valid

### Parameter Updates Not Working
- Ensure parameter type matches input type
- Check min/max constraints
- Verify parameter key matches model definition
