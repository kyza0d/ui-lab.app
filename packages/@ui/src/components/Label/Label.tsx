import { cva, type VariantProps } from "class-variance-authority";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";

const labelVariants = cva(
  "block text-foreground-300 transition-colors",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-md",
      },
      disabled: {
        true: "text-foreground-400 opacity-60 cursor-not-allowed",
        false: "",
      },
      error: {
        true: "text-danger-600",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      error: false,
    },
  }
);

export interface LabelStyleSlots {
  root?: StyleValue;
  requiredIndicator?: StyleValue;
  helperText?: StyleValue;
}

export type LabelStylesProp = StylesProp<LabelStyleSlots>;

const resolveLabelBaseStyles = createStylesResolver(['root', 'requiredIndicator', 'helperText'] as const);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof labelVariants> {
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: LabelStylesProp;
  /** Whether to show a required asterisk indicator */
  required?: boolean;
  /** Helper text shown below the label */
  helperText?: React.ReactNode;
  /** Whether to style the helper text as an error */
  helperTextError?: boolean;
  /** Size of the label text */
  size?: "sm" | "md" | "lg" | null;
  /** Whether the label appears disabled */
  disabled?: boolean | null;
  /** Whether to apply error styling */
  error?: boolean | null;
}

const Label = ({
  className,
  styles,
  size,
  disabled,
  error,
  required,
  helperText,
  helperTextError,
  children,
  ...props
}: LabelProps) => {
  const resolved = resolveLabelBaseStyles(styles);
  return (
    <div className="w-full">
      <label
        className={cn(
          labelVariants({ size, disabled, error, className }),
          resolved.root
        )}
        {...props}
      >
        {children}
        {required && (
          <span className={cn("text-danger-600 ml-1", resolved.requiredIndicator)} aria-label="required">
            *
          </span>
        )}
      </label>
      {helperText && (
        <p className={cn(
          "text-xs mt-1 transition-colors",
          helperTextError ? "text-danger-600" : "text-foreground-400",
          resolved.helperText
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Label.displayName = "Label";

export { Label, labelVariants };
