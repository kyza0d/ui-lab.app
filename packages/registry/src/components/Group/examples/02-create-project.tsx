import { Divider, Group } from "ui-lab-components";
import { FaPlus } from "react-icons/fa6";

export const metadata = {
  title: "Create Project",
  description: "A primary grouped action for creating a named item.",
};

export default function Example() {
  return (
    <Group variant="primary" orientation="horizontal" spacing="xs">
      <Group.Input aria-label="Project name" placeholder="Untitled project" className="w-56" />
      <Divider orientation="vertical" />
      <Group.Button>
        <FaPlus className="mr-1.5" /> Create
      </Group.Button>
    </Group>
  );
}
