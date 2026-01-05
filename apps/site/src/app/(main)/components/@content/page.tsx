"use client";
import { useRouter } from "next/navigation";
import { categoryMap, getCategoriesInOrder, getComponentsInCategoryOrder } from "@/features/component-docs";
import { BreadcrumbsNav } from "@/features/navigation";
import { Divider, Gallery } from "ui-lab-components";
import { GalleryItemWithPrefetch } from "./gallery-item";
import {
  FaKeyboard,        // input
  FaCircleInfo,      // information
  FaBell,            // feedback
  FaCompass,         // navigation
  FaLayerGroup,      // container
  FaHandPointer,      // action
  FaPuzzlePiece,     // composition
  FaTableCells,      // layout
  FaChartBar,        // data
  FaFlask,           // experimental
} from "react-icons/fa6";

const categoryIcons: Record<string, React.ReactNode> = {
  input: <FaKeyboard className="inline-block w-5 h-5" />,
  information: <FaCircleInfo className="inline-block w-5 h-5" />,
  feedback: <FaBell className="inline-block w-5 h-5" />,
  navigation: <FaCompass className="inline-block w-5 h-5" />,
  container: <FaLayerGroup className="inline-block w-5 h-5" />,
  action: <FaHandPointer className="inline-block w-5 h-5" />,
  composition: <FaPuzzlePiece className="inline-block w-5 h-5" />,
  layout: <FaTableCells className="inline-block w-5 h-5" />,
  data: <FaChartBar className="inline-block w-5 h-5" />,
  experimental: <FaFlask className="inline-block w-5 h-5" />,
};

export default function ComponentsPage() {
  const router = useRouter();
  return (
    <div>
      {/* Breadcrumbs */}
      <BreadcrumbsNav />
      <div className="w-full px-4 bg-background-950 pt-48 pb-12">
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
              {getCategoriesInOrder().map((category) => {
                const componentsInCategory = getComponentsInCategoryOrder(category);
                if (componentsInCategory.length === 0) return null;
                return (
                  <div key={category} className="space-y-4">
                    {/* Category Header */}
                    <div className="mb-4 flex items-center">
                      <div>
                        <h4 className="text-2xl pt-2 font-semibold text-foreground-50 flex items-center">
                          <div className="text-foreground-500 mr-4 mb-0.5">
                            {categoryIcons[category]}
                          </div>
                          {categoryMap[category].label}
                        </h4>
                        <p className="text-sm w-[47ch] text-foreground-400 mt-3 flex items-start">
                          {categoryMap[category].description}
                        </p>
                      </div>
                    </div>
                    <Divider className="mb-8 mt-4" />
                    {/* Components Grid */}
                    <Gallery columns={{ md: 1, lg: 2 }}>
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
    </div>
  );
}
