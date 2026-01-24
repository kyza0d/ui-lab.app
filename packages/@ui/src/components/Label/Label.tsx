import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
        true: "text-foreground-500 opacity-60 cursor-not-allowed",
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

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof labelVariants> {
  required?: boolean;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
}

const Label = ({
  className,
  size,
  disabled,
  error,
  required,
  helperText,
  helperTextError,
  children,
  ...props
}: LabelProps) => {
  return (
    <div className="w-full">
      <label
        className={cn(
          labelVariants({ size, disabled, error, className })
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-danger-600 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      {helperText && (
        <p className={cn(
          "text-xs mt-1 transition-colors",
          helperTextError ? "text-danger-600" : "text-foreground-500"
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Label.displayName = "Label";

export { Label, labelVariants };
