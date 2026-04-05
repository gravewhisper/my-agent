---
name: planning-and-task-breakdown
description: Breaks scoped work into small verified tasks. Use when a spec exists or a change needs ordered steps with acceptance criteria.
---

# Planning and Task Breakdown

## Overview
Decompose work into small tasks that can be implemented and verified one at a time.

## When to Use
- After a spec is approved
- Before a multi-file change
- When work feels tangled or oversized

## Workflow
1. Restate the goal and constraints.
2. List the affected layers, files, or subsystems.
3. Split the work into thin vertical slices.
4. For each task, define acceptance criteria and how it will be verified.
5. Order tasks by dependency and risk.
6. Mark tasks that require user confirmation before proceeding.
7. Start with the smallest slice that proves the direction.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| We can just keep a plan in our head | Hidden plans break as soon as complexity increases. |
| One big task is faster | Large tasks hide risk and make verification weaker. |

## Red Flags
- Tasks are phrased as broad phases, not concrete units
- Verification is missing
- Dependencies are unclear

## Verification
- [ ] Tasks are ordered and independently understandable
- [ ] Each task has acceptance criteria
- [ ] Verification exists for each task

