# Project Research Summary

**Project:** GYST v1.2 — 5PM Idea Evaluation Framework Integration
**Domain:** Workflow augmentation — adding a structured qualitative evaluation lens to an existing AI-guided Foundation Sprint command
**Researched:** 2026-03-22
**Confidence:** HIGH

## Executive Summary

GYST v1.2 adds Rob Walling's 5PM Pre-Validation Framework to the existing Foundation Sprint workflow — a 22-section, single-session AI-guided sprint that produces four output files. The 5PM framework evaluates SaaS ideas across six dimensions in priority order: Problem, Purchaser, Pricing Model, Market, Product/Founder Fit, and Pain to Validate. The critical insight from research is that this framework is intentionally qualitative — Walling explicitly states there is no score, no weighted sum, and no pass/fail gate. The integration must honor this design principle: the 5PM dimensions are awareness lenses woven into the existing sprint flow, not a second evaluation sequence bolted onto the side of it.

The recommended approach requires zero new technologies. All 5PM additions use the existing pattern library: ASCII 2x2 grids (already in production for Steps 2 and 3), inline WebSearch (already used for problem validation), GFM markdown tables (already used in all output templates), and the `@`-include template injection pattern (already used for all four current output files). The result is 6 new named sections, 4 modified existing sections, one new output template (5PM-SCORECARD.md), and corresponding changes to three translated language workflows (FR, JA, PT). The English workflow grows from 22 to 28 sections.

The key risk is Step 1 overload: four 5PM modules (Problem I/U matrix, Purchaser, Pricing Model, Market sizing) all land in Step 1, and if implemented as independent lock-and-banner cycles they would more than double Step 1's sub-steps and break the "single session" guarantee. The mitigation is structural — 5PM additions in Step 1 must be written as non-blocking awareness passes with no new lock phrasing, no banner updates, and no probe loops. A second risk is that the 5PM Scorecard, assembled from values captured across all four steps, can silently misreport if scorecard field names are not stored at lock time. The prevention is explicit `scorecard_[field]` naming in every Step 1 and Step 3 5PM section so that `section_write_outputs` assembles from named references, not from memory reconstruction.

---

## Key Findings

### Recommended Stack

No new technologies are introduced in v1.2. The stack is identical to v1.1: Claude Code slash commands, pure markdown workflow files, ASCII 2x2 grids, GFM tables, inline WebSearch, and `@`-include template injection. All six 5PM dimensions map cleanly onto existing rendering primitives already in production.

The one new pattern is the **scored lens block**: a structured unit that records a qualitative signal (FAVORABLE / CAUTION / UNFAVORABLE, or dimension-specific tiers such as Strong / Moderate / Weak) alongside written rationale. This is not a library or a new component — it is a workflow instruction shape enforced by prose conventions. Numeric scoring is explicitly prohibited because Walling designed 5PM as a qualitative lens system; a point system would misrepresent the framework and create false confidence in founders.

**Core technologies:**
- Claude Code slash commands: command entry point and routing — already the GYST execution model, unchanged
- Markdown workflow files: sprint execution with 5PM lens integration — pure markdown handles all required rendering
- ASCII 2x2 grid pattern: Problem I/U matrix and Pain to Validate matrix — already proven in production for Steps 2 and 3, reused verbatim with no new syntax
- GFM markdown tables: 5PM Scorecard summary, per-lens signal rows — already used in all existing output templates
- Inline WebSearch: market sizing research (new RESEARCH-04 in Step 1) — extends the identical pattern used for problem validation in RESEARCH-03
- `@`-include template injection: 5PM-SCORECARD.md template loading in section_write_outputs — identical pattern used for all three existing output templates

### Expected Features

**Must have (table stakes) — all required for v1.2:**
- Problem Important/Urgent 2x2 — AI places problem in quadrant from its own RESEARCH-03 search findings; no new user input required; single confirmatory framing, not a probe loop
- Purchaser type classification (B2C / B2A / B2B / B2E) — Rob Walling's specific purchaser hierarchy; includes tech adoption and willingness-to-pay signals
- Pricing Model questions — subscription viability and ARPA estimate; placed after Purchaser classification because ARPA ceiling is tier-dependent
- Market sizing via AI research (RESEARCH-04) — new inline WebSearch in Step 1; returns reachable market signals and growth direction; always presented as a range with confidence caveat, never as a single authoritative figure
- Product/Founder Fit additions (chops + access) — two questions added to section_context_reload in Step 3; explicitly references locked Step 1 values rather than re-eliciting Capacity/Insight/Motivation
- Pain to Validate label per approach — annotation on existing Matrix 3 (Pragmatic Vision) in Step 3; adds a validation path label without adding a standalone new matrix or extra evaluation turns
- 5PM-SCORECARD.md output template — new file at templates/5PM-SCORECARD.md; follows the zero-placeholder rule and HTML comment header convention used by all existing templates
- 5PM Scorecard written at sprint end — added as step 4 in section_write_outputs; assembled from named session references, not memory reconstruction
- Translation to FR/JA/PT — all 10 section changes mirrored to three language workflows; language scorecard templates created before translated workflows reference them

**Should have (post-v1.2 validation):**
- ARPA sanity check against purchaser type — flag mismatches between buyer tier and stated ARPA; add once v1.2 is in use and mismatch frequency is confirmed
- Competitor pricing anchor for ARPA question — pull competitor pricing from COMPETITORS.md to ground the ARPA conversation

**Defer to v2+:**
- Multi-idea comparison mode using 5PM — requires multi-session state, explicitly out of scope until v2
- Quantitative scoring system — only integrate if Rob Walling releases an official rubric; do not invent one ahead of the source

### Architecture Approach

The v1.2 integration adds 6 new named sections and modifies 4 existing sections in the Foundation Sprint workflow, growing from 22 to 28 sections total. The section insertion order follows the 5PM framework's own priority sequence: Purchaser before Problem (so buyer behavior informs the RESEARCH-03 query), Problem I/U matrix immediately after problem lock, Pricing Model and Market sizing before Founder Advantages to keep all research-heavy sections contiguous in Step 1, and Founder Fit confrontation in Step 3 after approaches are generated so it evaluates fit against concrete approaches rather than in the abstract. Step 2 (all 7 sections) and Step 4 (hypothesis and testable form sections) are untouched. The 5PM Scorecard is the fifth output file; it is assembled entirely from named session values and written once in section_write_outputs alongside the four existing files.

**New sections:**
1. `section_purchaser` — Purchaser awareness: tech adoption, willingness to pay, B2C/B2A/B2B/B2E classification; inserted after section_customer in Step 1
2. `section_problem_importance` — Problem Important/Urgent 2x2; inserted after section_problem in Step 1
3. `section_pricing_model` — subscription viability and ARPA estimate; inserted after section_problem_importance in Step 1
4. `section_market_sizing` — inline WebSearch for market size and growth; inserted after section_pricing_model in Step 1
5. `section_founder_fit` — chops and access confrontation; inserted after section_approach_generation in Step 3
6. Matrix 5 (Pain to Validate) — added within section_approach_evaluation in Step 3, not as a separate top-level section

**Modified sections:**
1. `section_write_outputs` — adds 5PM-SCORECARD.md as step 4 of the output write sequence
2. `navigation_controls` — DISCARD RULE cascade updated to include the four new Step 1 sections
3. `section_problem` — minor: banner cascade update to include new downstream sections
4. `section_approach_evaluation` — adds Matrix 5 (Pain to Validate) to the existing 4-matrix evaluation loop

### Critical Pitfalls

1. **Step 1 overload** — adding four 5PM modules as independent lock-and-banner cycles more than doubles Step 1 sub-steps and breaks the single-session experience. Prevention: enforce "non-blocking awareness" structurally — no lock phrasing, no banner updates for Purchaser and Pricing Model; Problem I/U matrix is one confirmatory framing expecting one response; market sizing is grouped with its web search and presented as an estimate range.

2. **Scorecard context drift** — the 5PM Scorecard is assembled in section_write_outputs (Step 4) from values established in Step 1 and Step 3; hundreds of conversational turns create long-context drift risk. Prevention: name each scorecard field at lock time (e.g., `scorecard_purchaser_type`, `scorecard_problem_iu`, `scorecard_arpa`) so section_write_outputs assembles from named references, not memory reconstruction.

3. **Market data stated as fact** — web search market size figures vary wildly by source methodology. Prevention: always present market data as a range with source caveats; Scorecard market field must use "estimate" language; present AI-found figure and founder perception as separate data points, never merged into a single authoritative number.

4. **Founder Fit duplicating Step 1 Advantages** — the 5PM Product/Founder Fit confrontation overlaps with the existing Capacity/Insight/Motivation capture in section_advantages. Prevention: Step 3 Fit section must reference locked Step 1 values explicitly and ask only the delta question (what specific capability or credibility gap exists for this approach), not re-elicit background information.

5. **Scorecard breaks output architecture** — the fifth output file must be declared in three locations atomically: the `<objective>` block, the `<onboarding>` block, and section_write_outputs. Updating one without the others produces either an undeclared file (user confusion) or a declared file that is never written.

6. **5PM translation terminology** — framework-specific terms (Pain to Validate, Purchaser, Product/Founder Fit) have no established equivalents in French, Japanese, or Portuguese. Prevention: create a 5PM terminology register before any translation plan is written; use loan words where they are accepted (Japanese startup context) rather than producing awkward native coinages.

---

## Implications for Roadmap

Based on combined research, the dependency chain is: English workflow must be correct before translations begin; the 5PM-SCORECARD.md template must exist before any workflow that `@`-includes it can be tested end-to-end; Step 1 5PM sections must be complete and committed before Step 3 additions are tested in a full-run context (due to the DISCARD RULE cascade in navigation_controls). This produces a five-phase build order.

### Phase 1: English Workflow — Step 1 5PM Additions

**Rationale:** Step 1 additions are independent of Step 3 and can be written, reviewed, and tested in isolation. The DISCARD RULE cascade update must be included in this phase so that navigation_controls is accurate before any full-run testing of Step 3 additions begins.
**Delivers:** Four new sections in foundation-sprint.md (section_purchaser, section_problem_importance, section_pricing_model, section_market_sizing) and the updated navigation_controls DISCARD RULE cascade.
**Addresses:** Problem I/U 2x2, Purchaser classification, Pricing Model questions, Market sizing via RESEARCH-04.
**Avoids:** Step 1 overload (Pitfall 1) — the plan for this phase must define "non-blocking awareness" structurally before prose is written: no lock phrasing, no banner updates, max 2 new turns between problem lock and entering section_competitors.

### Phase 2: English Workflow — Step 3 Additions and 5PM Scorecard Template

**Rationale:** Step 3 additions depend on the DISCARD RULE cascade from Phase 1 being in place for accurate full-run testing. The 5PM-SCORECARD.md template must be created in this phase because it is referenced by section_write_outputs (also updated here). The `<objective>` and `<onboarding>` block updates must be included atomically.
**Delivers:** section_founder_fit, Matrix 5 within section_approach_evaluation, section_write_outputs updated to write 5PM-SCORECARD.md, the new templates/5PM-SCORECARD.md English template, and the `<objective>` and `<onboarding>` block updates in the command file.
**Addresses:** Product/Founder Fit (chops + access), Pain to Validate annotation, fifth output file.
**Avoids:** Scorecard context drift (Pitfall 2) — named scorecard field instructions must be plan deliverables; Scorecard output architecture breakage (Pitfall 6) — all three declaration locations updated as a single atomic checklist.

### Phase 3: Language Scorecard Templates

**Rationale:** Translated scorecard templates must exist before translated workflows that `@`-include them can complete an end-to-end run. This follows the same dependency order as v1.1 (French templates before French workflows). A 5PM terminology register is a required pre-phase deliverable — it must be produced before the first translation line is written.
**Delivers:** templates/fr/5PM-SCORECARD.md, templates/ja/5PM-SCORECARD.md, templates/pt/5PM-SCORECARD.md, and the 5PM terminology register specifying how each framework-specific term is handled in each target language.
**Addresses:** Translation template prerequisite for Phase 4; terminology decision before any translation prose is written.
**Avoids:** Translation terminology pitfall (Pitfall 7) — framework terms are handled with deliberate language decisions, not word-for-word translation.

### Phase 4: Language Workflow Updates

**Rationale:** Language workflows can only be updated accurately after the English source workflow is finalized and committed (so the exact diff is known). All three language workflows can be updated in parallel within this phase, each following the same 10-change list.
**Delivers:** All 10 section changes applied to foundation-sprint-french.md, foundation-sprint-japanese.md, and foundation-sprint-portuguese.md.
**Addresses:** Translation completeness for FR, JA, PT.
**Avoids:** Terminology pitfall (Pitfall 7) — translation uses the register from Phase 3, not ad-hoc equivalents.

### Phase 5: TRANSLATION-SYNC.md Update

**Rationale:** TRANSLATION-SYNC.md tracks the English source commit hash that each language workflow was last synced to. This must be updated immediately after the English source commit is tagged, before any subsequent English edits shift the diff baseline.
**Delivers:** Updated commit hash entries for all three active language entries (FR, JA, PT) in TRANSLATION-SYNC.md.
**Addresses:** Sync record accuracy for future translation maintenance cycles.
**Avoids:** Sync drift — the update cannot be deferred; TRANSLATION-SYNC.md is the ground truth for what changed between English versions and what the translators used as their source.

### Phase Ordering Rationale

- Phases 1 and 2 are strictly sequential: the DISCARD RULE cascade (Phase 1) must be in place before Phase 2 full-run testing is valid, and the navigation_controls change is scoped to Step 1 — it must reflect the new Step 1 structure before any cross-step test is run.
- Phase 3 can begin as soon as Phase 2's English template is finalized; the language scorecard templates are independent of translated workflow prose and can be created before Phase 4 starts.
- Phases 3 and 4 have an internal dependency per language: each language's scorecard template must exist before that language's workflow is tested end-to-end; but the three languages can be parallelized within each phase.
- Phase 5 is a single-file update with no creative work; it executes immediately when the English source commit hash is known.

### Research Flags

Phases needing explicit plan decisions before execution:

- **Phase 1:** The structural definition of "non-blocking awareness" must be resolved in the plan as acceptance criteria before any prose is written. It is a UX framing decision, not a technical one, and getting it wrong produces the worst-scoring pitfall. Acceptance criteria: count turns added to Step 1, confirm absence of lock phrasing, confirm absence of banner updates.
- **Phase 2:** The Pain to Validate integration decision — absorb into Matrix 3 (Option A) versus add as a combined fifth matrix (Option B) — must be an explicit plan decision with documented rationale. PITFALLS.md is clear that this cannot be deferred to execution.
- **Phase 3:** The 5PM terminology register is a required research deliverable that does not exist yet. It must be produced as a pre-phase artifact before translation work begins.

Phases with well-established patterns (standard execution, reduced planning overhead):

- **Phase 4 (language workflows):** The workflow section change pattern is well-documented by the v1.1 FR/JA/PT translation work. Once the English source is stable and the terminology register is in hand, the process is mechanical application of a known diff.
- **Phase 5 (TRANSLATION-SYNC.md):** Single-file update with a known pattern from v1.1; no research or design decisions required.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | No new technologies; all patterns verified against the live 1,268-line workflow in production; all six 5PM dimensions map to existing rendering primitives |
| Features | HIGH | 5PM framework dimensions sourced from official Episode 628 transcript and official PDF; integration behavior derived from direct analysis of the live workflow; one MEDIUM item (B2A tier WTP range) flagged below |
| Architecture | HIGH | Section insertion map derived from direct read of the live workflow; all section names and positions confirmed; dependency ordering verified against the existing DISCARD RULE logic and TRANSLATION-SYNC.md conventions |
| Pitfalls | HIGH | All pitfalls derived from direct inspection of v1.0 workflow source, v1.1 RETROSPECTIVE.md lessons, and v1.2 scope decisions in PROJECT.md — no generic startup advice; specific prevention steps defined per pitfall |

**Overall confidence:** HIGH

### Gaps to Address

- **5PM signal vocabulary:** Walling explicitly states there is no official scoring rubric. The v1.2 integration must define a consistent signal system (FAVORABLE / CAUTION / UNFAVORABLE at the summary level; dimension-specific tiers per lens). This is a design decision, not a research gap — but it must be resolved in the Phase 2 plan before any scorecard template prose is written, and the vocabulary must be consistent between the workflow sections and the template.

- **B2A tier definition (MEDIUM confidence):** The B2A (aspirational buyer — photographers, podcasters, side-hustlers) tier definition and the approximate WTP range ($20-100/mo) is sourced from the podcast transcript rather than the official PDF. Verify the exact B2A definition and boundary conditions against the official PDF before implementing the section_purchaser questions.

- **5PM terminology register for FR/JA/PT:** Does not exist. Required before Phase 3 begins. Must include an explicit decision per framework-specific term (Pain to Validate, Purchaser, Product/Founder Fit, B2C/B2A/B2B/B2E) on whether to use a loan word, translate the concept, or use an explanatory phrase. Japanese context specifically favors katakana loan words for startup methodology terms; French and Portuguese require case-by-case judgment.

---

## Sources

### Primary (HIGH confidence)
- Rob Walling, "The 5 PM Pre-Validation Framework," Episode 628, Startups for the Rest of Us (May 2024): https://www.startupsfortherestofus.com/episodes/episode-628-the-5-pm-pre-validation-framework — 5PM dimensions, ordering, "not a point-based scoring system" design decision, B2C/B2A/B2B/B2E purchaser hierarchy
- "The 5 P.M. Idea Evaluation Framework" official PDF worksheet: https://www.startupsfortherestofus.com/wp-content/uploads/The-5-PM-Idea-Evaluation-Framework.pdf — authoritative framework structure and dimension definitions
- Direct read of `get-your-shit-together/workflows/foundation-sprint.md` (1,268 lines, 22 named sections) — all integration points, section sequencing, banner rules, DISCARD RULE cascade, write-output architecture, and existing ASCII grid format
- Direct read of existing output templates: HYPOTHESIS.md, SPRINT.md, POSITIONING.md, COMPETITORS.md — zero-placeholder rule, HTML comment header convention, GFM table structure
- Direct read of TRANSLATION-SYNC.md — current language sync record state and update requirements
- Direct read of PROJECT.md — v1.2 scope decisions including "non-blocking awareness questions" and "translate to FR, JA, PT"
- Direct read of .planning/RETROSPECTIVE.md — v1.0 and v1.1 lessons applied to v1.2 scope

### Secondary (MEDIUM confidence)
- Medium summary by Mica Linscheid: https://medium.com/@micalinscheid/5pm-framework-for-saas-success-from-rob-walling-a-guide-to-building-your-product-ff2a5a65650d — supplementary 5PM summary (primary source takes precedence)

### Tertiary (LOW confidence — validate before implementation)
- B2C/B2A/B2B/B2E WTP range estimates (podcast transcript): approximate price ranges per tier — verify the B2A tier boundary and WTP range against the official PDF before implementing section_purchaser questions

---
*Research completed: 2026-03-22*
*Ready for roadmap: yes*
