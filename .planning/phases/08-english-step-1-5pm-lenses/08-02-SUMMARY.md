---
phase: 08-english-step-1-5pm-lenses
plan: 02
subsystem: workflow
tags: [foundation-sprint, 5pm-framework, awareness-lens, market-sizing, navigation-controls, scorecard, discard-rule]

# Dependency graph
requires:
  - 08-01 (section_purchaser and section_problem_importance already in place; correct section ordering required)
provides:
  - section_market_sizing awareness pass with RESEARCH-04 WebSearch, range-based presentation, verbatim caveat, and scorecard_market_research + scorecard_market_founder_perception fields
  - navigation_controls updated with 7-item sub-decision menu and 7-item DISCARD RULE cascade with explicit scorecard field wipes
affects:
  - 09-english-step-3-fit-validation-scorecard (scorecard assembly will reference all 6 named fields: scorecard_purchaser_*, scorecard_problem_iu*, scorecard_market_*)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Non-blocking awareness pass pattern applied to market sizing (AWARENESS-03): WebSearch proxy signals, range presentation, verbatim caveat, single dual-question prompt"
    - "DISCARD RULE cascade: granular per-sub-decision wipe of named scorecard fields rather than monolithic section wipes"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "Market data presented as ranges only, never single figures — enforced by section instruction"
  - "Verbatim caveat required: 'These are rough signals, not reliable TAM estimates. Validate with direct customer research.'"
  - "Reachability and market perception questions combined into one prompt to enforce non-blocking constraint"
  - "DISCARD RULE cascade expanded from 4 to 7 entries with explicit scorecard_* field wipes per scenario"
  - "Option C (start over) updated to list all scorecard fields in wipe instruction"

requirements-completed: [MRKT-01, MRKT-02, MRKT-03, PURC-03, PROB-01]

# Metrics
duration: 7min
completed: 2026-03-22
---

# Phase 8 Plan 02: English Step 1 — Market Sizing Awareness Lens and DISCARD RULE Cascade Summary

**section_market_sizing added as the third non-blocking 5PM awareness pass (RESEARCH-04 WebSearch for proxy signals, range-based presentation with verbatim caveat, two named scorecard fields) and navigation_controls DISCARD RULE expanded from 4 to 7 cascade entries with granular scorecard field wipes per sub-decision**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-22T15:00:40Z
- **Completed:** 2026-03-22T15:07:48Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Inserted section_market_sizing immediately after write_competitors_md and before navigation_controls (position 10 of 11 in Step 1)
- Section follows non-blocking awareness pass pattern: zero lock phrases, zero banner renders, one dual-question prompt (reachability + market perception), WebSearch for proxy signals
- Verbatim caveat included as required: "These are rough signals, not reliable TAM estimates. Validate with direct customer research."
- Two named scorecard fields captured: scorecard_market_research and scorecard_market_founder_perception
- navigation_controls sub-decision menu expanded from 4 to 7 items: Customer segment / Purchaser / Problem / Problem I/U classification / Founder advantages / Competitors / Market sizing
- DISCARD RULE cascade expanded from 4 to 7 examples with explicit scorecard_* field wipe lists per scenario
- Option C (start over) updated to include all scorecard fields in the wipe instruction

## Task Commits

Each task was committed atomically:

1. **Task 1: Write section_market_sizing awareness section** - `7866cf6` (feat)
2. **Task 2: Update navigation_controls DISCARD RULE cascade** - `26e032d` (feat)

**Plan metadata:** committed with this SUMMARY

## Files Created/Modified

- `get-your-shit-together/workflows/foundation-sprint.md` — Added section_market_sizing (47 lines); modified navigation_controls DISCARD RULE (7 cascade entries, expanded Option C); section count grew from 24 to 25

## Decisions Made

- Market data must always be presented as ranges, never single figures — enforced by direct instruction in section
- Verbatim caveat is required word-for-word as specified in CONTEXT.md
- Reachability and market perception questions combined into a single prompt to maintain non-blocking constraint (one response per module)
- DISCARD RULE cascade now granular: each sub-decision wipes only its own scorecard fields and all fields downstream — not monolithic section references
- scorecard_market_* wildcard used in cascade so any future market sub-fields are automatically covered

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 02 complete. Step 1 now has all three 5PM awareness lenses (Purchaser, Problem I/U, Market Sizing) in correct positions.
- Phase 9 (scorecard assembly) can now reference all 6 named fields: scorecard_purchaser_tier, scorecard_purchaser_insight, scorecard_problem_iu, scorecard_problem_iu_nudge, scorecard_market_research, scorecard_market_founder_perception.
- Step 1 flow complete: Customer -> Purchaser -> Problem -> Problem I/U -> Advantages -> Competitors -> Research -> Main Adversary -> Write COMPETITORS.md -> Market Sizing -> Navigation Controls

## Self-Check: PASSED

- foundation-sprint.md: FOUND
- 08-02-SUMMARY.md: FOUND
- Commit 7866cf6 (Task 1): FOUND
- Commit 26e032d (Task 2): FOUND

---
*Phase: 08-english-step-1-5pm-lenses*
*Completed: 2026-03-22*
