import { DocsLayout } from "@/components/layout/DocsLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout
      section={{ label: "Design System", href: "/design-system" }}
    >
      {children}
    </DocsLayout>
  );
}
