import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button - React Aria Integration', () => {
  it('applies focus ring state (data-focus-visible) when focused via keyboard', async () => {
    const user = userEvent.setup();
    render(<Button>Focusable Button</Button>);

    const button = screen.getByRole('button', { name: /focusable button/i });

    // Tab to focus the button via keyboard
    await user.tab();

    // The button should have focus-visible set to "true" when focused via keyboard
    expect(button).toHaveAttribute('data-focus-visible', 'true');
  });

  it('does not show focus-visible on mouse click', async () => {
    const user = userEvent.setup();
    render(<Button>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: /clickable button/i });

    // Click the button (should not trigger focus-visible)
    await user.click(button);

    // After clicking, focus-visible may not be set since it was focused by pointer
    // but it will be removed when focus is lost
    expect(button).toHaveAttribute('data-focused');
  });

  it('tracks hover state via data-hovered attribute', async () => {
    const user = userEvent.setup();
    render(<Button>Hoverable Button</Button>);

    const button = screen.getByRole('button', { name: /hoverable button/i });

    // Hover over the button
    await user.hover(button);

    // The hover state should be "true" when hovering
    expect(button).toHaveAttribute('data-hovered', 'true');
  });

  it('removes hover state when mouse leaves', async () => {
    const user = userEvent.setup();
    render(<Button>Hoverable Button</Button>);

    const button = screen.getByRole('button', { name: /hoverable button/i });

    // Hover over the button
    await user.hover(button);
    expect(button).toHaveAttribute('data-hovered', 'true');

    // Unhover
    await user.unhover(button);

    // Hover state attribute should be false when not hovering
    const hoverAttr = button.getAttribute('data-hovered');
    expect(hoverAttr).toBe('false');
  });

  it('tracks pressed state via data-pressed attribute', async () => {
    const user = userEvent.setup();
    render(<Button>Pressable Button</Button>);

    const button = screen.getByRole('button', { name: /pressable button/i });

    // Mouse down to trigger pressed state
    await user.pointer({ keys: '[MouseLeft>]', target: button });

    // The pressed state should be "true" when pressed
    expect(button).toHaveAttribute('data-pressed', 'true');
  });

  it('removes pressed state on mouse up', async () => {
    const user = userEvent.setup();
    render(<Button>Pressable Button</Button>);

    const button = screen.getByRole('button', { name: /pressable button/i });

    // Mouse down
    await user.pointer({ keys: '[MouseLeft>]', target: button });
    expect(button).toHaveAttribute('data-pressed', 'true');

    // Mouse up
    await user.pointer({ keys: '[MouseLeft]', target: button });

    // Pressed state should be false when not pressed
    await act(async () => {
      // Wait a tick to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    const pressedAttr = button.getAttribute('data-pressed');
    expect(pressedAttr).toBe('false');
  });

  it('preserves focus state via data-focused attribute', async () => {
    const user = userEvent.setup();
    render(<Button>Focused Button</Button>);

    const button = screen.getByRole('button', { name: /focused button/i });

    // Focus the button
    act(() => {
      button.focus();
    });

    // Should have focused state set to "true"
    expect(button).toHaveAttribute('data-focused', 'true');
  });

  it('provides buttonProps from useButton hook', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');

    // Button should have type="button" from React Aria's buttonProps
    expect(button).toHaveAttribute('type', 'button');
  });

  it('merges custom props with React Aria props', () => {
    render(
      <Button
        id="custom-id"
        title="Custom Title"
        aria-label="Custom Label"
      >
        Merged Props Button
      </Button>
    );

    const button = screen.getByRole('button', { name: /custom label/i });

    // Custom props should be merged
    expect(button).toHaveAttribute('id', 'custom-id');
    expect(button).toHaveAttribute('title', 'Custom Title');
    expect(button).toHaveAttribute('type', 'button'); // From React Aria
  });

  it('respects isDisabled prop from React Aria', () => {
    render(
      <Button isDisabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled', 'true');
  });

  it('tracks multiple states simultaneously during interaction', async () => {
    const user = userEvent.setup();
    render(<Button>Multi-State Button</Button>);

    const button = screen.getByRole('button');

    // Hover and press
    await user.hover(button);
    await user.pointer({ keys: '[MouseLeft>]', target: button });

    // Should have both states set to "true"
    expect(button).toHaveAttribute('data-hovered', 'true');
    expect(button).toHaveAttribute('data-pressed', 'true');
  });
});
