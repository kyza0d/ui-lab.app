/**
 * Component Children Rules
 * Defines what types of children each component can accept
 *
 * Used during validation to ensure children specs are correct
 */

/**
 * Rules for different child types
 */
const CHILDREN_RULES: Record<string, string> = {
  button: 'text | icon',
  input: 'none',
  card: 'any',
  badge: 'text',
  alert: 'any',
  label: 'text',
  tabs: 'complex',
  dialog: 'any',
  menu: 'complex',
  select: 'complex',
  popover: 'any',
  tooltip: 'text',
  divider: 'none',
  flex: 'any',
  grid: 'any',
};

/**
 * Check if a component allows children
 */
export function componentAllowsChildren(componentId: string): boolean {
  const rule = CHILDREN_RULES[componentId];
  return rule !== 'none';
}

/**
 * Get children rules for a component
 */
export function getChildrenRules(componentId: string): string | null {
  return CHILDREN_RULES[componentId] || null;
}

/**
 * Check if a children specification is valid for a component
 */
export function isValidChildrenSpec(
  componentId: string,
  childrenType: 'text' | 'component' | 'slot' | 'complex'
): boolean {
  const rule = CHILDREN_RULES[componentId];

  if (!rule) {
    // Component not in registry, allow any
    return true;
  }

  if (rule === 'none') {
    return false;
  }

  if (rule === 'any') {
    return true;
  }

  // Check specific rules (e.g., "text | icon")
  const allowedTypes = rule.split('|').map((t) => t.trim());

  // Map childrenType to what rules expect
  if (childrenType === 'text' && allowedTypes.includes('text')) {
    return true;
  }

  if (childrenType === 'component' && allowedTypes.includes('icon')) {
    return true;
  }

  if (childrenType === 'complex' && allowedTypes.includes('complex')) {
    return true;
  }

  return false;
}

/**
 * Get description of what children a component accepts
 */
export function describeAllowedChildren(componentId: string): string {
  const rule = getChildrenRules(componentId);

  if (!rule) {
    return 'Not specified in registry';
  }

  if (rule === 'none') {
    return 'This component does not accept children';
  }

  if (rule === 'any') {
    return 'This component accepts any React children';
  }

  // Build human-readable description
  const types = rule.split('|').map((t) => t.trim());
  if (types.length === 1) {
    return `This component accepts ${types[0]}`;
  }

  const last = types.pop();
  return `This component accepts ${types.join(', ')} or ${last}`;
}
