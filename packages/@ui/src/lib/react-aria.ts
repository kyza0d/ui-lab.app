import type * as React from "react";

export function asElementProps<T extends keyof React.JSX.IntrinsicElements>(
  props: unknown
): React.ComponentPropsWithoutRef<T> {
  return props as React.ComponentPropsWithoutRef<T>;
}
