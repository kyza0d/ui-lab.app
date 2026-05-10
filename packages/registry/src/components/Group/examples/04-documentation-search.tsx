import { Divider, Group } from "ui-lab-components";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const metadata = {
  title: "Documentation Search",
  description: "A search input with an icon prefix and joined submit button.",
};

export default function Example() {
  return (
    <Group variant="secondary">
      <div className="bg-background-800 flex items-center px-3 text-foreground-400">
        <FaMagnifyingGlass />
      </div>
      <Divider />
      <Group.Input placeholder="Search documentation..." className="w-64" />
      <Divider />
      <Group.Button className="w-full">Search</Group.Button>
    </Group>
  );
}
