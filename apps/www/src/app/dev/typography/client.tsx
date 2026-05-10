"use client";


import { useState, type CSSProperties, type ReactNode } from "react";
import { TypographyPanel } from "@/features/theme/components/settings/typography-panel";
import {
  getFontConfig,
  getDefaultBodyFont,
  getDefaultHeaderFont,
  getDefaultMonoFont,
  type FontConfig,
  type FontKey,
  BODY_FONTS,
} from "@/features/theme/constants/font-config";
import {
  generateLineHeightCSS,
  generateLetterSpacingCSS,
  generateTypeScaleFromRatio,
} from "@/features/theme/config/typography/generator";
import {
  DEFAULT_BODY_LINE_HEIGHT,
  DEFAULT_HEADER_LINE_HEIGHT,
  DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
  type TypographyConfig,
} from "@/features/theme/lib/typography-config";
import { Button, Divider } from "ui-lab-components";

const defaultBodyFont = getDefaultBodyFont();
const defaultHeaderFont = getDefaultHeaderFont();
const defaultMonoFont = getDefaultMonoFont();

const KARLA_BODY_FAMILY = defaultBodyFont.family;
const KARLA_HEADER_FAMILY = defaultHeaderFont.family;

const FONT_WEIGHT_DEFS = [
  { name: "thin", value: 100 },
  { name: "extralight", value: 200 },
  { name: "light", value: 300 },
  { name: "normal", value: 400 },
  { name: "medium", value: 500 },
  { name: "semibold", value: 600 },
  { name: "bold", value: 700 },
  { name: "extrabold", value: 800 },
  { name: "black", value: 900 },
] as const;

type PreviewTypographyState = TypographyConfig;
type BodyTypographyState = Record<string, PreviewTypographyState>;

function clampFontWeight(value: number) {
  return Math.max(100, Math.min(900, Math.round(value)));
}

function getFontPreviewState(fontConfig?: FontConfig): PreviewTypographyState {
  const metrics = fontConfig?.metrics;

  return {
    headerTypeSizeRatio: metrics?.typeSizeRatio ?? 1.2,
    headerFontSizeScale: metrics?.fontSizeScale ?? 1,
    headerFontWeightScale: metrics?.headerFontWeightScale ?? metrics?.fontWeightScale ?? 1,
    headerLetterSpacingScale: metrics?.headerLetterSpacingScale ?? 0,
    headerLineHeight: metrics?.headerLineHeight ?? DEFAULT_HEADER_LINE_HEIGHT,
    bodyTypeSizeRatio: metrics?.bodyTypeSizeRatio ?? metrics?.typeSizeRatio ?? 1.2,
    bodyFontSizeScale: metrics?.bodyFontSizeScale ?? metrics?.fontSizeScale ?? 1,
    bodyFontWeightScale: metrics?.bodyFontWeightScale ?? metrics?.fontWeightScale ?? 1,
    bodyLetterSpacingScale: metrics?.bodyLetterSpacingScale ?? 1,
    bodyLineHeight: metrics?.bodyLineHeight ?? DEFAULT_BODY_LINE_HEIGHT,
    globalMinFontSizePx: DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
  };
}

function buildInitialBodyTypographyState(): BodyTypographyState {
  return Object.fromEntries(
    BODY_FONTS.map((font) => [font.name, getFontPreviewState(font)]),
  );
}

function buildPreviewVars(
  bodyFamily: string,
  headerFamily: string,
  typography: PreviewTypographyState,
): CSSProperties {
  const vars: Record<string, string> = {
    "--font-body": bodyFamily,
    "--font-header": headerFamily,
    fontFamily: "var(--font-body)",
  };

  generateTypeScaleFromRatio(
    typography.bodyTypeSizeRatio,
    typography.bodyFontSizeScale,
    1,
    { globalMinFontSizePx: typography.globalMinFontSizePx },
  ).forEach(({ name, cssValue }) => {
    vars[`--text-${name}`] = cssValue;
  });

  generateTypeScaleFromRatio(
    typography.headerTypeSizeRatio,
    typography.headerFontSizeScale,
    1,
    { globalMinFontSizePx: typography.globalMinFontSizePx },
  ).forEach(({ name, cssValue }) => {
    vars[`--header-text-${name}`] = cssValue;
  });

  Object.assign(
    vars,
    generateLineHeightCSS(
      typography.headerLineHeight,
      typography.bodyLineHeight,
    ),
  );

  Object.assign(
    vars,
    generateLetterSpacingCSS(
      typography.bodyLetterSpacingScale,
      typography.headerLetterSpacingScale,
    ),
  );

  FONT_WEIGHT_DEFS.forEach(({ name, value }) => {
    const headerWeight = clampFontWeight(value * typography.headerFontWeightScale);
    const bodyWeight = clampFontWeight(value * typography.bodyFontWeightScale);

    vars[`--font-weight-${name}`] = String(headerWeight);
    vars[`--font-weight-header-${name}`] = String(headerWeight);
    vars[`--font-weight-body-${name}`] = String(bodyWeight);
  });

  return vars as CSSProperties;
}

const KARLA_VARS = buildPreviewVars(
  KARLA_BODY_FAMILY,
  KARLA_HEADER_FAMILY,
  getFontPreviewState(defaultBodyFont),
);

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded border border-background-600 bg-background-800 px-3 py-1.5 text-sm text-foreground-300 transition-colors hover:bg-background-700"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

function BodyPreviewContent() {
  const headingStyle = { fontFamily: "var(--font-header)" };

  return (
    <div className="space-y-4">
      <h1 className="text-header-xl font-bold text-foreground-50" style={headingStyle}>Heading 1 — The quick brown fox</h1>
      <h2 className="text-header-xl font-bold text-foreground-50" style={headingStyle}>Heading 2 — jumps over the lazy</h2>
      <h3 className="text-header-lg font-bold text-foreground-50" style={headingStyle}>Heading 3 — dog near the riverbank</h3>
      <h4 className="text-header-md font-bold text-foreground-50" style={headingStyle}>Heading 4 — Pack my box with five</h4>
      <h5 className="text-header-md font-bold text-foreground-50" style={headingStyle}>Heading 5 — dozen liquor jugs</h5>
      <h6 className="text-header-sm font-bold text-foreground-50" style={headingStyle}>Heading 6 — How vexingly quick</h6>
      <p className="text-foreground-100">
        Body text. The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow.
        How vexingly quick daft zebras jump! The job requires extra pluck and zeal from every
        young wage earner.
      </p>
      <p className="text-sm text-foreground-200">
        Small text — 0123456789 !@#$%^&*() — captions, helper text, and secondary information.
      </p>
    </div>
  );
}

function PreviewSurface({
  activeStyle,
  children,
  reference,
  referenceStyle,
}: {
  activeStyle: CSSProperties;
  children: ReactNode;
  reference?: ReactNode;
  referenceStyle?: CSSProperties;
}) {
  return (
    <div className="relative">
      {reference && referenceStyle ? (
        <div
          className="pointer-events-none absolute inset-0 select-none"
          style={{ ...referenceStyle, opacity: 0.2 }}
          aria-hidden
        >
          {reference}
        </div>
      ) : null}
      <div style={activeStyle}>{children}</div>
    </div>
  );
}

export default function TypographyDevPage() {
  const [selectedBodyFont, setSelectedBodyFont] = useState<string>(defaultBodyFont.name);
  const [selectedHeaderFont, setSelectedHeaderFont] = useState<string>(defaultHeaderFont.name);
  const [selectedMonoFont, setSelectedMonoFont] = useState<string>(defaultMonoFont.name);
  const [bodyTypographyByFont, setBodyTypographyByFont] = useState<BodyTypographyState>(
    buildInitialBodyTypographyState,
  );

  const activeBodyTypography =
    bodyTypographyByFont[selectedBodyFont] ?? getFontPreviewState(defaultBodyFont);
  const {
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    headerLetterSpacingScale,
    headerLineHeight,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    bodyLetterSpacingScale,
    bodyLineHeight,
    globalMinFontSizePx,
  } = activeBodyTypography;

  const updateSelectedBodyTypography = (updates: Partial<PreviewTypographyState>) => {
    setBodyTypographyByFont((current) => {
      const currentTypography =
        current[selectedBodyFont] ?? getFontPreviewState(defaultBodyFont);

      return {
        ...current,
        [selectedBodyFont]: { ...currentTypography, ...updates },
      };
    });
  };

  const isKarlaSelected = selectedBodyFont === "Karla" && selectedHeaderFont === "Karla";

  const bodyFontMetrics: Record<string, number> = {
    fontSizeScale: bodyFontSizeScale,
    fontWeightScale: bodyFontWeightScale,
    typeSizeRatio: bodyTypeSizeRatio,
  };
  const headerFontMetrics: Record<string, number> = {
    fontSizeScale: headerFontSizeScale,
    fontWeightScale: headerFontWeightScale,
    typeSizeRatio: headerTypeSizeRatio,
  };

  if (bodyLetterSpacingScale !== 1) bodyFontMetrics.bodyLetterSpacingScale = bodyLetterSpacingScale;
  if (bodyLineHeight !== DEFAULT_BODY_LINE_HEIGHT) bodyFontMetrics.bodyLineHeight = bodyLineHeight;
  if (headerLetterSpacingScale !== 0) headerFontMetrics.headerLetterSpacingScale = headerLetterSpacingScale;
  if (headerLineHeight !== DEFAULT_HEADER_LINE_HEIGHT) headerFontMetrics.headerLineHeight = headerLineHeight;

  const bodyFontConfig = getFontConfig(selectedBodyFont as FontKey, "body");
  const headerFontConfig = getFontConfig(selectedHeaderFont as FontKey, "header");
  const monoFontConfig = getFontConfig(selectedMonoFont as FontKey, "mono");
  const activeBodyPreviewStyle = buildPreviewVars(
    bodyFontConfig?.family ?? KARLA_BODY_FAMILY,
    headerFontConfig?.family ?? KARLA_HEADER_FAMILY,
    {
      headerTypeSizeRatio,
      headerFontSizeScale,
      headerFontWeightScale,
      headerLetterSpacingScale,
      headerLineHeight,
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      bodyFontWeightScale,
      bodyLetterSpacingScale,
      bodyLineHeight,
      globalMinFontSizePx,
    },
  );
  const bodyConfigSnippet = `{
  name: "${selectedBodyFont}",
  family: '${bodyFontConfig?.family ?? "..."}',
  category: "body",
  isDefault: false,
  metrics: ${JSON.stringify(bodyFontMetrics, null, 4).replace(/\n/g, "\n  ")},
}`;
  const headerConfigSnippet = `{
  name: "${selectedHeaderFont}",
  family: '${headerFontConfig?.family ?? "..."}',
  category: "header",
  isDefault: false,
  metrics: ${JSON.stringify(headerFontMetrics, null, 4).replace(/\n/g, "\n  ")},
}`;

  const applyBodyFontPreset = (fontName: string) => {
    setSelectedBodyFont(fontName);
    setBodyTypographyByFont((current) => {
      const nextFontConfig = getFontConfig(fontName as FontKey, "body");
      const nextTypography = getFontPreviewState(nextFontConfig);
      const currentTypography =
        current[selectedBodyFont] ?? getFontPreviewState(defaultBodyFont);

      return {
        ...current,
        [fontName]: {
          ...currentTypography,
          bodyTypeSizeRatio: nextTypography.bodyTypeSizeRatio,
          bodyFontSizeScale: nextTypography.bodyFontSizeScale,
          bodyFontWeightScale: nextTypography.bodyFontWeightScale,
          bodyLetterSpacingScale: nextTypography.bodyLetterSpacingScale,
          bodyLineHeight: nextTypography.bodyLineHeight,
        },
      };
    });
  };

  const applyHeaderFontPreset = (fontName: string) => {
    setSelectedHeaderFont(fontName);
    const nextFontConfig = getFontConfig(fontName as FontKey, "header");
    const nextTypography = getFontPreviewState(nextFontConfig);
    updateSelectedBodyTypography({
      headerTypeSizeRatio: nextTypography.headerTypeSizeRatio,
      headerFontSizeScale: nextTypography.headerFontSizeScale,
      headerFontWeightScale: nextTypography.headerFontWeightScale,
      headerLetterSpacingScale: nextTypography.headerLetterSpacingScale,
      headerLineHeight: nextTypography.headerLineHeight,
    });
  };

  const handleResetAll = () => {
    setSelectedBodyFont(defaultBodyFont.name);
    setSelectedHeaderFont(defaultHeaderFont.name);
    setSelectedMonoFont(defaultMonoFont.name);
    setBodyTypographyByFont(buildInitialBodyTypographyState());
  };

  return (
    <div className="min-h-screen bg-background-950">
      <div className="p-8">
        <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground-100">Typography Playground</h1>
            <p className="mt-1 text-sm text-foreground-500">
              Reset restores the page to the defaults defined in font-config.ts.
            </p>
          </div>
          <Button variant="outline" size="sm" onPress={handleResetAll}>
            Reset all to defaults
          </Button>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground-400">
                    Body — {selectedBodyFont}
                  </div>
                  <p className="mt-1 text-sm text-foreground-500">
                    Type specimen uses {selectedHeaderFont} for headings and keeps the Karla ghost overlay.
                  </p>
                </div>
                {!isKarlaSelected && (
                  <div className="flex items-center gap-4 text-sm text-foreground-500">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground-300 opacity-20" />
                      Karla default
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground-100" />
                      Active fonts
                    </span>
                  </div>
                )}
              </div>

              <PreviewSurface
                activeStyle={activeBodyPreviewStyle}
                reference={!isKarlaSelected ? <BodyPreviewContent /> : undefined}
                referenceStyle={!isKarlaSelected ? KARLA_VARS : undefined}
              >
                <BodyPreviewContent />
              </PreviewSurface>
            </div>

            <Divider size="sm" variant="dashed" className="my-12" />

            <div className="space-y-4">
              <div className="text-sm font-medium text-foreground-400">
                Mono — {selectedMonoFont}
              </div>
              <pre
                className="overflow-x-auto rounded border border-background-700 bg-background-800 p-4 font-mono text-foreground-100"
                style={{ fontFamily: monoFontConfig?.family ?? defaultMonoFont.family }}
              >
                {`const greeting = "Hello, World!";
console.log(greeting);

function example() {
  return {
    name: "Typography",
    description: "Font settings preview"
  };
}`}
              </pre>
              <code
                className="rounded bg-background-800 px-2 py-1 font-mono text-sm text-foreground-100"
                style={{ fontFamily: monoFontConfig?.family ?? defaultMonoFont.family }}
              >
                {'const variable = "inline code example";'}
              </code>
            </div>

            <Divider size="sm" variant="dashed" className="my-12" />

            <div className="space-y-4">
              <div className="text-sm font-medium text-foreground-400">Weight Variants</div>
              <div className="space-y-3">
                {[
                  ["font-bold", "Bold — 700"],
                  ["font-semibold", "Semibold — 600"],
                  ["font-medium", "Medium — 500"],
                  ["font-normal", "Regular — 400"],
                ].map(([cls, label]) => (
                  <div key={cls} className="relative">
                    {!isKarlaSelected && (
                      <div
                        className="absolute inset-0 pointer-events-none select-none opacity-20"
                        style={KARLA_VARS}
                        aria-hidden
                      >
                        <div className={`${cls} text-foreground-200`}>{label}</div>
                        <p className="text-foreground-300">
                          The quick brown fox jumps over the lazy dog.
                        </p>
                      </div>
                    )}
                    <div style={activeBodyPreviewStyle}>
                      <div className={`${cls} text-foreground-200`}>{label}</div>
                      <p className="text-foreground-300">
                        The quick brown fox jumps over the lazy dog.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Divider size="sm" variant="dashed" className="my-12" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-foreground-400">Font Config Export</div>
                <div className="flex gap-2">
                  <CopyButton text={bodyConfigSnippet} label="Copy body" />
                  <CopyButton text={headerConfigSnippet} label="Copy header" />
                </div>
              </div>
              <p className="text-sm text-foreground-500">
                Paste into <code className="text-foreground-300">BODY_FONTS</code> or{" "}
                <code className="text-foreground-300">HEADER_FONTS</code> in{" "}
                <code className="text-foreground-300">font-config.ts</code>. Optional fields
                omitted at defaults.
              </p>
              <pre className="overflow-x-auto rounded border border-background-700 bg-background-800 p-4 text-sm text-foreground-100">
                {bodyConfigSnippet}
                {"\n\n"}
                {headerConfigSnippet}
              </pre>
            </div>
          </div>

          <div className="sticky top-8 h-fit">
            <h2 className="mb-4 text-lg font-semibold text-foreground-100">Controls</h2>
            <TypographyPanel
              selectedBodyFont={selectedBodyFont}
              selectedHeaderFont={selectedHeaderFont}
              selectedMonoFont={selectedMonoFont}
              typography={activeBodyTypography}
              onBodyFontChange={applyBodyFontPreset}
              onHeaderFontChange={applyHeaderFontPreset}
              onMonoFontChange={(fontName) => setSelectedMonoFont(fontName as FontKey)}
              onTypographyChange={updateSelectedBodyTypography}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
