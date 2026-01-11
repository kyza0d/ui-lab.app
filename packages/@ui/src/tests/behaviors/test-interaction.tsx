import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ElementType, ComponentProps } from 'react';
import React from 'react';

interface InteractionTestOptions<T extends ElementType> {
  component: T;
  defaultProps?: ComponentProps<T>;
  role?: string;
  requiredProps?: ComponentProps<T>;
}

export function testInteraction<T extends ElementType>(
  options: InteractionTestOptions<T>
) {
  const { component: Component, defaultProps = {}, role = 'button', requiredProps = {} } = options;

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} onClick={onClick} />);
    
    const element = role ? screen.getByRole(role) : screen.getByTestId((defaultProps as any)['data-testid'] || 'component');
    await user.click(element);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports keyboard activation with Enter key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} onClick={onClick} />);
    
    const element = role ? screen.getByRole(role) : screen.getByTestId((defaultProps as any)['data-testid'] || 'component');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Component {...(requiredProps as any)} {...(defaultProps as any)} onClick={onClick} disabled />);
    
    const element = role ? screen.getByRole(role) : screen.getByTestId((defaultProps as any)['data-testid'] || 'component');
    await user.click(element);
    expect(onClick).not.toHaveBeenCalled();
  });
}
