import { Sidebar } from "@/shared";
import { TableOfContents, type TableOfContentsItem } from "./table-of-contents";
import { CopyPage, OpenPage } from "../page-actions";
import { DocsLayoutChatSync } from "./docs-layout-chat-sync";
import "../../../app/docs.css";
import { Footer } from "@/features/layout";
import { Group } from "ui-lab-components";

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems?: TableOfContentsItem[];
  banner?: React.ReactNode;
}

const EMPTY_TOC_ITEMS: TableOfContentsItem[] = [];
const ROOT_ID = "docs-layout-root";

export function DocsLayout({ children, tocItems = EMPTY_TOC_ITEMS, banner }: DocsLayoutProps) {
  return (
    <>
      <div
        id={ROOT_ID}
        data-chat-open="false"
        className="docs-layout-root grid grid-cols-1 w-full max-w-(--page-width) mx-auto min-h-[calc(100vh-var(--header-height))] lg:grid-cols-[auto_1fr]"
      >
        <DocsLayoutChatSync rootId={ROOT_ID} />
        <Sidebar />

        <div className="docs-layout-inner grid grid-cols-1 min-w-0 min-h-0 lg:grid-cols-[4fr_1fr]">
          {banner && (
            <div className="col-span-full mt-(--header-height)">
              {banner}
            </div>
          )}

          <div
            id="docs"
            className={`flex flex-col justify-center min-w-0 ${banner ? "" : "mt-(--header-height)"}`}
          >
            <div className="flex items-center w-full min-w-0">
              <div className="py-12 px-4 md:px-6 mx-auto max-w-(--content-width) w-full min-w-0">
                {children}
              </div>
            </div>
          </div>

          <div className="docs-toc sticky px-4 top-(--header-height) grid h-[calc(100vh-var(--header-height))] min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-visible">
            <TableOfContents items={tocItems} className="min-h-0" />
            <Group
              orientation="vertical"
              spacing="none"
              className="mb-4 ml-auto w-full shrink-0 overflow-hidden [--background-border:var(--background-700)]"
            >
              <OpenPage />
              <CopyPage />
            </Group>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
