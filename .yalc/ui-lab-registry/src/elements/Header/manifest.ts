export const DEMO_PATH_MAP = {
  'header-basic': { variationKey: '01-basic', exportName: 'Basic' },
  'header-with-actions': { variationKey: '02-with-actions', exportName: 'WithActions' },
} as const;

export type DemoPaths = keyof typeof DEMO_PATH_MAP;
