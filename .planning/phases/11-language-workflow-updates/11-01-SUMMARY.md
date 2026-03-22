---
phase: 11-language-workflow-updates
plan: 01
subsystem: workflow-translation
tags: [french, foundation-sprint, 5pm-framework, translation, workflow]

# Dependency graph
requires:
  - phase: 08-english-step1-5pm-lenses
    provides: section_purchaser, section_problem_importance, section_market_sizing — English source for French translation
  - phase: 09-english-step3-fit-validation-scorecard
    provides: section_founder_fit, Matrix 5, section_write_outputs 4th file — English source for French translation
  - phase: 10-language-scorecard-templates
    provides: 5PM-SCORECARD.md French template and 5PM-TERMINOLOGY-REGISTER.md — required for Phase 11 translations
provides:
  - French Foundation Sprint workflow synced to English Phase 8-9 changes
  - 4 new awareness sections in French (section_purchaser, section_problem_importance, section_market_sizing, section_founder_fit)
  - Matrix 5 (Douleur a Valider) in French section_approach_evaluation
  - 5PM-SCORECARD.md write block in French section_write_outputs
  - 7-item NAVIG-02 DISCARD RULE cascade in French navigation_controls
affects: [12-language-workflow-updates-ja-pt, future-french-workflow-maintenance]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Non-blocking awareness pass pattern applied in French: IMPORTANT block, no lock announcement, no banner re-render, one question, named field capture, transition"
    - "scorecard_* field names kept in English; all user-facing text translated to French"
    - "Vous register used throughout; space-before-colon convention honored (Verdict :)"
    - "Prisme used for Lens, Acheteur for Purchaser, Adéquation Fondateur for Founder Fit, Douleur à Valider for Pain to Validate"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint-french.md

key-decisions:
  - "[11-01]: section_purchaser inserted after section_customer closing tag, before language_reinforcement block — matches English structural position"
  - "[11-01]: scorecard_* field names kept in English throughout all new French sections — scorecard is a system identifier, not user-facing text"
  - "[11-01]: section_approach_recommendation's 'Examinez les 4 matrices' intentionally kept at 4 — Matrix 5 is AI-scored, not user-reviewed; faithful to English source"
  - "[11-01]: SPRINT.md write instruction in section_write_outputs kept at '4 matrices' to match English source verbatim"

patterns-established:
  - "Translation pattern: section name= identifiers stay English; field names (scorecard_*) stay English; structural markers (IMPORTANT, AWARENESS-01) stay English; only user-facing text is translated"

requirements-completed: [TRNS-02]

# Metrics
duration: 16min
completed: 2026-03-22
---

# Phase 11 Plan 01: French Workflow Sync Summary

**French Foundation Sprint updated from 22 to 26 sections: 4 new 5PM awareness passes (Acheteur, I/U, Marché, Adéquation Fondateur), Matrix 5 (Douleur à Valider), and 5PM-SCORECARD.md as 4th output file**

## Performance

- **Duration:** 16 min
- **Started:** 2026-03-22T19:57:31Z
- **Completed:** 2026-03-22T20:13:00Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Inserted 4 new awareness sections at correct structural positions: section_purchaser (after section_customer), section_problem_importance (after section_problem), section_market_sizing (after write_competitors_md), section_founder_fit (after section_context_reload)
- Updated navigation_controls NAVIG-02 from 4 to 7 sub-decisions with full DISCARD RULE cascade including all scorecard_* field wipes
- Upgraded section_approach_evaluation from "4 Matrices" to "5 Matrices" — added complete Matrix 5 (Douleur à Valider) block with scorecard_pain_matrix field capture
- Added scorecard_chosen_approach field capture to section_approach_recommendation before banner re-render
- Added 5PM-SCORECARD.md as 4th output in section_write_outputs with full 5-prisme assembly logic in French using correct terminology (Prisme, Acheteur, Adéquation Fondateur, Douleur à Valider, FAVORABLE/ATTENTION/DÉFAVORABLE/MITIGÉ)
- Updated onboarding, language_directive, and objective block to reference 5 matrices and 5 output files (including 5PM-SCORECARD.md)

## Task Commits

1. **Task 1: Sync French workflow with all Phase 8-9 English changes** - `b7d3104` (feat)

**Plan metadata:** [pending — added below]

## Files Created/Modified

- `get-your-shit-together/workflows/foundation-sprint-french.md` — Synced from 22 to 26 sections; 279 line insertions, 17 line deletions

## Decisions Made

- section_purchaser inserted BEFORE the language_reinforcement block that precedes section_problem (per research guidance: "after customer lock block, before language_reinforcement block")
- "Examinez les 4 matrices" in section_approach_recommendation deliberately kept at 4 — per research open question resolution: Matrix 5 is AI-scored, recommendation is based on Matrices 1–4
- Onboarding comment updated from "quatre fichiers de sortie" to reference 5 outputs including 5PM-SCORECARD.md

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- French workflow is now fully synced to English Phase 8-9 state
- Japanese and Portuguese workflows require the same sync (Phase 11 Plans 02-03 or combined)
- TRANSLATION-SYNC.md French record needs update to commit hash b4c1af6 after all Phase 11 language workflows are complete

## Self-Check: PASSED

- FOUND: `get-your-shit-together/workflows/foundation-sprint-french.md` (26 sections confirmed)
- FOUND: `.planning/phases/11-language-workflow-updates/11-01-SUMMARY.md`
- FOUND: commit `b7d3104`
- Verification: 26 section name= identifiers, 4 new sections present, 0 occurrences of "3 fichiers", 5PM-SCORECARD references in language_directive + onboarding + section_write_outputs

---
*Phase: 11-language-workflow-updates*
*Completed: 2026-03-22*
