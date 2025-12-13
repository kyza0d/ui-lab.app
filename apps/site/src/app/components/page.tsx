"use client";

import Link from "next/link";
import { getComponentsByCategory, categoryMap, categoryOrder } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Divider } from "ui-lab-components";

export default function ComponentsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar />

      <div>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
          ]}
        />

        <div className="w-full bg-background-950 mx-auto max-w-6xl">
          <main className="w-full">
            <div className="px-8 py-8">

              {/* Page Header */}
              <div className="space-y-4 mb-18">
                <h2 className="text-4xl font-bold text-foreground-50">Components</h2>
                <p className="text-foreground-400">
                  Explore our collection of reusable, accessible components. Click on any component to view details, examples, and code.
                </p>
              </div>

              {/* Organized Components by Category */}
              <div className="space-y-24">
                {categoryOrder.map((category) => {
                  const componentsInCategory = getComponentsByCategory(category);
                  if (componentsInCategory.length === 0) return null;

                  return (
                    <div key={category} className="space-y-4">
                      {/* Category Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-semibold text-foreground-50">
                          {categoryMap[category].label}
                        </h3>
                        <p className="text-sm text-foreground-400">
                          {categoryMap[category].description}
                        </p>
                      </div>
                      <Divider className="mb-6 mt-2" />

                      {/* Components Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {componentsInCategory.map((component) => (
                          <Link key={component.id} href={`/components/${component.id}`}>
                            <div
                              className={cn(
                                "h-full rounded-xl border border-background-700 overflow-hidden",
                                "hover:border-background-600",
                                "cursor-pointer group",
                                "flex flex-col"
                              )}
                            >
                              {/* Component Preview */}
                              <div className="px-4 flex items-center justify-center min-h-30 bg-background-900 border-b border-background-700 group-hover:border-background-600">
                                {component.preview}
                              </div>

                              {/* Component Info */}
                              <div className="p-3 space-y-2">
                                <h4 className="font-semibold text-foreground-50 group-hover:text-foreround-50">
                                  {component.name}
                                </h4>
                                <p className="text-sm text-foreground-400 line-clamp-2">
                                  {component.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
