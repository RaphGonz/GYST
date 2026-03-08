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
2. Execute 3 phases of work (routing, templates, workflow translation)
3. Update README.md (Languages badge + "Run in another language" table row)
4. Git push everything

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
- **WORKFLOW_FILE** — `foundation-sprint-LANG_LOWER.md` (e.g., `foundation-sprint-spanish.md`)
- **TEMPLATE_DIR** — `templates/ISO/` where ISO is the ISO 639-1 2-letter code (e.g., `templates/es/` for Spanish, `templates/de/` for German, `templates/pt/` for Portuguese, `templates/it/` for Italian, `templates/ja/` for Japanese, `templates/zh/` for Chinese)

After parsing, print a one-line confirmation:
```
Adding language: LANG_TITLE (flag: LANG_FLAG, template dir: TEMPLATE_DIR, workflow: WORKFLOW_FILE)
```

Then proceed immediately to Phase A.

---

## Phase A — Routing Update

**Goal:** Add `LANG_FLAG` routing to `commands/gyst/foundation-sprint.md`.

Steps:
1. Read `commands/gyst/foundation-sprint.md`
2. In the frontmatter, update `argument-hint` to append `| LANG_FLAG` to the existing flags
3. In the `<process>` block, insert a new bullet **before** the "empty or no language flag" bullet:
   ```
   - If $ARGUMENTS contains "LANG_FLAG": read and execute
     ~/.claude/get-your-shit-together/workflows/WORKFLOW_FILE
   ```
4. Write the updated file back to `commands/gyst/foundation-sprint.md`
5. Copy it to `~/.claude/commands/gyst/foundation-sprint.md`

Verify: the file contains `LANG_FLAG` in both `argument-hint` and the `<process>` block.

Proceed immediately to Phase B.

---

## Phase B — LANG_TITLE Output Templates

**Goal:** Create `get-your-shit-together/TEMPLATE_DIR` with all 4 translated template files.

Steps:
1. Create directory `get-your-shit-together/TEMPLATE_DIR`
2. Read each French template and write a LANG_TITLE translation:
   - `get-your-shit-together/templates/fr/COMPETITORS.md` → `get-your-shit-together/TEMPLATE_DIR/COMPETITORS.md`
   - `get-your-shit-together/templates/fr/HYPOTHESIS.md` → `get-your-shit-together/TEMPLATE_DIR/HYPOTHESIS.md`
   - `get-your-shit-together/templates/fr/SPRINT.md` → `get-your-shit-together/TEMPLATE_DIR/SPRINT.md`
   - `get-your-shit-together/templates/fr/POSITIONING.md` → `get-your-shit-together/TEMPLATE_DIR/POSITIONING.md`

Translation rules:
- All user-facing text (headers, labels, comments, prose) must be in LANG_TITLE
- Preserve `* MAIN ADVERSARY` verbatim in COMPETITORS.md
- Preserve all markdown table structure and HTML comment syntax
- File names stay identical to English originals

Verify: all 4 files exist and `* MAIN ADVERSARY` is intact in COMPETITORS.md.

Proceed immediately to Phase C.

---

## Phase C — LANG_TITLE Workflow Translation

**Goal:** Create `get-your-shit-together/workflows/WORKFLOW_FILE` — a complete LANG_TITLE translation of the Foundation Sprint workflow — and update `TRANSLATION-SYNC.md`.

Steps:
1. Read `get-your-shit-together/workflows/foundation-sprint-french.md` in full
2. Translate it to LANG_TITLE following these rules:
   - Add a strong LANG_TITLE-language directive at the top (model on the `<language_directive>` block but in LANG_TITLE)
   - Translate all user-facing content to LANG_TITLE
   - **Preserve exactly** all 22 section `name=` attribute values (do NOT translate them)
   - Replace every `templates/fr/` path with `TEMPLATE_DIR`
   - Keep sub-agent Task briefs in English (gyst-researcher operates in English — intentional)
3. Write the complete file to `get-your-shit-together/workflows/WORKFLOW_FILE`
4. Run `git rev-parse HEAD` to get the current commit hash
5. Append a new block to `TRANSLATION-SYNC.md` recording: workflow file, source file, commit hash, today's date, translator

Verify: `WORKFLOW_FILE` has 22 `name=` occurrences and all `@` template refs point to `TEMPLATE_DIR`.

Proceed immediately to Step 9.

---

## Step 9 — Update README.md

Read `README.md`. Make exactly two targeted edits:

**Edit 1 — Languages badge**

Find the Languages badge line (contains `img.shields.io/badge/languages-`). The languages are URL-encoded, separated by `%20%7C%20` (= ` | `). Append `%20%7C%20LANG_URL` at the end of the language list, where `LANG_URL` is LANG_TITLE URL-encoded (spaces → `%20`, accented chars → percent-encoded).

Example: `English%20%7C%20French%20%7C%20Spanish` → `English%20%7C%20French%20%7C%20Spanish%20%7C%20German`

**Edit 2 — Language table in "Run in another language" section**

Find the section `### Run in another language`. Inside it is a markdown table with columns `| Flag | Language |`. Add a new row at the bottom of that table:

```
| `LANG_FLAG` | LANG_EMOJI LANG_TITLE / LANG_NATIVE |
```

Do NOT add a new `###` section. Do NOT modify the example command block or any other text in that section.

After updating README.md, proceed immediately to Step 10.

---

## Step 10 — Git Push

Run in sequence from the repo root:

```bash
git add commands/gyst/foundation-sprint.md get-your-shit-together/TEMPLATE_DIR get-your-shit-together/workflows/WORKFLOW_FILE TRANSLATION-SYNC.md README.md
git commit -m "feat: add LANG_TITLE language support

- Add LANG_FLAG routing to foundation-sprint.md command
- Create TEMPLATE_DIR output templates in LANG_TITLE
- Create workflows/WORKFLOW_FILE
- Update TRANSLATION-SYNC.md
- Update README.md Languages badge and language table"
git push
```

Print a success summary:

```
✓ LANG_TITLE language support added to GYST
✓ Routing: /gyst:foundation-sprint LANG_FLAG
✓ Templates: get-your-shit-together/TEMPLATE_DIR
✓ Workflow: get-your-shit-together/workflows/WORKFLOW_FILE
✓ README: badge + language table updated
✓ Pushed to remote
```

</process>
