import { Divider, Group } from "ui-lab-components";
import { FaTrash } from "react-icons/fa6";

export const metadata = {
  title: "Delete Confirmation",
  description: "A danger variant group for destructive confirmation flows.",
};

export default function Example() {
  return (
    <Group variant="danger">
      <Group.Input aria-label="Confirmation" placeholder="Type DELETE" className="w-48" />
      <Divider />
      <Group.Button>
        <FaTrash className="mr-1.5" /> Delete
      </Group.Button>
    </Group>
  );
}
