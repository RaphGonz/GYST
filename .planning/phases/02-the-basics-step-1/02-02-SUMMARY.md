---
phase: 02-the-basics-step-1
plan: 02
subsystem: workflow

tags: [foundation-sprint, competitor-research, sub-agent, competitors-md, navigation, markdown-workflow]

# Dependency graph
requires:
  - phase: 02-the-basics-step-1
    plan: 02-01
    provides: "foundation-sprint.md with research seam marker in section_competitors"
  - phase: 01-infrastructure
    provides: "COMPETITORS.md template at get-your-shit-together/templates/COMPETITORS.md"

provides:
  - "gyst-researcher agent with full operating instructions (140 lines): input format, search strategy, output format, quality checks, zero-competitors fallback"
  - "section_competitors_research: gyst-researcher Task tool invocation with exact brief format and FILTER step"
  - "Competitor numbered checklist presentation (max 5, reply-with-numbers format)"
  - "section_main_adversary: main adversary selection with banner re-render"
  - "write_competitors_md: writes ./COMPETITORS.md from template, all fields populated, no placeholders, MAIN ADVERSARY marker"
  - "navigation_controls: 3-option A/B/C post-Step-1 menu"
  - "DISCARD RULE: go-back wipes all downstream decisions and rebuilds from scratch"

affects:
  - 03-differentiation (Step 2 stub is the current endpoint; COMPETITORS.md from this plan is Step 2's input)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Sub-agent invocation pattern via Task tool: workflow invokes gyst-researcher with a structured brief, waits for structured output"
    - "Two-stage competitor filtering: agent returns up to 7 raw candidates, workflow filters down to max 5 before presenting"
    - "Numbered checklist selection: user replies with numbers or 'all' — no UI, pure text selection"
    - "DISCARD RULE navigation: go-back discards downstream decisions entirely rather than patching them"
    - "@-reference template pattern: workflow reads COMPETITORS.md template for structure before writing the file"

key-files:
  created: []
  modified:
    - "get-your-shit-together/agents/gyst-researcher.md"
    - "get-your-shit-together/workflows/foundation-sprint.md"

key-decisions:
  - "gyst-researcher returns up to 7 raw candidates — workflow filters to max 5 shown, not the agent. Separation of concerns: agent does research, workflow does presentation."
  - "Two-pass zero-competitors handling: first filter failure prompts user for workaround knowledge, second failure flags unusual situation to user and offers problem refinement."
  - "DISCARD RULE is unconditional: go-back does not offer to 'keep some' decisions — everything downstream of the target sub-decision is wiped and rebuilt from scratch."

# Metrics
duration: 14min
completed: 2026-02-25
---

# Phase 2 Plan 02: The Basics Step 1 — Research, Checklist, COMPETITORS.md, Navigation Summary

**gyst-researcher agent filled with full operating instructions and foundation-sprint.md extended with competitor research invocation, numbered checklist, main adversary selection, COMPETITORS.md write block, and 3-option navigation controls — completing Step 1 end-to-end**

## Performance

- **Duration:** ~14 min
- **Started:** 2026-02-25T21:34:19Z
- **Completed:** 2026-02-25T21:48:55Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Replaced the 21-line gyst-researcher stub with a complete 140-line agent: structured input format matching the workflow's invocation brief, 3-step search strategy (named competitors → direct search → workaround discovery), full output format with all required fields (type, what they do, pricing, strengths, weaknesses, positioning signals, sources), 5-point quality checklist, and zero-competitors fallback entry
- Extended foundation-sprint.md from 364 to 518 lines by splicing in 6 new named sections at the Plan 02-01 seam marker: `section_competitors_research` (Task tool invocation + filtering + zero-candidate fallback + numbered checklist), `section_main_adversary` (adversary selection + banner re-render), `write_competitors_md` (template read + field-by-field write instructions with NO-PLACEHOLDERS rule), and `navigation_controls` (A/B/C options + DISCARD RULE go-back logic + start-over)
- The research brief format in the workflow matches the input_format block in the agent exactly — `Customer segment / Problem / User-named competitors / Task` — ensuring sub-agent invocation works without format mismatch
- Navigation go-back implements the DISCARD RULE unconditionally: no offer to preserve downstream decisions, concrete examples for each go-back scenario (Customer → wipes 3; Problem → wipes 2; Advantages → wipes 1; Competitors → wipes 0 locked values)
- A user running /gyst:foundation-sprint can now complete all of Step 1 and leave with a populated COMPETITORS.md on disk with the main adversary marked

## Task Commits

Each task was committed atomically:

1. **Task 1: Write full gyst-researcher agent operating instructions** - `a21433e` (feat)
2. **Task 2: Extend workflow with research, checklist, COMPETITORS.md writer, navigation** - `7423b99` (feat)

**Plan metadata:** (recorded after final commit)

## Files Created/Modified

- `get-your-shit-together/agents/gyst-researcher.md` — Replaced 21-line stub with 140-line complete agent: input_format, search_strategy (3 steps + filtering rule + fallback), output_format (all 7 fields), quality_checks (5 rules), zero_competitors_handling (single fallback entry format)
- `get-your-shit-together/workflows/foundation-sprint.md` — Extended from 364 to 518 lines: added section_competitors_research, section_main_adversary, write_competitors_md, navigation_controls (with DISCARD RULE go-back and start-over)

## Decisions Made

- **Agent returns 7 raw, workflow filters to 5 shown:** Separation of concerns — the researcher does not know the user's preferences, so it returns all valid finds (up to 7). The workflow does final curation before presenting the numbered checklist (max 5). This lets the user see the best options without overwhelming them.
- **Two-pass zero-competitors handling:** First pass filters the agent's results — if 0 valid remain, the workflow asks the user for workaround knowledge and re-searches. If still 0 after the second pass, it flags the problem statement as potentially mis-framed rather than silently proceeding with no competitors.
- **DISCARD RULE is unconditional:** Go-back does not offer "would you like to keep X?" — all downstream decisions are wiped. Patching partial decisions leads to inconsistent outputs (e.g., keeping a competitor list that was researched against a now-changed problem). Clean restart from the target section is always the right behavior.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Phase 3 (Differentiation) receives a fully-written COMPETITORS.md as input. The template's structure (fields, MAIN ADVERSARY marker, Summary Table) is what Plan 02-02 writes — Phase 3 can grep for `* MAIN ADVERSARY` and read structured fields without any format changes needed
- The step2_stub currently ends the session gracefully; Phase 3 replaces it with Differentiation logic
- Both agents and workflow files are self-contained — developers must re-run `node bin/install.js` after editing to push changes to `~/.claude/get-your-shit-together/`

## Self-Check: PASSED

- FOUND: get-your-shit-together/agents/gyst-researcher.md (140 lines, full instructions, no stub text)
- FOUND: get-your-shit-together/workflows/foundation-sprint.md (518 lines, seam marker removed, all 6 sections present)
- FOUND: commit a21433e (Task 1)
- FOUND: commit 7423b99 (Task 2)

---
*Phase: 02-the-basics-step-1*
*Completed: 2026-02-25*
