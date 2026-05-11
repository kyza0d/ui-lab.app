# Core Design Audit Pillars

Six orthogonal dimensions. Each pillar: what it measures, what to check, what to flag.

---

## 1. Design System Adherence

**Measures:** Use of UI Lab tokens, components, and patterns vs. raw HTML / custom styling.

**Check:**
- Native HTML elements replaced with UI Lab equivalents (`<button>` → `<Button>`, `<a>` → `<Anchor>`, `<input>` → `<Input>`/`<Checkbox>`/`<Radio>`, `<div className="flex">` → `<Flex>`, styled `<div>` → `<Card>` / `<Group>`)
- Tokens used for color (no hex, no rgba)
- Semantic tokens for feedback states (success/danger/warning/info), not chromatic Tailwind
- React Aria props (`isDisabled`, `onPress`, `isOpen`)
- Compound sub-components where available
- Theme provider from MCP `get_theme_setup`

**Flag:**
- Any native HTML element with className or style
- Styled `<div>` used as layout or container
- Hex or rgba colors
- `disabled`, `onClick`, `isVisible` on UI Lab components
- Chromatic Tailwind (`green`, `red`, etc.) used for feedback intent

See `design-system.md` for the full component mapping table and token rules.

---

## 2. Layout & Spacing

**Measures:** Alignment, padding consistency, spatial grouping, whitespace, vertical rhythm.

**Check:**
- Padding consistent within component families
- Margin reflects logical grouping (related elements close, unrelated apart)
- Text baselines, grid, and edges aligned
- Whitespace reinforces hierarchy
- Responsive spacing holds across breakpoints

**Flag:**
- Related elements spatially isolated, or unrelated elements crowded
- Inconsistent padding on similar components
- Whitespace that flattens hierarchy instead of reinforcing it
- Mixed spacing systems in one view (some tight, some loose, no pattern)

---

## 3. Accessibility & Usability

**Measures:** Keyboard support, ARIA, interactive state clarity, error recovery.

**Check:**
- ARIA labels and descriptions present where needed
- Tab order logical; focus managed on navigation/modal open
- Hover, active, disabled, focus states all visually distinct
- Error states include a recovery path
- Form validation is inline, not withheld until submit
- Loading states shown for async work
- Touch targets ≥ 44×44px on mobile
- Buttons and links visually distinguishable

**Flag:**
- Interactive element missing hover or focus state
- Disabled state indistinguishable from enabled
- Missing or cryptic ARIA labels
- Tab order jumps or skips
- Error messages with no action for the user to take
- Validation that only appears post-submit

---

## 4. Cognitive Load

**Measures:** Information density, progressive disclosure, visual noise, decision complexity.

**Check:**
- Critical info foregrounded; secondary info behind disclosure (dropdowns, collapsibles)
- Defaults clear when many options exist
- Hierarchy supports scanning
- Modals scoped to a single concern
- Decoration subordinate to content

**Flag:**
- All options flat on screen with weak hierarchy
- Redundant or verbose copy
- Multiple paths to the same task with no scope distinction
- Empty states with vague messaging
- Modals that compound a flow instead of simplifying it
- Decoration that competes with content

---

## 5. Visual Consistency

**Measures:** Consistent typography, color semantics, visual weight, iconography, state feedback.

**Check:**
- Typography roles (heading / body / label) follow one set of rules
- Same state always gets the same color (success = one token, danger = one token, etc.)
- Primary actions carry more weight than secondary
- Same concept uses the same icon
- Success / error / loading / disabled visually distinct
- Corner radii from a fixed set, not arbitrary
- Button variants (filled / outlined / ghost) applied by consistent rule

**Flag:**
- Primary and secondary actions at the same visual weight
- Same state rendered in different colors across views
- Icon + label saying the same thing with no hierarchy benefit
- Typography size/weight jumps without a hierarchy reason
- Mixed corner radii on sibling components
- Success vs. info indistinguishable

---

## 6. Slop Avoidance

**Measures:** AI-generated filler, decorative noise, structural cliches, and low-intent UI chrome.

**Check:**
- Decorative separators have a real section-boundary purpose
- Gradients and shadows communicate data, depth, or state rather than decoration
- Card and section copy avoids badge-led title/description scaffolds and other repeated metadata-first patterns
- Empty states include only the icon, heading, copy, and actions needed to disambiguate the state
- Icons add semantic value instead of merely decorating headings
- Badges communicate hierarchy and status rather than accumulating labels
- Surfaces avoid unnecessary nesting depth
- No placeholder chrome ships in non-dev surfaces

**Flag:**
- Decorative dots, repeated dividers, or separators without structural purpose
- Gratuitous gradients or shadows on non-data surfaces
- Badge-led section stacks and reflexive header + description patterns
- Over-labeled empty states
- Generic icon + generic heading pairs
- Lorem ipsum, `TODO`, `Coming soon`, or stub badges on production surfaces
- Badge stacking with no information hierarchy
- Card-in-card or Group-in-Card-in-Card without semantic or layout purpose

See `slop-patterns.md` for the canonical pattern list, severity levels, and reporting guidance.

---

## Scoring

Each pillar scored 0–5:

| Stars | Meaning |
|---|---|
| 5 | No violations |
| 4 | Minor only — suggestions, low-priority warnings |
| 3 | Moderate — real gaps, core intent intact |
| 2 | Significant — pillar compromised, fix soon |
| 1 | Critical — pillar fundamentally broken |
| 0 | Missing or unusable |

---

## Audit procedure

1. Read the pillar's **Measures** line
2. Walk the **Check** list against the design
3. Walk the **Flag** list for violations
4. Assign stars from count and severity
5. Group violations by severity: CRITICAL / WARNING / SUGGESTION
6. Tie each finding back to the pillar it came from

For Adherence specifics, defer to `design-system.md`. For Slop Avoidance specifics, defer to `slop-patterns.md`.
