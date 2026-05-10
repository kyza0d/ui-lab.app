"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useApp, useThemeStorage } from "@/features/theme";
import { generateThemeSetupFiles } from "@/features/theme/config";
import { Code } from "@/features/docs/components/code-display/code";
import { SliderControl } from "@/features/theme/components/settings/shared-components";
import { BODY_FONTS, HEADER_FONTS, MONO_FONTS, type FontKey } from "@/features/theme/constants/font-config";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Expand,
  Flex,
  Grid,
  Input,
  Label,
  Page,
  Progress,
  Select,
  Switch,
  Table,
  Tabs,
} from "ui-lab-components";
import { FaDownload, FaMoon, FaSun } from "react-icons/fa6";

const SETUP_INSTALL = `pnpm add ui-lab-components`;


function ControlSectionLabel({ children }: { children: string }) {
  return (
    <Label size="sm" styles="font-semibold text-foreground-300">
      {children}
    </Label>
  );
}

function FontSelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: FontKey;
  options: Array<{ name: FontKey; isDefault: boolean }>;
  onChange: (font: FontKey) => void;
}) {
  return (
    <div className="space-y-2">
      <ControlSectionLabel>{label}</ControlSectionLabel>
      <Select
        className="w-full"
        selectedKey={value}
        onSelectionChange={(key) => onChange(key as FontKey)}
      >
        <Select.Trigger className="w-full">
          <Select.Value placeholder={label} />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            {options.map((font) => (
              <Select.Item
                key={font.name}
                value={font.name}
                textValue={font.name}
              >
                {font.isDefault ? `${font.name} (default)` : font.name}
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select>
    </div>
  );
}

function PreviewCanvas() {
  const {
    currentThemeColors,
    currentThemeMode,
    radius,
    borderWidth,
    spacingScale,
    selectedBodyFont,
    selectedHeaderFont,
    selectedMonoFont,
  } = useApp();

  if (!currentThemeColors) return null;

  const tableData = [
    { component: "Button", status: "Stable", version: "1.0" },
    { component: "Input", status: "Stable", version: "1.0" },
    { component: "Modal", status: "Beta", version: "0.9" },
  ];

  const tableColumns = [
    { key: "component" as const, label: "Component" },
    { key: "status" as const, label: "Status" },
    { key: "version" as const, label: "Version" },
  ];

  return (
    <Card className="overflow-hidden border-background-700/80 bg-background-900 xl:min-h-[760px]">
      <CardBody className="p-0">
        <Flex align="center" justify="between" wrap="wrap" className="gap-3 border-b border-background-700/70 px-5 py-4">
          <Flex align="center" className="gap-3">
            <span className="size-3 rounded-full bg-accent-500" />
            <span className="text-sm font-semibold text-foreground-100">Live preview</span>
            <Badge>{currentThemeMode}</Badge>
          </Flex>
        </Flex>

        <div className="grid gap-0 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="border-b border-background-700/70 px-5 py-5 xl:border-b-0 xl:border-r xl:px-6 xl:py-6 space-y-5">
            <div className="space-y-2">
              <Badge>Design surface</Badge>
              <h2 className="text-3xl font-semibold text-foreground-50">
                Calm, open, and clear.
              </h2>
            </div>

            <Flex wrap="wrap" className="gap-3">
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Delete</Button>
            </Flex>

            <div className="space-y-2">
              <Label htmlFor="preview-email">Email address</Label>
              <Input id="preview-email" placeholder="you@example.com" />
            </div>

            <Card className="border-background-700 bg-background-900/70">
              <CardBody className="space-y-3 p-4">
                <Flex align="center" justify="between" className="gap-3">
                  <span className="text-sm font-semibold text-foreground-100">
                    Spacing
                  </span>
                  <span className="text-sm text-foreground-400">
                    {spacingScale.toFixed(2)}x
                  </span>
                </Flex>
                <Progress value={65} />
                <span className="text-xs text-foreground-400">{selectedBodyFont} / {selectedHeaderFont} / {selectedMonoFont}</span>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-4 px-5 py-5 xl:px-6 xl:py-6">
            <Card className="border-background-700 bg-background-900/70">
              <CardBody className="space-y-3 p-4">
                <Flex align="center" justify="between" className="gap-3">
                  <span className="text-sm font-semibold text-foreground-100">
                    Current setup
                  </span>
                  <Badge>{radius.toFixed(1)}rem radius</Badge>
                </Flex>
                <Divider />
                <Flex wrap="wrap" className="gap-2">
                  <Badge>{borderWidth}px border</Badge>
                  <Badge>{spacingScale.toFixed(2)}x spacing</Badge>
                </Flex>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="space-y-3 p-4">
                <Flex align="center" className="gap-2">
                  <Switch defaultSelected />
                  <span className="text-sm text-foreground-300">Notifications</span>
                </Flex>
                <Checkbox defaultSelected label="Remember me" />
              </CardBody>
            </Card>

            <Table data={tableData} columns={tableColumns} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function ControlsRail() {
  const {
    currentThemeMode,
    setCurrentThemeMode,
    radius,
    setRadius,
    borderWidth,
    setBorderWidth,
    spacingScale,
    setSpacingScale,
    selectedBodyFont,
    setSelectedBodyFont,
    selectedHeaderFont,
    setSelectedHeaderFont,
    selectedMonoFont,
    setSelectedMonoFont,
  } = useApp();

  const {
    applyAndPersistLayout,
    applyAndPersistFonts,
    applyAndPersistMode,
  } = useThemeStorage({
    currentThemeMode,
    onLayoutChange: (layout) => {
      setRadius(layout.radius);
      setBorderWidth(layout.borderWidth);
      setSpacingScale(layout.spacingScale);
    },
    onFontsChange: (fonts) => {
      setSelectedBodyFont(fonts.bodyFont);
      setSelectedHeaderFont(fonts.headerFont);
      setSelectedMonoFont(fonts.monoFont);
    },
    onModeChange: setCurrentThemeMode,
  });

  return (
    <Card className="border-background-700/80 bg-background-900/70">
      <CardBody className="space-y-5 p-4">
        <ControlSectionLabel>Controls</ControlSectionLabel>

        <Grid columns={2} gap="xs">
          <Button
            onPress={() => applyAndPersistMode("light")}
            variant={currentThemeMode === "light" ? "secondary" : "ghost"}
            icon={<FaSun size={12} />}
            className="justify-center"
          >
            Light
          </Button>
          <Button
            onPress={() => applyAndPersistMode("dark")}
            variant={currentThemeMode === "dark" ? "secondary" : "ghost"}
            icon={<FaMoon size={12} />}
            className="justify-center"
          >
            Dark
          </Button>
        </Grid>

        <Divider />

        <div className="space-y-3">
          <ControlSectionLabel>Fonts</ControlSectionLabel>
          <div className="grid gap-3">
            <FontSelectField
              label="Body font"
              value={selectedBodyFont}
              options={BODY_FONTS}
              onChange={(font) =>
                applyAndPersistFonts({
                  bodyFont: font,
                  headerFont: selectedHeaderFont,
                  monoFont: selectedMonoFont,
                })
              }
            />
            <FontSelectField
              label="Header font"
              value={selectedHeaderFont}
              options={HEADER_FONTS}
              onChange={(font) =>
                applyAndPersistFonts({
                  bodyFont: selectedBodyFont,
                  headerFont: font,
                  monoFont: selectedMonoFont,
                })
              }
            />
            <FontSelectField
              label="Mono font"
              value={selectedMonoFont}
              options={MONO_FONTS}
              onChange={(font) =>
                applyAndPersistFonts({
                  bodyFont: selectedBodyFont,
                  headerFont: selectedHeaderFont,
                  monoFont: font,
                })
              }
            />
          </div>
        </div>

        <Divider />

        <div className="space-y-4">
          <ControlSectionLabel>Geometry</ControlSectionLabel>
          <SliderControl
            label="Corner radius"
            value={radius}
            min={0}
            max={1.5}
            step={0.1}
            unit="rem"
            onChange={(value) =>
              applyAndPersistLayout({
                radius: value,
                borderWidth,
                spacingScale,
              })
            }
          />
          <SliderControl
            label="Border width"
            value={borderWidth}
            min={0}
            max={4}
            step={0.5}
            unit="px"
            onChange={(value) =>
              applyAndPersistLayout({
                radius,
                borderWidth: value,
                spacingScale,
              })
            }
          />
          <SliderControl
            label="Spacing density"
            value={spacingScale}
            min={0.75}
            max={1.25}
            step={0.05}
            unit="x"
            onChange={(value) =>
              applyAndPersistLayout({
                radius,
                borderWidth,
                spacingScale: value,
              })
            }
          />
        </div>
      </CardBody>
    </Card>
  );
}

function ExportRail({
  themeCss,
  globalsCss,
  layoutTsx,
  themeToggleTsx,
  themeToggleModuleCss,
  bundleSizeLabel,
  onDownload,
}: {
  themeCss: string;
  globalsCss: string;
  layoutTsx: string;
  themeToggleTsx: string;
  themeToggleModuleCss: string;
  bundleSizeLabel: string;
  onDownload: () => void;
}) {
  return (
    <Card className="border-background-700/80 bg-background-900/70">
      <CardBody className="space-y-4 p-4">
        <Flex align="start" justify="between" className="gap-3">
          <div className="space-y-2">
            <ControlSectionLabel>Export bundle</ControlSectionLabel>
            <span className="text-sm text-foreground-400">5 files · {bundleSizeLabel}</span>
          </div>

          <Button
            onPress={onDownload}
            variant="secondary"
            className="shrink-0"
            icon={<FaDownload size={12} />}
          >
            Download
          </Button>
        </Flex>

        <Tabs default="theme">
          <Tabs.List>
            <Tabs.Trigger value="theme">theme.css</Tabs.Trigger>
            <Tabs.Trigger value="globals">globals.css</Tabs.Trigger>
            <Tabs.Trigger value="layout">layout.tsx</Tabs.Trigger>
            <Tabs.Trigger value="toggle">theme-toggle.tsx</Tabs.Trigger>
            <Tabs.Trigger value="toggle-css">theme-toggle.module.css</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="theme">
            <Code language="css" filename="theme.css">
              {themeCss}
            </Code>
          </Tabs.Content>
          <Tabs.Content value="globals">
            <Code language="css" filename="globals.css">
              {globalsCss}
            </Code>
          </Tabs.Content>
          <Tabs.Content value="layout">
            <Code language="tsx" filename="app/layout.tsx">
              {layoutTsx}
            </Code>
          </Tabs.Content>
          <Tabs.Content value="toggle">
            <Code language="tsx" filename="components/theme-toggle/index.tsx">
              {themeToggleTsx}
            </Code>
          </Tabs.Content>
          <Tabs.Content value="toggle-css">
            <Code language="css" filename="components/theme-toggle/theme-toggle.module.css">
              {themeToggleModuleCss}
            </Code>
          </Tabs.Content>
        </Tabs>

        <Expand title="Setup" defaultExpanded={false}>
          <div className="space-y-4 p-4">
            <div className="space-y-1">
              <Label>1. Install the package</Label>
              <Code language="bash" filename="terminal">
                {SETUP_INSTALL}
              </Code>
            </div>

            <div className="space-y-1">
              <Label>2. Copy `theme.css`</Label>
              <div className="text-sm text-foreground-400">
                Paste the generated token layer into `app/theme.css`.
              </div>
            </div>

            <div className="space-y-1">
              <Label>3. Merge `globals.css` and `layout.tsx`</Label>
              <div className="text-sm text-foreground-400">
                Keep the font imports, theme variables, and server-stamped color mode script.
              </div>
            </div>

            <div className="space-y-1">
              <Label>4. Copy the theme toggle files</Label>
              <div className="text-sm text-foreground-400">
                Render the generated toggle anywhere in your client tree.
              </div>
            </div>
          </div>
        </Expand>
      </CardBody>
    </Card>
  );
}

export default function ConfigPage() {
  const {
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyFontWeightScale,
    headerLineHeight,
    bodyLineHeight,
    radius,
    borderWidth,
    spacingScale,
    selectedBodyFont,
    selectedHeaderFont,
    selectedMonoFont,
  } = useApp();

  useEffect(() => {
    document.body.dataset.configFullBleed = "true";

    return () => {
      delete document.body.dataset.configFullBleed;
    };
  }, []);

  const themeSetup = useMemo(() => {
    if (!currentThemeColors) return null;

    return generateThemeSetupFiles(
      currentThemeColors,
      currentThemeMode,
      headerTypeSizeRatio,
      headerFontSizeScale,
      headerFontWeightScale,
      headerFontWeightScale,
      bodyFontWeightScale,
      headerLineHeight,
      bodyLineHeight,
      radius,
      borderWidth,
      spacingScale,
      undefined,
      {
        bodyFont: selectedBodyFont,
        headerFont: selectedHeaderFont,
        monoFont: selectedMonoFont,
      },
    );
  }, [
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyFontWeightScale,
    headerLineHeight,
    bodyLineHeight,
    radius,
    borderWidth,
    spacingScale,
    selectedBodyFont,
    selectedHeaderFont,
    selectedMonoFont,
  ]);

  const bundleSizeLabel = useMemo(() => {
    if (!themeSetup) return "0 KB";
    const kb = Math.max(1, Math.round(themeSetup.fullBundle.length / 1024));
    return `~${kb} KB`;
  }, [themeSetup]);

  const handleDownload = useCallback(() => {
    if (!themeSetup) return;
    const blob = new Blob([themeSetup.fullBundle], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-lab-theme-setup.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [themeSetup]);

  if (!currentThemeColors) {
    return (
      <div role="status" className="flex items-center justify-center min-h-[400px]">
        <p className="text-foreground-400">Loading configuration...</p>
      </div>
    );
  }

  return (
    <Page padding="md" maxWidth="none" styles="bg-background-950 text-foreground-100 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <Badge>Config</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground-50">
            Design export
          </h1>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.75fr)]">
        <section className="min-w-0">
          <PreviewCanvas />
        </section>

        <aside className="space-y-6 xl:sticky xl:top-[calc(var(--header-height)+1rem)] xl:self-start">
          <ControlsRail />
          <ExportRail
            themeCss={themeSetup?.themeCss ?? ""}
            globalsCss={themeSetup?.globalsCss ?? ""}
            layoutTsx={themeSetup?.layoutTsx ?? ""}
            themeToggleTsx={themeSetup?.themeToggleTsx ?? ""}
            themeToggleModuleCss={themeSetup?.themeToggleModuleCss ?? ""}
            bundleSizeLabel={bundleSizeLabel}
            onDownload={handleDownload}
          />
        </aside>
      </div>
    </Page>
  );
}
