---
name: documentation-and-adrs
description: Captures architectural decisions and operational knowledge. Use when a change alters system behavior, public interfaces, or important long-term decisions.
---

# Documentation and ADRs

## Overview
Document the why behind important changes so future work does not depend on archaeology.

## When to Use
- Architecture or interface changes
- Important tradeoffs or irreversible decisions
- Features that need operational or usage docs

## Workflow
1. Identify what future readers will need to understand.
2. Record the context, decision, alternatives, and consequences.
3. Link the documentation to the code, interface, or migration path it explains.
4. Keep docs specific to the real system, not generic aspirations.
5. Update docs when the implementation or decision changes.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| The code explains itself | Code rarely captures rejected alternatives and decision context. |
| We can document it after release | Deferred docs are often never written or are inaccurate. |

## Red Flags
- Architectural changes with no recorded rationale
- Docs drift from actual behavior
- Documentation repeats obvious code but omits tradeoffs

## Verification
- [ ] Decision context and consequences are recorded
- [ ] Docs point to the relevant code or interface
- [ ] Future readers can understand the change without guesswork

