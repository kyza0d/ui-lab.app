# Documentation Audit Framework: Integrating Diataxis and Jacobian Principles

## Executive Summary

This framework combines two complementary approaches to documentation excellence:

- **Diataxis** provides the structural blueprint: recognizing that documentation must serve four distinct user needs (Tutorials, How-to Guides, Explanations, and Reference)
- **Jacobian Principles** (Kaplan-Moss) provide the execution framework: clear writing, editorial rigor, online optimization, and process integration

Together, they form a comprehensive audit system for evaluating and improving documentation quality. This framework enables documentation teams to:
1. Identify what documentation should exist and in what form
2. Evaluate how well each piece serves its intended purpose
3. Assess writing quality and clarity
4. Recognize and eliminate common anti-patterns
5. Plan systematic improvements with clear priorities

The result: documentation that is structurally sound, well-written, kept current, and genuinely useful to users.

---

## Framework Overview: How Diataxis and Jacobian Principles Integrate

### The Complementary Nature

**Diataxis answers: "What should our documentation structure be?"**
- Provides a theoretical framework for organizing documentation
- Identifies four mathematically complete documentation modes
- Clarifies purpose and audience for each documentation type
- Prevents mixing of purposes that confuses users

**Jacobian Principles answer: "How do we write excellent documentation?"**
- Emphasizes the execution quality: writing skill, clarity, readability
- Addresses audience diversity and appropriate formatting
- Establishes editorial and maintenance practices
- Integrates documentation into development workflow

### Where They Reinforce Each Other

| Aspect | Diataxis | Jacobian | Integrated Benefit |
|--------|----------|----------|-------------------|
| **Purpose Clarity** | Four distinct modes | Different audience needs | Users find exactly what they need in the form they need it |
| **Structure** | Mathematical completeness | Organized for scanning | Both structure and format serve user needs |
| **Quality Foundation** | Functional quality (accuracy, consistency) | Writing fundamentals | Clear, consistent, correct documentation |
| **User Experience** | Four modes prevent confusion | Readable, navigable prose | Documentation feels good to use |
| **Maintenance** | Clear mode distinctions | Version with code, test | Documentation stays current and accurate |
| **Audience Awareness** | Separates learning from working | Different skill levels need different formats | Multiple formats meet diverse audience needs |

---

## The Four Audit Dimensions

Documentation quality emerges from four interdependent dimensions. Each requires assessment, and together they determine whether documentation truly serves users.

### Dimension 1: Structure & Organization

**What it addresses:** Does the documentation follow the Diataxis framework? Is content placed in the appropriate mode?

#### What to Look For: Structural Soundness

1. **Mode Clarity: Each piece has a single, clear purpose**
   - Tutorials teach foundational skills through doing
   - How-to guides solve specific problems for competent users
   - Explanations deepen conceptual understanding
   - Reference documents provide authoritative facts
   - No piece tries to serve multiple purposes simultaneously

2. **Completeness Across Modes**
   - Tutorials exist for getting started
   - How-to guides cover common tasks
   - Explanations cover major concepts and design decisions
   - Reference documentation covers all major features
   - No critical mode is entirely missing

3. **Internal Consistency Within Modes**
   - All tutorials follow similar pedagogical patterns
   - All how-to guides use consistent goal-focused structure
   - All reference entries follow parallel organization
   - All explanations use similar discussion depth and scope

4. **Cross-Mode Linking**
   - Tutorials point to how-to guides and explanations
   - How-to guides link to reference for details
   - Reference links to how-to guides for context
   - Explanations reference other explanations for concepts
   - Links feel natural, not arbitrary

#### Red Flags: Structural Anti-Patterns

| Anti-Pattern | What It Looks Like | Why It's a Problem | How to Fix |
|--------------|-------------------|-------------------|-----------|
| **Tutorial-Reference Hybrid** | Tutorials that include comprehensive API details | Learners overwhelmed by irrelevant options; reference users can't find information | Separate into two docs: focused tutorial + detailed reference section |
| **Bloated How-To Guide** | How-to that explains concepts before giving steps | Experienced users frustrated by unnecessary explanation | Remove conceptual material; assume competence or link to explanation |
| **Instructions in Reference** | API reference that says "how to use this function" | Inconsistent structure; users can't locate simple facts | Rewrite reference as pure description; move instructions to how-to |
| **Missing Explanation** | Only reference, how-to, and tutorial docs exist | Users have facts and procedures but no understanding | Add explanation docs showing relationships and design reasoning |
| **Wrong Audience** | Documentation assumes wrong skill level | Users with needed competency frustrated; learners overwhelmed | Identify actual audience; separate by skill level if needed |
| **Mode Confusion** | Multiple purposes in single document | Serves none of them well; users can't find what they need | Break into separate pieces, each with single purpose |

#### Evaluation Questions

- [ ] Can you clearly identify which Diataxis mode each piece of documentation belongs to?
- [ ] Does the distribution across modes make sense for the product (you won't always need all four)?
- [ ] Does each piece serve only one purpose, or does it try to be multiple things?
- [ ] Are tutorials actually pedagogical, or do they assume background knowledge?
- [ ] Are how-to guides focused on specific goals, or do they teach concepts?
- [ ] Does reference documentation describe or instruct?
- [ ] Is there at least one good explanation document, or are all four modes purely task-focused?

---

### Dimension 2: Quality & Clarity

**What it addresses:** Within each mode, is the writing clear, well-structured, and appropriately targeted to the audience?

#### What to Look For: Writing Excellence

1. **Clarity and Precision**
   - Sentences are clear and unambiguous
   - Technical terms are defined before use or linked to definitions
   - Active voice is used liberally; passive voice is rare and justified
   - Jargon is minimized; when necessary, it's explained
   - The reader is made the subject of sentences when possible

2. **Online Reading Optimization**
   - Paragraphs are short (5-6 sentences maximum)
   - Headers are used as stopping points and navigation aids
   - Lists and tables break up dense information
   - Code blocks and examples highlight concrete information
   - Emphasis (bold, italics) guides the eye without overuse
   - Conversational tone with contractions ("don't" not "do not")
   - Personal voice where appropriate ("I recommend...")

3. **Audience Appropriateness**
   - Tutorials assume learners, not experts
   - How-to guides assume competence; don't over-explain basics
   - Explanations provide sufficient context for newcomers
   - Reference material is austere and neutral, not promotional
   - Skill level assumptions are explicit or can be inferred from context

4. **Pedagogical Quality (in tutorials)**
   - Shows the destination upfront
   - Delivers visible results early and often
   - Points out key observations learners should notice
   - Minimizes alternatives to avoid cognitive overload
   - Uses first-person plural language ("We will...")
   - Focuses on concrete actions over explanation

5. **Goal-Focused Writing (in how-to guides)**
   - States goal clearly and immediately
   - Provides only necessary steps
   - Assumes reader already knows the basics
   - Uses "How to [specific goal]" titles
   - Makes decisive choices; doesn't present alternatives
   - Includes edge cases when relevant

#### Red Flags: Writing Quality Issues

| Issue | Example | Impact | Solution |
|-------|---------|--------|----------|
| **Dense Paragraphs** | 12-sentence paragraphs with no visual breaks | Exhausting to read; hard to scan | Break into smaller chunks with headers and lists |
| **Vague Language** | "This might be useful in some cases" | Unclear what applies to which situation | Use specifics: "This approach works when X; use Y when Z" |
| **Over-Explanation** | Tutorial spending two paragraphs explaining WHY before showing WHAT | Loses learners; obscures learning objective | Show concrete action; save explanation for explanation docs |
| **Jargon Without Definition** | Uses "idempotent" without defining it | New users lost; reference users interrupted | Define on first use or link to definition |
| **Passive Voice** | "Errors are generated when..." vs "The system generates errors when..." | Unclear who does what; less engaging | Make reader/system the subject of sentence |
| **Inconsistent Terminology** | Same concept called "filter," "selector," and "query" | Confusing; readers think they're different things | Use same term consistently; establish style guide |
| **Untested Examples** | Code samples don't actually run | Frustrating; damages credibility | Test all examples; include version numbers |
| **No Structure for Scanning** | Solid wall of text with no headers | Readers can't skim or navigate | Add headers, lists, and visual breaks |

#### Evaluation Questions

- [ ] Can someone unfamiliar with this topic understand it easily?
- [ ] Are paragraphs short enough to scan online (5-6 sentences max)?
- [ ] Does the writing use active voice with the reader as subject?
- [ ] Are technical terms defined or linked to definitions?
- [ ] Is the tone conversational and human, or robotic and formal?
- [ ] Do all code examples actually work when tested?
- [ ] Is consistency maintained across terminology, voice, and formatting?
- [ ] Have non-expert readers reviewed this for clarity?
- [ ] Are visual elements (lists, headers, emphasis) used effectively for scanning?

---

### Dimension 3: Completeness

**What it addresses:** Does documentation cover what users actually need to know? Are there critical gaps?

#### What to Look For: Comprehensive Coverage

1. **Feature Coverage**
   - All major features have at least some documentation
   - Common use cases have how-to guides
   - Architecture and design are explained
   - Configuration options are documented
   - Error messages and troubleshooting are addressed

2. **User Journey Coverage**
   - Getting started is covered (tutorial or quick start)
   - Intermediate tasks are addressed (how-to guides)
   - Advanced concepts are explained (explanation docs)
   - Reference documentation exists for precise lookup
   - Clear progression path from beginner to advanced

3. **Edge Cases and Gotchas**
   - Common mistakes are anticipated
   - Edge cases and limits are documented
   - Known issues and workarounds are listed
   - Compatibility information is clear
   - Performance implications are noted where relevant

4. **Context and Meta-Documentation**
   - Overview of what documentation exists and where to find it
   - Clear guidance on "where do I start"
   - Versioning information is clear
   - Breaking changes are documented
   - Upgrade guides exist where needed

#### Completeness Checklist by Mode

**For Tutorials:**
- [ ] Getting started guide exists
- [ ] Demonstrates "first success" within 30 minutes
- [ ] Shows the system's core capabilities
- [ ] Has clear, achievable goals
- [ ] Works reliably in target environments

**For How-To Guides:**
- [ ] Covers common tasks users want to do
- [ ] Each guide solves one specific problem
- [ ] Includes real-world scenarios (not just happy path)
- [ ] Acknowledges edge cases and alternatives
- [ ] Clear titles in "How to [accomplish X]" format

**For Explanations:**
- [ ] Design decisions are explained
- [ ] Historical context and evolution documented
- [ ] Architectural overview provided
- [ ] Major concepts are deeply explained
- [ ] Relationships between components are clear

**For Reference:**
- [ ] All public APIs/commands documented
- [ ] Parameters and return values specified
- [ ] Error codes and exceptions listed
- [ ] Options and configuration detailed
- [ ] Examples provided for complex entries

#### Gaps to Identify

1. **Critical gaps:** Missing documentation for major features
2. **Audience gaps:** No documentation at certain skill levels
3. **Use case gaps:** Common scenarios aren't documented
4. **Conceptual gaps:** No explanations for why things work
5. **Integration gaps:** How to use multiple features together isn't documented

#### Evaluation Questions

- [ ] What would a new user need to know to get productive?
- [ ] Are the most common use cases documented?
- [ ] Are there features in the code with no documentation?
- [ ] Can someone accomplish basic tasks without external help?
- [ ] Are there explanations for design decisions and constraints?
- [ ] Is the progression from beginner to advanced documentation clear?
- [ ] Are there known gotchas that aren't documented?
- [ ] Is there a clear map of what documentation exists?

---

### Dimension 4: Maintainability

**What it addresses:** Will documentation stay accurate and useful as the product evolves? Is the process sustainable?

#### What to Look For: Sustainable Documentation

1. **Version Control and Storage**
   - Documentation lives in the project repository
   - Documentation is versioned with code
   - It's easy to find which docs apply to which version
   - Documentation history is preserved in version control
   - Breaking changes are documented per version

2. **Accuracy and Currency**
   - Examples are tested and work correctly
   - Examples match current API versions
   - Screenshots are current (if used)
   - Tutorials actually work when followed
   - Documentation hasn't drifted from actual behavior
   - Last update date is visible (if relevant)

3. **Process Integration**
   - Documentation is updated when features change
   - There's a clear process for documentation updates
   - Documentation review is part of code review
   - Documentation bugs are tracked like code bugs
   - Documentation testing is automated where possible
   - Release process includes documentation review

4. **Ownership and Accountability**
   - Someone is responsible for overall documentation quality
   - Contributors know who to ask about documentation
   - There's a documented style guide
   - Writing standards are maintained
   - Editorial review happens before release

5. **Changeability**
   - Structure makes it easy to update individual pieces
   - It's clear which sections need updating when features change
   - Cross-references don't break easily
   - Tools and processes support ongoing updates
   - Contributors feel empowered to improve docs

#### Red Flags: Maintenance Issues

| Issue | Indicator | Why It Matters | How to Fix |
|-------|-----------|----------------|-----------|
| **Outdated Examples** | Code samples reference old API versions | Users waste time debugging samples that don't work | Test examples; include version numbers; update with releases |
| **Outdated Screenshots** | UI has changed since doc was written | Users can't follow along; triggers distrust | Update screenshots; avoid UI-specific docs when possible |
| **Broken Tutorials** | Followers report they can't complete tutorial | Fails the basic purpose; frustrating for new users | Test tutorial end-to-end; include version matrix |
| **Docs in External Tools** | Documentation split between wiki, blog, and repo | Easy to miss updates; inconsistent information | Consolidate in repo; link but don't duplicate |
| **No Update Process** | Features are implemented; documentation is ignored | Documentation drifts from reality | Establish clear: docs change with code, code review includes docs |
| **No Ownership** | No one is responsible for doc quality | Incrementally decays; no one prioritizes fixes | Assign clear ownership; give them authority and resources |
| **No Testing** | Examples aren't tested; tutorials aren't run | Silent failures; users encounter broken instructions | Test examples; automate where possible; manual testing otherwise |
| **Inconsistent Style** | Different contributors write in different styles | Feels unprofessional; hard to read uniformly | Document style guide; establish review process; enforce consistency |

#### Maintenance Process Evaluation

- [ ] Are documentation changes tracked in version control?
- [ ] Is documentation versioned with code versions?
- [ ] Do code changes include corresponding documentation updates?
- [ ] Is there a process for testing documentation?
- [ ] Is documentation review part of your release checklist?
- [ ] Is there someone responsible for overall documentation quality?
- [ ] Do you have a documented style guide?
- [ ] Are external documentation tools synchronized with the official version?
- [ ] Is there a way to track documentation bugs?
- [ ] How often is documentation reviewed and updated?

---

## Documentation Audit Rubric

Use this rubric to evaluate documentation across all four dimensions. Each dimension is scored at one of four levels.

### Structure & Organization (Diataxis Compliance)

| Level | Description | Characteristics | Red Flags |
|-------|-------------|-----------------|-----------|
| **Excellent** | Documentation follows Diataxis framework rigorously | • Each doc clearly belongs to one mode • All four modes represented (where applicable) • Clear linking between modes • No purpose confusion | • Any mode mixing • Unclear structure • Poor cross-linking |
| **Good** | Documentation mostly follows Diataxis framework with minor issues | • Most docs are clearly one mode • Three of four modes present • Some good linking • Mostly clear structure | • One or two mode confusions • One missing mode • Inconsistent linking strategy |
| **Adequate** | Documentation has structural issues but is still navigable | • Some purpose confusion exists • Only two modes present • Minimal linking • Structure is roughly clear | • Frequent mode mixing • Multiple missing modes • Users get lost |
| **Poor** | Documentation is structurally chaotic | • Constant purpose mixing • One mode or less present • No linking • Unclear structure | • Complete absence of structure • Users can't find what they need • No organization principle |

### Quality & Clarity (Jacobian Writing Principles)

| Level | Description | Characteristics | Red Flags |
|-------|-------------|-----------------|-----------|
| **Excellent** | Writing is clear, well-structured, and appropriate for audience | • Clear sentences with active voice • Well-organized with good headers and lists • Conversational, engaging tone • Examples are tested and work • Appropriate for stated audience | • Any broken examples • Jargon without definition • Dense paragraphs |
| **Good** | Writing is mostly clear with minor quality issues | • Generally active voice with some passivity • Good organization with most headers/lists • Mostly conversational tone • Most examples work • Mostly appropriate for audience | • Few broken examples • Some jargon undefined • Some dense sections |
| **Adequate** | Writing is understandable but could be clearer | • Mixture of active and passive voice • Some organizational issues; missing headers/lists • Formal tone in places where conversational would help • Some examples work; some don't • Audience appropriateness unclear in places | • Multiple broken examples • Inconsistent voice • Hard to scan in places |
| **Poor** | Writing is difficult to understand | • Mostly passive voice, unclear subjects • Poor organization; hard to scan • Robotic or confusing tone • Untested examples • Wrong audience level throughout | • Most examples broken • Impenetrable prose • No organizational structure |

### Completeness

| Level | Description | Characteristics | Red Flags |
|-------|-------------|-----------------|-----------|
| **Excellent** | Documentation covers all major features and use cases | • All features documented • Getting started to advanced path exists • Common use cases all covered • Edge cases and gotchas documented • Clear doc map and navigation | • Missing major features • No path from beginner to advanced • Undocumented common scenarios |
| **Good** | Documentation covers most features and use cases | • Most features documented • Path from beginner to advanced mostly exists • Most common use cases covered • Some edge cases documented | • One or two major features missing • Some use cases undocumented • Limited edge case coverage |
| **Adequate** | Documentation covers basic features and common cases | • Major features documented • Basic getting started exists • Some common use cases covered | • Multiple features undocumented • Big gaps in use cases • No explanation of design • No advanced documentation |
| **Poor** | Documentation is incomplete or scattered | • Many features undocumented • No clear getting started • Many use cases not documented | • Critical features missing • No path forward • Barely documented |

### Maintainability

| Level | Description | Characteristics | Red Flags |
|-------|-------------|-----------------|-----------|
| **Excellent** | Documentation is actively maintained and integrated into workflow | • Docs in repository, versioned with code • Examples tested regularly, all pass • Documentation review part of release • Clear ownership and style guide • Updates happen with feature releases | • Broken examples • Outdated information | No visible last update |
| **Good** | Documentation is mostly maintained with minor issues | • Docs in repository, mostly versioned • Most examples tested and working • Documentation usually reviewed before release • Some ownership clarity • Mostly consistent style | • Few broken examples • Occasionally outdated • Inconsistent style |
| **Adequate** | Documentation is maintained but inconsistently | • Docs partly in repository • Some examples tested • Documentation sometimes reviewed | • Several broken examples • Some outdated sections • Poor style consistency |
| **Poor** | Documentation is not actively maintained | • Docs scattered or not versioned • Examples untested, many broken • No documented process | • Outdated throughout • No clear ownership • Chaotic organization |

---

## Audit Checklist: Step-by-Step Process

Use this checklist to conduct a systematic documentation audit. Plan for 4-8 hours depending on documentation volume.

### Phase 1: Pre-Audit Preparation (30 minutes)

- [ ] **Gather documentation**
   - [ ] List all documentation locations (repo, wiki, external sites, blog)
   - [ ] Identify primary documentation source
   - [ ] Check if documentation is version-controlled
   - [ ] Note any documentation that's out-of-sync

- [ ] **Understand the product**
   - [ ] Identify major features (list top 10)
   - [ ] Understand target users (developers, operators, end-users, etc.)
   - [ ] Note recent changes or planned changes
   - [ ] Identify known documentation gaps

- [ ] **Prepare for audit**
   - [ ] Clarify scope (are you auditing all docs or a subset?)
   - [ ] Identify who will do the audit
   - [ ] Schedule follow-up review meeting
   - [ ] Set up tracking for findings

### Phase 2: Structure Review (1-2 hours)

For each documentation piece, determine its Diataxis mode and evaluate structural fit.

- [ ] **Map documentation to Diataxis modes**
   - [ ] Go through each doc and label it: Tutorial / How-To / Explanation / Reference / Unclear
   - [ ] Create a matrix showing which modes are well-covered vs. missing
   - [ ] Identify any docs that mix multiple modes

- [ ] **Evaluate mode appropriateness**
   - [ ] For each Tutorial:
     - [ ] Does it teach through doing, not just explain?
     - [ ] Would a learner build confidence completing this?
     - [ ] Does it avoid advanced alternatives?
   - [ ] For each How-To:
     - [ ] Does it assume competence?
     - [ ] Is it focused on one specific goal?
     - [ ] Does it avoid teaching concepts?
   - [ ] For each Explanation:
     - [ ] Does it provide context and reasoning?
     - [ ] Does it help build mental models?
     - [ ] Is it non-urgent and suitable for reflective reading?
   - [ ] For each Reference:
     - [ ] Is it purely descriptive?
     - [ ] Is it organized for quick lookup?
     - [ ] Does it avoid instructions?

- [ ] **Evaluate cross-mode linking**
   - [ ] Are there links between related docs?
   - [ ] Do links feel natural or forced?
   - [ ] Are there obvious places that should link but don't?

- [ ] **Identify structural issues**
   - [ ] Mode mixing: docs trying to serve multiple purposes
   - [ ] Missing modes: major gaps in documentation coverage
   - [ ] Orphaned docs: pieces that don't fit the structure
   - [ ] Navigation: can users find what they need?

### Phase 3: Quality Assessment (1-2 hours)

For a representative sample of documentation (at least 10-15 pieces), assess writing quality.

- [ ] **Evaluate clarity**
   - [ ] Can you understand it on first reading?
   - [ ] Are technical terms defined?
   - [ ] Is the tone appropriate?
   - [ ] Are sentences clear and unambiguous?

- [ ] **Assess organization and scannability**
   - [ ] Are paragraphs short (5-6 sentences max)?
   - [ ] Are headers used effectively?
   - [ ] Are lists and tables used where appropriate?
   - [ ] Can you skim and understand the main points?

- [ ] **Check examples and code**
   - [ ] Do all code examples match current API?
   - [ ] Do examples actually work when tested?
   - [ ] Are code samples clear and simple?
   - [ ] Are there enough examples?

- [ ] **Evaluate audience appropriateness**
   - [ ] Does the skill level assumption match stated audience?
   - [ ] Is jargon explained or assumed knowledge listed?
   - [ ] Would non-experts understand?
   - [ ] Would experts find it condescending?

- [ ] **Assess writing quality** (check sample against style guidelines)
   - [ ] Grammar and spelling correct?
   - [ ] Consistent terminology throughout?
   - [ ] Consistent voice and tone?
   - [ ] Active voice used most of the time?

### Phase 4: Completeness Verification (1 hour)

- [ ] **Feature coverage**
   - [ ] List all major features
   - [ ] For each feature, check if it's documented
   - [ ] Note missing documentation
   - [ ] Identify features that need how-to guides

- [ ] **User journey coverage**
   - [ ] Beginner path: can new users get started? (within 30 min to first success?)
   - [ ] Intermediate path: can intermediate users accomplish common tasks?
   - [ ] Advanced path: can advanced users learn about deep features?
   - [ ] Are explanations available for "why" questions?

- [ ] **Edge case and troubleshooting coverage**
   - [ ] Are common mistakes documented?
   - [ ] Are error messages explained?
   - [ ] Are workarounds provided for known issues?
   - [ ] Are limits and constraints documented?

- [ ] **Meta-documentation**
   - [ ] Is there a documentation home/index?
   - [ ] Is it clear where to start?
   - [ ] Are different documentation types clearly labeled?
   - [ ] Is versioning information clear?

### Phase 5: Maintenance Assessment (30 minutes)

- [ ] **Version control and storage**
   - [ ] Is documentation in the repository?
   - [ ] Is it clear which docs apply to which versions?
   - [ ] Is documentation history preserved?

- [ ] **Example testing**
   - [ ] Are there broken examples?
   - [ ] Do tutorials work when followed?
   - [ ] Are code samples tested automatically?

- [ ] **Process assessment**
   - [ ] Is there a documented update process?
   - [ ] Are documentation changes tracked?
   - [ ] Is documentation reviewed before release?
   - [ ] Is there clear ownership?

- [ ] **Style and consistency**
   - [ ] Is there a style guide?
   - [ ] Is terminology consistent throughout?
   - [ ] Is formatting consistent?
   - [ ] Is voice consistent?

### Phase 6: Reporting Findings (1 hour)

- [ ] **Compile audit results**
   - [ ] Score each dimension (Excellent/Good/Adequate/Poor)
   - [ ] List specific issues found
   - [ ] Categorize as structural, content, writing, or process issues

- [ ] **Create findings summary**
   - [ ] List top 3-5 most critical issues
   - [ ] Identify quick wins vs. structural improvements
   - [ ] Estimate effort for major improvements
   - [ ] Propose prioritization

- [ ] **Develop action plan**
   - [ ] Immediate fixes (can do in 1-2 days)
   - [ ] Short-term improvements (2-4 weeks)
   - [ ] Long-term strategic work (1+ months)
   - [ ] Assign ownership for each item

---

## Common Documentation Patterns

### What Good Documentation Looks Like

#### Pattern 1: The Complete Tutorial

**Characteristics:**
- Has clear learning goal stated upfront
- Delivers visible result in first 5 minutes
- Uses "We" language, creating teacher-student relationship
- Each step builds on previous; logical progression
- Minimum explanation; focus on concrete actions
- Celebrates accomplishment at the end
- Typically completable in 30 minutes or less
- No "optional" content or advanced variations

**Example Structure:**
```
Getting Started with [Product]

By the end of this tutorial, you'll have [concrete accomplishment].

Step 1: [Concrete action]
→ [Expected visible result]

Step 2: [Next action]
→ [Progress evidence]

...continue with visible results after each step...

Congratulations! You've [accomplished goal].
Now you know how to [core skill].
```

#### Pattern 2: The Focused How-To Guide

**Characteristics:**
- Title is "How to [accomplish specific goal]"
- Immediately states what you'll accomplish
- Assumes reader already knows basics
- Contains only necessary steps
- Provides pragmatic solution, not all alternatives
- Acknowledges real-world complexity and edge cases
- Links to reference and explanation for details
- Typically 5-15 minutes to complete

**Example Structure:**
```
How to [accomplish specific goal]

You want to [specific outcome]. Here's how.

Prerequisites: [assumes you know...]

Steps:
1. [Do this]
2. [Then this]
3. [Finally this]

That's it. You've [accomplished goal].
See also: [Reference link], [Explanation link], [Related how-to]
```

#### Pattern 3: The Contextual Explanation

**Characteristics:**
- Titled "About [topic]" or "Understanding [concept]"
- Provides historical context and design decisions
- Explores trade-offs and alternatives
- Not step-by-step; discursive and reflective
- Suitable for reading away from active work
- Helps build mental models
- Connects concepts across domain
- Appropriate length varies; often 5-20 minutes to read

**Example Structure:**
```
Understanding [concept/design choice]

[Opening paragraph explaining why this matters]

## Historical Context
[Why things are the way they are]

## Design Decisions
[Why this approach was chosen, what alternatives exist]

## Implications
[What this means for users, impact on workflow]

## Conceptual Foundations
[How this fits with other pieces]
```

#### Pattern 4: The Authoritative Reference

**Characteristics:**
- Organized by feature/function, not alphabetically
- Consistent formatting across all entries
- Includes: purpose, parameters, return values, examples
- Austere and neutral tone
- Suitable for quick lookup while working
- Examples show actual usage
- Links to how-to guides for instructions
- Concise but complete

**Example Structure:**
```
## function_name(param1, param2)

**Purpose:** [One sentence what this does]

**Parameters:**
- `param1` (type): [What it is]
- `param2` (type): [What it is]

**Returns:** [What is returned and when]

**Example:**
[Code sample showing actual usage]

**See Also:** [How-to guide using this], [Related function]
```

### What Poor Documentation Looks Like

#### Anti-Pattern 1: The Hybrid Document

**What it looks like:**
- Tutorial that includes comprehensive reference documentation
- How-to guide that spends half the content explaining concepts
- Reference that provides step-by-step instructions
- Explanation that tries to also teach specific tasks

**Why it fails:**
- Learners are overwhelmed by irrelevant options
- Experienced users waste time reading unnecessary context
- No piece serves its intended purpose well
- Users confused about what mode they're in

**How to fix:**
- Break into separate documents
- Each doc serves one purpose only
- Link between them

#### Anti-Pattern 2: The Disconnected Reference

**What it looks like:**
- API reference with no examples
- Parameters documented without context
- No explanation of when to use what
- Purely auto-generated with no human touch
- Users must read multiple unrelated docs to understand one function

**Why it fails:**
- Context is missing; users can't figure out actual usage
- Users resort to trying things blindly
- Technical but not useful

**How to fix:**
- Add examples showing actual usage
- Provide context: when to use this, common patterns
- Write at least minimal guide explaining organization
- Hand-curate; don't rely on auto-generation alone

#### Anti-Pattern 3: The Over-Explained Tutorial

**What it looks like:**
- Each step preceded by paragraphs explaining why
- "You can also do X" options throughout
- Complex variations presented alongside main path
- Theory and justification mixed with actions

**Why it fails:**
- Cognitive overload; learners distracted from learning
- Clear learning objective obscured
- Takes longer than 30 minutes
- Learners unsure which path to follow

**How to fix:**
- Show concrete actions; minimize explanation
- Remove alternatives; one clear path
- Move theory to explanation docs
- Keep focused on the goal

#### Anti-Pattern 4: The Missing Explanation

**What it looks like:**
- Documentation has tutorials, how-tos, and reference
- No documents explaining design, history, or concepts
- No connection between features
- "Why" questions sent to external sources

**Why it fails:**
- Users have procedures and facts but no understanding
- Can't build mental models
- No context for learning new things
- Feels fragmented

**How to fix:**
- Add explanation documentation
- Document design decisions
- Explain relationships between features
- Provide conceptual foundations

---

## Improvement Roadmap: Addressing Documentation Deficiencies

### How to Prioritize Improvements

Use this framework to decide what to tackle first.

#### Quick Wins: High Impact, Low Effort

These improvements deliver visible value quickly and build momentum.

1. **Fix broken examples and outdated screenshots**
   - Impact: Documentation feels current and reliable
   - Effort: Low (testing and updating)
   - Owner: Technical writer or product person
   - Timeline: 1-2 weeks

2. **Add a documentation index/home page**
   - Impact: Users know where to start and what exists
   - Effort: Low (organizing what exists)
   - Owner: Technical writer
   - Timeline: 1 week

3. **Establish a basic style guide**
   - Impact: Documentation feels more professional
   - Effort: Low (documenting existing style)
   - Owner: Tech lead + writer
   - Timeline: 2-3 days

4. **Triage and document known issues**
   - Impact: Users can troubleshoot independently
   - Effort: Low (compiling existing knowledge)
   - Owner: Support + writer
   - Timeline: 1 week

5. **Rewrite one critical how-to guide**
   - Impact: Users can accomplish major tasks successfully
   - Effort: Medium (writing + testing)
   - Owner: Technical writer
   - Timeline: 2-3 days

#### Strategic Improvements: Medium Impact, Medium Effort

These create structural improvements and address major gaps.

1. **Create getting started tutorial**
   - Impact: New users get productive in 30 minutes
   - Effort: Medium (writing + testing + iteration)
   - Owner: Technical writer + product lead
   - Timeline: 2-3 weeks

2. **Add explanation documentation**
   - Impact: Users understand why, not just what
   - Effort: Medium (requires deep knowledge)
   - Owner: Subject matter experts + writer
   - Timeline: 3-4 weeks

3. **Separate mixed-mode documents**
   - Impact: Users find what they need more easily
   - Effort: Medium (rewriting for clarity)
   - Owner: Technical writer
   - Timeline: 2-3 weeks

4. **Implement editorial process**
   - Impact: Sustained quality improvement
   - Effort: Medium (process, not content)
   - Owner: Documentation lead
   - Timeline: Ongoing

5. **Add comprehensive how-to guide collection**
   - Impact: Users can accomplish common tasks
   - Effort: Medium-High (multiple docs)
   - Owner: Technical writer
   - Timeline: 1 month

#### Long-Term Strategic Work: High Impact, High Effort

These create comprehensive documentation systems.

1. **Restructure entire documentation suite**
   - Impact: Documentation aligns with Diataxis
   - Effort: High (major rewrite)
   - Owner: Documentation team
   - Timeline: 2-3 months

2. **Automate example testing**
   - Impact: Examples stay correct as code changes
   - Effort: High (tooling)
   - Owner: Engineering team
   - Timeline: 1-2 months

3. **Move documentation into repository**
   - Impact: Documentation versioned with code
   - Effort: Medium-High (migration)
   - Owner: Technical lead + writer
   - Timeline: 2-3 weeks

4. **Create documentation testing suite**
   - Impact: Documentation reliability assured
   - Effort: High (tooling and process)
   - Owner: QA + writer
   - Timeline: 1-2 months

5. **Establish ongoing documentation practice**
   - Impact: Documentation stays current as product evolves
   - Effort: High (culture change)
   - Owner: Leadership
   - Timeline: Ongoing

### Sample Improvement Plans

#### For a Small Project (< 50K LOC)
1. **Weeks 1-2:** Create documentation index, write getting started tutorial
2. **Weeks 3-4:** Fix broken examples, establish style guide
3. **Weeks 5-6:** Add 3-5 essential how-to guides
4. **Weeks 7-8:** Add one major explanation document
5. **Ongoing:** Implement editorial review process

#### For a Medium Project (50K - 200K LOC)
1. **Weeks 1-2:** Audit entire documentation, create findings report
2. **Weeks 3-4:** Create documentation index, getting started tutorial
3. **Weeks 5-8:** Rewrite/reorganize tutorials and how-to guides
4. **Weeks 9-12:** Add explanation documentation (major features)
5. **Weeks 13-16:** Reference documentation review and improvement
6. **Ongoing:** Implement documentation into development workflow

#### For a Large Project (> 200K LOC)
1. **Phase 1 (1 month):** Full audit, establish governance
2. **Phase 2 (2-3 months):** Getting started, core tutorials
3. **Phase 3 (3 months):** How-to guide library (15-20 guides)
4. **Phase 4 (2 months):** Explanation documentation
5. **Phase 5 (1 month):** Reference documentation overhaul
6. **Phase 6 (1 month):** Testing, editorial, process establishment
7. **Ongoing:** Integration with development workflow

---

## Application Examples: Documentation Audits in Practice

### Example 1: A REST API with Poor Documentation

**Initial State:**

The API project has auto-generated reference documentation and a scattered collection of blog posts. Users constantly ask "how do I do X?"

**Audit Findings:**

| Dimension | Score | Issues |
|-----------|-------|--------|
| **Structure** | Poor | Only auto-generated reference exists; no tutorials, how-to guides, or explanations |
| **Quality** | Adequate | Auto-generated docs are accurate but austere; no examples; unclear when to use what |
| **Completeness** | Adequate | All endpoints documented technically; missing "how do I" guidance; no getting started |
| **Maintainability** | Good | Examples work; docs update with code; but no process for examples testing |

**Specific Issues:**
1. No tutorial for getting started (users don't know where to begin)
2. No how-to guides (common use cases undocumented)
3. Auto-generated reference lacks context (why use this endpoint vs that one?)
4. No explanation docs (no discussion of API design decisions)
5. Users referred to outdated blog posts

**Improvement Plan:**

**Quick Wins (Week 1-2):**
- [ ] Create documentation home page with "start here" link
- [ ] Extract best blog post content into official how-to guides (5 most-asked questions)
- [ ] Add minimal examples to reference docs

**Strategic Work (Week 3-6):**
- [ ] Write getting started tutorial (achievable in 30 min: create resource, read it back)
- [ ] Create how-to guide library (10 common use cases)
- [ ] Add explanation: API design principles and architecture

**Result:** Users can now get started quickly, accomplish common tasks with guides, understand design choices, and consult reference for details.

---

### Example 2: A React Component Library with Fragmented Documentation

**Initial State:**

Component docs are spread across Storybook, a README, scattered JSDoc comments, and a blog. Each component documented differently. Some are outdated.

**Audit Findings:**

| Dimension | Score | Issues |
|-----------|-------|--------|
| **Structure** | Adequate | Mix of reference (Storybook) and brief how-to (README); no tutorials or explanations |
| **Quality** | Adequate | Storybook examples work but are minimal; README tutorials are good but scattered |
| **Completeness** | Adequate | Components documented; but no "how do I build X" guides; missing design rationale |
| **Maintainability** | Good | Examples tied to code; Storybook updates with components; but no testing process |

**Specific Issues:**
1. Fragmented documentation (4 different locations)
2. Inconsistent examples across components
3. No tutorial for using components together
4. No guide for building common layouts
5. Design decisions unexplained (why this API?)
6. No style consistency

**Improvement Plan:**

**Quick Wins (Week 1-2):**
- [ ] Consolidate README into repo documentation
- [ ] Standardize Storybook examples across all components
- [ ] Create component documentation style guide

**Strategic Work (Week 3-6):**
- [ ] Create tutorial: building first component-based layout
- [ ] Add how-to guides: 5 common layouts/patterns
- [ ] Add explanation: component philosophy and design decisions

**Result:** Documentation is consolidated, consistent, includes learning path, and explains design choices.

---

### Example 3: A CLI Tool with Comprehensive but Confusing Documentation

**Initial State:**

The tool has extensive documentation but users still struggle to accomplish tasks. Documentation mixes tutorials, how-tos, and reference in single documents.

**Audit Findings:**

| Dimension | Score | Issues |
|-----------|-------|--------|
| **Structure** | Adequate | Docs exist but purposes are mixed; hard to know which to read for what goal |
| **Quality** | Good | Writing is clear but organization confuses users |
| **Completeness** | Excellent | Every feature documented; every use case covered |
| **Maintainability** | Excellent | Docs updated with releases; examples tested |

**Specific Issues:**
1. Documents try to do everything: teach AND reference AND explain
2. Users overwhelmed by options and alternatives
3. Hard to find "just tell me what to do" guidance
4. No clear learning path for beginners
5. No explanations of design choices

**Improvement Plan:**

**Strategic Work (Week 1-2):**
- [ ] Separate all documents into clear modes:
   - [ ] Tutorials (3 getting started guides)
   - [ ] How-to guides (existing docs reorganized as task-focused)
   - [ ] Reference (command reference reorganized)
   - [ ] Explanations (design decisions and philosophy)
- [ ] Add a documentation map showing progression
- [ ] Establish cross-mode linking

**Result:** Same content, better organization. Users find what they need faster; learning path is clear.

---

## Key Principles Summary: Excellent Documentation Framework

These 12 core principles combine Diataxis and Jacobian insights into a unified philosophy:

### Structural Principles

**1. Documentation Serves Distinct User Needs**
Users in different states (learning vs. working) with different goals (practical vs. conceptual) need different documentation types. Attempting to serve multiple purposes in one piece creates confusion. Diataxis provides a complete map of these needs.

**2. Four Documentation Modes Are Mathematically Complete**
- **Tutorials:** Learning by doing (acquisition + action)
- **How-to Guides:** Working with purpose (application + action)
- **Explanations:** Understanding deeply (acquisition + cognition)
- **Reference:** Looking up facts (application + cognition)

These four modes completely enumerate all user needs in skilled practice.

**3. Each Mode Has Distinct Characteristics**
- Tutorials are narrative, pedagogical, minimize options, build confidence
- How-to guides are pragmatic, assume competence, focus on specific goals
- Explanations are discursive, contextual, perspective-acknowledging
- Reference is austere, descriptive, organized for lookup

Confusing these characteristics undermines the entire documentation.

### Quality Principles

**4. Writing Skill Is Foundational**
Clear thinking produces clear writing. Technical documentation begins with writing skill, not just technical knowledge. Good documentation writers must understand:
- Grammar and clarity (serve functional purpose)
- Writing for readers, not for yourself
- How people actually read online (scanning, skipping, multitasking)

**5. Clarity Requires Structure for Scanning**
Online documentation must be optimized for digital reading:
- Short paragraphs (5-6 sentences max)
- Strategic headers as navigation aids
- Lists and tables instead of dense prose
- Emphasis to guide the eye
- Code blocks to highlight examples

**6. Audience Appropriateness Is Non-Negotiable**
Each piece must match its intended audience:
- Tutorials assume learners, not experts
- How-to guides assume competence; don't over-explain
- Explanations provide sufficient context for newcomers
- Reference is neutral and technical

Mismatched audience level serves no one.

### Quality Foundations

**7. Functional Quality Must Precede Deep Quality**
Documentation must meet objective standards before it can feel good:
- **Accurate:** Correct descriptions of reality
- **Complete:** All necessary items present
- **Consistent:** Established patterns followed
- **Useful:** Serves intended purpose
- **Precise:** Unambiguous and clear

Deep quality (flow, beauty, satisfaction) only emerges from solid functional foundations.

**8. Editorial Review Is Essential to Quality**
Writers are blind to their own work. Even experienced writers need external eyes:
- Separate writing from editing (different mindsets)
- Wait between drafting and revision
- Have external reviewers check for clarity and accuracy
- Expect multiple editing passes (2-3 minimum catches ~90% of errors per pass)

This is not optional; it's fundamental.

### Process and Maintenance

**9. Documentation Must Stay Current With Code**
Documentation has a half-life. As code changes, docs drift from reality:
- Store documentation in the repository with code
- Version documentation with code versions
- Update documentation when features change
- Test all examples regularly (automate if possible)
- Review documentation as part of release process

Outdated documentation damages trust more than missing documentation.

**10. Examples Must Actually Work**
Broken code samples are worse than no examples:
- Test all tutorials end-to-end
- Verify code examples match current API
- Include version numbers in examples
- Update examples when APIs change
- Automate testing where possible

**11. Documentation Is Part of Development Workflow**
Documentation is not separate from engineering; it's integrated:
- Include documentation in code review (same rigor as code)
- Plan documentation as part of features (not optional)
- Assign documentation ownership
- Track documentation bugs like code bugs
- Make documentation testing part of QA

**12. Multiple Formats Are Essential**
No single format serves all users:
- Some need tutorials to get started
- Some need guides to understand concepts
- Some need reference to look up details
- Some need explanations to understand why

Projects that try to serve all with one format fail everyone.

---

## How to Use This Framework

### For Documentation Audits
1. Use the checklist to systematically review documentation
2. Score each dimension using the rubric
3. Identify specific issues and anti-patterns
4. Use the improvement roadmap to prioritize fixes
5. Track progress against the plan

### For Documentation Planning
1. Use the four modes to structure new documentation
2. Reference the patterns section for examples
3. Use the key principles to guide writing
4. Plan for testing and maintenance from the start

### For Establishing Documentation Standards
1. Use the rubric as your quality standard
2. Use the key principles as your philosophy
3. Reference the red flags to catch problems early
4. Use the process integration points to embed in workflow

### For Training New Writers
1. Use the key principles as your teaching framework
2. Reference the good and poor patterns as examples
3. Use the quality indicators to explain what to look for
4. Practice against the rubric

---

## Conclusion: Excellence Through Integration

The Diataxis framework and Jacobian principles are not competing philosophies—they complement each other perfectly:

- **Diataxis** ensures documentation is structured correctly, serving real user needs clearly
- **Jacobian principles** ensure each piece is written beautifully, maintained rigorously, and integrated into development

Together, they create documentation that users love: easy to find, easy to read, easy to trust, and easy to maintain.

The path to excellence is clear:
1. Organize around user needs (Diataxis)
2. Execute with writing skill and rigor (Jacobian)
3. Maintain with process and care (both)
4. Measure using the rubric and audit (both)
5. Improve continuously (both)

Documentation is not a one-time deliverable. It's a living practice that reflects your commitment to users. This framework provides the map; your discipline in following it determines the results.

---

*Framework Created: December 2025*
*Source: Integration of Diataxis (https://diataxis.fr/) and Jacobian Documentation Principles*
*This framework synthesizes both approaches into a unified, actionable audit and improvement system.*
