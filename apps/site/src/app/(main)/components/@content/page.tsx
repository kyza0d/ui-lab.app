"use client";
import { useRouter } from "next/navigation";
import { categoryMap, getCategoriesInOrder, getComponentsInCategoryOrder, getCategoryIcon } from "@/features/component-docs";
import { BreadcrumbsNav } from "@/features/navigation";
import { Divider, Grid } from "ui-lab-components";
import { GalleryItemWithPrefetch } from "./gallery-item";

export default function ComponentsPage() {
  const router = useRouter();
  return (
    <div className="px-8">
      {/* Breadcrumbs */}
      <BreadcrumbsNav />
      <div className="w-full px-4 pt-(--header-height) pb-12">
        <main className="w-full">
          <div>
            {/* Page Header */}
            <div className="space-y-4 mb-28 mt-12">
              <h3 className="font-bold text-foreground-50">Components</h3>
              <p className="text-foreground-400">
                Explore our collection of reusable, accessible components. Click on any component to view details, examples, and code.
              </p>
            </div>
            {/* Organized Components by Category */}
            <div className="space-y-32">
              {getCategoriesInOrder().map((category) => {
                const componentsInCategory = getComponentsInCategoryOrder(category);
                if (componentsInCategory.length === 0) return null;
                return (
                  <div key={category} className="space-y-4">
                    <div className="flex gap-4">
                      {/* Category Header */}
                      <div className="bg-background-800 border border-background-700 w-12 h-12 flex items-center justify-center rounded-md text-foreground-200 mr-3">
                        {getCategoryIcon(category as any)}
                      </div>
                      <div>
                        <h3 className="mb-0 font-semibold text-foreground-50 flex items-center">
                          {categoryMap[category].label}
                        </h3>
                        <p className="text-md w-full md:w-[47ch] text-foreground-400 flex items-start">
                          {categoryMap[category].description}
                        </p>
                      </div>
                    </div>
                    <Divider size="sm" className="mb-8 mt-10" />
                    {/* Components Grid */}
                    <Grid columns="2" gap="md" containerQueryResponsive>
                      {componentsInCategory.map((component) => (
                        <GalleryItemWithPrefetch
                          key={component.id}
                          id={component.id}
                          href={`/components/${component.id}`}
                          name={component.name}
                          description={component.description}
                          preview={component.preview}
                          experimental={component.experimental}
                          onPress={(href) => href && router.push(href)}
                        />
                      ))}
                    </Grid>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
