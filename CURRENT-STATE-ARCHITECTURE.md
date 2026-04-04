# Current-State Workflow Architecture

This document is the Phase 0 baseline map for the current AI workflow stack.

It is intentionally short and focused on the active layers that shape behavior today.

---

## One-page summary

The current stack is centered on **pi as the harness**, with a small amount of global workflow policy and a package-based customization layer.

### Current stack, from bottom to top

1. **Model layer**
   - Default provider: `openai-codex`
   - Default model: `gpt-5.4`
   - Thinking level: `medium`

2. **Harness layer**
   - Harness: `pi`
   - Responsibilities:
     - session management
     - tool execution
     - model selection
     - package loading
     - global/project instruction loading
     - interactive terminal workflow

3. **Global behavior layer**
   - File: `~/.pi/agent/AGENTS.md`
   - Responsibilities:
     - global workflow defaults
     - planning expectations
     - minimal-diff expectations
     - verification expectations
     - safety posture

4. **Project behavior layer**
   - Present in some repos via local `AGENTS.md`
   - Known project-level AGENTS files currently found:
     - `~/projects/ilovecoffee/AGENTS.md`
     - `~/projects/mobile-dev-tools/AGENTS.md`
     - `~/projects/omarchy/AGENTS.md`
   - Intended responsibilities:
     - repo-specific commands
     - local conventions
     - architecture boundaries
     - task constraints

5. **Customization/package layer**
   - Defined in `~/.pi/agent/settings.json`
   - Active packages:
     - `pi-powerline-footer`
     - `pi-btw`
     - `pi-web-access`
     - `@danchamorro/pi-prompt-enhancer`
     - `@ssweens/pi-handoff`
   - This currently provides a collection of third-party workflow enhancements rather than a unified personal workflow package

6. **Environment/tooling layer**
   - Managed and documented in `~/.pi/agent/README.md`
   - Includes:
     - installation process
     - package installation flow
     - `greprip` wrappers for `grep` and `find`
     - machine bootstrap guidance

7. **Planning layer**
   - Current planning lives mostly in:
     - conversation habit
     - global `AGENTS.md`
     - external notes/research
     - newly created workflow planning docs
   - This layer is not yet strongly operationalized in extensions or formal skills

---

## Current system boundaries

## What pi is responsible for
- being the terminal harness
- running tools
- managing sessions
- loading instructions and packages
- providing the interactive runtime

## What is currently handled by documentation and habits
- planning discipline
- verification discipline
- response/reporting expectations
- safety awareness
- workflow structure for repeated tasks
- deciding where new guidance should live

## What is currently not yet formalized enough
- runtime enforcement of important rules
- structured state capture for long tasks
- durable correction memory
- reusable skill-based workflows
- a clean boundary map for docs vs skills vs templates vs extensions
- measurement of workflow improvements

---

## Active sources of behavior today

### Primary sources of behavior
1. `~/.pi/agent/AGENTS.md`
2. project-local `AGENTS.md` files when present
3. `~/.pi/agent/settings.json`
4. installed pi packages
5. direct prompting in each session

### Secondary/reference sources
1. `~/.pi/agent/README.md`
2. external research notes and long-form planning docs
3. user memory and repeated manual steering

---

## Current strengths

### 1. The base workflow already has good principles
The current global `AGENTS.md` already emphasizes:
- inspect before editing
- short plans before major changes
- small checkpoints
- verification after substantive edits
- explicit reporting of files changed, results, and risks

That is a good operating baseline.

### 2. The setup is versioned and portable
The `~/.pi/agent` directory is already treated as a versioned setup with install instructions, package installation, and machine bootstrap guidance.

### 3. The workflow is harness-flexible but not vendor-locked at the architecture level
The current setup uses OpenAI Codex by default, but the architecture itself is still pi-centered rather than deeply tied to a single vendor product.

### 4. The system already uses package-based extension points
Even before writing custom extensions/skills, the workflow already relies on pi’s package model. That is a good foundation for evolving into a more intentional personal stack.

---

## Current weaknesses

### 1. Too much workflow logic still lives in prose
Important workflow behaviors are described, but not yet enforced or operationalized.

### 2. Custom behavior is still mostly externalized to habits rather than first-class assets
There are currently no clearly visible custom:
- extensions
- skills
- prompt templates
- repo convention stores
- correction memory mechanisms

### 3. Source-of-truth boundaries are still loose
Some guidance lives in:
- AGENTS files
- README
- research notes
- live prompting
- package capabilities

This increases the risk of overlap and ambiguity.

### 4. The package layer is useful but not yet strategically organized
Current packages were installed for utility, but the stack is not yet described as a unified architecture with explicit ownership and roles.

---

## Overlaps and ambiguities to resolve

### Ambiguity 1: README vs AGENTS
- `README.md` currently documents setup and environment well
- `AGENTS.md` documents workflow behavior well
- But there is no explicit rule for what belongs in one vs the other

### Ambiguity 2: Global rules vs project rules
- Global rules exist
- Some projects have local AGENTS files
- But there is no documented standard for what project files should contain

### Ambiguity 3: Documentation vs runtime behavior
- Safety and verification rules are mostly documented expectations
- There is not yet a clear split between “reminder” and “enforced workflow support”

### Ambiguity 4: Repeated prompting vs reusable assets
- Repeated tasks are not yet codified into skills/templates
- This keeps quality dependent on remembering how to ask

---

## Likely missing layers

These layers are implied by the long-term plan but are not yet materially present:
- custom extension layer for enforcement/state capture
- skill layer for repeatable tasks
- prompt template layer for standard output shapes
- memory layer for corrections and conventions
- measurement layer for workflow ROI

---

## Recommended interpretation of the current state

The current workflow is best understood as:

> **A strong pi-based foundation with good default operating principles, but still in an early-to-mid maturity stage above the harness layer.**

The next stage of improvement should not be “more tooling everywhere.” It should be:
- cleaner boundaries
- fewer ambiguous instruction sources
- more operationalized workflow support
- a small number of high-value reusable assets

---

## Immediate Phase 0 implications

Based on this map, the next highest-value moves are:
1. define asset placement rules
2. inventory active packages and instruction sources
3. prune or relocate low-signal guidance
4. identify which workflow rules deserve enforcement
5. prepare a minimal custom asset layer instead of adding more ad hoc complexity
