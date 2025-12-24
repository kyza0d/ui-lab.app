"use client";

import { useEffect, useState, useMemo } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { Button, EasingPreview, EASING_FUNCTIONS, EASING_KEYS, type EasingKey } from "ui-lab-components";
import {
  Select,
  SelectListBox,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "ui-lab-components";

import {
  generateThemePalettes,
} from "@/lib/color-utils";
import { generateShikiTheme, type ShikiTheme } from "@/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/lib/themes/syntax-colors";

import { useApp } from "@/lib/app-context";


export interface ControlOption {
  label: string;
  value: string | number | boolean;
}

export interface ControlDef {
  name: string;
  label: string;
  type: "select" | "toggle" | "text";
  options?: ControlOption[];
  defaultValue?: string | number | boolean;
}

export interface RenderContext {
  showCode: boolean;
  activeTab: number;
  controlValues: Record<string, any>;
  handleControlChange: (name: string, value: any) => void;
  selectedEasing: EasingKey;
  setSelectedEasing: (easing: EasingKey) => void;
}

export interface ComponentConfiguratorProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  children: React.ReactNode;
  tabs?: Array<{
    label: string;
    code: string;
  }>;
  controls?: ControlDef[];
  renderPreview?: (props: Record<string, any>) => React.ReactNode;
  customRenderer?: (context: RenderContext) => React.ReactNode;
  hidePreviewToggle?: boolean;
  fullWidth?: boolean;
  previewHeight?: string;
  previewLayout?: "center" | "start";
}

export function ComponentConfigurator({
  title,
  description,
  code,
  language = "typescriptreact",
  children,
  tabs = [],
  controls = [],
  renderPreview,
  customRenderer,
  hidePreviewToggle = false,
  fullWidth = false,
  previewHeight,
  previewLayout = "center",
}: ComponentConfiguratorProps) {
  const { currentThemeMode, currentThemeColors } = useApp();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [controlValues, setControlValues] = useState<Record<string, any>>({});
  const [showCode, setShowCode] = useState<boolean>(false);
  const [shikiTheme, setShikiTheme] = useState<ShikiTheme | null>(null);
  const [selectedEasing, setSelectedEasing] = useState<EasingKey>("snappyPop");

  // Memoize initial control values to prevent infinite re-renders
  const initialControlValues = useMemo(() => {
    const initialValues: Record<string, any> = {};
    controls.forEach((control) => {
      initialValues[control.name] =
        control.defaultValue ?? control.options?.[0]?.value ?? "";
    });
    return initialValues;
  }, []);

  // Initialize control values only once
  useEffect(() => {
    setControlValues(initialControlValues);
  }, []);

  // Generate custom Shiki theme from current theme colors
  useEffect(() => {
    if (currentThemeColors) {
      const palettes = generateThemePalettes(
        currentThemeColors.background,
        currentThemeColors.foreground,
        currentThemeColors.accent,
        currentThemeMode,
        0,
        currentThemeColors.semantic,
        currentThemeColors.accentChromaLimit ?? 0.30,
        currentThemeColors.accentEasing,
        currentThemeColors.accentChromaScaling
      );
      const syntaxPalettes = generateSyntaxPalettes(
        currentThemeColors.background,
        currentThemeColors.accent,
        currentThemeMode,
        currentThemeColors.syntaxVariation ?? 0
      );
      const customTheme = generateShikiTheme(
        { ...palettes, ...syntaxPalettes },
        currentThemeMode,
        `custom-${currentThemeMode}`
      );
      setShikiTheme(customTheme);
    }
  }, [currentThemeColors, currentThemeMode]);

  const allTabs = [{ label: "Usage", code }, ...tabs];
  const currentCode = allTabs[activeTab]?.code || code;

  useEffect(() => {
    const highlight = async () => {
      try {
        // Use custom theme if available, fallback to default themes
        const theme = shikiTheme || (currentThemeMode === "light" ? "vitesse-light" : "vitesse-dark");

        const html = await codeToHtml(currentCode, {
          lang: language,
          theme,
        });
        // Add padding to the code element and display as block
        const styledHtml = html.replace(
          /<code>/,
          '<code style="display: block; padding: 1rem; background: var(--background-950);">'
        );
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre cla><code style="display: block; padding: 1rem">${currentCode}</code></pre>`);
      }
    };

    highlight();
  }, [currentCode, language, currentThemeMode, shikiTheme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleControlChange = (name: string, value: any) => {
    setControlValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // If custom renderer is provided, use it instead of default layout
  if (customRenderer) {
    const renderContext: RenderContext = {
      showCode,
      activeTab,
      controlValues,
      handleControlChange,
      selectedEasing,
      setSelectedEasing,
    };
    return customRenderer(renderContext);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {/* Header */}
        {title && (
          <div className="border-b border-background-700 pt-4 pb-8">
            <h2 className="text-foreground-50">{title}</h2>
            {description && (
              <p className="text-sm leading-relaxed text-foreground-400">{description}</p>
            )}
          </div>
        )
        }

        <div className={cn("border border-background-700 rounded-md overflow-hidden", fullWidth && "w-full")}>
          {!hidePreviewToggle && (
            <Tabs defaultValue="preview" onValueChange={(value) => setShowCode(value === "code")}>
              <TabsList className="bg-transparent justify-start h-12 border-0 rounded-none border-b border-background-700 w-full">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="overflow-hidden mt-0">
                <div
                  className={cn("px-10 py-16", previewHeight, previewLayout === "center" ? "flex items-center justify-center" : "flex flex-col")}
                  style={{ "--button-easing": EASING_FUNCTIONS[selectedEasing].cssVar } as React.CSSProperties}
                >
                  {renderPreview ? renderPreview({ ...controlValues, handleControlChange }) : children}
                </div>
              </TabsContent>

              <TabsContent value="code" className="relative overflow-hidden mt-0">
                <button
                  onClick={handleCopy}
                  className={cn(
                    "absolute right-2 top-2 p-1.5 rounded",
                    "text-foreground-400 hover:text-foreground-50",
                    copied && "text-accent-500"
                  )}
                  title="Copy code"
                >
                  {copied ? (
                    <FaCheck size={16} />
                  ) : (
                    <FaCopy size={16} />
                  )}
                </button>
                {allTabs.length > 1 && (
                  <div className="flex gap-2">
                    {allTabs.map((tab, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setActiveTab(index);
                          setCopied(false);
                        }}
                        className={activeTab === index ? "text-accent-500" : "text-foreground-400"}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                )}
                <div
                  className="overflow-x-auto text-sm"
                  dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }}
                />
              </TabsContent>
            </Tabs>
          )}

          {hidePreviewToggle && (
            <div className="overflow-hidden">
              <div
                className={cn("p-8", previewHeight, previewLayout === "center" ? "flex items-center justify-center" : "flex flex-col")}
                style={{ "--button-easing": EASING_FUNCTIONS[selectedEasing].cssVar } as React.CSSProperties}
              >
                {renderPreview ? renderPreview({ ...controlValues, handleControlChange }) : children}
              </div>
            </div>
          )}
        </div>

        {/* Controls Section */}
        {controls.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {controls.map((control) => {
                // Skip rendering easing control here - it will be handled separately
                if (control.name === "easing") return null;

                return (
                  <div key={control.name} className="space-y-2">
                    <label className="text-sm text-foreground-400">
                      {control.label}
                    </label>
                    {control.type === "select" && (
                      <Select
                        selectedKey={String(controlValues[control.name] ?? "")}
                        defaultValue={control.options?.find(opt => opt.value === controlValues[control.name])?.label ?? control.options?.[0]?.label ?? ""}
                        onSelectionChange={(key) =>
                          handleControlChange(control.name, key)
                        }
                      >
                        <Select.Trigger>
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                          <SelectListBox>
                            {control.options?.map((option) => (
                              <Select.Item key={String(option.value)} value={String(option.value)}>
                                {option.label}
                              </Select.Item>
                            ))}
                          </SelectListBox>
                        </Select.Content>
                      </Select>
                    )}
                    {control.type === "toggle" && (
                      <button
                        onClick={() =>
                          handleControlChange(
                            control.name,
                            !controlValues[control.name]
                          )
                        }
                        className={cn(
                          "w-full px-3 py-1.5 text-sm font-medium rounded-md",
                          controlValues[control.name]
                            ? "bg-background-800 text-foreground-300 hover:bg-background-700 border border-background-700 opacity-50"
                            : "bg-background-800 text-foreground-300 hover:bg-background-700 border border-background-700"
                        )}
                      >
                        {controlValues[control.name]
                          ? control.label
                          : `${control.label} (Off)`}
                      </button>
                    )}
                    {control.type === "text" && (
                      <input
                        type="text"
                        value={controlValues[control.name] ?? ""}
                        onChange={(e) =>
                          handleControlChange(control.name, e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm bg-background-800/50 border border-background-700 rounded-md text-foreground-50 placeholder-foreground-600 hover:border-background-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    )}
                  </div>
                );
              })}
              {/* Easing Selector - only show if easing control is defined */}
              {controls.some((c) => c.name === "easing") && (
                <div className="space-y-2">
                  <label className="text-sm text-foreground-400">
                    Interaction Ease
                  </label>
                  <Select
                    selectedKey={selectedEasing}
                    defaultValue={EASING_FUNCTIONS[selectedEasing]?.name || ""}
                    onSelectionChange={(key) =>
                      setSelectedEasing(key as EasingKey)
                    }
                  >
                    <Select.Trigger>
                      <div className="flex items-center gap-2">
                        <EasingPreview easing={selectedEasing} size="sm" className="text-accent-500" />
                        <span>{EASING_FUNCTIONS[selectedEasing].name}</span>
                      </div>
                    </Select.Trigger>
                    <Select.Content>
                      <SelectListBox>
                        {EASING_KEYS.map((easing: EasingKey) => (
                          <Select.Item key={easing} value={easing}>
                            <div className="flex items-center gap-2">
                              <EasingPreview easing={easing} size="sm" className="text-accent-500" />
                              <span>{EASING_FUNCTIONS[easing].name}</span>
                            </div>
                          </Select.Item>
                        ))}
                      </SelectListBox>
                    </Select.Content>
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
