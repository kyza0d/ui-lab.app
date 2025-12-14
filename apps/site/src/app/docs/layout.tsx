"use client";

import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import "../docs.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="docs-typography">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Documentation", href: "/docs" },
          ]}
        />
        {children}
      </div>
    </div>
  );
}
