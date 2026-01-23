import { DocsLayout } from "@/features/docs";
import { getTocItemsForSection } from "@/features/docs/lib/get-toc-items";
import { Footer } from "@/features/layout";
import { generateMetadata } from "@/shared";

export const metadata = generateMetadata({ pathname: '/docs' });

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tocItems = getTocItemsForSection('docs');

  return (
    <DocsLayout tocItems={tocItems}>
      {children}
    </DocsLayout>
  );
}
