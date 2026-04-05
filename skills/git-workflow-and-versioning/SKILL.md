---
name: git-workflow-and-versioning
description: Applies disciplined git hygiene to code changes. Use when organizing work, reviewing diffs, or deciding how to checkpoint and structure a change set.
---

# Git Workflow and Versioning

## Overview
Use version control as a safety net and communication tool.

## When to Use
- During any repo-based change
- When splitting work into reviewable checkpoints
- When preparing history for review or rollback

## Workflow
1. Check repo state before starting.
2. Keep changes scoped and reviewable.
3. Separate unrelated refactors, features, and fixes.
4. Use clear checkpoint messages when committing is appropriate.
5. Inspect the diff before finalizing.
6. Make rollback and debugging easier by avoiding giant mixed changes.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| I will clean up the history later | Messy history usually survives into review. |
| One big diff is easier than many small ones | Large diffs are harder to review, debug, and revert. |

## Red Flags
- Unrelated changes bundled together
- Final diff does not match the stated task
- No clear checkpoint strategy

## Verification
- [ ] Change boundaries are understandable
- [ ] Diff was inspected before finalizing
- [ ] History or checkpoints support review and rollback

