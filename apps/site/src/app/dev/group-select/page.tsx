'use client';

import { useState } from 'react';
import { FaApple, FaCircle, FaPencil, FaPercent, FaStar } from 'react-icons/fa6';
import { Divider, Group, Select, Button, Slider } from 'ui-lab-components';

export default function Test() {
  const [filter1, setFilter1] = useState<string | number | null>('all');
  const [filter2, setFilter2] = useState<string | number | null>('active');
  const [sortBy, setSortBy] = useState<string | number | null>('recent');
  const [config1, setConfig1] = useState<string | number | null>('standard');
  const [config2, setConfig2] = useState<string | number | null>('light');
  const [sliderValue, setSliderValue] = useState<number[]>([45]);

  const handleSliderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setSliderValue([Math.min(Math.max(val, 0), 100)]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-16">


        <Group orientation="horizontal" spacing="sm">
          <Group.Select
            selectedKey={filter1}
            onSelectionChange={setFilter1}
            className="w-48"
          >
            <Select.Trigger>
              <Select.Value placeholder="All Items" />
              <Divider orientation='vertical' />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="all" textValue="All Items">All Items</Select.Item>
                <Select.Item value="recent" textValue="Recently Added">Recently Added</Select.Item>
                <Select.Item value="featured" textValue="Featured">Featured</Select.Item>
                <Select.Item value="archived" textValue="Archived">Archived</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>

          <Group.Select
            selectedKey={filter2}
            onSelectionChange={setFilter2}
            className="w-48"
          >
            <Select.Trigger>
              <Select.Value placeholder="Status" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="active" textValue="Active">Active</Select.Item>
                <Select.Item value="inactive" textValue="Inactive">Inactive</Select.Item>
                <Select.Item value="pending" textValue="Pending">Pending</Select.Item>
                <Select.Item value="archived" textValue="Archived">Archived</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>

          <Group.Button variant="outline" size="md">Apply Filters</Group.Button>
          <Group.Button variant="ghost" size="md">Clear All</Group.Button>
        </Group>

        <Group orientation="vertical" spacing="sm">

          <Group.Select
            selectedKey={config2}
            onSelectionChange={setConfig2}
            className="flex-1"
          >
            <Select.Trigger>
              <Select.Value placeholder="Color Mode" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="light" textValue="Light">Light</Select.Item>
                <Select.Item value="dark" textValue="Dark">Dark</Select.Item>
                <Select.Item value="auto" textValue="Auto">Auto</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>

          <Group.Select
            selectedKey={sortBy}
            onSelectionChange={setSortBy}
            className="flex-1"
          >
            <Select.Trigger>
              <Select.Value placeholder="Accent Color" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="recent" textValue="Blue">Blue</Select.Item>
                <Select.Item value="purple" textValue="Purple">Purple</Select.Item>
                <Select.Item value="rose" textValue="Rose">Rose</Select.Item>
                <Select.Item value="amber" textValue="Amber">Amber</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>
        </Group>


        <Group>
          <Group.Select
            selectedKey={config1}
            onSelectionChange={setConfig1}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select Mode" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="standard" textValue="Standard Mode">Standard Mode</Select.Item>
                <Select.Item value="compact" textValue="Compact Mode">Compact Mode</Select.Item>
                <Select.Item value="detailed" textValue="Detailed Mode">Detailed Mode</Select.Item>
                <Select.Item value="minimal" textValue="Minimal Mode" isDisabled>Minimal Mode</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>
        </Group>

        <Group orientation="horizontal" spacing="none">
          <Group.Button variant="primary" size="sm">Save</Group.Button>
          <Group.Button variant="outline" size="sm">Reset</Group.Button>
          <Group.Button variant="ghost" size="sm">Help</Group.Button>
        </Group>


        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Input Groups</h3>
          <div className="flex flex-col gap-4">
            <Group>
              <Group.Input placeholder="Search documentation..." className="w-72" />
              <Group.Button variant="primary">Search</Group.Button>
            </Group>

            <Group>
              <Group.Input placeholder="Enter your email" className="w-72" />
              <Group.Button variant="secondary">Subscribe</Group.Button>
            </Group>

            <Group>
              <Group.Input defaultValue="npm install ui-lab-components" readOnly className="w-72 font-mono text-sm" />
              <Group.Button variant="outline">Copy</Group.Button>
            </Group>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Slider Integration</h3>
          <div className="flex flex-col gap-6 max-w-sm">
            <Group>
              <Group.Input
                type="number"
                min={0}
                max={100}
                value={sliderValue[0]}
                onChange={handleSliderInputChange}
                className="w-full"
              />
              <div className="bg-background-800 flex items-center px-3 bg-muted/50 text-muted-foreground text-sm font-medium">
                <FaPercent />
              </div>
            </Group>
            <Slider.Root
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
          </div>
        </div>


        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Tight Spacing (Primary)</h3>
            <Group orientation="vertical" spacing="none" variant="primary" className="inline-flex rounded border border-border overflow-hidden">
              <Group.Button variant="secondary" size="sm">Button 1</Group.Button>
              <Group.Button variant="secondary" size="sm">Button 2</Group.Button>
              <Group.Button variant="secondary" size="sm">Button 3</Group.Button>
            </Group>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Normal Spacing (Outline)</h3>
            <Group orientation="horizontal" spacing="normal" variant="outline">
              <Group.Button variant="outline" size="md">Option A</Group.Button>
              <Group.Button variant="outline" size="md">Option B</Group.Button>
              <Group.Button variant="outline" size="md">Option C</Group.Button>
            </Group>
            <Group orientation="vertical" spacing="normal" variant="outline">
              <Group.Button variant="outline" size="md"><FaPencil /></Group.Button>
              <Group.Button variant="outline" size="md"><FaStar /></Group.Button>
              <Group.Button variant="outline" size="md"><FaCircle /></Group.Button>
            </Group>
          </div>

          <Group orientation="horizontal" spacing="sm" variant="ghost">
            <Group.Button variant="ghost" size="md">Link One</Group.Button>
            <Group.Button variant="ghost" size="md">Link Two</Group.Button>
            <Group.Button variant="ghost" size="md">Link Three</Group.Button>
          </Group>
        </div>

      </div>
    </div>
  );
}
