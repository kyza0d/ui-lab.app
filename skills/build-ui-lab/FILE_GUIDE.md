# File Guide - Understanding the Build UI Lab Skill

This guide explains what each file does and how they relate to each other.

## File Relationships

```
User Invokes Skill
         ↓
    SKILL.md (Router)
    └─ Takes intake
    └─ Routes to workflow based on intent
    
    Workflow determines which references to load
    ↓
    ├─ Generate UI? → Load design/ files
    ├─ Refactor? → Load design/ + references/
    ├─ Review? → Load design/ + references/
    └─ Learn? → Load design/guidelines + QUICKSTART

    Design Files (Foundation)
    ├─ guidelines.md (Philosophy & Rules)
    ├─ tokens.md (Color, Spacing, Typography)
    ├─ patterns.md (10 Common UI Examples)
    └─ component-selection.md (Decision Guide)

    Reference Files (Detailed Knowledge)
    ├─ component-apis.md (Component Details)
    ├─ color-family-guide.md (Color Deep Dive)
    ├─ spacing-typography.md (Typography Detail)
    ├─ dark-mode-patterns.md (Dark Mode)
    └─ accessibility-checklist.md (A11y Rules)
```

## File Descriptions

### Entry Point

#### SKILL.md
**Purpose**: Router that guides users to the right workflow
**Contains**: Intake questions, routing logic, essential principles
**When to use**: First file - user starts here
**Size**: ~200 lines
**Reads from**: All other files (by reference)

### Foundation (Design Files)

These four files form the foundation of the design system. They're always loaded and referenced.

#### design/guidelines.md
**Purpose**: Design philosophy and non-negotiable rules
**Contains**: 
- Core principles (semantic intent, component mastery, design tokens as constraints)
- 6 core rules with examples
- Common misconceptions
- When design conflicts with rules
**When to use**: Learning why rules exist, design philosophy
**Size**: 2,500 lines
**Key sections**:
  - Design Philosophy (3 sections)
  - Core Rules (6 detailed rules)
  - Common Misconceptions (4 sections)
  - Quick Reference (wrong vs. right tables)

#### design/tokens.md
**Purpose**: Reference for all design tokens (colors, spacing, typography)
**Contains**:
- 7 semantic color families with detailed guidance
- Shade selection guide
- Spacing scale and patterns
- Typography hierarchy
- Motion/animation guidelines
- Responsive breakpoints
**When to use**: Choosing colors, spacing, typography values
**Size**: 2,000 lines
**Key sections**:
  - Color Families (7 sections, one per family)
  - Shade Selection Guide (5 subsections)
  - Spacing Scale
  - Typography Scale
  - Motion & Animation
  - Breakpoints
  - Quick Reference Table

#### design/patterns.md
**Purpose**: 10 production-ready UI patterns with complete code
**Contains**:
- 10 complete patterns (success alert, form field, card, modal, badge, delete dialog, skeleton, tabs, button group, empty state)
- For each: semantic intent, component composition, design rationale, code example, usage example
**When to use**: Building UI, need an example or pattern blueprint
**Size**: 1,500 lines
**Key sections**:
  - Pattern 1-10 (each has 5 subsections)
  - Integration Notes
  - Related Files

#### design/component-selection.md
**Purpose**: Systematic decision-making for component choice
**Contains**:
- Decision tree flowchart ("What should I use?")
- Component quick reference table
- Detailed sections for major components
- Variant explanations (button, alert, badge)
- Common mistakes
- Flowcharts for specific contexts
**When to use**: Choosing which component to use
**Size**: 2,000 lines
**Key sections**:
  - Decision Tree Flowchart
  - Component Quick Reference
  - Input Components
  - Button Components
  - Feedback Components
  - Container Components
  - Layout Components
  - Navigation Components
  - Detailed Component Sections
  - Selection Flowcharts by Context
  - Common Mistakes
  - Summary & Priorities

### Educational (Learning Files)

These files help users understand the system quickly.

#### QUICKSTART.md
**Purpose**: 5-minute introduction to the skill
**Contains**:
- What is this skill?
- 5-minute intro
- 3 practical scenarios (success alert, form with validation, refactor)
- Key concepts (semantic intent, color families, component mastery)
- Decision trees
- Quick reference
- Do's and don'ts
- Learning path
**When to use**: First-time users, quick reference
**Size**: 500 lines
**Best for**: Getting productive in 5 minutes

#### README.md
**Purpose**: Skill overview, navigation, and support
**Contains**:
- Overview and file structure
- Quick start (which files to read when)
- Core concepts with examples
- Key files description
- Design system integration
- Common use cases
- 6 core rules
- Support and learning resources
- Navigation table
**When to use**: Skill orientation, file navigation, support
**Size**: 500 lines
**Best for**: Understanding the skill structure

### Architecture & Implementation

#### SKILL_DESIGN.md (in parent directory)
**Purpose**: Complete architectural specification for the skill
**Contains**:
- Part 1: Skill architecture and structure
- Part 2: Core philosophy (design-first thinking)
- Part 3: Integration with @mcp system
- Part 4: Tool design and capabilities
- Part 5: Design files content (guidelines, tokens, patterns)
- Part 6: Component recommendation engine
- Part 7: Integration checklist
- Part 8: Example usage flows
- Part 9: Success criteria
- Part 10: Implementation notes
**When to use**: Extending the skill, implementing remaining files
**Size**: 9,500+ lines
**Location**: `/home/kyza/Projects/ui-lab/app/SKILL_DESIGN.md`

### Implementation Status

#### SKILL_IMPLEMENTATION_SUMMARY.md (in parent directory)
**Purpose**: Status of implementation and what's next
**Contains**:
- What has been created
- File statistics
- What's ready today
- What's next for completion
- How to use the skill
- File paths
- Success criteria
**When to use**: Understanding implementation status
**Size**: 600+ lines
**Location**: `/home/kyza/Projects/ui-lab/app/SKILL_IMPLEMENTATION_SUMMARY.md`

## How to Navigate

### If you're a new user:
1. Start: README.md (2 min)
2. Learn: QUICKSTART.md (5 min)
3. Reference: design/guidelines.md (when confused about philosophy)

### If you're building UI:
1. Choose component: design/component-selection.md
2. Pick colors: design/tokens.md
3. Find pattern: design/patterns.md
4. Verify rules: design/guidelines.md

### If you're extending the skill:
1. Read: SKILL_DESIGN.md (architecture)
2. Understand: design/guidelines.md (philosophy)
3. Study: design/patterns.md (approach)
4. Follow: SKILL_DESIGN.md Part 5 (implementation specs)

### If you need specific information:
- **Component choice?** → design/component-selection.md
- **Color selection?** → design/tokens.md
- **Design philosophy?** → design/guidelines.md
- **UI example?** → design/patterns.md
- **Quick intro?** → QUICKSTART.md
- **Skill overview?** → README.md
- **Architecture?** → SKILL_DESIGN.md
- **Implementation status?** → SKILL_IMPLEMENTATION_SUMMARY.md

## File Dependencies

```
SKILL.md (Entry Point)
├─ design/guidelines.md (Core Philosophy)
├─ design/tokens.md (Design Tokens)
├─ design/patterns.md (UI Patterns)
└─ design/component-selection.md (Component Guide)

QUICKSTART.md
├─ References all core design files
└─ Simplifies for quick learning

README.md
├─ References all core design files
└─ Provides navigation

SKILL_DESIGN.md (Architecture)
└─ References all existing files
└─ Specifies remaining files

Design Files Reference Each Other:
├─ guidelines.md → components, tokens, patterns
├─ tokens.md → guidelines (context)
├─ patterns.md → tokens (color), guidelines (rules)
└─ component-selection.md → patterns, tokens, guidelines
```

## Size and Complexity

| File | Lines | Complexity | Best For |
|------|-------|-----------|----------|
| SKILL.md | 200 | Low | Routing, intake |
| guidelines.md | 2,500 | Medium | Learning philosophy |
| tokens.md | 2,000 | Medium | Reference lookups |
| patterns.md | 1,500 | High | Code examples |
| component-selection.md | 2,000 | High | Decision making |
| QUICKSTART.md | 500 | Low | Quick learning |
| README.md | 500 | Low | Navigation |

## Cross-References

Every file references and links to other relevant files:

**guidelines.md** links to:
- tokens.md (color/spacing/typography)
- patterns.md (see examples)
- component-selection.md (component choice)

**tokens.md** links to:
- guidelines.md (why use tokens)
- patterns.md (see examples)
- component-selection.md (which component uses which tokens)

**patterns.md** links to:
- tokens.md (color values used)
- guidelines.md (why these choices)
- component-selection.md (component details)

**component-selection.md** links to:
- tokens.md (shade selection)
- guidelines.md (semantic intent)
- patterns.md (see patterns)

## Planned Future Files

These files are specified in SKILL_DESIGN.md but not yet created:

### Workflows/
- generate-component.md (step-by-step generation)
- refactor-to-ui-lab.md (migration guide)
- review-design-consistency.md (design audit)
- learn-design-system.md (educational workflow)

### References/
- component-apis.md (component API details)
- color-family-guide.md (color deep dive)
- spacing-typography.md (typography details)
- dark-mode-patterns.md (dark mode implementation)
- accessibility-checklist.md (A11y rules)

### Templates/
- component-template.tsx (component generation template)
- layout-template.tsx (layout template)
- pattern-template.tsx (pattern template)

### Scripts/
- validate-design.ts (design compliance)
- component-mapper.ts (component recommendations)

## File Locations

```
skills/build-ui-lab/
├── SKILL.md                          # Skill router
├── README.md                         # Skill overview
├── QUICKSTART.md                     # 5-minute intro
├── FILE_GUIDE.md                     # This file
└── design/
    ├── guidelines.md                 # Philosophy & rules
    ├── tokens.md                     # Design tokens
    ├── patterns.md                   # 10 UI patterns
    └── component-selection.md        # Component guide

Parent directory:
├── SKILL_DESIGN.md                   # Architecture spec
└── SKILL_IMPLEMENTATION_SUMMARY.md   # Status
```

## Summary

This skill is organized in three layers:

1. **Entry & Navigation** (SKILL.md, README.md, QUICKSTART.md)
2. **Foundation** (design/ files: guidelines, tokens, patterns, components)
3. **Reference & Learning** (All files interconnected)

Start at the top, reference as needed, dive deeper when curious.
