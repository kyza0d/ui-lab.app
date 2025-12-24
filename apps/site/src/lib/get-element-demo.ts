import dynamic from 'next/dynamic';

type DemoComponent = React.ComponentType<object>;

// @ts-ignore - Will be available after registry build
const demoComponentMap: Record<string, DemoComponent> = {
  'header-basic': dynamic(() =>
    // @ts-ignore - Path resolved at runtime
    import('ui-lab-registry/elements/Header/variations/01-basic').then(mod => ({
      default: mod.BasicHeader,
    }))
  ),
  'header-actions': dynamic(() =>
    // @ts-ignore - Path resolved at runtime
    import('ui-lab-registry/elements/Header/variations/02-with-actions').then(mod => ({
      default: mod.HeaderWithActions,
    }))
  ),
};

export function getDemoComponent(demoPath: string): DemoComponent | null {
  return demoComponentMap[demoPath] || null;
}
