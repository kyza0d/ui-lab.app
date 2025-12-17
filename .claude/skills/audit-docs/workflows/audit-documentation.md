# Audit Documentation Workflow

<objective>
Perform comprehensive evaluation of documentation quality, identifying strengths, weaknesses, and specific improvement opportunities.
</objective>

<required_reading>
- references/evaluation-criteria.md
- references/common-issues.md
</required_reading>

<process>
## Step 1: Read Documentation

Read the entire documentation file(s) provided by the user.

## Step 2: Apply Evaluation Framework

For each major section, evaluate:

### Helpfulness Assessment
- **Question**: Is this helpful for the user?
- **Evidence**: Quote specific examples
- **Rating**: Helpful / Somewhat helpful / Not helpful
- **Reasoning**: Why did you give this rating?

### Clarity & Brevity Assessment
- **Question**: Is this fluff that can be optimized?
- **Evidence**: Identify verbose passages
- **Suggested cuts**: What can be removed or shortened?
- **Potential savings**: Estimate word count reduction

### Purpose Assessment
- **Question**: Does this content serve a clear purpose?
- **Current purpose**: What is it trying to do?
- **Effectiveness**: Does it achieve that purpose?
- **Recommendation**: Keep as-is / Revise / Remove / Relocate

### Redundancy Assessment
- **Question**: Are there redundancies that can be eliminated?
- **Duplicated content**: List repeated information
- **Recommendation**: Consolidate / Keep / Remove duplicates

## Step 3: Structural Analysis

Evaluate organization and formatting:

### Current Structure
- List the major sections and their hierarchy
- Note the use of separators and visual elements

### Structure Issues
- Missing separators between distinct topics
- Poor heading hierarchy
- Lack of visual organization
- Information in illogical order

### Structure Recommendations
- Where to add `---` separators
- Suggested reordering of content
- Better heading structure

## Step 4: Generate Audit Report

Create a comprehensive report with:

### Executive Summary
- Overall quality rating (Excellent / Good / Needs improvement / Poor)
- Top 3 strengths
- Top 3 areas for improvement
- Estimated effort to refine (Low / Medium / High)

### Detailed Findings

For each section of the documentation, provide:
- Section name and current purpose
- Helpfulness rating with evidence
- Clarity/brevity issues with specific examples
- Redundancy findings
- Structure recommendations

### Prioritized Recommendations

List improvements in priority order:
1. **Critical**: Must fix (major clarity issues, missing information, broken structure)
2. **High**: Should fix (significant verbosity, redundancy, poor organization)
3. **Medium**: Nice to have (minor improvements, polish)
4. **Low**: Optional (style preferences, minor tweaks)

### Quick Wins

Identify 3-5 easy improvements that can be made immediately:
- Specific word/phrase removals
- Simple structural additions (separators, headings)
- Quick consolidations

## Step 5: Offer Next Steps

Ask the user:
- "Would you like me to refine this documentation based on these findings?"
- "Would you like me to focus on specific sections?"
- "Would you like more detail on any particular issue?"
</process>

<output_template>
# Documentation Audit Report

**File**: [filename]
**Date**: [date]
**Overall Rating**: [rating]

---

## Executive Summary

### Strengths
1. [strength]
2. [strength]
3. [strength]

### Areas for Improvement
1. [issue]
2. [issue]
3. [issue]

**Estimated Refinement Effort**: [Low/Medium/High]

---

## Detailed Findings

### Section: [Section Name]

**Current Purpose**: [what this section tries to do]

**Helpfulness**: [Helpful/Somewhat helpful/Not helpful]
- Evidence: [quote or description]
- Reasoning: [why]

**Clarity & Brevity**: [assessment]
- Verbose passages: [examples]
- Suggested cuts: [what to remove]
- Potential savings: ~[X] words

**Purpose Assessment**: [Keep/Revise/Remove/Relocate]
- Effectiveness: [how well it achieves its purpose]
- Recommendation: [what to do]

**Redundancy**: [None/Minor/Significant]
- Duplicated content: [examples]
- Recommendation: [consolidation approach]

**Structure Issues**:
- [issue 1]
- [issue 2]

---

[Repeat for each section]

---

## Prioritized Recommendations

### Critical (Must Fix)
1. [recommendation with specific location]
2. [recommendation with specific location]

### High Priority (Should Fix)
1. [recommendation]
2. [recommendation]

### Medium Priority (Nice to Have)
1. [recommendation]
2. [recommendation]

### Low Priority (Optional)
1. [recommendation]
2. [recommendation]

---

## Quick Wins

These can be implemented immediately:

1. **[Action]**: [specific change] → [benefit]
2. **[Action]**: [specific change] → [benefit]
3. **[Action]**: [specific change] → [benefit]

---

## Next Steps

Would you like me to:
1. Refine this documentation based on these findings?
2. Focus on specific sections for refinement?
3. Provide more detail on any particular issue?
</output_template>

<success_criteria>
Audit is complete when:
- Every major section has been evaluated against all four criteria
- Specific evidence is provided for each assessment
- Recommendations are concrete and actionable
- Priorities are clearly identified
- User understands what needs to be done and why
</success_criteria>
