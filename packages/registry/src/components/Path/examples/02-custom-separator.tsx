import { Path } from "ui-lab-components";
import { FaChevronRight } from "react-icons/fa6";

export const metadata = {
  title: "Custom Separator",
  description: "Pass any node via the separator prop to replace the default slash.",
};

export default function Example() {
  return (
    <Path separator={<FaChevronRight className="w-3 h-3 text-foreground-400" />}>
      <Path.Item href="/projects">Projects</Path.Item>
      <Path.Item href="/projects/ui-lab">ui-lab</Path.Item>
      <Path.Item>components</Path.Item>
    </Path>
  );
}
