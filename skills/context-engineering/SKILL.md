---
name: context-engineering
description: Loads and manages the right project context for Pi. Use when starting a task, switching scope, or when output quality drops because the wrong files or assumptions are in play.
---

# Context Engineering

## Overview
Give Pi the minimum context needed to act correctly, then add more only when necessary.

## When to Use
- Starting a task
- Switching features or subsystems
- When the model is confused or drifting

## Workflow
1. Define the goal, scope, and what should not be touched.
2. Use `bash` with `rg`, `find`, or project commands to locate the relevant files.
3. Use `read` to inspect only the files needed to understand the task.
4. Summarize current behavior, desired behavior, and open questions.
5. Load additional context progressively: tests, types, examples, docs, error output.
6. If context is getting noisy, restate the working model or use `/handoff`.
7. Before editing, confirm that the loaded context is enough to make a safe change.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| More files always help | Extra context dilutes focus and increases mistakes. |
| I can edit first and understand later | Early edits on shaky context create churn. |

## Red Flags
- Reading huge files without narrowing scope first
- Changing code before locating the source of truth
- Repeating wrong assumptions across turns

## Verification
- [ ] Goal, scope, and constraints are explicit
- [ ] Relevant files were found before deep reading
- [ ] The current working model is coherent enough to act on

