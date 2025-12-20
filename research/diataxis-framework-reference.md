# The Diataxis Documentation Framework: Complete Reference

## Overview

Diataxis is a rigorous, theoretically-grounded system for organizing documentation. Rather than relying on intuition or ad-hoc categorization, Diataxis places documentation practice on firm theoretical foundations by recognizing that all documentation serves specific, distinct user needs within skilled practice.

The framework answers a fundamental question: **What documentation does a person actually need when learning or working in a skilled domain?**

### Why Diataxis Matters

Most documentation is poorly organized because it conflates different purposes. Mixing tutorials with reference material, embedding instructions within explanations, or blending how-to guidance with conceptual overviews creates confusion and frustration for users. Diataxis provides a systematic method to prevent these mistakes.

The framework is grounded in how people actually learn and work:
- Learning requires different resources than working
- Practical knowledge differs fundamentally from theoretical knowledge
- Users in different states need different types of help
- Documentation quality depends on serving these distinct needs separately

### The Mathematical Completeness of Four Modes

Diataxis identifies exactly **four** documentation modes—not three, not five—because they emerge from two fundamental dimensions that completely enumerate all user needs in skilled practice. This mathematical completeness is not arbitrary; it's a necessary consequence of how the dimensions intersect.

---

## The Dimensional Model: The Foundation

The Diataxis framework rests on two intersecting axes that define the complete territory of documentation:

### Dimension 1: Action vs. Cognition
**Practical Knowledge ("Knowing How") vs. Theoretical Knowledge ("Knowing That")**

This axis distinguishes between:
- **Action/Practical**: Focused on what people *do*—the concrete steps, commands, and procedures needed to accomplish something
- **Cognition/Theoretical**: Focused on what people *understand*—the concepts, principles, and reasons behind things

These are "wholly distinct from each other," yet inseparable in actual practice. A practitioner needs both dimensions.

### Dimension 2: Acquisition vs. Application
**Learning Mode vs. Working Mode**

This axis distinguishes between:
- **Acquisition**: The user is actively *learning* their craft—they're "at study," building foundational competency and familiarity
- **Application**: The user is actively *using* their skills—they're "at work," solving real problems with existing knowledge

The mental state and needs of someone learning differ fundamentally from someone doing.

### The Complete Map

These two dimensions create a 2×2 matrix representing all possible documentation needs:

```
                 ACQUISITION        APPLICATION
                 (Learning)         (Using)

ACTION           TUTORIAL           HOW-TO GUIDE
(Practical)      Learning by doing  Doing with purpose

COGNITION        EXPLANATION        REFERENCE
(Theoretical)    Learning concepts  Looking up facts
```

Each quadrant represents a distinct user need that cannot be properly served by confusing it with the others.

---

## The Four Documentation Modes

### 1. TUTORIALS: Learning Through Action

**Quadrant:** Acquisition + Action
**User Question:** "How do I get started?"

#### Purpose
Tutorials are *learning-oriented* guides where learners acquire skills through practical, guided activities. They establish foundational competency, familiarity, and confidence with a subject. The teacher bears primary responsibility for the learner's success.

#### Core Principle
In tutorials, **what the student does is not necessarily what they learn**. The activity is the vehicle for learning; the purpose extends beyond the immediate task.

#### Key Characteristics
- **Pedagogical**: Operate as lessons with a teacher-student relationship
- **Narrative-driven**: Unfold as a coherent story with beginning, middle, and end
- **Confidence-building**: Emphasize visible results early and often to show cause-and-effect
- **Repetitive**: Build competency and confidence through structured repetition
- **Focused**: Ignore alternatives and options to prevent cognitive overload
- **Minimally explanatory**: Prefer concrete actions over theoretical discussion

#### Structure and Guidelines
1. **Show the destination upfront**: Let learners know what they'll accomplish
2. **Use first-person plural language**: "We will..." creates collaborative tone
3. **Deliver visible results early**: Provide tangible outcomes frequently to maintain engagement
4. **Point out key observations**: Help learners notice what matters
5. **Celebrate accomplishments**: Reinforce learning with acknowledgment
6. **Maintain narrative flow**: Keep the journey coherent and purposeful
7. **Minimize alternatives**: Don't introduce "you could also..." or advanced variations
8. **Provide concrete actions**: Show what to do rather than explaining why

#### Anti-patterns to Avoid
- Embedding optional content or "advanced" alternatives
- Mixing in reference documentation or API details
- Asking learners to make decisions about approaches
- Over-explaining the reasoning behind steps
- Using language that suggests uncertainty

#### When to Use Tutorials
- Onboarding new users to your system
- Teaching foundational skills
- Building confidence and competency
- Helping users get their first tangible result

---

### 2. HOW-TO GUIDES: Doing With Purpose

**Quadrant:** Application + Action
**User Question:** "How do I accomplish X?"

#### Purpose
How-to guides are *goal-oriented* directions that guide competent users through solving specific problems or achieving specific results. They address real-world needs users face when actively working.

#### Core Principle
How-to guides help **competent practitioners accomplish specific goals**. Users already know what they want to achieve; they need the path to get there.

#### Key Characteristics
- **Problem-focused**: Address specific, achievable goals
- **Action-oriented**: Contain only practical steps needed
- **User-centric**: Written from the user's perspective of what needs accomplishing
- **Assumes competence**: Readers already know what they're trying to do
- **Pragmatic**: Prioritize usability over completeness
- **Decisive**: Make choices for the user; don't present alternatives

#### Structure and Guidelines
1. **Use clear, precise titles**: "How to [accomplish specific goal]" format
2. **State the goal immediately**: What will the reader accomplish?
3. **Assume competence**: Don't explain foundational concepts
4. **Provide only necessary steps**: Remove everything not essential to the goal
5. **Maintain logical flow**: Ground the sequence in how users actually think
6. **Address real-world complexity**: Acknowledge legitimate edge cases
7. **Link to references for details**: Send users elsewhere for comprehensive information
8. **Keep focused on the goal**: Don't digress into teaching or explaining

#### Distinction from Tutorials
- **Tutorials** teach foundational skills to learners
- **How-to guides** guide competent users toward specific objectives
- Tutorials ask "What should I learn?" and walk through discovery
- How-to guides answer "How do I do this specific thing?" with assumption of competence

#### Real-World Example
A recipe is an ideal how-to guide: clear problem definition, focused steps, practical format, no unnecessary context or teaching about cooking theory.

#### Anti-patterns to Avoid
- Including optional variations or "you could also" content
- Mixing in explanation of underlying concepts
- Assuming users don't know the basics
- Presenting multiple approaches and asking users to choose
- Including reference material or technical specifications

#### When to Use How-to Guides
- Solving specific, practical problems
- Accomplishing common tasks
- Guiding users through procedures
- Addressing real-world scenarios
- Solving problems users bring to you

---

### 3. EXPLANATION: Understanding the Bigger Picture

**Quadrant:** Acquisition + Cognition
**User Question:** "Can you tell me about...?"

#### Purpose
Explanation documentation is *understanding-oriented* material that deepens readers' grasp of a subject through reflective discussion. It brings clarity, context, and light to broader topic areas—helping learners build coherent mental models.

#### Core Principle
Explanation addresses the question "Can you tell me about...?" It's intended for reflective reading, potentially even away from active work—it builds **comprehension across a meaningful domain**.

#### Key Characteristics
- **Connecting**: Links concepts, relationships, and implications
- **Contextual**: Explores design decisions, history, constraints, and reasoning
- **Bounded scope**: Organized around meaningful topics, not specific tasks
- **Perspective-acknowledging**: Considers alternatives, opinions, and nuance
- **Discursive**: Uses discussion rather than instruction
- **Non-urgent**: Valuable precisely because it's not immediately task-focused

#### Structure and Guidelines
1. **Define the scope**: Use titles implicitly containing "about" ("About [topic]")
2. **Explore the bigger picture**: Historical background, design decisions, available choices
3. **Provide reasoning**: Explain *why* things are as they are
4. **Connect concepts**: Show relationships across ideas and domains
5. **Acknowledge alternatives**: Discuss different approaches and perspectives
6. **Use discursive language**: Weigh alternatives, offer judgments, unfold relationships
7. **Maintain narrative clarity**: Structure the discussion coherently
8. **Create mental models**: Help readers understand how things fit together

#### What Explanation Addresses
- Why design decisions were made
- Historical evolution of a system
- Available choices and their trade-offs
- Underlying principles and constraints
- Conceptual foundations
- How different pieces relate to each other

#### Anti-patterns to Avoid
- Mixing in procedural instructions
- Including technical reference material
- Treating explanation as step-by-step guidance
- Assuming readers don't want understanding
- Being overly concise; explanation requires space for thought

#### When to Use Explanation
- Teaching conceptual foundations
- Exploring why systems work as they do
- Helping users understand design choices
- Building mental models of complex domains
- Providing context for more specific documentation

---

### 4. REFERENCE: The Source of Truth

**Quadrant:** Application + Cognition
**User Question:** "What does this do?"

#### Purpose
Reference documentation provides *information-oriented* technical descriptions of machinery and operations. Users consult reference material when they need authoritative facts while working—not instruction, not explanation, but accurate information.

#### Core Principle
One hardly *reads* reference material; one *consults* it. Users rely on it as a firm foundation for confidence in their work.

#### Key Characteristics
- **Austere and authoritative**: Neutral, unambiguous descriptions
- **Description-focused**: Documents what exists, not how to use it
- **Information-first**: Prioritizes accuracy and completeness of information
- **Structured predictably**: Consistent formatting allows rapid consultation
- **Concise**: Contains needed information without digression
- **Avoids instruction**: Describes rather than directs

#### Structure and Guidelines
1. **Mirror the product**: Organize documentation to align with the product's structure
2. **Use consistent patterns**: Standard formatting and placement for predictability
3. **Organize hierarchically**: Group related items logically
4. **Provide complete information**: Accuracy and comprehensiveness matter
5. **Include illustrative examples**: Brief usage examples clarify behavior
6. **Use precise language**: Avoid ambiguity
7. **Keep entries parallel**: Similar topics structured similarly
8. **Link purposefully**: Point to how-to guides for instructions, explanations for context

#### What Reference Documents
- API specifications and function signatures
- Command-line options and arguments
- Configuration parameters
- Data structures and their properties
- Return values and error codes
- System capabilities and limitations

#### Anti-patterns to Avoid
- Mixing in instructions ("how to use this function")
- Including explanatory discussion of concepts
- Burying information in prose
- Using inconsistent formatting across sections
- Providing opinions or recommendations
- Including marketing claims or enthusiasm

#### When to Use Reference
- Documenting APIs and functions
- Specifying system behavior
- Listing available options and parameters
- Providing technical specifications
- Serving as the source of truth for system capabilities

---

## How the Modes Relate: Using Diataxis as a Compass

The four modes are not isolated islands; they work together to serve the complete spectrum of user needs. Understanding their relationships helps you create coherent documentation ecosystems.

### The Journey of a Practitioner

Typically, a user's documentation needs follow a progression:

1. **Start with Tutorials**: Build initial competency and familiarity (Acquisition + Action)
2. **Consult How-to Guides**: Accomplish specific tasks (Application + Action)
3. **Reference**: Look up specific facts while working (Application + Cognition)
4. **Read Explanations**: Deepen understanding (Acquisition + Cognition)

### Cross-Mode Linking

- **From How-to to Reference**: "For detailed information about this parameter, see [reference]"
- **From Reference to How-to**: "To learn how to use this in practice, see [how-to guide]"
- **From Tutorial to Explanation**: "To understand why we do this, see [explanation]"
- **From How-to to Tutorial**: "For foundational skills, see [tutorial]"

### Using the Framework as a Decision Tool

When uncertain about documentation categorization, ask:

1. **Are users learning or working?** → Determines Acquisition or Application
2. **Do they need practical steps or conceptual understanding?** → Determines Action or Cognition
3. **Could this content be misunderstood in another mode?** → Suggests moving it to appropriate quadrant

The compass is particularly effective when you're troubled by doubt or difficulty. If documentation doesn't feel right, it often means you're trying to serve two purposes simultaneously.

---

## Quality Principles Within Diataxis

The framework supports two distinct dimensions of documentation quality:

### Functional Quality
These are objective, measurable standards:
- **Accuracy**: Does it correctly describe reality?
- **Completeness**: Are all necessary items present?
- **Consistency**: Does it follow established patterns?
- **Usefulness**: Does it serve the intended purpose?
- **Precision**: Is it unambiguous?

Functional quality is testable against reality and independent. Documentation must meet all functional standards to work.

### Deep Quality
These are subjective, interdependent characteristics:
- **Flow**: Does it feel natural and coherent?
- **Anticipation**: Does it address what users actually need?
- **Beauty**: Is it well-designed and pleasant to use?
- **Appropriateness**: Does it fit users' needs and context?
- **Satisfaction**: Does it feel good to use?

### The Relationship Between Quality Dimensions

**Deep quality is conditional upon functional quality.** You cannot achieve excellence without accuracy and consistency first. However, meeting functional standards alone doesn't guarantee documentation feels good to use.

Diataxis "lays down conditions for the possibility of deep quality" by:
- Organizing content around actual user needs
- Preserving flow by preventing disruptive digressions
- Making gaps and inconsistencies visible

But Diataxis alone cannot guarantee deep quality—it requires complementary skills in design, user experience, and writing.

---

## Common Anti-Patterns and Mistakes

### 1. **Blending Modes: The Tutorial-Reference Hybrid**
**Problem**: Tutorial that includes comprehensive reference documentation
**Result**: Learners overwhelmed by optional details; reference users can't find information easily
**Solution**: Put reference material in dedicated reference section; link from tutorial

### 2. **Confusing How-to Guides with Tutorials**
**Problem**: How-to guide that teaches foundational concepts instead of assuming competence
**Result**: Experienced users frustrated by unnecessary explanations; learners lacking proper foundation
**Solution**: Create tutorials for foundation; assume competence in how-to guides

### 3. **Instructions in Reference Documentation**
**Problem**: API reference that explains "how to use" instead of describing "what it does"
**Result**: Inconsistent structure; users can't locate simple facts quickly
**Solution**: Reference describes; how-to guides instruct

### 4. **Explanation Embedded in How-to Guides**
**Problem**: How-to guide explaining concepts instead of focusing on the goal
**Result**: Loses users who know what they want; doesn't help learners build mental models
**Solution**: Keep how-to guides focused on the goal; explain concepts separately

### 5. **Missing Explanation Entirely**
**Problem**: Documentation with only reference, how-to guides, and tutorials
**Result**: Users have facts and procedures but no understanding; fragmented knowledge
**Solution**: Add explanation documentation that shows relationships and reasoning

### 6. **Over-explaining in Tutorials**
**Problem**: Tutorial that justifies every step with "why" instead of showing "what"
**Result**: Learners distracted from task; learning objective obscured
**Solution**: Show concrete actions; minimize explanation during learning

### 7. **Undefined Audience or Purpose**
**Problem**: Documentation that tries to serve multiple purposes simultaneously
**Result**: Unclear, unsatisfying to all audiences
**Solution**: Identify the specific user need each piece serves; use Diataxis to determine mode

### 8. **Inconsistent Structure Within a Mode**
**Problem**: Reference documentation with inconsistent formatting across sections
**Result**: Users slow down trying to find information they expect in familiar places
**Solution**: Establish consistent patterns within each documentation type

---

## Practical Application Pathways

### For API Documentation
- **Reference**: Complete API specification (parameters, return values, error codes)
- **How-to Guides**: Common use cases and patterns
- **Tutorials**: Getting started; building first project
- **Explanation**: Design decisions; architecture overview

### For Software Libraries
- **Tutorials**: Installation and first program
- **How-to Guides**: Common tasks (authentication, file handling, etc.)
- **Reference**: Classes, methods, functions
- **Explanation**: Design philosophy; when to use different approaches

### For User-Facing Applications
- **Tutorials**: Initial onboarding; core workflow
- **How-to Guides**: Specific tasks users want to accomplish
- **Reference**: Feature specifications; available options
- **Explanation**: Why features work as they do; use cases

### For Internal Tools and Processes
- **Tutorials**: New employee onboarding
- **How-to Guides**: Common tasks and workflows
- **Reference**: System specifications; available commands
- **Explanation**: Why processes exist; how they fit together

---

## Key Takeaways: Core Principles for Documentation Structure

### 1. **Documentation Serves Distinct User Needs**
Users in different states (learning/working) with different goals (action/cognition) need different documentation types. Attempting to serve multiple purposes in one piece creates confusion.

### 2. **The Framework is Exhaustive**
The four modes emerge mathematically from two dimensions. They completely enumerate all documentation needs in skilled practice—nothing is missing, nothing is extra.

### 3. **Confusing Modes Hurts Quality**
When documentation mixes purposes, it serves none of them well. A tutorial that reads like reference documentation fails as both. Clarity of purpose enables quality.

### 4. **Each Mode Has Distinct Characteristics**
- Tutorials: narrative, pedagogical, action-oriented, focused, minimal explanation
- How-to guides: goal-focused, pragmatic, assumes competence, decisive
- Reference: austere, descriptive, structured, authoritative, neutral
- Explanation: discursive, contextual, bounded, perspective-acknowledging

### 5. **The Modes Work Together**
No single mode serves all needs. Comprehensive documentation uses all four, with thoughtful linking between them. The modes complement each other.

### 6. **Functional Quality Must Precede Deep Quality**
Documentation must be accurate, consistent, complete, and precise before it can feel good to use. Diataxis supports meeting these functional standards and creates conditions for deep quality.

### 7. **Diataxis is a Decision Tool, Not a Template**
The framework helps you make deliberate choices about documentation structure. Use it to clarify what each piece should accomplish, not as a rigid template to fill.

---

## Conclusion: Why Structure Matters

Diataxis succeeds because it's grounded in how people actually learn and work. Rather than imposing arbitrary categories, it recognizes that skilled practitioners operate within two fundamental dimensions: the need to learn and the need to work, the need for action and the need for understanding.

By honoring these dimensions separately, documentation becomes clearer, more useful, and more satisfying. Users find what they need when they need it. Learners aren't distracted by reference material. Workers aren't delayed by explanations. Teachers aren't burdened with writing goal-oriented instructions.

The result: documentation that serves actual human needs.

---

## Reference: URL Locations

- Main Theory Page: https://diataxis.fr/theory/
- Tutorials Explanation: https://diataxis.fr/tutorials/
- How-to Guides Explanation: https://diataxis.fr/how-to-guides/
- Reference Explanation: https://diataxis.fr/reference/
- Explanation Explanation: https://diataxis.fr/explanation/
- Foundations: https://diataxis.fr/foundations/
- Using as a Compass: https://diataxis.fr/compass/
- Quality Principles: https://diataxis.fr/quality/

---

*Document Created: December 2025*
*Source: Complete research of https://diataxis.fr/ theory pages*
*This reference synthesizes the complete Diataxis framework for use in documentation auditing and structure.*
