import React from "react";
import { cn } from "@/lib/utils";

import styles from "./button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantMap = {
  primary: styles["primary"],
  secondary: styles["secondary"],
  outline: styles["outline"],
  ghost: styles["ghost"],
};

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const classes = cn(
      "button",
      `${variant}`,
      `${size}`,
      variantMap[variant],
      sizeMap[size],
      styles.button,
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
