---
phase: 03-differentiation-step-2
plan: 02
subsystem: workflow
tags: [foundation-sprint, competitor-scoring, 2x2-matrix, manifesto, differentiation, positioning]

# Dependency graph
requires:
  - phase: 03-differentiation-step-2
    provides: section_axis_selection handoff seam — axes locked and Step 2 banner re-rendered before section_competitor_scoring entry
  - phase: 02-the-basics-step-1
    provides: COMPETITORS.md with competitor profiles used as sole scoring source
provides:
  - section_competitor_scoring: reads @./COMPETITORS.md profiles, derives -5 to +5 scores on both locked axes, displays rationale before matrix (RESEARCH-02 enforced — no web search)
  - section_matrix_render: ASCII 2x2 grid with competitor placement, rationale block, inline conflict check (SPRINT-09, SPRINT-10); hard-blocks on conflict and returns to axis selection
  - section_manifesto: 3-phrase decision-constraining manifesto; holistic evaluation (no phrase-by-phrase critique); one feedback round max (SPRINT-11)
  - section_step2_navigation: Step 2 complete summary block + A/B navigation with targeted redo (axis selection or manifesto only)
  - step3_stub: graceful end-of-sprint placeholder with Step 2 summary, holds for Phase 4 Approaches logic
affects: [04-approaches-step-3, section_competitor_scoring, section_matrix_render, section_manifesto, section_step2_navigation, step3_stub]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "RESEARCH-02 enforcement: @./COMPETITORS.md Read reference (no WebSearch/WebFetch) with explicit prohibition text and 0-score fallback for missing fields"
    - "Hard-block conflict pattern: any competitor in top-right quadrant triggers immediate CONFLICT DETECTED message with no bypass option"
    - "Holistic manifesto evaluation: all 3 phrases evaluated together in one response — never phrase-by-phrase"
    - "Targeted redo pattern: go-back offers axis selection OR manifesto revision — never full Step 2 wipe"
    - "step3_stub pattern: Phase N+1 fills in content; current phase ends gracefully with summary of decisions captured"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "Conflict detection is unconditional hard-block — no 'continue anyway' path exists anywhere in section_matrix_render"
  - "section_competitor_scoring explicitly names both WebSearch and WebFetch in prohibition text to prevent any tool-call bypass"
  - "Manifesto evaluation is holistic (all 3 at once) — matches SPRINT-11 truth that AI gives ONE holistic evaluation"
  - "Go-back in section_step2_navigation offers targeted redo only (axes or manifesto) — no full Step 2 wipe to preserve score investment"
  - "step3_stub outputs Step 2 decisions summary so user retains context even at sprint end"

patterns-established:
  - "Competitor scoring always precedes matrix render — scores shown with rationale, then grid, then conflict check"
  - "Section handoff chain complete: section_axis_selection -> section_competitor_scoring -> section_matrix_render -> section_manifesto -> section_step2_navigation -> step3_stub"
  - "All RESEARCH-02 constraints upheld in Step 2: no web search references in any Step 2 section (existing WebSearch on line 177 is Step 1 section_problem only)"

requirements-completed: [SPRINT-09, SPRINT-10, SPRINT-11, RESEARCH-02]

# Metrics
duration: 11min
completed: 2026-02-26
---

# Phase 3 Plan 02: Differentiation Step 2 — Competitor Scoring, Matrix, Manifesto, and Navigation Summary

**ASCII 2x2 matrix with COMPETITORS.md-only scoring, hard-block conflict detection, holistic manifesto evaluation, and targeted go-back navigation completing the full Step 2 flow**

## Performance

- **Duration:** 11 min
- **Started:** 2026-02-26T20:37:36Z
- **Completed:** 2026-02-26T20:48:59Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- section_competitor_scoring reads @./COMPETITORS.md profiles offline (no WebSearch/WebFetch), derives scores on both locked axes with explicit rationale, flags missing fields as "limited data" with 0 score
- section_matrix_render renders ASCII 2x2 grid with spatially placed competitors and rationale block; conflict check hard-blocks if any competitor occupies the top-right quadrant (same as "You") — no bypass allowed
- section_manifesto prompts for 3 decision-constraining phrases, evaluates them holistically in one response, allows one feedback round then accepts whatever user writes next
- section_step2_navigation displays full Step 2 summary then offers advance to Step 3 or targeted redo (axis selection or manifesto only — no full wipe)
- step3_stub provides graceful sprint end with captured Step 2 decisions as placeholder for Phase 4 Approaches
- install.js run — changes live in ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
- foundation-sprint.md extended from 667 lines to 903 lines

## Task Commits

Each task was committed atomically:

1. **Task 1: Add section_competitor_scoring and section_matrix_render (with conflict check)** - `0a91c77` (feat)
2. **Task 2: Add section_manifesto, section_step2_navigation, and step3_stub** - `980f67d` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `get-your-shit-together/workflows/foundation-sprint.md` - Five new named sections appended completing Step 2 end-to-end (903 lines total)

## Decisions Made
- Conflict detection is a hard unconditional block — section_matrix_render contains no "continue anyway" option, no alternative path. The ONLY available action after a conflict is returning to section_axis_selection.
- Both "WebSearch" and "WebFetch" are named explicitly in the RESEARCH-02 prohibition text to prevent any tool-call bypass in section_competitor_scoring.
- Manifesto evaluation is holistic — all 3 phrases evaluated together in one response per SPRINT-11 spec (no phrase-by-phrase feedback loop).
- Go-back navigation offers only targeted redo (axis selection or manifesto) — never full Step 2 wipe, to respect the scoring investment already made.
- step3_stub echoes back the captured Step 2 decisions so users retain useful context even at the current sprint boundary.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None — the WebSearch/WebFetch count check in the plan's verification block flags 2 occurrences: one in Step 1's section_problem (pre-existing, correct usage for problem validation) and one in the new section_competitor_scoring prohibition text. Neither is a Step 2 web search invocation. No violations.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- foundation-sprint.md is complete through Step 2 end-to-end: axis rating → custom axes → axis selection → competitor scoring → 2x2 matrix → manifesto → summary + navigation → step3_stub
- Phase 4 (Approaches — Step 3) can now replace step3_stub with full Approaches logic
- All RESEARCH-02 constraints upheld: no web searching in any Step 2 section
- COMPETITORS.md template already in place; sprint can run end-to-end including competitor scoring without any network calls in Step 2

---
*Phase: 03-differentiation-step-2*
*Completed: 2026-02-26*
