import { Menu } from 'ui-lab-components';

export const metadata = {
  title: 'Nested Menu',
  description: 'Context menu with submenus for organizing related actions. Hover over items with arrows to reveal nested options.'
};

export default function Example() {
  return (
    <Menu>
      <Menu.Trigger className="flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors">
        Right click here
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>New Folder</Menu.Item>
        <Menu.Separator />
        <Menu.Sub>
          <Menu.SubTrigger>Open with...</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>VS Code</Menu.Item>
            <Menu.Item>Sublime Text</Menu.Item>
            <Menu.Item>Vim</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Other Application...</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
        <Menu.Sub>
          <Menu.SubTrigger>Share</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>Copy Link</Menu.Item>
            <Menu.Item>Email</Menu.Item>
            <Menu.Sub>
              <Menu.SubTrigger>Social Media</Menu.SubTrigger>
              <Menu.SubContent>
                <Menu.Item>Twitter</Menu.Item>
                <Menu.Item>LinkedIn</Menu.Item>
                <Menu.Item>Facebook</Menu.Item>
              </Menu.SubContent>
            </Menu.Sub>
          </Menu.SubContent>
        </Menu.Sub>
        <Menu.Separator />
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item disabled>Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
