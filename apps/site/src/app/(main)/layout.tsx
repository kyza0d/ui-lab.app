import { docsSource } from "@/features/docs/lib/docs-source";
import { ClientShell } from "@/features/layout/components/client-shell";
import type { DocsNavigationData, DocsNavigationPage } from "@/features/navigation/lib/sidebar-registry-resolver";

function getNavigationPages(domain: 'docs' | 'design-system'): DocsNavigationPage[] {
  return docsSource.getAllPages(domain).map((page) => ({
    domain: page.domain,
    slug: page.slug,
    url: page.url,
    title: page.title,
    description: page.description,
    section: page.section,
    isIndex: page.isIndex,
    tags: page.tags,
  }));
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const docsNavigationData: DocsNavigationData = {
    docs: {
      pageTree: docsSource.getPageTree('docs'),
      pages: getNavigationPages('docs'),
    },
    'design-system': {
      pageTree: docsSource.getPageTree('design-system'),
      pages: getNavigationPages('design-system'),
    },
  };

  return (
    <ClientShell docsNavigationData={docsNavigationData}>
      {children}
    </ClientShell>
  );
}
