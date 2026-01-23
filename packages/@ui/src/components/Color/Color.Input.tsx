"use client";

import React, { useState, useEffect } from "react";
import { Group } from "../Group";
import { Select } from "../Select";
import styles from "./ColorPicker.module.css";
import { formatColorHex, formatColorRgb, isValidColor } from "./color-utils";

export interface ColorPickerInputProps {
  value: string;
  format: "hex" | "rgb";
  onFormatChange?: (format: "hex" | "rgb") => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showPreview?: boolean;
  previewColor?: string;
}

export const ColorPickerInput = React.forwardRef<
  HTMLDivElement,
  ColorPickerInputProps
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
        spacing="normal"
        isDisabled={disabled}
        data-size={size}
      >
        <Group.InputWrapper
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          size={size}
          placeholder={format === "hex" ? "#000000" : "rgb(0, 0, 0)"}
          aria-label="Color input"
        />
        <Group.Select
          selectedKey={format}
          defaultValue={format === "hex" ? "Hex" : "RGB"}
          onSelectionChange={(key) => {
            if (key) {
              handleFormatChange(key as "hex" | "rgb");
            }
          }}
          isDisabled={disabled}
        >
          <Select.Trigger aria-label="Color format">
            <Select.Value placeholder="Format" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="hex" textValue="Hex">
                Hex
              </Select.Item>
              <Select.Item value="rgb" textValue="RGB">
                RGB
              </Select.Item>
            </Select.List>
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

ColorPickerInput.displayName = "ColorPickerInput";
