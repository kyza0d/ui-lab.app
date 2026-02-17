import React from 'react';
import { Input, Label, Switch, Button, Flex, Card } from 'ui-lab-components';

export const metadata = {
  name: 'Settings Form Layout',
  description: 'Structured settings form with labeled inputs, toggles, and submit action',
};

export default function SettingsFormLayout() {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-foreground-50 mb-8">
        Account Settings
      </h2>
      <Card>
        <Card.Body>
          <Flex direction="column" gap="lg">
            <Flex direction="column" gap="sm">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" placeholder="Your display name" />
            </Flex>

            <Flex direction="column" gap="sm">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </Flex>

            <div className="border-t border-background-800 my-2" />

            <Flex justify="space-between" align="center">
              <Flex direction="column" gap="xs">
                <span className="text-sm font-medium text-foreground-100">
                  Email Notifications
                </span>
                <span className="text-xs text-foreground-400">
                  Receive email updates about your account activity
                </span>
              </Flex>
              <Switch defaultSelected />
            </Flex>

            <Flex justify="space-between" align="center">
              <Flex direction="column" gap="xs">
                <span className="text-sm font-medium text-foreground-100">
                  Marketing Emails
                </span>
                <span className="text-xs text-foreground-400">
                  Receive tips, product updates, and announcements
                </span>
              </Flex>
              <Switch />
            </Flex>

            <div className="border-t border-background-800 my-2" />

            <Flex justify="flex-end">
              <Button variant="primary">Save Changes</Button>
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </section>
  );
}
