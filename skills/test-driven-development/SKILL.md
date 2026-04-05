---
name: test-driven-development
description: Uses tests as the primary proof of behavior. Use when changing logic, fixing bugs, or implementing behavior that should be protected against regressions.
---

# Test-Driven Development

## Overview
Use tests to define behavior, drive implementation, and prove the change works.

## When to Use
- Logic changes
- Bug fixes
- Behavior that needs durable regression protection

## Workflow
1. Identify the behavior to prove.
2. Find the existing test style and smallest relevant test layer.
3. Write or update a failing test when practical.
4. Implement the minimum code needed to pass.
5. Refactor while keeping the tests green.
6. Run broader checks if the change crosses boundaries.
7. If failures are unclear, switch to `debugging-and-error-recovery`.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| I will add tests after the fix | Late tests often miss the original intent and edge cases. |
| Manual inspection is enough | Repeatable proof beats memory and eyeballing. |

## Red Flags
- Assertions too weak to catch regressions
- Test helpers obscure the behavior being proven
- No test added for a bug fix that should stay fixed

## Verification
- [ ] The changed behavior is explicitly tested or otherwise strongly proven
- [ ] Tests are understandable and targeted
- [ ] Broader checks ran when the change crossed boundaries

