'use client';

import { useReducer } from 'react';
import { FaApple, FaCircle, FaPencil, FaPercent, FaStar } from 'react-icons/fa6';
import { Divider, Group, Select, Button, Slider } from 'ui-lab-components';

interface State {
  filter1: string | number | null;
  filter2: string | number | null;
  sortBy: string | number | null;
  config1: string | number | null;
  config2: string | number | null;
  sliderValue: number[];
}

type Action =
  | { type: 'SET_FILTER1'; payload: string | number | null }
  | { type: 'SET_FILTER2'; payload: string | number | null }
  | { type: 'SET_SORT_BY'; payload: string | number | null }
  | { type: 'SET_CONFIG1'; payload: string | number | null }
  | { type: 'SET_CONFIG2'; payload: string | number | null }
  | { type: 'SET_SLIDER_VALUE'; payload: number[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILTER1':
      return { ...state, filter1: action.payload };
    case 'SET_FILTER2':
      return { ...state, filter2: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_CONFIG1':
      return { ...state, config1: action.payload };
    case 'SET_CONFIG2':
      return { ...state, config2: action.payload };
    case 'SET_SLIDER_VALUE':
      return { ...state, sliderValue: action.payload };
    default:
      return state;
  }
}

export default function Test() {
  const [state, dispatch] = useReducer(reducer, {
    filter1: 'all',
    filter2: 'active',
    sortBy: 'recent',
    config1: 'standard',
    config2: 'light',
    sliderValue: [45],
  });

  const handleSliderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      dispatch({ type: 'SET_SLIDER_VALUE', payload: [Math.min(Math.max(val, 0), 100)] });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-16">


        <Group orientation="horizontal" spacing="sm">
          <Group.Select
            selectedKey={state.filter1}
            onSelectionChange={(value) => dispatch({ type: 'SET_FILTER1', payload: value })}
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
            selectedKey={state.filter2}
            onSelectionChange={(value) => dispatch({ type: 'SET_FILTER2', payload: value })}
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
            selectedKey={state.config2}
            onSelectionChange={(value) => dispatch({ type: 'SET_CONFIG2', payload: value })}
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
            selectedKey={state.sortBy}
            onSelectionChange={(value) => dispatch({ type: 'SET_SORT_BY', payload: value })}
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
            selectedKey={state.config1}
            onSelectionChange={(value) => dispatch({ type: 'SET_CONFIG1', payload: value })}
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
                value={state.sliderValue[0]}
                onChange={handleSliderInputChange}
                className="w-full"
              />
              <div className="bg-background-800 flex items-center px-3 bg-muted/50 text-muted-foreground text-sm font-medium">
                <FaPercent />
              </div>
            </Group>
            <Slider.Root
              value={state.sliderValue}
              onValueChange={(value) => dispatch({ type: 'SET_SLIDER_VALUE', payload: value })}
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
            <Group orientation="horizontal" spacing="sm" variant="outline">
              <Group.Button variant="outline" size="md">Option A</Group.Button>
              <Group.Button variant="outline" size="md">Option B</Group.Button>
              <Group.Button variant="outline" size="md">Option C</Group.Button>
            </Group>
            <Group orientation="vertical" spacing="sm" variant="outline">
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
