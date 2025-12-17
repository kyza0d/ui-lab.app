# UI Lab Documentation Generation Skills

This directory contains a suite of specialized skills for generating high-quality documentation for the UI Lab project. These skills are designed to help create comprehensive, accurate, and user-friendly documentation about the UI Lab project, its features, and how to use it effectively.

## Overview

The documentation skills are organized by topic and serve different purposes:

| Skill | Purpose | Use When |
|-------|---------|----------|
| **overview-guide.md** | Project overview and getting started | Creating introductory documentation, quick start guides |
| **styling-guide.md** | CSS architecture and styling system | Documenting styling patterns, CSS variables, theming |
| **cli-usage-guide.md** | CLI tool documentation | Creating command references, setup guides |
| **best-practices-guide.md** | Component usage and development patterns | Writing best practices, component usage guides |
| **architecture-guide.md** | Project structure and architecture | Documenting monorepo structure, build processes |
| **advanced-topics-guide.md** | Advanced scenarios and troubleshooting | Creating advanced guides, FAQ, troubleshooting |

## Skill Descriptions

### 1. Overview & Getting Started Guide
**File:** `overview-guide.md`

Generates comprehensive overview and getting started documentation covering:
- What UI Lab is and its value proposition
- Key features (27+ components, accessibility, styling)
- Quick start guides for new users
- Installation methods (npm, CLI)
- Basic usage examples
- Project structure overview
- Technology stack explanation

**Output Style:** Friendly, introductory, copy-paste ready code examples

### 2. Styling & CSS Architecture Guide
**File:** `styling-guide.md`

Generates documentation about the styling system covering:
- CSS Module pattern explanation
- Semantic CSS variable system (colors, typography, spacing)
- CSS variable reference tables
- Data attributes for state styling
- Tailwind CSS integration (@apply usage)
- Theme customization patterns
- Real CSS code examples from components

**Output Style:** Technical, pattern-focused, with detailed examples

### 3. CLI Usage & Configuration Guide
**File:** `cli-usage-guide.md`

Generates CLI command documentation covering:
- All `ui-lab` commands and options
- Command examples (both interactive and headless)
- Project detection and framework scaffolding
- Theme presets and templates
- Component dependency resolution
- Troubleshooting CLI issues
- CI/CD integration patterns

**Output Style:** Reference-oriented, command format tables, real output examples

### 4. Best Practices & Component Development Guide
**File:** `best-practices-guide.md`

Generates developer guidance covering:
- Component usage patterns
- Accessibility requirements and testing
- TypeScript and type safety
- State management patterns
- Performance optimization strategies
- Form handling patterns
- Testing approaches
- Common pitfalls and solutions (do's and don'ts)

**Output Style:** Educational, pattern-based, with examples and explanations

### 5. Project Architecture & Monorepo Guide
**File:** `architecture-guide.md`

Generates technical architecture documentation covering:
- Monorepo structure and pnpm workspaces
- Individual package descriptions and purposes
- Build processes for each package
- Dependency management
- Package interdependencies
- Component registry system
- Development workflows
- Contributing guidelines

**Output Style:** Technical, structural, with ASCII diagrams where helpful

### 6. Advanced Topics & Integration Guide
**File:** `advanced-topics-guide.md`

Generates advanced documentation covering:
- Troubleshooting and FAQ
- Advanced customization techniques
- Framework integration guides (Next.js, Vite, etc.)
- Component extension patterns
- Performance optimization
- SSR and deployment patterns
- Type safety in depth
- Accessibility advanced topics
- Testing strategies

**Output Style:** Problem-solution format, step-by-step guides, with verification

## How to Use These Skills

### For Documentation Writers/Generators

Each skill is designed to be used as a prompt for Claude (via any Claude Code interface) to generate documentation. Here's the general workflow:

1. **Choose the appropriate skill** based on what documentation you need
2. **Use the skill as context** when asking Claude to generate documentation
3. **Review and refine** the generated documentation
4. **Publish** the documentation in your docs site

### Example Usage

```
# Generate overview documentation
"Use the overview-guide skill to generate a getting started guide for new UI Lab users"

# Generate styling documentation
"Using the styling-guide skill, create comprehensive documentation about the CSS variable system"

# Generate CLI documentation
"Create CLI command reference documentation using the cli-usage-guide skill"
```

### Integration with Documentation Site

These skills can be used to:
- Generate new documentation pages for `/apps/site/content/docs/`
- Create comprehensive guides for developers
- Ensure documentation accuracy against actual codebase
- Maintain consistency in documentation structure
- Cover all important topics systematically

## Key Principles

All skills follow these principles to ensure high-quality documentation:

### Accuracy
- Verify all information against actual source code
- Reference real file paths and configuration
- Include correct command syntax and options
- Test code examples before inclusion

### Clarity
- Use clear hierarchical structure
- Explain concepts before diving into details
- Provide concrete examples
- Include visual diagrams where helpful

### Completeness
- Cover all relevant scenarios
- Include both basic and advanced topics
- Provide step-by-step instructions
- Include troubleshooting sections

### Developer Focus
- Write for the target audience (component users, contributors)
- Provide copy-paste ready code examples
- Include real-world use cases
- Explain the "why" not just the "what"

### Accessibility
- Accessible documentation is important
- Include alt text for any diagrams
- Use clear language and avoid jargon
- Provide multiple ways to learn (text, examples, diagrams)

## Quality Checklist for Generated Documentation

When using these skills to generate documentation, verify:

- ✅ All code examples are accurate and tested
- ✅ Command syntax matches actual CLI tool
- ✅ File paths and imports are correct
- ✅ Package names and versions are accurate
- ✅ Heading hierarchy is consistent
- ✅ No broken internal references
- ✅ Examples work copy-paste
- ✅ All claims are verifiable from source
- ✅ Accessibility considerations included
- ✅ No component-level documentation (project-level only)

## Topics Covered

### Overview & Getting Started
✅ Project features
✅ Installation
✅ Quick start
✅ Basic usage
✅ Technology stack

### Styling & CSS
✅ CSS Module patterns
✅ CSS variable system
✅ Semantic colors
✅ Typography scales
✅ Theme customization

### CLI Tool
✅ Command reference
✅ Installation commands
✅ Configuration options
✅ Interactive prompts
✅ Headless modes

### Best Practices
✅ Component usage
✅ Accessibility
✅ Type safety
✅ Performance
✅ Testing

### Architecture
✅ Monorepo structure
✅ Package descriptions
✅ Build processes
✅ Development workflows
✅ Contributing

### Advanced Topics
✅ Troubleshooting
✅ Framework integration
✅ Advanced customization
✅ SSR patterns
✅ Performance optimization

## Structure of Each Skill

Each skill document includes:

1. **Purpose** - What the skill generates
2. **Responsibilities** - What topics it covers
3. **Output Requirements** - Quality standards
4. **Key Topics to Cover** - Detailed topic list
5. **Quality Checklist** - Verification items

## Notes for Documentation Generators

- These skills focus on **project-level documentation**, not individual component documentation
- Each skill is independent and can be used separately
- Skills complement each other but can be used in any order
- Use the skills as reference guides when generating documentation
- Always verify information against the actual codebase before publishing
- Test code examples to ensure they work

## Future Documentation Needs

As the UI Lab project evolves, consider generating documentation for:
- New component patterns as they're added
- Updated CLI features
- New styling capabilities
- Performance optimization techniques
- New integration patterns
- Updated deployment strategies

## Contact & Updates

If documentation standards change or new topics emerge:
1. Update the relevant skill file
2. Add new quality checkpoints if needed
3. Update this README with new topics
4. Document changes for future reference
