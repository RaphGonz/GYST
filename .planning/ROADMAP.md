# Roadmap: Get Your Shit Together (GYST)

## Milestones

- ✅ **v1.0 Foundation Sprint** — Phases 1-4 (shipped 2026-02-28)
- 🚧 **v1.1 Multilingual Foundation Sprint** — Phases 5-7 (in progress)
- 📋 **v2.0 Session Persistence** — TBD (planned)

## Phases

<details>
<summary>✅ v1.0 Foundation Sprint (Phases 1-4) — SHIPPED 2026-02-28</summary>

- [x] Phase 1: Infrastructure (2/2 plans) — completed 2026-02-25
- [x] Phase 2: The Basics (Step 1) (2/2 plans) — completed 2026-02-25
- [x] Phase 3: Differentiation (Step 2) (2/2 plans) — completed 2026-02-26
- [x] Phase 4: Approaches + Hypothesis + Outputs (Steps 3-4) (2/2 plans) — completed 2026-02-27

Full details: `.planning/milestones/v1.0-ROADMAP.md`

</details>

### 🚧 v1.1 Multilingual Foundation Sprint (In Progress)

**Milestone Goal:** Users can run the full Foundation Sprint in French via a single flag argument, with a fully pre-translated workflow and output templates, using an extensible routing architecture that requires zero command changes for future languages.

- [x] **Phase 5: Language Routing** — Update the command file to route `-french` to the French workflow, route unknown flags to English with a message, and establish the extensible per-language dispatch pattern (completed 2026-03-08)
- [x] **Phase 6: French Output Templates** — Create the four French output templates at `templates/fr/` so the French workflow has valid target paths before translation begins (completed 2026-03-08)
- [ ] **Phase 7: French Workflow Translation** — Translate the 1,268-line workflow into a complete French standalone file, apply language-drift mitigations, verify template path references, and create `TRANSLATION-SYNC.md`

## Phase Details

### Phase 5: Language Routing
**Goal**: Users can invoke the sprint with or without a language flag and always land in the correct workflow — English by default, French with `-french`, and a graceful fallback for any unrecognized flag
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: LANG-01, LANG-02, LANG-03
**Success Criteria** (what must be TRUE):
  1. Running `/gyst:foundation-sprint` with no flag starts the English workflow exactly as before — no behavioral change for existing English users
  2. Running `/gyst:foundation-sprint, -french` routes to `foundation-sprint-french.md` (gracefully fails until Phase 7 delivers that file, but the routing instruction is live)
  3. Running `/gyst:foundation-sprint, -spanish` (or any other unsupported flag) prints a message naming the unsupported language, states that English will be used, and starts the English workflow
  4. Adding a new language requires only a new workflow file — no edits to the command file beyond a single new routing bullet
**Plans**: 1 plan

Plans:
- [x] 05-01-PLAN.md — Rewrite command file with $ARGUMENTS routing and deploy to both locations (complete; all three branches human-verified)

### Phase 6: French Output Templates
**Goal**: The four French output template files exist at their canonical `templates/fr/` paths, with all user-facing text in French, so the French workflow has valid injection targets before a single line of translation is written
**Depends on**: Phase 5
**Requirements**: LANG-04
**Success Criteria** (what must be TRUE):
  1. `templates/fr/COMPETITORS.md`, `templates/fr/HYPOTHESIS.md`, `templates/fr/SPRINT.md`, and `templates/fr/POSITIONING.md` all exist on disk
  2. Every header, label, section title, and structural prose string in each template file is in French
  3. The `* MAIN ADVERSARY` string and all YAML structural keys are preserved verbatim (untranslated) in COMPETITORS.md
  4. The filenames at `templates/fr/` are identical to the English root-level filenames (not `HYPOTHESIS-fr.md` or similar)
**Plans**: 1 plan

Plans:
- [x] 06-01-PLAN.md — Create all four French templates at templates/fr/ (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md)

### Phase 7: French Workflow Translation
**Goal**: A complete, self-contained French workflow file exists that Claude can load and execute end-to-end in French, producing all four output files in French using the `templates/fr/` paths, with a translation sync record on disk
**Depends on**: Phase 6
**Requirements**: LANG-05, LANG-06, LANG-07
**Success Criteria** (what must be TRUE):
  1. `foundation-sprint-french.md` exists and contains all 22 section `name=` identifiers unchanged (verifiable by comparing byte-for-byte against the English source; note: English source has 22 sections)
  2. A strong French-language directive appears at the top of the French workflow file before any section content, and per-section reinforcement directives appear before every WebSearch-heavy section
  3. Every `@` template reference in the French workflow points to `templates/fr/` (not the English root paths) — verifiable by searching the file for `@` and checking each path
  4. Running the French workflow end-to-end produces COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, and POSITIONING.md with French-language content and correctly structured output (French headers, French labels, French prose)
  5. `TRANSLATION-SYNC.md` exists on disk and records the English source commit hash from which the French translation was derived
**Plans**: 2 plans

Plans:
- [ ] 07-01-PLAN.md — Translate file header and Steps 1+2 sections (language_directive through section_step2_navigation — 15 of 22 sections)
- [ ] 07-02-PLAN.md — Complete Steps 3+4 sections, validate full file, create TRANSLATION-SYNC.md

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Infrastructure | v1.0 | 2/2 | Complete | 2026-02-25 |
| 2. The Basics (Step 1) | v1.0 | 2/2 | Complete | 2026-02-25 |
| 3. Differentiation (Step 2) | v1.0 | 2/2 | Complete | 2026-02-26 |
| 4. Approaches + Hypothesis + Outputs (Steps 3-4) | v1.0 | 2/2 | Complete | 2026-02-27 |
| 5. Language Routing | v1.1 | 1/1 | Complete | 2026-03-08 |
| 6. French Output Templates | v1.1 | 1/1 | Complete | 2026-03-08 |
| 7. French Workflow Translation | v1.1 | 0/2 | Not started | - |
