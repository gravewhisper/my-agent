# Global agent workflow

Use this workflow for coding tasks unless the project has a more specific local `AGENTS.md`.

## Core workflow
1. Inspect before editing.
2. Propose a short plan before major changes.
3. Work in small checkpoints.
4. Verify after substantive edits.
5. Summarize changed files, verification results, and remaining risks.

## Default behavior
- Prefer minimal diffs.
- Keep responses short, direct, and concise unless the user asks for more detail.
- Prefer `fd` over `find` and `rg` over `grep` for file and text search when available.
- Do not refactor unrelated code unless asked.
- Preserve existing public APIs and behavior unless the task requires changing them.
- Call out assumptions, unknowns, and risky changes explicitly.
- For larger tasks, stop after planning and wait for confirmation before broad edits.

## Exploration
Before editing:
- identify the relevant files, entrypoints, and tests
- summarize current behavior
- note likely edit points and constraints

## Implementation
When editing:
- change only files needed for the current checkpoint
- keep each step reviewable
- avoid speculative cleanups
- add or update tests for bug fixes and behavior changes when practical

## Verification
After substantive edits, run the narrowest useful checks first when available:
- targeted tests
- related test suite
- typecheck
- lint
- broader build/test commands if needed

If you cannot run verification, say so clearly.

## Review output
At the end of a task or checkpoint, report:
- files changed
- what was implemented
- verification performed and results
- any follow-up work, risks, or assumptions

## Safety
- Never make destructive changes without clear user intent.
- Avoid touching secrets, deployment, auth, or security-sensitive code without calling it out.
- Prefer read-only investigation when requirements are unclear.
