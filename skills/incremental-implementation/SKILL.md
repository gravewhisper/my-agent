---
name: incremental-implementation
description: Implements changes in small verified slices. Use when touching more than one file, changing behavior, or when safe iteration matters.
---

# Incremental Implementation

## Overview
Build one small slice at a time, verify it, then continue.

## When to Use
- Multi-file changes
- Behavior changes
- Work with non-trivial risk or uncertainty

## Workflow
1. Read the next planned task and its acceptance criteria.
2. Inspect the relevant files, types, tests, and existing patterns.
3. Change the minimum code required for the current slice.
4. Run the narrowest relevant verification first.
5. Expand verification to broader tests or builds if the slice passes.
6. Summarize what changed and what remains.
7. Commit only if appropriate for the repo and user workflow.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| It is faster to do all layers at once | Big jumps make failures harder to localize. |
| I can verify at the end | Late verification stacks unknowns. |

## Red Flags
- Large unverified edits
- Refactors mixed with behavior changes without reason
- No checkpoint after each slice

## Verification
- [ ] Each slice is small and purposeful
- [ ] Relevant checks ran after each slice
- [ ] Remaining work is explicit

