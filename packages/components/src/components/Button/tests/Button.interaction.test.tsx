import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button - Interaction', () => {
  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onPress handler when clicked (React Aria)', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();

    render(<Button onPress={onPress}>Press me</Button>);
    const button = screen.getByRole('button', { name: /press me/i });

    await user.click(button);

    expect(onPress).toHaveBeenCalledOnce();
  });

  it('does not call handler when disabled via disabled prop', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button', { name: /disabled/i });

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call handler when isDisabled is true', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();

    render(
      <Button isDisabled onPress={onPress}>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button', { name: /disabled/i });

    await user.click(button);

    expect(onPress).not.toHaveBeenCalled();
  });

  it('handles both onClick and onPress handlers together', async () => {
    const onClick = vi.fn();
    const onPress = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={onClick} onPress={onPress}>
        Both Handlers
      </Button>
    );

    const button = screen.getByRole('button', { name: /both handlers/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('supports keyboard activation with Enter key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Keyboard Button</Button>);
    const button = screen.getByRole('button', { name: /keyboard button/i });

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports keyboard activation with Space key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Keyboard Button</Button>);
    const button = screen.getByRole('button', { name: /keyboard button/i });

    await user.tab();
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls both handlers when both disabled and isDisabled are provided', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled isDisabled onClick={onClick}>
        Both Disabled
      </Button>
    );
    const button = screen.getByRole('button');

    // Button should be disabled
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled', 'true');

    // Clicking should not trigger handler
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('handles rapid clicks correctly', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Rapid Click Button</Button>);
    const button = screen.getByRole('button', { name: /rapid click button/i });

    // Click multiple times rapidly
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('handles click events when wrapped in parent containers', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <div data-testid="parent">
        <Button onClick={onClick}>Nested Button</Button>
      </div>
    );
    const button = screen.getByRole('button', { name: /nested button/i });

    await user.click(button);

    // Button click handler should be called
    expect(onClick).toHaveBeenCalledOnce();
    // Button should still be clickable within parent containers
    expect(button).toBeInTheDocument();
  });

  it('maintains focus state after keyboard activation', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Focus Button</Button>);
    const button = screen.getByRole('button', { name: /focus button/i });

    // Tab to focus the button
    await user.tab();
    expect(button).toHaveAttribute('data-focus-visible', 'true');

    // Activate with Enter
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();

    // Focus should still be present
    expect(button).toHaveFocus();
  });

  it('removes focus-visible when focus is lost after keyboard interaction', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Button>First Button</Button>
        <Button>Second Button</Button>
      </div>
    );

    const firstButton = screen.getByRole('button', { name: /first button/i });
    const secondButton = screen.getByRole('button', { name: /second button/i });

    // Tab to first button
    await user.tab();
    expect(firstButton).toHaveAttribute('data-focus-visible', 'true');

    // Tab to second button
    await user.tab();
    expect(secondButton).toHaveAttribute('data-focus-visible', 'true');
    // First button should no longer have focus-visible
    expect(firstButton).toHaveAttribute('data-focus-visible', 'false');
  });
});
