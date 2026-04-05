---
name: shipping-and-launch
description: Runs release-readiness checks before rollout. Use when preparing to deploy, cutting a release, or deciding whether a change is safe to expose broadly.
---

# Shipping and Launch

## Overview
Before rollout, confirm the change is understood, verified, and recoverable.

## When to Use
- Deployment prep
- Release checklists
- Rollout decisions for risky changes

## Workflow
1. Confirm scope, risk level, and user impact.
2. Ensure required verification has actually run.
3. Review configuration, migrations, dependencies, and rollout sequencing.
4. Confirm monitoring, logs, and rollback expectations.
5. Identify release blockers and unresolved follow-ups.
6. Do not label a launch ready if rollback is unclear.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| The tests passed, so launch is obvious | Deploy risk also includes config, data, rollout, and recovery. |
| We can improvise rollback if needed | Unplanned rollback is slow and error-prone under pressure. |

## Red Flags
- Launch approved without rollback thinking
- Verification evidence missing or stale
- Follow-ups silently reclassified as post-release work

## Verification
- [ ] Release blockers are resolved or explicit
- [ ] Rollback path is known
- [ ] Monitoring or validation plan exists

