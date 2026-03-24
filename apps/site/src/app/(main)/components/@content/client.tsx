"use client";

import { categoryMap, getCategoriesInOrder, getComponentsInCategoryOrder, comingSoonComponents } from "@/features/component-docs";
import { TableOfContents, type TableOfContentsItem } from "@/features/docs/components/table-of-contents";
import { previews } from "@/gallery";
import Icon from "@/shared/components/Icon";
import { Icons, CategoryIcons } from "@/shared/components/icon-registry";
import { Divider, Flex, Gallery, Tooltip } from "ui-lab-components";
import { useRouter } from "next/navigation";

const tocItems: TableOfContentsItem[] = getCategoriesInOrder().map((category) => ({
  id: category,
  title: categoryMap[category].label,
  level: 2,
}));

export default function ComponentsPageClient() {
  const router = useRouter();
  return (
    <div className="docs-layout-inner grid grid-cols-1 min-w-0 lg:grid-cols-[4fr_1fr]">
      <div className="flex flex-col justify-center min-w-0 mt-(--header-height)">
        <div className="flex items-center w-full min-w-0">
          <main className="py-12 px-4 md:px-6 mx-auto max-w-(--content-width) w-full min-w-0">
            {/* Organized Components by Category */}
            <div className="space-y-32">
              {getCategoriesInOrder().map((category) => {
                const componentsInCategory = getComponentsInCategoryOrder(category);
                const comingSoonInCategory = comingSoonComponents.filter((c) => c.category === category);
                if (componentsInCategory.length === 0 && comingSoonInCategory.length === 0) return null;
                return (
                  <div key={category} id={category} className="space-y-4">
                    <Flex styles="gap-4">
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
                    <Divider variant="dashed" size="sm" className="mb-8 mt-10" />
                    {/* Components Grid */}
                    <Gallery responsive styles="w-full" columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
                      {componentsInCategory.map((component) => {
                        const href = `/components/${component.id}`;
                        return (
                          <div key={component.id}>
                            <Gallery.Item
                              href={href}
                              className='group h-full rounded-sm bg-background-950 hover:bg-background-900/50'
                              orientation='vertical'
                              onClick={() => router.push(href)}
                            >
                              <Gallery.View
                                className="w-full flex items-center justify-center relative bg-background-950 group-hover:border-background-600 border-b border-background-700 shrink-0"
                              >
                                <div className='max-w-65 px-4 gap-2 flex items-center justify-center'>
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
                                        <span className="ml-auto inline-block px-2 py-1 text-sm font-semibold bg-accent-500/20 text-accent-300 rounded-md">
                                          <Icon IconComponent={Icons.Flask} size={14} />
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
                      {comingSoonInCategory.map((component) => (
                        <div key={component.id} className="opacity-40 pointer-events-none select-none">
                          <Gallery.Item
                            className='group h-full rounded-sm bg-background-950'
                            orientation='vertical'
                          >
                            <Gallery.View
                              className="w-full flex items-center justify-center relative bg-background-950 border-b border-background-700 shrink-0"
                            >
                              <div className='max-w-65 px-4 gap-2 flex items-center justify-center'>
                                {previews[component.id] || <div />}
                              </div>
                            </Gallery.View>

                            <Gallery.Body>
                              <div className="relative flex items-center gap-1 w-full">
                                <h4>{component.name}</h4>
                                <div className='ml-auto'>
                                  <span className="inline-block px-2 py-1 text-sm font-semibold bg-background-700/40 text-foreground-400 rounded-md">
                                    Soon
                                  </span>
                                </div>
                              </div>
                              <p className="text-foreground-400 text-sm">
                                {component.description}
                              </p>
                            </Gallery.Body>
                          </Gallery.Item>
                        </div>
                      ))}
                    </Gallery>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
      <div className="docs-toc-rail  sticky top-(--header-height) flex flex-col justify-between h-[calc(100vh-var(--header-height))]">
        <TableOfContents items={tocItems} mode="static" />
      </div>
    </div>
  );
}
