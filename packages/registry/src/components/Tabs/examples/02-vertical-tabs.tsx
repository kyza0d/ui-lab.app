import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Card } from 'ui-lab-components';
import { User, Settings, Bell, Shield } from 'lucide-react';

export const metadata = {
  title: 'Vertical Tabs (Sidebar)',
  description: 'A vertical tab layout ideal for settings pages or sidebar navigation. Tabs are stacked vertically with content panels beside them.'
};

export default function Example() {
  return (
    <div className="flex items-center justify-center bg-background-950 p-4 min-h-[400px]">
      <Card className="w-full max-w-2xl">
        <Tabs defaultValue="profile" className="flex flex-row">
          {/* Vertical tab list - styled as sidebar */}
          <TabsList
            aria-label="Settings sections"
            className="flex-col items-stretch justify-start h-auto w-48 border-r border-background-700 rounded-none bg-transparent p-2"
          >
            <TabsTrigger value="profile" icon={<User className="w-4 h-4" />} className="justify-start">
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" icon={<Bell className="w-4 h-4" />} className="justify-start">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" icon={<Shield className="w-4 h-4" />} className="justify-start">
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" icon={<Settings className="w-4 h-4" />} className="justify-start">
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Content panels */}
          <div className="flex-1 p-6">
            <TabsContent value="profile" className="mt-0">
              <h3 className="text-lg font-semibold text-foreground-100 mb-2">Profile Settings</h3>
              <p className="text-foreground-400 text-sm mb-4">
                Manage your personal information and how others see you on the platform.
              </p>
              <div className="space-y-3">
                <div className="h-10 w-full bg-background-800 rounded border border-background-700" />
                <div className="h-10 w-full bg-background-800 rounded border border-background-700" />
                <div className="h-10 w-2/3 bg-background-800 rounded border border-background-700" />
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <h3 className="text-lg font-semibold text-foreground-100 mb-2">Notification Preferences</h3>
              <p className="text-foreground-400 text-sm mb-4">
                Control how and when you receive alerts and updates.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-accent-500 rounded" />
                  <div className="h-4 w-32 bg-background-800 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-background-700 rounded" />
                  <div className="h-4 w-40 bg-background-800 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-accent-500 rounded" />
                  <div className="h-4 w-28 bg-background-800 rounded" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <h3 className="text-lg font-semibold text-foreground-100 mb-2">Security Settings</h3>
              <p className="text-foreground-400 text-sm mb-4">
                Protect your account with passwords, two-factor authentication, and more.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-background-800 rounded border border-background-700">
                  <div className="h-4 w-24 bg-background-700 rounded mb-2" />
                  <div className="h-3 w-48 bg-background-700/50 rounded" />
                </div>
                <div className="p-3 bg-background-800 rounded border border-background-700">
                  <div className="h-4 w-32 bg-background-700 rounded mb-2" />
                  <div className="h-3 w-40 bg-background-700/50 rounded" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="mt-0">
              <h3 className="text-lg font-semibold text-foreground-100 mb-2">General Preferences</h3>
              <p className="text-foreground-400 text-sm mb-4">
                Customize your experience with theme, language, and display options.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-background-800 rounded border border-background-700" />
                <div className="h-20 bg-background-800 rounded border border-background-700" />
                <div className="h-20 bg-background-800 rounded border border-background-700" />
                <div className="h-20 bg-background-800 rounded border border-background-700" />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
