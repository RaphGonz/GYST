# Roadmap: Get Your Shit Together (GYST)

## Milestones

- ✅ **v1.0 Foundation Sprint** — Phases 1-4 (shipped 2026-02-28)
- ✅ **v1.1 Multilingual Foundation Sprint** — Phases 5-7 (shipped 2026-03-08)
- 🚧 **v1.2 Refined Protocol with 5PM Framework** — Phases 8-11 (in progress)

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

### 🚧 v1.2 Refined Protocol with 5PM Framework (In Progress)

**Milestone Goal:** Integrate Rob Walling's 5PM Idea Evaluation Framework into the Foundation Sprint as awareness lenses woven into the existing 4-step flow, produce a 5PM Scorecard output file, and translate all changes to French, Japanese, and Portuguese.

- [x] **Phase 8: English Step 1 — 5PM Lenses** - Add Problem I/U matrix, Purchaser classification, and Market sizing to the English workflow Step 1
- [x] **Phase 9: English Step 3 — Fit, Validation, and Scorecard** - Add Founder Fit and Pain to Validate to Step 3, update write_outputs, and create the 5PM-SCORECARD.md template (completed 2026-03-22)
- [x] **Phase 10: Language Scorecard Templates** - Create translated 5PM-SCORECARD.md templates for FR, JA, and PT (completed 2026-03-22)
- [x] **Phase 11: Language Workflow Updates** - Apply all 5PM section changes to the FR, JA, and PT workflow files and update TRANSLATION-SYNC.md (completed 2026-03-22)

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
- [ ] 09-01-PLAN.md — Add section_founder_fit, Matrix 5 (Pain to Validate), and scorecard_chosen_approach capture
- [ ] 09-02-PLAN.md — Create 5PM-SCORECARD.md template and add Scorecard assembly to section_write_outputs

### Phase 10: Language Scorecard Templates
**Goal**: Translated 5PM-SCORECARD.md templates exist for FR, JA, and PT so that language workflow updates in Phase 11 can reference them without broken includes
**Depends on**: Phase 9 (English template must be finalized before it is translated)
**Requirements**: TRNS-01
**Success Criteria** (what must be TRUE):
  1. `templates/fr/5PM-SCORECARD.md`, `templates/ja/5PM-SCORECARD.md`, and `templates/pt/5PM-SCORECARD.md` exist with all headers, labels, and structural text in the target language
  2. A 5PM terminology register documents how each framework-specific term (Pain to Validate, Purchaser, Product/Founder Fit, B2C/B2A/B2B/B2E) is handled in each language — loan word, translated concept, or explanatory phrase
**Plans:** 1/1 plans complete

Plans:
- [ ] 10-01-PLAN.md — Create 5PM terminology register and translated scorecard templates for FR, JA, and PT

### Phase 11: Language Workflow Updates
**Goal**: The French, Japanese, and Portuguese Foundation Sprint workflows reflect all 5PM section changes from Phases 8 and 9, and TRANSLATION-SYNC.md records the English source commit hash
**Depends on**: Phase 10 (language scorecard templates must exist before workflow includes can resolve)
**Requirements**: TRNS-02, TRNS-03
**Success Criteria** (what must be TRUE):
  1. All new and modified sections from Phases 8 and 9 are present in foundation-sprint-french.md, foundation-sprint-japanese.md, and foundation-sprint-portuguese.md, using the terminology register from Phase 10
  2. TRANSLATION-SYNC.md records the English source commit hash that all three language workflows were synced against
**Plans:** 3/3 plans complete

Plans:
- [ ] 11-01-PLAN.md — Sync French workflow with all Phase 8-9 English changes
- [ ] 11-02-PLAN.md — Sync Japanese workflow with all Phase 8-9 English changes
- [ ] 11-03-PLAN.md — Sync Portuguese workflow with all Phase 8-9 English changes and update TRANSLATION-SYNC.md

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
| 11. Language Workflow Updates | 3/3 | Complete   | 2026-03-22 | - |
