"use client";

import { categoryMap, getCategoriesInOrder, getComponentsInCategoryOrder } from "@/features/component-docs";
import { previews } from "@/gallery";
import Icon from "@/shared/components/Icon";
import { Icons, CategoryIcons } from "@/shared/components/icon-registry";
import { Divider, Flex, Gallery, Tooltip } from "ui-lab-components";
import { useRouter } from "next/navigation";

export default function ComponentsPageClient() {
  const router = useRouter();
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="pt-(--header-height) pb-12">
        <main className="w-full pt-12">
          {/* Organized Components by Category */}
          <div className="space-y-32">
            {getCategoriesInOrder().map((category) => {
              const componentsInCategory = getComponentsInCategoryOrder(category);
              if (componentsInCategory.length === 0) return null;
              return (
                <div key={category} className="space-y-4">
                  <Flex styles="gap-4 px-4">
                    {/* Category Header */}
                    <Flex justify="center" align="center" className="bg-background-800 border border-background-700 w-10 h-10 rounded-sm text-foreground-200 mr-3">
                      <Icon color="var(--foreground-400)" IconComponent={CategoryIcons[category as keyof typeof CategoryIcons] || CategoryIcons.default} size={18} />
                    </Flex>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground-50 flex items-center">
                        {categoryMap[category].label}
                      </h3>
                      <p className="text-sm w-full md:w-[47ch] text-foreground-400 flex items-start">
                        {categoryMap[category].description}
                      </p>
                    </div>
                  </Flex>
                  <Divider variant="dashed" size="sm" className="mx-auto mb-8 mt-10" />
                  {/* Components Grid */}
                  <Gallery className="px-4" styles="w-full" columns={{ sm: "1", md: "2", lg: '3' }} gap="md">
                    {componentsInCategory.map((component) => {
                      const href = `/components/${component.id}`;
                      return (
                        <div key={component.id}>
                          <Gallery.Item
                            href={href}
                            className='group h-70 rounded-sm bg-background-950 hover:bg-background-900/50'
                            orientation='vertical'
                            onClick={() => router.push(href)}
                          >
                            <Gallery.View
                              className="w-full h-40 flex items-center justify-center relative bg-background-950 group-hover:border-background-600 border-b border-background-700 shrink-0"
                            >
                              <div className='w-65 px-4 gap-2 flex items-center justify-center'>
                                {previews[component.id] || <div />}
                              </div>
                              <div className='absolute top-0 left-0 w-full h-full'>
                                {/* <div className='hidden grid-paper' /> */}
                              </div>
                            </Gallery.View>

                            <Gallery.Body>
                              <div className="relative flex items-center gap-1 w-full">
                                <h4>{component.name}</h4>
                                {component.experimental && (
                                  <div className='ml-auto'>
                                    <Tooltip content="🚧 Experimental" position="top" showArrow>
                                      <span className="ml-auto inline-block px-2 py-1 text-xs font-semibold bg-accent-500/20 text-accent-300 rounded-md">
                                        <Icon IconComponent={Icons.Flask} size={14} />
                                      </span>                                    </Tooltip>
                                  </div>
                                )}
                              </div>
                              <p className="text-foreground-400 text-xs">
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
