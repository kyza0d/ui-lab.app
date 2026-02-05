import React from 'react';
import { Badge } from 'ui-lab-components';

export const metadata = {
  title: 'Badge Variants and Sizes',
  description: 'Showcases all available badge variants (default, success, warning, danger, info) and sizes (sm, md, lg). Also demonstrates pill-shaped badges.'
};

export default function Example() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Variants</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Sizes</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Pill Shape</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge pill variant="default">Default Pill</Badge>
          <Badge pill variant="success">Success Pill</Badge>
          <Badge pill variant="warning">Warning Pill</Badge>
          <Badge pill variant="danger">Danger Pill</Badge>
          <Badge pill variant="info">Info Pill</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Variants with Sizes</h3>
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap items-center">
            <Badge variant="success" size="sm">Small Success</Badge>
            <Badge variant="success" size="md">Medium Success</Badge>
            <Badge variant="success" size="lg">Large Success</Badge>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <Badge variant="danger" size="sm">Small Danger</Badge>
            <Badge variant="danger" size="md">Medium Danger</Badge>
            <Badge variant="danger" size="lg">Large Danger</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">With Count</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge variant="default" count={5} />
          <Badge variant="success" count={12} />
          <Badge variant="warning" count={99} />
          <Badge variant="danger" count={3} pill />
          <Badge variant="info" count={42} pill />
        </div>
      </div>
    </div>
  );
}
