import React from "react";
import styles from "./Frame.module.css";

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "accent" | "subtle";
  borderWidth?: "thin" | "medium" | "thick";
  radius?: "none" | "small" | "medium" | "large";
  padding?: "none" | "small" | "medium" | "large";
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  (
    {
      children,
      variant = "default",
      borderWidth = "medium",
      radius = "medium",
      padding = "medium",
      className = "",
      ...props
    },
    ref
  ) => {
    const frameClassName = [
      styles.frame,
      styles[`variant-${variant}`],
      styles[`borderWidth-${borderWidth}`],
      styles[`radius-${radius}`],
      styles[`padding-${padding}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={frameClassName} {...props}>
        {children}
      </div>
    );
  }
);

Frame.displayName = "Frame";

export default Frame;
