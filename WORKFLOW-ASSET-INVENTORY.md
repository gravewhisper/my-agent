# Workflow Asset Inventory

This document inventories the current workflow assets that shape agent behavior.

It is the Phase 0.2 baseline for understanding:
- what is active
- what is source-of-truth
- what is reference-only
- what looks redundant, unclear, or missing

---

## Inventory summary

### Active workflow assets

#### Core config
- `~/.pi/agent/settings.json`
- `~/.pi/agent/AGENTS.md`
- project-local `AGENTS.md` files in some repos
- installed pi packages from `settings.json`
- theme file: `~/.pi/agent/themes/monokai-classic.json`

#### Setup and environment docs
- `~/.pi/agent/README.md`
- `~/.pi/agent/install.sh`

#### New planning docs created during this effort
- `~/.pi/agent/WORKFLOW-IMPROVEMENT-PLAN.md`
- `~/.pi/agent/WORKFLOW-EXECUTION-CHECKLIST.md`
- `~/.pi/agent/CURRENT-STATE-ARCHITECTURE.md`
- `~/.pi/agent/WORKFLOW-ASSET-INVENTORY.md`

#### Historical/log data
- `~/.pi/agent/run-history.jsonl`

---

## Source-of-truth classification

## Primary source-of-truth assets

### 1. `~/.pi/agent/settings.json`
**Role:** runtime configuration source of truth

Controls:
- default provider/model
- thinking level
- UI preferences
- shell command prefix behavior
- installed packages

Assessment:
- clear purpose
- high signal
- good source of truth

### 2. `~/.pi/agent/AGENTS.md`
**Role:** global workflow behavior source of truth

Controls:
- broad coding workflow expectations
- planning/inspection/verification norms
- reporting expectations
- high-level safety posture

Assessment:
- useful and high signal
- currently well-focused
- should remain concise and global-only

### 3. project `AGENTS.md` files
**Role:** repo-specific behavior source of truth, when present

Known current files:
- `~/projects/ilovecoffee/AGENTS.md`
- `~/projects/mobile-dev-tools/AGENTS.md`
- `~/projects/omarchy/AGENTS.md`

Assessment:
- valid mechanism
- structure and scope are not yet standardized across projects
- should become the main place for repo-specific constraints

---

## Secondary/reference assets

### 4. `~/.pi/agent/README.md`
**Role:** setup and environment reference

Contains:
- installation and update flow
- machine bootstrap instructions
- shell wrapper assumptions
- package install instructions

Assessment:
- useful
- clearly about environment and setup
- should not become a workflow-behavior dumping ground

### 5. `~/.pi/agent/install.sh`
**Role:** installation/bootstrap helper

Assessment:
- operational infrastructure, not behavior guidance
- should remain separate from workflow policy

### 6. `~/.pi/agent/run-history.jsonl`
**Role:** historical execution data

Assessment:
- potentially useful reference for later measurement work
- not currently a first-class workflow feedback loop

### 7. Planning docs in `~/.pi/agent/`
Files:
- `WORKFLOW-IMPROVEMENT-PLAN.md`
- `WORKFLOW-EXECUTION-CHECKLIST.md`
- `CURRENT-STATE-ARCHITECTURE.md`
- `WORKFLOW-ASSET-INVENTORY.md`

Role:
- planning and governance docs for improving the setup

Assessment:
- useful as explicit planning layer
- should remain planning docs, not runtime instruction sources

---

## Installed package inventory

The following packages are active in `settings.json`.

## 1. `npm:pi-powerline-footer`
**Observed role:** UI enhancement / footer customization

Likely value:
- improves status visibility in the interface
- supports workflow ergonomics, not behavior policy

Keep/review/remove:
- **Keep** unless it causes distraction or conflicts

Questions to validate later:
- does it materially improve session awareness?
- does it help decision-making or just aesthetics?

---

## 2. `npm:pi-btw`
**Observed role:** package is installed, but the exact active workflow contribution is not documented here

Likely value:
- unknown without deeper inspection of the package behavior

Keep/review/remove:
- **Review**

Why review:
- currently lacks a clearly documented problem statement in this repo
- active packages should have explicit reason-to-exist notes

Follow-up question:
- what exact repeated workflow problem is this solving today?

---

## 3. `npm:pi-web-access`
**Observed role:** web/content retrieval capability

Likely value:
- enables richer research and content access workflows
- useful for web research, docs, and external content retrieval

Keep/review/remove:
- **Keep**

Why keep:
- aligns with research-heavy and tool-augmented workflows
- clearly adds capability beyond base local file/code operations

---

## 4. `npm:@danchamorro/pi-prompt-enhancer`
**Observed role:** prompt enhancement support

Likely value:
- may improve prompt handling or augmentation
- likely useful, but needs clearer architectural placement

Keep/review/remove:
- **Review**

Why review:
- it affects an important layer: prompt behavior
- prompt-layer modifications should be explicitly understood to avoid hidden complexity

Follow-up question:
- what exact behavior does it add, and is that behavior desirable in all contexts?

---

## 5. `npm:@ssweens/pi-handoff`
**Observed role:** handoff workflow support

Likely value:
- helps transfer context into focused follow-up sessions
- likely useful for long work and context management

Keep/review/remove:
- **Keep**

Why keep:
- aligns directly with the stated long-task continuity goals
- likely complements the desired future state rather than conflicting with it

---

## Package inventory summary

### Keep
- `pi-powerline-footer`
- `pi-web-access`
- `@ssweens/pi-handoff`

### Review
- `pi-btw`
- `@danchamorro/pi-prompt-enhancer`

### Remove
- none recommended yet without deeper inspection

---

## Current instruction sources

### Active instruction sources
1. global `~/.pi/agent/AGENTS.md`
2. project-local `AGENTS.md` where present
3. direct session prompting
4. package-provided behavior that may alter runtime experience

### Reference-only or planning sources
1. `~/.pi/agent/README.md`
2. planning docs in `~/.pi/agent/`
3. external research notes outside the agent directory

### Boundary rule we should adopt
Only `AGENTS.md`, project `AGENTS.md`, explicit templates/skills, and active extensions should shape normal runtime behavior on purpose.

Everything else should be treated as:
- setup docs
- planning docs
- historical reference
- research material

---

## Observed gaps

### 1. No visible custom extensions yet
Missing likely future assets:
- `safety-gates`
- `state-capture`
- `correction-memory`
- `repo-conventions`
- `model-routing-assist`

### 2. No visible custom skills yet
Missing likely future assets:
- bug triage
- code review
- refactor planning
- documentation/spec writing
- codebase archaeology

### 3. No visible prompt template layer yet
Templates would reduce repeated framing for:
- implementation plans
- architecture memos
- post-task summaries
- review checklists

### 4. No explicit memory store yet
There is no current durable store for:
- repeated corrections
- repo conventions
- recurring reminders

### 5. No explicit measurement mechanism yet
The workflow has planning docs but no formal scorecard or failure log in routine use yet.

---

## Over-documentation candidates

These are not necessarily bad assets, but they are areas where we should watch for instruction sprawl.

### Candidate 1: planning logic living partly in prose only
The workflow principles are good, but much of the desired behavior still exists as text rather than reusable assets.

### Candidate 2: future risk of AGENTS absorbing task recipes
As the system grows, AGENTS docs could become too broad unless we actively push repeatable task workflows into skills and templates.

### Candidate 3: package usage without explicit architectural notes
Installed packages without documented purpose create invisible complexity.

---

## Under-structured areas

### 1. package ownership notes
Each active package should have a one-line “why this exists” note.

### 2. project AGENTS structure
Project instruction files need a standard shape so they remain predictable.

### 3. workflow failure capture
There is no standard log format for failures in agent behavior or workflow design.

### 4. reusable recurring workflows
Repeated task types are not yet codified into skills/templates.

### 5. memory of repeated corrections
Corrections are not yet systematically retained.

---

## At least 3 simplification or relocation candidates

### Candidate A
**Problem:** active packages do not all have explicit purpose notes
**Action:** add a package-purpose section to workflow docs
**Target location:** this inventory or a dedicated architecture note

### Candidate B
**Problem:** runtime behavior guidance and planning guidance could blur over time
**Action:** keep planning docs separate from runtime instruction docs
**Target location:** planning stays in workflow docs; runtime rules stay in AGENTS/skills/extensions

### Candidate C
**Problem:** project-level instruction boundaries are not standardized
**Action:** define a standard project `AGENTS.md` structure
**Target location:** workflow checklist and future style guide

### Candidate D
**Problem:** repeated task guidance may stay in prompts instead of reusable assets
**Action:** move recurring workflows into the future skill/template layer
**Target location:** custom skills and prompt templates

---

## Recommended next actions from this inventory

1. document package-purpose notes for each active package
2. define the standard shape of project `AGENTS.md`
3. write the asset placement rules
4. identify the first workflow rule to enforce via extension instead of prose
5. shortlist the first 3 to 5 recurring tasks that deserve skills

---

## Conclusion

The current setup is already coherent enough to improve safely.

The main issue is not a lack of tools. It is a lack of explicit borders between:
- runtime behavior
- planning docs
- recurring workflows
- package-provided capability
- future memory/enforcement mechanisms

This inventory gives us the baseline needed to clean that up deliberately.
