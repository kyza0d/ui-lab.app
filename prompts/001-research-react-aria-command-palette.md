<research_objective>
Research and document which react-aria hooks and utilities would be suitable for replacing the cmdk library in the CommandPalette component. The goal is to understand react-aria's capabilities for implementing a fully-accessible command palette with proper keyboard navigation, ARIA patterns, and accessibility features.

Thoroughly explore react-aria's documentation and identify hooks that could support:
- Dialog/modal patterns for the command palette overlay
- Keyboard navigation and menu interactions
- Search/filter functionality
- List virtualization or scrolling behavior
- Focus management and trap
- ARIA labels and roles
- Accessible menu items and selection states
</research_objective>

<scope>
Primary focus: react-aria hooks and utilities (https://react-spectrum.adobe.com/react-aria/)

Key areas to investigate:
1. Modal/Dialog hooks (`useDialog`, `useOverlay`, `useModalDialog`)
2. Menu and selection hooks (`useMenu`, `useMenuItem`, `useListBox`)
3. Search/ComboBox hooks (`useComboBox`, `useSearchField`)
4. Keyboard navigation hooks (`useKeyboard`)
5. Focus management hooks (`useFocusManager`, `useFocusRing`)
6. State management hooks (`useTreeState`, `useListState`)
7. Accessibility utilities and patterns

Boundaries: Focus only on react-aria. Do not investigate alternatives like headless-ui or downshift for this research.
Version constraint: Research current/latest react-aria documentation and patterns (2025)
</scope>

<deliverables>
Create a comprehensive research document: `./prompts/001-react-aria-command-palette-research.md`

Format the research as follows:

## React-Aria Hooks for Command Palette Migration

### Overview
[Brief summary of react-aria's approach to accessible components]

### 1. Core Hooks for Command Palette
For each hook, document:
- Hook name and import path
- Primary purpose and what it provides
- Parameters and key options
- Return values and state management
- Accessibility features it provides
- Example use case relevant to command palette

Include these sections as applicable:
- **useDialog / useModalDialog** - For the overlay/modal behavior
- **useMenu** - For menu navigation and selection
- **useMenuItem** - For individual command items
- **useComboBox / useSearchField** - For search input
- **useKeyboard** - For keyboard shortcuts (Cmd+K, Escape)
- **useFocusRing** - For focus indicators
- **useFocusManager** - For focus trap and management
- **useListBox** - For list selection patterns
- **useListState** - For managing list state

### 2. State Management Patterns
Document how react-aria handles:
- Open/closed state for the modal
- Selected item state
- Search query state
- Filter and grouping logic
- Loading states

### 3. Keyboard Navigation and Interaction
Identify hooks/features for:
- Arrow key navigation (up/down)
- Enter key selection
- Escape key to close
- Cmd+K / Ctrl+K global shortcut
- Tab behavior within the palette
- Keyboard focus management

### 4. Accessibility Features Provided
Document the built-in accessibility:
- ARIA roles, attributes, and live regions
- Semantic HTML structure
- Screen reader announcements
- Keyboard accessibility standards
- Focus management best practices

### 5. Comparison with Current cmdk Implementation
Create a comparison table showing:
| Feature | Current cmdk | React-Aria Hook(s) | Notes |
|---------|-------------|-------------------|-------|
| Modal overlay | createPortal + custom styles | useDialog, useOverlay | |
| Search/filter | Command.Input | useSearchField or useComboBox | |
| Menu items | Command.Item | useMenuItem + useListState | |
| Keyboard nav | Built-in | useMenu + useKeyboard | |
| Focus trap | Manual | useOverlay (includes trap) | |
| ARIA attributes | Manual with role/aria | Automatic via hooks | |

### 6. Implementation Considerations
Document:
- Whether react-aria provides all features needed (search ranking, categories grouping, etc.)
- Any gaps where custom logic would still be needed
- CSS-in-JS integration with existing component styles
- Dependencies and bundle size implications
- Potential complexity tradeoffs

### 7. Example Hook Integration Patterns
For 2-3 key hooks (useDialog, useMenu, useSearchField), provide:
- Basic hook setup code
- How to integrate with state
- ARIA attributes applied automatically
- Keyboard event handling

### 8. Recommended Migration Path
Outline:
- Which parts of cmdk can be fully replaced by react-aria
- Which parts require custom implementation
- Suggested hook composition strategy
- Potential refactoring phases

</deliverables>

<evaluation_criteria>
The research should answer these key questions:
1. Can react-aria provide a complete replacement for cmdk's functionality?
2. What are the primary hooks needed for a command palette?
3. How much accessibility is automatically provided vs. manually implemented?
4. Will keyboard navigation work as expected (arrow keys, Enter, Escape)?
5. How is search/filtering typically implemented with react-aria patterns?
6. Are there any significant gaps in functionality or complexity increases?
7. What is the learning curve and integration effort?

Quality standards:
- All information comes from official react-aria documentation
- Examples are accurate and executable
- Comparison with current implementation is specific and detailed
- Recommendations are actionable and implementation-ready
</evaluation_criteria>

<verification>
Before completing the research, verify:
- All major react-aria hooks relevant to command palettes are documented
- The comparison table with cmdk is comprehensive and accurate
- Implementation patterns are clear and include code snippets
- All accessibility features are explicitly called out
- The migration path is realistic and detailed
- Documentation links are provided for self-service reference
</verification>
