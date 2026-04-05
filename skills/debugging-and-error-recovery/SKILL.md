---
name: debugging-and-error-recovery
description: Provides a structured debugging workflow. Use when tests fail, builds break, output is unexpected, or the source of a bug is unclear.
---

# Debugging and Error Recovery

## Overview
Debug methodically: reproduce, localize, reduce, fix, and guard.

## When to Use
- Failing tests
- Build or runtime errors
- Unexpected behavior with unclear cause

## Workflow
1. Reproduce the problem reliably.
2. Narrow the failing area using logs, targeted commands, or smaller repros.
3. Reduce the problem until the failure is understandable.
4. Form a concrete hypothesis and change one thing at a time.
5. Verify the fix with the original failing proof.
6. Add or strengthen guards: tests, validation, assertions, or docs.
7. If you are guessing, stop and gather better evidence.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| I know what the bug probably is | Probable causes are not proof. Reproduce first. |
| I can fix several suspected issues at once | Multi-change debugging hides the real cause. |

## Red Flags
- Fixes attempted before a reliable repro exists
- Multiple speculative edits per iteration
- Original failure never rerun after the fix

## Verification
- [ ] The bug was reproduced before the fix
- [ ] The root cause is plausible and evidence-backed
- [ ] The original failing proof now passes

