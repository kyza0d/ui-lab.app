import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
} from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { Copy, Edit, Trash2, Share2, Eye } from "lucide-react";

const contextMenuBasicCode = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "ui-lab-components";

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuItem disabled>Cut</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;

const contextMenuSubmenuCode = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "ui-lab-components";

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Copy Link</ContextMenuItem>
            <ContextMenuItem>Social Media</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;

export const contextMenuDetail: ComponentDetail = {
  id: "context-menu",
  name: "Context Menu",
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
      title: "Basic Context Menu",
      description: "A simple context menu with text items",
      code: contextMenuBasicCode,
      preview: (
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </ContextMenuItem>
            <ContextMenuItem disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ),
    },
    {
      id: "submenu",
      title: "Context Menu with Submenu",
      description: "Context menu with nested submenu items",
      code: contextMenuSubmenuCode,
      preview: (
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Email</ContextMenuItem>
                <ContextMenuItem>Copy Link</ContextMenuItem>
                <ContextMenuItem>Social Media</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ),
    },
  ],
};
