# Core Design Audit Pillars

Each pillar evaluates a distinct dimension of design quality. Together, they provide comprehensive validation of UI health.

---

## 1. Design System Adherence

**What it measures:** How thoroughly the UI utilizes UI Lab design tokens, components, and patterns vs. custom/raw HTML.

**Why it matters:** Consistent use of design tokens and components ensures visual coherence, maintainability, and brand consistency. Mixing custom styling with design system undercuts token authority and fragments the visual language. Using native HTML elements instead of UI Lab components breaks the design intent and makes the UI harder to maintain.

**Validation scope:**
- **Component sourcing (CRITICAL):** All UI elements must use UI Lab components, not native HTML
  - `<button>` → `<Button>`
  - `<a>` → `<Anchor>`
  - `<input>` → `<Input>`, `<Checkbox>`, `<Radio>`, etc.
  - `<div className="flex">` → `<Flex>`
  - `<div>` with styling → `<Card>`, `<Group>`, etc.
  - See `design-system.md` **Component Mapping** section for complete reference
- Color usage (tokens vs. hex/raw colors, semantic vs. chromatic)
- API conventions (React Aria props, compound sub-components)
- Theme/provider setup correctness
- Semantic color application for feedback states

**Red flags:**
- Any native HTML element with className styling
- Styled `<div>` used as a layout container instead of `<Flex>` or `<Grid>`
- Unstyled `<button>` instead of `<Button>`
- Raw `<input>` instead of `<Input>`, `<Checkbox>`, `<Radio>`
- Hex colors or rgba() instead of design tokens
- Missing React Aria conventions (using `disabled` instead of `isDisabled`)

**Reference:** See `design-system.md` for detailed criteria and the complete component mapping table.

---

## 2. Layout & Spacing

**What it measures:** Visual alignment, padding consistency, spatial relationships, hierarchy clarity, and overall composition balance.

**Why it matters:** Poor spacing creates visual noise and cognitive friction. Users struggle to parse information hierarchy and relationship between elements. Consistent spacing enables scannability and mental model clarity.

**Validation scope:**
- Padding consistency within component families
- Margin relationships (elements grouped vs. isolated)
- Alignment (text baselines, grid alignment, edge alignment)
- Whitespace distribution (breathing room vs. cramped layouts)
- Element proximity reflecting logical grouping
- Vertical rhythm consistency
- Responsive spacing breakpoints

**Red flags:**
- Elements that logically group but appear spatially isolated
- Inconsistent padding between similar elements
- Whitespace that doesn't reinforce information hierarchy
- Cramped layouts with insufficient breathing room
- Mixed spacing systems (some elements tightly packed, others loose)

---

## 3. Accessibility & Usability

**What it measures:** Keyboard navigation support, ARIA compliance, interactive state clarity, affordance distinctness, and error recovery.

**Why it matters:** Accessibility isn't optional — it impacts screen reader users, keyboard-only users, and situational disabilities. Unclear affordances frustrate all users. Poor error messaging leaves users stuck.

**Validation scope:**
- ARIA labels/descriptions where needed
- Keyboard navigation (tabindex order, focus management, escape hatch clarity)
- Interactive states clearly distinguished (hover, active, disabled, focus)
- Error states with actionable recovery paths
- Form validation clarity (inline feedback, required indicators)
- Loading states (prevents user from thinking the app is frozen)
- Button/link distinction clear (clickable elements obvious)
- Touch target sizes (min 44x44px for mobile)
- Focus indicators visible and obvious

**Red flags:**
- Interactive elements with no hover state
- Missing focus indicators
- Error messages with no recovery path
- Disabled state indistinguishable from enabled
- Missing or cryptic ARIA labels
- Tab order jumps or illogical flow
- Form validation hidden until submission

---

## 4. Cognitive Load

**What it measures:** Information density, progressive disclosure effectiveness, visual noise, and decision complexity.

**Why it matters:** Cognitive overload causes user paralysis and error. Reducing unnecessary information and using progressive disclosure (show advanced options on demand) improves task completion rates and confidence.

**Validation scope:**
- Information density (critical vs. contextual)
- Progressive disclosure usage (dropdowns for secondary controls, collapsibles for detail)
- Visual noise (redundant labels, unnecessary decorations, clutter)
- Decision paralysis (too many options, unclear defaults)
- Scanning difficulty (poor hierarchy makes parsing hard)
- Modal complexity (is this dialog trying to do too much?)

**Red flags:**
- All options visible at once with weak hierarchy
- Redundant or verbose copy
- Multiple ways to do the same task causing decision paralysis
- Empty states with vague messaging
- Modals that compound rather than simplify flow
- Too much decorative ornamentation
- Weak visual hierarchy (can't scan efficiently)

---

## 5. Visual Consistency

**What it measures:** Consistent application of typography, color semantics, visual weight, icon usage, and state feedback clarity.

**Why it matters:** Inconsistency trains users wrong expectations. If some buttons are bold and others light, users can't predict which is primary. If colors don't consistently represent the same state, users second-guess feedback.

**Validation scope:**
- Typography hierarchy (headings, body, labels follow consistent rules)
- Color semantics (success is always green-adjacent, danger always red-adjacent, etc.)
- Visual weight distribution (primary actions heavier/larger than secondary)
- Icon consistency (same concept uses same icon, icons convey meaning clearly)
- State feedback clarity (success, error, loading, disabled all visually distinct)
- Border/divider usage (consistent rules for grouping vs. separation)
- Component variant consistency (if button has filled/outlined/ghost, applied consistently)
- Corner radius consistency (not mixing 0px, 4px, 8px, 16px arbitrarily)

**Red flags:**
- Primary and secondary actions have same visual weight
- Color used inconsistently for same state (sometimes green for success, sometimes blue)
- Icon+label redundancy (icon meaning + label identical with no weight benefit)
- Typography weight/size jumps without clear hierarchy
- Mixed corner radii creating visual fragmentation
- State feedback unclear (can't distinguish success from info)

---

## Scoring System

Each pillar is scored 0–5 stars:

- **★★★★★ (5):** No violations. Pillar fully realized.
- **★★★★☆ (4):** Minor violations only (suggestions, low-priority warnings).
- **★★★☆☆ (3):** Moderate violations. Some important gaps, but core intent intact.
- **★★☆☆☆ (2):** Significant violations. Pillar compromised. Fix soon.
- **★☆☆☆☆ (1):** Critical failures. Pillar fundamentally broken. Must fix.
- **☆☆☆☆☆ (0):** Completely missing or unusable.

---

## How Auditors Use These Pillars

1. **Read pillar definition** to understand what it measures and why it matters
2. **Scan validation scope** to know what to look for
3. **Check red flags** against the provided code/design
4. **Assign star rating** based on severity and count of violations
5. **List violations** grouped by severity (CRITICAL, WARNING, SUGGESTION)
6. **Provide actionable feedback** tied back to the pillar's purpose

Reference `design-system.md` for detailed criteria within the **Adherence** pillar specifically.
