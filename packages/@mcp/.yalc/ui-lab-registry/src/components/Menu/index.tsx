import { Menu } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-menu.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

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
