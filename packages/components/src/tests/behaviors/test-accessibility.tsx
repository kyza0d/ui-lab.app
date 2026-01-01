import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { ElementType, ComponentProps } from 'react';
import React from 'react';

expect.extend(toHaveNoViolations);

interface AccessibilityTestOptions<T extends ElementType> {
  component: T;
  defaultProps?: ComponentProps<T>;
  role?: string;
  requiredProps?: ComponentProps<T>;
  variants?: Record<string, any[]>;
}

export function testAccessibility<T extends ElementType>(
  options: AccessibilityTestOptions<T>
) {
  const { component: Component, defaultProps = {}, role = 'button', requiredProps = {}, variants } = options;

  it('has no accessibility violations (default)', async () => {
    const { container } = render(<Component {...(requiredProps as any)} {...(defaultProps as any)} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  if (role) {
    it(`has correct role: ${role}`, () => {
      render(<Component {...(requiredProps as any)} {...(defaultProps as any)} />);
      expect(screen.getByRole(role)).toBeInTheDocument();
    });
  }

  it('accepts aria-label', async () => {
    const { container } = render(
      <Component {...(requiredProps as any)} {...(defaultProps as any)} aria-label="Test Label" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    if (role) {
      expect(screen.getByRole(role, { name: /test label/i })).toBeInTheDocument();
    }
  });

  if (variants) {
    Object.entries(variants).forEach(([prop, values]) => {
      it(`renders accessibly with all ${prop} variants`, async () => {
        for (const value of values) {
          const props = { ...requiredProps, ...defaultProps, [prop]: value };
          const { container, unmount } = render(<Component {...(props as any)} />);
          const results = await axe(container);
          expect(results).toHaveNoViolations();
          unmount();
        }
      });
    });
  }
}
