"use client";

import { ComponentConfigurator } from "@/components/component-configurator";
import { getComponentById } from "@/lib/component-registry";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { Table, type Column } from "@/components/table";
import { InlineCodeHighlight } from "@/components/InlineCodeHighlight";
import { EnumUnionHighlight } from "@/components/EnumUnionHighlight";
import { Toaster, Tabs, TabsList, TabsTrigger, TabsContent, Button, Flex } from "ui-lab-components";
import { useState } from "react";
import { generatedAPI, generatedStyles, reactAriaUrls, sourceUrls } from "ui-lab-registry";
import { FaGithub } from "react-icons/fa6";
import { SiAdobe } from "react-icons/si";

export function ComponentDetailClient({ componentId }: { componentId: string }) {
  const component = getComponentById(componentId);

  if (!component) {
    return (
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
    );
  }

  const [activeTab, setActiveTab] = useState("examples");
  const tocItems = component.examples.map((example) => ({
    id: example.id,
    title: example.title,
  }));

  return (
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
        <div className="w-full bg-background-950 max-w-4xl mx-auto">
          <div>
            <main className="w-full">
              <div className="px-8 pb-12 pt-24 space-y-8">
                <div className="space-y-2">
                  <h2 className="font-bold text-foreground-50">{component.name}</h2>
                  <p className="text-md text-foreground-400">{component.description}</p>
                </div>
                <Tabs variant="underline" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              </div>
            </main>
          </div>
        </div>
        <TableOfContents items={tocItems} />
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
      render: (value) => <span className="font-mono text-xs text-foreground-50">{value}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (value, row) => {
        if (row.enumValues && row.enumValues.length > 0) {
          return <EnumUnionHighlight values={row.enumValues} />;
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
      render: (value) => <span className="font-mono text-xs text-foreground-50">{value}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (value, row) => {
        if (row.enumValues && row.enumValues.length > 0) {
          return <EnumUnionHighlight values={row.enumValues} />;
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
        <div>
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">Props</h3>
          <Table<PropData>
            data={api.props}
            columns={propsColumns}
          />
        </div>
      )}

      {api.subComponents && Object.keys(api.subComponents).length > 0 && (
        <div>
          <h3 className="mt-12 text-lg font-semibold text-foreground-50">Sub-Components</h3>
          <div className="space-y-6">
            {Object.entries(api.subComponents).map(([subComponentName, subProps]: [string, any]) => (
              <div key={subComponentName} className="space-y-3 mt-20 first:mt-8">
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
        <div>
          <h3 className="text-lg font-semibold text-foreground-50 mb-4">CSS Variables</h3>
          <div className="space-y-2">
            {styles.cssVariables.map((variable: any) => (
              <div key={variable.name} className="p-3 bg-background-800 rounded border border-background-700">
                <div className="font-mono text-sm text-accent-400 mb-1">{variable.name}</div>
                {variable.defaultValue && (
                  <div className="text-foreground-400 text-xs">Default: {variable.defaultValue}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {styles.classes && styles.classes.length > 0 && (
        <div>
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
        <div>
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
        <div>
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
