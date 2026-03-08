# Phase 5: Language Routing - Research

**Researched:** 2026-03-08
**Domain:** Claude Code slash command argument routing — pure markdown, no binary tooling
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LANG-01 | User can run the sprint in French by passing `-french` flag: `/gyst:foundation-sprint, -french` | `$ARGUMENTS` substitution delivers the flag string to the `<process>` block; routing logic directs Claude to `Read` the French workflow file |
| LANG-02 | The language flag system is extensible — adding a new language requires only a pre-translated workflow file and templates, with zero changes to the command file | The unrecognized-flag fallback handles any undefined flag; adding Spanish later requires one new bullet in `<process>` (one command file edit, not zero — see Open Questions) |
| LANG-03 | If an unsupported language flag is passed, the command informs the user and falls back to English | Unrecognized-flag branch in `<process>` block: print message naming the flag, state English will be used, then load English workflow |
</phase_requirements>

---

## Summary

Phase 5 is a targeted surgical edit to one existing file (`commands/gyst/foundation-sprint.md`) plus an update to a secondary deployment location. No new technologies enter the stack. No new workflow or template files are created in this phase — those arrive in Phases 6 and 7. The entire deliverable is a routing mechanism that reads `$ARGUMENTS` and selects which workflow file to load.

The core mechanism is well-understood and verified: `$ARGUMENTS` is pure string substitution built into Claude Code slash commands. When a user invokes `/gyst:foundation-sprint, -french`, the string `-french` replaces every `$ARGUMENTS` token in the command file before Claude reads it. Claude then reads the `<process>` block as natural language instructions, detects the flag, and calls the `Read` tool to load the correct workflow file path. This is the same execution model already proven in GSD reference commands.

One irreversible architectural change accompanies the routing logic: the `<execution_context>` block and its static `@`-include must be removed. Static @-includes are resolved before Claude reads `<process>`, so they would unconditionally load the English workflow regardless of the flag value. Removing `<execution_context>` is safe because the `Read` tool (already in `allowed-tools`) replaces its function dynamically. The project maintains two copies of the command file — one in the repo (`commands/gyst/foundation-sprint.md`) and one in the deployed location (`~/.claude/commands/gyst/foundation-sprint.md`) — so both must be updated.

**Primary recommendation:** Edit `commands/gyst/foundation-sprint.md` to remove `<execution_context>`, update `argument-hint`, and replace `<process>` with the routing block documented in STACK.md. Copy the updated file to `~/.claude/commands/gyst/foundation-sprint.md` to deploy. Verify all three routing branches manually before closing the phase.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| Claude Code slash commands (`.claude/commands/`) | Current | Command entry point + argument routing | Existing GYST execution model; no alternative exists within the project's pure-markdown constraint |
| `$ARGUMENTS` string substitution | Built-in | Deliver user-supplied flag into the `<process>` block | The only mechanism for passing runtime input to a Claude Code command without binary tooling |
| `Read` tool (declared in `allowed-tools`) | Built-in | Dynamically load the correct workflow file at runtime | Already declared; replaces the static `@`-include that `<execution_context>` was providing |

### Supporting Patterns

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| Natural language routing in `<process>` block | Tell Claude which file path to `Read` based on the flag string | Any single command that must branch to different content based on a user-supplied flag |
| `argument-hint` frontmatter field | Display expected arguments in UI autocomplete | Always include when arguments are expected; update from "(no arguments needed)" to `"[-french]"` |
| Unrecognized-flag fallback | Graceful degradation for any flag not yet mapped | Handles LANG-03 and satisfies LANG-02 partial extensibility without pre-listing future flags |

### Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| Natural language routing in `<process>` | Separate command file per language | User API grows with every language; violates LANG-02 |
| `<process>` routing with `Read` tool | Dual `@`-includes in `<execution_context>` | @-includes are static; both would load simultaneously, causing conflicting instructions |
| Routing in single command file | Binary/Node.js pre-processor reading `$ARGUMENTS` | No binary tooling is a project constraint; unnecessary for a simple string match |

**Installation:** No packages to install. This phase is pure file edits.

---

## Architecture Patterns

### File Layout — What Changes in Phase 5

```
~/.claude/
├── commands/
│   └── gyst/
│       └── foundation-sprint.md    # MODIFIED — routing logic replaces execution_context

~/.claude/get-your-shit-together/
├── workflows/
│   ├── foundation-sprint.md        # UNCHANGED — English workflow
│   └── (foundation-sprint-french.md not yet created — Phase 7)
└── templates/
    ├── COMPETITORS.md              # UNCHANGED
    ├── HYPOTHESIS.md               # UNCHANGED
    ├── SPRINT.md                   # UNCHANGED
    └── POSITIONING.md              # UNCHANGED

[repo]/
└── commands/
    └── gyst/
        └── foundation-sprint.md    # MODIFIED — same edit, repo copy
```

### Pattern 1: Natural Language Flag Detection

**What:** The `<process>` block contains a conditional list that Claude reads as instructions. `$ARGUMENTS` is already substituted to the flag value by the time Claude reads the block. Claude matches the string and calls `Read` on the appropriate path.

**When to use:** Any time a single slash command must branch to different file content based on a simple user-supplied string flag, without binary tooling.

**Exact updated command file `<process>` block:**

```markdown
<process>
Before executing any workflow, check $ARGUMENTS:

- If $ARGUMENTS contains "-french": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-french.md
- If $ARGUMENTS is empty or contains no language flag: read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
- If $ARGUMENTS contains an unrecognized flag: say "Language '$ARGUMENTS' is
  not yet supported. Running the sprint in English." then execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md

Follow all instructions in the selected workflow precisely.
</process>
```

**What is removed (current `<execution_context>` block):**

```markdown
<execution_context>
@~/.claude/get-your-shit-together/workflows/foundation-sprint.md
</execution_context>
```

**Also removed from `<process>` (current inline @-reference):** The `@~/.claude/...` path string in the current `<process>` text — the updated process block uses plain paths, not @-include syntax.

**The `argument-hint` frontmatter field changes from:**
```yaml
argument-hint: (no arguments needed — just run it)
```
**To:**
```yaml
argument-hint: "[-french]"
```

### Pattern 2: Two-Copy Deployment Model

**What:** The repo (`GYST/commands/gyst/foundation-sprint.md`) is the source of truth. `bin/install.js` copies it to `~/.claude/commands/gyst/foundation-sprint.md` on install. During development, both copies must be kept in sync manually or via `npm install` / `npx .` from the repo root.

**When to use:** Every time the command file is edited.

**Implication for this phase:** The plan must include a task to update BOTH copies, or update the repo copy and run the installer to propagate. Testing requires the `~/.claude/` copy to be current — Claude Code reads from there, not from the repo.

### Anti-Patterns to Avoid

- **Leaving `<execution_context>` in place:** The static @-include loads the English workflow unconditionally before Claude reads `<process>`. The routing logic in `<process>` becomes unreachable for French — Claude already has the English workflow content. Remove `<execution_context>` entirely.
- **Using `@`-include syntax in `<process>` for routing:** `@`-includes are injection, not conditional branching. Writing `@~/.claude/.../foundation-sprint-french.md` in the `<process>` block would inject the file content statically — the same problem as `<execution_context>`. Use plain file paths that Claude reads via the `Read` tool.
- **Pre-listing `-spanish` in the routing block:** LANG-02 extensibility is satisfied by the unrecognized-flag fallback. Adding a Spanish bullet now would be premature — it creates a routing branch for a workflow that doesn't exist until a future milestone. The fallback catches `-spanish` correctly and prints an informative message.
- **Editing only the `~/.claude/` copy and not the repo copy:** Changes not reflected in `commands/gyst/foundation-sprint.md` in the repo will be overwritten on next `npm install`. Both copies must match.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Argument parsing | Custom string-split logic in a Node.js script | Natural language routing in `<process>` with `$ARGUMENTS` | The flag is a simple string; Claude reads "contains -french" correctly; no parser needed |
| Language detection | Inference from user's first message content | Explicit `-french` flag | Claude's language detection is unreliable for short inputs; explicit flag is unambiguous |
| Config persistence | A config file storing the user's preferred language | Explicit `-french` flag at invocation time | No settings system exists; adds persistence layer for no benefit when a flag is friction-free |

**Key insight:** The routing problem in this phase is trivially simple — one string, three branches. The value of natural language routing is that Claude handles it reliably without any binary infrastructure. Resist the urge to add tooling.

---

## Common Pitfalls

### Pitfall 1: Static @-include Conflict

**What goes wrong:** The updated `<process>` block routes to the French workflow, but `<execution_context>` already injected the English workflow. Claude receives the English workflow content plus a `<process>` instruction to read French. Results are unpredictable — most likely English runs regardless.

**Why it happens:** Developer edits `<process>` without removing `<execution_context>`. The static injection is invisible in the rendered markdown.

**How to avoid:** Remove the entire `<execution_context>` block as the first edit. Verify the command file has no `@`-include pointing to `foundation-sprint.md` before testing.

**Warning signs:** `/gyst:foundation-sprint, -french` runs in English. Claude doesn't acknowledge the flag at all.

### Pitfall 2: Testing from the Repo Copy, Not the Deployed Copy

**What goes wrong:** Developer edits `GYST/commands/gyst/foundation-sprint.md`, tests in Claude Code, and routing doesn't work because Claude Code reads from `~/.claude/commands/gyst/foundation-sprint.md` — the deployed copy — which still has the old content.

**Why it happens:** The two-copy deployment model is easy to forget. The repo copy and the deployed copy are separate files.

**How to avoid:** After editing the repo copy, copy it to `~/.claude/commands/gyst/foundation-sprint.md` before testing. Alternatively, run `node bin/install.js` from the repo root to reinstall (this also copies workflows and templates, which are unchanged in Phase 5 so this is safe).

**Warning signs:** Edits have no effect in Claude Code. Command still behaves as before.

### Pitfall 3: French Workflow Path Mismatch

**What goes wrong:** The routing block sends Claude to `foundation-sprint-french.md` (Phase 7 file), which doesn't exist yet. Claude may error or silently fall back.

**Why it happens:** Phase 5 installs routing that points to a file that won't exist until Phase 7. This is by design — the routing must be live before the translation exists.

**How to avoid:** The success criterion explicitly allows graceful failure on the French path ("gracefully fails until Phase 7 delivers that file, but the routing instruction is live"). The test for LANG-01 in Phase 5 is verifying that Claude acknowledges the flag and attempts to load the French file — not that it successfully runs the French sprint.

**Warning signs:** None — this is expected behavior. The verification task must check that Claude says something like "reading foundation-sprint-french.md" before failing, not that it silently falls back to English.

### Pitfall 4: Incorrect `argument-hint` Format

**What goes wrong:** `argument-hint` is set to a value that doesn't display correctly in Claude Code's autocomplete UI.

**Why it happens:** The field format (quoted string vs. bare string) may matter for rendering.

**How to avoid:** Use `argument-hint: "[-french]"` with double quotes, matching the pattern used in GSD reference commands. Verify it displays correctly by typing `/gyst:foundation-sprint` and checking the autocomplete hint.

**Warning signs:** No hint displays, or the hint shows a malformed string.

---

## Code Examples

### Complete Updated Command File

```markdown
---
name: gyst:foundation-sprint
description: Run a Foundation Sprint — one session, one testable hypothesis
allowed-tools:
  - Read
  - Write
  - Bash
  - WebSearch
  - WebFetch
  - Task
argument-hint: "[-french]"
---

<objective>
Run the GYST Foundation Sprint end-to-end in a single session. You are a thinking partner guiding a solo entrepreneur from a fuzzy idea to a testable hypothesis using the Foundation Sprint method.

This sprint produces four output files in the user's current directory:
- COMPETITORS.md — fixed competitor list with research profiles (written after Step 1)
- HYPOTHESIS.md — the full X/Y/Z/W/U/V hypothesis + testable form (written at sprint end)
- SPRINT.md — complete journal of every decision made at each step (written at sprint end)
- POSITIONING.md — 2x2 matrix, mini-manifesto, differentiation axes (written at sprint end)
</objective>

<process>
Before executing any workflow, check $ARGUMENTS:

- If $ARGUMENTS contains "-french": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-french.md
- If $ARGUMENTS is empty or contains no language flag: read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
- If $ARGUMENTS contains an unrecognized flag: say "Language '$ARGUMENTS' is
  not yet supported. Running the sprint in English." then execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md

Follow all instructions in the selected workflow precisely.
</process>
```

Source: STACK.md routing pattern (HIGH confidence) + existing command file frontmatter and objective (verified from disk, 2026-03-08)

### Diff — What Changes

```diff
-argument-hint: (no arguments needed — just run it)
+argument-hint: "[-french]"

-<execution_context>
-@~/.claude/get-your-shit-together/workflows/foundation-sprint.md
-</execution_context>
-
 <process>
-Execute the foundation-sprint workflow from @~/.claude/get-your-shit-together/workflows/foundation-sprint.md end-to-end. Follow all instructions in that workflow precisely.
+Before executing any workflow, check $ARGUMENTS:
+
+- If $ARGUMENTS contains "-french": read and execute
+  ~/.claude/get-your-shit-together/workflows/foundation-sprint-french.md
+- If $ARGUMENTS is empty or contains no language flag: read and execute
+  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
+- If $ARGUMENTS contains an unrecognized flag: say "Language '$ARGUMENTS' is
+  not yet supported. Running the sprint in English." then execute
+  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
+
+Follow all instructions in the selected workflow precisely.
 </process>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static `@`-include in `<execution_context>` | Dynamic `Read` tool call driven by `<process>` routing | Phase 5 | Enables language selection; `<execution_context>` must be removed |
| `argument-hint: (no arguments needed)` | `argument-hint: "[-french]"` | Phase 5 | UI now shows available argument; no behavioral change |
| Single workflow loaded unconditionally | Workflow selected by flag matching | Phase 5 | Foundation for all future language routing |

**Deprecated/outdated after this phase:**
- `<execution_context>` block in `foundation-sprint.md`: removed; replaced by `Read` tool call in `<process>`
- The `@`-include reference to `foundation-sprint.md` inside the old `<process>` text: removed; plain path used instead

---

## Open Questions

1. **LANG-02 extensibility claim: "zero changes to command file" vs. one bullet per language**
   - What we know: LANG-02 says adding a new language requires zero changes to the command file. The routing pattern adds one bullet per language (e.g., `-spanish` in Phase 9). The unrecognized-flag fallback handles undefined flags with no command file change — so the fallback alone satisfies "zero changes."
   - What's unclear: Does the intent of LANG-02 mean zero changes ever (fallback covers all languages), or one-time additive change per language (add one bullet when the language ships)?
   - Recommendation: The unrecognized-flag fallback (LANG-03) satisfies LANG-02 structurally — any new language flag falls through to the English fallback with a helpful message until it is explicitly routed. The planner should note this interpretation in the plan. If a future language needs routing, it is a one-bullet change — minimal but not zero.

2. **Behavior of `-french` flag when `foundation-sprint-french.md` does not yet exist**
   - What we know: Phase 5 installs routing that points to a file Phase 7 will create. The success criteria explicitly allow graceful failure on the French path.
   - What's unclear: Exactly what Claude does when `Read` is called on a non-existent file — error message, silent fallback, or something else.
   - Recommendation: The Phase 5 verification task should test that Claude attempts to read `foundation-sprint-french.md` (acknowledges the routing decision), not that the sprint succeeds in French. Document the expected behavior explicitly in the verification plan.

3. **Whether the `<process>` block @-reference to the workflow (in the current file) conflicts with removal of `<execution_context>`**
   - What we know: The current `<process>` block contains `@~/.claude/.../foundation-sprint.md` as an inline reference. In the updated version, this becomes a plain path string that Claude reads via the `Read` tool — not an @-include.
   - What's unclear: Whether Claude treats `@path` inside a `<process>` block as an @-include injection or as literal text. If it is still injected, the updated `<process>` block should use plain paths (not @-syntax) to avoid ambiguity.
   - Recommendation: The STACK.md example already uses plain paths without `@` in the updated `<process>` block. Follow that pattern exactly. Do not use `@`-syntax inside `<process>` routing instructions.

---

## Sources

### Primary (HIGH confidence)

- STACK.md (`.planning/research/STACK.md`) — `$ARGUMENTS` behavior, routing pattern, file naming conventions, alternatives rejected — verified 2026-03-08 against official Claude Code docs and existing command files
- ARCHITECTURE.md (`.planning/research/ARCHITECTURE.md`) — system diagram, component responsibilities, anti-patterns, data flow — verified 2026-03-08
- Official Claude Code skills documentation: https://code.claude.com/docs/en/slash-commands — `$ARGUMENTS` substitution, `argument-hint`, `<execution_context>` static resolution — verified 2026-03-08 (as reported in STACK.md)
- Existing command file (read directly 2026-03-08): `C:/Users/raphg/Desktop/GYST/commands/gyst/foundation-sprint.md` and `C:/Users/raphg/.claude/commands/gyst/foundation-sprint.md` — confirmed both copies are identical and match the description in additional context

### Secondary (MEDIUM confidence)

- `bin/install.js` (read directly 2026-03-08) — confirmed two-copy deployment model: repo is source of truth; `copyDir` copies `commands/gyst/` to `~/.claude/commands/gyst/` on install

### Tertiary (LOW confidence)

- None — all findings are grounded in directly-read source files or cited official documentation.

---

## Metadata

**Confidence breakdown:**
- Routing mechanism (`$ARGUMENTS` behavior): HIGH — cited against official docs in STACK.md; confirmed by existing command file structure read from disk
- Architecture pattern (remove `<execution_context>`, use `Read` tool): HIGH — verified in ARCHITECTURE.md; confirmed by reading the current command file
- Two-copy deployment model: HIGH — verified by reading `bin/install.js` directly
- Extensibility claim (LANG-02 interpretation): MEDIUM — the interpretation (fallback = zero changes, routing bullet = one change) is logical but the requirement wording is ambiguous; flagged in Open Questions

**Research date:** 2026-03-08
**Valid until:** 2026-06-08 (stable domain — Claude Code slash command mechanics are unlikely to change; 90-day window appropriate)
