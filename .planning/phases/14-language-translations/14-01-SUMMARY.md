---
phase: 14-language-translations
plan: "01"
subsystem: workflows
tags: [translation, french, spanish, need-intensity, foundation-sprint, templates]

# Dependency graph
requires:
  - phase: 13-english-need-intensity-workflow
    provides: English section_need_intensity (lines 254-432), NEED-INTENSITY.md template scaffold, section_write_outputs OUTPUT-05 block
provides:
  - French NEED-INTENSITY.md template scaffold (templates/fr/NEED-INTENSITY.md)
  - Spanish NEED-INTENSITY.md template scaffold (templates/es/NEED-INTENSITY.md)
  - French Foundation Sprint workflow with translated section_need_intensity
  - Spanish Foundation Sprint workflow with translated section_need_intensity
affects: [15-translation-sync-record, foundation-sprint-french.md consumers, foundation-sprint-spanish.md consumers]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Translated section identifiers stay in English (name= attributes), only user-facing text translates"
    - "WebSearch queries in all workflows stay in English regardless of workflow language"
    - "French register: vous throughout, space-before-colon (Verdict :)"
    - "Spanish register: informal tú matching existing workflow register"

key-files:
  created:
    - get-your-shit-together/templates/fr/NEED-INTENSITY.md
    - get-your-shit-together/templates/es/NEED-INTENSITY.md
  modified:
    - get-your-shit-together/workflows/foundation-sprint-french.md
    - get-your-shit-together/workflows/foundation-sprint-spanish.md

key-decisions:
  - "Tier label translations established in plan interfaces used verbatim: FR 4000-6000 = Besoin brûlant — signal de marché fort; ES = Necesidad urgente — señal de mercado sólida"
  - "need_intensity_competitors pre-identified field added to gyst-researcher brief in both FR and ES, matching English pattern (line 651)"
  - "Navigation_controls DISCARD RULE updated in both languages to include Need Intensity rollback entry and wipe need_intensity_* from Problem/Customer rollbacks"
  - "Option C full reset updated in both languages to include need_intensity_* in cleared fields"

patterns-established:
  - "section_need_intensity inserted immediately before section_problem_importance in FR/ES, matching English insertion point"
  - "Template scaffolds are locale-specific (fr/NEED-INTENSITY.md, es/NEED-INTENSITY.md) with no assembly logic — scaffold only"
  - "Advisory loop canonical sentence in Notes placeholder matches locale: FR = Score supérieur à 1 000 — aucune boucle de conseil n'a été exécutée. ES = Puntuación superior a 1 000 — no se ejecutó ningún bucle de asesoramiento."

requirements-completed: [TRNS-04, TRNS-05]

# Metrics
duration: 25min
completed: 2026-05-16
---

# Phase 14 Plan 01: Language Translations (FR/ES) Summary

**French and Spanish Foundation Sprints fully translated with section_need_intensity, localized NEED-INTENSITY.md scaffolds (fr/, es/), OUTPUT-05 write blocks, and NAVIG-02 rollback entries**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-05-16T14:38:00Z
- **Completed:** 2026-05-16T15:03:58Z
- **Tasks:** 3
- **Files modified:** 4 (2 created, 2 modified)

## Accomplishments

- Created templates/fr/NEED-INTENSITY.md with full French scaffold (Évaluation de l'Intensité du Besoin, dimension names Réel/Urgent/Critique/Imposé/Négligé/Conscience, formula in French)
- Created templates/es/NEED-INTENSITY.md with full Spanish scaffold (Evaluación de la Intensidad de Necesidad, dimension names Real/Urgente/Crítico/Impuesto/Descuidado/Conciencia, formula in Spanish)
- Inserted translated section_need_intensity in foundation-sprint-french.md (229 lines) immediately before section_problem_importance, routing section_problem transition through it
- Inserted translated section_need_intensity in foundation-sprint-spanish.md (229 lines) immediately before section_problem_importance, routing section_problem transition through it
- Updated section_write_outputs in both workflows: OUTPUT-01–05 heading, 5-file messaging, language-specific template reference, NEED-INTENSITY.md in closing file list
- Updated navigation_controls DISCARD RULE in both workflows with Need Intensity rollback entry and updated Problem/Customer rollbacks to wipe need_intensity_*
- Added Pre-identified solutions field (need_intensity_competitors) to gyst-researcher brief in both workflows

## Task Commits

1. **Task 1: Create French and Spanish NEED-INTENSITY.md template scaffolds** - `2edc256` (feat)
2. **Task 2: Add section_need_intensity and update section_write_outputs in French workflow** - `e88b4b8` (feat)
3. **Task 3: Add section_need_intensity and update section_write_outputs in Spanish workflow** - `210f2f6` (feat)

## Files Created/Modified

- `get-your-shit-together/templates/fr/NEED-INTENSITY.md` — French scaffold for Need Intensity output file; scaffold only, zero assembly logic
- `get-your-shit-together/templates/es/NEED-INTENSITY.md` — Spanish scaffold for Need Intensity output file; scaffold only, zero assembly logic
- `get-your-shit-together/workflows/foundation-sprint-french.md` — Added section_need_intensity block (6 steps, full translation), updated section_write_outputs to OUTPUT-05, updated NAVIG-02, added pre-identified solutions to gyst-researcher brief
- `get-your-shit-together/workflows/foundation-sprint-spanish.md` — Added section_need_intensity block (6 steps, full translation), updated section_write_outputs to OUTPUT-05, updated NAVIG-02, added pre-identified solutions to gyst-researcher brief

## Decisions Made

- Used tier label translations verbatim as specified in plan interfaces (no deviation)
- Maintained French "vous" register throughout, including space-before-colon convention (Verdict :, Formule :)
- Maintained Spanish informal register matching existing workflow (consistent with Phase 11 translation conventions)
- Advisory loop canonical sentence in Notes uses "1 000" (space-separated thousands, French convention) and "1 000" in Spanish (matching plan specification)

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- FR and ES workflows satisfy TRNS-04 and TRNS-05
- 14-02 (DE, ZH) and 14-03 (PT, JA) follow the same pattern established here
- Phase 15 (TRANSLATION-SYNC.md update) depends on all 3 Phase 14 plans completing

---
*Phase: 14-language-translations*
*Completed: 2026-05-16*
