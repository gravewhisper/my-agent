---
name: deprecation-and-migration
description: Plans removal or replacement of existing behavior safely. Use when sunsetting APIs, modules, flows, or legacy systems with current consumers.
---

# Deprecation and Migration

## Overview
Removing or replacing behavior safely requires a migration path, not just a warning.

## When to Use
- API or interface removal
- Legacy system replacement
- Behavior changes with active consumers

## Workflow
1. Identify who depends on the current behavior.
2. Decide whether the change is advisory, staged, or compulsory.
3. Provide a migration path and compatibility window when needed.
4. Update docs, warnings, and examples.
5. Verify that the replacement actually covers the required behavior.
6. Remove dead paths only when the migration is complete or explicitly accepted.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| Nobody uses the old path anymore | Observable behavior often has hidden consumers. |
| A warning message is a migration plan | Users need a path, timeline, and proof that the replacement works. |

## Red Flags
- Removal without consumer analysis
- Replacement differs in subtle but breaking ways
- No migration timeline or verification

## Verification
- [ ] Consumers and impact were considered
- [ ] Migration path is documented
- [ ] Removal conditions are explicit

