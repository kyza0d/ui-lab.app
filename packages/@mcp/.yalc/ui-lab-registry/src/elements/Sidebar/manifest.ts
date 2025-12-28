export const DEMO_PATH_MAP = {
  'sidebar-basic': { variationKey: '01-basic', exportName: 'Basic' },
  'sidebar-with-content': { variationKey: '02-with-content', exportName: 'WithContent' },
} as const;

export type DemoPaths = keyof typeof DEMO_PATH_MAP;
