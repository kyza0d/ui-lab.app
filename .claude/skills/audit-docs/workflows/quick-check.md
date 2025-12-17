# Quick Check Workflow

<objective>
Provide fast, targeted feedback on specific documentation concerns without comprehensive audit.
</objective>

<process>
## Step 1: Clarify Focus

Ask the user what they want to check:
- "What's your main concern about this documentation?"
- "What would you like me to focus on?"

Common quick check requests:
- **Fluff check**: "Is this too wordy?"
- **Clarity check**: "Is this clear?"
- **Structure check**: "Is this well-organized?"
- **Purpose check**: "Does this serve a purpose?"
- **Redundancy check**: "Am I repeating myself?"

If no specific focus is provided, check for the most common issues.

## Step 2: Read Documentation

Read the documentation with the specific focus in mind.

## Step 3: Perform Targeted Analysis

Based on the focus area, apply the appropriate quick check:

### Fluff Check
Scan for:
- Filler words ("basically", "simply", "actually", "just")
- Redundant phrases ("in order to", "due to the fact that")
- Throat-clearing ("It should be noted that", "It is important to understand")
- Unnecessary qualifiers ("very", "really", "quite")
- Obvious statements that add no value

**Output**: List specific examples with suggested cuts and estimated word savings.

### Clarity Check
Look for:
- Overly complex sentences (30+ words)
- Passive voice when active is clearer
- Jargon without explanation
- Ambiguous pronouns ("it", "this", "that" without clear reference)
- Missing context or assumptions

**Output**: Flag unclear passages and suggest clearer alternatives.

### Structure Check
Evaluate:
- Heading hierarchy (logical nesting, no skipped levels)
- Section separators (are major topics separated with `---`?)
- Content grouping (is related info together?)
- Logical flow (does order make sense?)
- Scannability (can you find info quickly?)

**Output**: List structure issues and suggest specific organizational improvements.

### Purpose Check
For each section, identify:
- What is this trying to accomplish?
- Does it succeed?
- Is this necessary?
- Could it be merged elsewhere?

**Output**: Rating for each section (Clear purpose / Unclear purpose / No discernible purpose) with recommendations.

### Redundancy Check
Scan for:
- Duplicate explanations
- Repeated examples
- Same information in multiple sections
- Unnecessary cross-section repetition

**Output**: List redundant content with consolidation suggestions.

## Step 4: Provide Quick Feedback

Format response based on check type:

### For Single Focus
```
## [Check Type] Results

**Status**: [Pass / Minor Issues / Needs Work / Major Issues]

### Issues Found
1. [Issue with location]
   - **Problem**: [what's wrong]
   - **Fix**: [what to do]
   - **Impact**: [why it matters]

2. [Issue with location]
   - **Problem**: [what's wrong]
   - **Fix**: [what to do]
   - **Impact**: [why it matters]

### Quick Wins
- [immediate fix]
- [immediate fix]

### Verdict
[Overall assessment in 1-2 sentences]
```

### For General Quick Check
```
## Quick Check Results

**Overall**: [Good / Needs minor work / Needs significant work]

### Top Issues (Priority Order)
1. [Issue type]: [specific problem and location]
2. [Issue type]: [specific problem and location]
3. [Issue type]: [specific problem and location]

### Quick Fixes
- [specific action] → [benefit]
- [specific action] → [benefit]

### Recommendation
[Should you refine this? Focus areas?]
```

## Step 5: Offer Follow-Up

Based on findings, suggest:
- "Would you like me to fix these issues?"
- "Should I perform a full audit?"
- "Want to see a refined version?"
- "Need more detail on any issue?"
</process>

<quick_check_patterns>
## Common Issue Patterns

### Fluff Patterns
- "In order to [verb]" → "To [verb]"
- "It is important to note that" → [delete]
- "Basically, X is Y" → "X is Y"
- "Simply [verb]" → "[verb]"
- "Just [verb]" → "[verb]"
- "Due to the fact that" → "Because"
- "At this point in time" → "Now"

### Clarity Red Flags
- Sentences over 30 words
- Multiple clauses with "which" or "that"
- Starting with "There is/are" or "It is"
- Passive voice in action-oriented content
- Technical terms not defined on first use

### Structure Red Flags
- Large blocks of text without breaks
- Missing separators between distinct topics
- Headings that aren't descriptive
- Illogical ordering (jumping between concepts)
- No visual hierarchy

### Purpose Red Flags
- Sections that restate the heading
- "Introduction" that doesn't introduce anything
- Content that's too obvious for audience
- Information better suited elsewhere

### Redundancy Red Flags
- Same concept explained multiple times
- Examples that demonstrate identical points
- Prerequisite info repeated in every section
- Multiple "getting started" sections
</quick_check_patterns>

<success_criteria>
Quick check is complete when:
- Specific issues are identified with locations
- Clear, actionable fixes are suggested
- User understands priority and impact
- Appropriate next steps are offered
- User can immediately act on feedback
</success_criteria>
