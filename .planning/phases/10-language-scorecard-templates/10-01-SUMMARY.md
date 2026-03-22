---
phase: 10-language-scorecard-templates
plan: 01
subsystem: templates
tags: [translation, french, japanese, portuguese, 5pm-scorecard, terminology]

# Dependency graph
requires:
  - phase: 09-english-step3-fit-validation-scorecard
    provides: English 5PM-SCORECARD.md template that serves as translation source
provides:
  - Three translated 5PM-SCORECARD.md templates (FR, JA, PT) at templates/{lang}/5PM-SCORECARD.md
  - 5PM-TERMINOLOGY-REGISTER.md documenting all framework term translations for Phase 11
affects: [11-language-workflow-updates]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Mirror-English-structure translation pattern (from Phase 6) extended to 5PM-SCORECARD.md
    - Centralized terminology register as single authority for cross-phase term consistency

key-files:
  created:
    - get-your-shit-together/templates/5PM-TERMINOLOGY-REGISTER.md
    - get-your-shit-together/templates/fr/5PM-SCORECARD.md
    - get-your-shit-together/templates/ja/5PM-SCORECARD.md
    - get-your-shit-together/templates/pt/5PM-SCORECARD.md
  modified: []

key-decisions:
  - "懸念あり chosen over 不利 for Japanese UNFAVORABLE — more natural in Japanese business communication without sounding legal"
  - "FAVORABLE kept as-is in French — direct cognate; POSITIF rejected as too colloquial"
  - "5PM-TERMINOLOGY-REGISTER.md placed at templates root (not per-language) — single authority for Phase 11 to read once"

patterns-established:
  - "Terminology register pattern: create standalone register before any translated template — prevents term divergence across phases"

requirements-completed: [TRNS-01]

# Metrics
duration: 10min
completed: 2026-03-22
---

# Phase 10 Plan 01: Language Scorecard Templates Summary

**Three translated 5PM-SCORECARD.md templates (FR, JA, PT) with fully translated verdict labels and framework terms, plus a centralized terminology register for Phase 11**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-22T19:13:21Z
- **Completed:** 2026-03-22T19:23:56Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `5PM-TERMINOLOGY-REGISTER.md` at templates root documenting verdict labels and all framework terms for all 3 languages — Phase 11 authority
- Created `templates/fr/5PM-SCORECARD.md` using vous register, Prisme for Lens, FAVORABLE/ATTENTION/DÉFAVORABLE, French space-before-colon convention
- Created `templates/ja/5PM-SCORECARD.md` using polite Japanese (丁寧語), 視点 for Lens, 有望/注意/懸念あり, full-width colons
- Created `templates/pt/5PM-SCORECARD.md` using você register, Lente for Lens, FAVORÁVEL/ATENÇÃO/DESFAVORÁVEL — all language directories now at 5 templates each

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 5PM terminology register and French scorecard template** - `23dd2f6` (feat)
2. **Task 2: Create Japanese and Portuguese scorecard templates** - `10ba512` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `get-your-shit-together/templates/5PM-TERMINOLOGY-REGISTER.md` — Standalone terminology register with verdict labels and framework term translations for FR, JA, PT; includes formatting conventions and open questions for native speaker review
- `get-your-shit-together/templates/fr/5PM-SCORECARD.md` — Complete French translation: Prisme 1–5 headings, FAVORABLE/ATTENTION/DÉFAVORABLE/MITIGÉ, vous register, space-before-colon formatting
- `get-your-shit-together/templates/ja/5PM-SCORECARD.md` — Complete Japanese translation: 視点1–5 headings, 有望/注意/懸念あり/混在, polite register, full-width colons
- `get-your-shit-together/templates/pt/5PM-SCORECARD.md` — Complete Brazilian Portuguese translation: Lente 1–5 headings, FAVORÁVEL/ATENÇÃO/DESFAVORÁVEL/MISTO, você register, no space before colon

## Decisions Made

- **懸念あり vs. 不利 for Japanese UNFAVORABLE:** 懸念あり (concerns exist) chosen — more natural in Japanese business communication. 不利 sounds like a legal or competitive term. Flagged for native speaker review.
- **FAVORABLE kept as-is in French:** Direct cognate. POSITIF rejected as colloquial. All-caps presentation feels consistent with the English verdict convention.
- **Terminology register at templates root (standalone):** Single file Phase 11 reads once — prevents the divergence pitfall where Phase 10 and Phase 11 independently choose different translations.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 3 translated `5PM-SCORECARD.md` templates exist at the correct `templates/{lang}/5PM-SCORECARD.md` paths
- Phase 11 (Language Workflow Updates) can now add `@`-include references to these templates in the translated workflow files
- `5PM-TERMINOLOGY-REGISTER.md` is the authority for verdict label and framework term translations — Phase 11 must read it before writing any workflow translation instructions
- Blocker from STATE.md resolved: "5PM terminology register does not yet exist" is no longer true

---
*Phase: 10-language-scorecard-templates*
*Completed: 2026-03-22*

## Self-Check: PASSED

All claimed files exist on disk and all task commits are confirmed in git history.
