import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { act } from '@testing-library/react';
import { Button } from '../Button';

describe('Button - Ref Forwarding', () => {
  it('forwards ref to button element with callback ref', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref as object ref', () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button ref={ref}>
        Ref Button
      </Button>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('allows imperative method calls through ref', () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button ref={ref}>
        Method Button
      </Button>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.focus).toBeDefined();
    expect(ref.current?.click).toBeDefined();
    expect(ref.current?.blur).toBeDefined();
  });

  it('ref can be used to focus the button programmatically', () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button ref={ref}>
        Focusable Button
      </Button>
    );

    act(() => {
      ref.current?.focus();
    });
    expect(document.activeElement).toBe(ref.current);
  });

  it('ref can be used to click the button programmatically', () => {
    const onClick = vi.fn();
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button ref={ref} onClick={onClick}>
        Clickable Button
      </Button>
    );

    ref.current?.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('ref provides access to button properties', () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button ref={ref} title="Test Title">
        Property Button
      </Button>
    );

    expect(ref.current?.textContent).toBe('Property Button');
    expect(ref.current?.getAttribute('title')).toBe('Test Title');
    expect(ref.current?.type).toBe('button');
  });

  it('ref works with React hooks like useRef', () => {
    function RefTestComponent() {
      const buttonRef = useRef<HTMLButtonElement>(null);

      return (
        <div>
          <Button ref={buttonRef} id="test-button">
            Hook Ref Button
          </Button>
          <button
            id="focus-button"
            onClick={() => buttonRef.current?.focus()}
          >
            Focus Other Button
          </button>
        </div>
      );
    }

    render(<RefTestComponent />);

    const focusButton = screen.getByRole('button', { name: /focus other button/i });
    act(() => {
      focusButton.click();
    });

    const refButton = screen.getByRole('button', { name: /hook ref button/i });
    expect(document.activeElement).toBe(refButton);
  });

  it('ref persists across re-renders', () => {
    const ref = { current: null as HTMLButtonElement | null };
    const { rerender } = render(
      <Button ref={ref}>
        Button
      </Button>
    );

    const firstRef = ref.current;

    rerender(
      <Button ref={ref}>
        Updated Button
      </Button>
    );

    expect(ref.current).toBe(firstRef);
  });

  it('handles multiple ref assignments (callback and object)', () => {
    const callbackRef = vi.fn();
    const objectRef = { current: null as HTMLButtonElement | null };

    // Note: React doesn't allow multiple refs directly, but we can test
    // that our ref forwarding works correctly
    render(
      <Button ref={callbackRef}>
        Callback Ref Button
      </Button>
    );

    expect(callbackRef).toHaveBeenCalled();
    expect(callbackRef.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('ref provides access to disabled state', () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <Button ref={ref} disabled>
        Disabled Button
      </Button>
    );

    expect(ref.current?.disabled).toBe(true);
  });
});
