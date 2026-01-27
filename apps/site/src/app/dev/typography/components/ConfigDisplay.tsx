"use client";

import { memo } from "react";
import type { FontDevMetrics } from "../lib/types";

interface ConfigDisplayProps {
  metrics: FontDevMetrics;
}

export const ConfigDisplay = memo(({ metrics }: ConfigDisplayProps) => {
  const configJson = {
    fontSizeScale: parseFloat(metrics.fontSizeScale.toFixed(2)),
    fontWeightScale: parseFloat(metrics.fontWeightScale.toFixed(2)),
    typeSizeRatio: parseFloat(metrics.typeSizeRatio.toFixed(3)),
    headerLetterSpacingScale: parseFloat(metrics.headerLetterSpacingScale.toFixed(2)),
    bodyLetterSpacingScale: parseFloat(metrics.bodyLetterSpacingScale.toFixed(2)),
    headerFontWeightScale: parseFloat(metrics.headerFontWeightScale.toFixed(2)),
    bodyFontWeightScale: parseFloat(metrics.bodyFontWeightScale.toFixed(2)),
  };

  return (
    <div className="bg-background-800/50 border border-background-700 rounded-md p-3">
      <p className="text-xs font-semibold text-foreground-400 mb-2">Current Config</p>
      <pre className="text-xs text-foreground-300 font-mono overflow-x-auto">
        {JSON.stringify(configJson, null, 2)}
      </pre>
    </div>
  );
});

ConfigDisplay.displayName = "ConfigDisplay";
