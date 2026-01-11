import { DocsLayout } from "@/features/docs";
import { getTocItemsForSection } from "@/features/docs/lib/get-toc-items";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tocItems = getTocItemsForSection('agents-mcps');

  return (
    <DocsLayout tocItems={tocItems}>
      {children}
    </DocsLayout>
  );
}
