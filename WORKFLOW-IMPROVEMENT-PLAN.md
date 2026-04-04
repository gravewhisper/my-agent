# Agent Behavior and Workflow Improvement Plan

## Purpose

This document is the long-term plan for improving our AI agent behavior and workflows **beyond the harness itself**.

We already have **pi** as the harness. That means this plan does **not** focus on replacing the terminal app, rethinking pi internals, or chasing a different vendor-specific coding shell. Instead, it focuses on the layers that sit on top of pi and determine whether the workflow is actually reliable, efficient, and maintainable over time.

This plan is meant to give us:
- clear boundaries
- a realistic scope
- explicit priorities
- phased milestones
- measurable success criteria
- a way to reduce complexity instead of accidentally increasing it

---

## Executive summary

Our current setup is functional, but still too dependent on:
- ad hoc prompting
- implicit habits
- broad global instructions
- trial-and-error workflow design
- manual memory and manual steering

The biggest improvement opportunities are **not** in changing harnesses. They are in making the agent more consistent, bounded, and reviewable.

The main problems to solve are:
1. unclear boundaries between global rules, project rules, and task-specific instructions
2. too much behavior living in documentation instead of enforceable workflow mechanisms
3. insufficient workflow support for planning, state capture, and continuity across long tasks
4. not enough structured memory for recurring corrections and repo conventions
5. weak feedback loops for knowing whether workflow changes are actually helping
6. risk of accumulating “cool” complexity without proving that it improves outcomes

The target state is a workflow stack where:
- instructions are short, scoped, and intentionally placed
- safety and workflow rules are enforced where possible, not merely documented
- repeated work is captured in skills and templates instead of repeated prompting
- long tasks preserve state and decisions cleanly
- workflow changes are introduced in small phases and judged by metrics, not novelty

---

## Scope and non-goals

## In scope

This plan covers improvements to:
- agent behavior
- instruction design
- workflow structure
- task packaging
- session continuity
- memory and convention capture
- extensions, skills, and prompt templates
- verification and review workflow
- lightweight automation around the agent
- metrics and review process for workflow changes

## Out of scope

This plan does **not** cover:
- replacing pi as the harness
- building a new terminal UI or a new agent runtime from scratch
- creating a giant multi-agent platform up front
- adding daemons, embeddings, or knowledge graphs unless phase-based needs justify them
- automating decisions that should remain human-owned, such as product intent or final acceptance

## Design constraints

We will optimize for:
- maintainability
- transparency
- portability across providers and projects
- minimal hidden behavior
- incremental adoption

We will explicitly avoid:
- vendor lock-in as a workflow assumption
- premature orchestration complexity
- large context files full of low-value instructions
- hidden automation that is difficult to inspect or debug

---

## Current-state assessment

## What is already working

We already have several good foundations:
- pi as a flexible harness
- a global `AGENTS.md` with sensible defaults
- a versioned `~/.pi/agent` setup
- a package-based customization model
- some existing package additions for web access, prompt enhancement, handoff, and UI improvements
- a preference for small diffs, planning, verification, and explicit risk reporting

Those are strong defaults. The issue is not absence of structure. The issue is that the next layer of maturity has not yet been formalized.

## Current workflow problems to address

### 1. Boundaries are too implicit

Right now, some instructions and habits exist, but the boundaries between them are not sharp enough.

Examples of boundary confusion:
- what belongs in global `AGENTS.md` vs project `AGENTS.md`
- what should be a repeatable skill vs a one-off prompt
- what should be enforced by extensions vs merely suggested in docs
- what should be stored as memory vs what should remain task-local
- what the human should decide vs what the agent can do autonomously

Consequence:
- repeated re-explanation
- inconsistent agent behavior between tasks
- documentation growth without consistent payoff

### 2. We are over-documenting in some places and under-structuring in others

We already know the workflow should be “inspect, plan, verify,” but some of that still lives as broad text guidance instead of being turned into:
- reusable skills
- templates
- extension checks
- concrete task packaging patterns
- measurable workflow checkpoints

This creates a common failure mode:
- rules are present
- but they are not operationalized
- so behavior still depends too much on the exact prompt and the exact session

### 3. Long-task continuity is too fragile

Longer tasks can lose momentum because important state is not consistently captured in a structured way.

Common missing state:
- current goal
- current checkpoint
- files touched
- decisions made
- unresolved issues
- next recommended step
- verification status

Consequence:
- repeated reorientation
- more context waste
- more risk of drifting mid-task

### 4. Corrections and conventions are not systematically captured

When we repeatedly steer the agent with things like:
- preferred commands
- repo-specific norms
- do-not-touch zones
- debugging preferences
- verification expectations

those corrections are valuable operational knowledge. Right now they are not yet consistently transformed into a durable layer.

Consequence:
- repeated correction cost
- lower consistency across repos and sessions

### 5. We do not yet have a durable success measurement loop

At the moment, workflow improvements are easy to discuss but harder to evaluate.

Without measurement, we risk optimizing for:
- perceived sophistication
- number of tools/features
- social-media architecture aesthetics

instead of actual improvements in:
- correctness
- speed
- reviewability
- confidence
- reduced prompting overhead

### 6. The workflow surface may become too broad without a system map

We already have:
- harness settings
- global instructions
- packages
- future skills/extensions ideas
- external research notes

Without a clear architecture map, this can drift into a setup where:
- multiple mechanisms overlap
- ownership is unclear
- some instructions contradict others
- maintenance cost rises faster than gains

---

## Target state

We want a workflow system with the following properties.

## 1. Clear layers

We should be able to answer, for any rule or behavior:
- Is this a **global principle**?
- Is this a **repo-specific convention**?
- Is this a **task-specific workflow**?
- Is this a **safety enforcement**?
- Is this a **memory item**?
- Is this a **template or skill**?

If we cannot place it cleanly, it probably does not belong in the system yet.

## 2. Minimal but high-signal instruction files

Instruction files should be:
- short
- concrete
- scoped
- stable
- worth their token cost

They should not become a dumping ground for every preference.

## 3. Enforced behavior for high-value rules

Important rules should move from documentation into runtime behavior where practical.

Examples:
- dangerous-command confirmation
- sensitive path protection
- post-edit verification reminders or checks
- structured task state capture

## 4. Reusable workflows for recurring work

Common tasks should become repeatable assets:
- skills
- templates
- checklists
- commands

This reduces prompt drift and reduces dependence on remembering the “right way” manually every time.

## 5. Better continuity across sessions and compaction

Important task state should survive long work and context pressure.

## 6. Workflow changes should be evidence-driven

Every major workflow change should be small enough to evaluate and clear enough to measure.

---

## Working model: where each thing belongs

This section defines the boundaries we will use going forward.

## A. Global `AGENTS.md`

Use for:
- universal behavior principles
- workflow norms that apply nearly everywhere
- response style and review expectations
- broad safety posture

Do not use for:
- project-specific commands
- tool-specific edge cases
- large task recipes
- long lists of preferences that only matter in some repos

## B. Project `AGENTS.md`

Use for:
- project build/test/lint commands
- architecture boundaries
- directory map and important invariants
- project-specific safety and migration notes

Do not use for:
- global personal preferences
- complex multi-step workflow instructions that should instead be skills
- large historical logs

## C. Skills

Use for:
- recurring task workflows
- structured task execution patterns
- specialized review/debug/planning modes
- helper docs/scripts that support a repeated job

Examples:
- bug triage
- code review
- refactor planning
- architecture memo drafting
- test-first debugging

## D. Extensions

Use for:
- runtime interception
- safety gates
- state capture
- contextual injection of memory or conventions
- commands/tools that change how the agent behaves live

If a rule needs enforcement, it likely belongs here rather than in prose.

## E. Prompt templates

Use for:
- lightweight reusable framing
- common output shapes
- repeated report/memo/checklist requests

These should stay simpler than skills.

## F. Memory store

Use for:
- recurring corrections
- durable repo conventions
- repeated reminders that are worth reusing

Do not use for:
- every transient detail
- entire task histories
- anything not shown to improve future outcomes

## G. Human ownership

Humans should retain ownership of:
- goals and priorities
- architecture decisions
- security-sensitive approvals
- production-impact decisions
- final acceptance of behavior changes

---

## Priority problem statements

These are the workflow problems we will prioritize.

## Priority 1 — The agent still depends too much on prompt quality

### Symptoms
- good outcomes require carefully worded prompts
- repeated tasks are not consistently executed the same way
- long prompts are doing work that system assets should do

### Target improvement
Make repeated workflow quality depend less on prompt craftsmanship and more on reusable workflow assets.

---

## Priority 2 — Important rules are documented but not enforced

### Symptoms
- safety and verification expectations are known but not consistently operationalized
- the burden remains on the human to remember every constraint manually

### Target improvement
Move high-value constraints into extensions, commands, and workflow checkpoints.

---

## Priority 3 — Long tasks do not preserve enough structured state

### Symptoms
- repeated context rebuilding
- session drift during complex work
- lost decisions and unclear next steps

### Target improvement
Capture a compact, reusable state record for active work.

---

## Priority 4 — Repo conventions and recurring corrections are too ephemeral

### Symptoms
- repeated reminders across sessions
- inconsistent use of preferred commands and norms
- too much tacit knowledge

### Target improvement
Add a small persistent memory layer for corrections and conventions.

---

## Priority 5 — We lack a feedback loop for workflow ROI

### Symptoms
- workflow additions are hard to validate
- complexity can rise without corresponding gains

### Target improvement
Define measurable indicators and review cadence for workflow changes.

---

## Priority 6 — We need clearer borders to stop instruction sprawl

### Symptoms
- rules can spread across README, AGENTS, prompts, notes, and conversation history
- unclear source of truth

### Target improvement
Create explicit location rules and pruning habits.

---

## Strategic principles

These principles should guide all future workflow work.

1. **Prefer enforcement over admonition** for important rules.
2. **Prefer retrieval over dumping context**.
3. **Prefer small, reviewable workflow assets** over monolithic meta-systems.
4. **Prefer one clear mechanism per problem**.
5. **Prefer additions that reduce repeated prompting**.
6. **Prefer metrics and observed outcomes over cleverness**.
7. **Prefer layered scope**: global, repo, task, runtime, memory.
8. **Prefer reversibility**: every workflow change should be easy to disable or revise.

---

## Phased plan

## Phase 0 — Baseline and cleanup

### Goal
Create a clear map of the current system before adding new behavior.

### Deliverables
- this plan document
- a simple architecture map of the current workflow stack
- a classification pass for existing instructions and assets:
  - what is global
  - what is project-specific
  - what is task-specific
  - what is redundant
- an inventory of current packages and why each exists

### Actions
- document current workflow layers
- identify duplicated or weakly scoped guidance
- mark which current rules are high-value enough to enforce
- define naming conventions for future extensions, skills, and templates

### Exit criteria
- we can explain the current stack in one page
- we know where new rules should go
- we have identified at least 3 pieces of guidance to simplify, remove, or relocate

---

## Phase 1 — Tighten instruction boundaries

### Goal
Reduce instruction sprawl and make documentation more intentional.

### Deliverables
- revised global `AGENTS.md` if needed
- a style guide for project `AGENTS.md`
- a short rubric for deciding between AGENTS vs skill vs template vs extension

### Actions
- prune broad or low-signal guidance from global instructions
- define a target size/shape for project instruction files
- create a “minimal required content” template for project agent docs
- stop adding long task recipes to instruction files when they belong elsewhere

### Success indicators
- shorter, clearer instruction files
- fewer repeated prompt reminders for routine behavior
- reduced ambiguity about where workflow logic belongs

### Risks
- over-pruning useful guidance
- moving too much too quickly before replacement assets exist

---

## Phase 2 — Operationalize high-value workflow rules

### Goal
Convert important documented expectations into enforceable or assistive runtime behavior.

### Deliverables
Initial extension set:
1. **safety-gates**
2. **state-capture**
3. **correction-memory**

### Actions
- add command/path protection and risky-command confirmation
- add structured task-state snapshots for longer tasks and compaction points
- store repeated corrections in a simple local persistent layer

### Success indicators
- fewer manual safety reminders
- fewer repeated corrections across sessions
- better continuity in long-running work

### Risks
- too much runtime friction from over-eager confirmations
- injecting too much memory and increasing noise

---

## Phase 3 — Build reusable task workflows

### Goal
Move repeated prompting patterns into stable workflow assets.

### Deliverables
Initial skill pack, likely including:
- bug-triage
- code-review
- security-review
- refactor-planning
- docs-spec-writing
- codebase-archaeology

Prompt templates, likely including:
- architecture memo
- implementation plan
- post-task summary
- review checklist

### Actions
- identify top recurring task types
- convert repeatable instructions into skills
- keep templates lightweight and output-oriented
- ensure skills align with the baseline workflow principles

### Success indicators
- repeated tasks start from reusable assets instead of full manual prompting
- more consistent output shape and process quality
- less effort spent re-explaining desired workflow

### Risks
- creating too many skills too early
- skills overlapping too much in scope

---

## Phase 4 — Add repo convention support and lightweight model-routing guidance

### Goal
Improve consistency and reduce repo-specific reorientation.

### Deliverables
- **repo-conventions** extension or equivalent lightweight mechanism
- advisory model-routing policy

### Actions
- define a minimal repo convention schema
- inject only relevant repo conventions by context
- document when to prefer fast, primary, and deep-reasoning models
- keep routing advisory until there is strong evidence automation helps

### Success indicators
- fewer reminders about repo-specific commands and norms
- better model choice discipline
- lower cost from using strong models only when justified

### Risks
- overcomplicated convention schema
- auto-routing becoming confusing or opaque

---

## Phase 5 — Add carefully scoped workflow automation

### Goal
Automate only the background tasks with clear objective value.

### Candidate automations
- CI failure summarizer
- PR review assistant
- daily repo/work summary

### Actions
- choose one automation at a time
- define clear trigger, output, owner, and rollback path
- keep automations outside the core interactive workflow where possible

### Success indicators
- saved review/triage time
- improved issue visibility
- no meaningful increase in hidden complexity

### Risks
- operational overhead
- autonomous noise instead of useful signal

---

## Phase 6 — Evaluate advanced memory or orchestration only after evidence

### Goal
Avoid premature complexity while leaving room for growth.

### Potential future additions
- SQLite full-text search for memory retrieval
- embeddings for fuzzy recall if keyword retrieval proves insufficient
- richer SDK-driven orchestration
- role-separated agent flows for implementation vs review vs research

### Entry criteria
Do **not** start this phase until we can show that simpler approaches fail in repeated real tasks.

### Success indicators
- advanced mechanisms solve a clearly observed bottleneck
- complexity increase is justified by measurable gains

### Risks
- building infrastructure that feels advanced but does not materially improve outcomes

---

## Metrics: how we will know the changes are helping

We need both qualitative and quantitative measures.

## Core outcome metrics

### 1. Prompting overhead
Track:
- how often we must restate the same workflow guidance
- how often long prompts are needed just to get normal behavior

Desired direction:
- fewer repeated steering messages
- shorter setup prompts for recurring tasks

### 2. Repeated correction rate
Track:
- how often we repeat the same correction within a repo or across sessions

Desired direction:
- repeated corrections decrease over time

### 3. Continuity quality in long tasks
Track:
- how often the agent loses track of the current checkpoint
- how often we need to manually reconstruct state after compaction or delay

Desired direction:
- fewer reorientation turns
- cleaner resumption of long work

### 4. Verification compliance
Track:
- percentage of substantive coding tasks that end with explicit verification output
- whether bug fixes include regression tests when practical

Desired direction:
- verification becomes the default rather than the exception

### 5. Reviewability
Track:
- whether work is delivered in small, understandable checkpoints
- whether changes are easy to inspect and explain afterward

Desired direction:
- smaller, more reviewable task outputs

### 6. Workflow asset reuse
Track:
- number of recurring tasks handled through skills/templates instead of ad hoc prompting

Desired direction:
- increasing reuse for common workflows

### 7. Complexity budget
Track:
- number of active extensions
- number of active skills
- number of workflow mechanisms solving the same problem

Desired direction:
- growth stays intentional
- overlap stays low

---

## Measurement approach

## Lightweight scorecard

At the end of each meaningful phase or after a few weeks of use, score these from 1 to 5:
- consistency of agent behavior
- amount of repeated prompting required
- long-task continuity
- confidence in safety boundaries
- confidence in verification discipline
- overall complexity relative to benefit

## Event notes to keep

Keep simple notes when a workflow failure happens:
- what went wrong
- what layer failed
- whether it was a prompt problem, instruction problem, memory problem, or missing enforcement
- whether the fix should be docs, skill, extension, template, or process

This will make the roadmap evidence-based.

---

## Review cadence

## Monthly review

Once a month, review:
- what workflow problems happened repeatedly
- which corrections are recurring enough to encode
- which instructions are stale or too broad
- whether recent additions reduced work or increased it

## Quarterly review

Once a quarter, decide:
- what to prune
- what to formalize into a skill or extension
- whether any automation earned its keep
- whether advanced memory/orchestration is actually justified

---

## Decision rules for future additions

Before adding a new extension, skill, template, or automation, ask:

1. What exact problem does this solve?
2. Is that problem recurring enough to deserve system support?
3. Could a simpler mechanism solve it?
4. Where does it belong: doc, template, skill, extension, or automation?
5. How will we know if it helped?
6. What is the rollback path if it adds friction?

If these questions do not have crisp answers, the addition should wait.

---

## Near-term implementation order

This is the recommended order of work.

### Immediate
1. baseline the current system and simplify boundaries
2. document the asset placement rules
3. prune or relocate low-signal guidance

### Next
4. build `safety-gates`
5. build `state-capture`
6. build `correction-memory`

### After that
7. create the first skill pack
8. add a few prompt templates
9. add repo convention support

### Later
10. add one automation with explicit ROI expectations
11. evaluate advanced memory only if simpler retrieval is insufficient

---

## What success looks like in one year

A successful outcome one year from now would look like this:
- the workflow is still understandable in a short architecture map
- global instructions are concise and high-signal
- project instructions are scoped and predictable
- routine tasks are handled through a small set of high-value skills and templates
- important safety and continuity behaviors are runtime-supported
- recurring corrections are remembered instead of repeatedly restated
- long tasks resume cleanly
- workflow complexity remains deliberate and reviewable
- new additions are judged by outcomes, not novelty

In short: we should end up with a workflow system that feels **more disciplined and lighter**, not just more elaborate.

---

## Summary

The key insight behind this plan is simple:

**pi is already the harness. The remaining work is to make the behavior layer more structured, enforceable, reusable, and measurable.**

We do not need to imitate the surface area of someone else’s “60 hooks, 20 agents, 10 daemons” setup. We need a workflow architecture with:
- clear boundaries
- high-signal instructions
- operationalized rules
- durable memory where it matters
- reusable workflows
- measured progress

That is the path to a system that compounds over time instead of collapsing under its own cleverness.
