import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import {
  testAccessibility,
  testInteraction,
  testRefForwarding,
  testStyling
} from '@/tests/behaviors';

describe('Button Component Behaviors', () => {
  const defaultProps = { children: 'Button' };

  testAccessibility({
    component: Button,
    defaultProps,
    variants: {
      variant: ['primary', 'secondary', 'outline', 'ghost'],
      size: ['sm', 'md', 'lg']
    }
  });

  testInteraction({
    component: Button,
    defaultProps
  });

  testRefForwarding({
    component: Button,
    defaultProps,
    expectedElement: HTMLButtonElement
  });

  testStyling({
    component: Button,
    defaultProps,
    role: 'button',
    baseClassName: 'button'
  });
});

describe('Button - Component Specific', () => {
  it('tracks press state via data-pressed', async () => {
    const user = userEvent.setup();
    render(<Button>Press Me</Button>);
    const button = screen.getByRole('button');

    // Start press
    await user.pointer({ keys: '[MouseLeft>]', target: button });
    expect(button).toHaveAttribute('data-pressed', 'true');

    // End press
    await user.pointer({ keys: '[MouseLeft]', target: button });
    expect(button).toHaveAttribute('data-pressed', 'false');
  });

  it('tracks hover state via data-hovered', async () => {
    const user = userEvent.setup();
    render(<Button>Hover Me</Button>);
    const button = screen.getByRole('button');

    await user.hover(button);
    expect(button).toHaveAttribute('data-hovered', 'true');

    await user.unhover(button);
    expect(button).toHaveAttribute('data-hovered', 'false');
  });

  it('tracks focus-visible state', async () => {
    const user = userEvent.setup();
    render(<Button>Focus Me</Button>);
    const button = screen.getByRole('button');

    await user.tab();
    expect(button).toHaveAttribute('data-focus-visible', 'true');
  });

  it('respects isDisabled prop from React Aria', () => {
    render(<Button isDisabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled', 'true');
  });
});
