import type { ElementPackageMetadata, LayoutConfig } from 'ui-lab-registry';

const defaultPackageLayout: LayoutConfig = {
  layoutClass: 'default-package',
  columnSpan: 2,
  rowSpan: 1,
  previewConfig: {
    scale: 1,
    centeringStrategy: 'full',
  },
};

export function getPackageLayoutConfig(pkg: ElementPackageMetadata): LayoutConfig {
  if (pkg.layout) {
    return {
      ...defaultPackageLayout,
      ...pkg.layout,
      previewConfig: {
        ...defaultPackageLayout.previewConfig,
        ...pkg.layout.previewConfig,
      },
    };
  }
  return defaultPackageLayout;
}
