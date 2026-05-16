# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

---

## Milestone: v1.0 — Foundation Sprint

**Shipped:** 2026-02-28
**Phases:** 4 | **Plans:** 8 | **Timeline:** 3 days (2026-02-25 → 2026-02-27)

### What Was Built

- npm installer (`bin/install.js`) with TTY detection for interactive and npx-pipe install modes
- Full Step 1 elicitation workflow — customer segment, problem validation (inline web search), founder advantages (Capacity/Insight/Motivation with explicit rejection criteria), competitor name collection
- `gyst-researcher` sub-agent: structured competitor research producing COMPETITORS.md (max 5 competitors, main adversary flagged), fixing the list for the entire session
- Step 2 differentiation: 8 standard bipolar axes, optional custom axes, user-selected differentiating pair, competitor scoring from COMPETITORS.md only (no re-search), ASCII 2x2 matrix, conflict hard-block, 3-phrase mini-manifesto
- Step 3 approaches: user-first A1 probe, INTERNAL FILTER (silent exclusion of approaches that violate Capacity/Insight/axis constraints), 4-matrix sequential ASCII evaluation (Customer/Money/Pragmatic/Growth Vision), AI recommendation with unconditional user override
- Step 4: hypothesis pre-fill from session context, explicit-lock enforcement (no casual "yes"), auto-derived testable form (4 components), single output-location write rule for all 3 files

### What Worked

- **Workflow-first architecture** — pure markdown + agents proved sufficient for a linear single-session wizard; no binary tooling needed
- **Section-by-section plan execution** — each plan added contiguous sections to the workflow file; the seam pattern (e.g., research handoff comment, `step2_stub`, `step3_stub`) made integration between phases mechanical and error-free
- **Explicit constraint rules in workflow prose** — writing enforcement rules directly into workflow text (e.g., "INTERNAL FILTER", "explicit lock required", "WebSearch PROHIBITED") produced reliable behavior without code
- **Audit before archival** — running `/gsd:audit-milestone` before `/gsd:complete-milestone` surfaced all tech debt upfront and gave a clean 35/35 result; no surprises at archival
- **Phase scope discipline** — Step 1 in Phase 2, Step 2 in Phase 3, Steps 3-4 together in Phase 4 matched the sprint's natural dependency structure

### What Was Inefficient

- **Traceability table not updated during execution** — INFRA-03 through INFRA-06 remained `[ ]` in REQUIREMENTS.md traceability despite being satisfied by Phases 2-4; required a separate cleanup commit
- **SUMMARY frontmatter not standardized early** — `requirements-completed` field not present in Phase 1 summaries (predated adoption); required a retroactive fix commit
- **Stale planning note left in production file** — `section_axis_selection` line 667 had `(implemented in Plan 03-02)` comment that survived to production; caught by audit, required dedicated fix commit
- **Tasks count at 0** — GSD task tracking wasn't wired into this project's execution; velocity was tracked manually in STATE.md instead

### Patterns Established

- **Seam-based phase integration** — each phase ends with a named stub (`step2_stub`, `step3_stub`) that the next phase replaces; stubs verify gracefully rather than error
- **COMPETITORS.md as session-fixed source of truth** — written once at end of Step 1, read-only in Step 2; prevents research drift across steps
- **Explicit lock language pattern** — for high-stakes decisions (hypothesis), use explicit trigger words and explicitly reject "yes"/"looks good"; reduces premature lock
- **INTERNAL FILTER pattern** — AI silently removes candidates that fail hard constraints before presentation; keeps user-facing flow clean without exposing filter logic
- **Single output location rule** — designate one section as the sole write location for output files; prevents partial writes from earlier sections leaking

### Key Lessons

1. **Stub → fill is the right integration pattern for multi-phase workflow files** — it makes each phase's boundary explicit and the integration trivially verifiable (check that stub is absent from production file)
2. **Write enforcement rules as prose in the workflow, not comments** — "AI MUST NOT", "PROHIBITED", "unconditional" written into workflow text propagates reliably through Claude's instruction-following
3. **Traceability hygiene should be a per-plan step, not a milestone-end task** — requires explicit reminder in plan template or executor discipline
4. **Behavioral requirements need live-session verification** — static audit can verify structure but cannot verify one-pushback enforcement, DISCARD RULE compliance, INTERNAL FILTER silence, etc.; document these as deferred to human UAT
5. **3-day build time for a 1,268-line workflow at ~12 min/plan is sustainable velocity** — plan-level granularity kept context manageable and produced consistent output quality

### Cost Observations

- Model mix: ~100% sonnet (balanced profile throughout)
- Sessions: ~6-8 sessions across 3 days
- Notable: No opus needed for this milestone — single-session wizard logic was straightforward enough for sonnet throughout; haiku was used for sub-agents (gyst-researcher)

---

## Milestone: v1.1 — Multilingual Foundation Sprint

**Shipped:** 2026-03-08
**Phases:** 3 | **Plans:** 4 | **Timeline:** 1 day (2026-03-08)

### What Was Built

- `$ARGUMENTS`-based language routing in `foundation-sprint.md` command file — three-branch natural-language dispatch (English default, French via `-french`, unsupported-flag fallback); deployed to both repo source and installed `~/.claude/` location
- Four French output templates at `templates/fr/` (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) — all user-facing text in French, `* MAIN ADVERSARY` preserved verbatim, canonical bipolar axis translations locked (Lent/Rapide, Difficile/Facile, Cher/Gratuit, Complexe/Simple, Basique/Intelligent, Cloisonné/Intégré, Manuel/Automatique, Étroit/Large)
- 1,291-line `foundation-sprint-french.md` — complete French standalone workflow with `<language_directive>` before `<objective>`, `<language_reinforcement>` blocks before `section_problem` and `section_competitors_research`, all 22 `name=` identifiers preserved, `templates/fr/` paths applied to all output templates, gyst-researcher Task brief kept in English by design
- `TRANSLATION-SYNC.md` at project root — records English source commit hash `97e468e` for future diff-based updates; flags 3 HIGH-complexity sections for native speaker review

### What Worked

- **`$ARGUMENTS`-based routing with no conditionals** — the routing instruction is natural-language prose Claude follows; no if/else, no code; extending to a new language is one new bullet point
- **Splitting translation across two plans at the Step 2/3 boundary** — kept each plan's context manageable (15 sections then 7); HIGH-complexity sections (approach_generation, manifesto) distributed rather than clustered
- **Human checkpoint in Phase 6** — verifying `* MAIN ADVERSARY` preservation and French heading correctness with a human gate before marking the plan done caught nothing (the executor got it right), but the gate structure gave confidence to proceed to Phase 7 without re-checking
- **STATE.md as canonical decision record** — all 7 axis label canonicals were stored in STATE.md after Phase 6 human approval; Phase 7 planner and executor consumed them directly without re-deriving

### What Was Inefficient

- **No milestone audit run before complete-milestone** — proceeded directly to completion without `/gsd:audit-milestone`; coverage was verifiable from VERIFICATION.md files but cross-phase integration was not formally checked
- **Section count discrepancy in LANG-05** — requirements said "20 sections" but the English source had 22 (two sections added in Phase 4 without updating LANG-05); caught by plan checker before execution, required a fix commit; should be caught at requirements-writing time
- **ROADMAP.md Phase 7 progress table had stale data** — Phase 6 row was malformatted at completion (column mismatch); required a manual fix during milestone archival
- **Phase directories had no CONTEXT.md** — all three phases used "continue without context"; small scope made this fine, but for Phase 7 especially, a discuss-phase session would have captured the `* MAIN ADVERSARY` constraint and gyst-researcher-stays-English decision upfront

### Patterns Established

- **Pre-translated workflow file per language** — full workflow translation in one standalone file; no runtime language injection; `language_directive` at top + `language_reinforcement` before high-drift sections
- **TRANSLATION-SYNC.md pattern** — records source commit hash at translation time; future English updates can be diffed against this hash to identify what needs syncing to French
- **Machine-readable marker preservation rule** — `* MAIN ADVERSARY` is the canonical example; any marker used for workflow parsing must be treated as code, not prose, and documented explicitly as untranslatable
- **gyst-researcher stays English-only** — sub-agent scope decision: surrounding French workflow produces French output despite English brief; documented as a permanent constraint

### Key Lessons

1. **Requirements counts go stale fast** — LANG-05's "20 sections" was stale within 1 phase; requirements that reference implementation-level counts should be verified against the source at planning time, not assumed from memory
2. **`$ARGUMENTS`-based routing is more extensible than flag parsing** — the routing prose can describe arbitrary logic (default, known flag, unknown flag) without any conditional logic; adding Spanish is literally one line
3. **Translation tasks benefit from a per-string catalogue in research** — Phase 6 researcher catalogued every translatable vs. preserve string before the plan was written; this made Task actions extremely specific and eliminated ambiguity at execution time
4. **Human checkpoints add value even when they pass** — the Phase 6 gate caught nothing wrong but produced a locked record of "these translations are approved"; downstream planning could reference this record without re-verifying
5. **1-day build for a 1,291-line translation at ~15min/plan is fast** — the research-to-execution pipeline works well for content authoring tasks, not just code

### Cost Observations

- Model mix: ~100% sonnet (balanced profile throughout)
- Sessions: 1 session (entire v1.1 built in a single day)
- Notable: Translation is faster than original authoring — research produced a complete string catalogue, planning was one-shot (1 revision), execution needed no retries

---

## Milestone: v1.3 — Need Intensity Framework

**Shipped:** 2026-05-17
**Phases:** 4 (12-15) | **Plans:** 7 | **Timeline:** 2 days (2026-05-16 → 2026-05-17)

### What Was Built

- README.md: dedicated 5PM Framework and Need Intensity sections — settled all tier labels, formula, and dimension terminology before workflow implementation (Phase 12)
- `section_need_intensity` in English workflow: 6-dimension 0-10 rating block, downward-only AI calibration via web search, formula computation with 5 business threshold tier labels, below-1000 advisory loop (max 5 iterations, AI re-rates all 6 dimensions, user picks reframe direction, never blocking) (Phase 13)
- `NEED-INTENSITY.md` scaffold template and OUTPUT-05 write block in `section_write_outputs` — competitor names from Need Intensity web search stored and passed to `section_competitors_research` with no duplicate search (Phase 13)
- All 6 language Foundation Sprint workflows (FR, ES, DE, ZH, PT, JA) translated with `section_need_intensity`, language-specific `NEED-INTENSITY.md` templates, OUTPUT-05 write blocks, and `navigation_controls` DISCARD RULE updates — 3 plans covering paired languages (FR+ES, DE+ZH, PT+JA) (Phase 14)
- `TRANSLATION-SYNC.md` updated with v1.3 English source commit hash `8d3861c3` for all 6 languages (Phase 15)

### What Worked

- **README-first terminology lock** — writing the Need Intensity section in README (Phase 12) before implementing in the workflow (Phase 13) eliminated terminology drift entirely; Phase 13 matched README exactly with zero corrections
- **Competitor data handoff via named field** — `need_intensity_competitors` stored during Need Intensity web search and passed directly to `section_competitors_research` brief; the COMPETITORS.md search did not re-run across any of the 7 language workflows
- **Paired-language plan structure for Phase 14** — covering 2 languages per plan (FR+ES, DE+ZH, PT+JA) kept context manageable while maximizing efficiency; each pair was structurally identical so one plan-check covered both
- **Scaffold-only template pattern** — NEED-INTENSITY.md templates contain zero assembly logic; consistent with 5PM-SCORECARD.md pattern established in v1.2; makes template creation a pure content task

### What Was Inefficient

- **Phase 15 not complete before running complete-milestone** — milestone completion was triggered before Phase 15 (TRANSLATION-SYNC.md update) was executed; required inline execution during the complete-milestone workflow; a simple readiness check would have caught this
- **ROADMAP Phase 13/14 plan checkboxes not updated** — plan rows in Phase Details section showed `[ ]` despite SUMMARY.md files existing for all plans; checkpoint disconnect between executor and roadmap
- **No milestone audit run** — proceeded directly to complete-milestone without `/gsd:audit-milestone`; acceptable for a documentation/translation milestone but not a pattern to repeat for logic-heavy milestones

### Patterns Established

- **README-first for framework additions** — when adding a scoring framework to a workflow, document it in README first (locking terminology), then implement; the README serves as the spec the workflow implementation must match
- **Advisory loop pattern** — non-blocking guidance loop with iteration guard, AI-owns re-rating, user-owns-direction, best-attempt fallback; reusable for any scoring section where the raw score may need refinement
- **All-languages-in-one-phase with paired plans** — for mature translation pipelines (where the pattern is established), covering all languages in one phase with 2-per-plan pairing is efficient and produces consistent quality

### Key Lessons

1. **Check all phases are complete before running complete-milestone** — Phase 15 was open; a simple pre-flight against SUMMARY.md existence for all phases would have surfaced this immediately
2. **Terminology-in-documentation-first is the correct dependency order** — "README (terminology lock) → workflow implementation" prevents all terminology drift with near-zero overhead
3. **Paired-language plans work when the translation pattern is mature** — FR+ES, DE+ZH, PT+JA each took ~25-33 min per plan; acceptable for a milestone where all 6 languages share identical structure
4. **Roadmap checkboxes need atomic maintenance** — plan completion and roadmap checkbox update should be one commit; deferred maintenance creates false incompleteness signals

### Cost Observations

- Model mix: ~100% sonnet (balanced profile throughout)
- Sessions: 2 sessions (2026-05-16 → 2026-05-17)
- Notable: Phase 14 translation plans averaged 30 min each (2 languages per plan) vs. 13 min avg for single-language plans in v1.1; the additional scope is roughly linear

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Process Change |
|-----------|--------|-------|-------------------|
| v1.0 | 4 | 8 | Initial build — established seam-based integration pattern |
| v1.1 | 3 | 4 | Translation milestone — established pre-translated workflow pattern and TRANSLATION-SYNC.md |
| v1.2 | 4 | 7 | Framework additions — 5PM lenses woven into existing workflow; introduced scaffold-only template pattern |
| v1.3 | 4 | 7 | Framework scoring — Need Intensity with calibration loop; README-first terminology lock; all-6-languages in one phase |

### Top Lessons (Verified Across Milestones)

1. Seam-based phase integration (stub → fill) scales cleanly for linear workflow files
2. Write enforcement as prose in workflow text, not code comments
3. Requirements that reference implementation counts go stale — verify counts at planning time
4. Research-produced string catalogues make translation tasks nearly error-free at execution
5. README-first terminology lock eliminates terminology drift when adding scoring frameworks
6. Verify all phases complete (SUMMARY.md exists) before running complete-milestone
