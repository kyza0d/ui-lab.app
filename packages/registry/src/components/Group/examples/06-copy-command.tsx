import { Divider, Group } from "ui-lab-components";
import { FaCopy } from "react-icons/fa6";

export const metadata = {
  title: "Copy Command",
  description: "A read-only command field with a joined copy action.",
};

export default function Example() {
  return (
    <Group>
      <Group.Input defaultValue="npm install ui-lab" readOnly className="w-full font-mono text-sm" />
      <Divider />
      <Group.Button icon={{ left: <FaCopy className="mr-1.5 text-foreground-400" /> }} />
    </Group>
  );
}
