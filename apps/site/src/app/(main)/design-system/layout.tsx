import { DocsLayout } from "@/features/docs";
import { getTocItemsForSection } from "@/features/docs/lib/get-toc-items";
import { generateMetadata } from "@/shared";

export const metadata = generateMetadata({ pathname: '/design-system' });

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tocItems = getTocItemsForSection('design-system');

  return (
    <DocsLayout tocItems={tocItems}>
      {children}
    </DocsLayout>
  );
}
