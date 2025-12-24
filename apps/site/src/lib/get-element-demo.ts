import dynamic from 'next/dynamic';

type DemoComponent = React.ComponentType<object>;

const demoComponentMap: Record<string, DemoComponent> = {
  'header-preview': dynamic(() => import('ui-lab-registry/elements/Header').then(mod => ({ default: mod.HeaderPreview }))),
  'header-basic': dynamic(() => import('ui-lab-registry/elements/Header/variations/01-basic').then(mod => ({ default: mod.BasicHeader }))),
  'header-actions': dynamic(() => import('ui-lab-registry/elements/Header/variations/02-with-actions').then(mod => ({ default: mod.HeaderWithActions }))),
};

export function getDemoComponent(demoPath: string): DemoComponent | null {
  return demoComponentMap[demoPath] || null;
}
