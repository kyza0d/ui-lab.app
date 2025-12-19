import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Button - Accessibility', () => {
  it('has correct button role', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('accepts aria-label for accessible name', () => {
    render(<Button aria-label="Close dialog">✕</Button>);
    expect(
      screen.getByRole('button', { name: /close dialog/i })
    ).toBeInTheDocument();
  });

  it('respects disabled state in accessibility tree', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toHaveAttribute('disabled');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Button variant="primary" size="md">
        Accessible Button
      </Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <Button disabled>
        Disabled Button
      </Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with aria-label', async () => {
    const { container } = render(
      <Button aria-label="Custom label">
        🎯
      </Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports aria-describedby', () => {
    render(
      <>
        <Button aria-describedby="button-description">
          Help Button
        </Button>
        <div id="button-description">This button provides help</div>
      </>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'button-description');
  });

  it('announces disabled state to screen readers', () => {
    render(<Button disabled>Save Changes</Button>);
    const button = screen.getByRole('button', { name: /save changes/i });

    // Button should be marked as disabled in accessibility tree
    expect(button).toBeDisabled();
  });

  it('renders with all variants accessibly', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;

    for (const variant of variants) {
      const { container, unmount } = render(
        <Button variant={variant}>Test Button</Button>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });

  it('renders with all sizes accessibly', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container, unmount } = render(
        <Button size={size}>Test Button</Button>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });
});
