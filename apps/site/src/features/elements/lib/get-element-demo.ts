import dynamic from 'next/dynamic';

type DemoComponent = React.ComponentType<object>;

const demoComponentMap: Record<string, DemoComponent> = {
  'header-preview': dynamic(() => import('ui-lab-registry/elements/Header').then(mod => ({ default: mod.HeaderPreview }))),
  'header-basic': dynamic(() => import('ui-lab-registry/elements/Header/variations/01-basic').then(mod => ({ default: mod.BasicHeader }))),
  'header-with-actions': dynamic(() => import('ui-lab-registry/elements/Header/variations/02-with-actions').then(mod => ({ default: mod.HeaderWithActions }))),
  'sidebar-preview': dynamic(() => import('ui-lab-registry/elements/Sidebar').then(mod => ({ default: mod.SidebarPreview }))),
  'sidebar-basic': dynamic(() => import('ui-lab-registry/elements/Sidebar/variations/01-basic').then(mod => ({ default: mod.BasicSidebar }))),
  'sidebar-with-content': dynamic(() => import('ui-lab-registry/elements/Sidebar/variations/02-with-content').then(mod => ({ default: mod.SidebarWithContent }))),
};

export function getDemoComponent(demoPath: string): DemoComponent | null {
  return demoComponentMap[demoPath] || null;
}
