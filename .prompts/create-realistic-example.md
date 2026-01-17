# Create Realistic Component Example
This guide describes how to create a high-quality, "real-world" example for a specific UI Lab component. Use this prompt when you need to generate a new demo that showcases a component in a realistic, feature-rich context.

## 1. Objective
Create 3-4, well-crafted React component example that demonstrates the components usage

## 2. Chain of Thought Strategy (REQUIRED)
Before writing code, you must engage in an internal **Chain of Thought** process to refine your idea. Ask yourself a series of questions to move from a "basic" idea to a "polished" one.

### Step 1: Select a Domain & specific Use Case
*   *Initial Idea:* "I need a Card example."
*   *Refinement:* "Let's do Finance. A 'Stock Trading Card'."

### Step 2: Interrogate the Design
*   *Question:* "Is a title and text enough?"
*   *Answer:* "No, that's boring. Real trading cards have live prices, percent changes, and action buttons."
*   *Action:* Add a `Badge` for the percent change. Use Green/Red semantic colors.

### Step 3: Enhance with Ecosystem Components
*   *Question:* "How can I make this interactive/functional using UI Lab components?"
*   *Answer:* "Users need to switch timeframes (1D, 1W, 1Y). I should use a `Select` or a `Group` of buttons for that."
*   *Answer:* "Users need to Buy/Sell. I'll add a `Group` with two Buttons."

### Step 4: Visual Polish (Iconography)
*   *Question:* "How do I make the actions clear?"
*   *Answer:* "Add `FaArrowTrendUp` to the badge. Add `FaWallet` to the Buy button."

## 3. Design Constraints (STRICT)

### 🚫 Forbidden Styles
*   **NO Shadows:** Do not use `shadow-*`. Rely on borders (`border-background-700`) and subtle background colors (`bg-background-900`) for depth.
*   **NO Gradients:** Do not use `bg-gradient-*`.
*   **NO Custom Hover Styles:** Do not write custom hover logic (e.g., `hover:scale-105`). Rely on built-in component states.

### Color System (OKLCH)
*   **NEVER** use standard Tailwind colors (e.g., `bg-blue-500`).
*   **ALWAYS** use the project's semantic CSS variables:
    *   `var(--background-700)` to `var(--background-950)`
    *   `var(--foreground-50)` to `var(--foreground-500)`
    *   `var(--accent-50)` to `var(--accent-500)`
    *   `var(--success-*)`, `var(--warning-*)`, `var(--danger-*)`, `var(--info-*)`

## 5. Output Template
You must provide the following file content.
### File: `packages/registry/src/components/[Component]/examples/XX-[scenario-name].tsx`
