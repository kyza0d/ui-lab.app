export interface ThemeConfig {
  radius: number;
  borderWidth: number;
}

export interface GeneratedTypeScale {
  name: string;
  minSize: number;
  fluidVw: number;
  maxSize: number;
}

export interface ExtendedTypeScale extends GeneratedTypeScale {
  isFluid: boolean;
  cssValue: string;
}
