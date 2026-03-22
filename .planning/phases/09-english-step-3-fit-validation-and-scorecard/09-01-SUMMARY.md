---
phase: 09-english-step-3-fit-validation-and-scorecard
plan: "01"
subsystem: workflow
tags: [founder-fit, pain-to-validate, scorecard, foundation-sprint, awareness-lens]

# Dependency graph
requires:
  - phase: 08-english-step-1-5pm-lenses
    provides: non-blocking awareness pass pattern, scorecard_* field naming convention, existing scorecard fields (purchaser_tier, purchaser_insight, problem_iu, problem_iu_nudge, market_research, market_founder_perception)
provides:
  - section_founder_fit with 3 sequential questions and 3 named scorecard fields
  - Matrix 5 (Pain to Validate) appended to 5-Matrix Evaluation block with scorecard_pain_matrix
  - scorecard_chosen_approach capture in section_approach_recommendation
  - 5 new scorecard fields ready for Plan 02 Scorecard assembly
affects:
  - 09-02 (Scorecard write in section_write_outputs reads all 5 fields from this plan)
  - 10-language-scorecard-templates (French translation will reference these field names)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "AWARENESS-04 (Founder Fit): continues non-blocking awareness pass pattern from Phase 8 — no lock phrases, no banner updates, one question at a time, named field capture, transition"
    - "Matrix 5 follows the sequential matrix pattern established in section_approach_evaluation — AI-scored from existing sprint data, no founder self-scoring"
    - "scorecard_chosen_approach captured at commit point, before banner re-render — field is ready before any downstream reference"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "section_founder_fit placed before section_approach_generation so Fit data is available during Pain to Validate scoring"
  - "Matrix 5 Y-axis is Solution elegance (Partial-Perfect) — distinct from Matrix 3's Ease to build — problem-fit elegance not technical simplicity"
  - "AI scores Matrix 5 using only already-captured sprint data — no new founder input requested"
  - "scorecard_chosen_approach captured immediately after user commits, before Step 3 banner re-render"
  - "No 5PM-SCORECARD write added — that belongs exclusively to Plan 02 section_write_outputs"

patterns-established:
  - "Founder Fit pattern: quote Step 1 verbatim before challenging founder — Delta check establishes confrontation grounded in their own words"
  - "Non-blocking passion check: lukewarm/no flagged via scorecard_fit_passion but sprint continues unconditionally"
  - "Capstone matrix pattern: Matrix 5 summarizes all approaches after individual matrices complete — appears after Matrix 4, before section_approach_recommendation"

requirements-completed: [PFIT-01, PFIT-02, PFIT-03, PFIT-04, PAIN-01, PAIN-02]

# Metrics
duration: 8min
completed: 2026-03-22
---

# Phase 9 Plan 01: Founder Fit Awareness and Pain to Validate Matrix 5 Summary

**section_founder_fit (AWARENESS-04) with 3 sequential confrontational questions + Matrix 5 (Pain to Validate, elegance x build speed, AI-scored) + scorecard_chosen_approach capture — 5 new named fields ready for Scorecard assembly**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-22T17:31:50Z
- **Completed:** 2026-03-22T17:40:32Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Inserted section_founder_fit (AWARENESS-04) between section_context_reload and section_approach_generation with full non-blocking awareness pass pattern: quotes Step 1 Capacity and Insight verbatim, asks 3 sequential questions on background, market access, and passion, captures scorecard_fit_background, scorecard_fit_access, scorecard_fit_passion
- Appended Matrix 5 (Pain to Validate) to the approach evaluation block (now "5-Matrix Evaluation"), with Build speed x Solution elegance axes, AI-scored from sprint data, capturing scorecard_pain_matrix
- Added scorecard_chosen_approach capture in section_approach_recommendation immediately after user commits, before the Step 3 banner re-render

## Task Commits

Each task was committed atomically:

1. **Task 1: Insert section_founder_fit and append Matrix 5 to section_approach_evaluation** - `bf34ba9` (feat)
2. **Task 2: Add scorecard_chosen_approach capture to section_approach_recommendation** - `e61204d` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `get-your-shit-together/workflows/foundation-sprint.md` - Added section_founder_fit, Matrix 5, scorecard_chosen_approach; updated heading to 5-Matrix Evaluation; total sections now 26

## Decisions Made
- Placed section_founder_fit before section_approach_generation so Fit data is available for Pain to Validate AI scoring in Matrix 5
- Matrix 5 Y-axis named "Solution elegance (Partial-Perfect)" — explicitly not "Ease to build" which is already Matrix 3's X-axis; pain-fit elegance is about problem-solution fit quality
- AI assesses both Matrix 5 dimensions from already-captured sprint data only — no new founder input, consistent with awareness-lens philosophy
- scorecard_chosen_approach placed before banner re-render (not after) so the field is captured at the exact moment of commitment

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 5 new scorecard fields (fit_background, fit_access, fit_passion, pain_matrix, chosen_approach) are captured at the correct points in the workflow and ready for Scorecard assembly
- Plan 02 can now write section_write_outputs to assemble the 5PM-SCORECARD.md from the 11 total named scorecard fields (6 from Phase 8 + 5 from this plan)
- No 5PM-SCORECARD write or reference exists yet — zero-placeholder rule preserved

---
*Phase: 09-english-step-3-fit-validation-and-scorecard*
*Completed: 2026-03-22*
