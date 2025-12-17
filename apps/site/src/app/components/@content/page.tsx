"use client";
import { useRouter } from "next/navigation";
import { getComponentsByCategory, categoryMap, categoryOrder } from "@/lib/component-registry";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Divider, Gallery } from "ui-lab-components";
import { GalleryItemWithPrefetch } from "./gallery-item";

export default function ComponentsPage() {
  const router = useRouter();
  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
        ]}
      />

      <div className="w-full bg-background-950 mx-auto max-w-4xl pt-48 pb-12">
        <main className="w-full">
          <div>
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
                    <Gallery columns={{ base: 1, md: 2, lg: 3 }} gap="0.5rem">
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
                    </Gallery>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        a {
          text-decoration: none;
          color: inherit;
        }
        [data-hovered] .gallery-preview {
          border-bottom-color: var(--background-600);
        }
      `}</style>
    </div>
  );
}
