# Stack Research

**Domain:** Multilingual/localization support in Claude Code slash-command workflows
**Researched:** 2026-03-08
**Confidence:** HIGH — `$ARGUMENTS` behavior and frontmatter fields verified against official Claude Code skills documentation (https://code.claude.com/docs/en/slash-commands); routing pattern verified against existing GSD reference commands (`execute-phase.md`, `add-phase.md`) and the existing GYST command file.

---

## What This Milestone Adds to the Stack

v1.0 used: command file + workflow file + templates + sub-agent. All pure markdown.

v1.1 adds: zero new technologies. The additions are **new files following existing conventions** and **a routing pattern inside an existing file**. The stack does not change — the pattern library expands.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Claude Code slash commands (`.claude/commands/`) | Current | Command entry point + argument routing | Already the GYST execution model; `$ARGUMENTS` substitution is built in |
| Markdown workflow files | n/a | Per-language sprint execution | Claude reads and follows markdown instructions natively — no interpreter needed |
| `@`-include syntax | n/a | Static template injection into workflows | Built into Claude Code; workflow can reference template files by path |
| ISO 639-1 language code subdirectories (`fr/`, `es/`) | n/a | Organizing translated templates | Standard convention; keeps filenames identical across languages, only path prefix changes |

There are no npm packages, no binaries, and no new tooling. This is intentional — the project constraint is pure markdown.

### Supporting Patterns (Not Libraries)

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| `$ARGUMENTS` string substitution in `<process>` block | Pass the language flag from user invocation into Claude's routing decision | Every time a single command must branch to different content based on user input |
| `$ARGUMENTS[N]` or `$N` positional access | Access a specific argument by position | When multiple distinct arguments are expected (not needed for GYST v1.1 — single flag only) |
| Natural language routing in `<process>` block | Tell Claude which workflow file to `Read` based on the flag string | When routing is simple (string contains X → read file Y); no binary needed |
| `argument-hint` frontmatter field | Display expected arguments in autocomplete | Always include when arguments are expected; set to `[-french]` for v1.1 |
| Per-language workflow file (`foundation-sprint-french.md`) | Complete French translation of all Claude instructions | When the entire session must be in the target language — partial translation produces mixed-language sessions |
| Language-scoped template subdirectory (`templates/fr/`) | Organize translated output templates | When output files must be produced in the target language |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| None beyond existing | No new tooling needed | Read + Write tools already in `allowed-tools`; routing requires no additional tool access |

---

## How `$ARGUMENTS` Works

**Confidence: HIGH** — verified against official Claude Code documentation (2026-03-08).

When a user types `/gyst:foundation-sprint, -french`, Claude Code substitutes `-french` for every occurrence of `$ARGUMENTS` in the command file before Claude reads it. The substitution is literal: the string `-french` replaces the token.

**Key behaviors:**

- If the user types `/gyst:foundation-sprint` with no arguments, `$ARGUMENTS` substitutes to an empty string.
- If the user types `/gyst:foundation-sprint, -french`, `$ARGUMENTS` substitutes to `-french` (the comma and space before the flag are not part of the argument string — only what follows the command name).
- If `$ARGUMENTS` does not appear anywhere in the command file content, Claude Code appends `ARGUMENTS: <value>` to the end of the file. For GYST, `$ARGUMENTS` will appear explicitly in the `<process>` block to make the routing logic readable.
- Positional access via `$ARGUMENTS[0]` or `$0` is available for multi-argument commands. Not needed for GYST v1.1.

**What `$ARGUMENTS` is not:** It is not a conditional mechanism. It does not execute code. It is a text substitution — Claude reads the rendered text and acts on it as instructions. The routing logic is natural language that Claude interprets.

---

## Routing Pattern: Exact Implementation

This is the only change to an existing file. The `<execution_context>` block is removed and the `<process>` block is replaced.

**Current command file** (`commands/gyst/foundation-sprint.md`) relevant sections:

```markdown
argument-hint: (no arguments needed — just run it)

<execution_context>
@~/.claude/get-your-shit-together/workflows/foundation-sprint.md
</execution_context>

<process>
Execute the foundation-sprint workflow from @~/.claude/get-your-shit-together/workflows/foundation-sprint.md end-to-end. Follow all instructions in that workflow precisely.
</process>
```

**Updated command file** relevant sections:

```markdown
argument-hint: "[-french]"

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

**Why `<execution_context>` is removed:** The `@`-include in `<execution_context>` is resolved statically — it loads the English workflow unconditionally, before Claude reads the `<process>` block. With routing in `<process>`, Claude uses the `Read` tool to load the correct workflow dynamically. The `Read` tool is already declared in `allowed-tools`.

**Why `-spanish` is not listed in the `<process>` block yet:** The extensibility requirement (LANG-02) is satisfied without pre-listing future flags. The unrecognized-flag fallback handles any undefined language. When Spanish support ships, the command file gets one new bullet: `- If $ARGUMENTS contains "-spanish": read and execute ~/.claude/get-your-shit-together/workflows/foundation-sprint-spanish.md`.

---

## File Naming Conventions

### Workflow Files

| File | Convention | Example |
|------|-----------|---------|
| English (default) | `foundation-sprint.md` | Unchanged from v1.0 |
| Language variant | `foundation-sprint-{language-name}.md` | `foundation-sprint-french.md` |

Use the full language name in the workflow filename (not the ISO code). The flag `-french` maps to `foundation-sprint-french.md`. This keeps the mapping readable without a lookup table and consistent with the user-facing flag name.

### Template Files

| Location | Convention | Example |
|----------|-----------|---------|
| English templates | `templates/FILENAME.md` | `templates/HYPOTHESIS.md` (unchanged) |
| French templates | `templates/fr/FILENAME.md` | `templates/fr/HYPOTHESIS.md` |
| Future languages | `templates/{iso-code}/FILENAME.md` | `templates/es/HYPOTHESIS.md` |

Use ISO 639-1 codes (`fr`, `es`, `de`) for the subdirectory, not the full language name. The subdirectory is an internal path, not user-visible. ISO codes are shorter and unambiguous. Template filenames stay identical across languages (`HYPOTHESIS.md` in every subdirectory) — only the path prefix changes.

### What Stays at the Template Root

English templates remain at `templates/FILENAME.md` (not moved to `templates/en/`). The existing English workflow already uses the root path. Moving English templates would break the existing `@`-include references in the English workflow without providing any benefit.

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| Natural language routing in `<process>` block | Separate command files per language (`foundation-sprint-french.md` as a command file) | User API grows with every language; violates LANG-02 |
| Natural language routing in `<process>` block | Binary/Node.js router that reads `$ARGUMENTS` and sets a path variable | No binary tooling is a project constraint; unnecessary complexity for a simple string match |
| `<process>` block with `Read` tool for dynamic workflow loading | Dual `@`-includes in `<execution_context>` | @-includes are static; both files load simultaneously; Claude receives conflicting instructions |
| `templates/fr/` subdirectory (ISO code) | Flat naming `HYPOTHESIS-fr.md` alongside `HYPOTHESIS.md` | Breaks @-include pattern; each language requires a unique naming convention; harder to add languages |
| Full translation per workflow file | Conditional blocks inside one workflow (`<!-- IF FRENCH -->`) | Claude Code has no preprocessor; Claude reads all content; mixed-language sessions result |
| Explicit flag (`-french`) | Auto-detect language from user's first message | Claude's language detection is unreliable for short inputs; explicit flag is unambiguous |

---

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Runtime translation (API calls to DeepL, Google Translate, etc.) | Adds external dependency, API key management, and latency to a session designed to be self-contained | Pre-translated workflow files — translate once, ship as files |
| Binary argument parser (Node.js script that pre-processes `$ARGUMENTS`) | No multi-session state exists; the flag is a simple string match; binary tooling adds installation complexity | Natural language routing in `<process>` block |
| Config file for language preference | No settings system exists in GYST; adds persistence layer for no benefit when an explicit flag is friction-free | Explicit `-french` flag at invocation time |
| Translated `gyst-researcher.md` (sub-agent) | Web searches return better results in English; the researcher outputs English profiles that the French workflow presents to users in French | Keep researcher in English; translation happens at the presentation layer in the French workflow |
| XML section name attributes translated | Section names (`section_customer`, `write_competitors_md`) are used as internal cross-references in workflow instructions — translating them silently breaks cross-references | Translate only displayed content; keep section identifiers in English |
| `$ARGUMENTS` in `<execution_context>` | @-includes are resolved before Claude reads the process block; you cannot construct a dynamic path via `$ARGUMENTS` in this block | Use `<process>` with natural language routing + `Read` tool |

---

## Stack Patterns by Scenario

**If adding a new language (e.g., Spanish after v1.1):**
- Create `templates/es/` with 4 translated template files (copy structure from `templates/fr/`)
- Create `workflows/foundation-sprint-spanish.md` (copy + translate `foundation-sprint-french.md`)
- Add one bullet to the `<process>` routing block: `- If $ARGUMENTS contains "-spanish": read ... foundation-sprint-spanish.md`
- Zero changes to English workflow, English templates, or sub-agent

**If the command needs two arguments (language + mode, e.g., `-french --quick`):**
- Use `$ARGUMENTS[0]` for language, `$ARGUMENTS[1]` for mode in the `<process>` block
- Routing logic stays natural language; Claude parses both tokens
- Not needed for v1.1

**If the install path changes:**
- Workflow filenames and template subdirectory structure are stable conventions independent of install path
- Only the absolute path prefix in `<process>` routing and `@`-includes needs updating

---

## Version Compatibility

| Component | Compatibility Note |
|-----------|-------------------|
| `$ARGUMENTS` substitution | Available in current Claude Code slash commands and skills; `$ARGUMENTS[N]` positional access was added in the skills update (verified in current docs) |
| `argument-hint` frontmatter field | Supported in both `.claude/commands/` files and `.claude/skills/SKILL.md` files |
| `@`-include syntax in workflow body | Stable; used in v1.0 templates section with no issues |
| `.claude/commands/` format | Still supported; skills format (`.claude/skills/SKILL.md`) is the new recommended structure but commands continue to work identically |

---

## Sources

- Official Claude Code skills documentation (verified 2026-03-08): https://code.claude.com/docs/en/slash-commands
  - `$ARGUMENTS` substitution behavior — HIGH confidence
  - `$ARGUMENTS[N]` positional access — HIGH confidence
  - `argument-hint` frontmatter field — HIGH confidence
  - `<execution_context>` @-include static resolution — HIGH confidence (inferred from documentation structure + confirmed by existing command file behavior)
- Existing GYST command file: `commands/gyst/foundation-sprint.md` (read directly — confirmed `<execution_context>` @-include pattern and `<process>` block structure)
- GSD reference commands: `~/.claude/commands/gsd/execute-phase.md` and `add-phase.md` (read directly — confirmed `$ARGUMENTS` usage pattern in `<context>` and `<process>` blocks in a working multi-argument command)
- Existing GYST workflow: `get-your-shit-together/workflows/foundation-sprint.md` (read directly — confirmed `@`-include template reference pattern)

---

*Stack research for: GYST v1.1 multilingual slash-command routing*
*Researched: 2026-03-08*
