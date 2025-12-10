"use client";

import { useEffect, useState, useMemo } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { Button } from "ui-lab-components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

import {
  generateThemePalettes,
  generateShikiTheme,
  type ShikiTheme,
} from "@/lib/color-utils";

import { useHeader } from "@/lib/header-context";

// Hook to detect current theme mode
function useThemeMode() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Get initial theme mode
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
    if (currentTheme) {
      setThemeMode(currentTheme);
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
      if (newTheme) {
        setThemeMode(newTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return { themeMode, isClient };
}

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
}: ComponentConfiguratorProps) {
  const { themeMode } = useThemeMode();
  const { currentThemeMode, currentThemeColors } = useHeader();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [controlValues, setControlValues] = useState<Record<string, any>>({});
  const [showCode, setShowCode] = useState<boolean>(false);
  const [shikiTheme, setShikiTheme] = useState<ShikiTheme | null>(null);

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
      const customTheme = generateShikiTheme(palettes, currentThemeMode, `custom-${currentThemeMode}`);
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
          '<code style="display: block; padding: 1rem;">'
        );
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre><code style="display: block; padding: 1rem;">${currentCode}</code></pre>`);
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
    };
    return customRenderer(renderContext);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-background-700 pt-4 pb-8">
          <h5 className="text-foreground-50">{title}</h5>
          {description && (
            <p className="text-sm leading-relaxed text-foreground-400">{description}</p>
          )}
        </div>

        <div className={cn("bg-background-700/40 border border-background-700 rounded-md overflow-hidden", fullWidth && "w-full")}>
          {/* Toggle Header */}
          {!hidePreviewToggle && (
            <div className="flex p-1 items-center justify-between ">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCode(false)}
                  className={!showCode ? "text-accent-500" : "text-foreground-400"}
                >
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCode(true)}
                  className={showCode ? "text-accent-500" : "text-foreground-400"}
                >
                  Code
                </Button>
              </div>

              {showCode && (
                <div className="flex items-center gap-3">
                  {allTabs.length > 1 && (
                    <div className="flex border-l border-background-700 pl-3">
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
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "p-1.5 rounded",
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
                </div>
              )}
            </div>
          )}

          {/* Preview/Code Toggle + Content */}
          <div className={cn("overflow-hidden", !hidePreviewToggle && "border-t border-background-700 bg-background-950/50")}>
            {/* Content */}
            <div>
              {showCode ? (
                <div
                  className="overflow-x-auto text-sm"
                  dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }}
                />
              ) : (
                <div className="p-8 flex items-center justify-center min-h-40">
                  {renderPreview ? renderPreview({ ...controlValues, handleControlChange }) : children}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls Section */}
        {controls.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {controls.map((control) => (
                <div key={control.name} className="space-y-2">
                  <label className="text-sm text-foreground-400">
                    {control.label}
                  </label>
                  {control.type === "select" && (
                    <Select
                      value={String(controlValues[control.name] ?? "")}
                      onValueChange={(value) =>
                        handleControlChange(control.name, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {control.options?.map((option) => (
                          <SelectItem key={String(option.value)} value={String(option.value)}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
