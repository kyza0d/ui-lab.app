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
        <div className="hidden p-4 h-100 border-b border-background-700/40 w-full text-sm font-medium">
          <div className="w-full h-full rounded-md bg-background-900 border border-background-700"></div>
        </div>
      }
      tocItems={tocItems}>
      {children}
    </DocsLayout>
  );
}
