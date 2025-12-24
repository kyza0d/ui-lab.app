'use client';

import { Table, type Column } from "@/components/table";

interface Requirement {
  category: string;
  technology: string;
  minimum: string;
}

export function RequirementsSection() {
  const requirementData: Requirement[] = [
    { category: "Runtime", technology: "React", minimum: "19.0.0-rc" },
    { category: "Styling", technology: "Tailwind CSS", minimum: "4.0.0-alpha.20+" },
    { category: "Language", technology: "TypeScript", minimum: "5.6" },
    { category: "Bundler", technology: "Next.js App Router / Vite", minimum: "2024.12+" },
  ];

  const requirementColumns: Column<Requirement>[] = [
    { key: "category", label: "Category" },
    { key: "technology", label: "Technology" },
    { key: "minimum", label: "Minimum", render: (value) => <code className="text-foreground-400">{value}</code> },
  ];

  return (
    <section id="runtime-requirements" className="text-sm">
      <div className="mb-6 font-semibold text-foreground-50">Runtime requirements</div>
      <Table<Requirement> data={requirementData} columns={requirementColumns} />
    </section>
  );
}
