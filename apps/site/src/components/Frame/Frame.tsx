import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared";

const frameVariants = cva("relative w-full group isolate", {
  variants: {
    variant: {
      default: "text-zinc-500",
      accent: "text-emerald-500",
    },
    padding: {
      none: "p-0",
      small: "p-2",
      medium: "p-4",
      large: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "medium",
  },
});

export interface FrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof frameVariants> {
  path?: string;
  pathWidth?: number;
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ children, variant, padding, className, style, path, pathWidth = 0, ...props }, ref) => {
    const maskId = useId();

    // Define stroke width here to easily calculate the inset
    const borderStroke = 3;
    const halfStroke = borderStroke / 2;

    return (
      <div
        ref={ref}
        className={cn(frameVariants({ variant, padding }), className)}
        style={{
          maskImage: path ? `url(#${maskId})` : undefined,
          WebkitMaskImage: path ? `url(#${maskId})` : undefined,
          ...style,
        }}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="white" rx="24" />
              {path && (
                <svg x="50%" y="0" overflow="visible">
                  <path
                    d={path}
                    fill="black"
                    transform={`translate(-${pathWidth / 2}, 0)`}
                  />
                </svg>
              )}
            </mask>
          </defs>

          <rect
            x={halfStroke}
            y={halfStroke}
            width={`calc(100% - ${borderStroke}px)`}
            height={`calc(100% - ${borderStroke}px)`}
            rx="24"
            fill="none"
            stroke="currentColor"
            strokeWidth={borderStroke}
            mask={`url(#${maskId})`}
            className="border-zinc-800"
          />

          {/* Layer 2: The Notch Path Stroke */}
          {path && (
            <svg x="50%" y="0" overflow="visible">
              <path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="5.5"
                transform={`translate(-${pathWidth / 2}, 0)`}
              />
            </svg>
          )}
        </svg>

        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Frame.displayName = "Frame";
export default Frame;
