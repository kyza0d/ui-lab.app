
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Package Manager: This project uses `pnpm` for package management.

Development Setup: Use `pnpm dev` to start both frontend (Next.js with Turbopack) and backend (Convex) in parallel. For frontend-only work, use `pnpm dev:frontend`. For backend-only, use `pnpm dev:backend`. Run `pnpm predev` to ensure the Convex backend is ready before starting the frontend.

Build Commands: **NEVER run `pnpm build` unless explicitly asked by the user.** The build process is time-consuming and should only be executed when the user specifically requests it or when preparing for deployment.

Testing & Quality: No specific test commands are configured. Linting is your primary quality check.

Code Style: NEVER use comments. Write self-documenting code with clear variable names, function names, and logical structure. Favor compact, efficient code by minimizing unnecessary spacing and newlines. Group logically related statements on the same lines when it enhances readability without sacrificing clarity. Prioritize concise implementations that are still easy to understand over verbose code with extensive formatting.

## Key Instruction Override

**DO NOT create markdown files, summaries, analysis documents, or any other supplementary files.** When asked to analyze the implementation or thoroughly understand the current code, do the analysis mentally or as inline comments in actual code files only. After implementing fixes, provide a brief text explanation of what was done nothing more. The goal is to fix the code and explain the fix, not to document it separately.
