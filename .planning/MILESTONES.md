# Milestones

## v1.0 Foundation Sprint (Shipped: 2026-02-28)

**Phases completed:** 4 phases, 8 plans
**Timeline:** 2026-02-25 → 2026-02-27 (3 days)
**Files:** 41 changed, 9,143 lines added
**Primary artifact:** foundation-sprint.md (1,268 lines, 20 named sections, 0 stubs)
**Audit:** 35/35 requirements, 4/4 phases, 21/21 integration points — PASSED

**Key accomplishments:**
- npm installer package (`bin/install.js`) with TTY detection; installs at `~/.claude/get-your-shit-together/` with correct subdirectory structure
- Full Step 1 workflow — customer/problem/founder advantages elicitation with inline web validation and competitor name collection
- `gyst-researcher` sub-agent writes COMPETITORS.md to disk (max 5 competitors, main adversary flagged), fixing the competitor list for the entire session
- Step 2 differentiation — 8-axis bipolar rating, AI competitor scoring from COMPETITORS.md (no re-searching), ASCII 2x2 matrix, hard-block conflict detection, 3-phrase mini-manifesto
- Step 3 approaches — user-first A1 probe, INTERNAL FILTER (silent exclusion of non-executable approaches), 4-matrix sequential ASCII evaluation, AI recommendation with unconditional user override
- Step 4 hypothesis + explicit-lock enforcement + auto-derived testable form + 3 output files (HYPOTHESIS.md, SPRINT.md, POSITIONING.md) written at single output location

**Known Gaps:** None — all 35 v1 requirements satisfied

---


## v1.1 Multilingual Foundation Sprint (Shipped: 2026-03-08)

**Phases completed:** 3 phases, 4 plans, 0 tasks

**Key accomplishments:**
- (none recorded)

---


## v1.3 Need Intensity Framework (Shipped: 2026-05-17)

**Phases completed:** 4 phases (12-15), 7 plans
**Timeline:** 2026-05-16 → 2026-05-17 (2 days)
**Files:** 36 changed, 5,024 lines added
**Requirements:** 16/16 v1.3 requirements satisfied

**Key accomplishments:**
- Added 5PM Framework and Need Intensity documentation to README.md — settled tier labels, formula, and dimension names before workflow implementation
- Inserted `section_need_intensity` into English workflow immediately after problem statement: 6-dimension 0-10 rating, downward-only web search calibration, formula `Neglected × (Critical + Consciousness) × (Urgent + Imposed + Real)`, 5-tier verdict labels, and advisory loop for scores below 1,000
- Created `NEED-INTENSITY.md` template scaffold and added 5th write block to `section_write_outputs` — competitor data from the Need Intensity web search reused for COMPETITORS.md with no duplicate search
- Translated Need Intensity section into all 6 language workflows (FR, ES, DE, ZH, PT, JA) with localized `NEED-INTENSITY.md` template scaffolds, OUTPUT-05 write blocks, and navigation_controls DISCARD RULE updates
- Updated TRANSLATION-SYNC.md with v1.3 English source commit hash (`8d3861c3`) for all 6 languages — closing the translation cycle

**Known Gaps:** None — all 16 v1.3 requirements satisfied

---

