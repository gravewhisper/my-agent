---
name: api-and-interface-design
description: Designs stable APIs and module boundaries. Use when defining request shapes, public interfaces, contracts, or cross-module integration points.
---

# API and Interface Design

## Overview
Be intentional about what you expose. Public behavior becomes a contract.

## When to Use
- Designing endpoints
- Defining library or module interfaces
- Changing contracts between layers

## Workflow
1. Identify the callers, consumers, and trust boundaries.
2. Define the contract first: inputs, outputs, errors, and invariants.
3. Inspect existing interfaces and compatibility constraints.
4. Minimize what is exposed and document what is guaranteed.
5. Validate at boundaries and normalize error behavior.
6. Check whether the change creates migration or compatibility risk.
7. Implement only after the contract is clear.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| We can clean up the API later | Interface cleanup gets harder once callers depend on it. |
| Internal details do not matter if tests pass | Leaky internals become accidental public behavior. |

## Red Flags
- Ambiguous error handling
- Inconsistent naming or types
- Compatibility impact ignored

## Verification
- [ ] Contract is explicit
- [ ] Boundary validation is defined
- [ ] Compatibility and migration concerns were considered

