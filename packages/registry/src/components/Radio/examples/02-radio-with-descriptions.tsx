'use client';

import React from 'react';
import { Radio } from 'ui-lab-components';

export const metadata = {
  title: 'Radio with Descriptions',
  description: 'Radio buttons with titles and descriptive text. Useful for plan selection, settings, or any choice that benefits from additional context.'
};

export default function Example() {
  return (
    <Radio.Group defaultValue="pro" className="w-full max-w-md">
      <Radio.Item
        value="starter"
        label="Starter Plan"
        description="Perfect for individuals and small projects. Includes 5GB storage and basic support."
      />
      <Radio.Item
        value="pro"
        label="Pro Plan"
        description="Ideal for growing teams. Includes 50GB storage, priority support, and advanced analytics."
      />
      <Radio.Item
        value="enterprise"
        label="Enterprise Plan"
        description="For large organizations. Unlimited storage, dedicated support, and custom integrations."
      />
    </Radio.Group>
  );
}
