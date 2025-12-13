import { Breadcrumbs, Breadcrumb } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";

const breadcrumbsBasicCode = `import { Breadcrumbs, Breadcrumb } from "ui-lab-components";

export function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/products">Products</Breadcrumb>
      <Breadcrumb>Electronics</Breadcrumb>
    </Breadcrumbs>
  );
}`;

const breadcrumbsWithActionCode = `import { Breadcrumbs, Breadcrumb } from "ui-lab-components";
import { useRouter } from "next/navigation";

export function Example() {
  const router = useRouter();

  return (
    <Breadcrumbs onAction={(key) => router.push(key)}>
      <Breadcrumb onPress={() => router.push("/")}>Home</Breadcrumb>
      <Breadcrumb onPress={() => router.push("/docs")}>Docs</Breadcrumb>
      <Breadcrumb onPress={() => router.push("/docs/components")}>
        Components
      </Breadcrumb>
      <Breadcrumb isCurrent>Button</Breadcrumb>
    </Breadcrumbs>
  );
}`;

const breadcrumbsDisabledCode = `import { Breadcrumbs, Breadcrumb } from "ui-lab-components";

export function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/team">Team</Breadcrumb>
      <Breadcrumb href="/team/members" isDisabled>
        Members (Disabled)
      </Breadcrumb>
      <Breadcrumb isCurrent>John Doe</Breadcrumb>
    </Breadcrumbs>
  );
}`;

export const breadcrumbsDetail: ComponentDetail = {
  id: "breadcrumbs",
  name: "Breadcrumbs",
  description:
    "A navigation component that displays the current page location in a site hierarchy.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Breadcrumbs component helps users understand their location within a website's hierarchy and provides quick navigation to parent pages. It displays a trail of links separated by visual dividers.
      </p>
      <p>
        Built with React Aria for full accessibility support, including keyboard navigation and screen reader compatibility. The current page is automatically marked with proper ARIA attributes.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Breadcrumbs",
      description: "A simple breadcrumb navigation showing page hierarchy with links.",
      code: breadcrumbsBasicCode,
      preview: (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/products">Products</Breadcrumb>
          <Breadcrumb>Electronics</Breadcrumb>
        </Breadcrumbs>
      ),
    },
    {
      id: "with-action",
      title: "With Navigation Action",
      description:
        "Breadcrumbs with onPress handlers for programmatic navigation. The last item is marked as the current page.",
      code: breadcrumbsWithActionCode,
      preview: (
        <Breadcrumbs>
          <Breadcrumb onPress={() => alert("Navigate to Home")}>
            Home
          </Breadcrumb>
          <Breadcrumb onPress={() => alert("Navigate to Docs")}>
            Docs
          </Breadcrumb>
          <Breadcrumb onPress={() => alert("Navigate to Components")}>
            Components
          </Breadcrumb>
          <Breadcrumb isCurrent>Button</Breadcrumb>
        </Breadcrumbs>
      ),
    },
    {
      id: "disabled-item",
      title: "With Disabled Items",
      description:
        "Breadcrumbs can have disabled items that prevent navigation while still showing the hierarchy.",
      code: breadcrumbsDisabledCode,
      preview: (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/team">Team</Breadcrumb>
          <Breadcrumb href="/team/members" isDisabled>
            Members (Disabled)
          </Breadcrumb>
          <Breadcrumb isCurrent>John Doe</Breadcrumb>
        </Breadcrumbs>
      ),
    },
  ],
};
