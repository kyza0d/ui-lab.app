// src/shared/components/Icon.tsx
import React from 'react';

interface IconProps {
  IconComponent: React.ComponentType<any>;
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  strokeWidth?: number | string; // Add strokeWidth prop here
  // Allow any other prop to be passed down to the IconComponent
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ IconComponent, size = 24, className, color, style, strokeWidth, ...props }) => {
  const iconProps: {
    size: number;
    className?: string;
    style?: React.CSSProperties;
    strokeWidth?: number | string; // Also add it to the explicit type for iconProps
    [key: string]: any;
  } = {
    size,
    className,
    style,
    strokeWidth, // Pass it through
    ...props,
  };

  if (color) {
    iconProps.style = { ...iconProps.style, color: color };
  }

  return <IconComponent {...iconProps} />;
};

export default Icon;
