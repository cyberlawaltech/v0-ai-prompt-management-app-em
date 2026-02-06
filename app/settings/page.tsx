import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { TTSControls } from "@/components/tts-controls"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="profile" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="tts">Text-to-Speech</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Make changes to your profile here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Profile settings content */}
              <p>Profile settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Account settings content */}
              <p>Account settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Appearance settings content */}
              <p>Appearance settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Notification settings content */}
              <p>Notification settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Text-to-Speech Settings</CardTitle>
              <CardDescription>Configure voice synthesis settings for enhanced accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Text-to-Speech</Label>
                  <div className="text-sm text-muted-foreground">Allow text content to be read aloud</div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-play Responses</Label>
                  <div className="text-sm text-muted-foreground">Automatically read new chat responses</div>
                </div>
                <Switch />
              </div>

              <div className="space-y-4">
                <Label className="text-base">Voice Settings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tts-test">Test Voice</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="tts-test"
                        placeholder="Enter text to test voice..."
                        defaultValue="Hello! This is a test of the text-to-speech functionality."
                      />
                      <TTSControls
                        text="Hello! This is a test of the text-to-speech functionality."
                        variant="outline"
                        showSettings={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Reset to Defaults</h4>
                    <p className="text-sm text-muted-foreground">Reset all TTS settings to their default values</p>
                  </div>
                  <Button variant="outline">Reset Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
