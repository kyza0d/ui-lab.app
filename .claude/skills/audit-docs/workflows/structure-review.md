# Structure Review Workflow

<objective>
Focus exclusively on documentation organization, formatting, and visual structure without changing content.
</objective>

<process>
## Step 1: Read Documentation

Read the documentation to understand current structure and content organization.

## Step 2: Analyze Current Structure

### Map Content Hierarchy
Create a visual outline of the current structure:
- Top-level sections (H1/H2)
- Subsections (H3/H4)
- Major content blocks
- Current use of separators

### Identify Structural Elements
Note what's currently used:
- Heading levels and hierarchy
- Horizontal rules (`---`)
- Lists (ordered/unordered)
- Code blocks
- Blockquotes
- Tables
- Whitespace

## Step 3: Evaluate Structure Quality

### Heading Hierarchy Issues
Check for:
- [ ] Skipped heading levels (H1 → H3)
- [ ] Inconsistent heading styles
- [ ] Non-descriptive headings ("Overview", "Introduction")
- [ ] Too many or too few heading levels
- [ ] Headings that aren't parallel in structure

### Section Separation Issues
Look for:
- [ ] Missing separators between distinct topics
- [ ] Separators in wrong places (breaking related content)
- [ ] Overuse of separators (too many divisions)
- [ ] Unclear topic boundaries

### Content Grouping Issues
Identify:
- [ ] Related information split across sections
- [ ] Unrelated information grouped together
- [ ] Prerequisite info appearing after it's needed
- [ ] Examples separated from concepts they illustrate

### Flow and Navigation Issues
Check:
- [ ] Illogical ordering of sections
- [ ] Missing transitions between topics
- [ ] Difficult to scan or find information
- [ ] No clear entry point for different user types

### Visual Hierarchy Issues
Look for:
- [ ] Large walls of text without breaks
- [ ] Overuse of formatting (too many bold/italics)
- [ ] Poor use of lists (paragraphs that should be lists)
- [ ] Code blocks without context
- [ ] Missing whitespace

## Step 4: Design Improved Structure

### Create Recommended Structure

Propose a new organization:

```
# Main Title

[Brief introduction - what this doc covers]

---

## Section 1: [Descriptive Name]

[Content organized logically]

### Subsection 1.1

[Details]

### Subsection 1.2

[Details]

---

## Section 2: [Descriptive Name]

[Next major topic]

---

[Continue pattern]
```

### Define Separator Strategy

Specify where `---` should appear:
- Between major conceptual shifts
- Before/after large code examples
- Between different document "parts"
- To separate reference from tutorial content

**Do NOT use separators:**
- Between every heading
- Within a cohesive explanation
- To break up related content

### Recommend Heading Changes

List specific heading improvements:
- Current: "Overview" → Proposed: "What is [Component]?"
- Current: "Usage" → Proposed: "How to Use [Feature]"
- Consolidate H4s into H3 + lists where appropriate

### Suggest Content Reordering

If content needs reordering:
1. [Section name] should move from position X to position Y because [reason]
2. [Section name] should be split into [new section 1] and [new section 2]
3. [Sections X and Y] should be merged because [reason]

## Step 5: Apply Structure Improvements

Choose implementation approach:

### Option A: Restructure Only (Content Unchanged)
- Apply new heading hierarchy
- Add/remove separators
- Reorder sections
- Improve visual formatting
- **Do not change wording**

### Option B: Show Structure Plan
- Present the recommended structure
- Explain rationale for changes
- Let user approve before applying

### Option C: Hybrid
- Apply obvious improvements (separators, heading fixes)
- Propose more significant changes for approval

Ask user: "How would you like me to proceed?"

## Step 6: Present Structured Version

### Show Structure Comparison

**Before**:
```
[Flat outline of original structure]
```

**After**:
```
[Hierarchical outline of new structure]
```

### Explain Improvements

For each major change:
- **What changed**: [description]
- **Why**: [rationale]
- **Benefit**: [how this helps users]

### Provide Restructured Documentation

Present the documentation with improved structure:
- Clear heading hierarchy
- Strategic use of `---` separators
- Logical content flow
- Enhanced visual organization
- Better scannability

## Step 7: Validate and Iterate

### Structure Quality Check
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Separators mark clear topic boundaries
- [ ] Related content is grouped together
- [ ] Flow follows user's mental model
- [ ] Easy to scan and find information
- [ ] Visual hierarchy supports comprehension

### Get User Feedback
- "Does this structure make sense?"
- "Is information easier to find now?"
- "Any sections that should be reorganized differently?"

Make adjustments as needed.
</process>

<structure_patterns>
## Effective Documentation Structures

### Pattern 1: Tutorial Style
```
# Title

Introduction (what you'll learn)

---

## Prerequisites

---

## Step 1: [Action]
## Step 2: [Action]
## Step 3: [Action]

---

## Next Steps
```

### Pattern 2: API Reference
```
# API Name

Overview

---

## Installation
## Authentication

---

## Endpoints

### GET /resource
### POST /resource
### PUT /resource
### DELETE /resource

---

## Examples
## Error Handling
```

### Pattern 3: Concept Guide
```
# Concept Name

What is [Concept]?

---

## Why Use [Concept]?
## How [Concept] Works
## Key Concepts

---

## Examples

### Basic Example
### Advanced Example

---

## Best Practices
## Common Pitfalls
```

### Pattern 4: Getting Started
```
# Project Name

Overview (one paragraph)

---

## Installation
## Quick Start
## Core Concepts

---

## Documentation
## Examples
## Support
```

### Pattern 5: Component Documentation
```
# Component Name

Description and use cases

---

## Props / API
## Usage

### Basic Usage
### Advanced Usage

---

## Examples
## Accessibility
## Styling
```
</structure_patterns>

<separator_guidelines>
## When to Use `---`

### Use separators to divide:
- Major sections (Installation vs. Usage vs. API)
- Different content types (Concepts vs. Reference vs. Examples)
- Distinct user tasks (Setup vs. Configuration vs. Deployment)
- Before/after large code examples or diagrams
- Between document "acts" (Introduction → Main Content → Resources)

### Don't use separators:
- Between every single heading
- Within a cohesive explanation or tutorial
- To break up a single concept across paragraphs
- More than 2-3 times in a short document
- When headings already provide clear separation

### Best Practices:
- 3-5 major separators in a medium-length doc
- Space paragraphs before and after separators
- Use heading + separator for major sections
- Use separator alone for visual breaks within sections
</separator_guidelines>

<success_criteria>
Structure review is complete when:
- Heading hierarchy is logical and consistent
- Separators mark clear topic boundaries
- Content is grouped logically
- Flow makes sense for the intended audience
- Document is easy to scan and navigate
- Visual hierarchy supports comprehension
- User confirms structure improvements
</success_criteria>
