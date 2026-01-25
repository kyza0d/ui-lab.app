'use client';

import { memo } from "react";
import {
  type OklchColor,
  type SemanticColorType,
  type SemanticColorConfig,
  type GlobalColorAdjustments,
} from "../../lib/color-utils";
import {
  getSemanticColorSafely,
  getSemanticChromaLimit,
} from "../../lib/semantic-color-utils";
import {
  ColorRow,
  GlobalAdjustmentsPanel,
  type ColorRowProps,
} from "./shared-components";
import { Divider } from "ui-lab-components";
import { useApp } from "../../lib/app-context";
import { ThemeColors } from "../../constants/themes";

const MICRO_LABEL = "text-sm font-semibold text-foreground-500";

interface ColorsPanelProps {
  localColors: ThemeColors;
  expandedColor: string | null;
  localGlobalAdjustments: GlobalColorAdjustments;
  onExpandedColorChange: (colorType: string | null) => void;
  onColorChange: (type: string, newColor: OklchColor) => void;
  onChromaLimitChange: (type: SemanticColorType, chromaLimit: number) => void;
  onGlobalAdjustmentChange: (key: keyof GlobalColorAdjustments, value: number) => void;
}

export const ColorsPanel = memo(
  ({
    localColors,
    expandedColor,
    localGlobalAdjustments,
    onExpandedColorChange,
    onColorChange,
    onChromaLimitChange,
    onGlobalAdjustmentChange,
  }: ColorsPanelProps) => {
    const { currentThemeMode } = useApp();

    return (
      <div className="m-0 space-y-[8px]">
        <GlobalAdjustmentsPanel
          lightnessValue={localGlobalAdjustments.lightnessShift}
          chromaValue={localGlobalAdjustments.chromaBoost}
          onLightnessChange={(v) =>
            onGlobalAdjustmentChange("lightnessShift", v)
          }
          onChromaChange={(v) =>
            onGlobalAdjustmentChange("chromaBoost", v)
          }
        />
        <Divider />
        <div className={`${MICRO_LABEL} px-2 pt-2 opacity-70`}>
          Core Colors
        </div>
        {([
          "background",
          "foreground",
          "accent",
        ] as const).map((colorType) => (
          <ColorRow
            key={colorType}
            type={colorType}
            color={localColors[colorType]}
            isExpanded={expandedColor === colorType}
            onToggle={() =>
              onExpandedColorChange(
                expandedColor === colorType ? null : colorType,
              )
            }
            onChange={(c: OklchColor) => onColorChange(colorType, c)}
          />
        ))}

        <div className="pt-4 pb-2">
          <div className={`${MICRO_LABEL} px-2 mb-2 opacity-70`}>
            Semantic Layer
          </div>
          <div className="space-y-2">
            {([
              "success",
              "danger",
              "warning",
              "info",
            ] as const).map((colorType) => {
              const semanticColor = getSemanticColorSafely(
                localColors.semantic,
                colorType,
                currentThemeMode,
              );
              const chromaLimit = getSemanticChromaLimit(
                localColors.semantic,
                colorType,
                currentThemeMode,
              );
              const hueRange =
                localColors.semantic?.[colorType]?.hueRange;

              if (!semanticColor) return null;

              return (
                <ColorRow
                  key={colorType}
                  type={colorType}
                  color={semanticColor}
                  isExpanded={expandedColor === colorType}
                  onToggle={() =>
                    onExpandedColorChange(
                      expandedColor === colorType ? null : colorType,
                    )
                  }
                  onChange={(c: OklchColor) =>
                    onColorChange(colorType, c)
                  }
                  chromaLimit={chromaLimit}
                  onChromaLimitChange={(limit) =>
                    onChromaLimitChange(colorType, limit)
                  }
                  hueRange={hueRange}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

ColorsPanel.displayName = "ColorsPanel";
