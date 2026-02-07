"use client";

import { memo, useMemo } from "react";
import { getFontConfig } from "@/features/theme/constants/font-config";
import type { FontKey } from "@/features/theme/constants/font-config";
import { SAMPLE_TEXT } from "../lib/sample-text";
import type { FontDevMetrics } from "../lib/types";

interface TypographyPreviewProps {
  fontName: FontKey;
  metrics: FontDevMetrics;
}

export const TypographyPreview = memo(
  ({ fontName, metrics }: TypographyPreviewProps) => {
    const fontConfig = getFontConfig(fontName, "sans");
    const fontFamily = fontConfig?.family || '"Karla Variable", system-ui, sans-serif';

    const headerRatioExponent = (level: number) => Math.log(metrics.headerTypeSizeRatio) * (6 - level);
    const bodyRatioExponent = (level: number) => Math.log(metrics.bodyTypeSizeRatio) * (6 - level);
    const computeHeaderSize = (level: number) =>
      16 * metrics.headerFontSizeScale * Math.exp(headerRatioExponent(level));
    const computeBodySize = (baseSize: number) =>
      baseSize * metrics.bodyFontSizeScale;

    const styles = useMemo(
      () => ({
        container: {
          fontFamily,
          fontSize: `${16 * metrics.bodyFontSizeScale}px`,
        },
        h1: {
          fontSize: `${computeHeaderSize(1)}px`,
          fontWeight: Math.round(700 * metrics.headerFontWeightScale),
          letterSpacing: `${-0.03 * metrics.headerLetterSpacingScale}em`,
          lineHeight: "1.2",
          marginBottom: "1em",
        },
        h2: {
          fontSize: `${computeHeaderSize(2)}px`,
          fontWeight: Math.round(600 * metrics.headerFontWeightScale),
          letterSpacing: `${-0.02 * metrics.headerLetterSpacingScale}em`,
          lineHeight: "1.3",
          marginBottom: "0.8em",
        },
        h3: {
          fontSize: `${computeHeaderSize(3)}px`,
          fontWeight: Math.round(600 * metrics.headerFontWeightScale),
          letterSpacing: `${-0.01 * metrics.headerLetterSpacingScale}em`,
          lineHeight: "1.3",
          marginBottom: "0.7em",
        },
        h4: {
          fontSize: `${computeHeaderSize(4)}px`,
          fontWeight: Math.round(600 * metrics.headerFontWeightScale),
          letterSpacing: `${0 * metrics.headerLetterSpacingScale}em`,
          lineHeight: "1.4",
          marginBottom: "0.6em",
        },
        h5: {
          fontSize: `${computeHeaderSize(5)}px`,
          fontWeight: Math.round(500 * metrics.headerFontWeightScale),
          letterSpacing: `${0.01 * metrics.headerLetterSpacingScale}em`,
          lineHeight: "1.4",
          marginBottom: "0.5em",
        },
        h6: {
          fontSize: `${computeHeaderSize(6)}px`,
          fontWeight: Math.round(500 * metrics.headerFontWeightScale),
          letterSpacing: `${0.02 * metrics.headerLetterSpacingScale}em`,
          lineHeight: "1.5",
          marginBottom: "0.5em",
        },
        body: {
          fontSize: `${computeBodySize(16)}px`,
          fontWeight: Math.round(400 * metrics.bodyFontWeightScale),
          letterSpacing: `${0.005 * metrics.bodyLetterSpacingScale}em`,
          lineHeight: "1.6",
          marginBottom: "1.5em",
          color: "var(--color-foreground-200)",
        },
        code: {
          fontSize: `${computeBodySize(14)}px`,
          fontFamily: 'var(--font-mono)',
          fontWeight: Math.round(400 * metrics.bodyFontWeightScale),
          letterSpacing: `${0.01 * metrics.bodyLetterSpacingScale}em`,
          lineHeight: "1.6",
          backgroundColor: "var(--color-background-800)",
          padding: "0.5em 0.75em",
          borderRadius: "0.375em",
          color: "var(--color-foreground-300)",
        },
      }),
      [fontFamily, metrics],
    );

    return (
      <div
        className="preview-container space-y-4 h-full overflow-y-auto pr-4"
        style={styles.container}
      >
        <h1 style={styles.h1}>{SAMPLE_TEXT.h1}</h1>
        <h2 style={styles.h2}>{SAMPLE_TEXT.h2}</h2>
        <h3 style={styles.h3}>{SAMPLE_TEXT.h3}</h3>
        <h4 style={styles.h4}>{SAMPLE_TEXT.h4}</h4>
        <h5 style={styles.h5}>{SAMPLE_TEXT.h5}</h5>
        <h6 style={styles.h6}>{SAMPLE_TEXT.h6}</h6>
        <p style={styles.body}>{SAMPLE_TEXT.body}</p>
        <code style={styles.code}>{SAMPLE_TEXT.code}</code>
      </div>
    );
  },
);

TypographyPreview.displayName = "TypographyPreview";
