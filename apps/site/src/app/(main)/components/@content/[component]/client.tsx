"use client";

import { ComponentConfigurator } from "@/features/component-docs";
import { getComponentById, getComponentMetadata } from "@/features/component-docs";
import { TableOfContents, Table, type Column } from "@/features/docs";
import { CodeBlock, InlineCodeHighlight } from "@/shared";
import { Toaster, Tabs, TabsList, TabsTrigger, TabsContent, Button, Flex, Tooltip, Divider } from "ui-lab-components";
import { useState, useMemo } from "react";
import { generatedAPI, generatedStyles, reactAriaUrls, sourceUrls } from "ui-lab-registry";
import { FaFlask, FaGithub } from "react-icons/fa6";
import { SiAdobe } from "react-icons/si";
import { BreadcrumbsNav } from "@/features/navigation";

const ReactAriaSvg = () => (
  <svg
    viewBox="200 206 800 790"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-background-500 w-5 h-5"
  >
    <path
      d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z"
      fill="currentColor"
    />
  </svg>
);

export function ComponentClient({ componentId }: { componentId: string }) {
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
      <div className="w-full mx-auto text-foreground-100 ">
        <Toaster />
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main className="w-full relative mx-auto max-w-3xl px-6 py-16 lg:w-48rem">
            <div className="space-y-2 min-h-32 mt-(--header-height)">
              <div className="flex flex-col mb-12">
                {metadata?.experimental && (
                  <Tooltip content="Experimental: Not fully implemented and requires testing" position="left" showArrow>
                    <span className="absolute right-0 ml-auto inline-block px-2 py-1 text-xs font-semibold bg-accent-500/20 text-accent-300 rounded-md">
                      <FaFlask size={14} />
                    </span>
                  </Tooltip>
                )}
                <h3 className="font-bold text-foreground-50">{component.name}</h3>
                <p className="text-md text-foreground-400 max-w-[66ch]">{component.description}</p>
              </div>
              <div className="flex gap-3 flex-row mb-4 mt-4">
                {sourceUrls[componentId] && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(sourceUrls[componentId], '_blank')}
                  >
                    <FaGithub size={19} className="mr-4 text-foreground-400" /> Source
                  </Button>
                )}
                {reactAriaUrls[componentId] && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(reactAriaUrls[componentId], '_blank')}
                  >
                    <div className="mr-4">
                      <ReactAriaSvg />
                    </div>
                    React Aria
                  </Button>
                )}
              </div>
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
      render: (value: any) => <span className="font-mono text-sm text-foreground-50">{value}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (value: any, row: any) => {
        if (row.enumValues && row.enumValues.length > 0) {
          const enumCode = row.enumValues.map((v: any) => `"${v}"`).join(" | ");
          return <InlineCodeHighlight code={enumCode} language="typescript" />;
        }
        return <InlineCodeHighlight code={value} language="typescript" />;
      },
    },
    {
      key: "required",
      label: "Required",
      render: (value: any) => (
        <span className={value ? "text-danger-400" : "text-foreground-500"}>
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "defaultValue",
      label: "Default",
      render: (value: any) => (
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
      render: (value: any) => <span className="font-mono text-sm text-foreground-50">{value}</span>,
    },
    {
      key: "type",
      label: "Type",
      render: (value: any, row: any) => {
        if (row.enumValues && row.enumValues.length > 0) {
          const enumCode = row.enumValues.map((v: any) => `"${v}"`).join(" | ");
          return <InlineCodeHighlight code={enumCode} language="typescript" />;
        }
        return <InlineCodeHighlight code={value} language="typescript" />;
      },
    },
    {
      key: "required",
      label: "Required",
      render: (value: any) => (
        <span className={value ? "text-danger-400" : "text-foreground-500"}>
          {value ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {api.props && api.props.length > 0 && (
        <div id="api-props" className="scroll-mt-20 mb-18">
          <Table<PropData>
            data={api.props}
            columns={propsColumns}
          />
        </div>
      )}

      {api.subComponents && Object.keys(api.subComponents).length > 0 && (
        <div id="api-subcomponents" className="scroll-mt-20">
          <h4 className="mt-12 text-lg font-semibold text-foreground-50">Sub-Components</h4>
          <div className="space-y-6">
            {Object.entries(api.subComponents).map(([subComponentName, subProps]: [string, any]) => (
              <div key={subComponentName} id={`api-${subComponentName}`} className="space-y-3 mt-20 first:mt-8 scroll-mt-20">
                <h4 className="pl-2 pb-4 font-semibold text-foreground-100">
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
        <CodeBlock language="css" heading="styles.module.css">{styles}</CodeBlock>
      </div>
    </div>
  );
}
