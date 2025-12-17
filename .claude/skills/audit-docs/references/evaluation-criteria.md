# Documentation Evaluation Criteria

## The Four Core Questions

Every piece of documentation should be evaluated against these fundamental questions:

### 1. Is this helpful for the user?

**What this means:**
- Does this information solve a real problem?
- Will users actually use this?
- Does it answer questions users have?
- Does it enable users to accomplish their goals?

**Signs of helpful content:**
- Addresses common pain points
- Provides practical, actionable information
- Includes relevant examples
- Saves users time and frustration
- Anticipates user questions

**Signs of unhelpful content:**
- Obvious information that users already know
- Information users don't need for their tasks
- Content that serves writer's needs, not reader's
- Missing the information users actually want
- Too theoretical without practical application

**How to evaluate:**
1. Identify the intended user and their goal
2. Ask: "Does this help them achieve that goal?"
3. Consider: "Would I want to read this if I were the user?"
4. Test: "Can users act on this information?"

---

## 2. Is this fluff that can be optimized?

**What this means:**
- Can this be said in fewer words?
- Does every word earn its place?
- Is there unnecessary elaboration?
- Are there redundant phrases?

**Common fluff patterns:**

### Filler Words
- basically, simply, easily, just, actually, really, very, quite
- clearly, obviously, of course, naturally
- generally, typically, usually (when not adding meaning)

### Redundant Phrases
- "in order to" → "to"
- "due to the fact that" → "because"
- "at this point in time" → "now"
- "for the purpose of" → "to"
- "in the event that" → "if"
- "with regard to" → "about"
- "take into consideration" → "consider"

### Throat-Clearing
- "It should be noted that..."
- "It is important to understand that..."
- "Before we begin, let me explain..."
- "As you can see..."
- "Let's take a look at..."

### Unnecessary Qualifiers
- "might possibly"
- "could potentially"
- "may or may not"
- "more or less"

### Weak Constructions
- "There is/are..." (often passive)
- "It is..." (often vague)
- "You can..." (when describing required action)

**How to evaluate:**
1. Read each sentence and try removing words
2. If meaning stays intact, mark word for removal
3. Look for patterns from the list above
4. Count how many words could be cut
5. Ensure cuts don't harm clarity

**Optimization principles:**
- One idea per sentence
- Active voice over passive
- Concrete over abstract
- Specific over general
- Short words over long words

---

## 3. Does this content serve a clear purpose?

**What this means:**
- Why does this section exist?
- What question does it answer?
- What user need does it fulfill?
- How does it fit in the overall documentation?

**Valid purposes:**
- **Orientation**: Helps users understand what something is and why it matters
- **Instruction**: Teaches users how to do something
- **Reference**: Provides detailed specifications for lookup
- **Explanation**: Clarifies complex concepts or decisions
- **Troubleshooting**: Helps users solve problems
- **Examples**: Demonstrates usage in context

**Signs of clear purpose:**
- Section could be titled with a specific question
- Removing it would leave a gap in documentation
- Content stays focused on one topic/goal
- User would look for this information

**Signs of unclear purpose:**
- Section seems to exist "because documentation should have it"
- Content is a grab bag of loosely related information
- Overlaps heavily with other sections
- Could be removed without users noticing
- Generic headings like "Overview" or "Miscellaneous"

**How to evaluate:**
1. For each section, complete: "This section exists to help users [verb] [object]"
2. If you can't complete it clearly, purpose is unclear
3. Check if the content actually fulfills that purpose
4. Consider if this purpose is necessary

**Decision framework:**
- **Clear, necessary purpose**: Keep and ensure content matches purpose
- **Clear, unnecessary purpose**: Consider removing or merging
- **Unclear purpose but useful content**: Reframe with clear purpose
- **Unclear purpose, questionable content**: Strong candidate for removal

---

## 4. Are there redundancies that can be eliminated?

**What this means:**
- Is information repeated across sections?
- Are there duplicate examples?
- Is the same concept explained multiple times?
- Could multiple sections be consolidated?

**Types of redundancy:**

### Exact Duplication
- Same information appears in multiple places verbatim
- Copy-pasted content across sections
- Repeated prerequisite information

**Solution**: Keep best instance, link to it from other locations

### Partial Duplication
- Similar information explained differently in multiple places
- Overlapping examples
- Related concepts separated and partially repeated

**Solution**: Consolidate into comprehensive treatment, remove partial versions

### Unnecessary Repetition
- Restating what was just said
- Summarizing right after detailed explanation
- Repeating heading text in first sentence

**Solution**: Remove repetition, trust users to remember recent content

### Structural Redundancy
- Multiple "getting started" sections
- Several "overview" sections
- Redundant table of contents / summaries

**Solution**: Single, clear navigation structure

**When repetition is valid:**
- Different audiences need same info (then clearly separate)
- Critical safety or security information
- Quick reference after detailed explanation (intentional)
- Examples showing variations on a concept

**How to evaluate:**
1. Create outline of main concepts covered
2. Note where each concept appears
3. Identify concepts appearing 2+ times
4. For each repetition, determine: necessary or redundant?
5. Plan consolidation strategy

**Consolidation approaches:**
- **Single source of truth**: One comprehensive explanation with links
- **DRY principle**: Don't Repeat Yourself - extract common content
- **Progressive disclosure**: Brief mention with link to details
- **Cross-references**: Point to other sections instead of repeating

---

## Rating Scale

Use this scale when evaluating documentation:

### Helpfulness
- **5 - Extremely Helpful**: Essential information, perfectly targeted, high utility
- **4 - Very Helpful**: Valuable information, well-targeted, clear utility
- **3 - Helpful**: Useful information, generally relevant, some utility
- **2 - Somewhat Helpful**: Marginal value, unclear relevance, limited utility
- **1 - Not Helpful**: No value, irrelevant, or misleading

### Clarity & Brevity
- **5 - Excellent**: Concise, clear, no wasted words
- **4 - Good**: Mostly concise, minor verbosity
- **3 - Acceptable**: Some fluff, could be tighter
- **2 - Needs Work**: Significant verbosity, clarity issues
- **1 - Poor**: Extremely wordy, unclear, major issues

### Purpose
- **5 - Crystal Clear**: Obvious purpose, perfectly executed
- **4 - Clear**: Identifiable purpose, well-executed
- **3 - Somewhat Clear**: Purpose exists but not focused
- **2 - Unclear**: Vague or multiple purposes
- **1 - No Purpose**: No identifiable purpose

### Redundancy
- **5 - No Redundancy**: Completely unique content
- **4 - Minimal**: Trivial overlap, intentional repetition
- **3 - Some**: Noticeable overlap, some consolidation possible
- **2 - Significant**: Major duplication, consolidation needed
- **1 - Severe**: Extensive duplication, major consolidation required

---

## Evaluation Process

### Step-by-Step Evaluation

1. **Read completely first**: Don't evaluate while reading the first time
2. **Identify sections**: Break documentation into logical sections
3. **Evaluate each section**: Apply all four criteria to each section
4. **Provide evidence**: Quote specific examples for each assessment
5. **Quantify issues**: Count words that could be cut, duplications found
6. **Prioritize findings**: Not all issues are equally important
7. **Make recommendations**: Be specific and actionable

### Evidence-Based Assessment

Always provide concrete evidence:
- **Quote specific passages** that demonstrate issues
- **Count measurable items** (words to cut, duplications, etc.)
- **Show alternatives** (verbose version → concise version)
- **Reference specific locations** (section names, line numbers)

### Balanced Evaluation

- Acknowledge both strengths and weaknesses
- Prioritize user impact over perfection
- Consider documentation's context and audience
- Balance thoroughness with practicality
- Recognize when "good enough" is appropriate
