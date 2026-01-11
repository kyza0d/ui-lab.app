import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ElementType, ComponentProps } from 'react';
import React from 'react';

interface StylingTestOptions<T extends ElementType> {
  component: T;
  defaultProps?: ComponentProps<T>;
  role?: string;
  requiredProps?: ComponentProps<T>;
  baseClassName?: string;
}

export function testStyling<T extends ElementType>(
  options: StylingTestOptions<T>
) {
  const { component: Component, defaultProps = {}, role, requiredProps = {}, baseClassName } = options;

  it('accepts custom className', () => {
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} className="custom-class" />);
    const element = role ? screen.getByRole(role) : screen.getByTestId((defaultProps as any)['data-testid'] || 'component');
    expect(element).toHaveClass('custom-class');
    if (baseClassName) {
      expect(element).toHaveClass(baseClassName);
    }
  });

  it('accepts inline styles', () => {
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} style={{ marginTop: '10px' }} />);
    const element = role ? screen.getByRole(role) : screen.getByTestId((defaultProps as any)['data-testid'] || 'component');
    expect(element).toHaveStyle({ marginTop: '10px' });
  });
}
