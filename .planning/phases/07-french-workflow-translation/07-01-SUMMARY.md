---
phase: 07-french-workflow-translation
plan: 01
subsystem: workflows
tags: [translation, french, foundation-sprint, workflow]
dependency_graph:
  requires: [06-01]
  provides: [foundation-sprint-french.md partial — Steps 1 and 2]
  affects: [07-02]
tech_stack:
  added: []
  patterns: [language_directive block, language_reinforcement blocks, vous register]
key_files:
  created:
    - get-your-shit-together/workflows/foundation-sprint-french.md
  modified: []
decisions:
  - "language_directive placed before objective — sets French session context for entire workflow"
  - "language_reinforcement added before section_problem and section_competitors_research — both trigger external agents (WebSearch, Task tool) where language drift is most likely"
  - "English Task brief preserved verbatim in section_competitors_research — gyst-researcher is English-only; surrounding prose translated"
  - "Canonical 8th axis: Étroit / Large — confirmed in plan interfaces (not locked from Phase 6, set here)"
  - "section_manifesto translated with decision-constraining examples in French to preserve behavioral intent"
metrics:
  duration: ~14 min
  completed_date: "2026-03-08"
  tasks_completed: 2
  files_changed: 1
---

# Phase 7 Plan 1: French Workflow — Steps 1 and 2 Summary

**One-liner:** French Foundation Sprint workflow translated for Steps 1 and 2 (15 of 22 sections) with language_directive, canonical axis labels, and vous register throughout.

## What Was Built

Created `get-your-shit-together/workflows/foundation-sprint-french.md` as a partial French translation of the English `foundation-sprint.md`. The file covers:

- YAML frontmatter with French description
- `<language_directive>` block (placed before `<objective>`) — mandatory French session instruction covering all responses, file outputs, and the gyst-researcher English exception
- `<objective>` — translated with all 6 key behavior rules in French
- `<onboarding>` — translated welcome message with 4 steps and 4 output files in French
- `<step1_banner>` — translated with French field labels (Client, Problème, Avantages, Concurrents) and "en attente" for pending
- 8 Step 1 sections: section_customer, section_problem, section_advantages, section_competitors, section_competitors_research, section_main_adversary, write_competitors_md, navigation_controls
- `<step2_banner>` — translated with French axis labels and positions
- 7 Step 2 sections: section_axis_rating, section_custom_axes, section_axis_selection, section_competitor_scoring, section_matrix_render, section_manifesto, section_step2_navigation

### Locked Constraints Honored

- **vous register** — zero instances of "tu/ton/ta/tes/te" in user-facing prose
- **`* MAIN ADVERSARY`** — preserved verbatim in write_competitors_md
- **English Task brief** — gyst-researcher invocation content kept in English
- **`@./COMPETITORS.md`** — unchanged output reference in section_competitor_scoring
- **templates/fr/COMPETITORS.md** — path correctly replaced in write_competitors_md
- **Canonical axis labels** — all 8 axes use exact locked French strings:
  1. Lent / Rapide
  2. Difficile / Facile
  3. Cher / Gratuit
  4. Complexe / Simple
  5. Basique / Intelligent
  6. Cloisonné / Intégré
  7. Manuel / Automatique
  8. Étroit / Large

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write French file header and Step 1 sections | d03954d | get-your-shit-together/workflows/foundation-sprint-french.md (created) |
| 2 | Append Step 2 sections to French workflow | 9019fe3 | get-your-shit-together/workflows/foundation-sprint-french.md (extended) |

## Deviations from Plan

None — plan executed exactly as written.

## Decisions Made

1. **language_directive before objective** — the block is placed immediately after the YAML frontmatter closing `---`, before `<objective>`, so it is the first instruction Claude reads in any session.

2. **language_reinforcement placement** — added before `section_problem` (triggers WebSearch) and `section_competitors_research` (triggers Task tool with gyst-researcher). These are the two points most likely to produce English output if not explicitly reinforced.

3. **section_manifesto translation fidelity** — translated all three example phrases as decision-constraining statements (not marketing copy) to preserve the behavioral test that distinguishes valid manifesto phrases from rejected ones.

4. **8th axis Étroit / Large** — plan interfaces explicitly designate this for use here (not locked from Phase 6). Used verbatim throughout section_axis_rating, section_axis_selection, and section_competitor_scoring field guidance.

## Self-Check: PASSED

- FOUND: get-your-shit-together/workflows/foundation-sprint-french.md
- FOUND: commit d03954d
- FOUND: commit 9019fe3
- FOUND: .planning/phases/07-french-workflow-translation/07-01-SUMMARY.md
