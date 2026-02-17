"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useApp } from "@/features/theme";
import {
  generateFullThemeConfig,
  generateColorPaletteCSS,
  generateTypographyCSS,
  generateFluidSpacingCSS,
  generateRadiusScaleCSS,
  generateBorderWidthScaleCSS,
  generateMaxWidthVariablesCSS,
  generateMaxWidthScaleCSS,
} from "@/features/theme/config";
import { generateFontWeightCSS } from "@/features/theme/config/font-weight/generator";
import { CodeBlock } from "@/features/docs/components/code-display/code-block";
import {
  Button,
  Badge,
  Card,
  CardBody,
  Input,
  Label,
  Switch,
  Checkbox,
  Divider,
  Table,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Fold,
  Scroll,
} from "ui-lab-components";
import { FaEye, FaCode, FaDownload, FaBars, FaXmark } from "react-icons/fa6";
import { cn } from "@/shared";

type Section = "preview" | "export";

const NAV_ITEMS: { id: Section; label: string; icon: typeof FaEye }[] = [
  { id: "preview", label: "Preview", icon: FaEye },
  { id: "export", label: "Export", icon: FaCode },
];

const SETUP_INSTALL = `pnpm add ui-lab-components`;

const SETUP_IMPORT = `import "./global.css";
import "ui-lab-components/styles.css";`;

const SETUP_USAGE = `import { Button } from "ui-lab-components";

export default function App() {
  return <Button>Click me</Button>;
}`;

function SidebarNav({
  active,
  onSelect,
  onDownload,
}: {
  active: Section;
  onSelect: (s: Section) => void;
  onDownload: () => void;
}) {
  const { currentThemeColors, currentThemeMode } = useApp();

  const swatches = useMemo(() => {
    if (!currentThemeColors) return [];
    return [
      `oklch(${currentThemeColors.background.l} ${currentThemeColors.background.c} ${currentThemeColors.background.h})`,
      `oklch(${currentThemeColors.foreground.l} ${currentThemeColors.foreground.c} ${currentThemeColors.foreground.h})`,
      `oklch(${currentThemeColors.accent.l} ${currentThemeColors.accent.c} ${currentThemeColors.accent.h})`,
    ];
  }, [currentThemeColors]);

  return (
    <div className="flex flex-col h-full">
      <nav className="py-3 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "w-full flex border items-center gap-3 pl-0.5 pr-2 py-0.5 text-sm rounded-md cursor-pointer",
                isActive
                  ? "border-background-700 text-foreground-50 bg-background-800"
                  : "border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center border border-background-700",
                  isActive ? "bg-transparent text-foreground-50" : "bg-background-800 text-foreground-300"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <Divider />

      <div className="px-4 py-3 space-y-2">
        <Badge>{currentThemeMode}</Badge>
        <div className="flex gap-1.5">
          {swatches.map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-sm border border-background-700" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      <div className="mt-auto p-3">
        <Button onPress={onDownload} variant="secondary" className="w-full">
          <FaDownload className="mr-2" size={12} />
          Download CSS
        </Button>
      </div>
    </div>
  );
}

function ThemeSummary() {
  const { currentThemeColors, currentThemeMode, radius, borderWidth, spacingScale, selectedSansFont } = useApp();
  if (!currentThemeColors) return null;

  const swatches = [
    { label: "BG", color: `oklch(${currentThemeColors.background.l} ${currentThemeColors.background.c} ${currentThemeColors.background.h})` },
    { label: "FG", color: `oklch(${currentThemeColors.foreground.l} ${currentThemeColors.foreground.c} ${currentThemeColors.foreground.h})` },
    { label: "ACC", color: `oklch(${currentThemeColors.accent.l} ${currentThemeColors.accent.c} ${currentThemeColors.accent.h})` },
  ];

  if (currentThemeColors.semantic) {
    const s = currentThemeColors.semantic;
    const modeKey = currentThemeMode as 'light' | 'dark';
    if (s.success?.[modeKey]?.color) swatches.push({ label: "OK", color: `oklch(${s.success[modeKey].color.l} ${s.success[modeKey].color.c} ${s.success[modeKey].color.h})` });
    if (s.danger?.[modeKey]?.color) swatches.push({ label: "ERR", color: `oklch(${s.danger[modeKey].color.l} ${s.danger[modeKey].color.c} ${s.danger[modeKey].color.h})` });
    if (s.warning?.[modeKey]?.color) swatches.push({ label: "WARN", color: `oklch(${s.warning[modeKey].color.l} ${s.warning[modeKey].color.c} ${s.warning[modeKey].color.h})` });
    if (s.info?.[modeKey]?.color) swatches.push({ label: "INFO", color: `oklch(${s.info[modeKey].color.l} ${s.info[modeKey].color.c} ${s.info[modeKey].color.h})` });
  }

  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground-300">Current Theme</span>
          <Badge>{currentThemeMode}</Badge>
        </div>
        <div className="flex gap-2">
          {swatches.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-sm border border-background-700" style={{ backgroundColor: s.color }} />
              <span className="text-[10px] text-foreground-500">{s.label}</span>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex flex-wrap gap-2">
          <Badge>{selectedSansFont}</Badge>
          <Badge>{radius.toFixed(1)}rem radius</Badge>
          <Badge>{borderWidth}px border</Badge>
          <Badge>{spacingScale.toFixed(2)}x spacing</Badge>
        </div>
      </CardBody>
    </Card>
  );
}

function ComponentShowcase() {
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
    <div className="rounded-md border border-background-700 bg-background-900/50 p-6 space-y-6">
      <span className="text-sm font-semibold text-foreground-400">Live Preview</span>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preview-input">Email address</Label>
        <Input id="preview-input" placeholder="you@example.com" />
      </div>

      <Card>
        <CardBody className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge>New</Badge>
            <span className="text-sm text-foreground-300">Card with badge and divider</span>
          </div>
          <Divider />
          <p className="text-sm text-foreground-400">This card showcases your current theme settings applied to real components.</p>
        </CardBody>
      </Card>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch defaultSelected size="sm" />
          <span className="text-sm text-foreground-300">Notifications</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked />
          <span className="text-sm text-foreground-300">Remember me</span>
        </div>
      </div>

      <Table data={tableData} columns={tableColumns} />

      <div className="space-y-2">
        <span className="text-sm text-foreground-400">Progress</span>
        <Progress value={65} />
      </div>
    </div>
  );
}

function PreviewSection() {
  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-4xl">
      <ThemeSummary />
      <ComponentShowcase />
    </div>
  );
}

function ExportSection({
  fullConfig,
  colorsConfig,
  typographyConfig,
  layoutConfig,
}: {
  fullConfig: string;
  colorsConfig: string;
  typographyConfig: string;
  layoutConfig: string;
}) {
  return (
    <div className="space-y-4 p-6 lg:p-8 max-w-4xl">
      <Tabs defaultValue="full">
        <TabsList>
          <TabsTrigger value="full">Full Config</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="full">
          <CodeBlock language="css" filename="global.css">
            {fullConfig}
          </CodeBlock>
        </TabsContent>
        <TabsContent value="colors">
          <CodeBlock language="css" filename="colors.css">
            {colorsConfig}
          </CodeBlock>
        </TabsContent>
        <TabsContent value="typography">
          <CodeBlock language="css" filename="typography.css">
            {typographyConfig}
          </CodeBlock>
        </TabsContent>
        <TabsContent value="layout">
          <CodeBlock language="css" filename="layout.css">
            {layoutConfig}
          </CodeBlock>
        </TabsContent>
      </Tabs>

      <Fold title="Setup Instructions" defaultExpanded={false}>
        <div className="space-y-4 p-4">
          <div className="space-y-1">
            <span className="text-sm font-medium text-foreground-300">1. Install the package</span>
            <CodeBlock language="bash" filename="terminal">
              {SETUP_INSTALL}
            </CodeBlock>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-foreground-300">2. Add the exported CSS to your global.css</span>
            <p className="text-sm text-foreground-500">Paste the Full Config output into your project&apos;s global stylesheet.</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-foreground-300">3. Import styles in your layout</span>
            <CodeBlock language="typescript" filename="layout.tsx">
              {SETUP_IMPORT}
            </CodeBlock>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-foreground-300">4. Use components</span>
            <CodeBlock language="tsx" filename="App.tsx">
              {SETUP_USAGE}
            </CodeBlock>
          </div>
        </div>
      </Fold>
    </div>
  );
}

export default function ConfigPage() {
  const [activeSection, setActiveSection] = useState<Section>("preview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyFontWeightScale,
    radius,
    borderWidth,
    spacingScale,
  } = useApp();

  const fullConfig = useMemo(() => {
    if (!currentThemeColors) return "";
    return generateFullThemeConfig(
      currentThemeColors,
      currentThemeMode,
      headerTypeSizeRatio,
      headerFontSizeScale,
      headerFontWeightScale,
      headerFontWeightScale,
      bodyFontWeightScale,
      radius,
      borderWidth,
      spacingScale,
    );
  }, [currentThemeColors, currentThemeMode, headerTypeSizeRatio, headerFontSizeScale, headerFontWeightScale, bodyFontWeightScale, radius, borderWidth, spacingScale]);

  const colorsConfig = useMemo(() => {
    if (!currentThemeColors) return "";
    return `@theme {\n${generateColorPaletteCSS(currentThemeColors, currentThemeMode)}\n}`;
  }, [currentThemeColors, currentThemeMode]);

  const typographyConfig = useMemo(() => {
    const typo = generateTypographyCSS(headerTypeSizeRatio, headerFontSizeScale);
    const weights = generateFontWeightCSS(headerFontWeightScale, bodyFontWeightScale);
    return `@theme {\n${typo}\n\n  --line-height-tight: 1.25;\n  --line-height-snug: 1.375;\n  --line-height-normal: 1.5;\n  --line-height-relaxed: 1.65;\n  --line-height-loose: 2;\n\n  --letter-spacing-tight: -0.01em;\n  --letter-spacing-snug: -0.01em;\n  --letter-spacing-normal: 0;\n  --letter-spacing-wide: 0.05em;\n\n${weights}\n}`;
  }, [headerTypeSizeRatio, headerFontSizeScale, headerFontWeightScale, bodyFontWeightScale]);

  const layoutConfig = useMemo(() => {
    const spacing = generateFluidSpacingCSS(spacingScale);
    const radiusCSS = generateRadiusScaleCSS(radius);
    const border = generateBorderWidthScaleCSS(borderWidth);
    const maxWidthVars = generateMaxWidthVariablesCSS(1);
    const maxWidthUtils = generateMaxWidthScaleCSS(1);
    return `@theme {\n${spacing}\n\n${maxWidthVars}\n\n${radiusCSS}\n\n${border}\n}\n\n${maxWidthUtils}`;
  }, [spacingScale, radius, borderWidth]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([fullConfig], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "global.css";
    a.click();
    URL.revokeObjectURL(url);
  }, [fullConfig]);

  const handleNavSelect = useCallback((section: Section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  }, []);

  if (!currentThemeColors) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-foreground-400">Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="flex pt-(--header-height)">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "w-64 lg:w-56 shrink-0 flex flex-col",
          "fixed lg:static left-0 top-0 h-screen lg:h-auto",
          "z-[55] lg:z-auto",
          "bg-background-950 border-r border-background-700",
          "transition-transform duration-300 ease-out",
          "lg:transition-none lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-screen lg:h-full">
          <div className="flex items-center justify-between p-3 lg:hidden">
            <span className="text-sm font-semibold text-foreground-200">Theme Config</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-foreground-400 hover:text-foreground-200 p-1 cursor-pointer"
            >
              <FaXmark size={16} />
            </button>
          </div>
          <SidebarNav active={activeSection} onSelect={handleNavSelect} onDownload={handleDownload} />
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-background-950/80 backdrop-blur-sm shrink-0">
          <span className="text-sm font-semibold text-foreground-200">Theme Config</span>
          <div className="flex items-center gap-2">
            <Badge>{NAV_ITEMS.find((n) => n.id === activeSection)?.label}</Badge>
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-foreground-400 hover:text-foreground-200 p-1 cursor-pointer"
            >
              <FaBars size={16} />
            </button>
          </div>
        </div>

        <Scroll ref={scrollRef} className="flex-1 min-h-[calc(100vh-var(--header-height))]" maxHeight="100%" fadeY>
          {activeSection === "preview" && <PreviewSection />}
          {activeSection === "export" && (
            <ExportSection
              fullConfig={fullConfig}
              colorsConfig={colorsConfig}
              typographyConfig={typographyConfig}
              layoutConfig={layoutConfig}
            />
          )}
        </Scroll>
      </div>
    </div>
  );
}
