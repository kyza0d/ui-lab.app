"use client";

import { useState, useEffect } from "react";
import { TypographyPanel } from "@/features/theme/components/settings/typography-panel";
import { useThemeConfiguration } from "@/features/theme/hooks/use-theme-configuration";
import { SANS_FONTS, MONO_FONTS, getFontConfig, getDefaultSansFont, getDefaultMonoFont } from "@/features/theme/constants/font-config";

const defaultSansFont = getDefaultSansFont();
const defaultMonoFont = getDefaultMonoFont();

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

  // Apply font families to document root
  useEffect(() => {
    const sansFontConfig = getFontConfig(selectedSansFont as any, "sans");
    const monoFontConfig = getFontConfig(selectedMonoFont as any, "mono");

    if (sansFontConfig) {
      document.documentElement.style.setProperty("--font-sans", sansFontConfig.family);
    }
    if (monoFontConfig) {
      document.documentElement.style.setProperty("--font-mono", monoFontConfig.family);
    }
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
    layout: {
      radius: 0.5,
      borderWidth: 1,
      spacingScale: 1,
    },
    isEnabled: true,
  });

  return (
    <div className="min-h-screen bg-background-950">
      <div className="p-8 border-b border-background-700">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground-50 mb-2">Typography Settings</h1>
          <p className="text-foreground-400">
            Configure typography scales, font selections, and styling metrics. Changes apply in real-time to the preview.
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sans Font Preview */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                Sans Font: {selectedSansFont}
              </div>
              <h1 className="text-header-xl font-bold text-foreground-50">Heading 1</h1>
              <h2 className="text-header-xl font-bold text-foreground-50">Heading 2</h2>
              <h3 className="text-header-lg font-bold text-foreground-50">Heading 3</h3>
              <h4 className="text-header-md font-bold text-foreground-50">Heading 4</h4>
              <h5 className="text-header-md font-bold text-foreground-50">Heading 5</h5>
              <h6 className="text-header-sm font-bold text-foreground-50">Heading 6</h6>
              <p className="text-foreground-100 leading-relaxed">
                This is a paragraph of body text. It demonstrates how the configured font size, weight, and letter spacing scales apply to regular text content. The style updates in real-time as you adjust the typography settings on the right.
              </p>
              <p className="text-sm text-foreground-200">
                Small text. This size is useful for captions, helper text, and less important information in the interface.
              </p>
            </div>

            {/* Mono Font Preview */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                Mono Font: {selectedMonoFont}
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

            {/* Text Variants */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                Text Variants
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-foreground-200">Semibold</div>
                  <p className="text-foreground-300">This text uses font-weight semibold with configured weight scale.</p>
                </div>
                <div>
                  <div className="font-normal text-foreground-200">Normal Weight</div>
                  <p className="text-foreground-300">This text uses the default font weight.</p>
                </div>
                <div>
                  <div className="italic text-foreground-200">Italic Text</div>
                  <p className="text-foreground-300">This text is italicized to show emphasis.</p>
                </div>
                <div>
                  <div className="font-bold text-foreground-200">Bold Text</div>
                  <p className="text-foreground-300">This text uses the bold font weight.</p>
                </div>
              </div>
            </div>

            {/* Letter Spacing Demo */}
            <div className="bg-background-900 border border-background-700 rounded-lg p-8 space-y-4">
              <div className="text-sm font-medium text-foreground-400 uppercase tracking-wide">
                Letter Spacing Demo
              </div>
              <p className="text-base text-foreground-100">
                Observe how the letter spacing and line height change as you adjust the scales. This affects both headers and body text differently based on your configuration.
              </p>
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
