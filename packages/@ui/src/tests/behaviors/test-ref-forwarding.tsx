import { it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import type { ElementType, ComponentProps } from 'react';
import React from 'react';

interface RefForwardingTestOptions<T extends ElementType, E extends HTMLElement> {
  component: T;
  defaultProps?: ComponentProps<T>;
  expectedElement: new () => E;
  requiredProps?: ComponentProps<T>;
}

export function testRefForwarding<T extends ElementType, E extends HTMLElement>(
  options: RefForwardingTestOptions<T, E>
) {
  const { component: Component, defaultProps = {}, expectedElement, requiredProps = {} } = options;

  it('forwards ref to the underlying element (callback ref)', () => {
    const ref = vi.fn();
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} ref={ref} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(expectedElement);
  });

  it('forwards ref to the underlying element (object ref)', () => {
    const ref = React.createRef<E>();
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} ref={ref} />);
    expect(ref.current).toBeInstanceOf(expectedElement);
  });
}
