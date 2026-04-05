---
name: security-and-hardening
description: Applies security review at trust boundaries. Use when handling input, auth, secrets, storage, external integrations, or any change that widens exposure.
---

# Security and Hardening

## Overview
Treat every boundary as hostile until validated.

## When to Use
- User input or file input
- Authentication or authorization
- Secrets, storage, or external integrations
- Public endpoints or privileged actions

## Workflow
1. Identify inputs, outputs, trust boundaries, and privileged operations.
2. Validate and normalize data at boundaries.
3. Check authorization decisions close to the action they protect.
4. Review secret handling, logging, and error messages for leakage.
5. Review dependency or integration risk using the tooling appropriate to the project.
6. Add tests or checks for misuse paths where practical.
7. Document any residual risk or follow-up hardening work.

## Common Rationalizations
| Rationalization | Reality |
|---|---|
| Internal tools do not need hardening | Internal systems still have users, credentials, and attack paths. |
| Validation in one layer is enough everywhere | Data crosses multiple boundaries and assumptions drift. |

## Red Flags
- Secrets in code or logs
- Missing authorization checks
- Trusting external or user-controlled data implicitly

## Verification
- [ ] Inputs and boundaries were reviewed
- [ ] Sensitive data handling was checked
- [ ] Misuse paths were considered or tested

