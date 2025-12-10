import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./input.module.css";

type Variant = "default" | "ghost";
type Size = "sm" | "md" | "lg";

export interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  variant?: Variant;
  size?: Size;
  error?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const variantMap: Record<Variant, string> = {
  default: "default",
  ghost: "ghost",
};

const sizeMap: Record<Size, string> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      error = false,
      disabled,
      prefixIcon,
      suffixIcon,
      type = "text",
      ...props
    },
    ref
  ) => {
    const hasPrefix = !!prefixIcon;
    const hasSuffix = !!suffixIcon;

    return (
      <div className={styles.container}>
        {hasPrefix && (
          <div className={cn(styles.iconWrapper, styles.prefixIcon)}>
            {prefixIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          data-error={error ? "true" : "false"}
          className={cn(
            styles.input,
            variant !== "default" && styles[`input.${variantMap[variant]}`],
            styles[`input.${sizeMap[size]}`],
            hasPrefix && "pl-8",
            hasSuffix && "pr-8",
            className
          )}
          {...props}
        />
        {hasSuffix && (
          <div className={cn(styles.iconWrapper, styles.suffixIcon)}>
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
