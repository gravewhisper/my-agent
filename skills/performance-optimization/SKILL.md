---
name: performance-optimization
description: Optimizes performance based on measurement. Use when a performance problem is observed, performance budgets matter, or a change may cause regressions.
---

# Performance Optimization

## Overview
Measure first, optimize the right thing, and verify the result.

## When to Use
- Measured regressions
- Known hot paths
- Performance-sensitive features or workflows

## Workflow
1. Define the performance symptom and user impact.
2. Gather measurements from the project's available tooling.
3. Identify the most likely bottleneck.
4. Change one variable at a time.
5. Re-measure using the same method.
6. Keep the optimization if the gain is real and the complexity cost is acceptable.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| This code looks slow, so optimize it | Unmeasured optimization often targets the wrong bottleneck. |
| Any speedup is worth extra complexity | Complexity is also a cost. |

## Red Flags
- No baseline measurement
- Multiple speculative optimizations together
- Metrics changed between before and after

## Verification
- [ ] Baseline and after measurements exist
- [ ] The bottleneck addressed matches the symptom
- [ ] Complexity tradeoffs were considered

