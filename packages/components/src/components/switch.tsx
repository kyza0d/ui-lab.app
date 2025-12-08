"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "relative inline-flex items-center cursor-pointer transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "w-10 h-6",
        md: "w-12 h-7",
        lg: "w-14 h-8",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed",
        false: "",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      pill: false,
    },
  }
);

const switchTrackVariants = cva(
  "absolute inset-0 transition-colors duration-200",
  {
    variants: {
      checked: {
        true: "bg-accent-500",
        false: "bg-background-700",
      },
      disabled: {
        true: "bg-background-800",
        false: "",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      pill: false,
    },
  }
);

const switchThumbVariants = cva(
  "absolute top-1 left-1 transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      checked: {
        true: "bg-accent-50",
        false: "bg-background-500/50",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      pill: false,
    },
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "disabled" | "size">,
  VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      disabled = false,
      checked: controlledChecked,
      onCheckedChange,
      onChange,
      defaultChecked,
      pill,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(controlledChecked ?? defaultChecked ?? false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;
    const isPill = pill === true;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    return (
      <div
        className={cn(
          switchVariants({ size: size as "sm" | "md" | "lg", disabled, pill: isPill, className }),
          "group",
          { "data-[checked=true]": checked }
        )}
        data-checked={checked}
      >
        <div
          className={cn(
            switchTrackVariants({
              checked,
              disabled: disabled && !checked,
              pill: isPill,
            })
          )}
        />
        <div
          className={cn(
            switchThumbVariants({ size: size as "sm" | "md" | "lg", checked, pill: isPill }),
            checked && (
              size === "sm"
                ? "translate-x-4"
                : size === "md"
                  ? "translate-x-5"
                  : "translate-x-6"
            )
          )}
        />
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled ?? false}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...props}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants, switchTrackVariants, switchThumbVariants };
