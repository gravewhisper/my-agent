---
name: doc-coauthoring
description: Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This workflow helps users efficiently transfer context, refine content through iteration, and verify the doc works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks.
---

# Doc Co-Authoring Workflow for Pi

This is a Pi-adapted version of the doc co-authoring workflow. Use Pi's normal tools (`read`, `write`, `edit`, `bash`) and a markdown file in the working directory instead of Claude-specific artifacts, connectors, or sub-agents.

Act as an active guide through three stages:
1. **Context Gathering**
2. **Refinement & Structure**
3. **Reader Testing**

If the user prefers a freeform drafting style, switch to freeform and stop enforcing the workflow.

## When to Offer This Workflow

Trigger when the user wants help writing substantial documents, such as:
- technical specs
- RFCs / design docs / decision docs
- proposals
- project writeups
- internal documentation
- migration plans
- postmortems / incident reports

When offering the workflow, briefly explain:
- context first,
- then section-by-section drafting,
- then reader testing with a fresh perspective.

Ask whether they want the structured workflow or a normal drafting session.

---

## Stage 1: Context Gathering

### Goal
Close the gap between what the user knows and what Pi knows.

### Start by asking for meta-context
Ask concise questions such as:
1. What type of document is this?
2. Who is the audience?
3. What should the reader think, decide, or do after reading it?
4. Is there a required template or section structure?
5. Any constraints, deadlines, politics, or technical context to know?

Let the user answer in shorthand.

### If the user has source material
If they provide files, read them.
If they mention an existing local document, read it.
If they mention content that Pi cannot access directly (shared docs, Slack threads, etc.), ask them to paste or summarize the relevant parts.

### Encourage an info dump
Ask them to dump relevant context without worrying about order. Useful categories:
- project background
- why alternatives were rejected
- technical constraints / architecture
- timelines and dependencies
- stakeholders and concerns
- success criteria
- examples / prior art

### Clarifying questions
After the initial dump, ask 5-10 numbered questions focused on gaps, tradeoffs, assumptions, and edge cases.

The questions should demonstrate understanding. Do not ask generic filler questions if the answer is already known.

### Exit condition
Move on when the basics are clear enough that you can discuss tradeoffs and wording without needing foundational explanations.

Before moving on, ask whether they want to add any more context.

---

## Stage 2: Refinement & Structure

### Goal
Build the document section by section through brainstorming, curation, drafting, and surgical editing.

### Explain the process
Tell the user that for each section you will:
1. ask clarifying questions,
2. brainstorm candidate points,
3. let them keep/remove/combine,
4. draft the section,
5. refine it with targeted edits.

### Choose the structure
If the document already has a template, use it.
If not, propose a sensible section outline for the document type.

Examples:
- **Decision doc**: Summary, Problem, Context, Options, Proposed Decision, Tradeoffs, Rollout, Risks
- **Technical spec**: Overview, Goals, Non-goals, Requirements, Design, Data Model, API Changes, Rollout, Risks, Open Questions
- **Proposal**: Problem, Why now, Proposal, Alternatives, Cost, Risks, Success Metrics

Ask the user to confirm or adjust the structure.

### Create the draft file
Create a markdown file in the working directory, named appropriately, for example:
- `design-doc.md`
- `technical-spec.md`
- `decision-doc.md`
- `proposal.md`

Use `write` to create the initial scaffold with all agreed sections and placeholder text.

### For each section

#### 1) Clarifying questions
Ask 3-8 specific questions for that section.

#### 2) Brainstorming
Generate 5-20 candidate points depending on section complexity.
Look for:
- forgotten context already mentioned,
- missing tradeoffs,
- assumptions that should be explicit,
- audience-specific concerns.

#### 3) Curation
Ask what to keep, remove, or combine.
Accept either numbered feedback or freeform feedback.

#### 4) Gap check
Ask whether anything important is still missing from the section.

#### 5) Drafting
Replace the placeholder for that section with real content.
Use `edit` for targeted replacement whenever possible.
Do not keep rewriting the entire document if only one section changed.

After drafting, tell the user which file was updated.

#### 6) Iterative refinement
As the user gives feedback:
- use `edit` for surgical changes,
- keep changes localized,
- do not dump the entire document repeatedly unless the user asks.

If the user manually edits the file and asks you to re-read it, use `read` and infer their style preferences from the edits.

### Quality checking
When a section seems stable, ask whether anything can be removed without losing meaning.
Prefer density and clarity over generic filler.

### Whole-document pass
When most sections are done, re-read the entire file and check for:
- flow and consistency,
- contradictions,
- repetition,
- missing transitions,
- generic or weak phrasing,
- anything that assumes too much reader context.

Offer final fixes before reader testing.

---

## Stage 3: Reader Testing

### Goal
Test whether the document works for a fresh reader without relying on hidden conversation context.

Pi does not assume sub-agents or Claude-specific artifact workflows. Use one of these approaches:

### Preferred approach: fresh-session test
Recommend one of the following:
- open a new Pi session,
- or open a fresh chat with another assistant,
- or ask a human teammate to read it cold.

Then test with questions like:
1. What problem is this document solving?
2. What is being proposed or decided?
3. Why is this approach chosen over alternatives?
4. What risks or tradeoffs remain?
5. What should happen next?
6. What parts are ambiguous or assume missing context?

### Inline fallback if no fresh session is available
If a true fresh-reader test is not possible, simulate it as best as possible:
- re-read only the document file,
- ignore earlier chat context as much as possible,
- answer likely reader questions strictly from the document,
- call out places where the doc fails to support the answer.

Make it clear this is weaker than a true fresh-reader test.

### Additional checks
Ask whether the doc:
- has ambiguous wording,
- assumes hidden organizational context,
- contains contradictions,
- buries the main point,
- is missing rollout / ownership / metrics / risks.

### Iterate
If reader testing finds issues, return to the relevant sections and fix them with targeted edits.

### Exit condition
The document is ready when a fresh reader can answer key questions correctly and does not surface major ambiguity.

---

## Final Review

Before finishing:
1. Recommend the user do one final read-through themselves.
2. Suggest they verify facts, links, commands, API names, and technical details.
3. Ask whether they want one final polish pass for tone, brevity, or clarity.

If they do, perform it. Otherwise, confirm completion and give the final file path.

---

## Practical Pi Rules

- Use files in the working directory, not artifacts.
- Use `write` to create initial scaffolds.
- Use `edit` for surgical changes.
- Use `read` to re-read the current document before large revisions.
- Keep brainstorming in chat; keep durable draft content in files.
- Prefer concise, high-signal prose over fluffy placeholder language.
- If the user wants speed over process, compress the workflow and move faster.
