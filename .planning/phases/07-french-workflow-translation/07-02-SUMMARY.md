---
phase: 07-french-workflow-translation
plan: 02
subsystem: workflows
tags: [translation, french, foundation-sprint, workflow, hypothesis, approaches]
dependency_graph:
  requires:
    - phase: 07-01
      provides: foundation-sprint-french.md partial (Steps 1 and 2, 15 of 22 sections)
  provides:
    - foundation-sprint-french.md complete — all 22 sections (Steps 1–4)
    - TRANSLATION-SYNC.md — English source commit hash and native speaker review flags
  affects: []
tech_stack:
  added: []
  patterns: [vous register, templates/fr/ @ path pattern, step3_banner/step4_banner translated, TRANSLATION-SYNC maintenance record]
key_files:
  created:
    - TRANSLATION-SYNC.md
  modified:
    - get-your-shit-together/workflows/foundation-sprint-french.md
key_decisions:
  - "section_approach_generation translated fully (HIGH complexity) — no stubs, all sharpening probe logic and internal filter in French"
  - "4 evaluation matrices renamed to Vision Client, Vision Économique, Vision Pragmatique, Vision de Croissance"
  - "templates/fr/ @ path pattern applied to all 3 output templates (HYPOTHESIS, SPRINT, POSITIONING) in section_write_outputs"
  - "TRANSLATION-SYNC.md records English source commit 97e468e21a184026db29b8f25aa54d8b5a185ab7 for future diff-based updates"
patterns-established:
  - "TRANSLATION-SYNC.md pattern: records commit hash of source file for future update diffing"
requirements-completed: [LANG-05, LANG-06, LANG-07]
duration: ~16min
completed: "2026-03-08"
---

# Phase 7 Plan 2: French Workflow — Steps 3 and 4 (Complete) Summary

**Complete 22-section French Foundation Sprint workflow with Steps 3 and 4 translated, all templates/fr/ paths verified, and TRANSLATION-SYNC.md maintenance record created.**

## Performance

- **Duration:** ~16 min
- **Started:** 2026-03-08T15:46:01Z
- **Completed:** 2026-03-08T16:01:51Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Completed `foundation-sprint-french.md` with all 7 remaining sections (step3_banner, section_context_reload, section_approach_generation, section_approach_evaluation, section_approach_recommendation, step4_banner, section_hypothesis, section_testable_form, section_write_outputs) — all translated thoroughly in vous register
- All 7 validation checks passed: 22 sections, English name= identifiers, templates/fr/ paths, language_directive, MAIN ADVERSARY, language_reinforcement blocks, zero tu-register violations
- Created `TRANSLATION-SYNC.md` at project root with English source commit hash and native speaker review flags for the 3 HIGH-complexity sections
- Phase 7 milestone complete: `/gyst:foundation-sprint -french` now has a full pre-translated French workflow

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Append Steps 3 and 4 to complete foundation-sprint-french.md | c04e3ea | get-your-shit-together/workflows/foundation-sprint-french.md |
| 2 | Validate complete French workflow and create TRANSLATION-SYNC.md | 5560510 | TRANSLATION-SYNC.md (created) |

## Files Created/Modified

- `get-your-shit-together/workflows/foundation-sprint-french.md` — extended from 15 to 22 sections; complete French workflow
- `TRANSLATION-SYNC.md` — new file at project root; records English source commit hash and native speaker review flags

## Decisions Made

1. **section_approach_generation fully translated** — HIGH complexity section translated in full with all sharpening probe logic, internal filter (not exposed to user), and finalization lineup. No stubs or summarization.

2. **4-matrix names in French** — Feasibility/Desirability/Viability/Differentiation do not appear in Steps 3/4; the 4 matrices in section_approach_evaluation use different names. Translated as: Vision Client, Vision Économique, Vision Pragmatique, Vision de Croissance — matching the spirit of the English (Customer Vision, Money Vision, Pragmatic Vision, Growth Vision).

3. **templates/fr/ @ path replacements applied in section_write_outputs** — HYPOTHESIS.md, SPRINT.md, POSITIONING.md all point to templates/fr/; @./COMPETITORS.md output reference left unchanged per locked constraint.

4. **TRANSLATION-SYNC.md maintenance record** — created at project root with the exact English source commit hash, diff command, and flagged sections for future French maintainers.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- FOUND: get-your-shit-together/workflows/foundation-sprint-french.md
- FOUND: TRANSLATION-SYNC.md
- FOUND: commit c04e3ea
- FOUND: commit 5560510
- FOUND: .planning/phases/07-french-workflow-translation/07-02-SUMMARY.md
- Section count: 22 (matches English)
- Non-fr template paths: 0 (clean)
- tu-register violations: 0 (clean)
- 97e468e in TRANSLATION-SYNC.md: 2 lines (PASS)
