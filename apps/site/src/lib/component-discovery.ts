import type { Command } from 'ui-lab-components';
import { componentRegistry } from 'ui-lab-registry';

export function discoverComponentCommands(): Command[] {
  try {
    const componentCommands: Command[] = Object.values(componentRegistry).map((component) => ({
      id: `component-${component.id}`,
      label: `Go to ${component.name}`,
      description: component.description,
      category: 'Components',
      keywords: [component.id, ...(component.tags || [])],
      action: () => {
        window.location.pathname = `/components/${component.id}`;
      },
    }));

    return componentCommands;
  } catch (error) {
    console.error('Failed to discover component commands:', error);
    return [];
  }
}
