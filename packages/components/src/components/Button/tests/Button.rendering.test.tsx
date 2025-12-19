import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button - Rendering', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole('button', { name: /button/i });

    expect(button).toHaveClass('custom-class');
  });

  it('renders with HTML attributes', () => {
    render(
      <Button
        title="Test Tooltip"
        data-testid="test-button"
      >
        Button
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Test Tooltip');
    expect(button).toHaveAttribute('data-testid', 'test-button');
  });
});
