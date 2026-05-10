"use client";

import { Path, Menu, Button } from "ui-lab-components";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { FaChevronRight, FaEllipsis } from "react-icons/fa6";

function PageNavigationPreview() {
  return (
    <Path>
      <Path.Item href="/">Home</Path.Item>
      <Path.Item href="/settings">Settings</Path.Item>
      <Path.Item href="/settings/account">Account</Path.Item>
      <Path.Item>Profile</Path.Item>
    </Path>
  );
}

function CustomSeparatorPreview() {
  return (
    <Path separator={<FaChevronRight className="w-3 h-3 text-foreground-400" />}>
      <Path.Item href="/projects">Projects</Path.Item>
      <Path.Item href="/projects/ui-lab">ui-lab</Path.Item>
      <Path.Item>components</Path.Item>
    </Path>
  );
}

function CollapsedBreadcrumbPreview() {
  const collapsed = [
    { label: "Projects", href: "/projects" },
    { label: "ui-lab", href: "/projects/ui-lab" },
    { label: "packages", href: "/projects/ui-lab/packages" },
  ];

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
              <Menu.Item key={crumb.href} onSelect={() => { }}>
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

const examples: DevExample[] = [
  {
    id: "page-navigation",
    title: "Page Navigation",
    description: "Standard breadcrumb trail — the last item is automatically marked as the current page.",
    preview: <PageNavigationPreview />,
  },
  {
    id: "custom-separator",
    title: "Custom Separator",
    description: "Pass any node via the separator prop to replace the default slash.",
    preview: <CustomSeparatorPreview />,
  },
  {
    id: "collapsed-breadcrumb",
    title: "Collapsed Breadcrumb",
    description: "Deep paths collapse intermediate crumbs into an ellipsis menu — Path.Item wraps the Menu trigger directly.",
    preview: <CollapsedBreadcrumbPreview />,
  },
];

export default function PathExamplesPage() {
  return (
    <DevExampleLayout
      title="Path Examples"
      description="Breadcrumb navigation component with keyboard support and customizable separators."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
