# Jacob Kaplan-Moss: Great Documentation Principles

## Introduction

Jacob Kaplan-Moss's documentation philosophy is rooted in pragmatism and audience-centered thinking. Rather than treating documentation as an afterthought, he views it as a core component of software that requires the same rigor as code. His approach emphasizes:

- **Audience diversity**: Different users need different types of documentation
- **Accessible writing**: Documentation should be optimized for how people actually read online
- **Collaborative quality**: Even skilled writers need editorial oversight
- **Multiple formats**: No single documentation approach serves all purposes

Kaplan-Moss writes from experience with Django and other large open-source projects, bringing real-world perspective on what works and what fails in practice.

---

## Core Principles

### 1. **Multiple Documentation Formats Are Essential**

**Why It Matters:**
Documentation serves fundamentally different purposes for different users. No single format works for all—learners, practitioners, and reference seekers have vastly different needs. Projects that try to serve all audiences with one document type fail everyone.

**How to Apply:**
Provide three complementary formats:

#### **Tutorials (Getting Started)**
- **Purpose**: Introduce newcomers to the project, providing quick early wins
- **Target**: Users unfamiliar with the project who need hands-on learning
- **Key Characteristics**:
  - Completable within 30 minutes—critical for maintaining engagement
  - Works reliably across different environments and setups
  - Avoids being trivially easy; maintains appropriate learning curve
  - Showcases the project's overall feel and core features
  - Creates confidence through demonstrated success

#### **Topical Guides (Conceptual Deep Dives)**
- **Purpose**: Comprehensive exploration of specific topics and features
- **Target**: Users who already understand basics and want mastery
- **Key Characteristics**:
  - Help readers feel "very comfortable with the topic"
  - Explain interconnections between concepts
  - Provide conceptual foundation, not step-by-step instructions
  - Should be in official documentation, not relegated to external books (which become outdated)

#### **Reference Material (API Documentation)**
- **Purpose**: Complete, exact details for implementation
- **Target**: Experienced users who know what they're looking for
- **Key Characteristics**:
  - Provides precise specifications for functions, parameters, return values
  - Assumes reader familiarity with the domain
  - Organized for quick lookup, not learning
  - **Critical**: Must be hand-written and deliberately organized (auto-generated documentation is "almost worthless")

**Integration Strategy:**
These three formats work together: tutorials build confidence and foundational understanding, guides explain the conceptual "why," and reference material provides the technical "how."

---

### 2. **Technical Writing Requires Writing Skill First**

**Why It Matters:**
Documentation quality depends fundamentally on writing ability. Many technical people underestimate the importance of writing skill, assuming that "explaining code" is different from "writing well." In reality, clear thinking and clear writing are inseparable. Poor writing obscures ideas, even good ones.

**How to Apply:**

#### **Build Writing Foundations**
The best way to learn technical documentation is to first learn how to write (anything). This means:
- Writing frequently across different contexts
- Reading widely to develop sense of style and clarity
- Studying established writing principles
- Practicing writing for readers, not for yourself

#### **Grammar and Consistency Matter**
Correct grammar serves a functional purpose: "it helps us clearly communicate our thoughts without ambiguity or confusion." This isn't about pedantry—it's about clarity.

- Use an established style guide consistently (don't need to be perfect, just consistent)
- Focus on clarity over strict adherence to any single rule
- Maintain consistency within your project (whatever style you choose, apply it uniformly)

---

### 3. **Online Writing Has Specific Requirements**

**Why It Matters:**
Digital reading is fundamentally different from print. People skim, scan, and skip. They read on screens of varying sizes and often while multitasking. Documentation that works on paper fails online. Writers must optimize for how people actually read, not how they ideally should read.

**How to Apply:**

#### **Structure for Scanning**
- Use headers as stopping points and navigation aids
- Use short paragraphs (5-6 sentences maximum)
- Use lists and tables to break up dense information
- Use code blocks to highlight examples
- Use emphasis (bold, italics) liberally to guide the eye

#### **Write Conversationally**
- Use contractions ("don't" instead of "do not")
- Use conjunctions naturally ("and" instead of awkward restructuring)
- Include personal voice where appropriate (use "I" when it helps)
- Adopt a tone that feels human, not robotic or overly formal
- Maintain consistent pronoun usage (decide whether you're addressing "you" or using passive construction, then stay consistent)

#### **Prioritize Active Voice and Reader Action**
- Structure sentences around what the reader does
- Make the reader the subject of sentences when possible
- Move away from abstract, passive constructions
- Focus on outcomes the reader cares about

#### **Eliminate Distracting Elements**
- Remove vague or unnecessary words:
  - "pretty" (just delete it or be specific)
  - "most" (use percentages or say "many")
  - "different" (describe what's different, don't just label it)
- Avoid written tics that distract readers
- Don't use words in ways that make the text sound unnatural

---

### 4. **Editorial Review Is Essential to Quality**

**Why It Matters:**
Even experienced writers have a "dirty little secret: they're not really that good at writing." Writers are blind to their own work—they unconsciously fill in gaps, overlook errors, and assume clarity they didn't actually achieve. No writer catches all their own mistakes.

This isn't a flaw—it's how reading works. When you know what you intended to write, you see what you meant, not what you actually wrote. External eyes are not optional; they're fundamental to quality.

**How to Apply:**

#### **Get Editorial Review**
- Don't edit others' documentation unsolicited (respect for volunteers in open source)
- Establish a process where review is expected and built in
- Treat documentation review as seriously as code review

#### **Effective Editorial Process**

**For Self-Editing:**
- Separate writing from editing (physically move to a different location)
- Wait between drafting and revising (at least hours, preferably a day or two)
- Change document margins or formatting to make text appear fresh
- Read slowly and deliberately—even subvocalize text to catch errors
- Make multiple passes (typically 2-3 rounds find ~90% of errors per pass)

**For External Review:**
- Print and edit on paper with red ink (people catch more mistakes on physical media than screens)
- Read deliberately and slowly—don't skim
- Check for consistency with established style guide
- Ensure explanations make sense to someone unfamiliar with the topic
- Apply the same style rules uniformly throughout

---

## Practical Techniques

### Documentation Type-Specific Approaches

#### **Tutorial Writing**
1. **Define a realistic scope** - Aim for 30-minute completion
2. **Test in target environment** - Ensure it works across different setups
3. **Show, don't tell** - Use concrete examples and code samples
4. **Provide immediate feedback** - Let users see their progress
5. **Showcase key features** - Let users experience what the project is good at
6. **Avoid oversimplification** - Maintain enough complexity to be interesting

#### **Guide Writing**
1. **Start with conceptual foundation** - Explain what and why before how
2. **Use examples liberally** - Concrete examples clarify abstract concepts
3. **Connect concepts** - Show how different parts relate to each other
4. **Organize hierarchically** - Use clear structure with descriptive headings
5. **Provide paths through content** - Help readers understand progression from basics to advanced
6. **Keep documentation official** - Don't outsource to books or blogs (they become outdated)

#### **Reference Writing**
1. **Organize for lookup** - Group by functionality, not alphabetically
2. **Provide parameter details** - Document types, defaults, constraints
3. **Show examples** - Include code samples showing actual usage
4. **Hand-write deliberately** - Never use auto-generated documentation alone
5. **Add contextual links** - Reference related topics and guides
6. **Include edge cases** - Document behavior at boundaries and limits

### Writing Process and Workflow

1. **Separate writing and editing phases** - Different mindsets required
2. **Build in multiple review rounds** - Plan for 2-3 passes minimum
3. **Use consistent formatting** - Apply same style throughout entire project
4. **Create a style guide** - Establish conventions for your project
5. **Test documentation** - Ensure tutorials work and examples are accurate
6. **Version documentation** - Keep it with code; update when code changes

### Quality Control Techniques

- **Checklist-based review** - Use consistent criteria for all documentation
- **Readability assessment** - Have non-expert read instructions and guide explanations
- **Accuracy verification** - Test all code examples and tutorials
- **Style consistency check** - Review for uniform voice, terminology, and formatting
- **Cross-reference validation** - Ensure links and references are accurate

---

## Quality Indicators

### Characteristics of Well-Documented Projects

1. **Multiple documentation types present** - Tutorials for beginners, guides for intermediate users, reference for advanced
2. **Clear, readable prose** - Writing that's easy to follow even when explaining complex topics
3. **Up-to-date content** - Documentation kept current with code changes
4. **Tested examples** - Code samples that actually work when followed
5. **Consistent style and voice** - Uniform terminology and formatting throughout
6. **Evidence of editorial review** - Text that's been carefully read and refined
7. **Appropriate scope** - Tutorials that complete in reasonable time, guides that provide depth
8. **Organized for findability** - Clear structure making navigation intuitive
9. **Audience awareness** - Different sections targeted to different skill levels
10. **Complete coverage** - Documentation that addresses major features and use cases

### Red Flags Indicating Documentation Problems

1. **Only auto-generated reference documentation** - No guides or conceptual material
2. **Out-of-date examples** - Code that doesn't run or conflicts with current releases
3. **Inconsistent voice or style** - Clearly written by different people with no editing
4. **Dense paragraphs and no structure** - Hard to scan; requires intensive reading
5. **No tutorials for newcomers** - High barrier to entry for new users
6. **Vague or incomplete specifications** - Reference material that doesn't fully explain behavior
7. **Unmaintained documentation** - Clearly hasn't been touched in a long time
8. **Unexplained jargon** - Assumes reader knowledge not explicitly taught
9. **No obvious path for users** - Readers can't find where to start or how to progress
10. **Grammatical errors and typos** - Suggests lack of editorial oversight

---

## Common Pitfalls and What to Avoid

### 1. **Relying on Auto-Generated Reference Documentation**
**Problem**: Tools can extract function signatures and parameters but can't explain purpose, usage patterns, or when to use one approach over another.

**Solution**: Hand-write reference material that provides context and examples alongside technical specifications.

---

### 2. **Conflating Tutorials with Guides**
**Problem**: Creating a single long document trying to be both introductory and comprehensive satisfies neither audience.

**Solution**: Separate these explicitly. Tutorials are short, focused, and goal-oriented. Guides are comprehensive and conceptual.

---

### 3. **Moving Documentation Out of the Project**
**Problem**: Relegating content to external books or blog posts means it becomes outdated as the project evolves.

**Solution**: Keep all documentation in the official repository, versioned with the code, and updated when features change.

---

### 4. **Writing for Yourself, Not Your Reader**
**Problem**: Writers who know the system well unconsciously skip explanations and make assumptions about reader knowledge.

**Solution**: Have non-expert readers review documentation. They catch gaps writers don't see.

---

### 5. **Treating Documentation as Finished Work**
**Problem**: Documentation written once, then abandoned. As code changes, documentation becomes inaccurate.

**Solution**: Treat documentation as living content. Review and update with each release or major change.

---

### 6. **Skipping Editorial Review**
**Problem**: Assuming good writing requires no review or that small errors don't matter.

**Solution**: Build editorial review into your process. Assign someone to read all documentation with fresh eyes before release.

---

### 7. **Using Poor Online Formatting**
**Problem**: Writing like print documentation—long paragraphs, minimal structure, few visual breaks.

**Solution**: Optimize explicitly for digital reading: short paragraphs, strategic headers, liberal use of lists and emphasis.

---

### 8. **Assuming One Documentation Approach Fits All**
**Problem**: Choosing one format (reference, tutorial, or guide) and trying to make it serve all purposes.

**Solution**: Provide all three formats. Different users learn differently; meet them where they are.

---

## Integration with Development Workflow

### Documentation as a Development Practice

1. **Write documentation as you code** - Document features when implementing them, not later
2. **Include documentation in code review** - Treat doc changes with same rigor as code changes
3. **Version documentation with code** - Keep docs in version control, update with features
4. **Test documentation like code** - Run tutorials, verify examples, check reference accuracy
5. **Assign documentation ownership** - Make someone responsible for overall quality and consistency
6. **Plan documentation in features** - Document new features isn't optional; it's part of the feature
7. **Review documentation in releases** - Before release, audit all documentation for accuracy and currency

### Process Integration Points

- **Code review**: Documentation changes reviewed alongside code
- **Release planning**: Documentation updates planned and completed before release
- **Issue tracking**: Documentation bugs tracked like code bugs
- **Testing**: Tutorial and example testing included in QA
- **Community contribution**: Clear guidelines for documentation contributions

---

## Key Takeaways

### 7 Core Practices for High-Quality Documentation

1. **Provide Multiple Formats**
   - Write tutorials (30-minute guided introductions)
   - Create guides (comprehensive conceptual coverage)
   - Develop reference material (hand-written, organized)
   - Stop using auto-generated documentation as your primary reference

2. **Master Writing Fundamentals**
   - Read widely and write frequently
   - Use an established style guide consistently
   - Focus on clarity over perfection
   - Remember: technical writing begins with writing skill

3. **Optimize for Digital Reading**
   - Use short paragraphs (5-6 sentences max)
   - Structure with headers, lists, and code blocks
   - Write conversationally with contractions and personal voice
   - Eliminate vague words and writing tics
   - Make the reader the subject of sentences

4. **Implement Editorial Review**
   - Separate writing from editing phases
   - Read documentation with fresh eyes (wait, move location, change formatting)
   - Have external reviewers check for clarity and accuracy
   - Expect to make 2-3 editing passes
   - Use physical media (paper and red ink) for detailed editing

5. **Keep Documentation Current**
   - Store documentation in your repository, versioned with code
   - Update documentation when features change
   - Test all examples and tutorials regularly
   - Treat documentation bugs as seriously as code bugs
   - Plan documentation as part of feature development

6. **Know Your Audience**
   - Remember different users have different needs
   - Tutorials for new users (quick, concrete, confidence-building)
   - Guides for intermediate users (deep understanding, conceptual)
   - Reference for experienced users (fast lookup, precise)
   - Have non-expert readers review for clarity

7. **Make Documentation a Development Practice**
   - Include documentation in code review process
   - Assign someone responsibility for overall documentation quality
   - Test documentation like you test code
   - Review documentation as part of release process
   - Don't outsource documentation to external platforms—keep it official

---

## Relationship to Other Documentation Frameworks

While Jacob Kaplan-Moss's approach predates the Diataxis framework (published later), his work directly addresses implementation and quality. Where Diataxis provides structural theory about documentation types, Kaplan-Moss emphasizes:

- **Practical execution** over theoretical categories
- **Writing skill** as foundational (not assumed)
- **Editorial process** as non-negotiable
- **Audience diversity** requiring different formats
- **Maintenance and currency** as critical

Both frameworks agree on the necessity of multiple documentation types, but Kaplan-Moss provides pragmatic guidance on *how to write* each type well, not just *what types to write*.

---

## Conclusion

Kaplan-Moss's great documentation principles center on a simple truth: **documentation is a product like code, requiring writing skill, deliberate format selection, audience awareness, and rigorous editorial oversight.** Projects don't fail at documentation because they lack information—they fail because of poor writing, inappropriate format choices, lack of editorial review, and documentation that falls behind as code evolves.

Great documentation requires:
- Recognizing that writing quality matters
- Accepting that even good writers need editors
- Providing multiple formats for different audiences
- Optimizing explicitly for how people read online
- Treating documentation as a practice, not an afterthought

The good news: these are all learnable skills that follow clear principles. Anyone willing to apply them can dramatically improve their documentation quality.
