import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button - Styling', () => {
  it('applies variant styling via className', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });

    // Verify the button has the button class and variant attribute
    expect(button).toHaveClass('button');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('applies size styling via className', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });

    expect(button).toHaveClass('button');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('applies small size styling', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });

    expect(button).toHaveAttribute('data-size', 'sm');
  });

  it('applies medium size styling', () => {
    render(<Button size="md">Medium Button</Button>);
    const button = screen.getByRole('button', { name: /medium button/i });

    expect(button).toHaveAttribute('data-size', 'md');
  });

  it('applies secondary variant styling', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /secondary button/i });

    expect(button).toHaveAttribute('data-variant', 'secondary');
  });

  it('applies outline variant styling', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button', { name: /outline button/i });

    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('applies ghost variant styling', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole('button', { name: /ghost button/i });

    expect(button).toHaveAttribute('data-variant', 'ghost');
  });

  it('accepts additional className prop and merges with base styles', () => {
    render(
      <Button className="custom-class extra-class">
        Styled Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /styled button/i });

    expect(button).toHaveClass('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('extra-class');
  });

  it('combines variant, size, and custom className', () => {
    render(
      <Button variant="secondary" size="lg" className="my-custom-button">
        Complex Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /complex button/i });

    expect(button).toHaveClass('button');
    expect(button).toHaveClass('my-custom-button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('applies CSS module classes for button base styles', () => {
    render(<Button>Module Styles Button</Button>);
    const button = screen.getByRole('button');

    // Button should have the button class from CSS module
    expect(button).toHaveClass('button');
  });

  it('applies style attribute when passed', () => {
    render(
      <Button style={{ backgroundColor: 'red', padding: '10px' }}>
        Inline Styled Button
      </Button>
    );
    const button = screen.getByRole('button');

    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
    expect(button).toHaveStyle('padding: 10px');
  });

  it('respects disabled styling with data-disabled attribute', () => {
    render(
      <Button disabled variant="primary">
        Disabled Button
      </Button>
    );
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('data-disabled', 'true');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('applies all data attributes for styling hooks', () => {
    const { container } = render(
      <Button variant="primary" size="md" disabled>
        Full Style Button
      </Button>
    );
    const button = screen.getByRole('button');

    // Verify all expected data attributes are present with correct values
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'md');
    expect(button).toHaveAttribute('data-disabled', 'true');
    expect(button).toHaveAttribute('data-pressed', 'false');
    expect(button).toHaveAttribute('data-hovered', 'false');
    expect(button).toHaveAttribute('data-focused', 'false');
    expect(button).toHaveAttribute('data-focus-visible', 'false');
  });
});
