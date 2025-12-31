"use client";
import { useRouter } from "next/navigation";
import { categoryMap, getCategoriesInOrder, getComponentsInCategoryOrder } from "@/lib/component-registry";
import { BreadcrumbsNav } from "@/components/layout/BreadcrumbsNav";
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
  input: <FaKeyboard className="inline-block w-full h-full" />,
  information: <FaCircleInfo className="inline-block w-full h-full" />,
  feedback: <FaBell className="inline-block w-full h-full" />,
  navigation: <FaCompass className="inline-block w-full h-full" />,
  container: <FaLayerGroup className="inline-block w-full h-full" />,
  action: <FaHandPointer className="inline-block w-full h-full" />,
  composition: <FaPuzzlePiece className="inline-block w-full h-full" />,
  layout: <FaTableCells className="inline-block w-full h-full" />,
  data: <FaChartBar className="inline-block w-full h-full" />,
  experimental: <FaFlask className="inline-block w-full h-full" />,
};

export default function ComponentsPage() {
  const router = useRouter();
  return (
    <div>
      {/* Breadcrumbs */}
      <BreadcrumbsNav />
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
              {getCategoriesInOrder().map((category) => {
                const componentsInCategory = getComponentsInCategoryOrder(category);
                if (componentsInCategory.length === 0) return null;
                return (
                  <div key={category} className="space-y-4">
                    {/* Category Header */}
                    <div className="mb-4 flex items-center">
                      <div className="w-20 h-20 p-7 mr-6 rounded-md bg-background-700/50 text-foreground-500 flex items-center justify-center">
                        {categoryIcons[category]}
                      </div>
                      <div>
                        <h4 className="text-2xl pt-2 font-semibold text-foreground-50 flex items-center">
                          {categoryMap[category].label}
                        </h4>
                        <p className="text-sm w-[47ch] text-foreground-400 mt-2 flex items-start">
                          {categoryMap[category].description}
                        </p>
                      </div>
                    </div>
                    <Divider className="mb-8 mt-4" />
                    {/* Components Grid */}
                    <Gallery columns={{ base: 1, md: 2, lg: 3 }}>
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
