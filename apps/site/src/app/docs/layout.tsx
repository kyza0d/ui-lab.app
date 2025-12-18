import { DocsLayout } from "@/components/layout/DocsLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout>
      {children}
    </DocsLayout>
  );
}
