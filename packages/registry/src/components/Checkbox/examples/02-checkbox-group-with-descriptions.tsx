'use client';

import React from 'react';
import { Checkbox, Card, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Checkbox Group with Descriptions',
  description: 'Multiple checkboxes grouped together as a settings panel. Each checkbox includes a label and helper text for context.'
};

export default function Example() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    sms: false,
    marketing: false,
  });

  const handleChange = (key: keyof typeof notifications) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(prev => ({ ...prev, [key]: e.target.checked }));
  };

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium text-foreground-100">Notification Preferences</h3>
        <p className="text-sm text-foreground-400">Choose how you want to be notified.</p>
      </Card.Header>
      <Card.Body>
        <Flex direction="column" gap="lg">
          <Checkbox
            checked={notifications.email}
            onChange={handleChange('email')}
            label="Email notifications"
            helperText="Receive updates about your account activity via email."
          />
          <Checkbox
            checked={notifications.push}
            onChange={handleChange('push')}
            label="Push notifications"
            helperText="Get instant alerts on your device for important updates."
          />
          <Checkbox
            checked={notifications.sms}
            onChange={handleChange('sms')}
            label="SMS notifications"
            helperText="Receive text messages for critical alerts and reminders."
          />
          <Checkbox
            checked={notifications.marketing}
            onChange={handleChange('marketing')}
            label="Marketing emails"
            helperText="Stay informed about new features, tips, and special offers."
          />
        </Flex>
      </Card.Body>
    </Card>
  );
}
