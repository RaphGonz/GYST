---
phase: 04-approaches-hypothesis-outputs-steps-3-4
plan: 02
subsystem: workflow
tags: [foundation-sprint, step4, hypothesis, testable-form, output-files, markdown-workflow]

# Dependency graph
requires:
  - phase: 04-approaches-hypothesis-outputs-steps-3-4
    provides: section_approach_recommendation that calls into step4_banner; chosen approach (Z) used as hypothesis variable

provides:
  - step4_banner: Step 4 stage transition banner showing Segment, Problem, Approach, Adversary, and both Axes pre-loaded from session context
  - section_hypothesis: AI pre-fills full hypothesis template; explicit lock trigger enforced; "yes"/"looks good" explicitly rejected as lock
  - section_testable_form: AI auto-derives all 4 testable form components from locked hypothesis (no per-field user input)
  - section_write_outputs: ONLY location where HYPOTHESIS.md, SPRINT.md, POSITIONING.md are written; zero-placeholder rule enforced for all 3 files

affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Explicit lock pattern: AI rejects vague confirmations ('yes', 'looks good') and requires explicit lock language before advancing"
    - "Auto-derive pattern: AI derives testable form components from locked content without prompting user per-field"
    - "Single write location pattern: output files written ONLY in section_write_outputs — no scattered writes permitted"
    - "Zero square brackets rule: each output file must contain zero template placeholders before writing"

key-files:
  created: []
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "SPRINT-15: Hypothesis pre-fill is fully AI-driven from session context — user edits slots they disagree with, never asked to re-enter known data"
  - "Lock language is explicit and enumerated: 'lock it', 'locked', 'finalize', 'done', 'that's it', 'confirmed' — a simple 'yes' or 'looks good' is NOT a lock"
  - "SPRINT-16: All 4 testable form components (success metric, falsification condition, main risk, fastest validation test) are AI-derived — no per-field prompting"
  - "OUTPUT rule: section_write_outputs is the ONLY place in the entire workflow where output files are written"
  - "POSITIONING.md matrix disambiguation: the 2x2 matrix shows competitor names from COMPETITORS.md, NOT approach labels A1/A2/A3/A4"
  - "Rule 1 auto-fix: stale 'Steps 2-4 as stubs' comment in objective block updated to accurate 4-step end-to-end description"

patterns-established:
  - "Explicit lock pattern: ambiguous confirmations trigger a clarifying question ('Ready to lock this hypothesis?') rather than advancing"
  - "Testable form auto-derivation: AI reads locked hypothesis variables and produces all 4 testable components without user input per field"
  - "Output file segregation: all 3 output files written together at sprint end, never incrementally during earlier steps"

requirements-completed: [SPRINT-15, SPRINT-16, OUTPUT-01, OUTPUT-02, OUTPUT-03]

# Metrics
duration: 15min
completed: 2026-02-27
---

# Phase 4 Plan 02: Step 4 Hypothesis + Output Files — step4_banner, section_hypothesis, section_testable_form, section_write_outputs

**Step 4 (Final Hypothesis) full flow live in foundation-sprint.md: explicit-lock hypothesis construction, AI-derived testable form, and all 3 output files (HYPOTHESIS.md, SPRINT.md, POSITIONING.md) written at sprint end — Foundation Sprint complete end-to-end**

## Performance

- **Duration:** 15 min
- **Started:** 2026-02-27T18:18:35Z
- **Completed:** 2026-02-27T18:33:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Appended step4_banner: renders immediately after approach committed; shows all 6 hypothesis variables (Segment, Problem, Approach, Adversary, Axis 1, Axis 2) pre-loaded from session context; "Hypothesis: pending" shown until locked
- Appended section_hypothesis: AI pre-fills full hypothesis template from session context; explicit lock trigger required; "yes" / "looks good" explicitly rejected; iteration loop for variable edits before lock
- Appended section_testable_form: AI auto-derives all 4 testable form components (success metric, falsification condition, main risk, fastest validation test) from locked hypothesis — no per-field prompting
- Appended section_write_outputs: single authoritative write location for all 3 output files; zero-square-brackets rule enforced per file; POSITIONING.md matrix disambiguation (competitor names, not approach labels); closing message names all 3 files + fastest validation test
- Auto-fixed stale objective block comment ("Steps 2-4 as stubs") to accurate end-to-end 4-step description
- bin/install.js run — all changes live at ~/.claude/get-your-shit-together/workflows/foundation-sprint.md (1268 lines, sprint complete end-to-end)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add step4_banner and section_hypothesis** - `5909e5a` (feat)
2. **Task 2: Add section_testable_form and section_write_outputs** - `8c4d286` (feat)
3. **Auto-fix: Update stale objective block comment** - `5b748b6` (fix)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified
- `get-your-shit-together/workflows/foundation-sprint.md` - Step 4 flow appended (step4_banner, section_hypothesis, section_testable_form, section_write_outputs); stale objective comment updated; file extended from 1120 to 1268 lines; sprint complete end-to-end

## Decisions Made
- Explicit lock language is enumerated and non-negotiable: "lock it", "locked", "finalize", "done", "that's it", "confirmed" — vague confirmation ("yes", "looks good") triggers clarifying question, not advancement (SPRINT-15)
- Testable form components are AI-derived from locked hypothesis variables — no per-field user prompting (SPRINT-16)
- section_write_outputs is the ONLY place in the entire workflow where output files are written — prevents scattered writes across the workflow
- POSITIONING.md's 2x2 matrix explicitly uses competitor names from COMPETITORS.md, not approach labels (A1/A2/A3/A4) — approach evaluation lives only in SPRINT.md

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated stale objective block — sprint described as having stubs despite being complete end-to-end**
- **Found during:** Task 2 verification (no-stubs check)
- **Issue:** The `<objective>` block at line 14 still said "Steps 2-4 as stubs: implemented in later phases" — an accurate description when the file was first created but now stale. The no-stubs verification (`grep -q "stub"`) failed because of this historical comment.
- **Fix:** Replaced the stale 2-line coverage description with an accurate 4-step end-to-end description listing all steps with their content
- **Files modified:** get-your-shit-together/workflows/foundation-sprint.md
- **Verification:** `grep -q "stub" foundation-sprint.md` now returns no match; all 8 overall verification checks pass
- **Committed in:** 5b748b6

---

**Total deviations:** 1 auto-fixed (Rule 1 — stale comment causing verification failure)
**Impact on plan:** Auto-fix necessary for correctness — the comment was stale documentation that would have misled both human readers and the no-stubs verification check. No scope creep.

## Issues Encountered
None — all 8 overall verification checks pass after the auto-fix.

## User Setup Required
None - no external service configuration required. Changes installed via bin/install.js.

## Next Phase Readiness
- Foundation Sprint is now complete end-to-end: all 4 steps fully implemented, all output files specified, sprint end ceremony in place
- foundation-sprint.md is 1268 lines; no stubs remain
- Phase 4 is complete — all plans done (04-01 + 04-02)
- No further planning phases required for v1.0 Foundation Sprint

---
*Phase: 04-approaches-hypothesis-outputs-steps-3-4*
*Completed: 2026-02-27*
