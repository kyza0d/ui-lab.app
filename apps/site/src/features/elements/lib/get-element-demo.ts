import dynamic from 'next/dynamic';

type DemoComponent = React.ComponentType<object>;

const demoComponentMap: Record<string, DemoComponent> = {
  'header-basic': dynamic(() => import('ui-lab-registry/elements/Header/variations/01-basic').then(mod => ({ default: mod.BasicHeader }))),
  'page-basic': dynamic(() => import('ui-lab-registry/elements/Page/variations/01-basic').then(mod => ({ default: mod.BasicPage }))),
  'sidebar-basic': dynamic(() => import('ui-lab-registry/elements/Sidebar/variations/01-basic').then(mod => ({ default: mod.BasicSidebar }))),
};

export function getDemoComponent(demoPath: string): DemoComponent | null {
  return demoComponentMap[demoPath] || null;
}
