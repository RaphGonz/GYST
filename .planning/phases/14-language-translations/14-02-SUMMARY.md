---
phase: 14-language-translations
plan: "02"
subsystem: workflows
tags: [translations, german, chinese, need-intensity, foundation-sprint]

# Dependency graph
requires:
  - phase: 13-english-need-intensity-workflow
    provides: English section_need_intensity and NEED-INTENSITY.md template (source for all translations)
  - phase: 14-language-translations
    provides: Plan 01 established FR/ES translation pattern used here for DE/ZH

provides:
  - German NEED-INTENSITY.md scaffold (templates/de/NEED-INTENSITY.md)
  - Chinese NEED-INTENSITY.md scaffold (templates/zh/NEED-INTENSITY.md)
  - German foundation-sprint with translated section_need_intensity and updated section_write_outputs
  - Chinese foundation-sprint with translated section_need_intensity and updated section_write_outputs

affects:
  - 14-language-translations (plan 03 — PT and JA translations follow same pattern)
  - 15-translation-sync-record

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Translation pattern: section identifiers (name=) and field names stay English; all user-facing prose translated"
    - "German register: formal Sie throughout"
    - "Chinese register: Simplified Chinese, formal register matching existing workflow"

key-files:
  created:
    - get-your-shit-together/templates/de/NEED-INTENSITY.md
    - get-your-shit-together/templates/zh/NEED-INTENSITY.md
  modified:
    - get-your-shit-together/workflows/foundation-sprint-german.md
    - get-your-shit-together/workflows/foundation-sprint-chinese.md

key-decisions:
  - "German tier labels established: Brennender Bedarf / Solider Bedarf / Moderater Bedarf / Schwacher Bedarf / Minimaler Bedarf"
  - "Chinese tier labels established: 迫切需求 / 坚实需求 / 适中需求 / 弱需求 / 极弱需求"
  - "German formula display: Vernachlässigt × (Kritisch + Bewusstsein) × (Dringend + Auferlegt + Real)"
  - "Chinese formula display: 被忽视 × (关键 + 意识) × (紧迫 + 强制 + 真实)"
  - "Advisory loop canonical sentence when loop did not run — German: Punktzahl über 1.000 — kein Beratungsschleife wurde ausgeführt."
  - "Advisory loop canonical sentence when loop did not run — Chinese: 得分高于1,000 — 未执行咨询循环。"

patterns-established:
  - "NEED-INTENSITY.md scaffolds are locale-specific translations with zero assembly logic — all assembly stays in section_write_outputs"
  - "Need Intensity rollback added to navigation_controls DISCARD RULE in both DE and ZH workflows"
  - "need_intensity_competitors passed as Pre-identified solutions to gyst-researcher in both DE and ZH section_competitors_research"

requirements-completed: [TRNS-06, TRNS-07]

# Metrics
duration: 20min
completed: 2026-05-16
---

# Phase 14 Plan 02: Language Translations (DE + ZH) Summary

**German and Chinese NEED-INTENSITY.md scaffolds plus translated section_need_intensity blocks with advisory loops, tier labels, and formula display added to both workflows**

## Performance

- **Duration:** 20 min
- **Started:** 2026-05-16T14:54:58Z
- **Completed:** 2026-05-16T15:15:23Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Created templates/de/NEED-INTENSITY.md with German headers (Bedarfsintensitäts-Bewertung), dimension names (Real, Dringend, Kritisch, Auferlegt, Vernachlässigt, Bewusstsein), and advisory loop placeholder
- Created templates/zh/NEED-INTENSITY.md with Chinese headers (需求强度评估), dimension names (真实, 紧迫, 关键, 强制, 被忽视, 意识), and advisory loop placeholder
- Added full translated section_need_intensity to foundation-sprint-german.md, positioned between section_problem and section_problem_importance, including all 6 steps, 5-loop advisory mechanism, 5 tier labels, and OUTPUT-05 write block
- Added full translated section_need_intensity to foundation-sprint-chinese.md with same structure and Simplified Chinese content throughout
- Updated navigation_controls DISCARD RULE in both workflows with Need Intensity rollback and updated Problem/Customer rollbacks to wipe need_intensity_*
- Updated section_competitors_research brief in both workflows to pass need_intensity_competitors as Pre-identified solutions to gyst-researcher

## Task Commits

Each task was committed atomically:

1. **Task 1: Create German and Chinese NEED-INTENSITY.md template scaffolds** - `01ac626` (feat)
2. **Task 2: Add section_need_intensity and update section_write_outputs in German workflow** - `ec9fb0e` (feat)
3. **Task 3: Add section_need_intensity and update section_write_outputs in Chinese workflow** - `b87cc73` (feat)

## Files Created/Modified
- `get-your-shit-together/templates/de/NEED-INTENSITY.md` — German scaffold for Need Intensity output file (Bedarfsintensitäts-Bewertung)
- `get-your-shit-together/templates/zh/NEED-INTENSITY.md` — Chinese scaffold for Need Intensity output file (需求强度评估)
- `get-your-shit-together/workflows/foundation-sprint-german.md` — German workflow with translated section_need_intensity, updated navigation_controls, section_competitors_research brief, and section_write_outputs (OUTPUT-05)
- `get-your-shit-together/workflows/foundation-sprint-chinese.md` — Chinese workflow with translated section_need_intensity, updated navigation_controls, section_competitors_research brief, and section_write_outputs (OUTPUT-05)

## Decisions Made
- German dimension names: Real, Dringend, Kritisch, Auferlegt, Vernachlässigt, Bewusstsein (from plan interfaces — pre-established)
- Chinese dimension names: 真实, 紧迫, 关键, 强制, 被忽视, 意识 (from plan interfaces — pre-established)
- German decimal separator uses period (6.000) matching German numeric conventions; Chinese uses comma (6,000) matching international usage in that context
- Note: Task 1 commit also included ja/ and pt/ NEED-INTENSITY.md files that were staged from a prior incomplete 14-01 run — these are valid scaffolds for those languages

## Deviations from Plan

None — plan executed exactly as written. All translation rules from interfaces were applied faithfully.

## Issues Encountered

None.

## Next Phase Readiness
- DE and ZH translations of Need Intensity section are complete and verified
- Plan 03 (PT + JA translations) can proceed immediately using the same pattern
- TRNS-06 and TRNS-07 satisfied

---
*Phase: 14-language-translations*
*Completed: 2026-05-16*
