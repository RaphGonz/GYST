---
name: gyst:add-language
description: Fully automate adding a new language to GYST — routing, templates, workflow, README, and git push
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Agent
  - Task
argument-hint: "<language>"
---

<objective>
You are a fully-automated orchestrator. Your job is to add a new language to the GYST Foundation Sprint tool end-to-end without pausing for user input. You will:

1. Parse the language from $ARGUMENTS
2. Create a new GSD milestone with 3 phases
3. Plan and execute all 3 phases
4. Complete the milestone
5. Update README.md (Languages badge + usage section)
6. Git push everything

**You must auto-advance through every step. Do not pause to ask the user for confirmation between steps.**
</objective>

<process>

## Step 0 — Parse Language

Read $ARGUMENTS. Extract the language name (e.g., "spanish", "Spanish", "SPANISH" → all normalize to "Spanish").

Derive the following variables and use them throughout this entire process:

- **LANG_LOWER** — lowercase, no spaces (e.g., `spanish`)
- **LANG_TITLE** — title case (e.g., `Spanish`)
- **LANG_FLAG** — the CLI flag (e.g., `-spanish`)
- **LANG_NATIVE** — the language's name in that language (e.g., `Español` for Spanish, `Deutsch` for German, `Português` for Portuguese, `Italiano` for Italian, `日本語` for Japanese — use your knowledge to derive this)
- **LANG_EMOJI** — country flag emoji most associated with that language (e.g., 🇪🇸 for Spanish, 🇩🇪 for German)
- **MILESTONE_NAME** — `LANG_TITLE Language Support` (e.g., `Spanish Language Support`)
- **WORKFLOW_FILE** — `foundation-sprint-LANG_LOWER.md` (e.g., `foundation-sprint-spanish.md`)
- **TEMPLATE_DIR** — `templates/LANG_LOWER/` (e.g., `templates/es/` — use the ISO 639-1 2-letter code for the dir name, e.g., `es` for Spanish, `de` for German, `pt` for Portuguese, `it` for Italian, `ja` for Japanese, `zh` for Chinese)

After parsing, print a one-line confirmation:
```
Adding language: LANG_TITLE (flag: LANG_FLAG, template dir: TEMPLATE_DIR, workflow: WORKFLOW_FILE)
```

Then proceed immediately to Step 1.

---

## Step 1 — Create the GSD Milestone

Invoke the `/gsd:new-milestone` skill. When it asks for milestone details, provide the following without waiting for user input:

- **Milestone name:** `vX.Y LANG_TITLE Language Support` (use the next available version after the current one — check `.planning/milestones/` to find the current version)
- **Milestone goal:** Users can run the full Foundation Sprint in LANG_TITLE via a single `-LANG_LOWER` flag, with a fully pre-translated workflow and output templates, following the same extensible routing architecture established for French.
- **Phases:** 3 phases as described below

If `/gsd:new-milestone` is interactive and requires step-by-step answers, answer each question using the context below. If it allows a batch description, provide the full 3-phase breakdown at once.

**Phase A — Routing Update**
- Goal: Add `-LANG_LOWER` routing to `commands/gyst/foundation-sprint.md` (update `argument-hint` and the routing `<process>` block), then deploy the updated file to both `commands/gyst/` (repo copy) and `~/.claude/commands/gyst/` (installed copy).
- Success criteria:
  1. `argument-hint` in `foundation-sprint.md` includes `LANG_FLAG` alongside existing flags
  2. The `<process>` block contains a bullet routing `LANG_FLAG` to `~/.claude/get-your-shit-together/workflows/WORKFLOW_FILE`
  3. Both file locations are identical (repo copy and `~/.claude/` copy)
  4. Running `/gyst:foundation-sprint LANG_FLAG` would route correctly (the workflow file can be missing at this stage)

**Phase B — LANG_TITLE Output Templates**
- Goal: Create `get-your-shit-together/TEMPLATE_DIR` with all 4 translated template files (`COMPETITORS.md`, `HYPOTHESIS.md`, `SPRINT.md`, `POSITIONING.md`), translated into LANG_TITLE — same structure as `templates/fr/`.
- Success criteria:
  1. All 4 files exist at `get-your-shit-together/TEMPLATE_DIR`
  2. All user-facing text (headers, labels, section titles, prose, comments) is in LANG_TITLE
  3. The `* MAIN ADVERSARY` marker in COMPETITORS.md is preserved verbatim (untranslated)
  4. File names are identical to the English originals (not `HYPOTHESIS-LANG_LOWER.md`)

**Phase C — LANG_TITLE Workflow Translation**
- Goal: Create `get-your-shit-together/workflows/WORKFLOW_FILE` — a complete, self-contained LANG_TITLE workflow identical in structure to `foundation-sprint-french.md` — and update `TRANSLATION-SYNC.md`.
- Success criteria:
  1. `WORKFLOW_FILE` exists and contains all 22 section `name=` identifiers unchanged
  2. A strong LANG_TITLE-language directive appears at the top before any section content
  3. Every `@` template reference in the workflow points to `get-your-shit-together/TEMPLATE_DIR` (not `templates/fr/`)
  4. `TRANSLATION-SYNC.md` is updated with a new row for LANG_TITLE (source commit hash, date, workflow file path)

After the milestone is created, proceed immediately to Step 2.

---

## Step 2 — Plan Phase A (Routing Update)

Invoke `/gsd:plan-phase` for Phase A. Provide this context to the planner:

> Phase A of MILESTONE_NAME. Goal: update `commands/gyst/foundation-sprint.md` to add LANG_FLAG routing.
>
> Specific tasks:
> 1. Read `commands/gyst/foundation-sprint.md`
> 2. Update `argument-hint` to add `LANG_FLAG` (e.g., if current is `"[-french]"` make it `"[-french | LANG_FLAG]"`)
> 3. In the `<process>` block, add a new bullet: `- If $ARGUMENTS contains "LANG_FLAG": read and execute ~/.claude/get-your-shit-together/workflows/WORKFLOW_FILE`
> 4. Write the updated file back to `commands/gyst/foundation-sprint.md`
> 5. Copy the updated file to `~/.claude/commands/gyst/foundation-sprint.md`
>
> Reference: current file at `commands/gyst/foundation-sprint.md`

After planning, proceed immediately to Step 3.

---

## Step 3 — Execute Phase A

Invoke `/gsd:execute-phase` for Phase A. Auto-approve any confirmations.

After execution, proceed immediately to Step 4.

---

## Step 4 — Plan Phase B (Templates)

Invoke `/gsd:plan-phase` for Phase B. Provide this context to the planner:

> Phase B of MILESTONE_NAME. Goal: create all 4 Foundation Sprint output templates in LANG_TITLE at `get-your-shit-together/TEMPLATE_DIR`.
>
> Reference files to translate (read each before translating):
> - `get-your-shit-together/templates/fr/COMPETITORS.md` → translate to LANG_TITLE → write to `get-your-shit-together/TEMPLATE_DIR/COMPETITORS.md`
> - `get-your-shit-together/templates/fr/HYPOTHESIS.md` → translate to LANG_TITLE → write to `get-your-shit-together/TEMPLATE_DIR/HYPOTHESIS.md`
> - `get-your-shit-together/templates/fr/SPRINT.md` → translate to LANG_TITLE → write to `get-your-shit-together/TEMPLATE_DIR/SPRINT.md`
> - `get-your-shit-together/templates/fr/POSITIONING.md` → translate to LANG_TITLE → write to `get-your-shit-together/TEMPLATE_DIR/POSITIONING.md`
>
> Translation rules:
> - All user-facing text (headers, labels, comments, prose) must be in LANG_TITLE
> - Preserve `* MAIN ADVERSARY` verbatim in COMPETITORS.md
> - Preserve all markdown table structure and HTML comment syntax
> - File names stay identical to English originals

After planning, proceed immediately to Step 5.

---

## Step 5 — Execute Phase B

Invoke `/gsd:execute-phase` for Phase B. Auto-approve any confirmations.

After execution, proceed immediately to Step 6.

---

## Step 6 — Plan Phase C (Workflow Translation)

Invoke `/gsd:plan-phase` for Phase C. Provide this context to the planner:

> Phase C of MILESTONE_NAME. Goal: create `get-your-shit-together/workflows/WORKFLOW_FILE` — a complete LANG_TITLE translation of the Foundation Sprint workflow.
>
> Source file to translate: `get-your-shit-together/workflows/foundation-sprint-french.md`
> Target file: `get-your-shit-together/workflows/WORKFLOW_FILE`
>
> Translation rules:
> - Add a strong LANG_TITLE-language directive at the top (modeled on the `<language_directive>` block in the French file but in LANG_TITLE)
> - Translate all user-facing content to LANG_TITLE
> - Preserve all 22 section `name=` identifiers exactly as-is (do NOT translate these)
> - Replace every `templates/fr/` path reference with `TEMPLATE_DIR`
> - Keep sub-agent Task briefs in English (the gyst-researcher agent operates in English — this is intentional)
> - After creating the workflow file, update `TRANSLATION-SYNC.md`:
>   - Add a new row to the table for LANG_TITLE
>   - Run `git rev-parse HEAD` to get the current commit hash for the source field
>   - Record today's date
>
> The French workflow is long (~1200+ lines). Split the translation into logical chunks if needed, but the final file must be complete and self-contained.

After planning, proceed immediately to Step 7.

---

## Step 7 — Execute Phase C

Invoke `/gsd:execute-phase` for Phase C. Auto-approve any confirmations.

After execution, proceed immediately to Step 8.

---

## Step 8 — Complete the Milestone

Invoke `/gsd:complete-milestone`. When it asks for version tag information, provide:
- Version: the milestone version (e.g., `v1.2`)
- Tag message: `Add LANG_TITLE language support to Foundation Sprint`

After completion, proceed immediately to Step 9.

---

## Step 9 — Update README.md

Read `README.md`. Make two targeted edits:

**Edit 1 — Languages badge**

Find the Languages badge line. It looks like:
```
[![Languages](https://img.shields.io/badge/languages-English%20%7C%20French-4B8BBE?style=for-the-badge)](...)
```

Update the badge URL to include LANG_TITLE. The languages are separated by `%20%7C%20` (URL-encoded ` | `). Add LANG_TITLE at the end:
- Before: `English%20%7C%20French`
- After: `English%20%7C%20French%20%7C%20LANG_TITLE` (URL-encode LANG_TITLE — spaces become `%20`, accented chars become their percent-encoded equivalents)

**Edit 2 — Usage section**

Find the French usage example block (the `### 🇫🇷 Run in French` section). After it, add a new section:

```markdown
### LANG_EMOJI Run in LANG_TITLE

Pass the `LANG_FLAG` flag to run the entire sprint in LANG_TITLE — all questions, guidance, and output files will be in LANG_TITLE:

```
/gyst:foundation-sprint LANG_FLAG
```

Everything works the same way. Claude switches to a fully pre-translated workflow and writes `COMPETITORS.md`, `HYPOTHESIS.md`, `SPRINT.md`, and `POSITIONING.md` in LANG_TITLE.
```

After updating README.md, proceed immediately to Step 10.

---

## Step 10 — Git Push

Run the following commands in sequence:

```bash
cd ~/Desktop/GYST  # or whatever the repo root is — detect it from context
git add -A
git commit -m "feat: add LANG_TITLE language support

- Add LANG_FLAG routing to foundation-sprint.md command
- Create TEMPLATE_DIR output templates in LANG_TITLE
- Create workflows/WORKFLOW_FILE
- Update TRANSLATION-SYNC.md
- Update README.md Languages badge and usage section"
git push
```

After pushing, print a success summary:

```
✓ LANG_TITLE language support added to GYST
✓ Routing: /gyst:foundation-sprint LANG_FLAG
✓ Templates: get-your-shit-together/TEMPLATE_DIR
✓ Workflow: get-your-shit-together/workflows/WORKFLOW_FILE
✓ README: updated
✓ Pushed to remote
```

</process>
