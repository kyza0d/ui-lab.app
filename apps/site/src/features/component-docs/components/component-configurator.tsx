"use client";

import { useState, useMemo } from "react";
import { cn } from "@/shared";
import { Code } from "@/features/docs/components/code-display/code";
import { DEVICE_PRESETS, PreviewContainer, calculateVariantFromWidth } from "@/features/preview";
import { Button, Divider, Group, Scroll } from "ui-lab-components";
import { Select } from "ui-lab-components";
import { EasingPreview } from "./easing-preview";
import { EASING_FUNCTIONS, EASING_KEYS, type EasingKey } from "../lib/easing";
import { FaMinus, FaPlus } from "react-icons/fa6";



interface ControlOption {
  label: string;
  value: string | number | boolean;
}

interface ControlDef {
  name: string;
  label: string;
  type: "select" | "toggle" | "text" | "stepper";
  options?: ControlOption[];
  defaultValue?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
}

type RenderPreviewProps = Record<string, unknown> & {
  handleControlChange?: (name: string, value: ControlValue) => void;
  previewWidth?: number;
  setPreviewWidth?: (width: number) => void;
};

interface RenderContext {
  showCode: boolean;
  activeTab: number;
  controlValues: Record<string, ControlValue>;
  handleControlChange: (name: string, value: ControlValue) => void;
  selectedEasing: EasingKey;
  setSelectedEasing: (easing: EasingKey) => void;
}

type ControlValue = string | number | boolean;

interface ComponentConfiguratorProps {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  children: React.ReactNode;
  tabs?: Array<{
    label: string;
    code: string;
  }>;
  controls?: ControlDef[];
  renderPreview?: (props: RenderPreviewProps) => React.ReactNode;
  customRenderer?: (context: RenderContext) => React.ReactNode;
  hidePreviewToggle?: boolean;
  previewLayout?: "center" | "start";
  resizable?: boolean;
}

const EMPTY_TABS: Array<{ label: string; code: string }> = [];
const EMPTY_CONTROLS: ControlDef[] = [];

function getStepperBounds(control: ControlDef) {
  return {
    min: typeof control.min === "number" ? control.min : 0,
    max: typeof control.max === "number" ? control.max : 99,
    step: typeof control.step === "number" ? control.step : 1,
  };
}

function clampStepperValue(value: number, control: ControlDef) {
  const { min, max } = getStepperBounds(control);
  return Math.min(max, Math.max(min, value));
}

export function ComponentConfigurator({
  title,
  description,
  code,
  language = "tsx",
  children,
  tabs = EMPTY_TABS,
  controls = EMPTY_CONTROLS,
  renderPreview,
  customRenderer,
  hidePreviewToggle = false,
  previewLayout = "center",
  resizable = false,
}: ComponentConfiguratorProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const initialControlValues = useMemo(() => {
    const initialValues: Record<string, ControlValue> = {};
    controls.forEach((control) => {
      initialValues[control.name] =
        control.defaultValue ?? control.options?.[0]?.value ?? "";
    });
    return initialValues;
  }, [controls]);
  const [controlValues, setControlValues] = useState<Record<string, ControlValue>>(initialControlValues);
  const [selectedEasing, setSelectedEasing] = useState<EasingKey>("snappyPop");
  const [previewWidth, setPreviewWidth] = useState<number>(DEVICE_PRESETS.desktop);
  const hasCode = Boolean(code || tabs.length > 0);

  const allTabs = hasCode
    ? code
      ? [{ label: "Usage", code }, ...tabs]
      : tabs
    : EMPTY_TABS;
  const currentCode = allTabs[activeTab]?.code ?? code ?? "";
  const previewVariant = calculateVariantFromWidth(previewWidth);

  const handleControlChange = (name: string, value: ControlValue) => {
    setControlValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const PreviewRenderer = renderPreview;
  const CustomRenderer = customRenderer;
  const previewContent = (
    <Scroll styles={{ track: "pr-6 " }} inline maxHeight="24rem">
      <div
        className={cn(
          resizable ? "w-full" : "w-fit min-w-xs px-10 py-20",
          previewLayout === "center" ? "flex items-center justify-center" : "flex flex-col"
        )}
        style={{ "--button-easing": EASING_FUNCTIONS[selectedEasing].cssVar } as React.CSSProperties}
      >
        {PreviewRenderer ? (
          <PreviewRenderer
            {...controlValues}
            handleControlChange={handleControlChange}
            previewWidth={previewWidth}
            setPreviewWidth={resizable ? setPreviewWidth : undefined}
          />
        ) : children}
      </div>
    </Scroll>
  );
  const codeContent = hasCode ? (
    <div className="bg-background-950/40">
      {allTabs.length > 1 && (
        <div className="border-b border-background-700/80 px-3 py-2">
          <div className="flex flex-wrap gap-2">
            {allTabs.map((tab, index) => (
              <Button
                key={`${tab.label}-${tab.code}`}
                size="sm"
                onClick={() => setActiveTab(index)}
                className={activeTab === index ? "text-accent-500" : "text-foreground-400"}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Code className="rounded-none border-0" language={language} showLineNumbers>{currentCode}</Code>
    </div>
  ) : null;

  // If custom renderer is provided, use it instead of default layout
  if (CustomRenderer) {
    const renderContext: RenderContext = {
      showCode: false,
      activeTab,
      controlValues,
      handleControlChange,
      selectedEasing,
      setSelectedEasing,
    };
    return <CustomRenderer {...renderContext} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      {title && (
        <div className="border-b space-y-2 border-background-700 py-8">
          <h4 className="text-foreground-50">{title}</h4>
          {description && (
            <p className="text-sm text-foreground-400">{description}</p>
          )}
        </div>
      )
      }

      <div className="flex-1 rounded-sm overflow-hidden">
        {!hidePreviewToggle && resizable && (
          <div className="space-y-3">
            <PreviewContainer
              deviceVariant={previewVariant}
              width={previewWidth}
              onWidthChange={setPreviewWidth}
              activeTab="preview"
              onTabChange={() => undefined}
              onDeviceVariantChange={(device) => setPreviewWidth(DEVICE_PRESETS[device])}
              previewClassName={previewLayout === "center" ? "min-h-[25rem]" : "min-h-[21rem]"}
              showWidthLabel
              showCodeTab={false}
            >
              {previewContent}
            </PreviewContainer>
            {codeContent && (
              <div className="overflow-hidden rounded-sm border border-background-700">
                {codeContent}
              </div>
            )}
          </div>
        )}

        {!hidePreviewToggle && !resizable && hasCode && (
          <div className="overflow-hidden rounded-sm border border-background-700">
            <div className="py-4">
              {previewContent}
            </div>
            <div className="border-t border-background-700">
              {codeContent}
            </div>
          </div>
        )}

        {!hidePreviewToggle && !resizable && !hasCode && (
          <div className="border border-background-700 rounded-sm">
            {previewContent}
          </div>
        )}

        {hidePreviewToggle && (
          <div className="overflow-hidden">
            <div className="px-10 py-15">
              {previewContent}
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
                  <label className="text-xs font-medium text-foreground-400">
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
                        <Select.List>
                          {control.options?.map((option) => (
                            <Select.Item key={String(option.value)} value={String(option.value)}>
                              {option.label}
                            </Select.Item>
                          ))}
                        </Select.List>
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
                        "w-full px-3 py-1.5 text-xs font-medium rounded-sm",
                        controlValues[control.name]
                          ? "bg-background-800 text-foreground-300 hover:bg-background-700 border border-background-700"
                          : "bg-background-800 text-foreground-300 hover:bg-background-700 border border-background-700 opacity-50"
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
                      value={String(controlValues[control.name] ?? "")}
                      onChange={(e) =>
                        handleControlChange(control.name, e.target.value)
                      }
                      className="w-full px-2 py-2 text-xs bg-background-800/50 border border-background-700 rounded-sm text-foreground-50 placeholder-foreground-400 hover:border-background-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  )}
                  {control.type === "stepper" && (
                    <Group spacing="none" className="h-9 w-fit max-w-max">
                      <Group.Button
                        variant="secondary"
                        size="sm"
                        isDisabled={Number(controlValues[control.name] ?? control.defaultValue ?? 0) <= getStepperBounds(control).min}
                        onClick={() =>
                          handleControlChange(
                            control.name,
                            clampStepperValue(
                              Number(controlValues[control.name] ?? control.defaultValue ?? 0) - getStepperBounds(control).step,
                              control
                            )
                          )
                        }
                      >
                        <FaMinus size={10} />
                      </Group.Button>
                      <Divider />
                      <Group.Input
                        value={Number(controlValues[control.name] ?? control.defaultValue ?? 0)}
                        variant="default"
                        onChange={(e) => {
                          const nextValue = Number(e.target.value);
                          if (!Number.isNaN(nextValue)) {
                            handleControlChange(control.name, clampStepperValue(nextValue, control));
                          }
                        }}
                        className="w-12"
                      />
                      <Divider />
                      <Group.Button
                        variant="secondary"
                        size="sm"
                        isDisabled={Number(controlValues[control.name] ?? control.defaultValue ?? 0) >= getStepperBounds(control).max}
                        onClick={() =>
                          handleControlChange(
                            control.name,
                            clampStepperValue(
                              Number(controlValues[control.name] ?? control.defaultValue ?? 0) + getStepperBounds(control).step,
                              control
                            )
                          )
                        }
                      >
                        <FaPlus size={10} />
                      </Group.Button>
                    </Group>
                  )}
                </div>
              );
            })}
            {/* Easing Selector - only show if easing control is defined */}
            {controls.some((c) => c.name === "easing") && (
              <div className="space-y-2">
                <label className="text-xs text-foreground-400" htmlFor="interaction-ease-select">
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
                    <Select.List>
                      {EASING_KEYS.map((easing: EasingKey) => (
                        <Select.Item key={easing} value={easing}>
                          <div className="flex items-center gap-2">
                            <EasingPreview easing={easing} size="sm" className="text-accent-500" />
                            <span>{EASING_FUNCTIONS[easing].name}</span>
                          </div>
                        </Select.Item>
                      ))}
                    </Select.List>
                  </Select.Content>
                </Select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
