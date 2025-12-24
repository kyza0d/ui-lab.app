import React from 'react';
import { Menu } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Menu',
  description: 'A simple context menu triggered by right-click. Use this to provide quick access to common actions and context-specific commands.'
};

export default function Example() {
  return (
    <Menu>
      <Menu.Trigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
        Right click here
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Item disabled>Cut</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
