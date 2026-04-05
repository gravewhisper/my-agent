---
name: ci-cd-and-automation
description: Designs or reviews automation pipelines. Use when changing CI, deployment workflows, quality gates, or repetitive manual processes that should be codified.
---

# CI/CD and Automation

## Overview
Automate the checks and release steps that keep changes safe and repeatable.

## When to Use
- CI pipeline changes
- Release automation
- Build, test, or deployment workflow changes

## Workflow
1. Identify the current manual and automated gates.
2. Decide which checks belong early versus late in the pipeline.
3. Reuse the project's existing commands for linting, tests, builds, type checks, and deploy steps.
4. Keep feedback fast for common failures.
5. Handle secrets and environment-specific settings carefully.
6. Test the pipeline logic with the smallest safe proof.
7. Document rollback or failure-handling expectations.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| Automation can be added after the feature ships | Missing automation allows regressions and repeated manual toil. |
| More steps always make CI safer | Slow noisy pipelines get bypassed or ignored. |

## Red Flags
- Secrets embedded in workflow definitions
- No rollback plan for deploy automation
- Critical checks missing or in the wrong place

## Verification
- [ ] Required checks are codified
- [ ] Feedback order is sensible
- [ ] Failure and rollback paths are documented

