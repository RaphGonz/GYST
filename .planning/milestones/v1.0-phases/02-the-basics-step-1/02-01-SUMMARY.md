---
phase: 02-the-basics-step-1
plan: 01
subsystem: workflow
tags: [foundation-sprint, elicitation, websearch, markdown-workflow, claude-code]

# Dependency graph
requires:
  - phase: 01-infrastructure
    provides: "workflow stub, slash command wrapper, COMPETITORS.md template, install scaffold"
provides:
  - "Full foundation-sprint.md workflow (1.0.0, not stub) covering onboarding through competitor name collection"
  - "One-time onboarding block naming all 4 steps and all 4 output files"
  - "Step 1 banner render instruction (divider-line format, locked values, pending)"
  - "section_customer: open question, labeled options, sharpening probe, lock pattern"
  - "section_problem: open question, labeled options, sharpening probe, WebSearch validation before lock"
  - "section_advantages: Capacity/Insight/Motivation dimensions with explicit REJECTED/ACCEPTED examples"
  - "section_competitors: open question, user_named_competitors store, research handoff seam for Plan 02-02"
  - "step2_stub: graceful not-yet-implemented message"
affects:
  - 02-the-basics-step-1 (plan 02-02 splices research + COMPETITORS.md + navigation into the seam)
  - 03-differentiation (Step 2 stub gets replaced with full logic)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Markdown workflow section pattern: banner → open question → labeled options → sharpening probe (1x max) → lock → banner re-render"
    - "WebSearch validation inline before locking the problem (RESEARCH-03)"
    - "Founder advantages acceptance check: REJECTED (vague) pushed back once, ACCEPTED (verifiable) locked immediately"
    - "Research handoff seam: HTML comment marks where Plan 02-02 splices in research block"
    - "Step 2+ stubs: graceful dead-end message, replaced in later phases"

key-files:
  created: []
  modified:
    - "get-your-shit-together/workflows/foundation-sprint.md"

key-decisions:
  - "Inline WebSearch (not sub-agent) for problem validation — lightweight 'is this pain real' check that runs inside the main conversation thread"
  - "Motivation acceptance is looser than Capacity/Insight — accepts first personal answer, only pushbacks on purely generic (no personal connection)"
  - "Research handoff seam placed as HTML comment in section_competitors — Plan 02-02 splices research block at that exact point without rewriting existing content"

patterns-established:
  - "Banner render instruction defined once as <step1_banner> block, referenced throughout — single source of truth for format"
  - "Section structure: each sub-decision is a named <section> block with consistent internal shape (entering, open question, options, validation if applicable, lock)"
  - "Step stub pattern: future phases replace <step2_stub> with full content — prevents dead-end without requiring forward-planning"

requirements-completed: [SPRINT-01, SPRINT-02, SPRINT-03, SPRINT-04, SPRINT-05, INTER-01, INTER-02, INTER-03]

# Metrics
duration: 10min
completed: 2026-02-25
---

# Phase 2 Plan 01: The Basics Step 1 — Onboarding + Sub-decisions 1-4 Summary

**Full foundation-sprint.md workflow replacing the 30-line stub: one-time onboarding, Step 1 banner, and four complete elicitation sections (customer, problem with WebSearch validation, founder advantages with REJECTED/ACCEPTED checks, competitor name collection with Plan 02-02 research seam)**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-02-25T21:11:45Z
- **Completed:** 2026-02-25T21:21:45Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Replaced the 1.0.0-stub (30 lines) with a full 1.0.0 workflow (364 lines) that an executor running /gyst:foundation-sprint can follow end-to-end through Step 1
- Wrote all four Step 1 sub-decision sections (customer segment, core problem, founder advantages, competitor names) with the locked interaction pattern: open question first, labeled options after, one sharpening probe max, banner re-render on every lock
- Embedded inline WebSearch problem validation (RESEARCH-03) before the problem lock, and explicit REJECTED/ACCEPTED examples for the Capacity and Insight founder advantage dimensions
- Added a clear HTML comment seam in section_competitors for Plan 02-02 to splice in research invocation, competitor checklist, main adversary selection, COMPETITORS.md write, and navigation logic
- Added step2_stub preventing a confusing dead-end after Step 1 completes

## Task Commits

Each task was committed atomically:

1. **Task 1: Write workflow — onboarding, Step 1 structure, customer + problem sections** - `cff8692` (feat)
2. **Task 2: Add sections 3 and 4 — founder advantages and competitor name collection** - `8876eb4` (feat)

**Plan metadata:** (recorded after final commit)

## Files Created/Modified

- `get-your-shit-together/workflows/foundation-sprint.md` — Full workflow replacing stub: 364 lines covering objective block, one-time onboarding, step1_banner render instruction, section_customer, section_problem (with WebSearch validation), section_advantages (Capacity/Insight/Motivation with acceptance checks), section_competitors (with research seam), and step2_stub

## Decisions Made

- **Inline WebSearch for problem validation (not sub-agent):** Problem validation is a lightweight "does this pain exist" check — it runs inside the main conversation thread and doesn't need the dedicated context of a sub-agent. The gyst-researcher sub-agent is reserved for the heavier competitor discovery task in Plan 02-02.
- **Motivation acceptance is looser than Capacity/Insight:** Motivation is personal and can't be externally verified — requiring concrete specifics would force artificial precision. The pushback only triggers when the answer has no personal connection at all (purely business rationale like "it's a big market").
- **HTML comment seam for Plan 02-02 handoff:** The section_competitors block ends with `<!-- RESEARCH AND OUTPUT: See section_competitors_research — added in Plan 02-02 -->`. This gives Plan 02-02 a precise splice point without requiring it to rewrite the existing customer/problem/advantages sections.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 02-02 has a clean seam in section_competitors to splice in: competitor research invocation (inline WebSearch or gyst-researcher sub-agent), competitor checklist presentation, main adversary selection, COMPETITORS.md writing, and Step 1 navigation controls
- The step2_stub gracefully handles the "advance to Step 2" case — Plan 02-02 can replace or extend it with navigation controls
- The workflow is self-contained: developers must re-run `node bin/install.js` after editing to push changes to `~/.claude/get-your-shit-together/workflows/foundation-sprint.md`

## Self-Check: PASSED

- FOUND: get-your-shit-together/workflows/foundation-sprint.md (364 lines, all 20 verification checks pass)
- FOUND: .planning/phases/02-the-basics-step-1/02-01-SUMMARY.md
- FOUND: commit cff8692 (Task 1)
- FOUND: commit 8876eb4 (Task 2)
- FOUND: commit 6bd4b2b (metadata)

---
*Phase: 02-the-basics-step-1*
*Completed: 2026-02-25*
