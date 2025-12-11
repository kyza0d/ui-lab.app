export interface ComponentExample {
  id: string;
  title: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
  controls?: any[]; // ControlDef[]
  renderPreview?: (props: Record<string, any>) => React.ReactNode;
  previewHeight?: string;
  previewLayout?: "center" | "start";
}

export interface ComponentVariant {
  id: string;
  name: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
}

export interface ComponentAccessibilityNote {
  icon: string;
  title: string;
  description: string;
}

export interface ComponentDetail {
  id: string;
  name: string;
  description: string;
  overview: React.ReactNode;
  examples: ComponentExample[];
  variants?: ComponentVariant[];
  accessibility?: ComponentAccessibilityNote[];
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
  usage?: React.ReactNode;
}
