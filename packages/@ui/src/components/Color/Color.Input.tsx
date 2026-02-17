"use client";

import React, { useState, useEffect } from "react";
import { Group } from "../Group";
import { Select } from "../Select";
import styles from "./Color.module.css";
import { formatColorHex, formatColorRgb, isValidColor } from "./color-utils";

export interface ColorInputProps {
  value: string;
  format: "hex" | "rgb";
  onFormatChange?: (format: "hex" | "rgb") => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showPreview?: boolean;
  previewColor?: string;
}

export const ColorInput = React.forwardRef<
  HTMLDivElement,
  ColorInputProps
>(
  (
    {
      value,
      format,
      onFormatChange,
      onValueChange,
      disabled,
      size = "md",
      showPreview = false,
      previewColor,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (isValidColor(newValue)) {
        onValueChange?.(newValue);
      }
    };

    const handleFormatChange = (newFormat: "hex" | "rgb") => {
      onFormatChange?.(newFormat);
    };

    return (
      <Group
        ref={ref}
        variant="ghost"
        spacing="sm"
        isDisabled={disabled}
        data-size={size}
        className={styles.inputGroup}
      >
        <Group.Select
          selectedKey={format}
          defaultValue={format === "hex" ? "Hex" : "RGB"}
          onSelectionChange={(key: React.Key | null) => {
            if (key) {
              handleFormatChange(key as "hex" | "rgb");
            }
          }}
          isDisabled={disabled}
          className={styles.formatSelect}
        >
          <Group.InputWrapper
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={format === "hex" ? "#000000" : "rgb(0, 0, 0)"}
            aria-label="Color input"
            className={styles.colorInput}
          />
          <Select.Trigger aria-label="Color format">
            <Select.Value placeholder="Format" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="hex" textValue="Hex">
              Hex
            </Select.Item>
            <Select.Item value="rgb" textValue="RGB">
              RGB
            </Select.Item>
          </Select.Content>
        </Group.Select>
        {showPreview && (
          <div
            className={styles.previewSwatch}
            data-size={size}
            style={{
              "--preview-color": previewColor || "transparent",
            } as React.CSSProperties}
            aria-label={`Color preview: ${value}`}
          />
        )}
      </Group>
    );
  }
);

ColorInput.displayName = "ColorInput";
