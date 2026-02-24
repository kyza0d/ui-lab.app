'use client';

import React, { useState } from 'react';
import { Card, Button, Group, Badge, Checkbox } from 'ui-lab-components';
import { Bell, Eye, Lock } from 'lucide-react';

export const metadata = {
  title: 'Settings Panel Card',
  description: 'A card-based settings panel with grouped toggle controls and action buttons. Shows how cards structure configuration options with clear labeling and actions.'
};

export default function Example() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);

  return (
    <div className="flex items-center justify-center bg-background-950 p-4">
      <Card className="w-full max-w-md">
        <Card.Header className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-foreground-100">Preferences</h3>
          <Badge variant="info" size="sm">3 settings</Badge>
        </Card.Header>

        <Card.Body className="space-y-3">
          {/* Notification Setting */}
          <div className="flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors">
            <Bell className="w-4 h-4 text-foreground-400 mt-1 flex-shrink-0" />
            <Checkbox
              id="notifications"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              label={
                <div className="ml-1">
                  <p className="text-sm font-medium text-foreground-100">Notifications</p>
                  <p className="text-xs text-foreground-400">Stay updated with alerts</p>
                </div>
              }
              size="md"
            />
          </div>

          {/* Preview Mode Setting */}
          <div className="flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors">
            <Eye className="w-4 h-4 text-foreground-400 mt-1 flex-shrink-0" />
            <Checkbox
              id="preview"
              checked={previewMode}
              onChange={(e) => setPreviewMode(e.target.checked)}
              label={
                <div className="ml-1">
                  <p className="text-sm font-medium text-foreground-100">Preview Mode</p>
                  <p className="text-xs text-foreground-400">See changes in real-time</p>
                </div>
              }
              size="md"
            />
          </div>

          {/* Privacy Mode Setting */}
          <div className="flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors">
            <Lock className="w-4 h-4 text-foreground-400 mt-1 flex-shrink-0" />
            <Checkbox
              id="privacy"
              checked={privateMode}
              onChange={(e) => setPrivateMode(e.target.checked)}
              label={
                <div className="ml-1">
                  <p className="text-sm font-medium text-foreground-100">Privacy Mode</p>
                  <p className="text-xs text-foreground-400">Hide sensitive data</p>
                </div>
              }
              size="md"
            />
          </div>
        </Card.Body>

        <Card.Footer className="border-t border-background-700 pt-4">
          <Group>
            <Group.Button variant="ghost" size="md" className="flex-1">
              Reset to Defaults
            </Group.Button>
            <Group.Button variant="primary" size="md" className="flex-1">
              Save Changes
            </Group.Button>
          </Group>
        </Card.Footer>
      </Card>
    </div>
  );
}
