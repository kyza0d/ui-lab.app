"use client";

import { useState, useEffect } from "react";
import { TypographyPanel } from "@/features/theme/components/settings/typography-panel";
import { useThemeConfiguration } from "@/features/theme/hooks/use-theme-configuration";
import { getFontConfig, getDefaultSansFont, getDefaultMonoFont } from "@/features/theme/constants/font-config";
import { generateTypeScaleFromRatio } from "@/features/theme/config/typography/generator";
import { generateLetterSpacingCSS } from "@/features/theme/config/typography/generator";

const defaultSansFont = getDefaultSansFont();
const defaultMonoFont = getDefaultMonoFont();

const KARLA_FAMILY = '"Karla Variable", system-ui, sans-serif';

// Precompute Karla's default CSS variable values once.
// Applied as inline style on the ghost container so sliders never affect it.
const KARLA_VARS = (() => {
  const vars: Record<string, string> = { fontFamily: KARLA_FAMILY };

  // Karla defaults: ratio=1.2, fontSizeScale=1
  generateTypeScaleFromRatio(1.2, 1).forEach(({ name, cssValue }) => {
    vars[`--text-${name}`] = cssValue;
    vars[`--header-text-${name}`] = cssValue;
  });

  // Letter spacing: bodyScale=1, headerScale=0 (Karla defaults)
  Object.assign(vars, generateLetterSpacingCSS(1, 0));

  // Font weights at scale=1 (no adjustment)
  const weightNames = ["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"];
  const weightValues = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  weightNames.forEach((name, i) => {
    vars[`--font-weight-header-${name}`] = String(weightValues[i]);
    vars[`--font-weight-body-${name}`] = String(weightValues[i]);
  });

  return vars as React.CSSProperties;
})();

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs px-3 py-1.5 bg-background-800 hover:bg-background-700 text-foreground-300 rounded border border-background-600 transition-colors"
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
      <p className="text-foreground-100 leading-relaxed">
        Body text. The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump! The job requires extra pluck and zeal from every young wage earner.
      </p>
      <p className="text-sm text-foreground-200">
        Small text — 0123456789 !@#$%^&*() — captions, helper text, and secondary information.
      </p>
    </div>
  );
}

export default function TypographyDevPage() {
  const [selectedSansFont, setSelectedSansFont] = useState(defaultSansFont.name);
  const [selectedMonoFont, setSelectedMonoFont] = useState(defaultMonoFont.name);
  const [headerTypeSizeRatio, setHeaderTypeSizeRatio] = useState(1.2);
  const [headerFontSizeScale, setHeaderFontSizeScale] = useState(1);
  const [headerFontWeightScale, setHeaderFontWeightScale] = useState(1);
  const [headerLetterSpacingScale, setHeaderLetterSpacingScale] = useState(0);
  const [bodyTypeSizeRatio, setBodyTypeSizeRatio] = useState(1.2);
  const [bodyFontSizeScale, setBodyFontSizeScale] = useState(1);
  const [bodyFontWeightScale, setBodyFontWeightScale] = useState(1);
  const [bodyLetterSpacingScale, setBodyLetterSpacingScale] = useState(1);

  const isKarlaSelected = selectedSansFont === "Karla";

  useEffect(() => {
    const sansFontConfig = getFontConfig(selectedSansFont as any, "sans");
    const monoFontConfig = getFontConfig(selectedMonoFont as any, "mono");
    if (sansFontConfig) document.documentElement.style.setProperty("--font-sans", sansFontConfig.family);
    if (monoFontConfig) document.documentElement.style.setProperty("--font-mono", monoFontConfig.family);
  }, [selectedSansFont, selectedMonoFont]);

  useThemeConfiguration({
    typography: {
      headerTypeSizeRatio,
      headerFontSizeScale,
      headerFontWeightScale,
      headerLetterSpacingScale,
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      bodyFontWeightScale,
      bodyLetterSpacingScale,
    },
    layout: { radius: 0.5, borderWidth: 1, spacingScale: 1 },
    isEnabled: true,
  });

  // Build FontMetrics object matching font-config.ts shape; omit optional fields at defaults
  const fontMetrics: Record<string, number> = {
    fontSizeScale: headerFontSizeScale,
    fontWeightScale: headerFontWeightScale,
    typeSizeRatio: headerTypeSizeRatio,
  };
  if (headerLetterSpacingScale !== 0) fontMetrics.headerLetterSpacingScale = headerLetterSpacingScale;
  if (bodyLetterSpacingScale !== 1) fontMetrics.bodyLetterSpacingScale = bodyLetterSpacingScale;
  if (bodyFontWeightScale !== 1) fontMetrics.bodyFontWeightScale = bodyFontWeightScale;
  if (bodyFontSizeScale !== 1) fontMetrics.bodyFontSizeScale = bodyFontSizeScale;
  if (bodyTypeSizeRatio !== headerTypeSizeRatio) fontMetrics.bodyTypeSizeRatio = bodyTypeSizeRatio;

  const sansFontConfig = getFontConfig(selectedSansFont as any, "sans");
  const configSnippet = `{
  name: "${selectedSansFont}",
  family: '${sansFontConfig?.family ?? "..."}',
  category: "sans",
  isDefault: false,
  metrics: ${JSON.stringify(fontMetrics, null, 4).replace(/\n/g, "\n  ")},
}`;

  return (
    <div className="min-h-screen bg-background-950">
      <div className="p-8 border-b border-background-700">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground-50 mb-2">Typography Fine-Tuning</h1>
            <p className="text-foreground-400">
              Karla reference (20% opacity) is fixed to its default config values. Adjust sliders to match the active font on top.
            </p>
          </div>
          <CopyButton text={configSnippet} label="Copy Config" />
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Sans Font Preview */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                  Sans — {selectedSansFont}
                </div>
                {!isKarlaSelected && (
                  <div className="flex items-center gap-4 text-xs text-foreground-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-foreground-300 opacity-20 inline-block" />
                      Karla default
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-foreground-100 inline-block" />
                      {selectedSansFont} (active)
                    </span>
                  </div>
                )}
              </div>

              <div className="relative">
                {/* Karla reference layer — CSS vars pinned to Karla defaults, never affected by sliders */}
                {!isKarlaSelected && (
                  <div
                    className="absolute inset-0 pointer-events-none select-none"
                    style={{ ...KARLA_VARS, opacity: 0.2 }}
                    aria-hidden
                  >
                    <SansPreviewContent />
                  </div>
                )}
                {/* Active font layer — uses global CSS vars from sliders */}
                <SansPreviewContent />
              </div>
            </div>

            {/* Mono Font Preview */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                Mono — {selectedMonoFont}
              </div>
              <pre className="font-mono text-base bg-background-800 p-4 rounded border border-background-700 text-foreground-100 overflow-x-auto">
{`const greeting = "Hello, World!";
console.log(greeting);

function example() {
  return {
    name: "Typography",
    description: "Font settings preview"
  };
}`}
              </pre>
              <code className="font-mono text-sm bg-background-800 px-2 py-1 rounded text-foreground-100">
                const variable = "inline code example";
              </code>
            </div>

            {/* Weight Variants */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                Weight Variants
              </div>
              <div className="space-y-3">
                {[["font-bold", "Bold — 700"], ["font-semibold", "Semibold — 600"], ["font-medium", "Medium — 500"], ["font-normal", "Regular — 400"]] .map(([cls, label]) => (
                  <div key={cls} className="relative">
                    {!isKarlaSelected && (
                      <div className="absolute inset-0 pointer-events-none select-none opacity-20" style={KARLA_VARS} aria-hidden>
                        <div className={`${cls} text-foreground-200`}>{label}</div>
                        <p className="text-foreground-300">The quick brown fox jumps over the lazy dog.</p>
                      </div>
                    )}
                    <div className={`${cls} text-foreground-200`}>{label}</div>
                    <p className="text-foreground-300">The quick brown fox jumps over the lazy dog.</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Config Export */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                  Font Config Export
                </div>
                <CopyButton text={configSnippet} label="Copy to font-config.ts" />
              </div>
              <p className="text-xs text-foreground-500">
                Paste into <code className="text-foreground-300">SANS_FONTS</code> in{" "}
                <code className="text-foreground-300">font-config.ts</code>. Optional fields omitted at defaults.
              </p>
              <pre className="text-xs bg-background-800 p-4 rounded border border-background-700 text-foreground-100 overflow-x-auto leading-relaxed">
                {configSnippet}
              </pre>
            </div>

          </div>

          {/* Controls Column */}
          <div className="bg-background-900 border border-background-700 rounded-lg p-6 sticky top-8 h-fit">
            <h2 className="text-lg font-semibold text-foreground-100 mb-4">Controls</h2>
            <TypographyPanel
              selectedSansFont={selectedSansFont}
              selectedMonoFont={selectedMonoFont}
              headerTypeSizeRatio={headerTypeSizeRatio}
              headerFontSizeScale={headerFontSizeScale}
              headerFontWeightScale={headerFontWeightScale}
              headerLetterSpacingScale={headerLetterSpacingScale}
              bodyTypeSizeRatio={bodyTypeSizeRatio}
              bodyFontSizeScale={bodyFontSizeScale}
              bodyFontWeightScale={bodyFontWeightScale}
              bodyLetterSpacingScale={bodyLetterSpacingScale}
              onSansFontChange={(fontName) => setSelectedSansFont(fontName as any)}
              onMonoFontChange={(fontName) => setSelectedMonoFont(fontName as any)}
              onHeaderTypeSizeRatioChange={setHeaderTypeSizeRatio}
              onHeaderFontSizeScaleChange={setHeaderFontSizeScale}
              onHeaderFontWeightScaleChange={setHeaderFontWeightScale}
              onHeaderLetterSpacingChange={setHeaderLetterSpacingScale}
              onBodyTypeSizeRatioChange={setBodyTypeSizeRatio}
              onBodyFontSizeScaleChange={setBodyFontSizeScale}
              onBodyFontWeightScaleChange={setBodyFontWeightScale}
              onBodyLetterSpacingChange={setBodyLetterSpacingScale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
