# Pitfalls Research

**Domain:** Adding 5PM Idea Evaluation Framework to existing Foundation Sprint workflow (GYST v1.2)
**Researched:** 2026-03-22
**Confidence:** HIGH (all pitfalls derived from direct inspection of the v1.0 workflow source, v1.1 retrospective, the GYST RETROSPECTIVE.md, and the v1.2 scope decisions in PROJECT.md and STATE.md — no generic startup advice)

---

## Critical Pitfalls

### Pitfall 1: Step 1 Overload — 5PM Questions Collapse the "Single Session" Guarantee

**What goes wrong:**
Step 1 currently runs four sub-decisions in sequence: Customer → Problem → Advantages → Competitors, each with its own question, sharpening loop, lock, and banner re-render. The 5PM additions target Step 1 with four separate modules: Problem I/U matrix, Purchaser awareness questions, Pricing Model questions, and Market sizing. If all four are inserted as additional sequential sub-decision loops, Step 1 grows from roughly 4 sub-steps to 8+. The session stops feeling like a sprint and starts feeling like a tax audit. The "one session, one hypothesis" promise breaks — not technically, but experientially.

The specific risk: the Problem I/U matrix, Purchaser, and Pricing Model all land in the same part of Step 1 (after Problem is locked, before Competitors), creating a gauntlet of structured evaluation before the user even knows who the competitors are.

**Why it happens:**
Each 5PM lens looks small in isolation — "just two questions about pricing" or "just a 2x2 for urgency." But they stack. Five individually-small additions become an overwhelming linear sequence when executed one-after-another in the same step.

**How to avoid:**
Treat 5PM questions as *awareness passes*, not as a second sequence of locks. Specifically:

- The Problem I/U matrix is a reflection tool, not a new lock. After the Problem is locked, place the matrix as a **single confirmatory framing**: "Here's where that problem sits on importance vs. urgency — [matrix]. Does this match your read?" One response. Move on. No second probe.
- Purchaser and Pricing Model questions are stated in the v1.2 scope as "non-blocking." Enforce this structurally in the workflow: write them as a *grouped awareness block* ("Before we research competitors, three quick reads on your market:") that expects a brief composite answer, not a separate lock-and-banner cycle per question.
- Market sizing comes with its own web search — pair it with the already-existing problem validation search in `section_problem` (RESEARCH-03) rather than adding a new research invocation with its own turn.
- Keep the Step 1 banner unchanged. The banner already tracks Customer, Problem, Advantages, Competitors. Do not add new banner fields for 5PM dimensions — that signals to the user that these are new primary decisions, not awareness frames.

**Warning signs:**
- The 5PM block in Step 1 requires a banner re-render after it completes.
- The 5PM block has its own explicit lock phrasing ("Got it — your purchaser type is...").
- The workflow adds more than 2 new turns between "Problem locked" and "entering section_competitors."
- Any question that asks the user to wait before the AI "runs research" — Step 1 already has two research waits (problem validation, competitor research); a third will kill pacing.

**Phase to address:**
Phase that writes the English 5PM Step 1 additions. Define what "non-blocking" means structurally before any prose is written: does it mean no lock? no banner update? no probe? Write that definition into the plan's acceptance criteria.

---

### Pitfall 2: The 5PM Scorecard Writes Incorrect Values Because It Draws From a Deferred Context

**What goes wrong:**
The 5PM Scorecard is a new output file written at sprint end alongside HYPOTHESIS.md, SPRINT.md, and POSITIONING.md. Its contents depend on values captured at multiple points: Problem I/U from Step 1, Purchaser/Pricing Model from Step 1, Market sizing from Step 1, Product/Founder Fit from Step 3, Pain to Validate per approach from Step 3. The workflow's single-output-location rule (established in v1.0) requires that all output files are written in `section_write_outputs` — but `section_write_outputs` is at the end of Step 4, hundreds of conversational turns after the Step 1 values were established.

The failure mode: by the time `section_write_outputs` runs, the 5PM Step 1 values may have drifted or been lost in context. Claude fills in the Scorecard fields from its best recollection of what was said, producing a Scorecard that doesn't match what was actually locked. This is the same class of bug that created the "placeholder left in HYPOTHESIS.md" problem the v1.0 workflow solved with the zero-placeholder CRITICAL rule.

**Why it happens:**
Long-context drift. The session from Problem I/U framing (early Step 1) to Scorecard writing (end of Step 4) accumulates hundreds of tokens. Claude doesn't forget — but it can misattribute, blend similar-sounding values, or use the most recent mention rather than the locked value.

**How to avoid:**
Two-part strategy:

1. **Name and store each 5PM value at lock time.** When the Problem I/U position is established in Step 1, have the workflow instruct Claude: "Note the I/U quadrant as `scorecard_problem_iu`: [value]." When Purchaser type is established: "Note as `scorecard_purchaser_type`: [value]." These named labels give `section_write_outputs` an explicit reference to pull from, not a memory reconstruction.

2. **Pre-fill the Scorecard template structure before the output-write section.** In `section_write_outputs`, add a "Scorecard assembly" step that reads each named value from session context before writing the file. If any value is missing or uncertain, surface it: "I couldn't find the locked value for [field] — confirming: [what was said]?" One clarification pass before the write, not after.

**Warning signs:**
- The Scorecard template has fields like `[Market size]` or `[Pricing model]` that could be filled from memory without explicit reference to locked values.
- The workflow does not name scorecard fields at lock time in Step 1 or Step 3.
- The Scorecard output file is added to the list in `section_write_outputs` but the assembly step for it is not spelled out with the same level of specificity as HYPOTHESIS.md's zero-placeholder rule.

**Phase to address:**
Phase that creates the 5PM Scorecard output template and writes `section_write_outputs` additions. The template must define every field name, and the workflow must name those fields at each lock point.

---

### Pitfall 3: Market Data From Web Search Stated as Fact in the Scorecard

**What goes wrong:**
The v1.2 scope includes "Market sizing/growth via AI research + founder perception in Step 1." The workflow will invoke a web search to find market size and growth data, then incorporate the result into the 5PM Scorecard's Market dimension. Claude will produce a number — "$4.2B TAM, 12% CAGR" — and write it into the Scorecard. The user reads it as validated research.

Market size data from web search is not reliable. TAM figures vary wildly depending on source methodology, framing, and year. A search for "HR software market size" can return $15B or $39B depending on which analyst's cut is returned. Worse, Claude has no way to evaluate source credibility for market research reports — it will return the most confidently-stated figure it finds, not the most defensible one.

If the Scorecard states a market size figure without confidence framing, it creates false certainty that can drive decisions. It also creates a liability when the founder pitches with it and gets challenged: "Where did that number come from?"

**Why it happens:**
The web search capability works well for factual verification (problem validation, competitor existence). It was built for those use cases. Market sizing requires methodology evaluation, triangulation, and judgment — skills that inline WebSearch cannot provide reliably.

**How to avoid:**
Two-part framing:

1. **Always show both the research result and the founder's perception separately.** The v1.2 scope says "AI research + founder perception." Keep these as two distinct data points in the Scorecard: "AI-found estimate: [range with source]" and "Founder read: [what they said]." Never merge them into a single authoritative figure.

2. **Add explicit confidence framing to the market field in the workflow.** After the market search, the workflow should say: "I found estimates ranging from [X] to [Y] for this market — these are analyst estimates and vary by methodology. How does that compare to your read of the opportunity size?" Then write both into the Scorecard with: "Note: market size figures from web search should be independently verified before use in investor materials."

**Warning signs:**
- The market sizing web search result is written directly into the Scorecard as a single number with no range or caveat.
- The workflow announces the market size with the same certainty as the problem validation step ("I searched and confirmed this is a well-documented pain...").
- The Scorecard template has a field labeled "Market size" with a number, not "Market size estimate (AI-sourced)" with a note.

**Phase to address:**
Phase that writes the market sizing section in Step 1. The template field for market size must have a confidence note baked in — it cannot be added as an afterthought when someone notices the Scorecard overstates certainty.

---

### Pitfall 4: Product/Founder Fit in Step 3 Duplicates the Founder Advantages Section From Step 1

**What goes wrong:**
The 5PM Product/Founder Fit confrontation is placed in Step 3 and addresses: background, chops, unique advantage, passion. The Foundation Sprint already collects: Capacity (what you've built), Insight (what you've seen), Motivation (why you care) — all in Step 1's `section_advantages`. From the user's perspective, they answered these questions 30-60 minutes ago. Being asked similar questions again in Step 3 feels like the AI forgot the conversation, or like the sprint is being padded.

The duplication is not exact — 5PM Product/Founder Fit is framed around whether this specific approach is the right fit for this founder, while Step 1 advantages are framed as raw capabilities. But unless the Step 3 framing is sharply distinct, users will experience it as repetition.

**Why it happens:**
5PM is a standalone framework designed to be run independently. When integrated into a flow that already covers overlapping territory, the integrator tends to import the framework's language verbatim rather than mapping it against what has already been established. The result is two rounds of questions that feel similar to the user.

**How to avoid:**
Product/Founder Fit in Step 3 must be written as a **delta check against already-locked values**, not as a fresh elicitation. Specifically:

- Reference the locked Capacity and Insight values from Step 1 explicitly: "You said your Capacity is [X] and your Insight is [Y]. For approach [A#], here's what specifically matters: [5PM-specific framing]."
- Ask only the **gap question**: "What's the specific capability or credibility you'd need that you don't currently have?" — this is the meaningful 5PM addition. Asking "what's your background" again is not.
- The step3_banner currently shows "Context: loading..." and then reloads Step 1 values — the workflow already has the pattern for this (in `section_context_reload`). The 5PM Fit check should be woven into `section_context_reload` as an extension, not placed as a new section after evaluation.

**Warning signs:**
- The Step 3 5PM section opens with "Tell me about your background" or "Why are you the right person to build this approach."
- The Scorecard's Product/Founder Fit field contains information the user has already given in section_advantages with no synthesis that shows the AI used the prior context.
- The section adds a new banner field or a new lock before the 4-matrix evaluation begins, extending Step 3 pacing.

**Phase to address:**
Phase that writes the Step 3 5PM additions. The plan must explicitly list which Step 1 fields are read into the Fit confrontation and which question(s) are genuinely new. If no question is genuinely new given what Step 1 already captures, consider whether the Fit confrontation is better expressed as a note in the Scorecard derived from Step 1 values rather than a live question.

---

### Pitfall 5: Pain to Validate Matrix Conflicts With the Existing 4-Matrix Sequential Evaluation Rule

**What goes wrong:**
Step 3's existing evaluation is structured as four sequential ASCII matrices, one per response, enforced by SPRINT-13: "Do NOT render all 4 matrices in a single response. Show Matrix 1, wait... then show Matrix 2..." The v1.2 scope adds a "Pain to Validate matrix per approach" in Step 3. If this becomes a fifth matrix rendered in the same sequential format, Step 3 expands from 4 turns-of-evaluation to 5 turns-of-evaluation — adding ~25% more evaluation overhead before the user gets a recommendation.

There is also a second failure mode: if the Pain to Validate matrix is rendered for each approach separately (not as a combined matrix), the expansion is 4 individual per-approach matrices, which adds dramatically more overhead.

**Why it happens:**
The 4-matrix pattern works well for comparing approaches against each other. The Pain to Validate framing from 5PM is more naturally per-approach (how hard is it to validate each specific approach's core assumption?) — it doesn't fit the cross-approach comparison format. Integrators try to force it into the existing pattern because the existing pattern is already implemented and familiar.

**How to avoid:**
Decide upfront which format Pain to Validate takes, and make it complementary rather than additive:

- **Option A (Recommended):** Integrate Pain to Validate into the existing Pragmatic Vision matrix (Matrix 3: Ease to build × Speed to build). Feasibility is the overlapping dimension. This produces zero additional turns.
- **Option B:** Add a fifth matrix but make it the **last** matrix and use it to produce the recommendation framing directly ("The approach with lowest validation pain is the most rational starting point"). This removes the separate recommendation section's framing work.
- **Never render Pain to Validate as a per-approach sequential set** — that would add 3-4 turns of evaluation for no incremental insight over a combined matrix.

**Warning signs:**
- The 5PM Pain to Validate appears as a separate section (`section_pain_to_validate`) after `section_approach_evaluation` rather than being woven into the evaluation section.
- The section renders separate framing for each of the 3-4 approaches.
- Step 3 now requires more than 5 user responses before the approach recommendation appears.

**Phase to address:**
Phase that writes Step 3 5PM additions. The plan must explicitly choose Option A or Option B above and include reasoning. The decision cannot be deferred to execution.

---

### Pitfall 6: The 5PM Scorecard Becomes a Sixth Output File That Breaks the Existing Output Architecture

**What goes wrong:**
The existing output architecture has a single write location rule: all files are written in `section_write_outputs` at sprint end. The `foundation-sprint.md` command's `<objective>` block declares exactly four output files. The `<onboarding>` block lists those same four files verbatim to the user at session start. Adding a fifth file (5PM Scorecard) requires touching three places: `<objective>`, `<onboarding>`, and `section_write_outputs`. If any one of these is updated without the others, the session produces either an undeclared file (user confusion) or a declared file that is never written.

A second structural risk: the existing template at `@~/.claude/get-your-shit-together/templates/HYPOTHESIS.md` is read by `section_write_outputs` to determine structure before writing. A 5PM Scorecard template must be created in `templates/` before the write step references it, following the same pattern as COMPETITORS.md. If the template doesn't exist when the write step runs, the write will fail or produce unstructured output.

**Why it happens:**
Adding a file to an existing multi-output system looks like a single-file change ("just add the Scorecard template"). The three places that must be updated are spread across the command file, the onboarding block, and the write section — they don't live together, so it's easy to update one and forget the others.

**How to avoid:**
- Update all three locations atomically in the same plan. Make the plan's delivery criteria explicit: `<objective>` lists 5 files, `<onboarding>` block lists 5 files, `section_write_outputs` writes 5 files, template exists at `templates/5PM-SCORECARD.md`.
- Create the Scorecard template before writing the workflow sections that reference it, following the v1.1 pattern: French templates were created before the French workflow that referenced them.
- Add the Scorecard to the command file's `<objective>` at the same time as adding it to the `<onboarding>` block — they are both in `commands/gyst/foundation-sprint.md`, which makes this a two-line change in one file.

**Warning signs:**
- The `<onboarding>` block still says "four output files" after v1.2 is merged.
- `section_write_outputs` does not include a step for `5PM-SCORECARD.md`.
- The `templates/5PM-SCORECARD.md` file doesn't exist at the path referenced by the workflow.
- The command file's `<objective>` lists four files but the Scorecard is written during the session.

**Phase to address:**
The phase that creates the 5PM Scorecard template and updates the write outputs section. Both the template and the write instruction must be in the same plan's deliverables. The `<objective>` and `<onboarding>` updates must be explicit checklist items, not assumed.

---

### Pitfall 7: Translating 5PM Terminology Into Three Languages Introduces Framework-Specific Vocabulary With No Prior Art

**What goes wrong:**
The 5PM framework uses specific English terms as conceptual anchors: "Important/Urgent matrix," "Purchaser," "Pricing Model," "Product/Founder Fit," "Pain to Validate." These are not generic business terms — they are Rob Walling's specific framing. When translated into French, Japanese, and Portuguese, there is no established equivalent. A translator (or Claude acting as translator) will produce a literal translation that either sounds awkward or loses the conceptual precision. For example:

- "Pain to Validate" in French: "Douleur à valider" sounds clinical and confusing — the more natural framing might be "Effort de validation" but that loses the "pain" connotation that maps to customer pain.
- "Purchaser" in Japanese: there is no single equivalent. "購買者" (kōbaisha) is legal/formal; "購入者" (kōnyūsha) is more common but still technical. The underlying concept (the person who pays, not the user) requires a sentence, not a word.
- "Product/Founder Fit" has no idiomatic Portuguese equivalent — "Ajuste Produto/Fundador" is a literal calque that Portuguese speakers would recognize as a translated concept but not as natural Portuguese.

**Why it happens:**
The v1.1 translation approach built a "per-string catalogue" before translation — but that catalogue was for Foundation Sprint terms with relatively clear equivalents. The 5PM framework terms are proper nouns for a specific methodology. The same approach will not produce natural translations without domain context.

**How to avoid:**
Before the translation phase, create a 5PM terminology register that specifies for each key term:
1. The English source term and its meaning in 5PM context
2. The recommended translation and why
3. Whether to use the English term as a loan word (sometimes acceptable in technical/startup contexts across all three languages) or translate

Specific guidance:
- For Japanese and Chinese contexts, English startup methodology terms are often accepted as loan words in katakana — consider keeping "Product/Founder Fit" as "プロダクト・ファウンダーフィット" and explaining it, rather than producing an awkward native phrase.
- For French and Portuguese, the business language register allows some English loan terms — "Pricing Model" can stay as-is in French business contexts. "Purchaser" should be translated as a phrase ("la personne qui achète, pas celle qui utilise") rather than a single word.
- The "Important vs. Urgent" matrix is well-established in French business culture (it derives from the Eisenhower matrix, which has standard French translations). Use "Important/Urgent" directly — it needs no new coinage.

**Warning signs:**
- A translated workflow uses "Douleur à valider" or "Dor a validar" as if it were natural business vocabulary.
- A translated workflow uses an English loan-word translation for terms that have clear, established equivalents in the target language.
- The translation phase plan does not include a 5PM terminology register as a pre-translation deliverable.

**Phase to address:**
The translation phase research step. The 5PM terminology register must be a research output before any translation plan is written.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Add 5PM questions as sequential locks in Step 1 alongside existing locks | "Feels complete" — every question has a confirmed answer | Session exceeds single-session time budget; users abandon mid-sprint; "non-blocking" requirement is violated | Never — 5PM awareness questions must not produce new locks or banner updates |
| Copy Problem validation web search for market sizing | Reuses existing pattern, fast to write | Market size data has different reliability than problem validation data; presenting them identically creates false equivalence | Never — market sizing must be explicitly framed as an estimate with range, not a confirmed fact |
| Write Scorecard values from memory in section_write_outputs | Simpler workflow — no named references scattered through earlier sections | Long-context drift produces Scorecard that misreports locked values; silent error, hard to detect | Never — name scorecard fields at lock time in Step 1 and Step 3 |
| Skip updating `<onboarding>` when adding Scorecard to output files | One fewer file to update | Users start sessions without knowing a Scorecard will be produced; creates confusion at session end | Never — output file declarations in `<objective>` and `<onboarding>` must be kept in sync |
| Translate 5PM terminology word-for-word | Fast translation, no extra research | Framework-specific terms produce confusing or clinical-sounding translations; degrades French/Japanese/Portuguese UX | Never — build terminology register before translating |
| Merge Pain to Validate into Pragmatic Vision matrix without explicit plan decision | Saves one matrix worth of workflow prose | If the integration is done carelessly, Pain to Validate's signal is lost; if it's done by execution without a plan, the integrator may revert to adding it separately | Acceptable if the plan explicitly decides on Option A and documents the integration rationale |

---

## Integration Gotchas

Common mistakes when inserting 5PM content into the existing workflow sections.

| Integration Point | Common Mistake | Correct Approach |
|------------------|----------------|------------------|
| 5PM Problem I/U matrix in Step 1 | Adding it after Problem lock as a new sub-decision loop with its own sharpening probe and banner re-render | Present as a single framing confirmation after Problem lock — one response expected, no banner update, move on |
| Market sizing web search | Using the same invocation pattern as RESEARCH-03 (problem validation), which announces results as confirmed | Use a distinct framing that presents market data as an estimate range with source caveats |
| 5PM Purchaser + Pricing Model in Step 1 | Two separate question-and-lock blocks, each with their own turn | Group as a single "awareness block" expecting a brief composite response; no separate locks |
| Product/Founder Fit in Step 3 | Opening with fresh elicitation questions that duplicate Step 1's Capacity/Insight/Motivation | Reference locked Step 1 values explicitly; ask only the delta question (what's missing for this specific approach) |
| 5PM Scorecard in section_write_outputs | Adding it as the last item in the write block without a pre-assembly step | Add a named-value assembly step before the file write, pulling each scorecard field from its named reference in session context |
| Translation of 5PM Scorecard template | Translating the template and adding it to `templates/fr/`, `templates/ja/`, `templates/pt/` in the same plan that translates the workflow | Create language templates before translating workflows, as established in v1.1 pattern |
| TRANSLATION-SYNC.md | Not updating the commit hash after English 5PM changes are merged | The sync record must be updated immediately when the English source changes — before translation begins — so the diff baseline is accurate |

---

## UX Pitfalls

Common user experience mistakes when adding evaluation framework to a conversational sprint.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| The sprint feels like it has a "second Step 1" | User disengages; the sprint loses its momentum advantage over traditional planning | Weave 5PM awareness into existing step transitions — it should feel like a sharper version of what the sprint already does, not a new thing happening |
| Market size number stated without confidence framing | User writes "$4.2B market" into their pitch deck and gets challenged; trust in the tool erodes | Always present market data as a range with source caveats; pair it with the founder's own read |
| Scorecard appears at session end with fields the user doesn't recognize | User doesn't understand what "Pain to Validate" or "Product/Founder Fit" means in context | Either explain each scorecard field at the moment it's established in the session, or include a one-line definition in the Scorecard template itself |
| Step 3 requires 5+ evaluation turns before the recommendation | User has been in the sprint for 60+ minutes and just wants a recommendation; adds frustration | Keep evaluation to 4 turns maximum; if Pain to Validate is added, absorb it into an existing matrix (Option A above) |
| 5PM Scorecard score looks like a grade | Founder anchors on "3/5 on Market" and interprets it as a disqualifier when 5PM intends it as a signal for awareness | Do not use numeric scores in the Scorecard unless the scoring rubric is defined inline; use categorical framing (Strong / Moderate / Uncertain) with explanation |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **5PM Step 1 block exists:** Verify it does not add a new banner field — the Step 1 banner must still show only Customer, Problem, Advantages, Competitors.
- [ ] **"Non-blocking" is structurally enforced:** Purchaser and Pricing Model questions must not have lock phrasing ("Got it — your pricing model is...") or a banner re-render after their response.
- [ ] **Scorecard template exists at `templates/5PM-SCORECARD.md`:** The template path referenced in `section_write_outputs` must exist before the write step is written.
- [ ] **All three locations updated for Scorecard:** `<objective>` in `commands/gyst/foundation-sprint.md` lists 5 files, `<onboarding>` block lists 5 files, `section_write_outputs` writes 5 files.
- [ ] **Scorecard fields are named at lock time:** Check Step 1 and Step 3 5PM sections for explicit `scorecard_[field]` naming instructions — not just prose description.
- [ ] **Market sizing framing has a confidence caveat:** The web search result for market size must be presented with "ranges from X to Y" language, not a single figure.
- [ ] **Step 3 Fit confrontation references locked Step 1 values:** The section must use the stored Capacity/Insight/Motivation labels, not ask fresh elicitation questions.
- [ ] **TRANSLATION-SYNC.md updated:** All five language entries (FR, ES, DE, ZH, PT, JA) must have their commit hash updated to the commit that adds the English 5PM workflow changes.
- [ ] **Language templates include Scorecard:** `templates/fr/5PM-SCORECARD.md`, `templates/ja/5PM-SCORECARD.md`, `templates/pt/5PM-SCORECARD.md` exist before translated workflows reference them.
- [ ] **5PM terminology register completed:** A register of framework-specific terms and their target-language translations exists as a pre-translation research deliverable.

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Step 1 overload discovered in UAT | MEDIUM | Identify which 5PM blocks have lock phrasing or banner updates and strip them; convert to awareness framing; re-test pacing |
| Scorecard writes incorrect values from context drift | MEDIUM | Add named-value instructions at each lock point in Steps 1 and 3; add pre-assembly step in section_write_outputs; re-test with full 4-step session |
| Market data stated without confidence framing | LOW | Update the market sizing section's prose and the Scorecard template field label; no structural changes required |
| Product/Founder Fit duplicates Step 1 in Step 3 | MEDIUM | Rewrite the Step 3 section to reference locked Step 1 values explicitly; add the gap question only; verify section_context_reload still loads Step 1 values correctly |
| Pain to Validate rendered as extra matrix | LOW | Decide Option A or B; merge into Pragmatic Vision matrix or make it the combined fifth matrix; remove the per-approach rendering |
| Scorecard not written at session end | LOW | Verify section_write_outputs has a Scorecard step; verify template exists at referenced path; add missing items |
| Translation produces awkward 5PM terminology | MEDIUM | Build terminology register post-hoc; update translated workflows section by section; requires full re-read of translated files for each affected language |
| TRANSLATION-SYNC.md not updated before translation | LOW | Run git diff to identify exact English changes; update sync record with correct hash; proceed with translation from accurate baseline |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Step 1 overload (Pitfall 1) | Phase adding 5PM Step 1 content (English) — plan must define "non-blocking" structurally before writing | UAT: count turns between Problem locked and entering section_competitors; max 2 new turns |
| Scorecard context drift (Pitfall 2) | Phase creating Scorecard template and write_outputs additions — named-value instructions are plan deliverables | Structural: grep for `scorecard_` labels in Step 1 and Step 3 sections; count Scorecard fields vs. labels |
| Market data false certainty (Pitfall 3) | Phase adding market sizing to Step 1 — template field must include confidence note in its definition | Structural: Scorecard market field must contain "estimate" or "range" in its label or inline note |
| Fit confrontation duplicates Step 1 (Pitfall 4) | Phase adding Step 3 5PM content — plan must enumerate which Step 1 fields are referenced vs. which questions are net-new | Manual: read Step 3 5PM section; verify no question duplicates section_advantages elicitation |
| Pain to Validate format conflict (Pitfall 5) | Phase adding Step 3 5PM content — plan must choose Option A or B explicitly | Structural: count matrices in section_approach_evaluation; must be ≤ 5 and no per-approach rendering |
| Scorecard breaks output architecture (Pitfall 6) | Phase adding Scorecard — plan deliverables must list `<objective>`, `<onboarding>`, `section_write_outputs`, and `templates/5PM-SCORECARD.md` as explicit items | Structural: grep `<objective>` and `<onboarding>` for "5PM-SCORECARD.md"; confirm all four locations updated |
| 5PM translation terminology (Pitfall 7) | Translation research phase — 5PM terminology register is a research deliverable before any translation plan begins | Process: translation plan cannot begin until terminology register is reviewed and approved |

---

## Sources

- Direct inspection of `get-your-shit-together/workflows/foundation-sprint.md` (GYST v1.0, 1,268 lines) — full Step 1 through Step 4 structure reviewed; section sequencing, banner update rules, lock phrasing, and write-output architecture mapped; HIGH confidence
- `.planning/RETROSPECTIVE.md` v1.0 and v1.1 lessons — "seam-based integration," "single output location rule," "requirements counts go stale," "COMPETITORS.md as session-fixed source of truth" all applied directly; HIGH confidence
- `.planning/PROJECT.md` v1.2 scope decisions — "non-blocking awareness questions," "Market sizing via AI research + founder questions," "Pain to Validate matrix per approach," "Translate all changes to FR, JA, PT" taken as authoritative scope; HIGH confidence
- `.planning/research/PITFALLS.md` v1.1 — Pitfall 2 (language drift), Pitfall 6 (sync drift), and Integration Gotchas (template path updates) established patterns that generalize directly to v1.2 translation phase; HIGH confidence
- `TRANSLATION-SYNC.md` — current state of 5 language sync records (FR, ES, DE, ZH, PT, JA) all referencing pre-v1.2 commits; informed the TRANSLATION-SYNC update requirement; HIGH confidence

---
*Pitfalls research for: Adding 5PM Idea Evaluation Framework to existing Foundation Sprint workflow (GYST v1.2)*
*Researched: 2026-03-22*
