export type PreviewDeviceVariant = "mobile" | "tablet" | "desktop";

export const DEVICE_PRESETS: Record<PreviewDeviceVariant, number> = {
  mobile: 375,
  tablet: 800,
  desktop: 1024,
};

export const calculateVariantFromWidth = (width: number): PreviewDeviceVariant => {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};
