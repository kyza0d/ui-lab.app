"use client";

import { ComponentConfigurator } from "@/components/component-configurator";
import { getComponentById, getComponentMetadata } from "@/lib/component-registry";
import { TableOfContents } from "@/components/TableOfContents";
import { Table, type Column } from "@/components/table";
import { InlineCodeHighlight } from "@/components/InlineCodeHighlight";
import { Toaster, Tabs, TabsList, TabsTrigger, TabsContent, Button, Flex } from "ui-lab-components";
import { useState } from "react";
import { generatedAPI, generatedStyles, reactAriaUrls, sourceUrls } from "ui-lab-registry";
import { FaGithub } from "react-icons/fa6";
import { SiAdobe } from "react-icons/si";
import { BreadcrumbsNav } from "@/components/layout/BreadcrumbsNav";

export function ComponentDetailClient({ componentId }: { componentId: string }) {
  const component = getComponentById(componentId);
  const metadata = getComponentMetadata(componentId);

  if (!component) {
    return (
      <div>
        <BreadcrumbsNav />
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
    );
  }

  const [activeTab, setActiveTab] = useState("examples");

  const getTocItems = () => {
    if (activeTab === "examples") {
      return component.examples.map((example) => ({
        id: example.id,
        title: example.title,
        level: 3,
      }));
    }

    if (activeTab === "api") {
      const items: any[] = [];
      const api = generatedAPI[componentId];
      if (api?.props && api.props.length > 0) {
        items.push({ id: "api-props", title: "Props", level: 2 });
      }
      if (api?.subComponents && Object.keys(api.subComponents).length > 0) {
        items.push({ id: "api-subcomponents", title: "Sub-Components", level: 2 });
        Object.keys(api.subComponents).forEach((subComponentName) => {
          items.push({ id: `api-${subComponentName}`, title: subComponentName, level: 3 });
        });
      }
      return items;
    }

    if (activeTab === "styles") {
      const items: any[] = [];
      const styles = generatedStyles[componentId];
      if (styles?.cssVariables && styles.cssVariables.length > 0) {
        items.push({ id: "styles-css-variables", title: "CSS Variables", level: 2 });
      }
      if (styles?.classes && styles.classes.length > 0) {
        items.push({ id: "styles-classes", title: "Classes", level: 2 });
      }
      if (styles?.variants && Object.keys(styles.variants).length > 0) {
        items.push({ id: "styles-variants", title: "Variants", level: 2 });
      }
      if (styles?.sizes && styles.sizes.length > 0) {
        items.push({ id: "styles-sizes", title: "Sizes", level: 2 });
      }
      return items;
    }

    return [];
  };

  const tocItems = getTocItems();

  return (
    <div>
      <BreadcrumbsNav />
      <div className="w-full text-foreground-100 ">
        <Toaster />
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
            <div className="space-y-2 min-h-48 mt-28">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-foreground-50">{component.name}</h2>
                {metadata?.experimental && (
                  <span className="inline-block px-2 py-1 text-sm font-semibold bg-accent-500/20 text-accent-300 rounded">
                    Experimental
                  </span>
                )}
              </div>
              <p className="text-md text-foreground-400">{component.description}</p>
            </div>
            <Tabs variant="underline" value={activeTab} onValueChange={setActiveTab} className="w-full min-h-[calc(100vh-var(--header-height))]">
              <Flex direction="row" justify="space-between" className="border-b border-background-700">
                <TabsList className="grid w-fit grid-cols-3 h-10">
                  <TabsTrigger className="text-sm" value="examples">Examples</TabsTrigger>
                  <TabsTrigger className="text-sm" value="api">API</TabsTrigger>
                  <TabsTrigger className="text-sm" value="styles">Styles</TabsTrigger>
                </TabsList>
                <div className="space-x-2">
                  {sourceUrls[componentId] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(sourceUrls[componentId], '_blank')}
                    >
                      <FaGithub className="mr-4 text-foreground-400" /> Source
                    </Button>
                  )}
                  {reactAriaUrls[componentId] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(reactAriaUrls[componentId], '_blank')}
                    >
                      <SiAdobe className="mr-4 text-foreground-400" /> React Aria
                    </Button>
                  )}
                </div>
              </Flex>
              <TabsContent value="examples" className="mt-6">
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
                          previewHeight={example.previewHeight}
                          previewLayout={example.previewLayout}
                        >
                          {example.preview}
                        </ComponentConfigurator>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="api" className="mt-6">
                <APIDocumentation componentId={componentId} api={generatedAPI[componentId]} />
              </TabsContent>
              <TabsContent value="styles" className="mt-6">
                <StylesDocumentation componentId={componentId} styles={generatedStyles[componentId]} />
              </TabsContent>
            </Tabs>
          </main>
          <div className="w-full lg:w-auto">
            {tocItems.length > 0 && <TableOfContents items={tocItems} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function APIDocumentation({ componentId, api }: { componentId: string; api: any }) {
  if (!api) {
    return (
      <div className="text-foreground-400 py-8">
        <p>No API documentation available for this component.</p>
      </div>
    );
  }

  type PropData = {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    enumValues?: string[];
  };

  const propsColumns: Column<PropData>[] = [
    {
      key: "name",
      label: "Name",
      render: (value) => <span className="font-mono text-sm text-foreground-50">{value}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (value, row) => {
        if (row.enumValues && row.enumValues.length > 0) {
          const enumCode = row.enumValues.map((v) => `"${v}"`).join(" | ");
          return <InlineCodeHighlight code={enumCode} language="typescript" />;
        }
        return <InlineCodeHighlight code={value} language="typescript" />;
      },
    },
    {
      key: "required",
      label: "Required",
      render: (value) => (
        <span className={value ? "text-danger-400" : "text-foreground-500"}>
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "defaultValue",
      label: "Default",
      render: (value) => (
        value ? <InlineCodeHighlight code={value} language="typescript" /> : <span className="text-foreground-500">-</span>
      ),
    },
  ];

  type SubPropData = {
    name: string;
    type: string;
    required: boolean;
    enumValues?: string[];
  };

  const subPropsColumns: Column<SubPropData>[] = [
    {
      key: "name",
      label: "Name",
      render: (value) => <span className="font-mono text-sm text-foreground-50">{value}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (value, row) => {
        if (row.enumValues && row.enumValues.length > 0) {
          const enumCode = row.enumValues.map((v) => `"${v}"`).join(" | ");
          return <InlineCodeHighlight code={enumCode} language="typescript" />;
        }
        return <InlineCodeHighlight code={value} language="typescript" />;
      },
    },
    {
      key: "required",
      label: "Required",
      render: (value) => (
        <span className={value ? "text-danger-400" : "text-foreground-500"}>
          {value ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {api.props && api.props.length > 0 && (
        <div id="api-props" className="scroll-mt-20">
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">Props</h3>
          <Table<PropData>
            data={api.props}
            columns={propsColumns}
          />
        </div>
      )}

      {api.subComponents && Object.keys(api.subComponents).length > 0 && (
        <div id="api-subcomponents" className="scroll-mt-20">
          <h3 className="mt-12 text-lg font-semibold text-foreground-50">Sub-Components</h3>
          <div className="space-y-6">
            {Object.entries(api.subComponents).map(([subComponentName, subProps]: [string, any]) => (
              <div key={subComponentName} id={`api-${subComponentName}`} className="space-y-3 mt-20 first:mt-8 scroll-mt-20">
                <h4 className="font-semibold text-foreground-100">
                  <InlineCodeHighlight code={subComponentName} language="typescript" />
                </h4>
                {subProps && subProps.length > 0 ? (
                  <Table<SubPropData>
                    data={subProps}
                    columns={subPropsColumns}
                  />
                ) : (
                  <p className="text-foreground-400 text-sm">No props</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StylesDocumentation({ componentId, styles }: { componentId: string; styles: any }) {
  if (!styles) {
    return (
      <div className="text-foreground-400 py-8">
        <p>No styles documentation available for this component.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {styles.cssVariables && styles.cssVariables.length > 0 && (
        <div id="styles-css-variables" className="scroll-mt-20">
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">CSS Variables</h3>
          <div className="space-y-2">
            {styles.cssVariables.map((variable: any) => (
              <div key={variable.name} className="p-3 bg-background-800 rounded border border-background-700">
                <div className="font-mono text-sm text-accent-400 mb-1">{variable.name}</div>
                {variable.defaultValue && (
                  <div className="text-foreground-400 text-sm">Default: {variable.defaultValue}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {styles.classes && styles.classes.length > 0 && (
        <div id="styles-classes" className="scroll-mt-20">
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">Classes</h3>
          <div className="flex flex-wrap gap-2">
            {styles.classes.map((cls: any) => (
              <div
                key={cls.name}
                className="px-3 py-2 bg-background-800 rounded border border-background-700 text-foreground-300 text-sm font-mono"
              >
                {cls.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {styles.variants && Object.keys(styles.variants).length > 0 && (
        <div id="styles-variants" className="scroll-mt-20">
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">Variants</h3>
          <div className="space-y-3">
            {Object.entries(styles.variants).map(([variantName, variantValues]: [string, any]) => (
              <div key={variantName}>
                <h4 className="font-medium text-foreground-100 mb-2">{variantName}</h4>
                <div className="flex flex-wrap gap-2">
                  {variantValues.map((value: string) => (
                    <div
                      key={value}
                      className="px-3 py-2 bg-background-800 rounded border border-background-700 text-foreground-300 text-sm font-mono"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {styles.sizes && styles.sizes.length > 0 && (
        <div id="styles-sizes" className="scroll-mt-20">
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {styles.sizes.map((size: string) => (
              <div
                key={size}
                className="px-3 py-2 bg-background-800 rounded border border-background-700 text-foreground-300 text-sm font-mono"
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
