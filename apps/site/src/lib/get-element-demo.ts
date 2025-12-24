type DemoComponent = React.ComponentType<object>;

const demoMap: Record<string, DemoComponent> = {
  // 'header-basic': HeaderBasic,
  // 'header-with-nav': HeaderWithNav,
  // 'sidebar-collapsed': SidebarCollapsed,
  // 'sidebar-expanded': SidebarExpanded,
  // 'card-simple': CardSimple,
  // 'card-with-image': CardWithImage,
};

export function getDemoComponent(demoPath: string): DemoComponent | null {
  return demoMap[demoPath] || null;
}
