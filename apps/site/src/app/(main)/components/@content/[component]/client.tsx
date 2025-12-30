"use client";

import { ComponentConfigurator } from "@/components/component-configurator";
import { getComponentById, getComponentMetadata } from "@/lib/component-registry";
import { TableOfContents } from "@/components/TableOfContents";
import { Table, type Column } from "@/components/table";
import { InlineCodeHighlight } from "@/components/InlineCodeHighlight";
import { CodeBlock } from "@/components/CodeBlock";
import { Toaster, Tabs, TabsList, TabsTrigger, TabsContent, Button, Flex } from "ui-lab-components";
import { useState, useMemo } from "react";
import { generatedAPI, generatedStyles, reactAriaUrls, sourceUrls } from "ui-lab-registry";
import { FaGithub } from "react-icons/fa6";
import { SiAdobe } from "react-icons/si";
import { BreadcrumbsNav } from "@/components/layout/BreadcrumbsNav";

export function ComponentDetailClient({ componentId }: { componentId: string }) {
  const component = useMemo(() => getComponentById(componentId), [componentId]);
  const metadata = useMemo(() => getComponentMetadata(componentId), [componentId]);

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
  const firstExample = component.examples[0];
  const remainingExamples = component.examples.slice(1);

  const getTocItems = () => {
    if (activeTab === "examples") {
      return remainingExamples.map((example) => ({
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
      if (styles) {
        items.push({ id: "styles-css-module", title: "CSS Module", level: 2 });
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
            <div className="space-y-2 min-h-32 mt-28">
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
            {firstExample && (
              <div className="space-y-4 mb-12">
                <ComponentConfigurator
                  title=""
                  description=""
                  code={firstExample.code}
                  language="typescript"
                  controls={firstExample.controls}
                  renderPreview={firstExample.renderPreview}
                  previewHeight={firstExample.previewHeight}
                  previewLayout={firstExample.previewLayout}
                >
                  {firstExample.preview}
                </ComponentConfigurator>
              </div>
            )}
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
                    {remainingExamples.map((example) => (
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

function StylesDocumentation({ componentId, styles }: { componentId: string; styles: string }) {
  if (!styles) {
    return (
      <div className="text-foreground-400 py-8">
        <p>No styles documentation available for this component.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div id="styles-css-module" className="scroll-mt-20">
        <h3 className="text-lg font-semibold text-foreground-50 mb-4">CSS Module</h3>
        <CodeBlock language="css" heading="styles.module.css">{styles}</CodeBlock>
      </div>
    </div>
  );
}
