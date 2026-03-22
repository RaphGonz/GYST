---
phase: 11-language-workflow-updates
plan: 02
subsystem: workflow
tags: [japanese, translation, foundation-sprint, 5pm-framework, workflow]

# Dependency graph
requires:
  - phase: 08-english-step1-5pm-lenses
    provides: section_purchaser, section_problem_importance, section_market_sizing, navigation_controls 7-item cascade
  - phase: 09-english-step3-fit-validation-scorecard
    provides: section_founder_fit, Matrix 5 (Pain to Validate), section_write_outputs 4-file pattern
  - phase: 10-language-scorecard-templates
    provides: templates/ja/5PM-SCORECARD.md template path and Japanese terminology register
provides:
  - Japanese Foundation Sprint workflow synced to all Phase 8-9 changes
  - section_purchaser in Japanese (購買担当者 B2C/B2A/B2B/B2E tiers)
  - section_problem_importance in Japanese (I/U 2x2, ビタミン nudge)
  - section_market_sizing in Japanese (RESEARCH-04, range-based presentation)
  - section_founder_fit in Japanese (3 Fit questions, 創業者適性)
  - Matrix 5 (検証コスト) in section_approach_evaluation
  - 5PM-SCORECARD.md as 4th output file in section_write_outputs
affects:
  - 11-language-workflow-updates (plan 03 if French/Portuguese plans follow same structure)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Non-blocking awareness pass pattern applied to 4 new Japanese sections
    - Named scorecard_* field capture in Japanese (field names stay English)
    - 7-item DISCARD RULE cascade with per-sub-decision scorecard_* wipe specificity

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint-japanese.md

key-decisions:
  - "All section name= identifiers stay English in Japanese file — structural markers not translated"
  - "All scorecard_* field names stay English — only user-facing text translated to Japanese polite register (丁寧語)"
  - "B2A tier description adapted to Japanese context (月額2,000〜10,000円 range instead of $20-100/mo)"
  - "scorecard_fit_passion uses はい/消極的/いいえ as Japanese equivalents of yes/lukewarm/no"
  - "section_approach_evaluation heading updated to 5つのマトリクス評価; Matrix 5 block added after Matrix 4"

patterns-established:
  - "Japanese vocabulary: 購買担当者 (Purchaser), 創業者適性 (Founder Fit), 検証コスト (Pain to Validate), 視点 (Lens)"
  - "Japanese verdicts: 有望 / 注意 / 懸念あり (FAVORABLE / CAUTION / UNFAVORABLE)"

requirements-completed: [TRNS-02]

# Metrics
duration: 18min
completed: 2026-03-22
---

# Phase 11 Plan 02: Japanese Foundation Sprint Sync Summary

**Japanese Foundation Sprint updated from 22 to 26 sections with all Phase 8-9 5PM framework additions — 4 new awareness sections, Matrix 5 (検証コスト), and 5PM-SCORECARD.md as 4th output file**

## Performance

- **Duration:** ~18 min
- **Started:** 2026-03-22T20:30:00Z
- **Completed:** 2026-03-22T20:48:29Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Inserted 4 new sections at correct positions: section_purchaser, section_problem_importance, section_market_sizing, section_founder_fit
- Updated navigation_controls with 7-item NAVIG-02 sub-decision menu and 7-item DISCARD RULE cascade with per-item scorecard_* wipe lists
- Updated section_approach_evaluation: renamed to 5-Matrix Evaluation (5つのマトリクス評価), added Matrix 5 block (検証コスト) with scorecard_pain_matrix field capture
- Added scorecard_chosen_approach capture to section_approach_recommendation
- Updated section_write_outputs: now produces 4 files, includes full 5PM-SCORECARD.md assembly with all 5 lens instructions in Japanese
- Updated onboarding, language_directive, and objective block to reference 5 matrices and 5PM-SCORECARD.md

## Task Commits

1. **Task 1: Sync Japanese workflow with all Phase 8-9 English changes** - `4c8b97f` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified
- `get-your-shit-together/workflows/foundation-sprint-japanese.md` - Synced from 22 to 26 sections with all 5PM framework additions

## Decisions Made
- B2A tier pricing description adapted to Japanese context (月額2,000〜10,000円 rather than literal $20-100/mo conversion) to feel natural to Japanese users
- scorecard_fit_passion values use natural Japanese: はい/消極的/いいえ matching yes/lukewarm/no from English
- Matrix 5 heading stays "Matrix 5" (proper noun verbatim, per terminology register) but axes and instructions fully translated

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Self-Check: PASSED

- foundation-sprint-japanese.md: FOUND
- Commit 4c8b97f: FOUND
- Section count 26: VERIFIED
- All 4 new sections present: VERIFIED
- scorecard_pain_matrix: VERIFIED
- scorecard_chosen_approach: VERIFIED
- 5PM-SCORECARD.md references: VERIFIED
- "3つのファイル" references: 0 (VERIFIED)

## Next Phase Readiness
- Japanese Foundation Sprint is fully synced and ready for Japanese users to access all 5PM awareness passes and produce 5PM-SCORECARD.md
- French and Portuguese workflow sync plans (if any) can follow the same structural approach
- Phase 11 Plan 02 complete

---
*Phase: 11-language-workflow-updates*
*Completed: 2026-03-22*
