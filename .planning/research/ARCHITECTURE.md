# Architecture Research

**Domain:** Claude Code slash command with language-flag routing
**Researched:** 2026-03-08
**Confidence:** HIGH (verified against official Claude Code skills documentation)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Invocation Layer                        │
│                                                                  │
│   /gyst:foundation-sprint                                        │
│   /gyst:foundation-sprint, -french                              │
│   /gyst:foundation-sprint, -spanish  (future)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │  $ARGUMENTS = "" | "-french" | ...
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Command File (routing layer)                   │
│         ~/.claude/commands/gyst/foundation-sprint.md             │
│                                                                  │
│  <process> block: natural language routing logic                 │
│  "If $ARGUMENTS contains -french, load foundation-sprint-       │
│   french.md. If $ARGUMENTS contains -spanish, load             │
│   foundation-sprint-spanish.md. Otherwise load                  │
│   foundation-sprint.md. Unknown flags → English + warning."    │
└────────────────────────────┬────────────────────────────────────┘
                             │  Read + execute correct workflow
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Workflow Files (execution layer)             │
│                                                                  │
│  foundation-sprint.md         (English — existing)              │
│  foundation-sprint-french.md  (French — new)                    │
│  foundation-sprint-spanish.md (Spanish — future, not built now) │
│                                                                  │
│  Each workflow @-includes its own language's templates           │
└────────────────────────────┬────────────────────────────────────┘
                             │  @-include references
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Template Files (output structure layer)      │
│                                                                  │
│  templates/                                                      │
│  ├── COMPETITORS.md      (English)                              │
│  ├── HYPOTHESIS.md       (English)                              │
│  ├── SPRINT.md           (English)                              │
│  ├── POSITIONING.md      (English)                              │
│  └── fr/                 (French — new subdirectory)            │
│      ├── COMPETITORS.md                                          │
│      ├── HYPOTHESIS.md                                           │
│      ├── SPRINT.md                                               │
│      └── POSITIONING.md                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Notes |
|-----------|----------------|-------|
| `foundation-sprint.md` (command) | Declare tools, route to correct workflow based on `$ARGUMENTS` | One file, never grows with new languages |
| `foundation-sprint.md` (workflow) | Run the English sprint end-to-end | Unchanged from v1.0 |
| `foundation-sprint-french.md` (workflow) | Run the full sprint in French — all Claude instructions in French | New file for v1.1 |
| `templates/` (English) | Provide output structure Claude reads before writing files | Unchanged |
| `templates/fr/` (French) | Provide French-language output structure | New subdirectory for v1.1 |

## Recommended Project Structure

```
~/.claude/
├── commands/
│   └── gyst/
│       └── foundation-sprint.md         # MODIFIED — adds routing logic
│
└── get-your-shit-together/
    ├── workflows/
    │   ├── foundation-sprint.md         # UNCHANGED — English workflow
    │   └── foundation-sprint-french.md  # NEW — French workflow
    ├── templates/
    │   ├── COMPETITORS.md               # UNCHANGED
    │   ├── HYPOTHESIS.md                # UNCHANGED
    │   ├── SPRINT.md                    # UNCHANGED
    │   ├── POSITIONING.md               # UNCHANGED
    │   └── fr/                          # NEW subdirectory
    │       ├── COMPETITORS.md
    │       ├── HYPOTHESIS.md
    │       ├── SPRINT.md
    │       └── POSITIONING.md
    └── agents/
        └── gyst-researcher.md           # UNCHANGED
```

### Structure Rationale

- **`templates/fr/` subdirectory (not flat):** Keeps English templates at the root path that the existing workflow already references. Adding `fr/` never touches any existing `@~/.claude/.../templates/FILENAME.md` reference. Adding `templates/es/` later is the same pattern.
- **Workflow per language (not a single parameterized workflow):** A translated workflow must contain Claude instructions in the target language. A single workflow with conditional sections would be harder to maintain and would risk English instructions leaking into a French session. One file per language is explicit and testable in isolation.
- **Routing in command `<process>` block (not `<execution_context>`):** The `<execution_context>` block uses `@-include` which is resolved statically. Routing must live in the `<process>` block as natural language that Claude reads and acts on.

## Architectural Patterns

### Pattern 1: Natural Language Flag Detection

**What:** The command file's `<process>` block tells Claude to inspect the literal string in `$ARGUMENTS` and select the appropriate workflow file to read. Claude, as the executor, reads and follows this instruction before executing any workflow.

**When to use:** Any time a single slash command must branch to different content based on a user-supplied flag, without binary tooling.

**Trade-offs:** Works cleanly within the pure-markdown constraint. Claude's comprehension of "check if $ARGUMENTS contains -french" is reliable for simple flag strings. It would not be appropriate for complex argument parsing (e.g., multiple flags, typed values) — use binary tooling for that.

**Minimal diff to command file:**

The current `<process>` block reads:

```markdown
<process>
Execute the foundation-sprint workflow from
@~/.claude/get-your-shit-together/workflows/foundation-sprint.md
end-to-end. Follow all instructions in that workflow precisely.
</process>
```

The updated `<process>` block becomes:

```markdown
<process>
Before executing any workflow, check $ARGUMENTS:

- If $ARGUMENTS contains "-french": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-french.md
- If $ARGUMENTS contains "-spanish": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-spanish.md
- If $ARGUMENTS is empty or contains no language flag: read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
- If $ARGUMENTS contains an unrecognized flag: say "Language '[flag]' is
  not yet supported. Running the sprint in English." then execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md

Follow all instructions in the selected workflow precisely.
</process>
```

The `<execution_context>` block (the static @-include) is removed entirely — it was pointing to the English workflow unconditionally. With routing logic in `<process>`, Claude reads the correct file dynamically using the `Read` tool (which is already in `allowed-tools`).

### Pattern 2: Language-Scoped Template Subdirectory

**What:** Each language's templates live under `templates/<lang-code>/`. The French workflow's @-include references use `@~/.claude/get-your-shit-together/templates/fr/FILENAME.md`. English workflow references stay as `@~/.claude/get-your-shit-together/templates/FILENAME.md`.

**When to use:** When output templates must be translated but the template reference syntax is a static path in the workflow file.

**Trade-offs:** Each workflow file is self-contained and correct — there is no runtime path construction. Adding Spanish means adding `templates/es/` and `foundation-sprint-spanish.md` with the right `es/` paths. The trade-off is slight duplication (4 template files per language), which is intentional: template structure may diverge across languages.

**Example (inside foundation-sprint-french.md):**

```markdown
1. Lire le gabarit pour la structure :
   @~/.claude/get-your-shit-together/templates/fr/COMPETITORS.md

2. Écrire ./COMPETITORS.md avec tout le contenu suivant...
```

### Pattern 3: One Workflow File Per Language (Full Translation)

**What:** `foundation-sprint-french.md` is a complete copy of the English workflow with all Claude-facing instructions translated to French. User-facing content (banners, questions, confirmations) is also in French. The workflow is self-contained and testable independently.

**When to use:** When Claude's entire interaction must be in the target language — not just the output files, but every question, banner, lock confirmation, and error message.

**Trade-offs:** More content to maintain (one full workflow file per language). This is the correct trade-off for this project because: (1) the workflow is intentionally stable after v1.0, (2) a partial translation would produce mixed-language sessions, and (3) the extensibility requirement (LANG-02) is best served by a pattern where each language is entirely self-contained.

## Data Flow

### Request Flow

```
User types: /gyst:foundation-sprint, -french
    |
    | $ARGUMENTS = "-french"
    v
Command file renders with "-french" substituted into $ARGUMENTS
    |
    | Claude reads <process> block
    v
Claude detects "-french" in $ARGUMENTS
    |
    | Read tool loads foundation-sprint-french.md
    v
French workflow executes end-to-end
    |
    | @-include loads templates/fr/COMPETITORS.md etc.
    v
Output files written in French to user's current directory:
  COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md
```

### Extensibility Flow (adding Spanish later)

```
1. Create templates/es/ with 4 translated template files
2. Create workflows/foundation-sprint-spanish.md
   (translated copy of English workflow, referencing templates/es/)
3. Command file already handles "-spanish" → zero command changes
```

No step requires touching the command file, the English workflow, or any existing template.

## Integration Points

### Component Chain

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Command → Workflow | Claude reads the workflow file via `Read` tool (path determined by routing logic) | Not an @-include — dynamic path selection requires Claude to read the file, not static injection |
| Workflow → Templates | @-include syntax (`@~/.claude/...`) — static path embedded in workflow file | Each language's workflow has hardcoded paths to its own templates |
| Workflow → gyst-researcher agent | Task tool invocation — unchanged, no language changes needed | Agent returns structured profiles; main workflow writes them in target language |
| Workflow → Output files | Write tool — Claude writes to `./COMPETITORS.md` etc. in the user's cwd | File names stay the same across languages; content is in target language |

### Build Order

This order matters because routing must work before translation can be tested:

1. **Update command file** (`foundation-sprint.md`) — routing logic must exist before any workflow can be invoked via flag
2. **Create `templates/fr/`** — French workflow cannot be tested without French templates to @-include
3. **Create `foundation-sprint-french.md`** — translate and validate against French templates
4. **Test end-to-end** — run `/gyst:foundation-sprint, -french` and verify French output files

The English workflow and command are testable independently at each step. Step 1 alone is enough to verify routing (unknown flag → English + warning; no flag → English as before).

## Anti-Patterns

### Anti-Pattern 1: Routing via Multiple Command Files

**What people do:** Create `foundation-sprint-french.md` as a second command file in `~/.claude/commands/gyst/`, invoked as `/gyst:foundation-sprint-french`.

**Why it is wrong:** Violates LANG-02 (extensibility through a single command). The user API changes with every new language. Users must remember different command names.

**Do this instead:** One command, language determined by flag. `/gyst:foundation-sprint, -french` routes internally.

### Anti-Pattern 2: Static @-include in `<execution_context>` for Routing

**What people do:** Keep `@~/.claude/.../foundation-sprint.md` in `<execution_context>` and add a second include for the French workflow, expecting Claude to choose.

**Why it is wrong:** @-includes in `<execution_context>` are resolved statically and injected unconditionally. Both workflows would load simultaneously, causing conflicting instructions. The routing decision happens before execution and cannot be expressed via dual @-includes.

**Do this instead:** Remove `<execution_context>` entirely. Use `<process>` with natural language routing; Claude reads exactly one workflow file using the `Read` tool.

### Anti-Pattern 3: French Templates at Template Root (Flat)

**What people do:** Place French templates at `templates/COMPETITORS-fr.md`, `templates/HYPOTHESIS-fr.md`, etc., alongside the English templates.

**Why it is wrong:** The naming convention breaks the @-include pattern inside workflows. The French workflow would need to reference different filenames (`COMPETITORS-fr.md`) while the English workflow uses `COMPETITORS.md`. Adding Spanish means adding another naming convention. The `fr/` subdirectory approach keeps filenames identical across languages — only the path prefix changes.

**Do this instead:** `templates/fr/COMPETITORS.md`, `templates/fr/HYPOTHESIS.md`, etc.

### Anti-Pattern 4: Inline Translated Instructions in a Single Workflow

**What people do:** Add conditional blocks inside `foundation-sprint.md` — `<!-- IF FRENCH -->...<!-- END IF -->` — with instructions in both languages.

**Why it is wrong:** Claude Code has no preprocessor. Claude would read all content and potentially mix languages. The file grows with every language added. The single-workflow-per-language pattern is more reliable and independently testable.

**Do this instead:** One complete workflow file per language.

## Sources

- Official Claude Code skills documentation (verified 2026-03-08): https://code.claude.com/docs/en/slash-commands
  - `$ARGUMENTS` is a string substitution, not a conditional mechanism — confirmed
  - `<execution_context>` @-includes are static — confirmed via current command file structure
  - `Read` tool is available in command-declared `allowed-tools` — confirmed from existing command frontmatter
- Existing GYST command file: `~/.claude/commands/gyst/foundation-sprint.md` (read directly)
- Existing GYST workflow: `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` (read directly, confirmed @-include pattern for templates)
- Project context: `.planning/PROJECT.md` — requirements LANG-01 through LANG-06 and constraints confirmed

---
*Architecture research for: GYST multilingual slash command routing*
*Researched: 2026-03-08*
