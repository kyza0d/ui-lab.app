# Refine Documentation Workflow

<objective>
Apply improvements to documentation by removing fluff, organizing content into logical sections, improving structure, and ensuring clarity and helpfulness.
</objective>

<required_reading>
- references/evaluation-criteria.md
- references/refinement-techniques.md
</required_reading>

<process>
## Step 1: Read Current Documentation

Read the documentation file(s) to be refined.

If an audit has already been performed, review the audit findings.

## Step 2: Plan Refinement Strategy

Determine the refinement approach:

### Quick Refinement (no prior audit)
1. Identify obvious fluff and verbosity
2. Look for missing structure (separators, headings)
3. Check for redundancy
4. Make improvements inline

### Guided Refinement (with prior audit)
1. Review audit recommendations
2. Confirm which changes to apply
3. Work through priorities (Critical → High → Medium → Low)

### Ask User for Guidance
"I can refine this documentation by:
- Removing verbose content and fluff
- Adding structural separators and better organization
- Consolidating redundant information
- Improving clarity

Would you like me to:
1. Apply all improvements
2. Focus on specific sections
3. Show you a preview before/after for review"

## Step 3: Apply Content Improvements

### Remove Fluff
- Delete unnecessary filler words ("basically", "simply", "just", "actually")
- Cut redundant phrases ("in order to" → "to")
- Eliminate throat-clearing introductions
- Remove obvious statements that add no value

### Improve Clarity
- Replace complex phrases with simple alternatives
- Break up long sentences
- Use active voice instead of passive
- Make implicit information explicit where helpful

### Consolidate Redundancy
- Merge duplicate information
- Create single source of truth for repeated concepts
- Add cross-references instead of repetition
- Keep only the best explanation when multiple exist

### Enhance Helpfulness
- Add missing context where needed
- Include practical examples
- Remove content that doesn't serve user needs
- Focus on actionable information

## Step 4: Apply Structural Improvements

### Add Section Separators
Place `---` between:
- Major topic changes
- Different types of content (conceptual vs. reference)
- Distinct user tasks or workflows
- Introduction and main content

### Improve Heading Hierarchy
- Ensure logical nesting (don't skip levels)
- Use descriptive, scannable headings
- Make headings parallel in structure
- Remove redundant heading text

### Organize Content Logically
Common effective patterns:
1. **Getting Started Pattern**: Introduction → Installation → Quick Start → Core Concepts
2. **Reference Pattern**: Overview → API/Commands → Examples → Advanced Topics
3. **Tutorial Pattern**: What You'll Build → Prerequisites → Step-by-Step → Next Steps
4. **Concept Pattern**: What/Why → How → When to Use → Examples

### Enhance Scannability
- Use bullet lists for multiple items
- Add code blocks for technical content
- Use bold for important terms (sparingly)
- Ensure adequate whitespace

## Step 5: Validate Improvements

Before presenting the refined version, check:

### Quality Gates
- [ ] Word count reduced without losing meaning
- [ ] Each section has a clear purpose
- [ ] No redundant information remains
- [ ] Structure aids navigation and comprehension
- [ ] Content is more helpful than before

### Preservation Check
- [ ] No critical information was removed
- [ ] Technical accuracy maintained
- [ ] Tone/voice is consistent
- [ ] Examples and code snippets are intact

## Step 6: Present Refined Documentation

### Show Changes Summary
Provide a brief summary:
- Original word count vs. refined word count
- Major structural changes made
- Key content improvements
- Sections removed/consolidated/added

### Offer Comparison Options
Ask if user wants to see:
1. Full refined version only
2. Side-by-side comparison (original vs. refined)
3. Diff-style changes (what was removed/added)
4. Specific sections highlighted

### Provide Refined Documentation
Present the improved documentation with clear section separators and organization.

## Step 7: Iterate if Needed

Ask the user:
- "Does this refinement meet your needs?"
- "Would you like me to adjust any sections?"
- "Should I be more or less aggressive with cuts?"
- "Are there specific areas that need more work?"

Make adjustments based on feedback.
</process>

<refinement_checklist>
Use this to ensure thorough refinement:

## Content Quality
- [ ] Removed unnecessary filler words and phrases
- [ ] Eliminated redundant information
- [ ] Cut throat-clearing and fluff
- [ ] Improved sentence clarity and brevity
- [ ] Enhanced helpfulness with context/examples
- [ ] Removed unhelpful or obvious content

## Structure & Organization
- [ ] Added `---` separators between major sections
- [ ] Improved heading hierarchy
- [ ] Organized content in logical flow
- [ ] Enhanced scannability with lists/formatting
- [ ] Added adequate whitespace

## Purpose & Value
- [ ] Every section serves a clear purpose
- [ ] Content addresses user needs
- [ ] Information is actionable
- [ ] Examples are practical and relevant

## Technical Accuracy
- [ ] No information loss during cuts
- [ ] Code examples are correct
- [ ] Technical details are preserved
- [ ] Links and references work
</refinement_checklist>

<output_format>
## Refinement Summary

**Original**: [X] words, [Y] sections
**Refined**: [X] words, [Y] sections
**Reduction**: [%] decrease

### Major Changes
- [change description]
- [change description]
- [change description]

---

## Refined Documentation

[The actual refined documentation content with proper structure and separators]

---

## Notes
- [Any important notes about changes made]
- [Suggestions for future improvements]
- [Areas that may need subject matter expert review]
</output_format>

<success_criteria>
Refinement is successful when:
- Documentation is measurably more concise
- Structure clearly improves navigation and comprehension
- Each section has an identifiable purpose
- Redundancy has been eliminated
- Content is more helpful to the intended audience
- User is satisfied with the improvements
</success_criteria>
