"use client";

import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { CommandPalette, Command } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { toast } from "ui-lab-components";
import { useState } from "react";
import {
  FaHouse,
  FaGear,
  FaUser,
  FaCircleQuestion,
  FaMoon,
  FaSun,
  FaDesktop,
  FaPlus,
  FaTrash,
  FaCopy,
  FaFolderPlus,
  FaDownload,
  FaShare,
  FaEye,
  FaLock,
  FaCircleUser,
} from "react-icons/fa6";

const commandPaletteControls: ControlDef[] = [
  {
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    defaultValue: "Type a command or search...",
  },
  {
    name: "emptyMessage",
    label: "Empty Message",
    type: "text",
    defaultValue: "No commands found.",
  },
  {
    name: "showCategories",
    label: "Show Categories",
    type: "toggle",
    defaultValue: true,
  },
  {
    name: "closeOnExecute",
    label: "Close on Execute",
    type: "toggle",
    defaultValue: true,
  },
];

const basicCode = `import { CommandPalette } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const commands = [
    {
      id: "search",
      label: "Search",
      description: "Search documents",
      shortcut: "⌘F",
      action: () => console.log("Search"),
    },
    {
      id: "create",
      label: "Create new",
      description: "Create a new document",
      shortcut: "⌘N",
      action: () => console.log("Create"),
    },
    {
      id: "settings",
      label: "Settings",
      description: "Open preferences",
      shortcut: "⌘,",
      action: () => console.log("Settings"),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

function BasicPreview(props: any) {
  const [open, setOpen] = useState(false);

  const commands: Command[] = [
    {
      id: "search",
      label: "Search",
      description: "Search documents",
      shortcut: "⌘F",
      action: () => console.log("Search"),
    },
    {
      id: "create",
      label: "Create new",
      description: "Create a new document",
      shortcut: "⌘N",
      action: () => console.log("Create"),
    },
    {
      id: "settings",
      label: "Settings",
      description: "Open preferences",
      shortcut: "⌘,",
      action: () => console.log("Settings"),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
        {...props}
      />
    </>
  );
}

const navigationCode = `import { CommandPalette } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { toast } from "@/components/ui/toast/use-toast";
import {
  FaHouse,
  FaGear,
  FaUser,
  FaCircleQuestion,
} from "react-icons/fa6";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const commands = [
    {
      id: "dashboard",
      label: "Go to Dashboard",
      description: "Navigate to main dashboard",
      category: "Navigation",
      shortcut: "⌘D",
      icon: <FaHouse />,
      action: () => {
        toast({
          title: "Dashboard",
          description: "Navigating to dashboard",
          variant: "default",
        });
      },
    },
    {
      id: "settings",
      label: "Go to Settings",
      description: "Manage your preferences",
      category: "Navigation",
      shortcut: "⌘,",
      icon: <FaGear />,
      action: () => {
        toast({
          title: "Settings",
          description: "Opening settings page",
          variant: "default",
        });
      },
    },
    {
      id: "profile",
      label: "View Profile",
      description: "Open your profile",
      category: "Navigation",
      shortcut: "⌘P",
      icon: <FaUser />,
      action: () => {
        toast({
          title: "Profile",
          description: "Loading your profile",
          variant: "default",
        });
      },
    },
    {
      id: "help",
      label: "Help & Support",
      description: "Get help and support",
      category: "Navigation",
      shortcut: "⌘?",
      icon: <FaCircleQuestion />,
      action: () => {
        toast({
          title: "Help",
          description: "Opening help documentation",
          variant: "default",
        });
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

function NavigationPreview() {
  const [open, setOpen] = useState(false);

  const commands: Command[] = [
    {
      id: "dashboard",
      label: "Go to Dashboard",
      description: "Navigate to main dashboard",
      category: "Navigation",
      shortcut: "⌘D",
      icon: <FaHouse />,
      action: () => {
        toast({
          title: "Dashboard",
          description: "Navigating to dashboard",
          variant: "default",
        });
      },
    },
    {
      id: "settings",
      label: "Go to Settings",
      description: "Manage your preferences",
      category: "Navigation",
      shortcut: "⌘,",
      icon: <FaGear />,
      action: () => {
        toast({
          title: "Settings",
          description: "Opening settings page",
          variant: "default",
        });
      },
    },
    {
      id: "profile",
      label: "View Profile",
      description: "Open your profile",
      category: "Navigation",
      shortcut: "⌘P",
      icon: <FaUser />,
      action: () => {
        toast({
          title: "Profile",
          description: "Loading your profile",
          variant: "default",
        });
      },
    },
    {
      id: "help",
      label: "Help & Support",
      description: "Get help and support",
      category: "Navigation",
      shortcut: "⌘?",
      icon: <FaCircleQuestion />,
      action: () => {
        toast({
          title: "Help",
          description: "Opening help documentation",
          variant: "default",
        });
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}

const themeCode = `import { CommandPalette } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { toast } from "@/components/ui/toast/use-toast";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa6";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const commands = [
    {
      id: "dark",
      label: "Switch to Dark Mode",
      description: "Use dark theme",
      category: "Theme",
      icon: <FaMoon />,
      action: () => {
        toast({
          title: "Dark Mode",
          description: "Switched to dark theme",
          variant: "default",
        });
      },
    },
    {
      id: "light",
      label: "Switch to Light Mode",
      description: "Use light theme",
      category: "Theme",
      icon: <FaSun />,
      action: () => {
        toast({
          title: "Light Mode",
          description: "Switched to light theme",
          variant: "default",
        });
      },
    },
    {
      id: "system",
      label: "Use System Theme",
      description: "Follow system preference",
      category: "Theme",
      icon: <FaDesktop />,
      action: () => {
        toast({
          title: "System Theme",
          description: "Following system preference",
          variant: "default",
        });
      },
    },
    {
      id: "accent-purple",
      label: "Purple Accent",
      description: "Set accent color to purple",
      category: "Accent",
      action: () => {
        toast({
          title: "Accent Color",
          description: "Set to purple",
          variant: "default",
        });
      },
    },
    {
      id: "accent-blue",
      label: "Blue Accent",
      description: "Set accent color to blue",
      category: "Accent",
      action: () => {
        toast({
          title: "Accent Color",
          description: "Set to blue",
          variant: "default",
        });
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

function ThemePreview() {
  const [open, setOpen] = useState(false);

  const commands: Command[] = [
    {
      id: "dark",
      label: "Switch to Dark Mode",
      description: "Use dark theme",
      category: "Theme",
      icon: <FaMoon size={20} />,
      action: () => {
        toast({
          title: "Dark Mode",
          description: "Switched to dark theme",
          variant: "default",
        });
      },
    },
    {
      id: "light",
      label: "Switch to Light Mode",
      description: "Use light theme",
      category: "Theme",
      icon: <FaSun size={20} />,
      action: () => {
        toast({
          title: "Light Mode",
          description: "Switched to light theme",
          variant: "default",
        });
      },
    },
    {
      id: "system",
      label: "Use System Theme",
      description: "Follow system preference",
      category: "Theme",
      icon: <FaDesktop size={20} />,
      action: () => {
        toast({
          title: "System Theme",
          description: "Following system preference",
          variant: "default",
        });
      },
    },
    {
      id: "accent-purple",
      label: "Purple Accent",
      description: "Set accent color to purple",
      category: "Accent",
      action: () => {
        toast({
          title: "Accent Color",
          description: "Set to purple",
          variant: "default",
        });
      },
    },
    {
      id: "accent-blue",
      label: "Blue Accent",
      description: "Set accent color to blue",
      category: "Accent",
      action: () => {
        toast({
          title: "Accent Color",
          description: "Set to blue",
          variant: "default",
        });
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}

const multiCategoryCode = `import { CommandPalette } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { toast } from "@/components/ui/toast/use-toast";
import {
  FaHouse,
  FaGear,
  FaPlus,
  FaTrash,
  FaCopy,
  FaFolderPlus,
  FaDownload,
  FaShare,
} from "react-icons/fa6";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const commands = [
    // Navigation (4)
    {
      id: "home",
      label: "Home",
      category: "Navigation",
      icon: <FaHouse />,
      action: () =>
        toast({
          title: "Navigation",
          description: "Going home",
        }),
    },
    {
      id: "settings",
      label: "Settings",
      category: "Navigation",
      icon: <FaGear />,
      action: () =>
        toast({
          title: "Navigation",
          description: "Opening settings",
        }),
    },
    // Actions (6)
    {
      id: "create",
      label: "Create New",
      description: "Create a new document",
      category: "Actions",
      icon: <FaPlus />,
      action: () =>
        toast({
          title: "Created",
          description: "New document created",
          variant: "success",
        }),
    },
    {
      id: "delete",
      label: "Delete",
      description: "Delete selected item",
      category: "Actions",
      icon: <FaTrash />,
      action: () =>
        toast({
          title: "Deleted",
          description: "Item deleted",
          variant: "destructive",
        }),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      description: "Duplicate item",
      category: "Actions",
      icon: <FaCopy />,
      action: () =>
        toast({
          title: "Duplicated",
          description: "Item duplicated",
          variant: "success",
        }),
    },
    {
      id: "new-folder",
      label: "New Folder",
      description: "Create new folder",
      category: "Actions",
      icon: <FaFolderPlus />,
      action: () =>
        toast({
          title: "Folder Created",
          description: "New folder created",
          variant: "success",
        }),
    },
    // Settings (3)
    {
      id: "export",
      label: "Export",
      description: "Export data",
      category: "Settings",
      icon: <FaDownload />,
      action: () =>
        toast({
          title: "Export",
          description: "Starting export...",
        }),
    },
    {
      id: "share",
      label: "Share",
      description: "Share with others",
      category: "Settings",
      icon: <FaShare />,
      action: () =>
        toast({
          title: "Share",
          description: "Share options opened",
        }),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

function MultiCategoryPreview() {
  const [open, setOpen] = useState(false);

  const commands: Command[] = [
    // Navigation (4)
    {
      id: "home",
      label: "Home",
      category: "Navigation",
      icon: <FaHouse />,
      action: () => {
        toast({
          title: "Navigation",
          description: "Going home",
        });
      },
    },
    {
      id: "settings",
      label: "Settings",
      category: "Navigation",
      icon: <FaGear />,
      action: () => {
        toast({
          title: "Navigation",
          description: "Opening settings",
        });
      },
    },
    // Actions (6)
    {
      id: "create",
      label: "Create New",
      description: "Create a new document",
      category: "Actions",
      icon: <FaPlus />,
      action: () => {
        toast({
          title: "Created",
          description: "New document created",
          variant: "success",
        });
      },
    },
    {
      id: "delete",
      label: "Delete",
      description: "Delete selected item",
      category: "Actions",
      icon: <FaTrash />,
      action: () => {
        toast({
          title: "Deleted",
          description: "Item deleted",
          variant: "destructive",
        });
      },
    },
    {
      id: "duplicate",
      label: "Duplicate",
      description: "Duplicate item",
      category: "Actions",
      icon: <FaCopy />,
      action: () => {
        toast({
          title: "Duplicated",
          description: "Item duplicated",
          variant: "success",
        });
      },
    },
    {
      id: "new-folder",
      label: "New Folder",
      description: "Create new folder",
      category: "Actions",
      icon: <FaFolderPlus />,
      action: () => {
        toast({
          title: "Folder Created",
          description: "New folder created",
          variant: "success",
        });
      },
    },
    // Settings (3)
    {
      id: "export",
      label: "Export",
      description: "Export data",
      category: "Settings",
      icon: <FaDownload />,
      action: () => {
        toast({
          title: "Export",
          description: "Starting export...",
        });
      },
    },
    {
      id: "share",
      label: "Share",
      description: "Share with others",
      category: "Settings",
      icon: <FaShare />,
      action: () => {
        toast({
          title: "Share",
          description: "Share options opened",
        });
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}

const customCode = `import { CommandPalette } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { toast } from "@/components/ui/toast/use-toast";
import {
  FaEye,
  FaLock,
  FaCircleUser,
} from "react-icons/fa6";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const commands = [
    {
      id: "visibility",
      label: "Change Visibility",
      description: "Control who can view this item",
      category: "Permissions",
      icon: <FaEye />,
      action: () =>
        toast({
          title: "Visibility Updated",
          description: "Changed visibility settings",
          variant: "success",
        }),
    },
    {
      id: "lock",
      label: "Lock Item",
      description: "Prevent changes to this item",
      category: "Permissions",
      icon: <FaLock />,
      action: () =>
        toast({
          title: "Item Locked",
          description: "Item is now locked",
          variant: "success",
        }),
    },
    {
      id: "permissions",
      label: "Manage Permissions",
      description: "Set user permissions",
      category: "Permissions",
      icon: <FaCircleUser />,
      action: () =>
        toast({
          title: "Permissions",
          description: "Opening permissions panel",
        }),
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Palette (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}`;

function CustomPreview() {
  const [open, setOpen] = useState(false);

  const commands: Command[] = [
    {
      id: "visibility",
      label: "Change Visibility",
      description: "Control who can view this item",
      category: "Permissions",
      icon: <FaEye />,
      action: () => {
        toast({
          title: "Visibility Updated",
          description: "Changed visibility settings",
          variant: "success",
        });
      },
    },
    {
      id: "lock",
      label: "Lock Item",
      description: "Prevent changes to this item",
      category: "Permissions",
      icon: <FaLock />,
      action: () => {
        toast({
          title: "Item Locked",
          description: "Item is now locked",
          variant: "success",
        });
      },
    },
    {
      id: "permissions",
      label: "Manage Permissions",
      description: "Set user permissions",
      category: "Permissions",
      icon: <FaCircleUser />,
      action: () => {
        toast({
          title: "Permissions",
          description: "Opening permissions panel",
        });
      },
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commands}
      />
    </>
  );
}

export const commandPaletteDetail: ComponentDetail = {
  id: "command-palette",
  name: "Command Palette",
  description:
    "Keyboard-accessible command palette for quick navigation and actions with fuzzy search and keyboard navigation",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Command Palette component provides a powerful keyboard-driven interface for users to
        quickly discover and execute commands. It features fuzzy search, keyboard navigation,
        categories, and can be triggered with a global keyboard shortcut (Cmd+K on Mac, Ctrl+K on
        Windows/Linux).
      </p>
      <div className="space-y-2">
        <h4 className="font-semibold text-foreground-50">Key Features:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Global keyboard shortcut (Cmd+K / Ctrl+K)</li>
          <li>Fuzzy search with real-time filtering</li>
          <li>Command categories and grouping</li>
          <li>Keyboard navigation (arrow keys, enter, escape)</li>
          <li>Custom icons, descriptions, and shortcuts</li>
          <li>Modal with backdrop overlay</li>
          <li>Async command support</li>
          <li>Full accessibility with ARIA attributes</li>
        </ul>
      </div>
    </div>
  ),
  examples: [
    {
      id: "basic",
      title: "Basic Command Palette",
      description: "Simple command palette with search and basic commands",
      code: basicCode,
      preview: <BasicPreview />,
      controls: commandPaletteControls,
      renderPreview: (props: any) => <BasicPreview {...props} />,
    },
    {
      id: "navigation",
      title: "Navigation Commands",
      description: "Command palette with navigation-focused commands and icons",
      code: navigationCode,
      preview: <NavigationPreview />,
    },
    {
      id: "theme",
      title: "Theme Switching",
      description: "Commands for switching themes and accent colors",
      code: themeCode,
      preview: <ThemePreview />,
    },
    {
      id: "multi-category",
      title: "Multi-Category Commands",
      description: "Full-featured palette with navigation, actions, and settings categories",
      code: multiCategoryCode,
      preview: <MultiCategoryPreview />,
    },
    {
      id: "custom",
      title: "Custom Styled Commands",
      description: "Permissions and access control commands with descriptions",
      code: customCode,
      preview: <CustomPreview />,
    },
  ],
  variants: [
    {
      id: "with-categories",
      name: "With Categories",
      description: "Command palette displaying commands organized by category",
      code: `<CommandPalette
  commands={commands}
  showCategories={true}
/>`,
      preview: <NavigationPreview />,
    },
    {
      id: "without-categories",
      name: "Without Categories",
      description: "Flat command list without category grouping",
      code: `<CommandPalette
  commands={commands}
  showCategories={false}
/>`,
      preview: <BasicPreview />,
    },
    {
      id: "with-descriptions",
      name: "With Descriptions",
      description: "Commands with detailed descriptions",
      code: `<Command
  id: "search",
  label: "Search",
  description: "Search documents",
  action: () => {}
/>`,
      preview: <NavigationPreview />,
    },
    {
      id: "with-icons",
      name: "With Icons",
      description: "Commands with custom icons",
      code: `<Command
  id: "home",
  label: "Home",
  icon: <FaHouse />,
  action: () => {}
/>`,
      preview: <ThemePreview />,
    },
  ],
  accessibility: [
    {
      icon: "⌨️",
      title: "Keyboard Navigation",
      description: "Full keyboard support with Arrow Up/Down, Enter, and Escape keys",
    },
    {
      icon: "🎤",
      title: "Screen Reader Support",
      description: "Proper ARIA attributes and roles for screen reader compatibility",
    },
    {
      icon: "🎯",
      title: "Focus Management",
      description: "Automatic focus on search input and proper focus restoration",
    },
    {
      icon: "🔍",
      title: "Semantic HTML",
      description: "Dialog role with aria-modal for proper semantic structure",
    },
  ],
  props: [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Whether the palette is open",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback when open state changes",
    },
    {
      name: "commands",
      type: "Command[]",
      description: "Array of commands to display",
    },
    {
      name: "onCommandExecute",
      type: "(command: Command) => void",
      description: "Callback when a command is executed",
    },
    {
      name: "placeholder",
      type: "string",
      default: '"Type a command or search..."',
      description: "Placeholder text for search input",
    },
    {
      name: "emptyStateMessage",
      type: "string",
      default: '"No commands found."',
      description: "Message shown when no results match",
    },
    {
      name: "showCategories",
      type: "boolean",
      default: "true",
      description: "Show command category headers",
    },
    {
      name: "closeOnExecute",
      type: "boolean",
      default: "true",
      description: "Close palette after executing a command",
    },
  ],
  usage: (
    <div className="space-y-4 text-foreground-300">
      <div>
        <h4 className="font-semibold text-foreground-50 mb-2">Basic Usage:</h4>
        <p className="text-sm">
          Import the component, define commands with id, label, and action properties, then pass
          them to the CommandPalette component.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground-50 mb-2">Global Shortcut:</h4>
        <p className="text-sm">
          The palette automatically listens for Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open.
          You can also control it programmatically with the open and onOpenChange props.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground-50 mb-2">Async Commands:</h4>
        <p className="text-sm">
          Commands can be async functions. The palette will keep itself open during execution
          unless closeOnExecute is set to true.
        </p>
      </div>
    </div>
  ),
};
