"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { categoryMap, getCategoriesInOrder, getComponentsInCategoryOrder, getCategoryIcon } from "@/features/component-docs";
import { BreadcrumbsNav } from "@/features/navigation";
import { Divider, Gallery, Tooltip } from "ui-lab-components";
import { usePrefetchOnHover } from "@/shared";
import { FaFlask } from "react-icons/fa6";

export default function ComponentsPage() {
  const router = useRouter();
  return (
    <div>
      {/* Breadcrumbs */}
      <BreadcrumbsNav />
      <div className="max-w-6xl mx-auto px-4 pt-(--header-height) pb-12">
        <main className="w-full">
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
                  <Gallery columns={{ sm: "1", md: "2", lg: "2", xl: "3" }} gap="md" containerQueryResponsive>
                    {componentsInCategory.map((component) => {
                      const href = `/components/${component.id}`;
                      const { onMouseEnter, onMouseLeave } = usePrefetchOnHover(href);
                      return (
                        <div key={component.id}>
                          <Link
                            href={href}
                            prefetch={false}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            style={{ display: 'none' }}
                          />
                          <Gallery.Item
                            href={href}
                            className='group h-80 bg-background-950 flex-col'
                            orientation='horizontal'
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onClick={() => router.push(href)}
                          >
                            <Gallery.View
                              className="w-full h-45 flex items-center justify-center relative bg-background-950 group-hover:border-background-600 border-b border-background-700 flex-shrink-0"
                            >
                              <div className='w-90 px-4 gap-2 flex items-center justify-center'>
                                {component.preview}
                              </div>
                              <div className='absolute top-0 left-0 w-full h-full'>
                                <div className='hidden grid-paper' />
                              </div>
                            </Gallery.View>

                            <Gallery.Body>
                              <div className="relative flex items-center gap-1 w-full">
                                <h4>{component.name}</h4>
                                {component.experimental && (
                                  <div className='ml-auto'>
                                    <Tooltip content="Experimental: Not fully implemented and requires testing" position="top" showArrow>
                                      <span className="ml-auto inline-block px-2 py-1 text-xs font-semibold bg-accent-500/20 text-accent-300 rounded-md">
                                        <FaFlask size={14} />
                                      </span>
                                    </Tooltip>
                                  </div>
                                )}
                              </div>
                              <p className="text-foreground-400 text-sm">
                                {component.description}
                              </p>
                            </Gallery.Body>
                          </Gallery.Item>
                        </div>
                      );
                    })}
                  </Gallery>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
