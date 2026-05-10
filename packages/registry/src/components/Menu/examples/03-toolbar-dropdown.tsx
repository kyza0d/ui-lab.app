import { Menu, Button } from "ui-lab-components";
import { FaChevronDown } from "react-icons/fa6";

export const metadata = {
  title: "Toolbar Dropdown",
  description: "Dropdown menu of actions with keyboard shortcuts and a disabled item.",
};

export default function Example() {
  return (
    <Menu type="pop-over">
      <Menu.Trigger>
        <Button variant="ghost">
          File <FaChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </Menu.Trigger>
      <Menu.Content align="start">
        <Menu.Item onSelect={() => {}}>
          New file
          <Menu.Shortcut>⌘N</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Open…
          <Menu.Shortcut>⌘O</Menu.Shortcut>
        </Menu.Item>
        <Menu.Item onSelect={() => {}}>
          Save
          <Menu.Shortcut>⌘S</Menu.Shortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item disabled>Recent files</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
