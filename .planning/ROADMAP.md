# Roadmap: Get Your Shit Together (GYST)

## Milestones

- ✅ **v1.0 Foundation Sprint** — Phases 1-4 (shipped 2026-02-28)
- ✅ **v1.1 Multilingual Foundation Sprint** — Phases 5-7 (shipped 2026-03-08)
- ✅ **v1.2 Refined Protocol with 5PM Framework** — Phases 8-11 (shipped 2026-03-22)
- 🚧 **v1.3 Need Intensity Framework** — Phases 12-15 (in progress)

## Phases

<details>
<summary>✅ v1.0 Foundation Sprint (Phases 1-4) — SHIPPED 2026-02-28</summary>

- [x] Phase 1: Infrastructure (2/2 plans) — completed 2026-02-25
- [x] Phase 2: The Basics (Step 1) (2/2 plans) — completed 2026-02-25
- [x] Phase 3: Differentiation (Step 2) (2/2 plans) — completed 2026-02-26
- [x] Phase 4: Approaches + Hypothesis + Outputs (Steps 3-4) (2/2 plans) — completed 2026-02-27

Full details: `.planning/milestones/v1.0-ROADMAP.md`

</details>

<details>
<summary>✅ v1.1 Multilingual Foundation Sprint (Phases 5-7) — SHIPPED 2026-03-08</summary>

- [x] Phase 5: Language Routing (1/1 plans) — completed 2026-03-08
- [x] Phase 6: French Output Templates (1/1 plans) — completed 2026-03-08
- [x] Phase 7: French Workflow Translation (2/2 plans) — completed 2026-03-08

Full details: `.planning/milestones/v1.1-ROADMAP.md`

</details>

<details>
<summary>✅ v1.2 Refined Protocol with 5PM Framework (Phases 8-11) — SHIPPED 2026-03-22</summary>

- [x] **Phase 8: English Step 1 — 5PM Lenses** - Add Problem I/U matrix, Purchaser classification, and Market sizing to the English workflow Step 1
- [x] **Phase 9: English Step 3 — Fit, Validation, and Scorecard** - Add Founder Fit and Pain to Validate to Step 3, update write_outputs, and create the 5PM-SCORECARD.md template (completed 2026-03-22)
- [x] **Phase 10: Language Scorecard Templates** - Create translated 5PM-SCORECARD.md templates for FR, JA, and PT (completed 2026-03-22)
- [x] **Phase 11: Language Workflow Updates** - Apply all 5PM section changes to the FR, JA, and PT workflow files and update TRANSLATION-SYNC.md (completed 2026-03-22)

Full details in Phase Details section below.

</details>

### 🚧 v1.3 Need Intensity Framework (In Progress)

**Milestone Goal:** Add the Need Intensity scoring framework to Step 1 of the Foundation Sprint, translate all changes to all 6 language versions, and document both 5PM and Need Intensity in the README.

- [ ] **Phase 12: README Documentation** - Add dedicated 5PM and Need Intensity sections to README.md
- [ ] **Phase 13: English Need Intensity Workflow** - Add the Need Intensity scoring section to Step 1 of foundation-sprint.md and produce NEED-INTENSITY.md output
- [ ] **Phase 14: Language Translations** - Translate the Need Intensity section into all 6 language workflows and create NEED-INTENSITY.md templates in all 6 language template directories
- [ ] **Phase 15: Translation Sync Record** - Update TRANSLATION-SYNC.md with the English source commit hash for all 6 languages

## Phase Details

### Phase 8: English Step 1 — 5PM Lenses
**Goal**: The English Foundation Sprint Step 1 presents the Problem Important/Urgent matrix, Purchaser classification, and Market sizing as non-blocking awareness lenses before entering Differentiation
**Depends on**: Phase 7 (English workflow is the stable source)
**Requirements**: PROB-01, PROB-02, PURC-01, PURC-02, PURC-03, MRKT-01, MRKT-02, MRKT-03
**Success Criteria** (what must be TRUE):
  1. User sees a Problem I/U 2x2 grid placing their problem in a quadrant (vitamin vs. aspirin), with the classification stored for Scorecard assembly
  2. User is asked Purchaser questions covering tech adoption, willingness to pay, and B2C/B2A/B2B/B2E tier — the B2A tier is explicitly defined in the workflow text
  3. AI performs an inline web search for market size and growth signals and presents the result as an estimate range with a confidence caveat, not a single authoritative figure
  4. User is asked about ease of reaching customers and their own perception of market maturity
  5. Step 1 adds no lock cycles or banner updates for any of these four modules — the flow into Step 2 is uninterrupted
**Plans:** 2/2 plans executed

Plans:
- [x] 08-01-PLAN.md — Add section_purchaser and section_problem_importance awareness sections
- [x] 08-02-PLAN.md — Add section_market_sizing and update navigation_controls DISCARD RULE cascade

### Phase 9: English Step 3 — Fit, Validation, and Scorecard
**Goal**: The English Foundation Sprint Step 3 confronts the founder on fit and validates each approach against build pain, and the sprint produces a 5PM-SCORECARD.md output file at session end
**Depends on**: Phase 8 (DISCARD RULE cascade must reflect all Step 1 additions before cross-step testing is valid; scorecard_field names set in Step 1 must exist before Scorecard assembly is tested)
**Requirements**: PFIT-01, PFIT-02, PFIT-03, PFIT-04, PAIN-01, PAIN-02, SCRD-01, SCRD-02, SCRD-03, SCRD-04
**Success Criteria** (what must be TRUE):
  1. User is asked about background, market access, and why they are the right person for this specific idea — the questions reference Step 1 advantages already captured rather than re-eliciting them
  2. User is asked "Do you love this problem?" as a direct passion check
  3. Each approach evaluation includes a Pain to Validate label using the existing sequential matrix pattern
  4. Sprint produces a 5PM-SCORECARD.md file with a FAVORABLE/CAUTION/UNFAVORABLE verdict per lens, evidence from the sprint, rationale, and red flags
  5. The Scorecard is written only in section_write_outputs — no partial Scorecard appears earlier in the session
**Plans:** 2/2 plans complete

Plans:
- [x] 09-01-PLAN.md — Add section_founder_fit, Matrix 5 (Pain to Validate), and scorecard_chosen_approach capture
- [x] 09-02-PLAN.md — Create 5PM-SCORECARD.md template and add Scorecard assembly to section_write_outputs

### Phase 10: Language Scorecard Templates
**Goal**: Translated 5PM-SCORECARD.md templates exist for FR, JA, and PT so that language workflow updates in Phase 11 can reference them without broken includes
**Depends on**: Phase 9 (English template must be finalized before it is translated)
**Requirements**: TRNS-01
**Success Criteria** (what must be TRUE):
  1. `templates/fr/5PM-SCORECARD.md`, `templates/ja/5PM-SCORECARD.md`, and `templates/pt/5PM-SCORECARD.md` exist with all headers, labels, and structural text in the target language
  2. A 5PM terminology register documents how each framework-specific term (Pain to Validate, Purchaser, Product/Founder Fit, B2C/B2A/B2B/B2E) is handled in each language — loan word, translated concept, or explanatory phrase
**Plans:** 1/1 plans complete

Plans:
- [x] 10-01-PLAN.md — Create 5PM terminology register and translated scorecard templates for FR, JA, and PT

### Phase 11: Language Workflow Updates
**Goal**: The French, Japanese, and Portuguese Foundation Sprint workflows reflect all 5PM section changes from Phases 8 and 9, and TRANSLATION-SYNC.md records the English source commit hash
**Depends on**: Phase 10 (language scorecard templates must exist before workflow includes can resolve)
**Requirements**: TRNS-02, TRNS-03
**Success Criteria** (what must be TRUE):
  1. All new and modified sections from Phases 8 and 9 are present in foundation-sprint-french.md, foundation-sprint-japanese.md, and foundation-sprint-portuguese.md, using the terminology register from Phase 10
  2. TRANSLATION-SYNC.md records the English source commit hash that all three language workflows were synced against
**Plans:** 3/3 plans complete

Plans:
- [x] 11-01-PLAN.md — Sync French workflow with all Phase 8-9 English changes
- [x] 11-02-PLAN.md — Sync Japanese workflow with all Phase 8-9 English changes
- [x] 11-03-PLAN.md — Sync Portuguese workflow with all Phase 8-9 English changes and update TRANSLATION-SYNC.md

### Phase 12: README Documentation
**Goal**: README.md has dedicated sections explaining both the 5PM framework and the Need Intensity framework so users understand what each sprint dimension measures before they run the sprint
**Depends on**: Nothing (documentation only, no workflow files required)
**Requirements**: DOC-01, DOC-02
**Success Criteria** (what must be TRUE):
  1. README.md contains a section on the 5PM framework that names all 5 lenses (Problem, Purchaser, Pricing Model, Market, Product/Founder Fit), explains what each measures, and states why it matters for idea evaluation
  2. README.md contains a section on Need Intensity that names all 6 dimensions (Real, Urgent, Critical, Imposed, Neglected, Consciousness), shows the formula `Neglected × (Critical + Consciousness) × (Urgent + Imposed + Real)`, states the 0-6000 scale, and lists all 5 business threshold tiers with their labels
**Plans**: TBD

Plans:
- [ ] 12-01-PLAN.md — Add 5PM framework section and Need Intensity section to README.md

### Phase 13: English Need Intensity Workflow
**Goal**: The English Foundation Sprint Step 1 includes a Need Intensity scoring section immediately after the user states their client and problem, and the sprint produces a NEED-INTENSITY.md output file at session end
**Depends on**: Phase 12 (README documents the framework before the workflow implements it — ensures terminology is settled)
**Requirements**: NEED-01, NEED-02, NEED-03, NEED-04, NEED-05, NEED-06, NEED-07
**Success Criteria** (what must be TRUE):
  1. Immediately after the user states their client and problem, the AI presents all 6 Need Intensity dimensions with plain-language descriptions and asks the user to rate each 0-10 — this happens before the competitor search
  2. AI performs a web search for who is trying to solve the problem and whether any solution is dominant, then reasons out loud per dimension to calibrate the user's scores downward where warranted
  3. The formula `Neglected × (Critical + Consciousness) × (Urgent + Imposed + Real)` is computed and displayed with the matching business threshold label (0-6000 scale)
  4. When the score is below 1000, the AI suggests one or two more precise client segments or problem reframings; the user can re-rate or proceed — the flow is advisory, not blocking
  5. Competitor names found during the Need Intensity web search are stored and reused for COMPETITORS.md later in Step 1 — the competitor search does not run a second time
  6. The sprint produces NEED-INTENSITY.md at session end containing all 6 calibrated scores, the formula calculation, final score, verdict tier, AI rationale per dimension, and the final problem/client statement
**Plans**: TBD

Plans:
- [ ] 13-01-PLAN.md — Add section_need_intensity to foundation-sprint.md (dimensions, web search, calibration, formula, advisory loop, competitor data handoff)
- [ ] 13-02-PLAN.md — Create NEED-INTENSITY.md template and add its assembly to section_write_outputs

### Phase 14: Language Translations
**Goal**: All 6 language Foundation Sprint workflows (FR, ES, DE, ZH, PT, JA) include the translated Need Intensity section, and a NEED-INTENSITY.md template exists in each language's template directory
**Depends on**: Phase 13 (English section must be finalized before it is translated)
**Requirements**: TRNS-04, TRNS-05, TRNS-06, TRNS-07, TRNS-08, TRNS-09
**Success Criteria** (what must be TRUE):
  1. `templates/fr/NEED-INTENSITY.md`, `templates/es/NEED-INTENSITY.md`, `templates/de/NEED-INTENSITY.md`, `templates/zh/NEED-INTENSITY.md`, `templates/pt/NEED-INTENSITY.md`, and `templates/ja/NEED-INTENSITY.md` all exist with all headers, labels, and structural text in the target language
  2. The Need Intensity section appears in foundation-sprint-french.md, foundation-sprint-spanish.md, foundation-sprint-german.md, foundation-sprint-chinese.md, foundation-sprint-portuguese.md, and foundation-sprint-japanese.md — positioned immediately after the problem statement, before the competitor search, matching the English section structure
  3. Each language workflow references its language-specific NEED-INTENSITY.md template path in section_write_outputs
**Plans**: TBD

Plans:
- [ ] 14-01-PLAN.md — Translate Need Intensity section and create NEED-INTENSITY.md template for FR and ES
- [ ] 14-02-PLAN.md — Translate Need Intensity section and create NEED-INTENSITY.md template for DE and ZH
- [ ] 14-03-PLAN.md — Translate Need Intensity section and create NEED-INTENSITY.md template for PT and JA

### Phase 15: Translation Sync Record
**Goal**: TRANSLATION-SYNC.md records the English source commit hash that all 6 language workflows were synced against, closing the v1.3 translation cycle
**Depends on**: Phase 14 (all language translations must be complete before the sync record is final)
**Requirements**: TRNS-10
**Success Criteria** (what must be TRUE):
  1. TRANSLATION-SYNC.md contains an updated entry with the English source commit hash for the v1.3 Need Intensity changes, with all 6 languages (FR, ES, DE, ZH, PT, JA) listed as synced against that hash
**Plans**: TBD

Plans:
- [ ] 15-01-PLAN.md — Update TRANSLATION-SYNC.md with v1.3 English source commit hash for all 6 languages

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Infrastructure | v1.0 | 2/2 | Complete | 2026-02-25 |
| 2. The Basics (Step 1) | v1.0 | 2/2 | Complete | 2026-02-25 |
| 3. Differentiation (Step 2) | v1.0 | 2/2 | Complete | 2026-02-26 |
| 4. Approaches + Hypothesis + Outputs (Steps 3-4) | v1.0 | 2/2 | Complete | 2026-02-27 |
| 5. Language Routing | v1.1 | 1/1 | Complete | 2026-03-08 |
| 6. French Output Templates | v1.1 | 1/1 | Complete | 2026-03-08 |
| 7. French Workflow Translation | v1.1 | 2/2 | Complete | 2026-03-08 |
| 8. English Step 1 — 5PM Lenses | v1.2 | 2/2 | Complete | 2026-03-22 |
| 9. English Step 3 — Fit, Validation, and Scorecard | v1.2 | 2/2 | Complete | 2026-03-22 |
| 10. Language Scorecard Templates | v1.2 | 1/1 | Complete | 2026-03-22 |
| 11. Language Workflow Updates | v1.2 | 3/3 | Complete | 2026-03-22 |
| 12. README Documentation | v1.3 | 0/1 | Not started | - |
| 13. English Need Intensity Workflow | v1.3 | 0/2 | Not started | - |
| 14. Language Translations | v1.3 | 0/3 | Not started | - |
| 15. Translation Sync Record | v1.3 | 0/1 | Not started | - |
