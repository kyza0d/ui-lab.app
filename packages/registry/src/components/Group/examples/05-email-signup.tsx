import { Divider, Group } from "ui-lab-components";
import { FaEnvelope } from "react-icons/fa6";

export const metadata = {
  title: "Email Signup",
  description: "An email input with a joined subscription action.",
};

export default function Example() {
  return (
    <Group variant="outline">
      <div className="bg-background-800 flex items-center px-3 text-foreground-400">
        <FaEnvelope />
      </div>
      <Divider />
      <Group.Input placeholder="you@example.com" type="email" className="w-64" />
      <Divider />
      <Group.Button>Subscribe</Group.Button>
    </Group>
  );
}
