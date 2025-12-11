  Prompt: Fix React Aria Component SSR Hydration Mismatch

  Fix SSR hydration mismatch in Target caused by react-aria-components internal ID generation.

  Problem: react-aria-components pre-built components (Button, Select, etc.) internally call useId()
  for IDs we cannot control (e.g., progressId, labelId, descriptionId). In React 19+ with Next.js,
  useId() can generate different values between server and client renders, causing hydration errors like:
    - Server: id="react-aria-_R_abc123_"
    - Client: id="react-aria-_R_xyz789_"

  Solution: Replace the pre-built component with react-aria hooks which don't generate internal IDs.

  Pattern:
  1. Import hooks from "react-aria" instead of components from "react-aria-components":
     - useButton, useCheckbox, useSwitch, useTextField, etc.
     - useFocusRing for focus states
     - useHover for hover states
     - mergeProps to combine prop objects

  2. Render a native HTML element (<button>, <input>, etc.) instead of the React Aria component

  3. Apply hook props via mergeProps:
     const { buttonProps, isPressed } = useButton(options, ref);
     const { focusProps, isFocusVisible } = useFocusRing();
     const { hoverProps, isHovered } = useHover({ isDisabled });

     <button {...mergeProps(buttonProps, focusProps, hoverProps)} />

  4. Use data-* attributes for styling states:
     data-pressed={isPressed || undefined}
     data-hovered={isHovered || undefined}
     data-focus-visible={isFocusVisible || undefined}

  Key hooks by component:
  - Button: useButton, useFocusRing, useHover
  - Checkbox: useCheckbox, useFocusRing
  - Switch: useSwitch, useFocusRing
  - TextField: useTextField, useFocusRing
  - Select: useSelect, useListBox, useFocusRing

  This approach is self-contained, requires no providers, and maintains full accessibility.
