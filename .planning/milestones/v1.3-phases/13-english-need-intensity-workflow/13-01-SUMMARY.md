---
phase: 13-english-need-intensity-workflow
plan: "01"
subsystem: workflow
tags: [need-intensity, foundation-sprint, scoring, calibration, web-search, advisory-loop]

# Dependency graph
requires:
  - phase: 12-readme-documentation
    provides: Canonical tier labels and Need Intensity formula terminology from README.md
provides:
  - section_need_intensity inserted in foundation-sprint.md between section_problem and section_problem_importance
  - 6-dimension rating block with 0-10 anchors, single-response collection
  - Web search calibration (downward-only, per-dimension evidence disclosure)
  - Formula computation with 5 exact tier labels
  - Below-1000 advisory loop (max 5 loops, AI re-rates, never blocking)
  - need_intensity_competitors stored and passed to section_competitors_research brief
  - navigation_controls DISCARD RULE updated with Need Intensity rollback scope
affects:
  - 13-02 (NEED-INTENSITY.md output file plan)
  - 14-language-translations (all 6 language translations will need to mirror this section structure)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Named field capture pattern for need_intensity_* fields (10 fields total)"
    - "Advisory loop pattern with loop_count guard and best_attempt tracking"
    - "Competitor data handoff via need_intensity_competitors to avoid duplicate web searches"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "section_need_intensity inserted immediately after section_problem locks, before section_problem_importance — this is the exact sequence NEED-01 requires"
  - "Calibration is downward-only per CONTEXT.md locked decisions — AI can never propose a higher rating than the user gave"
  - "need_intensity_competitors stored at Step 3 and passed to section_competitors_research brief — no second competitor web search runs"
  - "Below-1000 advisory loop: AI re-rates all 6 dimensions on re-rate (user only picks the reframe direction) — max 5 loops, flow is never blocking"

patterns-established:
  - "Section transition chain: section_problem -> section_need_intensity -> section_problem_importance"
  - "DISCARD RULE: Need Intensity wipes need_intensity_* only when going back to Need Intensity; Customer/Problem rollbacks also wipe need_intensity_*"

requirements-completed: [NEED-01, NEED-02, NEED-03, NEED-04, NEED-05, NEED-06]

# Metrics
duration: 10min
completed: 2026-05-16
---

# Phase 13 Plan 01: English Need Intensity Workflow Summary

**section_need_intensity added to foundation-sprint.md with full 6-dimension scoring, downward-only web search calibration, formula computation, 5-tier verdict labels, and below-1000 advisory loop with competitor data handoff**

## Performance

- **Duration:** 10 min
- **Started:** 2026-05-16T11:11:45Z
- **Completed:** 2026-05-16T11:21:45Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Inserted section_need_intensity between section_problem and section_problem_importance (after problem locks, before I/U classification) — satisfies NEED-01 sequence requirement
- All 6 dimensions shown at once with 0-10 anchors; user rates in a single response — satisfies NEED-01 collection requirement
- Web search calibration runs after ratings, proposes downward-only revisions per dimension with explicit evidence; user can disagree and their rating stands — satisfies NEED-02
- Formula computed and displayed step-by-step: Neglected x (Critical + Consciousness) x (Urgent + Imposed + Real), result shown with exact tier label from README.md — satisfies NEED-03
- Below-1000 advisory loop: suggests tighter segment AND problem reframe, AI re-rates on re-rate (user only chooses direction), max 5 loops, never blocking — satisfies NEED-04
- need_intensity_competitors stored during Step 3 web search and passed into section_competitors_research brief as Pre-identified solutions — satisfies NEED-05 (no duplicate search)
- navigation_controls DISCARD RULE updated: Need Intensity added to revisit question, rollback scopes updated for Customer/Problem rollbacks, new Need Intensity entry with correct wipe scope — satisfies NEED-06

## Task Commits

Each task was committed atomically:

1. **Task 1: Insert section_need_intensity into foundation-sprint.md** - `012ab83` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified

- `get-your-shit-together/workflows/foundation-sprint.md` — section_need_intensity inserted (191 lines added, 6 lines modified); navigation_controls DISCARD RULE updated; section_competitors_research brief updated with Pre-identified solutions field

## Decisions Made

- section_need_intensity is NOT a banner field — Step 1 banner is not re-rendered on entry or exit of this section (Need Intensity is a sub-process, not a Step 1 sub-decision like Customer/Problem/Advantages/Competitors)
- All 10 named need_intensity_* fields defined in the section: real, urgent, critical, imposed, neglected, consciousness, rationale, competitors, score, tier — consistent with the named field capture pattern used by section_purchaser and section_problem_importance
- Tier labels match README.md exactly (canonical source established in Phase 12): Burning need / Solid need / Moderate need / Weak need / Minimal need

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- foundation-sprint.md now has the complete Need Intensity scoring flow in the correct position
- Phase 13 Plan 02 can proceed: NEED-INTENSITY.md output file generation uses need_intensity_* fields already established here
- Phase 14 language translations can mirror this section structure for FR, ES, DE, ZH, PT, JA

---
*Phase: 13-english-need-intensity-workflow*
*Completed: 2026-05-16*
