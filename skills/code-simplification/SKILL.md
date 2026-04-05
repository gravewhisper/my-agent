---
name: code-simplification
description: Simplifies working code while preserving behavior. Use when code is correct but too complex, noisy, duplicated, or hard to maintain.
---

# Code Simplification

## Overview
Reduce complexity without changing behavior.

## When to Use
- Working code is hard to read
- Excess branching, duplication, or indirection
- Refactors intended to improve maintainability

## Workflow
1. Confirm the behavior that must stay unchanged.
2. Identify the specific source of complexity.
3. Simplify one dimension at a time: naming, duplication, control flow, indirection, or dead code.
4. Re-run relevant verification after each step.
5. Stop when the code becomes straightforward; do not churn for novelty.
6. Keep the diff reviewable.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| Shorter automatically means simpler | Dense clever code is often harder to maintain. |
| Since behavior should not change, tests are unnecessary | Refactors still break behavior. Verify them. |

## Red Flags
- Simplification increases cleverness or indirection
- Behavior changes without being acknowledged
- Huge cleanup diff with no checkpoints

## Verification
- [ ] Behavior is preserved
- [ ] Complexity is measurably lower or easier to explain
- [ ] Relevant checks ran after changes

