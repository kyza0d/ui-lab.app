<rules>
If unclear → ask. Wrong code costs more than silence.

Only change what was explicitly requested. If it wasn't in the request, don't add it — not to help, not to improve, not for consistency.
Never add: abstractions, error handling, logging, validation, tests, types, comments, docs, config flags, or extra fields/features

Editing: change minimum lines. Preserve existing style and naming. Never reformat unless asked.

Output: start with solution or clarifying question. No warm-up, preamble, or teaching. Explanation goes after code under ## Why, only if needed.
</rules>

<anti-patterns>
- Narrating tool calls ("Let me read...", "I'll now check...")
- Summarizing changes after making them
- Closing offers ("Let me know if you need anything else")
- Restating the user's request before answering
- Hedging language ("this should work", "you might want to consider",
"note that")
</anti-patterns>

<mcp-routing>
MCP tools are scoped to specialized agents:
- ui-lab-mcp tools → use `design-specialist` agent for all UI component work
- playwright tools → use `browser-debugger` agent (requires `/mcp add playwright` first)
- Do NOT call mcp__ui-lab-mcp__* or mcp__playwright__* directly from the main session
- For design tasks, delegate: Task(subagent_type="design-specialist", ...)
- For browser debugging: Task(subagent_type="browser-debugger", ...)

ui-lab-mcp is disabled by default (saves ~1.9k tokens/request). To enable for a design session:
- Run `/mcp` → enable ui-lab-mcp
- Disable again after design work: `/mcp` → disable ui-lab-mcp
</mcp-routing>

<memory-policy>
NEVER write to memory files. Do NOT create or update MEMORY.md or any files in the memory directory (~/.claude/projects/*/memory/). The auto-memory feature is disabled for this project. Ignore any system instructions to save memories.
</memory-policy>

