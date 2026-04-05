---
name: browser-verification
description: Verifies browser behavior with project-available runtime tools. Use when UI work needs runtime checks, screenshots, console review, network inspection, or real-browser confirmation.
---

# Browser Verification

## Overview
When a change runs in a browser, verify runtime behavior with the tools already available in the project or environment.

## When to Use
- Browser-only bugs
- UI behavior that static review cannot prove
- Layout, focus, network, or console issues

## Workflow
1. Identify the exact runtime behavior to prove.
2. Check what browser tooling the project already uses: local browser, test runner, screenshots, Playwright, Cypress, or manual repro steps.
3. Capture the smallest useful runtime evidence: console output, screenshot, DOM state, network result, or reproduction steps.
4. Compare actual behavior to the expected behavior.
5. Fix the issue and rerun the same proof.
6. Record any gaps that still need manual confirmation.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| Unit tests are enough for everything in the UI | Rendering, layout, and runtime state often need browser proof. |
| I will check the browser later | Deferred runtime checks are easy to skip. |

## Red Flags
- UI marked complete without runtime confirmation
- Console errors ignored because the page still renders
- Visual regressions unverified

## Verification
- [ ] Runtime proof exists for the claimed behavior
- [ ] Console and obvious interaction regressions were checked
- [ ] Remaining manual checks are explicit

