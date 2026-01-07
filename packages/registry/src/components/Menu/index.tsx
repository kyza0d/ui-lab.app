import React from 'react';
import { Menu } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-menu.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaArrowsRotate, FaStar, FaTrash } from 'react-icons/fa6';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "50%" }} className="rounded-sm overflow-hidden border pt-2 border-background-700 flex flex-col max-w-sm">
      <div className='h-4 pl-2 flex'>
        <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 mr-2 rounded-md h-2'></div>
      </div>

      <div className='h-4 pl-2 gap-2 flex'>
        <div style={{ width: "70%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
      </div>
      <div className='h-4 pl-2 flex'>
        <div style={{ width: "60%", backgroundColor: "var(--background-500)" }} className='opacity-10 mr-2 rounded-md h-2'></div>
      </div>

      <div className='text-foreground-400 flex flex-col py-2 px-2 gap-2 border-t border-background-700'>
        <div style={{ backgroundColor: "var(--background-900)", margin: "-4px" }} className='rounded-sm py-1 px-1'>
          <div style={{ width: "70%", backgroundColor: "var(--background-500)" }} className='opacity-10 mr-2 rounded-md h-2'></div>
        </div>
        <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 mr-2 rounded-md h-2'></div>
      </div>
      <div className='text-foreground-400 flex flex-col py-2 pl-2 gap-2 border-t border-background-700'>
        <div style={{ width: "70%", backgroundColor: "var(--background-500)" }} className='opacity-10 mr-2 rounded-md h-2'></div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-menu', Component: Example1, metadata: metadata1 },
];

const menuControls: ControlDef[] = [];

const menuBasicCode = `import { Menu } from "ui-lab-components";

export function Example() {
  return (
    <Menu>
      <Menu.Trigger>Right click here</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Item disabled>Cut</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}`;

export const menuDetail: ComponentDetail = {
  id: "menu",
  name: "Menu",
  description: "A customizable context menu that appears on right-click or long-press",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        Context menus provide users with a set of options relevant to the current context, typically triggered by right-clicking on an element. They're essential for desktop-like interactions and can include items, separators, checkboxes, radio buttons, and nested submenus.
      </p>
      <p>
        Use context menus to provide quick access to common actions, editing options, or context-specific commands.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: menuBasicCode,
      preview: (
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
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Basic context menu with items and separator.",
      code: menuBasicCode,
      preview: (
        <Menu>
          <Menu.Trigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-8 cursor-context-menu select-none text-foreground-300">
            Right click
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Paste</Menu.Item>
            <Menu.Item disabled>Cut</Menu.Item>
          </Menu.Content>
        </Menu>
      ),
    },
  ],
};

export { menuControls };
export * from './examples';
