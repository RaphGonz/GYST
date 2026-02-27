---
phase: 04-approaches-hypothesis-outputs-steps-3-4
plan: 01
subsystem: workflow
tags: [foundation-sprint, step3, approaches, matrix-evaluation, ascii-grid, markdown-workflow]

# Dependency graph
requires:
  - phase: 03-differentiation-step-2
    provides: section_step2_navigation that calls into step3_banner; locked differentiating axes used in approach filtering
provides:
  - step3_banner: Step 3 entry banner (loading state) and committed state (approaches count + recommendation + chosen)
  - section_context_reload: displays locked Capacity, Insight, and axes from session context without re-asking
  - section_approach_generation: user-first A1 probe flow, INTERNAL FILTER, one-at-a-time AI approach keep/drop until 3-4 finalized
  - section_approach_evaluation: 4-matrix sequential ASCII evaluation (Customer, Money, Pragmatic, Growth Vision)
  - section_approach_recommendation: global pattern recommendation + backup, unconditional user override, banner re-render, proceed to step4_banner
affects:
  - 04-02-PLAN.md (step4_banner entry point referenced at end of section_approach_recommendation)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "User-first approach: AI never generates options before user proposes their own"
    - "Silent internal filter: AI silently excludes approaches that don't fit Capacity/Insight/axes — never mentions filtered candidates"
    - "Sequential matrix evaluation: one ASCII 2x2 per response, user advances with 'next'"
    - "Unconditional user override: AI accepts any approach choice without pushback"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "User-first approach generation: user must propose A1 before AI generates any alternatives (SPRINT-12)"
  - "INTERNAL FILTER is completely silent — no mention of rejected approaches, no 'I considered X but ruled it out'"
  - "4 matrices shown one at a time (not all at once) — AI waits for user 'next' between matrices"
  - "Recommendation is named but unconditional — user can pick any approach, AI accepts without pushback"
  - "Navigation fix: stale step3_stub reference in section_step2_navigation updated to step3_banner (Rule 1 auto-fix)"

patterns-established:
  - "Banner dual-state pattern: entry state (loading/pending) and committed state (counts + recommendation + chosen)"
  - "Context reload pattern: AI reads from session memory, does not re-ask user for previously captured data"

requirements-completed: [SPRINT-12, SPRINT-13, SPRINT-14]

# Metrics
duration: 18min
completed: 2026-02-27
---

# Phase 4 Plan 01: Step 3 Approaches — Banner, Context Reload, Approach Generation, 4-Matrix Evaluation, Recommendation

**Step 3 (Approaches) full flow live in foundation-sprint.md: user-first A1 probe, silent-filtered AI approaches, sequential 4-matrix ASCII evaluation, global pattern recommendation with unconditional user override**

## Performance

- **Duration:** 18 min
- **Started:** 2026-02-27T17:40:48Z
- **Completed:** 2026-02-27T17:59:03Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Replaced the step3_stub placeholder (lines 887-903) with five live named sections totalling ~230 new lines
- step3_banner, section_context_reload, section_approach_generation: user-first approach flow with INTERNAL FILTER for AI-generated alternatives
- section_approach_evaluation: 4-matrix sequential ASCII evaluation with quadrant placement rules enforced (Customer Vision, Money Vision, Pragmatic Vision, Growth Vision)
- section_approach_recommendation: named recommendation + backup, unconditional user override, locked banner re-render, flow entry to step4_banner
- bin/install.js run — all changes live at ~/.claude/get-your-shit-together/workflows/foundation-sprint.md

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace step3_stub with Step 3 banner, context reload, and approach generation** - `57f0bfd` (feat)
2. **Task 2: Add section_approach_evaluation and section_approach_recommendation** - `f1f998c` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified
- `get-your-shit-together/workflows/foundation-sprint.md` - Step 3 stub replaced with five complete sections; file extended from 903 to 1120 lines

## Decisions Made
- User-first approach generation enforced: AI must wait for user to propose A1 before generating any alternatives (SPRINT-12 requirement)
- INTERNAL FILTER is fully silent — AI never mentions what was filtered, never says "I considered X but ruled it out"
- 4-matrix evaluation is sequential, one matrix per response — enforced by explicit "Do NOT render all 4 matrices in a single response" instruction (SPRINT-13)
- Recommendation is AI-named but unconditional — "Accept the user's choice unconditionally" with explicit no-pushback rule (SPRINT-14)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed stale step3_stub navigation reference in section_step2_navigation**
- **Found during:** Task 2 (section_approach_evaluation and section_approach_recommendation)
- **Issue:** section_step2_navigation (written in Plan 03-02) still pointed to `step3_stub` as the entry point for "If A: advance to Step 3". With the stub replaced, this reference was stale and would cause the AI to reference a non-existent block.
- **Fix:** Updated `**If A:** Proceed to step3_stub.` to `**If A:** Proceed to step3_banner.` — correctly points to the new Step 3 entry section
- **Files modified:** get-your-shit-together/workflows/foundation-sprint.md
- **Verification:** `grep -q "step3_stub" foundation-sprint.md` returns nothing; `grep -q "step3_banner" foundation-sprint.md` passes
- **Committed in:** f1f998c (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — stale reference)
**Impact on plan:** Auto-fix necessary for correctness — old reference would have broken Step 2 → Step 3 navigation flow. No scope creep.

## Issues Encountered
None — plan executed cleanly. Both tasks verified with automated grep/wc checks before commit.

## User Setup Required
None - no external service configuration required. Changes installed via bin/install.js.

## Next Phase Readiness
- Step 3 (Approaches) complete end-to-end — banner, context reload, approach generation, 4-matrix evaluation, recommendation
- foundation-sprint.md is 1120 lines; the final line references step4_banner as the entry point for Step 4
- Plan 04-02 can begin immediately: implement step4_banner and the hypothesis construction flow

---
*Phase: 04-approaches-hypothesis-outputs-steps-3-4*
*Completed: 2026-02-27*
