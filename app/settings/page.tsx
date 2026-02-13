import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LLMConfigProvider } from "@/lib/contexts/llm-config-context"
import { LLMConfigPanel } from "@/components/llm-config-panel"
import { TTSControls } from "@/components/tts-controls"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="tts">Text-to-Speech</TabsTrigger>
          <TabsTrigger value="llm">LLM Config</TabsTrigger>
        </TabsList>
          <UnifiedSettingsPanel />
        </div>
      </UnifiedSettingsProvider>
    </TTSProvider>
  )
}
