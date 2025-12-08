"use client";

import { ComponentConfigurator } from "@/components/component-configurator";
import { getComponentById } from "@/lib/component-registry";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { Toaster } from "@ui-lab/components";

export function ComponentDetailClient({ componentId }: { componentId: string }) {
  const component = getComponentById(componentId);

  if (!component) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <Sidebar />
        <div>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
            ]}
          />
          <div className="w-full bg-background-950 mx-auto">
            <main className="w-full">
              <div className="px-8 py-8 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-foreground-50">Component Not Found</h2>
                  <p className="text-foreground-400">
                    The component you're looking for doesn't exist.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  const tocItems = component.examples.map((example) => ({
    id: example.id,
    title: example.title,
  }));

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: component.name, href: `/components/${componentId}` },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_16%] gap-0">
          <Toaster />
          <div className="w-full bg-background-950 max-w-2xl mx-auto">
            <div>
              <main className="w-full">
                <div className="px-8 py-8 space-y-8">
                  <div className="space-y-2">
                    <h2 className="font-bold text-foreground-50">{component.name}</h2>
                    <p className="text-md text-foreground-400">{component.description}</p>
                  </div>
                  <section className="scroll-mt-20">
                    <div className="space-y-4">
                      {component.examples.map((example) => (
                        <div key={example.id} id={example.id}>
                          <ComponentConfigurator
                            title={example.title}
                            description={example.description}
                            code={example.code}
                            language="typescript"
                            controls={example.controls}
                            renderPreview={example.renderPreview}
                          >
                            {example.preview}
                          </ComponentConfigurator>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </main>
            </div>
          </div>
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </div>
  );
}
