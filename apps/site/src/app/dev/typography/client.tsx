"use client";


import { useState, type CSSProperties, type ReactNode } from "react";
import { TypographyPanel } from "@/features/theme/components/settings/typography-panel";
import {
  getFontConfig,
  getDefaultSansFont,
  getDefaultMonoFont,
  type FontConfig,
  type FontKey,
  SANS_FONTS,
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

const defaultSansFont = getDefaultSansFont();
const defaultMonoFont = getDefaultMonoFont();

const KARLA_FAMILY = defaultSansFont.family;

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
type SansTypographyState = Record<string, PreviewTypographyState>;

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

function buildInitialSansTypographyState(): SansTypographyState {
  return Object.fromEntries(
    SANS_FONTS.map((font) => [font.name, getFontPreviewState(font)]),
  );
}

function buildPreviewVars(
  family: string,
  typography: PreviewTypographyState,
): CSSProperties {
  const vars: Record<string, string> = { fontFamily: family };

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

const KARLA_VARS = buildPreviewVars(KARLA_FAMILY, getFontPreviewState(defaultSansFont));

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded border border-background-600 bg-background-800 px-3 py-1.5 text-xs text-foreground-300 transition-colors hover:bg-background-700"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

function SansPreviewContent() {
  return (
    <div className="space-y-4">
      <h1 className="text-header-xl font-bold text-foreground-50">Heading 1 — The quick brown fox</h1>
      <h2 className="text-header-xl font-bold text-foreground-50">Heading 2 — jumps over the lazy</h2>
      <h3 className="text-header-lg font-bold text-foreground-50">Heading 3 — dog near the riverbank</h3>
      <h4 className="text-header-md font-bold text-foreground-50">Heading 4 — Pack my box with five</h4>
      <h5 className="text-header-md font-bold text-foreground-50">Heading 5 — dozen liquor jugs</h5>
      <h6 className="text-header-sm font-bold text-foreground-50">Heading 6 — How vexingly quick</h6>
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
  const [selectedSansFont, setSelectedSansFont] = useState<string>(defaultSansFont.name);
  const [selectedMonoFont, setSelectedMonoFont] = useState<string>(defaultMonoFont.name);
  const [sansTypographyByFont, setSansTypographyByFont] = useState<SansTypographyState>(
    buildInitialSansTypographyState,
  );

  const activeSansTypography =
    sansTypographyByFont[selectedSansFont] ?? getFontPreviewState(defaultSansFont);
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
  } = activeSansTypography;

  const updateSelectedSansTypography = (updates: Partial<PreviewTypographyState>) => {
    setSansTypographyByFont((current) => {
      const currentTypography =
        current[selectedSansFont] ?? getFontPreviewState(defaultSansFont);

      return {
        ...current,
        [selectedSansFont]: { ...currentTypography, ...updates },
      };
    });
  };

  const isKarlaSelected = selectedSansFont === "Karla";

  const fontMetrics: Record<string, number> = {
    fontSizeScale: headerFontSizeScale,
    fontWeightScale: headerFontWeightScale,
    typeSizeRatio: headerTypeSizeRatio,
  };

  if (headerLetterSpacingScale !== 0) fontMetrics.headerLetterSpacingScale = headerLetterSpacingScale;
  if (headerLineHeight !== DEFAULT_HEADER_LINE_HEIGHT) fontMetrics.headerLineHeight = headerLineHeight;
  if (bodyLetterSpacingScale !== 1) fontMetrics.bodyLetterSpacingScale = bodyLetterSpacingScale;
  if (bodyFontWeightScale !== 1) fontMetrics.bodyFontWeightScale = bodyFontWeightScale;
  if (bodyFontSizeScale !== 1) fontMetrics.bodyFontSizeScale = bodyFontSizeScale;
  if (bodyLineHeight !== DEFAULT_BODY_LINE_HEIGHT) fontMetrics.bodyLineHeight = bodyLineHeight;
  if (bodyTypeSizeRatio !== headerTypeSizeRatio) fontMetrics.bodyTypeSizeRatio = bodyTypeSizeRatio;

  const sansFontConfig = getFontConfig(selectedSansFont as never, "sans");
  const monoFontConfig = getFontConfig(selectedMonoFont as never, "mono");
  const activeSansPreviewStyle = buildPreviewVars(sansFontConfig?.family ?? KARLA_FAMILY, {
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
  });
  const configSnippet = `{
  name: "${selectedSansFont}",
  family: '${sansFontConfig?.family ?? "..."}',
  category: "sans",
  isDefault: false,
  metrics: ${JSON.stringify(fontMetrics, null, 4).replace(/\n/g, "\n  ")},
}`;

  const applySansFontPreset = (fontName: string) => {
    setSelectedSansFont(fontName);
    setSansTypographyByFont((current) => {
      if (current[fontName]) {
        return current;
      }

      const nextFontConfig = getFontConfig(fontName as FontKey, "sans");

      return {
        ...current,
        [fontName]: getFontPreviewState(nextFontConfig),
      };
    });
  };

  const handleResetAll = () => {
    setSelectedSansFont(defaultSansFont.name);
    setSelectedMonoFont(defaultMonoFont.name);
    setSansTypographyByFont(buildInitialSansTypographyState());
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
                    Sans — {selectedSansFont}
                  </div>
                  <p className="mt-1 text-xs text-foreground-500">
                    Type specimen keeps the Karla ghost overlay.
                  </p>
                </div>
                {!isKarlaSelected && (
                  <div className="flex items-center gap-4 text-xs text-foreground-500">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground-300 opacity-20" />
                      Karla default
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground-100" />
                      {selectedSansFont} (active)
                    </span>
                  </div>
                )}
              </div>

              <PreviewSurface
                activeStyle={activeSansPreviewStyle}
                reference={!isKarlaSelected ? <SansPreviewContent /> : undefined}
                referenceStyle={!isKarlaSelected ? KARLA_VARS : undefined}
              >
                <SansPreviewContent />
              </PreviewSurface>
            </div>

            <Divider size="sm" variant="dashed" className="my-12" />

            <div className="space-y-4">
              <div className="text-sm font-medium text-foreground-400">
                Mono — {selectedMonoFont}
              </div>
              <pre
                className="overflow-x-auto rounded border border-background-700 bg-background-800 p-4 font-mono text-base text-foreground-100"
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
                const variable = "inline code example";
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
                    <div style={activeSansPreviewStyle}>
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
                <CopyButton text={configSnippet} label="Copy to font-config.ts" />
              </div>
              <p className="text-xs text-foreground-500">
                Paste into <code className="text-foreground-300">SANS_FONTS</code> in{" "}
                <code className="text-foreground-300">font-config.ts</code>. Optional fields
                omitted at defaults.
              </p>
              <pre className="overflow-x-auto rounded border border-background-700 bg-background-800 p-4 text-xs text-foreground-100">
                {configSnippet}
              </pre>
            </div>
          </div>

          <div className="sticky top-8 h-fit">
            <h2 className="mb-4 text-lg font-semibold text-foreground-100">Controls</h2>
            <TypographyPanel
              selectedSansFont={selectedSansFont}
              selectedMonoFont={selectedMonoFont}
              typography={activeSansTypography}
              onSansFontChange={applySansFontPreset}
              onMonoFontChange={(fontName) => setSelectedMonoFont(fontName as never)}
              onTypographyChange={updateSelectedSansTypography}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
