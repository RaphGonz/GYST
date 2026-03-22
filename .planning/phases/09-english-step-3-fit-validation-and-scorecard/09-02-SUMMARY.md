---
phase: 09-english-step-3-fit-validation-and-scorecard
plan: "02"
subsystem: workflow
tags: [scorecard, 5pm-framework, foundation-sprint, output-files, template]

# Dependency graph
requires:
  - phase: 09-english-step-3-fit-validation-and-scorecard
    provides: plan 01 scorecard fields (fit_background, fit_access, fit_passion, pain_matrix, chosen_approach)
  - phase: 08-english-step-1-5pm-lenses
    provides: first 6 scorecard fields (purchaser_tier, purchaser_insight, problem_iu, problem_iu_nudge, market_research, market_founder_perception)
provides:
  - 5PM-SCORECARD.md structural scaffold at templates/5PM-SCORECARD.md
  - 4th write block in section_write_outputs assembling all 11 scorecard fields into 5 lens verdicts
  - Verdict formulas for all 5 lenses with FAVORABLE/CAUTION/UNFAVORABLE decision rules
  - Verdict Summary (overall 5PM signal) derived from lens count
affects:
  - 10-language-scorecard-templates (French translation will reference 5PM-SCORECARD.md template structure)
  - 11-language-workflow-updates (French workflow will reference the same assembly pattern)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Scorecard template is a structural scaffold only — zero assembly logic; verdict formulas live exclusively in section_write_outputs"
    - "11 named scorecard_* fields assembled at write time — no memory reconstruction needed, fields were named at capture"
    - "Verdict Summary derived from lens count: 4-5 FAVORABLE = FAVORABLE, 2-3 = MIXED, 0-1 = UNFAVORABLE"

key-files:
  created:
    - get-your-shit-together/templates/5PM-SCORECARD.md
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "Template contains structure only, no verdict formulas — avoids duplication and ensures assembly logic has one authoritative location"
  - "Verdict Summary uses simple lens count (4-5/2-3/0-1) rather than weighted scoring — simpler rule, easier for AI to apply consistently"
  - "passion = lukewarm is a mandatory red flag in Lens 4, not just passion = no — matches the non-blocking pass intent from Plan 01"

patterns-established:
  - "4th write block pattern: read template for structure, assemble from named fields, zero square brackets rule"
  - "Closing message update pattern: count update (3 to 4), heading update (OUTPUT-04), file list entry, zero-placeholder rule"

requirements-completed: [SCRD-01, SCRD-02, SCRD-03, SCRD-04]

# Metrics
duration: 9min
completed: 2026-03-22
---

# Phase 9 Plan 02: 5PM Scorecard Template and Write Block Summary

**5PM-SCORECARD.md structural scaffold template (5 lens blocks) and section_write_outputs 4th write block assembling all 11 named scorecard fields into FAVORABLE/CAUTION/UNFAVORABLE verdicts with Verdict Summary**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-22T17:48:40Z
- **Completed:** 2026-03-22T17:57:53Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created get-your-shit-together/templates/5PM-SCORECARD.md as a pure structural scaffold — 5 lens blocks each with verdict/evidence/rationale/red-flags, plus Verdict Summary at top; zero assembly logic in template
- Added 4th write block (Write 5PM-SCORECARD.md) to section_write_outputs with verdict formulas for all 5 lenses and assembly from all 11 named scorecard_* fields
- Updated closing message: "Writing your 4 output files now", OUTPUT-04 in heading, 5PM-SCORECARD.md in file list, zero-placeholder rule expanded
- Zero 5PM-SCORECARD content or foreshadowing appears anywhere before section_write_outputs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 5PM-SCORECARD.md template** - `8f825b0` (feat)
2. **Task 2: Add Scorecard assembly and write block to section_write_outputs** - `1a10d83` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `get-your-shit-together/templates/5PM-SCORECARD.md` - Structural scaffold with 5 lens blocks, Verdict Summary, no assembly logic
- `get-your-shit-together/workflows/foundation-sprint.md` - section_write_outputs updated with 4th write block + closing message updates

## Decisions Made
- Template is a structural scaffold only — verdict formulas live exclusively in section_write_outputs; this avoids duplication and gives assembly logic one authoritative location
- Verdict Summary uses simple lens count (4-5 FAVORABLE = FAVORABLE, 2-3 = MIXED, 0-1 = UNFAVORABLE) — straightforward rule the AI applies without ambiguity
- passion = lukewarm treated as mandatory red flag in Lens 4, matching the non-blocking passion check intent from Plan 01

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 9 complete: all 11 scorecard_* fields captured, 5PM-SCORECARD.md template and assembly block ready
- English workflow now produces 4 output files: HYPOTHESIS.md, SPRINT.md, POSITIONING.md, 5PM-SCORECARD.md
- Phase 10 (Language Scorecard Templates) can now translate 5PM-SCORECARD.md structure into French/other languages
- Blocker noted: 5PM terminology register for translation does not yet exist — Phase 10 must address this first

## Self-Check: PASSED

- FOUND: get-your-shit-together/templates/5PM-SCORECARD.md
- FOUND: get-your-shit-together/workflows/foundation-sprint.md
- FOUND: .planning/phases/09-english-step-3-fit-validation-and-scorecard/09-02-SUMMARY.md
- FOUND commit: 8f825b0 (Task 1)
- FOUND commit: 1a10d83 (Task 2)

---
*Phase: 09-english-step-3-fit-validation-and-scorecard*
*Completed: 2026-03-22*
