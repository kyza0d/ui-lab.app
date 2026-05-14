"use client";


import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
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
import { Button, Divider, Switch, Slider, Select, Label } from "ui-lab-components";

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
type TextAlignment = "left" | "center" | "right" | "justify";

interface FontTuningState {
  tracking: number;
  leading: number;
  pointSize: number;
  alignment: TextAlignment;
}

type FontTuningByFont = Record<string, FontTuningState>;

const SAMPLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&@!?$%";
const KERNING_PAIRS = ["AV", "VA", "To", "Wa", "Yo", "Ta", "LT", "FA"] as const;
const CONTEXT_PARAGRAPHS = [
  "Interface typography needs to stay readable while labels, values, and nested actions compete for attention.",
  "Dense tools reward fonts with clear counters, sturdy stems, reliable spacing, and numerals that scan cleanly in tables.",
];

const DEFAULT_FONT_TUNING: FontTuningState = {
  tracking: 0,
  leading: 1.5,
  pointSize: 18,
  alignment: "left",
};

const SPACING_CONTROLS = [
  { key: "tracking", label: "Tracking", min: -0.08, max: 0.16, step: 0.005, unit: "em" },
  { key: "leading", label: "Leading", min: 1, max: 2.2, step: 0.01, unit: "" },
  { key: "pointSize", label: "Point size", min: 10, max: 56, step: 1, unit: "px" },
] as const satisfies ReadonlyArray<{
  key: keyof Pick<FontTuningState, "tracking" | "leading" | "pointSize">;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}>;

interface GlyphMeasurement {
  character: string;
  width: number;
  actualLeft: number;
  actualRight: number;
  actualAscent: number;
  actualDescent: number;
  fontAscent: number;
  fontDescent: number;
  capHeightRatio: number;
  xHeightRatio: number;
}

interface KerningMeasurement {
  pair: string;
  width: number;
  sumWidth: number;
  delta: number;
}

interface RenderedFontMetrics {
  selected: GlyphMeasurement;
  capHeight: number;
  xHeight: number;
  ascender: number;
  descender: number;
  stem: number;
  bowlWidth: number;
  counterProxy: number;
  kerningPairs: KerningMeasurement[];
  loaded: boolean;
}

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

function getFontTuningState(fontConfig?: FontConfig): FontTuningState {
  const metrics = fontConfig?.metrics;

  return {
    tracking: metrics?.tracking ?? DEFAULT_FONT_TUNING.tracking,
    leading: metrics?.leading ?? metrics?.bodyLineHeight ?? DEFAULT_FONT_TUNING.leading,
    pointSize: metrics?.pointSize ?? DEFAULT_FONT_TUNING.pointSize,
    alignment: metrics?.alignment ?? DEFAULT_FONT_TUNING.alignment,
  };
}

function buildInitialFontTuningState(): FontTuningByFont {
  return Object.fromEntries(
    BODY_FONTS.map((font) => [font.name, getFontTuningState(font)]),
  );
}

function roundMetric(value: number, decimals = 3) {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(decimals));
}

function measureGlyph(
  context: CanvasRenderingContext2D,
  character: string,
  pointSize: number,
): GlyphMeasurement {
  const metrics = context.measureText(character);
  const actualAscent = metrics.actualBoundingBoxAscent || 0;
  const actualDescent = metrics.actualBoundingBoxDescent || 0;

  return {
    character,
    width: roundMetric(metrics.width),
    actualLeft: roundMetric(metrics.actualBoundingBoxLeft || 0),
    actualRight: roundMetric(metrics.actualBoundingBoxRight || metrics.width),
    actualAscent: roundMetric(actualAscent),
    actualDescent: roundMetric(actualDescent),
    fontAscent: roundMetric(metrics.fontBoundingBoxAscent || actualAscent),
    fontDescent: roundMetric(metrics.fontBoundingBoxDescent || actualDescent),
    capHeightRatio: roundMetric(actualAscent / pointSize),
    xHeightRatio: roundMetric(actualAscent / pointSize),
  };
}

function measureRenderedFontMetrics(
  fontFamily: string,
  pointSize: number,
  character: string,
): RenderedFontMetrics | null {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return null;

  context.font = `400 ${pointSize}px ${fontFamily}`;
  context.textBaseline = "alphabetic";
  (context as CanvasRenderingContext2D & { fontKerning?: string }).fontKerning = "normal";

  const selected = measureGlyph(context, character, pointSize);
  const cap = measureGlyph(context, "H", pointSize);
  const x = measureGlyph(context, "x", pointSize);
  const asc = measureGlyph(context, "h", pointSize);
  const desc = measureGlyph(context, "p", pointSize);
  const stem = measureGlyph(context, "I", pointSize);
  const bowl = measureGlyph(context, "O", pointSize);
  const counter = measureGlyph(context, "o", pointSize);

  return {
    selected: {
      ...selected,
      capHeightRatio: roundMetric(cap.actualAscent / pointSize),
      xHeightRatio: roundMetric(x.actualAscent / pointSize),
    },
    capHeight: roundMetric(cap.actualAscent / pointSize),
    xHeight: roundMetric(x.actualAscent / pointSize),
    ascender: roundMetric(Math.max(asc.actualAscent, selected.fontAscent) / pointSize),
    descender: roundMetric(Math.max(desc.actualDescent, selected.fontDescent) / pointSize),
    stem: roundMetric(stem.width / pointSize),
    bowlWidth: roundMetric(bowl.width / pointSize),
    counterProxy: roundMetric(counter.width / Math.max(bowl.width, 1)),
    kerningPairs: KERNING_PAIRS.map((pair) => {
      const [first, second] = Array.from(pair);
      const firstWidth = context.measureText(first).width;
      const secondWidth = context.measureText(second).width;
      const pairWidth = context.measureText(pair).width;

      return {
        pair,
        width: roundMetric(pairWidth),
        sumWidth: roundMetric(firstWidth + secondWidth),
        delta: roundMetric(pairWidth - firstWidth - secondWidth),
      };
    }),
    loaded: true,
  };
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
    <Button
      onPress={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      variant="outline"
      size="sm"
    >
      {copied ? "Copied!" : label}
    </Button>
  );
}

function TuningSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="block space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <Label className="font-medium text-foreground-400">{label}</Label>
        <span className="rounded border border-background-700 bg-background-900 px-1.5 py-0.5 text-foreground-300 tabular-nums">
          {value.toFixed(step < 0.01 ? 3 : 2)}
          {unit}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        aria-label={label}
      />
    </div>
  );
}

function MetricsGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 rounded border border-background-700 bg-background-900/40 p-4">
      <h3 className="text-sm font-semibold text-foreground-100">{title}</h3>
      {children}
    </section>
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

function buildTuningStyle(fontFamily: string, tuning: FontTuningState): CSSProperties {
  return {
    fontFamily,
    fontKerning: "normal",
    letterSpacing: `${tuning.tracking}em`,
    lineHeight: tuning.leading,
    fontSize: tuning.pointSize,
    textAlign: tuning.alignment,
  };
}

function MetricGuide({
  baselineY,
  displayFontSize,
  metrics,
}: {
  baselineY: number;
  displayFontSize: number;
  metrics: RenderedFontMetrics | null;
}) {
  const capHeight = metrics?.capHeight ?? 0;
  const xHeight = metrics?.xHeight ?? 0;
  const ascender = metrics?.ascender ?? 0;
  const descender = metrics?.descender ?? 0;
  const guideLines = [
    { label: "Asc", y: baselineY - ascender * displayFontSize, color: "bg-info-500" },
    { label: "Cap", y: baselineY - capHeight * displayFontSize, color: "bg-success-500" },
    { label: "X", y: baselineY - xHeight * displayFontSize, color: "bg-warning-500" },
    { label: "Base", y: baselineY, color: "bg-foreground-300" },
    { label: "Desc", y: baselineY + descender * displayFontSize, color: "bg-danger-500" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {guideLines.map((line) => (
        <div key={line.label} className="absolute left-0 right-0" style={{ top: line.y }}>
          <span className={`absolute left-0 top-0 h-px w-full ${line.color} opacity-55`} />
          <span className="absolute -top-2 right-0 bg-background-900 pl-2 text-[10px] font-medium text-foreground-500">
            {line.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function GlyphInspector({
  character,
  fontName,
  metrics,
  style,
}: {
  character: string;
  fontName: string;
  metrics: RenderedFontMetrics | null;
  style: CSSProperties;
}) {
  const displayFontSize = 180;
  const baselineY = 200;

  return (
    <div className="relative min-h-[330px] overflow-hidden rounded border border-background-700 bg-background-900 p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-foreground-400">Selected glyph</div>
          <div className="text-xs text-foreground-500">{fontName}</div>
        </div>
        <div className="rounded border border-background-700 bg-background-950 px-2 py-1 font-mono text-sm text-foreground-300">
          U+{character.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}
        </div>
      </div>
      <div className="relative h-[260px]">
        <MetricGuide
          baselineY={baselineY}
          displayFontSize={displayFontSize}
          metrics={metrics}
        />
        <svg className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={`${fontName} glyph ${character}`}>
          <text
            x="50%"
            y={baselineY}
            textAnchor="middle"
            className="fill-foreground-50"
            style={{
              fontFamily: style.fontFamily,
              fontKerning: "normal",
              fontSize: displayFontSize,
              letterSpacing: style.letterSpacing,
            }}
          >
            {character}
          </text>
        </svg>
      </div>
    </div>
  );
}

function GlyphGrid({
  selectedCharacter,
  onSelectCharacter,
  style,
}: {
  selectedCharacter: string;
  onSelectCharacter: (character: string) => void;
  style: CSSProperties;
}) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-12">
      {Array.from(SAMPLE_GLYPHS).map((character) => {
        const isSelected = character === selectedCharacter;

        return (
          <button
            key={character}
            type="button"
            onClick={() => onSelectCharacter(character)}
            className={`aspect-square rounded border text-center text-3xl leading-none transition-colors ${
              isSelected
                ? "border-foreground-200 bg-background-700 text-foreground-50"
                : "border-background-700 bg-background-900 text-foreground-200 hover:border-background-500 hover:bg-background-800"
            }`}
            style={{ ...style, fontSize: 30, lineHeight: 1 }}
          >
            {character}
          </button>
        );
      })}
    </div>
  );
}

function ContextPreview({
  style,
  headerStyle,
}: {
  style: CSSProperties;
  headerStyle: CSSProperties;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-header-lg font-bold text-foreground-50" style={headerStyle}>
          Component settings and usage rhythm
        </h2>
        {CONTEXT_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph} className="max-w-3xl text-foreground-200" style={style}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border border-background-700 bg-background-900 p-4">
          <div className="mb-3 text-sm font-medium text-foreground-400">Header / body stack</div>
          <h3 className="mb-2 text-header-md font-semibold text-foreground-50" style={headerStyle}>
            Quarterly usage report
          </h3>
          <p className="text-foreground-200" style={style}>
            Net retention improved by 8.4% after the team simplified labels and grouped related
            controls into smaller repeated blocks.
          </p>
        </div>
        <div className="rounded border border-background-700 bg-background-900 p-4">
          <div className="mb-3 text-sm font-medium text-foreground-400">Numeric scan</div>
          <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-foreground-200" style={style}>
            <span>Active sessions</span>
            <span className="tabular-nums">12,480</span>
            <span>Latency p95</span>
            <span className="tabular-nums">184 ms</span>
            <span>Success rate</span>
            <span className="tabular-nums">99.92%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricReadout({
  label,
  value,
  unit = "",
}: {
  label: string;
  value: number | string | undefined;
  unit?: string;
}) {
  const displayValue =
    typeof value === "number" ? `${roundMetric(value)}${unit}` : value ?? "Measuring";

  return (
    <>
      <dt className="text-foreground-500">{label}</dt>
      <dd className="text-right font-mono text-foreground-200">{displayValue}</dd>
    </>
  );
}

export default function TypographyDevPage() {
  const [selectedBodyFont, setSelectedBodyFont] = useState<string>(defaultBodyFont.name);
  const [selectedHeaderFont, setSelectedHeaderFont] = useState<string>(defaultHeaderFont.name);
  const [selectedMonoFont, setSelectedMonoFont] = useState<string>(defaultMonoFont.name);
  const [bodyTypographyByFont, setBodyTypographyByFont] = useState<BodyTypographyState>(
    buildInitialBodyTypographyState,
  );
  const [fontTuningByFont, setFontTuningByFont] = useState<FontTuningByFont>(
    buildInitialFontTuningState,
  );
  const [selectedCharacter, setSelectedCharacter] = useState("A");
  const [useBaseline, setUseBaseline] = useState(true);
  const [renderedMetrics, setRenderedMetrics] = useState<RenderedFontMetrics | null>(null);

  const activeBodyTypography =
    bodyTypographyByFont[selectedBodyFont] ?? getFontPreviewState(defaultBodyFont);
  const activeFontTuning =
    fontTuningByFont[selectedBodyFont] ?? getFontTuningState(defaultBodyFont);
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

  const updateSelectedFontTuning = (updates: Partial<FontTuningState>) => {
    setFontTuningByFont((current) => {
      const currentTuning = current[selectedBodyFont] ?? getFontTuningState(defaultBodyFont);

      return {
        ...current,
        [selectedBodyFont]: { ...currentTuning, ...updates },
      };
    });
  };

  const isKarlaSelected = selectedBodyFont === "Karla" && selectedHeaderFont === "Karla";
  const bodyFontConfig = getFontConfig(selectedBodyFont as FontKey, "body");
  const headerFontConfig = getFontConfig(selectedHeaderFont as FontKey, "header");
  const monoFontConfig = getFontConfig(selectedMonoFont as FontKey, "mono");
  const bodyFamily = bodyFontConfig?.family ?? KARLA_BODY_FAMILY;
  const headerFamily = headerFontConfig?.family ?? KARLA_HEADER_FAMILY;
  const tuningStyle = buildTuningStyle(bodyFamily, activeFontTuning);
  const headerTuningStyle = {
    ...buildTuningStyle(headerFamily, activeFontTuning),
    fontSize: Math.round(activeFontTuning.pointSize * 1.75),
    lineHeight: Math.max(1.05, activeFontTuning.leading - 0.18),
  };

  useEffect(() => {
    let isCancelled = false;

    async function measureFont() {
      setRenderedMetrics(null);

      if (typeof document === "undefined") return;

      try {
        await document.fonts.load(`400 ${activeFontTuning.pointSize}px ${bodyFamily}`, SAMPLE_GLYPHS);
        await document.fonts.ready;
      } catch {
        // Canvas still gives us the rendered fallback metrics if a font load check fails.
      }

      if (isCancelled) return;

      setRenderedMetrics(
        measureRenderedFontMetrics(bodyFamily, activeFontTuning.pointSize, selectedCharacter),
      );
    }

    measureFont();

    return () => {
      isCancelled = true;
    };
  }, [activeFontTuning.pointSize, bodyFamily, selectedCharacter]);

  const bodyFontMetrics: Record<string, number | string> = {
    fontSizeScale: bodyFontSizeScale,
    fontWeightScale: bodyFontWeightScale,
    typeSizeRatio: bodyTypeSizeRatio,
    baseline: 0,
    capHeight: renderedMetrics?.capHeight ?? 0,
    xHeight: renderedMetrics?.xHeight ?? 0,
    ascender: renderedMetrics?.ascender ?? 0,
    descender: renderedMetrics?.descender ?? 0,
    stem: renderedMetrics?.stem ?? 0,
    bowlCounter: renderedMetrics?.counterProxy ?? 0,
    tracking: activeFontTuning.tracking,
    leading: activeFontTuning.leading,
    pointSize: activeFontTuning.pointSize,
    alignment: activeFontTuning.alignment,
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
  const activeBodyPreviewStyle = buildPreviewVars(
    bodyFamily,
    headerFamily,
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
    setFontTuningByFont(buildInitialFontTuningState());
    setSelectedCharacter("A");
    setUseBaseline(true);
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
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
                  <label className="flex items-center gap-3 text-sm font-medium text-foreground-400">
                    <span>Use baseline</span>
                    <Switch
                      aria-label="Use Karla baseline overlay"
                      size="sm"
                      isSelected={useBaseline}
                      onChange={setUseBaseline}
                    />
                  </label>
                )}
              </div>

              <PreviewSurface
                activeStyle={activeBodyPreviewStyle}
                reference={!isKarlaSelected && useBaseline ? <BodyPreviewContent /> : undefined}
                referenceStyle={!isKarlaSelected && useBaseline ? KARLA_VARS : undefined}
              >
                <BodyPreviewContent />
              </PreviewSurface>
            </div>

            <Divider size="sm" variant="dashed" className="my-12" />

            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground-400">Glyph Lab</div>
                  <p className="mt-1 text-sm text-foreground-500">
                    Inspect individual characters against Canvas-measured glyph metrics.
                  </p>
                </div>
                <div className="rounded border border-background-700 bg-background-900 px-2 py-1 font-mono text-sm text-foreground-300">
                  {activeFontTuning.pointSize}px / {activeFontTuning.leading.toFixed(2)} leading
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
                <GlyphInspector
                  character={selectedCharacter}
                  fontName={selectedBodyFont}
                  metrics={renderedMetrics}
                  style={tuningStyle}
                />
                <GlyphGrid
                  selectedCharacter={selectedCharacter}
                  onSelectCharacter={setSelectedCharacter}
                  style={tuningStyle}
                />
              </div>
            </section>

            <Divider size="sm" variant="dashed" className="my-12" />

            <section className="space-y-4">
              <div>
                <div className="text-sm font-medium text-foreground-400">Context Lab</div>
                <p className="mt-1 text-sm text-foreground-500">
                  Review paragraph rhythm, heading/body pairing, numeric scanning, and alignment.
                </p>
              </div>
              <ContextPreview style={tuningStyle} headerStyle={headerTuningStyle} />
            </section>

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

          <div className="sticky top-8 h-fit max-h-[calc(100vh-4rem)] space-y-5 overflow-y-auto pr-1">
            <div>
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

            <MetricsGroup title="Measured Anatomy">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <MetricReadout label="Baseline" value={0} unit="px" />
                <MetricReadout label="Cap Height" value={renderedMetrics?.capHeight} unit="em" />
                <MetricReadout label="X-height" value={renderedMetrics?.xHeight} unit="em" />
                <MetricReadout label="Ascender" value={renderedMetrics?.ascender} unit="em" />
                <MetricReadout label="Descender" value={renderedMetrics?.descender} unit="em" />
                <MetricReadout label="Stem" value={renderedMetrics?.stem} unit="em" />
                <MetricReadout label="Bowl Width" value={renderedMetrics?.bowlWidth} unit="em" />
                <MetricReadout label="Counter Proxy" value={renderedMetrics?.counterProxy} />
              </dl>
            </MetricsGroup>

            <MetricsGroup title="Spacing and Measurement">
              <div className="space-y-4">
                {SPACING_CONTROLS.map((control) => (
                  <TuningSlider
                    key={control.key}
                    label={control.label}
                    value={activeFontTuning[control.key]}
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    unit={control.unit}
                    onChange={(value) => updateSelectedFontTuning({ [control.key]: value })}
                  />
                ))}
                <div className="block space-y-2">
                  <Label className="text-sm font-medium text-foreground-400">Alignment</Label>
                  <Select
                    selectedKey={activeFontTuning.alignment}
                    onSelectionChange={(key) =>
                      updateSelectedFontTuning({
                        alignment: key as TextAlignment,
                      })
                    }
                  >
                    <Select.Trigger>
                      <Select.Value placeholder="Select alignment" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="left" textValue="Left">Left</Select.Item>
                      <Select.Item value="center" textValue="Center">Center</Select.Item>
                      <Select.Item value="right" textValue="Right">Right</Select.Item>
                      <Select.Item value="justify" textValue="Justify">Justify</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
              </div>
            </MetricsGroup>

            <MetricsGroup title="Selected Font Metrics">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-foreground-500">Font</dt>
                <dd className="text-right text-foreground-200">{selectedBodyFont}</dd>
                <dt className="text-foreground-500">Glyph</dt>
                <dd className="text-right font-mono text-foreground-200">{selectedCharacter}</dd>
                <dt className="text-foreground-500">Cap / X</dt>
                <dd className="text-right text-foreground-200">
                  {renderedMetrics
                    ? `${renderedMetrics.capHeight.toFixed(2)} / ${renderedMetrics.xHeight.toFixed(2)}`
                    : "Measuring"}
                </dd>
                <dt className="text-foreground-500">Tracking Override</dt>
                <dd className="text-right text-foreground-200">
                  {activeFontTuning.tracking.toFixed(3)}em
                </dd>
              </dl>
            </MetricsGroup>

            <MetricsGroup title="Selected Glyph Bounds">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <MetricReadout label="Width" value={renderedMetrics?.selected.width} unit="px" />
                <MetricReadout label="Left" value={renderedMetrics?.selected.actualLeft} unit="px" />
                <MetricReadout label="Right" value={renderedMetrics?.selected.actualRight} unit="px" />
                <MetricReadout label="Ascent" value={renderedMetrics?.selected.actualAscent} unit="px" />
                <MetricReadout label="Descent" value={renderedMetrics?.selected.actualDescent} unit="px" />
                <MetricReadout label="Font Asc" value={renderedMetrics?.selected.fontAscent} unit="px" />
                <MetricReadout label="Font Desc" value={renderedMetrics?.selected.fontDescent} unit="px" />
              </dl>
            </MetricsGroup>

            <MetricsGroup title="Measured Kerning Pairs">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                {renderedMetrics?.kerningPairs.map((pair) => (
                  <MetricReadout
                    key={pair.pair}
                    label={pair.pair}
                    value={pair.delta}
                    unit="px"
                  />
                )) ?? <MetricReadout label="Pairs" value="Measuring" />}
              </dl>
            </MetricsGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
