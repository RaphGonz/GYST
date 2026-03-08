---
phase: 06-french-output-templates
plan: 01
subsystem: templates
tags: [french, i18n, templates, localization, foundation-sprint]

# Dependency graph
requires:
  - phase: 05-language-routing
    provides: Language routing infrastructure that will load these French templates via @-includes in Phase 7
provides:
  - Four French output template files at get-your-shit-together/templates/fr/ (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md)
  - Canonical target paths that Phase 7's French workflow will reference via @-includes
  - Established French translations for all bipolar axis labels used in sprint differentiation step
  - `* MAIN ADVERSARY` preservation decision documented — Phase 7 must never translate this marker
affects:
  - 07-french-workflow (must mirror axis label translations and bracket-label format established here)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "French templates are structurally identical to English originals — same filenames, same heading levels, same markdown structure; only prose content is translated"
    - "Machine-readable markers (e.g., `* MAIN ADVERSARY`) are preserved verbatim — never translated — to avoid breaking workflow parsing"
    - "H1 headings that are filename-as-title (e.g., `# COMPETITORS.md`) are left unchanged — these are file identity markers, not prose"
    - "HTML comment instructional blocks (`<!-- ... -->`) are fully translated — Claude reads them during execution"

key-files:
  created:
    - get-your-shit-together/templates/fr/COMPETITORS.md
    - get-your-shit-together/templates/fr/HYPOTHESIS.md
    - get-your-shit-together/templates/fr/SPRINT.md
    - get-your-shit-together/templates/fr/POSITIONING.md
  modified: []

key-decisions:
  - "`* MAIN ADVERSARY` preserved verbatim (not translated to `* ADVERSAIRE PRINCIPAL`) — machine-readable marker identifying the flagged competitor in Phase 7 workflow; translating it would silently break competitor identification"
  - "H1 headings left as filenames unchanged (`# COMPETITORS.md`, `# HYPOTHESIS.md`, `# SPRINT.md`, `# POSITIONING.md`) — these are file identity markers, not user-visible prose"
  - "Bipolar axis translations for SPRINT.md: Slow/Fast→Lent/Rapide, Hard/Easy→Difficile/Facile, Expensive/Free→Cher/Gratuit, Complex/Simple→Complexe/Simple, Dumb/Smart→Basique/Intelligent, Siloed/Integrated→Cloisonné/Intégré, Manual/Automatic→Manuel/Automatique — Phase 7 must output these exact French values in section_axis_rating"
  - "COMPETITORS.md Type field enumeration: `Direct / Indirect` → `Directe / Indirecte` (presentational only, not machine-parsed)"
  - "Bracket-label variable names in HYPOTHESIS.md blockquote are translated to French (e.g., `[CLIENT CIBLE : ...]`) — these are user-visible content labels, not machine-parsed identifiers; variable letters X/Y/Z/W/U/V in Breakdown table rows are preserved as formal identifiers"

patterns-established:
  - "French template filenames match English originals exactly — no French-language filename variants"
  - "All instructional comment text (<!-- -->) is translated — Claude processes these during sprint execution"
  - "ASCII art structures preserved byte-for-byte — only the word labels within are translated"

requirements-completed: [LANG-04]

# Metrics
duration: ~30min
completed: 2026-03-08
---

# Phase 6 Plan 01: French Output Templates Summary

**Four fully-translated French sprint templates created at `get-your-shit-together/templates/fr/` with `* MAIN ADVERSARY` preserved verbatim and all bipolar axis labels translated to canonical French equivalents**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-03-08
- **Completed:** 2026-03-08
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 4 created

## Accomplishments

- Created `fr/COMPETITORS.md` with all field labels, section headings, and instructional comments in French; `* MAIN ADVERSARY` machine-readable marker preserved verbatim
- Created `fr/HYPOTHESIS.md` with French headings, fully-translated blockquote prose using French bracket-labels (`[CLIENT CIBLE : ...]`, etc.), and variable letters X/Y/Z/W/U/V preserved in Breakdown table
- Created `fr/SPRINT.md` with all 4 steps' headings and field labels translated, bipolar axis table fully in French (`Lent <-> Rapide`, etc.), and 4-Matrix Evaluation labels translated
- Created `fr/POSITIONING.md` with French section headings, translated ASCII matrix word labels (`Élevé [Axe 1]`/`Élevé [Axe 2]`/`Faible`), and French Mini-Manifesto labels; ASCII art structure preserved intact
- Human verification passed — all five spot-checks confirmed pass by user

## Task Commits

Each task was committed atomically:

1. **Task 1: Create fr/COMPETITORS.md and fr/HYPOTHESIS.md** - `7880371` (feat)
2. **Task 2: Create fr/SPRINT.md and fr/POSITIONING.md** - `a846e07` (feat)
3. **Task 3: Human verify French templates** - checkpoint approved (no commit — verification only)

## Files Created/Modified

- `get-your-shit-together/templates/fr/COMPETITORS.md` — French competitor research template with preserved `* MAIN ADVERSARY` marker
- `get-your-shit-together/templates/fr/HYPOTHESIS.md` — French hypothesis template with translated blockquote bracket-labels and variable letter identifiers preserved
- `get-your-shit-together/templates/fr/SPRINT.md` — Full French sprint journal with translated axis names, step headings, field labels, and 4-matrix table
- `get-your-shit-together/templates/fr/POSITIONING.md` — French positioning template with translated ASCII matrix labels and Mini-Manifesto

## Decisions Made

**`* MAIN ADVERSARY` preservation:** The machine-readable marker that identifies the flagged competitor must remain verbatim. Translating it to `* ADVERSAIRE PRINCIPAL` would silently break Phase 7's competitor identification logic. Phase 7 must never translate this marker when generating output.

**H1 filename-as-title pattern:** All four H1 headings (`# COMPETITORS.md`, `# HYPOTHESIS.md`, `# SPRINT.md`, `# POSITIONING.md`) are left unchanged. These are file identity markers that anchor the template, not prose to be translated.

**Bipolar axis label translations (canonical for Phase 7):** Phase 7's `section_axis_rating` output must produce these exact French strings to match what the SPRINT.md template expects:
- `Slow <-> Fast` → `Lent <-> Rapide`
- `Hard <-> Easy` → `Difficile <-> Facile`
- `Expensive <-> Free` → `Cher <-> Gratuit`
- `Complex <-> Simple` → `Complexe <-> Simple`
- `Dumb <-> Smart` → `Basique <-> Intelligent`
- `Siloed <-> Integrated` → `Cloisonné <-> Intégré`
- `Manual <-> Automatic` → `Manuel <-> Automatique`

**HYPOTHESIS.md bracket-label translation:** The bracket-labels inside the hypothesis blockquote are user-visible content labels and are translated to French (`[CLIENT CIBLE : ...]`, `[PROBLÈME : ...]`, etc.). This differs from the variable letters X/Y/Z/W/U/V in the Breakdown table, which are formal identifiers preserved as-is.

**COMPETITORS.md Type enumeration:** `Direct / Indirect` → `Directe / Indirecte` — presentational only, not machine-parsed by Phase 7.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All four French template files exist at canonical paths Phase 7 will @-include
- Axis label translations are documented and canonical — Phase 7 planner must mirror these exactly in the French workflow's `section_axis_rating` output
- The `* MAIN ADVERSARY` preservation rule is documented — Phase 7 must not translate this marker in any output it generates
- Blocker note from STATE.md resolved: axis label translation decision is now settled (documented above); Phase 7 planning can proceed without this open question

---
*Phase: 06-french-output-templates*
*Completed: 2026-03-08*
