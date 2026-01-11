import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';
import { 
  testAccessibility, 
  testRefForwarding, 
  testStyling 
} from '@/tests/behaviors';
import React from 'react';

describe('Checkbox Component Behaviors', () => {
  const defaultProps = { 'aria-label': 'Checkbox' };

  testAccessibility({
    component: Checkbox,
    defaultProps,
    role: 'checkbox',
    variants: {
      size: ['sm', 'md', 'lg']
    }
  });

  testRefForwarding({
    component: Checkbox,
    defaultProps,
    expectedElement: HTMLDivElement
  });

  testStyling({
    component: Checkbox,
    defaultProps,
    role: 'checkbox',
  });
});

describe('Checkbox - Component Specific', () => {
  it('renders with label associated correctly', () => {
    render(<Checkbox id="test-check" label="Accept Terms" />);
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeInTheDocument();
  });

  it('toggles checked state when clicked (uncontrolled)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} aria-label="Toggle" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('respects controlled checked state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} onChange={onChange} aria-label="Controlled" />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledOnce();
    // Should still be unchecked because we didn't update props
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked={true} onChange={onChange} aria-label="Controlled" />);
    expect(checkbox).toBeChecked();
  });

  it('renders helper text', () => {
    render(<Checkbox label="Label" helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders error helper text', () => {
    render(
      <Checkbox 
        label="Label" 
        helperText="Error text" 
        helperTextError 
      />
    );
    const helper = screen.getByText('Error text');
    expect(helper).toBeInTheDocument();
    // We can't easily check the class name without knowing the hashed module class, 
    // but we can verify it renders.
  });

  it('supports indeterminate state', () => {
    render(<Checkbox isIndeterminate aria-label="Indeterminate" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
  });

  it('applies data attributes for styling', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Styled" />);
    const checkbox = screen.getByRole('checkbox');

    // Focus
    await user.tab();
    expect(checkbox).toHaveFocus();
    expect(checkbox).toHaveAttribute('data-focused', 'true');

    // Hover (if supported by userEvent/implementation)
    // Note: implementation uses react-aria-like manual handlers, let's test specific handler props if needed
    // or rely on userEvent.
  });

  it('updates data-selected when checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Selection" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toHaveAttribute('data-selected');
    
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('data-selected', 'true');
  });

  it('forwards ref to wrapper but allows access to input via other means if needed', () => {
    // The component forwards ref to the wrapper div as per code
    const ref = React.createRef<HTMLDivElement>();
    render(<Checkbox ref={ref} aria-label="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });
  
  it('respects disabled state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox disabled onChange={onChange} aria-label="Disabled" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('data-disabled', 'true');

    await user.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });
});
