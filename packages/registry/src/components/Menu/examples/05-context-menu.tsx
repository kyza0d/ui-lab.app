import { Menu } from "ui-lab-components";

export const metadata = {
  title: "Context Menu",
  description: "Right-click anywhere in the surface to open the menu at the cursor position.",
};

export default function Example() {
  return (
    <Menu type="context-menu">
      <Menu.Trigger>
        <div className="flex items-center justify-center w-80 h-32 border border-dashed border-background-700 rounded-sm text-sm text-foreground-400 select-none">
          Right-click anywhere in this area
        </div>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onSelect={() => {}}>
          Cut
          <Menu.Shortcut>⌘X</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Copy
          <Menu.Shortcut>⌘C</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Paste
          <Menu.Shortcut>⌘V</Menu.Shortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item onSelect={() => {}} styles={{ root: "text-destructive" }}>
          Delete
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
