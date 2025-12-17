---
name: audit-docs
description: Evaluates and refines documentation for clarity, structure, and helpfulness. Removes fluff, organizes content into logical sections, and ensures documentation serves clear purposes.
---

<essential_principles>
## Documentation Quality Standards

Documentation should be:
- **Helpful**: Provides clear value to the intended audience
- **Concise**: No unnecessary words or redundant information
- **Well-organized**: Logical flow with clear sections and visual structure
- **Purposeful**: Every section serves a specific, identifiable function
- **Scannable**: Easy to find information quickly with clear headings and structure

## Evaluation Framework

When auditing documentation, ask:
1. **Helpfulness**: Will users actually use this information? Does it solve a real problem?
2. **Clarity**: Is the message clear without jargon or unnecessary complexity?
3. **Brevity**: Can this be said in fewer words without losing meaning?
4. **Purpose**: Why does this section exist? What question does it answer?
5. **Redundancy**: Is this information repeated elsewhere? Is it needed in multiple places?

## Structural Elements

Use visual separators to organize content:
- `---` (horizontal rule): Separates major sections or distinct content areas
- Headings: Create hierarchy and enable scanning
- Lists: Break down complex information
- Code blocks: Isolate technical content
- Whitespace: Provides visual breathing room

## Refinement Philosophy

- **Cut ruthlessly**: If it doesn't serve a purpose, remove it
- **Organize logically**: Group related information together
- **Show, don't tell**: Examples are often better than explanations
- **Respect user time**: Get to the point quickly
- **Maintain voice**: Keep the tone consistent with the project
</essential_principles>

---

<formatting_and_organization>
## Formatting & Organization Standards

### Logic Order & Content Flow

Structure information following natural reading patterns and user journeys:

1. **Start with purpose**: Begin with *why* something matters before diving into *what* or *how*
2. **Build progressively**: Move from simple to complex, general to specific
3. **Group related concepts**: Place related information together to show connections
4. **Anticipate questions**: Order sections to answer questions before they arise
5. **End with action**: Conclude sections with what users should do next

### Hierarchy Levels

Use clear heading hierarchy to establish information architecture:

- **H1 (`#`)**: Page or document title (use once per document)
- **H2 (`##`)**: Major sections - distinct topics or workflows
- **H3 (`###`)**: Subsections within major topics, breaking down complexity
- **H4 (`####`)**: Detail sections, specific steps, or deep dives (use sparingly)

**Guidelines:**
- Never skip heading levels (don't jump from H2 to H4)
- Limit to 3-4 hierarchy levels maximum per document
- Each heading level should have related content beneath it
- Use consistent terminology across heading levels

### Strategic Separator Usage

Use `---` separators judiciously to delineate content:

**Use separators to:**
- Separate distinct major sections with different purposes
- Break up very long documents into visual chunks
- Distinguish between different content types (explanation vs. instructions vs. examples)
- Create breathing room around critical information

**Avoid separators for:**
- Every subsection (they become noise)
- Simple bullet lists or short content blocks
- Transitions within a single topic
- Separating headings from their content

**Placement patterns:**
- Place after section introductions when followed by different content types
- Use between major conceptual shifts or workflow sections
- Skip for subsections that support the parent section

### Content Organization Patterns

#### Pattern 1: Problem-Solution-Benefit
```
## Feature Overview
[Brief explanation of what it is]

---

### Problem It Solves
[Specific problem or use case]

### How It Works
[Mechanism or process]

### Benefits
[Value proposition]
```

#### Pattern 2: Concept-Steps-Example
```
## Workflow Name
[Conceptual introduction]

---

### Step-by-Step
[Numbered instructions]

### Example
[Concrete example]
```

#### Pattern 3: Overview-Details-Reference
```
## Main Topic
[High-level overview]

---

### Detailed Explanation
[In-depth information]

---

### Reference Guide
[Lookup tables, API docs, etc.]
```

### Visual Organization Techniques

- **Lists**: Use for parallel information, options, or steps
- **Code blocks**: Isolate technical content and make it scannable
- **Blockquotes**: Highlight tips, warnings, or important notes
- **Tables**: Compare options or show structured data
- **Emphasis**: Use *italics* for terms, **bold** for key concepts
</formatting_and_organization>

---

<intake>
What would you like to do?

1. **Audit existing documentation** - Evaluate quality and get improvement recommendations
2. **Refine documentation** - Apply improvements to existing documentation
3. **Quick check** - Fast evaluation of specific documentation concerns
4. **Structure review** - Focus on organization and formatting only

Please select an option (1-4) or provide the documentation file path to audit.
</intake>

<routing>
| Response | Next Action | Workflow |
|----------|-------------|----------|
| 1, "audit", "evaluate", "review", "analyze" | Load audit workflow | workflows/audit-documentation.md |
| 2, "refine", "improve", "fix", "rewrite" | Load refinement workflow | workflows/refine-documentation.md |
| 3, "quick", "fast", "check" | Load quick check workflow | workflows/quick-check.md |
| 4, "structure", "organization", "format" | Load structure workflow | workflows/structure-review.md |
| File path provided | Determine intent or offer options | Ask: "What would you like to do with this file?" |

**Intent-based routing:**
- If user provides file path + "audit" → workflows/audit-documentation.md
- If user provides file path + "refine" → workflows/refine-documentation.md
- If user provides file path + "structure" → workflows/structure-review.md
- If user provides file path only → Show intake menu with file context

**After reading the workflow, follow it exactly.**
</routing>

<workflows_index>
## Available Workflows

| Workflow | Purpose | When to Use |
|----------|---------|-------------|
| audit-documentation.md | Comprehensive quality evaluation | When you need detailed analysis and recommendations |
| refine-documentation.md | Apply improvements to documentation | When you're ready to make changes |
| quick-check.md | Fast targeted evaluation | When you need quick feedback on specific concerns |
| structure-review.md | Focus on organization and formatting | When content is good but structure needs work |
</workflows_index>

<success_criteria>
Documentation has been successfully audited or refined when:
- All evaluation questions have been answered with specific evidence
- Concrete, actionable recommendations are provided
- Refined documentation is more concise while maintaining or improving clarity
- Content is organized into logical, well-separated sections
- Each section has a clear, identifiable purpose
- User can immediately understand how to apply the recommendations
</success_criteria>
