import { Path, Menu, Button } from "ui-lab-components";
import { FaEllipsis } from "react-icons/fa6";

export const metadata = {
  title: "Collapsed Breadcrumb",
  description: "Deep paths collapse intermediate crumbs into an ellipsis menu — Path.Item wraps the Menu trigger directly.",
};

const collapsed = [
  { label: "Projects", href: "/projects" },
  { label: "ui-lab", href: "/projects/ui-lab" },
  { label: "packages", href: "/projects/ui-lab/packages" },
];

export default function Example() {
  return (
    <Path>
      <Path.Item href="/">Home</Path.Item>
      <Path.Item>
        <Menu type="pop-over">
          <Menu.Trigger>
            <Button icon={<FaEllipsis />} styles="p-2" size="icon" variant="ghost" aria-label="Show collapsed path" />
          </Menu.Trigger>
          <Menu.Content align="start">
            {collapsed.map((crumb) => (
              <Menu.Item key={crumb.href} onSelect={() => {}}>
                {crumb.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu>
      </Path.Item>
      <Path.Item href="/projects/ui-lab/packages/@ui">@ui</Path.Item>
      <Path.Item>Path.tsx</Path.Item>
    </Path>
  );
}
