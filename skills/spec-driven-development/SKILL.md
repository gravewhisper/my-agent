---
name: spec-driven-development
description: Defines a concrete spec before implementation. Use when starting a feature, substantial refactor, or change that needs shared scope and acceptance criteria.
---

# Spec-Driven Development

## Overview
Write down what will be built, why it matters, what is in scope, and how success will be checked before coding starts.

## When to Use
- New features
- Significant refactors
- Changes with multiple files or tradeoffs

## Workflow
1. Summarize the problem and desired outcome.
2. Identify users, constraints, dependencies, and non-goals.
3. Inspect the repository for existing patterns, interfaces, and relevant docs.
4. Define success criteria and acceptance criteria.
5. Note commands or checks the repo likely uses for tests, builds, linting, or type checks.
6. Call out open questions and decisions needing user confirmation.
7. Hand the approved spec to `planning-and-task-breakdown`.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| This is too small for a spec | A short spec is still valuable for non-trivial changes. |
| The code will reveal the right design | Code is expensive feedback for unclear intent. |

## Red Flags
- Scope expands during implementation
- Success criteria are implicit
- Unknowns are hidden instead of surfaced

## Verification
- [ ] Problem, scope, non-goals, and constraints are captured
- [ ] Acceptance criteria exist
- [ ] Open questions are explicit

