import { DocsLayout } from "@/features/docs";

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
