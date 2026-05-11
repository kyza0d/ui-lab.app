# Slop Pattern Reference

Canonical slop patterns for the Slop Avoidance pillar. These are AI-generated filler, decorative noise, and structural cliches that make a UI feel less intentional.

Use this reference when auditing a page or component. For each finding, name the concrete element, the canonical pattern, the severity, and the simplest fix that removes or consolidates the slop.

## How to Read This File

- The patterns are grouped by intent, not by visual similarity.
- Use the exact pattern name when reporting findings.
- Prefer removal, consolidation, or hierarchy repair over restyling.
- Do not flag intentional separators, data-driven badges, or depth cues that carry real meaning.

## 1. Decorative Noise

These patterns add visual texture without adding structure, meaning, or state.

### Decorative dots / dividers

- Severity: `WARNING`
- What it is: Dots, dot rows, repeated bullets, or horizontal rules that do not mark a real boundary.
- Typical forms: `•`, `·`, `···`, ornamental rules, repeated separators.
- Fix: Remove the decoration or keep only the separator that reflects an actual section break.

### Gratuitous gradients

- Severity: `WARNING`
- What it is: Gradient styling on surfaces that do not need depth, flow, or data emphasis.
- Typical forms: `bg-gradient-*`, inline gradients, decorative fades on cards or panels.
- Fix: Replace the gradient with a flat token surface unless the gradient carries meaning.

### Gratuitous drop shadows

- Severity: `WARNING`
- What it is: Shadow styling used as decoration instead of elevation or focus.
- Typical forms: `shadow-*` on cards, panels, or text with no layering purpose.
- Fix: Remove the shadow or keep it only when it communicates hierarchy or lift.

## 2. Metadata-First Scaffolds

These patterns turn labels, badges, and headings into a repetitive shell instead of real hierarchy.

### Badge-led section stack

- Severity: `WARNING`
- What it is: A repeated scaffold where a section starts with badges, then a title, then a description, then more badges or metadata.
- Typical forms: `title + badge + description`, `header + description + badges`, `title + content + badges`.
- Fix: Keep the strongest hierarchy signal, remove redundant metadata, and move supporting detail into the body copy.

### Badge stacking

- Severity: `WARNING`
- What it is: Three or more badges grouped together without a clear priority or information hierarchy.
- Typical forms: badge rows, label clusters, status chips stacked as decoration.
- Fix: Collapse badges into one meaningful status, or replace the cluster with a single metadata line.

### Generic icon + generic heading pairs

- Severity: `SUGGESTION`
- What it is: A decorative icon placed beside a heading when the icon does not add meaning.
- Typical forms: icon plus label that restates the same idea, iconography chosen for flavor only.
- Fix: Remove the icon or replace it with one that adds semantic value, status, or direction.

## 3. Placeholder Chrome

These patterns signal unfinished work, mocked content, or production surfaces that still look provisional.

### Placeholder chrome

- Severity: `CRITICAL`
- What it is: Visible filler content or development leftovers shipped into a user-facing surface.
- Typical forms: `Lorem ipsum`, `TODO`, `Coming soon`, stub badges, mock copy in production.
- Fix: Replace the placeholder with real content or remove the surface until it is ready.

## 4. Hierarchy Inflation

These patterns make the UI feel heavier, noisier, or more complicated than the underlying task requires.

### Over-labeled empty states

- Severity: `WARNING`
- What it is: An empty state that uses icon, heading, subtext, and CTA all at once when fewer elements would be clearer.
- Typical forms: icon + heading + subtext + button, repeated explanatory copy that restates the state.
- Fix: Keep only the elements that disambiguate the state and support the next action.

### Unnecessary nesting depth

- Severity: `WARNING`
- What it is: Nested containers that do not add layout structure, semantic clarity, or progressive disclosure.
- Typical forms: card-in-card, group-in-card-in-card, wrapper layers with no distinct purpose.
- Fix: Flatten the hierarchy unless each layer changes layout, semantics, or interaction.

## Canonical Pattern List

Use these names exactly when logging findings:

- Decorative dots / dividers
- Gratuitous gradients
- Gratuitous drop shadows
- Badge-led section stack
- Badge stacking
- Generic icon + generic heading pairs
- Placeholder chrome
- Over-labeled empty states
- Unnecessary nesting depth

## Finding Format

Each Slop Avoidance finding should include:

- The concrete element or component.
- The canonical pattern name.
- The severity.
- A concrete fix that removes, consolidates, or simplifies the pattern.

Example:

`- Empty state panel: [WARNING] Over-labeled empty state with icon, heading, subtext, and CTA -> remove the decorative icon and keep one short sentence plus the primary action`
