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
    <DocsLayout
      banner={
        <div className="hidden h-60 border-b border-background-700/40 bg-background-800 w-full text-sm font-medium">
        </div>
      }
      tocItems={tocItems}>
      {children}
    </DocsLayout>
  );
}
