/**
 * Component Metadata Types
 * Metadata about components in the UI Lab registry
 */

/**
 * Information about a prop that a component accepts
 */
export interface PropMetadata {
  /** Prop name */
  name: string;
  /** Prop type (string, number, boolean, enum, etc) */
  type: string;
  /** Whether this prop is required */
  required: boolean;
  /** Type specification for enums and complex types */
  typeSpec?: {
    values?: unknown[];
    items?: PropMetadata[];
    properties?: Record<string, PropMetadata>;
  };
  /** Default value if not specified */
  defaultValue?: unknown;
  /** Description of what this prop does */
  description?: string;
}

/**
 * Metadata about what children a component accepts
 */
export interface ChildrenMetadata {
  /** What type of children this component accepts */
  allowedTypes: "none" | "text" | "component" | "slot" | "any";
  /** If slot-based, the available slot names */
  slots?: string[];
  /** Description of acceptable children */
  description?: string;
}

/**
 * Registry entry for a component's API information
 */
export interface ComponentAPIRegistry {
  /** Component ID */
  id: string;
  /** Accepted prop names */
  acceptedProps: string[];
  /** Required prop names */
  requiredProps: string[];
  /** Full prop metadata */
  props: Record<string, PropMetadata>;
  /** Children information */
  children: ChildrenMetadata;
}

/**
 * Recommended color assignments for a component + semantic intent combination
 */
export interface ColorRecommendation {
  /** Background color assignment */
  background?: {
    family: string;
    shade: number;
    cssVar: string;
  };
  /** Text/foreground color assignment */
  text?: {
    family: string;
    shade: number;
    cssVar: string;
  };
  /** Border color assignment */
  border?: {
    family: string;
    shade: number;
    cssVar: string;
  };
  /** Hover state color assignment */
  hover?: {
    family: string;
    shade: number;
    cssVar: string;
  };
  /** Active state color assignment */
  active?: {
    family: string;
    shade: number;
    cssVar: string;
  };
  /** Disabled state color assignment */
  disabled?: {
    family: string;
    shade: number;
    cssVar: string;
  };
  /** Why this color combination was recommended */
  rationale: string;
}

/**
 * Pre-computed color recommendations mapped by component:intent
 * Allows fast lookup instead of deriving colors
 */
export interface ColorRecommendationRegistry {
  [key: string]: ColorRecommendation;
}

/**
 * Accessibility information for a component
 */
export interface AccessibilityInfo {
  /** WCAG level supported */
  wcagLevel: "AA" | "AAA";
  /** Whether this component has aria support */
  hasAriaSupport: boolean;
  /** Notes about accessible usage */
  notes: string[];
}
