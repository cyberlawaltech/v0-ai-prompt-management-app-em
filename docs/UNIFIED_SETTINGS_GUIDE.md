# Unified Settings System Guide

## Overview

The Unified Settings System provides a centralized, comprehensive configuration interface that consolidates all application feature settings into a single, cohesive panel. This system is designed for scalability, allowing new features and settings to be added without significant redesign.

## Architecture

### Context-Based State Management

The system uses React Context (`UnifiedSettingsContext`) for managing all settings across the application:

```typescript
const {
  settings,              // All settings organized by section
  expandedSections,      // Currently expanded section tabs
  updateSettings,        // Update single setting
  updateMultipleSettings,// Update multiple settings at once
  getSectionSettings,    // Retrieve settings for a section
  toggleSection,         // Toggle section expansion
  resetSettings,         // Reset to defaults
  exportSettings,        // Export as JSON
  importSettings,        // Import from JSON
} = useUnifiedSettings()
```

### Feature Sections

The settings are organized into distinct sections:

1. **AI & Models** (`ai`)
   - LLM Configuration
   - Web Scraping Settings
   - Voice Control

2. **Accessibility** (`accessibility`)
   - Text-to-Speech (TTS)
   - Keyboard Navigation
   - Display Options

3. **Appearance** (`appearance`)
   - Theme Selection
   - Layout Options
   - Visual Effects
   - Sidebar Customization

4. **Notifications** (`notifications`)
   - General Notification Preferences
   - Notification Types
   - Quiet Hours (Do Not Disturb)

## Key Features

### 1. Search & Filter
Users can search for specific settings across all sections. The search queries both title and description of each section.

```typescript
const filteredSections = sections.filter(
  (section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
)
```

### 2. Collapsible Sections
Each feature section can be expanded or collapsed independently, maintaining the expansion state in localStorage.

### 3. Persistent Storage
All settings are automatically saved to `localStorage` under the key `unified-settings`, with automatic restoration on app load.

### 4. Import/Export
Users can export all settings as JSON and import them later or share them with others:

```typescript
// Export
const settingsJSON = exportSettings() // Returns stringified JSON

// Import
const success = importSettings(jsonString) // Returns boolean
```

### 5. Reset Functionality
Users can reset individual sections or all settings at once with confirmation.

## Adding New Settings

### Step 1: Create a New Settings Section Component

```typescript
// components/settings-sections/my-feature-settings.tsx
'use client'

import { useUnifiedSettings } from '@/lib/contexts/unified-settings-context'

export function MyFeatureSettings() {
  const { getSectionSettings, updateMultipleSettings } = useUnifiedSettings()
  const settings = getSectionSettings('myfeature') as any || {}

  return (
    <div className="space-y-4">
      {/* Your settings UI here */}
    </div>
  )
}
```

### Step 2: Register the Section

Add your section to the sections array in `unified-settings-panel.tsx`:

```typescript
const sections: SettingsSection[] = [
  // ... existing sections
  {
    id: 'myfeature',
    title: 'My Feature',
    description: 'Configure my awesome feature',
    icon: '⚡',
    component: MyFeatureSettings,
  },
]
```

### Step 3: Use the Settings

Access settings in your components:

```typescript
const { getSectionSettings, updateMultipleSettings } = useUnifiedSettings()

// Get settings
const mySettings = getSectionSettings('myfeature')

// Update settings
updateMultipleSettings('myfeature', {
  setting1: value1,
  setting2: value2,
})
```

## Data Storage Structure

Settings are stored in localStorage as:

```json
{
  "ai": {
    "llmModel": "gpt-4",
    "temperature": 0.7
  },
  "accessibility": {
    "ttsEnabled": true,
    "ttsRate": 1
  },
  "appearance": {
    "theme": "dark",
    "sidebarAutoCollapse": true
  },
  "notifications": {
    "enabled": true,
    "sound": true,
    "doNotDisturb": false
  }
}
```

Expanded sections state is stored separately in `expanded-sections`:

```json
["ai", "accessibility"]
```

## Migration from Old Settings

If migrating from separate settings components, follow this process:

1. Create the new unified section component
2. Map old localStorage keys to new section structure
3. Provide migration logic in the context provider
4. Update app layout to wrap with `UnifiedSettingsProvider`

## Component Integration

Wrap your app with the providers:

```typescript
// app/layout.tsx or at settings page level
<TTSProvider>
  <UnifiedSettingsProvider>
    {children}
  </UnifiedSettingsProvider>
</TTSProvider>
```

## Best Practices

1. **Group Related Settings**: Keep related settings together in the same section
2. **Use Meaningful Keys**: Use descriptive keys for settings (e.g., `ttsRate` instead of `rate`)
3. **Lazy Load When Possible**: Complex settings components can be code-split
4. **Provide Sensible Defaults**: All settings should have defaults
5. **Document Settings**: Add descriptions to each setting
6. **Maintain State Consistency**: Use `updateMultipleSettings` for related changes

## Future Extensibility

The system is designed for easy extension:

- Add new sections without modifying core logic
- Create new section components following the pattern
- Support for different data types (strings, numbers, booleans, objects, arrays)
- Possible future additions:
  - Settings presets/profiles
  - Settings synchronization across devices
  - Conditional/dependent settings
  - Settings validation rules
  - Audit logging for settings changes

## Performance Considerations

- Settings are loaded once on app mount
- Individual updates only trigger targeted re-renders
- localStorage operations are debounced
- Search filtering is optimized with useMemo
- Large settings arrays can be paginated if needed

## Troubleshooting

### Settings Not Persisting
- Check if localStorage is enabled in the browser
- Verify the UnifiedSettingsProvider is wrapping your component
- Check browser console for errors

### Settings Not Updating
- Ensure you're using `updateMultipleSettings` or `updateSettings`
- Check that the section ID matches exactly
- Verify the component is using the `useUnifiedSettings` hook

### Performance Issues
- Consider breaking down large sections into sub-tabs
- Implement pagination for extensive option lists
- Use React.memo for complex setting components
