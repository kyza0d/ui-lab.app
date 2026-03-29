import React from 'react';
import { Tabs, Card } from 'ui-lab-components';
import { User, Settings, Bell, Shield } from 'lucide-react';

export const metadata = {
  title: 'Vertical Tabs (Sidebar)',
  description: 'A vertical tab layout ideal for settings pages or sidebar navigation. Tabs are stacked vertically with content panels beside them.'
};

export default function Example() {
  return (
    <div className="flex items-center justify-center bg-background-950 p-4 min-h-[400px]">
      <Card className="w-full max-w-2xl">
        <Tabs default="profile" className="flex flex-row">
          {/* Vertical tab list - styled as sidebar */}
          <Tabs.List
            aria-label="Settings sections"
            className="flex-col items-stretch justify-start h-auto w-48 border-r border-background-700 rounded-none bg-transparent p-2"
          >
            <Tabs.Trigger value="profile" icon={<User className="w-4 h-4" />} className="justify-start">
              Profile
            </Tabs.Trigger>
            <Tabs.Trigger value="notifications" icon={<Bell className="w-4 h-4" />} className="justify-start">
              Notifications
            </Tabs.Trigger>
            <Tabs.Trigger value="security" icon={<Shield className="w-4 h-4" />} className="justify-start">
              Security
            </Tabs.Trigger>
            <Tabs.Trigger value="preferences" icon={<Settings className="w-4 h-4" />} className="justify-start">
              Preferences
            </Tabs.Trigger>
          </Tabs.List>

          {/* Content panels */}
          <div className="flex-1 p-6">
            <Tabs.Content value="profile" className="mt-0">
              <h3 className="text-lg font-semibold text-foreground-100 mb-2">Profile Settings</h3>
              <p className="text-foreground-400 text-sm mb-4">
                Manage your personal information and how others see you on the platform.
              </p>
              <div className="space-y-3">
                <div className="h-10 w-full bg-background-800 rounded border border-background-700" />
                <div className="h-10 w-full bg-background-800 rounded border border-background-700" />
                <div className="h-10 w-2/3 bg-background-800 rounded border border-background-700" />
              </div>
            </Tabs.Content>

            <Tabs.Content value="notifications" className="mt-0">
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
            </Tabs.Content>

            <Tabs.Content value="security" className="mt-0">
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
            </Tabs.Content>

            <Tabs.Content value="preferences" className="mt-0">
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
            </Tabs.Content>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
