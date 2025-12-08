"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useState } from "react";

const textareaVariants = cva(
  "w-full px-3 py-2 rounded-md bg-background-800 border border-background-700 text-foreground-50 placeholder-foreground-500 text-sm",
  {
    variants: {
      size: {
        sm: "min-h-20 px-2 py-1 text-xs",
        md: "min-h-24 px-3 py-2 text-sm",
        lg: "min-h-32 px-4 py-3 text-base",
      },
      error: {
        true: "border-red-600 focus:ring-2 focus:ring-red-600/50 focus:border-red-600",
        false: "hover:border-background-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500",
      },
      disabled: {
        true: "bg-background-900 text-foreground-500 cursor-not-allowed opacity-60",
        false: "",
      },
      resizable: {
        true: "resize",
        false: "resize-none",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
      disabled: false,
      resizable: true,
    },
  }
);

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled">,
  VariantProps<typeof textareaVariants> {
  showCharacterCount?: boolean;
  maxCharacters?: number;
}

const TextArea = ({
  className,
  size,
  error,
  disabled,
  resizable,
  showCharacterCount = false,
  maxCharacters,
  value: controlledValue,
  defaultValue,
  ...props
}: TextAreaProps) => {
  const [value, setValue] = useState(controlledValue ?? defaultValue ?? "");

  const currentValue = controlledValue !== undefined ? controlledValue : value;
  const charCount = typeof currentValue === "string" ? currentValue.length : 0;
  const isOverLimit = maxCharacters ? charCount > maxCharacters : false;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // If maxCharacters is set, truncate if exceeded
    if (maxCharacters && newValue.length > maxCharacters) {
      const truncated = newValue.slice(0, maxCharacters);
      if (controlledValue === undefined) {
        setValue(truncated);
      }
      props.onChange?.({
        ...e,
        target: { ...e.target, value: truncated },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    } else {
      if (controlledValue === undefined) {
        setValue(newValue);
      }
      props.onChange?.(e);
    }
  };

  return (
    <div className="w-full">
      <textarea
        disabled={disabled ?? false}
        className={cn(
          textareaVariants({ size, error: error || isOverLimit, disabled: disabled ?? false, resizable, className })
        )}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
      {showCharacterCount && (
        <div className={cn(
          "text-xs mt-1 transition-colors",
          isOverLimit ? "text-red-600" : "text-foreground-500"
        )}>
          {charCount}{maxCharacters ? ` / ${maxCharacters}` : ""} characters
        </div>
      )}
    </div>
  );
};

TextArea.displayName = "TextArea";

export { TextArea, textareaVariants };
