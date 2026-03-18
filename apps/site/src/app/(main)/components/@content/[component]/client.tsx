"use client";

import { ComponentConfigurator } from "@/features/component-docs";
import { getComponentById, getComponentMetadata } from "@/features/component-docs";
import { TableOfContents, Table, type Column } from "@/features/docs";
import { CopyComponentPage } from "@/features/docs";
import { OpenPage } from "@/features/docs";
import { cn } from "@/shared";
import { Code, InlineCodeHighlight } from "@/features/docs";
import { Toaster, Tabs, TabsList, TabsTrigger, TabsContent, Button, Flex, Tooltip } from "ui-lab-components";
import { useState, useMemo } from "react";
import type { ComponentAPI } from "ui-lab-registry";
import { FaFlask, FaGithub } from "react-icons/fa6";
import { Footer } from "@/features/layout";
import { useChat } from "@/features/chat";

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

export function ComponentClient({ componentId, api, styles, reactAriaUrl, sourceUrl }: {
  componentId: string;
  api: ComponentAPI | null;
  styles: StyleInfo | null;
  reactAriaUrl: string | null;
  sourceUrl: string | null;
}) {
  const { isOpen: isChatOpen } = useChat();
  const component = useMemo(() => getComponentById(componentId), [componentId]);
  const metadata = useMemo(() => getComponentMetadata(componentId), [componentId]);

  const [activeTab, setActiveTab] = useState("examples");
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(["examples"]));

  const firstExample = useMemo(() => component?.examples[0], [component]);
  const remainingExamples = useMemo(() => component?.examples.slice(1) ?? [], [component]);

  const tocItems = useMemo(() => {
    if (!component) return [];
    if (activeTab === "examples") {
      return remainingExamples.map((example) => ({
        id: example.id,
        title: example.title,
        level: 3,
      }));
    }

    if (activeTab === "api") {
      const items: any[] = [];
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
      if (styles && styles.cssVariables && styles.cssVariables.length > 0) {
        items.push({ id: "css-variables", title: "CSS Variables", level: 2 });
      }
      if (styles && styles.rawCss) {
        items.push({ id: "styles-css-module", title: "Full Stylesheet", level: 2 });
      }
      return items;
    }

    return [];
  }, [activeTab, api, styles, remainingExamples, component]);

  if (!component) {
    return (
      <div className={cn("grid grid-cols-1", isChatOpen ? "md:grid-cols-1" : "md:grid-cols-[4fr_1fr]")}>
        <div className={cn("flex flex-col justify-center mt-(--header-height)")}>
          <div className="flex items-center">
            <div className="pt-12 mx-auto max-w-3xl pb-12">
              <h2 className="text-4xl font-bold text-foreground-50">Component Not Found</h2>
              <p className="text-foreground-400 mt-4">The component you're looking for doesn't exist.</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(" px-2 md:px-6 lg:px-12 grid grid-cols-1", isChatOpen ? "md:grid-cols-1" : "md:grid-cols-[4fr_1fr]")}>
      <div className="flex flex-col max-w-4xl mx-auto w-full justify-center mt-(--header-height)">
        <Toaster />
        <div>
          <div className="pt-12 pb-12">
            <div className="space-y-2 min-h-32">
              <div className="h-25 flex flex-col mb-12 relative">
                {metadata?.experimental && (
                  <Tooltip content="Experimental" position="left" showArrow>
                    <span className="absolute right-0 ml-auto inline-block px-2 py-1 text-xs font-semibold bg-accent-500/20 text-accent-300 rounded-md">
                      <FaFlask size={14} />
                    </span>
                  </Tooltip>
                )}
                <h3 className="font-bold text-foreground-50">{component.name}</h3>
                <p className="text-md text-foreground-400 max-w-[66ch]">{component.description}</p>
              </div>
              <div className="h-10 flex gap-3 flex-row mb-4 mt-4">
                {sourceUrl && (
                  <Button variant="outline" onClick={() => window.open(sourceUrl, '_blank')}>
                    <FaGithub size={19} className="mr-4 text-foreground-400" /> Source
                  </Button>
                )}
                {reactAriaUrl && (
                  <Button variant="outline" onClick={() => window.open(reactAriaUrl, '_blank')}>
                    <div className="mr-4"><ReactAriaSvg /></div>
                    React Aria
                  </Button>
                )}
              </div>
            </div>
            {firstExample && (
              <div className="space-y-4 mb-12">
                <ComponentConfigurator title="" description="" code={firstExample.code} language="typescript"
                  controls={firstExample.controls} renderPreview={firstExample.renderPreview}
                  previewHeight={firstExample.previewHeight} previewLayout={firstExample.previewLayout}>
                  {firstExample.preview}
                </ComponentConfigurator>
              </div>
            )}
            <Tabs variant="underline" value={activeTab} onValueChange={(tab) => { setActiveTab(tab); setVisitedTabs((prev) => new Set(prev).add(tab)); }} className="min-h-[calc(100vh-var(--header-height))]">
              <Flex direction="row" justify="space-between" className="border-b border-background-700">
                <TabsList className="grid w-fit grid-cols-3">
                  <TabsTrigger className="pb-3" value="examples">Examples</TabsTrigger>
                  <TabsTrigger className="pb-3" value="api">API</TabsTrigger>
                  <TabsTrigger className="pb-3" value="styles">Styles</TabsTrigger>
                </TabsList>
              </Flex>
              <TabsContent value="examples" className="mt-6">
                <section className="scroll-mt-20">
                  <div className="space-y-4">
                    {remainingExamples.map((example) => (
                      <div key={example.id} id={example.id}>
                        <ComponentConfigurator title={example.title} description={example.description}
                          code={example.code} language="typescript" controls={example.controls}
                          renderPreview={example.renderPreview} previewHeight={example.previewHeight}
                          previewLayout={example.previewLayout}>
                          {example.preview}
                        </ComponentConfigurator>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="api" className="mt-6">
                {visitedTabs.has("api") && <APIDocumentation componentId={componentId} api={api} styleableParts={styles?.styleableParts || []} />}
              </TabsContent>
              <TabsContent value="styles" className="mt-6">
                {visitedTabs.has("styles") && <StylesDocumentation componentId={componentId} styles={styles} />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
      {!isChatOpen && (
        <div className="sticky top-(--header-height) flex  flex-col justify-between h-[calc(100vh-var(--header-height))]">
          <TableOfContents items={tocItems} />
          <div className="space-y-3 px-4 pb-4">
            <OpenPage componentId={componentId} />
            <CopyComponentPage componentId={componentId} />
          </div>
        </div>
      )}
    </div>
  );
}

function APIDocumentation({ api, styleableParts }: { componentId: string; api: any; styleableParts: Array<{ name: string }> }) {
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
    description?: string;
  };

  const propsColumns: Column<PropData>[] = [
    {
      key: "name",
      label: "Name",
      render: (value: any, row: any) => (
        <span className="font-mono text-xs text-foreground-50">
          {value}{row.required && <span className="ml-1 text-background-500">*</span>}
        </span>
      ),
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
  ];

  type SubPropData = {
    name: string;
    type: string;
    required: boolean;
    enumValues?: string[];
    description?: string;
  };

  const subPropsColumns: Column<SubPropData>[] = [
    {
      key: "name",
      label: "Name",
      render: (value: any, row: any) => (
        <span className="font-mono text-xs text-foreground-50">
          {value}{row.required && <span className="ml-1 text-foreground-400">*</span>}
        </span>
      ),
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
  ];

  return (
    <div className="space-y-8">
      {api.props && api.props.length > 0 && (
        <div id="api-props" className="scroll-mt-20 mb-18">
          <Table<PropData>
            data={api.props}
            columns={propsColumns}
            expandRender={(row) => {
              if (row.name === "styles" && styleableParts && styleableParts.length > 0) {
                return (
                  <div className="flex flex-col gap-3 p-2">
                    {row.description && (
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground-500 text-xs font-medium">Description</span>
                        <p className="text-foreground-400 text-xs">{row.description}</p>
                      </div>
                    )}
                    <div className="mt-1">
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-foreground-400 text-sm mt-1">
                        {styleableParts.map((part) => (
                          <li key={part.name}>
                            <InlineCodeHighlight code={`'${part.name}'`} language="typescript" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              if (!row.description && !row.defaultValue) return null;
              return (
                <div className="flex flex-col gap-3 p-2">
                  {row.description && (
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground-500 text-xs font-medium">Description</span>
                      <p className="text-foreground-400 text-xs">{row.description}</p>
                    </div>
                  )}
                  {row.defaultValue && (
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground-500 text-xs font-medium">Default</span>
                      <InlineCodeHighlight code={row.defaultValue} language="typescript" />
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      )}

      {api.subComponents && Object.keys(api.subComponents).length > 0 && (
        <div id="api-subcomponents" className="scroll-mt-20">
          <h4 className="mt-12 text-lg font-semibold text-foreground-50">Sub-Components</h4>
          <div className="space-y-6">
            {Object.entries(api.subComponents).map(([subComponentName, subProps]: [string, any]) => (
              <div key={subComponentName} id={`api-${subComponentName}`} className="space-y-3 mt-20 first:mt-8 scroll-mt-20">
                <div className="pl-2 pb-4 space-y-2">
                  <h4 className="font-semibold text-foreground-100">
                    <InlineCodeHighlight code={subComponentName} language="typescript" />
                  </h4>
                  {subProps.description && (
                    <p className="text-foreground-400 text-sm">{subProps.description}</p>
                  )}
                </div>
                {subProps.props && subProps.props.length > 0 ? (
                  <Table<SubPropData>
                    data={subProps.props}
                    columns={subPropsColumns}
                    expandRender={(row) => row.description ? (
                      <div className="flex flex-col gap-1 p-2">
                        <span className="text-foreground-500 text-xs font-medium">Description</span>
                        <p className="text-foreground-400 text-xs">{row.description}</p>
                      </div>
                    ) : null}
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

type CssVariable = {
  name: string;
  value: string;
  variant?: string | null;
};

type StyleInfo = {
  rawCss: string;
  cssVariables: CssVariable[];
  styleableParts: Array<{ name: string }>;
};

const colorRegex = /(oklch|rgb|rgba|hsl|hsla|#|var|color-mix|transparent)\b/i;

const ColorSwatch = ({ color }: { color: string }) => {
  const isColor = colorRegex.test(color);

  if (!isColor) {
    return null;
  }

  return (
    <div
      className="w-6 h-6 rounded-xs border border-background-700"
      style={{ backgroundColor: color }}
    />
  );
};

function StylesDocumentation({ componentId, styles }: { componentId: string; styles: StyleInfo | null }) {
  const groupedVariables = useMemo(() => {
    if (!styles?.cssVariables) return {};
    const groups: Record<string, CssVariable[]> = {};
    styles.cssVariables.forEach(variable => {
      const variant = variable.variant || 'Base';
      if (!groups[variant]) groups[variant] = [];
      groups[variant].push(variable);
    });
    return groups;
  }, [styles?.cssVariables]);

  if (!styles || (!styles.cssVariables?.length && !styles.rawCss)) {
    return (
      <div className="text-foreground-400 py-8">
        <p>No structured styles documentation available for this component.</p>
        {styles?.rawCss && (
          <div className="mt-8">
            <Code language="css" heading="styles.module.css">{styles.rawCss}</Code>
          </div>
        )}
      </div>
    );
  }

  const cssVariablesColumns: Column<CssVariable>[] = [
    {
      key: 'name',
      label: 'Variable',
      render: (value: string | null | undefined) => <InlineCodeHighlight code={value ?? ''} language="css" />,
    },
    {
      key: 'value',
      label: 'Value',
      render: (value: string | null | undefined) => (
        <span className="flex items-center gap-2">
          <ColorSwatch color={value ?? ''} />
          <InlineCodeHighlight code={value ?? ''} language="css" />
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      {Object.keys(groupedVariables).length > 0 && (
        <div>
          <h3 id="css-variables" className="text-lg font-semibold text-foreground-50 mb-4 scroll-mt-20">
            CSS Variables
          </h3>
          <p className="text-foreground-400 mb-6">
            These CSS custom properties can be overridden to customize the component's appearance.
            Colors displayed inline are automatically detected and rendered.
          </p>
          <div className="space-y-10">
            {Object.entries(groupedVariables).map(([variant, variables]) => (
              <div key={variant}>
                <h4 className="text-xs font-semibold text-foreground-400 ml-2 mb-4">
                  <span className="h-px w-4 bg-background-700" />
                  {variant}
                </h4>
                <Table data={variables} columns={cssVariablesColumns} />
              </div>
            ))}
          </div>
        </div>
      )}



      {styles.rawCss && (
        <div>
          <h3 id="styles-css-module" className="text-lg font-semibold text-foreground-50 mb-4 scroll-mt-20">
            Full Stylesheet
          </h3>
          <Code language="css" heading={`${componentId}.module.css`}>
            {styles.rawCss}
          </Code>
        </div>
      )}
    </div>
  );
}
