import { Menu } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { Copy, Edit, Trash2, Share2, Eye } from "lucide-react";

const contextMenuBasicCode = `import { Menu } from "ui-lab-components";

export function Example() {
  return (
    <Menu>
      <Menu.Trigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none">
        Right click here
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Item disabled>Cut</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}`;

const contextMenuSubmenuCode = `import { Menu } from "ui-lab-components";

export function Example() {
  return (
    <Menu>
      <Menu.Trigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none">
        Right click here
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Separator />
        <Menu.Sub>
          <Menu.SubTrigger>Share</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>Email</Menu.Item>
            <Menu.Item>Copy Link</Menu.Item>
            <Menu.Item>Social Media</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
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
      id: "basic",
      title: "Basic Menu",
      description: "A simple context menu with text items",
      code: contextMenuBasicCode,
      preview: (
        <Menu>
          <Menu.Trigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
            Right click here
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Menu.Item>
            <Menu.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Menu.Item>
            <Menu.Item disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu>
      ),
    },
    {
      id: "submenu",
      title: "Context Menu with Submenu",
      description: "Context menu with nested submenu items",
      code: contextMenuSubmenuCode,
      preview: (
        <Menu>
          <Menu.Trigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
            Right click here
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Menu.Item>
            <Menu.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Menu.Item>
            <Menu.Separator />
            <Menu.Sub>
              <Menu.SubTrigger>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Menu.SubTrigger>
              <Menu.SubContent>
                <Menu.Item>Email</Menu.Item>
                <Menu.Item>Copy Link</Menu.Item>
                <Menu.Item>Social Media</Menu.Item>
              </Menu.SubContent>
            </Menu.Sub>
            <Menu.Separator />
            <Menu.Item disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu>
      ),
    },
  ],
};
