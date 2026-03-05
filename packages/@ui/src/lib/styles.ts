import { cn, type StyleValue } from './utils';

export type StylesProp<S extends object> = StyleValue | S;

export function resolveStyles<K extends string>(
  slotKeys: readonly K[],
  styles: StyleValue | Partial<Record<K, StyleValue>> | undefined
): Record<K, string> {
  const result = {} as Record<K, string>;

  if (!styles) {
    for (const key of slotKeys) result[key] = '';
    return result;
  }

  if (typeof styles === 'string' || Array.isArray(styles)) {
    for (const key of slotKeys) result[key] = key === 'root' ? cn(styles) : '';
    return result;
  }

  for (const key of slotKeys) {
    result[key] = cn((styles as Partial<Record<K, StyleValue>>)[key]);
  }
  return result;
}

export function createStylesResolver<K extends string>(slotKeys: readonly K[]) {
  return (styles: StyleValue | Partial<Record<K, StyleValue>> | undefined): Record<K, string> =>
    resolveStyles(slotKeys, styles);
}
