import React from 'react';
import { Group } from 'ui-lab-components';

export const metadata = {
  title: 'Active Buttons',
  description: 'Ghost variant automatically applies default styling with full border radius to active buttons, while inactive buttons remain ghost. Perfect for tabs and pagination.'
};

export default function Example() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="space-y-6">
      {/* Ghost variant with active state - tab-like interface */}
      <div className="space-y-2">
        <label className="text-sm text-foreground-300">Ghost variant (tabs & pagination)</label>
        <Group variant="ghost">
          <Group.Button
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Group.Button>
          <Group.Button
            active={activeTab === 'details'}
            onClick={() => setActiveTab('details')}
          >
            Details
          </Group.Button>
          <Group.Button
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Group.Button>
        </Group>
      </div>

      {/* Ghost variant pagination style */}
      <div className="space-y-2">
        <label className="text-sm text-foreground-300">Ghost variant pagination</label>
        <Group variant="ghost" spacing="none">
          {[1, 2, 3, 4, 5].map((page) => (
            <Group.Button
              key={page}
              active={page === 2}
              onClick={() => {}}
            >
              {page}
            </Group.Button>
          ))}
        </Group>
      </div>

      {/* Primary variant with active state */}
      <div className="space-y-2">
        <label className="text-sm text-foreground-300">Primary variant with active</label>
        <Group variant="primary">
          <Group.Button active>Active</Group.Button>
          <Group.Button>Inactive</Group.Button>
          <Group.Button>Inactive</Group.Button>
        </Group>
      </div>
    </div>
  );
}
