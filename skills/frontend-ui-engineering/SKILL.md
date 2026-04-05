---
name: frontend-ui-engineering
description: Guides implementation of user-facing interfaces. Use when building or changing UI components, pages, interactions, responsiveness, or accessibility-sensitive flows.
---

# Frontend UI Engineering

## Overview
Build interfaces that are coherent, testable, and accessible while fitting the product's design system and existing patterns.

## When to Use
- New UI work
- Component or layout changes
- Interaction and accessibility fixes

## Workflow
1. Inspect existing UI patterns, tokens, and shared components.
2. Clarify the user flow, states, and edge cases.
3. Build the smallest UI slice that proves structure and behavior.
4. Check keyboard flow, labels, focus, and empty/loading/error states.
5. Verify responsiveness and state handling.
6. Keep visual and interaction logic organized and reviewable.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| The visual part can be polished later | UI debt compounds quickly once structure hardens. |
| Accessibility can wait for QA | Many accessibility issues are easiest to fix during implementation. |

## Red Flags
- Missing loading, error, or empty states
- Inconsistent component patterns
- Accessibility handled only as an afterthought

## Verification
- [ ] States and flows are covered
- [ ] Keyboard and labeling basics are checked
- [ ] The implementation follows existing UI patterns

