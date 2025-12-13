import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuRadioGroup,
} from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { Copy, Edit, Trash2, Share2, Eye } from "lucide-react";

const contextMenuBasicCode = `import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "ui-lab-components";

export function Example() {
  return (
    <Menu>
      <MenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none">
        Right click here
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem disabled>Cut</MenuItem>
      </MenuContent>
    </Menu>
  );
}`;

const contextMenuSubmenuCode = `import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from "ui-lab-components";

export function Example() {
  return (
    <Menu>
      <MenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none">
        Right click here
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>Share</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>Email</MenuItem>
            <MenuItem>Copy Link</MenuItem>
            <MenuItem>Social Media</MenuItem>
          </MenuSubContent>
        </MenuSub>
      </MenuContent>
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
          <MenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
            Right click here
          </MenuTrigger>
          <MenuContent>
            <MenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </MenuItem>
            <MenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </MenuItem>
            <MenuItem disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </MenuItem>
          </MenuContent>
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
          <MenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
            Right click here
          </MenuTrigger>
          <MenuContent>
            <MenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </MenuItem>
            <MenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </MenuItem>
            <MenuSeparator />
            <MenuSub>
              <MenuSubTrigger>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </MenuSubTrigger>
              <MenuSubContent>
                <MenuItem>Email</MenuItem>
                <MenuItem>Copy Link</MenuItem>
                <MenuItem>Social Media</MenuItem>
              </MenuSubContent>
            </MenuSub>
            <MenuSeparator />
            <MenuItem disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </MenuItem>
          </MenuContent>
        </Menu>
      ),
    },
  ],
};
