---
name: grepai
description: Use grepai for semantic code search and call-graph exploration. Trigger when the user asks where a feature is implemented, how a subsystem works, to find code by intent, or to trace callers/callees. Prefer this over grep/find for meaning-based search, but keep grep/find for exact identifiers, filenames, imports, or regex.
compatibility: Requires the grepai CLI in PATH. Most useful in repositories initialized with .grepai/config.yaml or in configured grepai workspaces.
---

# grepai

Use the `grepai` CLI for **semantic code exploration**.

`grepai` is better than plain text search when the user asks about **meaning or intent**, such as:
- where authentication happens
- how errors are handled
- what code saves orders to the database
- what calls a function
- how a subsystem is wired together

Use normal `grep`, `find`, and `ls` only for **exact text/file** operations.

## When to use this skill

Load this skill when the task involves any of the following:
- Find code by **intent**, not by exact symbol name
- Understand **how a feature works**
- Explore an unfamiliar codebase quickly
- Trace **callers**, **callees**, or a **dependency graph**
- Gather a small, relevant set of files before using `read`

Do **not** prefer grepai when the task is only:
- exact identifier lookup
- regex matching
- import search
- filename / extension discovery
- directory exploration

For those, use the built-in tools.

## Default workflow

1. **Check readiness**
   ```bash
   command -v grepai
   grepai status --no-ui
   ```

2. **If grepai is not ready**:
   - If `grepai` is missing, tell the user and suggest installation.
   - If the repo is not initialized, explain that grepai is not set up here and offer to run:
     ```bash
     grepai init
     grepai watch --background
     ```
   - Do **not** initialize or install without user approval.

3. **Search semantically first**
   - Use **English natural-language queries**.
   - Prefer compact structured output first:
     ```bash
     grepai search "user authentication flow" --json --compact --limit 5
     ```
   - Then use `read` on the most relevant returned files/line ranges.

4. **Trace relationships when needed**
   ```bash
   grepai trace callers "HandleLogin" --json
   grepai trace callees "ProcessOrder" --json
   grepai trace graph "ValidateToken" --depth 3 --json
   ```

5. **Use built-in tools only as follow-up helpers**
   - `read` to inspect top results in detail
   - `grep` for exact symbol/import/constant matches once you know what to look for
   - `find`/`ls` for file discovery

## Search patterns

### Good default

Use this first when you want likely files with minimal token cost:

```bash
grepai search "how errors are handled in API requests" --json --compact --limit 5
```

Then read the best matches directly.

### When you want snippets immediately

```bash
grepai search "JWT token validation middleware" --json --limit 5
```

### Narrow by path

```bash
grepai search "form validation" --path src/components/ --json --compact --limit 5
```

### Workspace search

For multi-project workspaces:

```bash
grepai search "shared authentication flow" --workspace my-workspace --project api --project web --json --compact --limit 5
```

## Query writing guidelines

### Good queries

```bash
grepai search "user authentication flow"
grepai search "how errors are handled in API requests"
grepai search "database connection pooling"
grepai search "where users are persisted to the database"
```

### Bad queries

```bash
grepai search "auth"
grepai search "error"
grepai search "func"
grepai search "HandleRequest"
```

Why these are bad:
- too short
- too vague
- exact symbol names are better handled with plain `grep`

## Trace guidelines

Use tracing when the symbol name is already known or easily inferred.

### Find callers

```bash
grepai trace callers "Login" --json
```

### Find callees

```bash
grepai trace callees "HandleRequest" --json
```

### Build a local dependency graph

```bash
grepai trace graph "ProcessOrder" --depth 2 --json
```

### When symbol name is unknown

1. Start with `grepai search` to locate likely code.
2. Identify the exact function/type name.
3. Run `grepai trace ...` on that symbol.

## Setup and recovery

If the user wants grepai installed or fixed, use these steps.

### Install grepai

**macOS:**
```bash
brew install yoanbernabeu/tap/grepai
```

**Linux/macOS:**
```bash
curl -sSL https://raw.githubusercontent.com/yoanbernabeu/grepai/main/install.sh | sh
```

### Embeddings backend

grepai needs an embedding provider. Default local option:

```bash
ollama pull nomic-embed-text
```

Other supported providers include LM Studio and OpenAI.

### Initialize a project

```bash
grepai init
```

### Build/update the index in the background

```bash
grepai watch --background
```

### Check watcher status

```bash
grepai watch --status
```

### Check index status

```bash
grepai status --no-ui
```

## Troubleshooting

### `grepai status --no-ui` says no project found
The current repo is not initialized for grepai. Offer to run:

```bash
grepai init
grepai watch --background
```

### Search returns no results
- The index may not be built yet
- The watcher may not be running
- The query may be too vague

Try:
```bash
grepai status --no-ui
grepai watch --status
grepai search "more descriptive English query" --json --compact --limit 5
```

### Results are weak
- Rewrite the query in English
- Describe behavior, not keywords
- Add domain detail like API, middleware, session, JWT, cache, migration
- Narrow with `--path` if you know the subsystem

### Trace results are incomplete
Try precise mode:

```bash
grepai trace callers "Login" --mode precise --json
grepai trace callees "Login" --mode precise --json
```

## Decision rule: grepai vs built-in tools

### Use grepai for
- “where is X implemented?”
- “how does Y work?”
- “find the code that handles Z”
- “what calls this?”
- “show the dependency graph around this function”

### Use built-in tools for
- “find `HandleLogin`”
- “search for `Authorization:` header usage”
- “list all `*.go` files”
- “find imports of `cobra`”
- “match this regex”

## Recommended response behavior

When grepai is available:
- Start with a compact semantic search
- Summarize the top hits briefly
- Read only the most promising files/regions
- Avoid dumping large raw search output unless the user asks

When grepai is unavailable:
- Explain what is missing
- Offer setup steps
- Fall back to built-in exact search tools if needed
