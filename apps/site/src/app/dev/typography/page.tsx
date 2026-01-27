"use client";

import { useFontConfigurations } from "./hooks/useFontConfigurations";
import { TypographyPreview } from "./components/TypographyPreview";
import { FontControls } from "./components/FontControls";
import { ConfigDisplay } from "./components/ConfigDisplay";

export default function TypographyDevPage() {
  const {
    isLoading,
    selectedFont,
    currentConfig,
    switchFont,
    updateFontMetric,
    resetFont,
  } = useFontConfigurations();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-950 p-8 flex items-center justify-center">
        <div className="text-foreground-400">Loading font configurations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-64px)]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground-50">
            Typography Optimizer
          </h1>
          <p className="text-foreground-400">
            Optimize font metrics to match visual weight with Karla baseline. Each font retains
            its configuration when switching.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100%-120px)]">
          <div className="lg:col-span-2 bg-background-900 border border-background-700 rounded-lg p-6 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-foreground-100 mb-4">Preview</h2>
            <TypographyPreview fontName={selectedFont} metrics={currentConfig} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-background-900 border border-background-700 rounded-lg p-6 flex-1 overflow-hidden flex flex-col">
              <h2 className="text-lg font-semibold text-foreground-100 mb-4">Controls</h2>
              <FontControls
                selectedFont={selectedFont}
                metrics={currentConfig}
                onFontChange={switchFont}
                onMetricChange={(key, value) => updateFontMetric(selectedFont, key, value)}
                onReset={resetFont}
              />
            </div>

            <div className="bg-background-900 border border-background-700 rounded-lg p-6">
              <ConfigDisplay metrics={currentConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
