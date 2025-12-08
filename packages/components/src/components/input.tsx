import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full px-3 py-2 rounded-md text-foreground-50 placeholder-foreground-500",
  {
    variants: {
      variant: {
        default: "bg-background-800 border border-background-700",
        ghost: "focus:ring-transparent",
      },
      size: {
        sm: "h-8 text-sm px-2 py-1",
        md: "h-10 text-sm px-3 py-2",
        lg: "h-12 text-base px-4 py-3",
      },
      error: {
        true: "border-danger-600 focus:ring-2 focus:ring-danger-600/50 focus:border-danger-600",
        false: "hover:border-background-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500",
      },
      disabled: {
        true: "bg-background-900 text-foreground-500 cursor-not-allowed opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
      disabled: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | "error" | "variant">,
  VariantProps<typeof inputVariants> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const Input = ({
  className,
  variant,
  size,
  error,
  disabled,
  prefixIcon,
  suffixIcon,
  type = "text",
  ...props
}: InputProps) => {
  const hasPrefix = !!prefixIcon;
  const hasSuffix = !!suffixIcon;

  return (
    <div className="relative w-full">
      {hasPrefix && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-500 flex items-center pointer-events-none">
          {prefixIcon}
        </div>
      )}
      <input
        type={type}
        disabled={disabled ?? undefined}
        className={cn(
          inputVariants({ variant, size, error, disabled: disabled ?? false, className }),
          hasPrefix && "pl-8",
          hasSuffix && "pr-8"
        )}
        {...props}
      />
      {hasSuffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-500 flex items-center pointer-events-none">
          {suffixIcon}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input, inputVariants };
