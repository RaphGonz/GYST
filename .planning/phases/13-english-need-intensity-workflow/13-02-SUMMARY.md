---
phase: 13-english-need-intensity-workflow
plan: "02"
subsystem: workflow
tags: [need-intensity, foundation-sprint, output-file, template, write-block]

# Dependency graph
requires:
  - phase: 13-english-need-intensity-workflow
    plan: "01"
    provides: All 10 need_intensity_* named fields captured during section_need_intensity
provides:
  - get-your-shit-together/templates/NEED-INTENSITY.md — structural scaffold for NEED-INTENSITY.md output
  - 5th write block in section_write_outputs assembling NEED-INTENSITY.md from need_intensity_* fields
  - Closing message updated to list 5 output files including NEED-INTENSITY.md
affects:
  - 14-language-translations (language templates will need NEED-INTENSITY.md scaffold equivalents)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Scaffold-only template pattern — zero assembly logic in template, all assembly in section_write_outputs"
    - "Named field assembly pattern for NEED-INTENSITY.md (mirrors 5PM-SCORECARD.md pattern)"
    - "3-line formula display pattern: symbolic / numeric substitution / result"

key-files:
  created:
    - get-your-shit-together/templates/NEED-INTENSITY.md
  modified:
    - get-your-shit-together/workflows/foundation-sprint.md

key-decisions:
  - "NEED-INTENSITY.md template is a scaffold only — square bracket labels are structural guides, not content that appears in final output"
  - "Formula displayed in 3 explicit lines: symbolic formula, numeric substitution with named fields, result / 6,000"
  - "Advisory loop Notes section: if score was always ≥1,000, write canonical sentence rather than omitting section"
  - "Problem statement in header uses reframed version if advisory loop accepted a reframe, otherwise uses original locked problem"

patterns-established:
  - "5th write block follows same structure as 4th (5PM-SCORECARD): read template, assemble named fields, CRITICAL zero-bracket rule"
  - "Template path referenced as @~/.claude/get-your-shit-together/templates/NEED-INTENSITY.md — consistent with all other templates"

requirements-completed: [NEED-07]

# Metrics
duration: 9min
completed: 2026-05-16
---

# Phase 13 Plan 02: English Need Intensity Workflow Summary

**NEED-INTENSITY.md template scaffold created and 5th write block added to section_write_outputs assembling all 10 need_intensity_* fields — satisfies NEED-07**

## Performance

- **Duration:** 9 min
- **Started:** 2026-05-16T11:34:29Z
- **Completed:** 2026-05-16T11:43:09Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `get-your-shit-together/templates/NEED-INTENSITY.md` as a pure structural scaffold with Score Summary table (6 dimensions), Formula section (3-line structure), Dimension Rationale section (one block per dimension), Competitors Identified section, and Notes section
- Added 5th write block to section_write_outputs in foundation-sprint.md referencing all 10 need_intensity_* named fields from section_need_intensity
- Formula assembly instructions show all 3 lines explicitly: symbolic formula, numeric substitution with field names in square brackets, result / 6,000
- Section heading updated to OUTPUT-05, opening line updated to "Writing your 5 output files now", closing message lists NEED-INTENSITY.md as 5th output file
- "After all 4 files are written" updated to "After all 5 files are written"
- NEED-07 fully satisfied: assembled file will contain all 6 calibrated scores, formula calculation, final score, verdict tier, AI rationale per dimension, and final problem/client statement

## Task Commits

Each task was committed atomically:

1. **Task 1: Create NEED-INTENSITY.md template scaffold** — `85bb65c` (feat)
2. **Task 2: Add NEED-INTENSITY.md write block to section_write_outputs** — `8d3861c` (feat)

## Files Created/Modified

- `get-your-shit-together/templates/NEED-INTENSITY.md` — new structural scaffold (61 lines); contains Score Summary table, Formula section, Dimension Rationale section, Competitors Identified section, Notes section; zero assembly logic
- `get-your-shit-together/workflows/foundation-sprint.md` — section_write_outputs updated (39 lines added, 3 modified); OUTPUT-05 in heading, 5-file count in opening line, full 5th write block with all 10 named field assembly instructions, "After all 5 files" heading, NEED-INTENSITY.md in closing file list

## Decisions Made

- Template scaffold follows the same pattern as 5PM-SCORECARD.md: structural section headers and field labels only, no assembly logic
- 3-line formula display chosen for clarity: line 1 symbolic, line 2 numeric substitution, line 3 result — matches the formula display pattern already in section_need_intensity Step 4
- Notes section included in both template and write instructions to handle the advisory loop context (canonical sentence when loop did not run keeps the section present and informative)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 13 is now complete: section_need_intensity (Plan 01) + NEED-INTENSITY.md output file (Plan 02) fully satisfies all NEED-01 through NEED-07 requirements
- Phase 14 language translations can mirror this NEED-INTENSITY.md template structure for FR, ES, DE, ZH, PT, JA
- foundation-sprint.md English workflow is production-ready with the complete Need Intensity scoring flow and output file generation

---
*Phase: 13-english-need-intensity-workflow*
*Completed: 2026-05-16*
