"use client";

import { Sidebar } from "@/components/Sidebar";
import { BreadcrumbsNav } from "@/components/layout/BreadcrumbsNav";
import "../../app/docs.css";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="max-w-(--page-width) mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_auto] min-h-[calc(100vh-var(--header-height))]">
      <Sidebar />
      <div id="docs" className="pt-26">
        <BreadcrumbsNav />
        {children}
      </div>
    </div>
  );
}
