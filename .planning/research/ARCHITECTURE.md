# Architecture Research

**Domain:** 5PM framework integration into existing 22-section Foundation Sprint workflow
**Researched:** 2026-03-22
**Confidence:** HIGH — based on direct inspection of the live workflow, templates, TRANSLATION-SYNC.md, and the full 5PM framework specification from Rob Walling's Episode 628 / official PDF

---

## Context: What Exists vs. What Changes

This document focuses exclusively on how the 5PM Idea Evaluation Framework integrates with the
existing 22-section architecture. It does not repeat the v1.1 routing or language-switching
architecture (covered in the 2026-03-08 ARCHITECTURE.md). That architecture is unchanged.

### Existing Section Map (22 named sections)

```
Step 1: The Basics
  section_customer           — customer segment lock
  section_problem            — core problem + RESEARCH-03 validation
  section_advantages         — Capacity / Insight / Motivation
  section_competitors        — user-named competitors
  section_competitors_research — gyst-researcher Task invocation
  section_main_adversary     — main adversary selection
  write_competitors_md       — COMPETITORS.md written (OUTPUT-04)
  navigation_controls        — advance / revisit / restart Step 1

Step 2: Differentiation
  section_axis_rating        — 8-axis dream company rating
  section_custom_axes        — domain-specific axes (optional)
  section_axis_selection     — 2 differentiating axes chosen
  section_competitor_scoring — RESEARCH-02, COMPETITORS.md read-only
  section_matrix_render      — 2x2 matrix + conflict check
  section_manifesto          — mini-manifesto (3 phrases)
  section_step2_navigation   — advance / revisit Step 2

Step 3: Approaches
  section_context_reload     — Capacity + Insight recap
  section_approach_generation — A1–A4 generated
  section_approach_evaluation — 4-matrix evaluation (SPRINT-13)
  section_approach_recommendation — global pattern recommendation

Step 4: Final Hypothesis
  section_hypothesis         — hypothesis formulation + lock
  section_testable_form      — 4 testable components
  section_write_outputs      — HYPOTHESIS.md + SPRINT.md + POSITIONING.md written
```

---

## 5PM Framework Dimension Map

The 5PM framework has 6 evaluation lenses (5P + Pain to Validate):

| Dimension | Core Questions | Sprint Step |
|-----------|---------------|-------------|
| **Problem** | Important? Urgent? (2x2 matrix) | Step 1 — after problem lock |
| **Purchaser** | Tech adoption? Willingness to pay? B2C/B2A/B2B/B2E? | Step 1 — after customer lock |
| **Pricing Model** | Subscription? ARPA? Monthly/annual? | Step 1 — standalone section |
| **Market** | Total reachable size? Growth stage? Reach? | Step 1 — with web research |
| **Product/Founder Fit** | Background access? Technical chops? Unique advantage? Passion? | Step 3 — confrontation at approach selection |
| **Pain to Validate** | Conversation validation ease? MVP feasibility? | Step 3 — per-approach at evaluation |

Confidence: HIGH (sourced from official 5PM PDF + Episode 628 transcript)

---

## Integration Architecture: New vs. Modified Sections

### New Sections Required (6 new named sections)

These sections do not exist in the current workflow. They must be added as `<section name="...">` blocks.

**1. `section_problem_importance` — Problem: Important/Urgent 2x2**

- Placement: immediately after `section_problem` closes (before `section_advantages`)
- Step 1, position 2.5 (between problem lock and advantages)
- What it does: presents the Important × Urgent 2x2 matrix, user places their problem on it, AI confirms placement, result locked to session context
- New: YES — no equivalent exists

**2. `section_purchaser` — Purchaser Awareness**

- Placement: immediately after `section_customer` closes and before `section_problem`
- Step 1, position 1.5 (between customer lock and problem)
- Rationale: purchaser characteristics are tightly coupled to customer segment, not problem. Knowing B2B vs. B2C and tech adoption tier before problem framing informs the problem validation RESEARCH-03 query that already runs in `section_problem`.
- What it does: 3 sub-questions — (1) tech adoption tendency, (2) willingness and ability to pay, (3) buyer category (B2C/B2A/B2B/B2E). Results locked to session.
- New: YES — no equivalent exists

**3. `section_pricing_model` — Pricing Model Questions**

- Placement: after `section_problem_importance`, before `section_advantages`
- Step 1, position 2.75
- What it does: subscription viability, estimated ARPA, billing cadence preference. Results locked to session.
- New: YES — no equivalent exists

**4. `section_market_sizing` — Market Sizing and Growth**

- Placement: after `section_pricing_model`, before `section_advantages`
- Step 1, position 2.9
- What it does: AI runs inline WebSearch to estimate total reachable market and growth stage, then asks founder for their perception. AI provides a numeric estimate range; founder confirms or corrects. Locked to session.
- New: YES — no equivalent exists. This is a new web search call within Step 1 (distinct from RESEARCH-03 in `section_problem` and RESEARCH-01/RESEARCH-02 in competitor research).

**5. `section_founder_fit` — Product/Founder Fit Confrontation**

- Placement: after `section_approach_generation`, before `section_approach_evaluation`
- Step 3, position between approach list finalization and 4-matrix evaluation
- What it does: for the finalized approach list, confronts the founder on (1) background access to this market, (2) technical or distribution chops, (3) unique advantage or audience, (4) genuine care. Not a disqualifier — surfaces risks the evaluation matrices will reflect.
- New: YES — `section_context_reload` surfaces Capacity + Insight passively, but does not ask the 4 confrontational Fit questions actively.

**6. `section_pain_to_validate` — Pain to Validate Matrix per Approach**

- Placement: within `section_approach_evaluation`, as a 5th matrix shown after Matrix 4 (Growth Vision)
- Step 3, position appended to the 4-matrix evaluation sequence
- What it does: adds a 5th matrix to the existing 4-matrix evaluation loop — Axes: Ease to validate via conversations (Hard → Easy) × MVP feasibility (Complex → Simple). Each approach placed.
- New: YES as a named sub-section or explicitly labeled Matrix 5 within `section_approach_evaluation`. Implementation choice: add it as a labeled **Matrix 5** block within `section_approach_evaluation` (consistent with existing SPRINT-13 pattern) rather than a separate `<section>` tag. This avoids splitting the evaluation flow mid-loop.

### Modified Sections (4 sections require changes)

**1. `section_write_outputs` — adds 5PM Scorecard**

- Change type: ADD new file write
- The `section_write_outputs` section is the ONLY location where output files are written (enforced by the "OUTPUT-01/02/03 zero-placeholder rule"). Adding `5PM-SCORECARD.md` must happen here, not earlier.
- What changes: add step 4 — "Write 5PM-SCORECARD.md" — after the existing 3-file write sequence. Read `@~/.claude/get-your-shit-together/templates/5PM-SCORECARD.md` for structure, then write `./5PM-SCORECARD.md` with all 6 dimension scores populated from session locks.
- No change to the existing 3-file write sequence.

**2. `section_problem` — banner update**

- Change type: MINOR — banner must include the new Step 1 sections in the DISCARD rule cascade
- The navigation_controls DISCARD RULE already handles going back to Problem (wipes Advantages + Competitors). With new sections after problem, going back to problem also discards: `section_problem_importance`, `section_purchaser` (if placed before problem — see placement discussion below), `section_pricing_model`, `section_market_sizing`.
- No change to the problem question/lock logic itself.

**3. `navigation_controls` — DISCARD RULE cascade update**

- Change type: MODIFY — the cascade must include new sections
- Current cascade:
  - Back to Customer → wipe Problem, Advantages, Competitors
  - Back to Problem → wipe Advantages, Competitors
  - Back to Advantages → wipe Competitors
  - Back to Competitors → wipe only competitor selection
- Updated cascade adds 5PM sections as ordered elements:
  - Back to Customer → wipe Purchaser (new), Problem, Problem Importance (new), Pricing Model (new), Market Sizing (new), Advantages, Competitors
  - Back to Purchaser (new) → wipe Problem, Problem Importance (new), Pricing Model (new), Market Sizing (new), Advantages, Competitors
  - Back to Problem → wipe Problem Importance (new), Pricing Model (new), Market Sizing (new), Advantages, Competitors
  - Back to Advantages → wipe Competitors (unchanged)
  - Back to Competitors → wipe only competitor selection (unchanged)

**4. `step1_banner` — display update**

- Change type: MODIFY — banner may need a 5PM summary row or the navigation_controls "revisit" menu needs new entries
- Minimal change: the existing 4-row banner (Customer, Problem, Advantages, Competitors) is not changed. A separate "5PM lens status" block shown after the banner during Step 1 reviews is cleaner than adding 4 new rows to the banner.
- Alternative: keep banner as-is, show 5PM dimension locks only in navigation_controls revisit summary.
- Recommendation: do NOT expand the banner. Keep it 4-row (existing behavior preserved). New dimensions are visible in the 5PM Scorecard only, not in the step banner. This avoids banner bloat.

---

## Section Insertion Map

```
STEP 1: The Basics (revised sequence)
  section_customer                      [EXISTING — unchanged]
  section_purchaser                     [NEW — inserted here]
  section_problem                       [EXISTING — minor cascade update]
  section_problem_importance            [NEW — inserted here]
  section_pricing_model                 [NEW — inserted here]
  section_market_sizing                 [NEW — inserted here]
  section_advantages                    [EXISTING — unchanged]
  section_competitors                   [EXISTING — unchanged]
  section_competitors_research          [EXISTING — unchanged]
  section_main_adversary                [EXISTING — unchanged]
  write_competitors_md                  [EXISTING — unchanged]
  navigation_controls                   [EXISTING — MODIFIED cascade]

STEP 2: Differentiation (unchanged)
  section_axis_rating                   [EXISTING — unchanged]
  section_custom_axes                   [EXISTING — unchanged]
  section_axis_selection                [EXISTING — unchanged]
  section_competitor_scoring            [EXISTING — unchanged]
  section_matrix_render                 [EXISTING — unchanged]
  section_manifesto                     [EXISTING — unchanged]
  section_step2_navigation              [EXISTING — unchanged]

STEP 3: Approaches (revised sequence)
  section_context_reload                [EXISTING — unchanged]
  section_approach_generation           [EXISTING — unchanged]
  section_founder_fit                   [NEW — inserted here]
  section_approach_evaluation           [EXISTING — MODIFIED: adds Matrix 5]
  section_approach_recommendation       [EXISTING — unchanged]

STEP 4: Final Hypothesis (revised)
  section_hypothesis                    [EXISTING — unchanged]
  section_testable_form                 [EXISTING — unchanged]
  section_write_outputs                 [EXISTING — MODIFIED: adds 5PM-SCORECARD.md write]
```

Total sections after v1.2: 28 named sections (22 existing + 6 new)

---

## Placement Rationale for Each New Section

### Why `section_purchaser` before `section_problem`

The problem validation search in `section_problem` (RESEARCH-03) queries: `"[customer segment] [problem] pain points"`. Knowing that the purchaser is B2B enterprise vs. B2C consumer changes what evidence counts as valid. A B2B purchaser who is tech-averse invalidates many problem-solution approaches even if the pain is real. Locking Purchaser first means the problem validation can factor in buyer behavior.

### Why `section_problem_importance` after problem lock (not during)

The Important/Urgent matrix requires a locked problem statement to evaluate. It cannot run before the problem is locked. Placing it immediately after the problem lock treats it as a validation lens on the locked problem rather than a pre-condition.

### Why `section_pricing_model` before `section_advantages`

Pricing model questions are market-level (subscription viability, ARPA estimates) rather than founder-level. They do not depend on Capacity/Insight/Motivation and do not need to follow Advantages. They do need a locked problem and customer to estimate ARPA, so they go after problem_importance.

### Why `section_market_sizing` before `section_advantages`

Market sizing requires an inline WebSearch. Completing all web research (problem validation, market sizing) before the founder advantage conversation keeps the research block contiguous in Step 1 and separates it from the personal/qualitative Advantages section. This mirrors the existing pattern: RESEARCH-03 runs within `section_problem` before Advantages.

### Why `section_founder_fit` after approach generation and before 4-matrix evaluation

The 5PM framework's Product/Founder Fit confrontation is specifically about whether the founder can execute on a given approach. This requires an approach list (A1–A4) to exist. Placing it after `section_approach_generation` (when approaches are finalized) and before `section_approach_evaluation` means the Fit discussion informs how the founder reads the Pragmatic Vision matrix (which evaluates ease-to-build given Capacity). The `section_context_reload` earlier in Step 3 surfaces Capacity + Insight passively; `section_founder_fit` is the active confrontation.

### Why Pain to Validate is Matrix 5 (not a separate `<section>`)

The existing 4-matrix evaluation in `section_approach_evaluation` uses a sequential "show one, wait for next" pattern (SPRINT-13). Adding a 5th matrix to this loop is the minimal-diff change. Creating a separate `<section name="section_pain_to_validate">` would introduce a section boundary mid-evaluation-loop and require updating SPRINT.md's Step 3 template to account for the split. Matrix 5 within the existing section is less disruptive and keeps the evaluation as one coherent block.

---

## 5PM Scorecard Output File

### File: `5PM-SCORECARD.md`

The scorecard is a new output file parallel to HYPOTHESIS.md, SPRINT.md, and POSITIONING.md. It follows the same zero-placeholder rule: no square brackets in the final output.

**Template location:** `~/.claude/get-your-shit-together/templates/5PM-SCORECARD.md` (new)

**Write location:** `section_write_outputs` — step 4 of the output write sequence (after POSITIONING.md)

**Content structure:**

```
5PM-SCORECARD.md
  Sprint date
  Idea name / hypothesis summary (one line)

  Problem
    Important? [Yes/No/Maybe + rationale]
    Urgent? [Yes/No/Maybe + rationale]
    Matrix placement: [quadrant]

  Purchaser
    Tech adoption: [early adopter / mainstream / laggard]
    Willingness to pay: [high / medium / low + rationale]
    Buyer category: [B2C / B2A / B2B / B2E]

  Pricing Model
    Subscription viability: [Yes/No + rationale]
    Estimated ARPA: [$X/month]
    Billing cadence: [monthly / annual / other]

  Market
    Estimated reachable market: [$X–$Y range]
    Growth stage: [early / mid / mature / growing / flat / declining]
    Founder perception: [quote or paraphrase from session]

  Product/Founder Fit
    Background access: [Yes/No + detail]
    Technical/distribution chops: [strong / partial / gap + detail]
    Unique advantage or audience: [description or "none identified"]
    Genuine care: [Yes/No + rationale]

  Pain to Validate
    Conversation validation ease: [easy / moderate / hard]
    MVP feasibility: [simple / moderate / complex]
    Fastest validation path: [from section_testable_form]

  Overall assessment (AI-generated, 2-3 sentences synthesizing all 6 dimensions)
```

### Scorecard Data Flow

Every field in the scorecard is sourced from a locked session value. No new questions are asked at `section_write_outputs` time. The AI synthesizes from context that exists at that point.

```
section_purchaser       → Purchaser block
section_problem         → Problem block (problem statement)
section_problem_importance → Problem block (matrix placement)
section_pricing_model   → Pricing Model block
section_market_sizing   → Market block
section_founder_fit     → Product/Founder Fit block
section_approach_evaluation (Matrix 5) → Pain to Validate block
section_testable_form   → Pain to Validate "fastest validation path"
section_hypothesis      → "Idea name / hypothesis summary" header
```

No scorecard field requires information that was not locked in an earlier section. The write is pure assembly.

---

## Market Research Integration Pattern

The `section_market_sizing` section introduces a second inline WebSearch in Step 1. The existing pattern for inline search is established in `section_problem` (RESEARCH-03). The new section follows the same pattern:

**Existing RESEARCH-03 pattern (in `section_problem`):**
1. Run WebSearch with constructed query
2. Evaluate evidence (strong / weak)
3. Present finding to user with one-sentence summary
4. Ask user to confirm or override

**New market sizing pattern (in `section_market_sizing`):**
1. Run WebSearch with market-scoped query: `"[customer segment] [problem] market size"` or `"[customer segment] software market TAM"`
2. Synthesize a reachable market estimate range (not TAM — reachable market for a bootstrapped SaaS)
3. State growth stage based on search evidence (early / growing / mature / declining)
4. Present to user: "Based on my research, the reachable market appears to be [range]. Market appears to be [stage]. Does this match your sense of it?"
5. User confirms or corrects — accept their answer unconditionally (founders may have inside knowledge)
6. Lock: AI estimate range + growth stage + founder perception note

**Query construction rule:** Use locked customer segment and locked problem statement (available at this point in the flow). Do not construct a query before both are locked.

**RESEARCH-02 rule preserved:** `section_competitor_scoring` already has a hard "no web searches" rule. The new `section_market_sizing` search is in Step 1 only and does not affect the Step 2 scoring rule.

---

## Language Workflow Impact

The 5PM changes affect the English workflow first, then propagate to translations.

### Files Touched

| File | Change Type | Notes |
|------|-------------|-------|
| `workflows/foundation-sprint.md` | MODIFIED | 6 new sections inserted, 4 existing sections modified |
| `templates/5PM-SCORECARD.md` | NEW | English scorecard template |
| `templates/fr/5PM-SCORECARD.md` | NEW | French scorecard template |
| `templates/ja/5PM-SCORECARD.md` | NEW | Japanese scorecard template |
| `templates/pt/5PM-SCORECARD.md` | NEW | Portuguese scorecard template |
| `workflows/foundation-sprint-french.md` | MODIFIED | Mirror all 10 section changes |
| `workflows/foundation-sprint-japanese.md` | MODIFIED | Mirror all 10 section changes |
| `workflows/foundation-sprint-portuguese.md` | MODIFIED | Mirror all 10 section changes |
| `TRANSLATION-SYNC.md` | MODIFIED | Update commit hash for all 3 languages |

Files NOT touched: command file, gyst-researcher agent, English non-scorecard templates, Spanish, German, Chinese workflows (these are out of scope per PROJECT.md Active requirements).

### Translation Dependency Order

```
1. English workflow updated (all 10 changes)
2. English 5PM-SCORECARD.md template created
3. Test English end-to-end
4. Create templates/fr/5PM-SCORECARD.md, templates/ja/5PM-SCORECARD.md, templates/pt/5PM-SCORECARD.md
5. Apply all 10 changes to foundation-sprint-french.md
6. Apply all 10 changes to foundation-sprint-japanese.md
7. Apply all 10 changes to foundation-sprint-portuguese.md
8. Update TRANSLATION-SYNC.md with new English source commit hash for all 3 languages
```

Step 1 and 2 must complete before steps 3–8 can begin. Steps 4–7 are parallelizable within their own constraint (template before workflow for each language).

---

## Build Order for v1.2 Integration Phases

This order is driven by three dependency rules:
- English workflow must be correct before translations begin
- Templates must exist before workflows that @-include them
- `section_write_outputs` writes 5PM-SCORECARD.md, so the template must exist before testing the end-to-end flow

### Phase 1: English Workflow Core (5PM sections in Step 1)

Add to `foundation-sprint.md`:
1. `section_purchaser` — new, after `section_customer`
2. `section_problem_importance` — new, after `section_problem`
3. `section_pricing_model` — new, after `section_problem_importance`
4. `section_market_sizing` — new, after `section_pricing_model`
5. `navigation_controls` — modify DISCARD RULE cascade

These 5 changes are Step 1 only. They can be written, reviewed, and tested before touching Step 3.

### Phase 2: English Workflow Core (5PM sections in Step 3 + output)

Add to `foundation-sprint.md`:
6. `section_founder_fit` — new, after `section_approach_generation`
7. `section_approach_evaluation` — modify to add Matrix 5 (Pain to Validate)
8. `section_write_outputs` — modify to add `5PM-SCORECARD.md` write step

Create:
9. `templates/5PM-SCORECARD.md` — new English template

Phases 1 and 2 together complete the English workflow. Phase 2 depends on Phase 1 being complete (the DISCARD RULE in navigation_controls must already include the new Step 1 sections before Step 3 changes are tested in a full run).

### Phase 3: Translation — Scorecard Templates

Create (can run parallel to each other):
- `templates/fr/5PM-SCORECARD.md`
- `templates/ja/5PM-SCORECARD.md`
- `templates/pt/5PM-SCORECARD.md`

These are reference files for workflow @-includes. They must exist before the translated workflows can complete a full end-to-end run.

### Phase 4: Translation — Language Workflows

Apply all 10 section changes to each language workflow. Can run parallel per language:
- `foundation-sprint-french.md`
- `foundation-sprint-japanese.md`
- `foundation-sprint-portuguese.md`

### Phase 5: TRANSLATION-SYNC.md Update

Update commit hash entries for all 3 languages after the English source commit is tagged.

---

## Component Boundaries: What Changes vs. What Does Not

### Unchanged Components

| Component | Why Unchanged |
|-----------|---------------|
| Command file routing logic | 5PM is a workflow-level change, not a routing-level change |
| gyst-researcher agent | Still invoked with same brief (customer + problem + user-named competitors) |
| COMPETITORS.md template | No new competitor profile fields needed |
| HYPOTHESIS.md template | Hypothesis structure is unchanged |
| SPRINT.md template | Step 3 evaluation table may need a Matrix 5 row — see note below |
| POSITIONING.md template | No change — 2x2 matrix and manifesto are unchanged |
| `section_competitor_scoring` | No-web-search rule preserved |
| Step 2 sections (all 7) | 5PM does not touch differentiation |
| Step 4 hypothesis/testable form sections | 5PM Scorecard written separately from hypothesis |

Note on SPRINT.md template: the 4-matrix evaluation table has a row per matrix. Adding Matrix 5 means adding one row to that table. This is a minor template change, not a structural change to the template.

### New Component: 5PM-SCORECARD.md Template

The template must define all 6 dimension sections with placeholder fields that match what the workflow will populate. It follows the zero-placeholder rule: the workflow replaces every `[...]` before writing. The template itself uses `[...]` as the fill pattern (same as all existing templates).

---

## Anti-Patterns to Avoid in This Integration

### Anti-Pattern 1: Writing Scorecard Data Before `section_write_outputs`

**What would go wrong:** If any 5PM section writes partial scorecard content to a file mid-sprint, it violates the zero-placeholder rule (the file would have unfilled fields because later sections haven't run yet). It would also create partial file corruption if the user backs up and re-runs a section.

**Do this instead:** All 5PM section results are locked to session context only. The scorecard file is assembled and written once, at `section_write_outputs`, from context that is complete at that point.

### Anti-Pattern 2: Expanding the Step 1 Banner to Include 5PM Dimensions

**What would go wrong:** The banner would grow from 4 rows to 8+ rows. Every existing banner render instruction in all 7 language workflows would need updating. The banner would overflow visually at ~42 chars width.

**Do this instead:** Keep the Step 1 banner at 4 rows (unchanged). 5PM dimension status is visible only in the final 5PM-SCORECARD.md output, not in the interactive banner.

### Anti-Pattern 3: Making `section_founder_fit` a Blocking Disqualifier

**What would go wrong:** If the workflow rejects approaches based on low Fit scores, it overrides the founder's judgment. The 5PM framework explicitly states "all criteria are data points — no single factor is an absolute deal-breaker." Blocking would break trust and lose the session value.

**Do this instead:** `section_founder_fit` is a confrontational discussion that surfaces risks. The AI presents what it finds; the user decides to continue. The risks surface again in Matrix 3 (Pragmatic Vision) via the ease-to-build scoring that already references Capacity.

### Anti-Pattern 4: Running Market Sizing Search in `section_competitor_scoring`

**What would go wrong:** `section_competitor_scoring` has a hard "no web searches" rule (RESEARCH-02). Running market sizing there would contaminate the scoring evidence with fresh search data, undermining the rule that competitor scores derive only from COMPETITORS.md profiles.

**Do this instead:** Market sizing search runs exclusively in `section_market_sizing` in Step 1. By the time `section_competitor_scoring` runs in Step 2, market data is already locked.

### Anti-Pattern 5: Separate 5PM Dimension Files Per Dimension

**What would go wrong:** Writing intermediate files (e.g., `PROBLEM-SCORE.md`, `PURCHASER-SCORE.md`) per dimension creates file proliferation in the user's project directory and creates the partial-write problem described in Anti-Pattern 1.

**Do this instead:** One file (`5PM-SCORECARD.md`), written once, at sprint end.

---

## Data Flow: 5PM Through the Sprint

```
section_customer → [customer segment locked]
                         |
                         v
section_purchaser → [tech adoption, willingness-to-pay, B2C/B2A/B2B/B2E locked]
                         |
                         v
section_problem → [problem locked]
                         |
                         | (RESEARCH-03 inline search uses customer + problem)
                         v
section_problem_importance → [Important/Urgent quadrant locked]
                         |
                         v
section_pricing_model → [subscription Y/N, ARPA estimate, cadence locked]
                         |
                         v
section_market_sizing → [market size range, growth stage, founder perception locked]
                         |
                         | (inline WebSearch: "[customer] [problem] market size")
                         v
section_advantages → [Capacity, Insight, Motivation locked — unchanged]
                         |
                         ... [Steps 2, 3 approach generation unchanged]
                         |
                         v
section_approach_generation → [A1–A4 finalized]
                         |
                         v
section_founder_fit → [Background access, Chops, Unique advantage, Care — discussed]
                         |
                         v
section_approach_evaluation → [4 matrices + Matrix 5 (Pain to Validate) shown]
                         |
                         v
section_approach_recommendation → [chosen approach locked]
                         |
                         ... [Step 4 hypothesis / testable form unchanged]
                         |
                         v
section_write_outputs → [HYPOTHESIS.md, SPRINT.md, POSITIONING.md, 5PM-SCORECARD.md written]
                         (5PM-SCORECARD.md assembled from all locked 5PM context above)
```

---

## Sources

- Existing workflow read directly: `get-your-shit-together/workflows/foundation-sprint.md` (1,268 lines, 22 named sections confirmed)
- Existing templates read directly: `templates/HYPOTHESIS.md`, `templates/SPRINT.md`
- TRANSLATION-SYNC.md read directly: confirmed 6 language workflow files, 22-section parity rule, `* MAIN ADVERSARY` preservation rule
- PROJECT.md read directly: v1.2 target features confirmed (8 active requirements)
- Rob Walling 5PM Framework: Episode 628 "Startups For The Rest of Us" (May 2024) — https://www.startupsfortherestofus.com/episodes/episode-628-the-5-pm-pre-validation-framework
- 5PM framework dimension details: sourced from episode transcript via WebFetch (HIGH confidence — official source, current)

---
*Architecture research for: GYST v1.2 — 5PM Framework Integration*
*Researched: 2026-03-22*
