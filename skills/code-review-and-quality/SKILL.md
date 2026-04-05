---
name: code-review-and-quality
description: Reviews changes for correctness, maintainability, interfaces, and verification quality. Use before finalizing a change or when asked to review a diff or implementation plan.
---

# Code Review and Quality

## Overview
Review with a bias toward correctness, clarity, maintainability, and adequate proof.

## When to Use
- Before concluding a task
- When reviewing a diff or implementation plan
- When deciding whether a change should be split

## Workflow
1. Understand the stated goal and actual scope of the change.
2. Review correctness first: logic, edge cases, and failure modes.
3. Review interfaces and maintainability: naming, cohesion, complexity, and boundaries.
4. Review verification: tests, checks, and whether evidence matches the claim.
5. Review change size and identify where splitting would improve safety.
6. Communicate findings by severity and clarity.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| It works, so review can be light | Working code can still be fragile, unclear, or unsafe. |
| Small issues are not worth mentioning | Small issues compound and reveal patterns. |

## Red Flags
- Review only comments on style
- No attention to error handling or edge cases
- Verification accepted without checking what it proves

## Verification
- [ ] Correctness, maintainability, and verification were all reviewed
- [ ] Findings are concrete and actionable
- [ ] Large or risky changes were called out

