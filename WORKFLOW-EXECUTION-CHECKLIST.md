# Workflow Execution Checklist

This is the short execution companion to `WORKFLOW-IMPROVEMENT-PLAN.md`.

It focuses on the **next practical steps**, especially:
- Phase 0 — baseline and cleanup
- Phase 1 — tighten instruction boundaries

The goal is to turn the strategy into work we can actually complete.

---

## How to use this checklist

Rules for using this document:
- Keep tasks small and reviewable.
- Prefer completing one layer cleanly before adding a new one.
- Do not add new workflow machinery unless it solves a repeated problem.
- Update this checklist as work is completed or de-scoped.

Suggested cadence:
- review weekly
- prune monthly
- re-plan quarterly

---

## Current focus

### Primary objective
Reduce workflow ambiguity before adding more automation or memory features.

### What we are explicitly not doing yet
- not replacing pi
- not building multi-agent orchestration
- not adding embeddings or a knowledge graph
- not adding multiple daemons
- not creating a huge skill library up front

---

# Phase 0 — Baseline and cleanup

## Goal
Create a clear system map and identify what should be simplified, moved, enforced, or removed.

## Exit criteria
Phase 0 is complete when:
- we can explain the current workflow stack in one page
- we know where new workflow logic should go
- we have identified at least 3 things to simplify, remove, or relocate
- we have an inventory of current workflow assets and why they exist

## Checklist

### 0.1 Create a current-state architecture map
- [ ] Write a one-page map of the current workflow stack
- [ ] List current layers:
  - [ ] harness
  - [ ] global instructions
  - [ ] project instructions
  - [ ] packages
  - [ ] future extension ideas
  - [ ] future skill ideas
  - [ ] external automation ideas
- [ ] Record what each layer is responsible for
- [ ] Record any overlaps or ambiguities

### 0.2 Inventory current active assets
- [ ] List current installed packages from `settings.json`
- [ ] For each package, answer:
  - [ ] what problem does it solve?
  - [ ] do we actively use it?
  - [ ] is it redundant with another mechanism?
  - [ ] should we keep, review, or remove it?
- [ ] List current instruction files and docs that influence behavior
- [ ] Mark which ones are source-of-truth vs background reference

### 0.3 Identify boundary problems
- [ ] List examples of workflow guidance currently stored in the wrong place
- [ ] Mark where each item should live instead:
  - [ ] global `AGENTS.md`
  - [ ] project `AGENTS.md`
  - [ ] skill
  - [ ] prompt template
  - [ ] extension
  - [ ] memory store
- [ ] Identify at least 3 cases of over-documentation
- [ ] Identify at least 3 cases of under-structuring

### 0.4 Establish asset placement rules
- [ ] Write a short rule set for where new workflow logic belongs
- [ ] Include decision rules for:
  - [ ] instruction file vs skill
  - [ ] skill vs template
  - [ ] documentation vs extension
  - [ ] memory vs task-local state
- [ ] Add a “do not add unless recurring” rule

### 0.5 Create a workflow failure log format
- [ ] Define a simple note format for workflow failures:
  - [ ] what happened
  - [ ] what layer failed
  - [ ] repeated or one-off?
  - [ ] proposed fix location
- [ ] Keep it lightweight enough to actually use

## Deliverables
- [ ] one-page architecture map
- [ ] package and instruction inventory
- [ ] list of simplifications/relocations
- [ ] asset placement rules
- [ ] lightweight failure log format

---

# Phase 1 — Tighten instruction boundaries

## Goal
Reduce instruction sprawl and make guidance shorter, more scoped, and easier to trust.

## Exit criteria
Phase 1 is complete when:
- global instructions are concise and clearly global
- project instructions have a predictable structure
- repeated task recipes stop leaking into AGENTS files
- there is a documented rubric for where new guidance belongs

## Checklist

### 1.1 Review global `AGENTS.md`
- [ ] Read the current global `AGENTS.md`
- [ ] Mark each section as:
  - [ ] keep as-is
  - [ ] tighten
  - [ ] move elsewhere
  - [ ] delete
- [ ] Remove any guidance that is:
  - [ ] too repo-specific
  - [ ] too verbose for global context
  - [ ] better expressed as a skill or extension
- [ ] Preserve core principles only

### 1.2 Define a standard project `AGENTS.md` shape
- [ ] Create a short recommended structure for project-level instruction files
- [ ] Suggested sections:
  - [ ] project overview
  - [ ] key commands
  - [ ] important directories
  - [ ] invariants and boundaries
  - [ ] verification expectations
  - [ ] task-specific warnings
- [ ] Explicitly discourage long recipes and historical notes

### 1.3 Separate stable rules from task workflows
- [ ] Review current guidance that describes step-by-step work
- [ ] Move repeated task workflows out of AGENTS docs into future skill candidates
- [ ] Move lightweight repeated framing into future template candidates
- [ ] Leave only stable, high-signal guidance in AGENTS docs

### 1.4 Define an instruction quality rubric
- [ ] Write a short rubric for evaluating whether an instruction belongs in AGENTS
- [ ] Rubric questions:
  - [ ] Is it broadly applicable?
  - [ ] Is it stable over time?
  - [ ] Is it worth permanent context cost?
  - [ ] Is it concrete enough to be useful?
  - [ ] Would enforcement be better than prose?

### 1.5 Prune and relocate
- [ ] Choose at least 3 low-signal items to remove or relocate
- [ ] Record where each moved item goes next
- [ ] Update docs so there is one clear source of truth

## Deliverables
- [ ] cleaned-up global `AGENTS.md`
- [ ] project `AGENTS.md` structure guide
- [ ] instruction quality rubric
- [ ] list of moved or removed guidance

---

# Phase 2 prep — what to line up next

Do not start broad implementation yet, but prepare the inputs.

## Extension candidates to prepare
- [ ] `safety-gates`
- [ ] `state-capture`
- [ ] `correction-memory`

## Preparation tasks
- [ ] define the exact problem each extension solves
- [ ] list the minimum viable behavior for each
- [ ] define what would count as success vs annoyance
- [ ] define rollback criteria for each extension

---

# Success signals to watch now

These are the near-term signals that Phase 0 and Phase 1 are helping.

## Positive signals
- [ ] fewer repeated prompt reminders
- [ ] less uncertainty about where to put new workflow logic
- [ ] shorter instruction files with better signal density
- [ ] easier explanation of the workflow stack
- [ ] fewer overlapping or contradictory guidance sources

## Negative signals
- [ ] rules become harder to find after cleanup
- [ ] useful context gets removed without replacement
- [ ] new docs are created without clear ownership
- [ ] more structure is added but day-to-day workflow does not improve

---

# Decision checklist for any new addition

Before adding a new workflow asset, answer:

- [ ] What exact repeated problem are we solving?
- [ ] Why is the current setup insufficient?
- [ ] What is the simplest mechanism that could solve it?
- [ ] Where should it live?
- [ ] How will we measure whether it helped?
- [ ] How will we disable or roll it back if it adds friction?

If these are not easy to answer, do not add it yet.

---

# Suggested immediate next actions

## This week
- [ ] complete the current-state architecture map
- [ ] inventory packages and instruction sources
- [ ] identify the first 3 simplifications or relocations
- [ ] write the asset placement rules

## After that
- [ ] tighten global `AGENTS.md`
- [ ] draft a standard project `AGENTS.md` structure
- [ ] create the shortlist of future skills
- [ ] define MVP behavior for `safety-gates`

---

# Notes

This checklist should remain shorter and more operational than the long-term plan.

If it starts turning into another strategy document, split detailed reasoning back into `WORKFLOW-IMPROVEMENT-PLAN.md` and keep this file execution-focused.
