# Feature Research

**Domain:** 5PM Idea Evaluation Framework integration into an AI-guided single-session sprint workflow
**Researched:** 2026-03-22
**Confidence:** HIGH for framework structure (multiple sources including official podcast transcript); MEDIUM for scoring granularity (Rob Walling explicitly states no formal scoring system exists yet); HIGH for integration behavior (derived from direct analysis of existing 1,268-line workflow)

---

## What the 5PM Framework Actually Is

The 5PM framework was introduced by Rob Walling in Episode 628 of "Startups for the Rest of Us" (May 2024) and published as a PDF worksheet at startupsfortherestofus.com. It evaluates SaaS ideas against six dimensions in priority order:

1. **Problem** — Is it important? Is it urgent? (Important/Urgent 2x2)
2. **Purchaser** — Who buys? What's their tech adoption rate and willingness to pay? (B2C / B2A / B2B / B2E)
3. **Pricing Model** — Can this be a subscription? What's the estimated ARPA?
4. **Market** — How large is the reachable market? Is it growing?
5. **Product/Founder Fit** — Does the founder have the background, chops, access, and passion?
6. **Pain to Validate** — How quickly can this be validated or MVPed?

**Critical source note:** Rob explicitly states "there is no conclusion, there is no score out of a hundred — not yet anyway." The framework is a qualitative evaluation lens, not a quantitative calculator. Any scoring system in GYST must be designed, not copied from the original.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that must exist for the 5PM integration to feel complete. Missing these means users get a partial evaluation that doesn't honor the framework's intent.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Problem Important/Urgent 2x2 | The framework's first and most important lens; "Vitamin vs. Aspirin" is the most cited concept from the framework | MEDIUM | Must be a 2x2, not just two separate yes/no questions; quadrant placement drives the narrative ("aspirin" = both important AND urgent) |
| Purchaser type classification | B2C/B2A/B2B/B2E is Rob's specific contribution — it's more nuanced than generic "who buys" questions | MEDIUM | Requires explaining what each tier means for willingness to pay and tech adoption, not just labeling; B2A ("aspirational") is the most counterintuitive tier and needs definition |
| Willingness-to-pay assessment | Directly tied to Purchaser — the framework treats "can they actually pay?" as a go/no-go signal | LOW | Not a number — a qualitative judgment: does this buyer type have budget authority, and do they use software like this today? |
| Tech adoption signal | Rob uses "web developers = high adoption, attorneys = low adoption" as reference points | LOW | One question, AI interprets the answer. Feeds into Purchaser section of scorecard. |
| Subscription viability question | Pricing Model asks specifically: can this be recurring revenue vs one-time? | LOW | Yes/no with justification. Key because bootstrappers need recurring revenue to build toward $1M ARR. |
| ARPA estimate | The framework distinguishes "can this support a business" by asking what a realistic monthly account value looks like | MEDIUM | Not market sizing — this is per-account revenue. Rob references $400-500/mo minimum for B2B. Needs founder input + AI sanity check against purchaser type. |
| Market size and reachability | How many reachable customers (not TAM — TRM: Total Reachable Market) | HIGH | Requires AI web research. "Reachable" means: are they findable, do they have online presence, what channels reach them? Must be honest about small markets being acceptable for bootstrappers. |
| Market growth signal | Growing vs flat vs declining; early vs mature | MEDIUM | AI can research this inline. One question + search. |
| Product/Founder Fit confrontation | Rob's 4 questions: background, chops (technical or marketing), access/network, passion | MEDIUM | Already partially covered by the existing Founder Advantages section (Capacity/Insight/Motivation). 5PM adds "chops" (technical vs marketing fit for the specific type of product) and "access" (audience or network in the space). |
| Pain to Validate per approach | In Step 3, each approach gets evaluated on MVP feasibility: how hard to build, how fast to get signal | MEDIUM | In the existing workflow, Matrix 3 (Pragmatic Vision) already scores "Easy to build / Slow to Fast." The 5PM Pain to Validate lens adds: can you validate through conversations before coding? Maps cleanly to Matrix 3 but adds a validation-first framing. |
| 5PM Scorecard output file | A single file summarizing all 5PM lens results alongside the sprint hypothesis | HIGH | New output file (5PM-SCORECARD.md). Must be written at end of sprint alongside HYPOTHESIS.md, SPRINT.md, POSITIONING.md. |

### Differentiators (What Makes This Integration High Quality)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| AI-generated Important/Urgent placement with evidence | Rather than asking the user to self-score importance and urgency on a scale, the AI places the problem in a quadrant based on the validated pain research from section_problem (RESEARCH-03 already runs) | LOW | The research is already done by the time this section runs. The AI interprets its own search findings to place the problem in the 2x2. |
| Purchaser type with implication summary | After classifying the buyer tier (B2C/B2A/B2B/B2E), the AI explains what this means for the specific product — not a generic description | LOW | "Your buyer is B2B, which means you can charge more but expect longer sales cycles. For a tool like this, expect $50-300/seat." |
| ARPA sanity check against purchaser type | If a founder claims B2C pricing on a B2B buyer type (or vice versa), flag the mismatch before locking | MEDIUM | Prevents founders from misclassifying their buyer segment while being overconfident about pricing. |
| Reachable market AI research | Rather than asking the founder to estimate market size (which is always wrong), the AI searches for reachable audience signals: forum sizes, job board volume, community membership counts | HIGH | More honest than TAM/SAM/SOM. Returns "~50,000 active [segment] communities on LinkedIn" not "$4.2B market." |
| Pain to Validate matrix integrated into approach evaluation | Instead of being a standalone question, "Pain to Validate" feeds directly into the existing Matrix 3 (Pragmatic Vision) framing — the AI adds a validation-speed lens to the existing Ease/Speed evaluation | MEDIUM | Clean integration: Matrix 3 already exists. Add a third label or note: "Validation path: [conversations / prototype / code-first]" below each approach's quadrant placement. |
| 5PM Scorecard as a decision artifact | The scorecard is not just a summary — it contains the AI's explicit reasoning for each lens, so the founder can argue with specific conclusions rather than just getting a grade | MEDIUM | Each section has: "What we found," "Interpretation," and "Red flags (if any)." |
| Lens ordering matches Rob's priority sequence | Problem is assessed in Step 1 (before anything else), Purchaser and Pricing follow, Market requires research, Founder Fit leverages Step 1 Advantages, Pain to Validate comes in Step 3. The workflow order naturally aligns with Rob's priority ranking. | LOW | No re-ordering needed — this is an integration advantage, not additional work. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Numerical aggregate score (e.g., "your idea scores 72/100") | Feels scientific, gives users a clear verdict | Rob explicitly says there is no scoring system. An aggregate score would misrepresent the framework as pass/fail when it is actually a lens for seeing blind spots. A single number collapses nuance and gives false confidence. | Per-lens signal strength ("strong signal / weak signal / needs investigation") with an overall verdict narrative, not a number |
| Separate 5PM section or "mini-sprint" within the sprint | "Keep 5PM separate so it doesn't clutter the flow" | Forces the user through a parallel evaluation that feels disconnected from the sprint questions they've already answered. Creates redundancy and increases session length. | Weave each 5PM lens into the step where it belongs — Problem in Step 1 after problem lock, Founder Fit in Step 3 context reload, Pain to Validate in Matrix 3 |
| Require all 6 lens answers before proceeding | "Completeness" | The framework is a pre-validation filter, not a gate. Some lenses (Market size) are genuinely uncertain at sprint time. Blocking progress on uncertain data punishes honest founders. | Mark uncertain lenses with "low confidence — needs validation" in the scorecard rather than forcing guesses |
| Ask the user to self-rate their idea across all 6 dimensions | Simpler to implement | Self-rating is the worst possible input for an evaluation framework. Founders are systematically overconfident. The value of the AI is to surface what the founder can't see — not to reflect back what they already think. | AI derives lens conclusions from the research and session data it has already gathered; founder input is context, not scores |
| Add a "compare two ideas" mode to the scorecard | "I have 3 ideas and want to pick the best one" | This is a different use case (idea selection vs. idea evaluation) that requires a separate session structure. Trying to fold it in makes both worse. | One sprint = one idea; run the sprint twice to compare |
| Translate 5PM terminology literally for non-English workflows | "Consistency" | "B2A" (aspirational) is already barely understood in English. Literal translation of the B2C/B2A/B2B/B2E taxonomy into French/Japanese/Portuguese creates jargon that doesn't exist in those business cultures. | Translate the underlying meaning ("les acheteurs professionnels avec budget décentralisé") rather than the English abbreviation |

---

## Feature Dependencies

```
[Problem Important/Urgent 2x2]
    └──requires──> Problem locked (section_problem)
    └──requires──> RESEARCH-03 completed (validation search has run)
    └──reads──> AI's own search findings from section_problem

[Purchaser Classification]
    └──requires──> Customer locked (section_customer)
    └──requires──> Problem locked (section_problem)
    └──feeds──> [ARPA Estimate]
    └──feeds──> [Subscription Viability]
    └──feeds──> [5PM Scorecard — Purchaser section]

[ARPA Estimate]
    └──requires──> Purchaser Classification locked
    └──requires──> Pricing Model question answered
    └──feeds──> [5PM Scorecard — Pricing section]

[Market Size / Reachability]
    └──requires──> Customer locked (section_customer)
    └──requires──> Problem locked (section_problem)
    └──requires──> AI web research (new inline search in Step 1)
    └──feeds──> [5PM Scorecard — Market section]

[Product/Founder Fit — 5PM layer]
    └──requires──> Founder Advantages locked (section_advantages — Capacity, Insight, Motivation)
    └──enhances──> section_context_reload (Step 3 already reads Capacity and Insight)
    └──adds──> "chops" dimension (tech vs. marketing fit for the product type)
    └──adds──> "access" dimension (audience, network, distribution advantage)
    └──feeds──> [5PM Scorecard — Founder Fit section]

[Pain to Validate — per approach]
    └──requires──> Approaches finalized (section_approach_generation)
    └──enhances──> Matrix 3 (Pragmatic Vision — already scores Ease to build / Speed)
    └──adds──> validation path label per approach
    └──feeds──> [5PM Scorecard — Pain to Validate section]

[5PM Scorecard output]
    └──requires──> ALL lens data collected across Steps 1-3
    └──requires──> Hypothesis locked (section_hypothesis)
    └──written by──> section_write_outputs (alongside HYPOTHESIS.md, SPRINT.md, POSITIONING.md)
    └──reads template──> templates/5PM-SCORECARD.md (new file needed)
```

### Dependency Notes

- **Problem 2x2 requires RESEARCH-03:** The AI can only place the problem in the Important/Urgent quadrant if it has already run the validation search. The existing workflow already runs RESEARCH-03 before locking the problem — this is a free dependency.
- **Purchaser classification must precede ARPA:** It makes no sense to estimate ARPA without knowing the buyer tier. B2C caps are ~$20-50/mo; B2B minimums are $50-500/mo; B2E can be thousands. The ARPA question must come after the buyer type is labeled.
- **Market research is a new web search:** Unlike the Problem validation (which searches for pain point evidence), market sizing requires a different search strategy: audience size, community scale, job board volume. This is a new inline search in Step 1 — RESEARCH-04.
- **Founder Fit 5PM adds two questions to section_context_reload:** "Chops" (does the founder have the right type of skills for this product — tech-heavy product needs tech chops; marketing-heavy space needs distribution chops) and "Access" (do they have an audience, network, or distribution channel in this market). These are additive to the existing Capacity/Insight/Motivation read-back.
- **Pain to Validate integrates into Matrix 3:** The existing Matrix 3 (Pragmatic Vision) already scores "Ease to build" and "Speed to build." Adding a validation-path label per approach ("conversations / prototype / code-first") is an annotation layer on top of existing logic, not a new matrix.
- **5PM Scorecard requires all prior data:** It must be the last thing assembled before writing. It cannot be written incrementally. The scorecard template must reference locked values from Steps 1, 2, and 3.

---

## MVP Definition

### Launch With (v1.2)

These are the features needed for a complete, useful 5PM integration. Every item is required — removing any would produce an incomplete scorecard.

- [ ] **Problem Important/Urgent 2x2** in Step 1 (after problem lock, before advancing to Founder Advantages) — AI places problem in quadrant using its own RESEARCH-03 findings; explains implication
- [ ] **Purchaser type classification** in Step 1 (after customer lock, before or alongside problem) — user answers one question, AI classifies as B2C/B2A/B2B/B2E with implication summary
- [ ] **Willingness-to-pay and tech adoption assessment** in Step 1 — 2 questions, AI-interpreted, stored as a signal (high/medium/low) rather than a number
- [ ] **Pricing Model questions** in Step 1 (subscription viability + ARPA estimate) — after Purchaser is classified; 2-3 questions
- [ ] **Market sizing via AI research (RESEARCH-04)** in Step 1 — new inline search after problem is locked; AI reports reachable market signals and growth direction
- [ ] **Product/Founder Fit — chops and access dimensions** in Step 3 section_context_reload — 2 additive questions alongside existing Capacity/Insight read-back
- [ ] **Pain to Validate label per approach** in Step 3 Matrix 3 — annotation to existing Pragmatic Vision evaluation, not a new matrix
- [ ] **5PM-SCORECARD.md output template** — new template file at `templates/5PM-SCORECARD.md`
- [ ] **5PM Scorecard written at sprint end** — added to section_write_outputs alongside existing 4 output files
- [ ] **Translation to FR/JA/PT workflows** — all new 5PM sections translated to the 3 existing non-English workflows

### Add After Validation (v1.x)

- [ ] **ARPA sanity check against purchaser type** — if founder estimates don't match their buyer tier, flag the mismatch. Add once v1.2 is in users' hands and the mismatch case is confirmed to be common.
- [ ] **Competitor pricing context in ARPA question** — pull competitor pricing from COMPETITORS.md to anchor the ARPA conversation. Add once the ARPA question pattern is stable.

### Future Consideration (v2+)

- [ ] **Multi-idea comparison mode using 5PM** — run two scorecard evaluations side by side. Requires multi-session state, which is explicitly out of scope until v2.
- [ ] **Quantitative scoring system** — if Rob Walling releases an official scoring rubric, integrate it. Not worth inventing one ahead of the source.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Problem Important/Urgent 2x2 | HIGH | MEDIUM | P1 |
| Purchaser classification (B2C/B2A/B2B/B2E) | HIGH | MEDIUM | P1 |
| Pricing Model questions (subscription + ARPA) | HIGH | LOW | P1 |
| Market sizing via AI research (RESEARCH-04) | HIGH | HIGH | P1 |
| Product/Founder Fit — chops + access additions | MEDIUM | LOW | P1 |
| Pain to Validate label per approach in Matrix 3 | MEDIUM | LOW | P1 |
| 5PM Scorecard output file | HIGH | MEDIUM | P1 |
| Translation to FR/JA/PT workflows | HIGH | HIGH | P1 |
| ARPA sanity check vs purchaser type | MEDIUM | MEDIUM | P2 |
| Competitor pricing anchor for ARPA question | LOW | LOW | P2 |

**Priority key:**
- P1: Must have for v1.2 launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Per-Lens Behavior Specification

This section defines the expected interactive behavior for each 5PM lens in a single-session AI-guided workflow. This is what the roadmap phases must implement.

### Lens 1: Problem — Important/Urgent 2x2

**Where it lives:** Step 1, immediately after problem is locked (RESEARCH-03 has just run)

**Input:** AI's own search findings from the problem validation search. No new user input required.

**Behavior:**
- AI places the problem in one of four quadrants: "Important + Urgent" / "Important, Not Urgent" / "Urgent, Not Important" / "Neither"
- AI renders a small ASCII 2x2 showing the placement
- AI explains the implication in 1-2 sentences ("This is an aspirin problem — people are actively trying to fix it now, which means willingness to pay is high")
- No user confirmation required — this is an AI assessment, not a user decision. User can push back but cannot "lock" a different placement.

**Scoring signal for scorecard:** Strong / Moderate / Weak (based on quadrant)

**Good scorecard output:** "Problem: Important + Urgent — confirmed by [3 signals from search]. Signal: Strong."

### Lens 2: Purchaser — B2C / B2A / B2B / B2E Classification

**Where it lives:** Step 1, after customer segment is locked

**Trigger question:** "Who holds the budget for this? Is this an individual consumer, someone trying to make money from their hobby or audience, a company with a departmental budget, or an enterprise with a formal procurement process?"

**AI behavior after response:**
- AI classifies into one of four tiers and explains what that tier means for this specific product
- AI asks a follow-up: "Do they actively use software like this today, or is this a new behavior for them?" (tech adoption signal)
- AI asks: "Do they have clear budget authority — can they swipe a card or approve a subscription without approval?" (willingness-to-pay signal)

**B2C/B2A/B2B/B2E definitions as the AI should present them:**
- **B2C:** Individual consumers; price-sensitive ($5-50/mo ceiling common); slow adoption; churn is high
- **B2A:** Aspirational buyers — photographers, podcasters, side-hustlers trying to monetize; moderate willingness to pay ($20-100/mo); motivated but budget-constrained
- **B2B:** Business buyers with departmental budgets; $50-500+/mo acceptable; slower sales cycle; stickier once sold
- **B2E:** Enterprise; $500-5,000+/mo per contract; long sales cycles; procurement and legal involved; highest ARPA but hardest to close

**Scoring signal for scorecard:** Favorable / Marginal / Difficult (based on tier + tech adoption + WTP)

**Good scorecard output:** "Purchaser: B2B — small business with budget authority and existing software habits. Willingness to pay: medium-high. Tech adoption: high. Signal: Favorable."

### Lens 3: Pricing Model — Subscription + ARPA

**Where it lives:** Step 1, after Purchaser classification

**Questions (2 total, asked together):**
1. "Does what you're building lend itself to a monthly or annual subscription — something people would pay for as long as they use it — or is this more of a one-time tool?"
2. "What would a realistic monthly price per account look like? Give me a range you'd feel comfortable charging."

**AI behavior after responses:**
- AI confirms subscription viability (yes / probably / unclear / no)
- AI performs a sanity check: does the estimated ARPA match the buyer tier? (B2C with $500/mo ARPA = mismatch; B2B with $5/mo = mismatch)
- If mismatch detected, AI flags it: "Your buyer type is B2B, but you estimated $5/month — that's below what's typically viable for a B2B product to cover acquisition costs. Does that framing feel right, or should we revisit?"

**Scoring signal for scorecard:** Viable / Marginal / Problematic

**Good scorecard output:** "Pricing: Subscription — recurring revenue model confirmed. ARPA estimate: $80-120/mo. Consistent with B2B buyer type. Signal: Viable."

### Lens 4: Market — Size + Growth + Reachability

**Where it lives:** Step 1, after problem and customer are locked (a new RESEARCH-04 search)

**Trigger:** After problem lock, before Founder Advantages section. AI runs an inline search.

**Search strategy (AI-driven, no user input needed):**
- Search for: size signals for the customer segment (LinkedIn group sizes, subreddit subscribers, conference attendance, job board posting volume)
- Search for: market growth signals (is this segment growing, stable, or shrinking — look for industry reports, news, VC investment patterns)
- Do NOT calculate TAM/SAM/SOM — find reachable audience signals

**Questions to user (1-2 short questions after research):**
1. "Based on what you know, is this a growing space — are you seeing more people enter this market, more tools being built, more awareness?" (founder perception check)
2. (Optional, only if research was inconclusive) "Do you know roughly how many people fit this customer description? Is it hundreds, thousands, or more?"

**AI behavior:**
- Reports what it found in 2-3 sentences: "[Segment X] shows [signal]. The market appears [early/growing/mature/declining] based on [evidence]."
- Provides a rough reachable market estimate: "I estimate tens of thousands of potential customers in this segment" — uses order-of-magnitude language, not false precision

**Scoring signal for scorecard:** Large + Growing / Adequate / Small or Declining

**Good scorecard output:** "Market: B2B ops teams at SMBs — estimated 40,000-100,000 reachable customers in English-speaking markets. Market is growing (SaaS operations tooling is a growing spend category). Signal: Adequate."

### Lens 5: Product/Founder Fit — Background, Chops, Access, Passion

**Where it lives:** Step 3, section_context_reload (the existing context reload already reads Capacity and Insight)

**What already exists (do not re-ask):**
- Capacity = what the founder can build (Step 1)
- Insight = what they've seen before others (Step 1)
- Motivation = why this matters to them (Step 1)

**What 5PM adds (2 new questions in section_context_reload):**
1. "For this specific product — is the biggest challenge building it technically, or finding and convincing customers to buy it? And which of those is more in your wheelhouse?"
   (Chops dimension: tech-heavy product needs tech chops; go-to-market-heavy space needs marketing/sales chops)
2. "Do you have a direct path to your first 10 customers — an audience, a community, existing relationships, or a distribution channel you can use?"
   (Access dimension: distribution is the single biggest predictor of early traction for bootstrappers)

**AI behavior:**
- Reads Capacity, Insight, Motivation from Step 1 (already in context)
- Asks both new questions together in one message
- Evaluates chops fit: does the stated Capacity match the type of challenge this product faces?
- Evaluates access: is there a concrete distribution path, or is this a "I'll figure it out later" situation?

**Scoring signal for scorecard:** Strong Fit / Partial Fit / Gaps Present

**Good scorecard output:** "Founder Fit: Technical chops confirmed (shipped 3 B2B SaaS products). Marketing chops: unproven. Access: weak — no existing audience in this segment. Main gap: distribution. Signal: Partial Fit."

### Lens 6: Pain to Validate — MVP Feasibility per Approach

**Where it lives:** Step 3, Matrix 3 (Pragmatic Vision — Ease to Build × Speed to Build)

**What already exists (do not replace):**
- Matrix 3 already plots each approach on "Hard to build / Easy to build" vs "Slow / Fast"
- This is retained as-is

**What 5PM adds (annotation layer on Matrix 3):**
After each approach's quadrant placement, the AI adds one line: "Validation path: [conversations before coding / prototype / full build required]"

- **Conversations before coding:** Approach can be validated through customer interviews or a mock demo; no code needed for signal. Best case.
- **Prototype / wizard-of-oz:** Can be validated with a manual or low-code version that simulates the product. Good case.
- **Full build required:** Validation requires a working product; hard to fake it. Most expensive to validate.

**Scoring signal for scorecard:** Easy to validate / Medium effort / Hard to validate (one label per approach, rolled up to the chosen approach)

**Good scorecard output (for chosen approach):** "Pain to Validate: A2 (chosen) — prototype path available; wizard-of-oz test feasible in 2-3 weeks. Signal: Medium effort."

---

## 5PM Scorecard Output File Structure

The 5PM-SCORECARD.md is a new output file written at sprint end. It does not replace any existing output file — it is additive.

**Structure:**

```
# 5PM Evaluation Scorecard

Sprint date: [date]
Idea: [one-sentence description from hypothesis]

---

## Overall Reading

[2-3 sentence narrative verdict — what the strongest signals are, where the main gaps are, what to watch out for]

---

## Lens-by-Lens

### Problem (Important/Urgent)
Signal: [Strong / Moderate / Weak]
Quadrant: [Important + Urgent / Important Not Urgent / Urgent Not Important / Neither]
Evidence: [what the research found]
Implication: [what this means for willingness to pay and urgency of purchase]

### Purchaser
Signal: [Favorable / Marginal / Difficult]
Buyer type: [B2C / B2A / B2B / B2E]
Tech adoption: [High / Medium / Low]
Willingness to pay: [High / Medium / Low]
Implication: [what this means for pricing, sales cycle, and churn risk]

### Pricing Model
Signal: [Viable / Marginal / Problematic]
Model: [Subscription / One-time / Usage-based / Unclear]
ARPA estimate: [range]
Consistency check: [consistent with buyer type / flagged mismatch]

### Market
Signal: [Large + Growing / Adequate / Small or Declining]
Reachable market: [order-of-magnitude estimate]
Growth direction: [growing / flat / declining]
Reachability: [online channels available / hard to reach]

### Product/Founder Fit
Signal: [Strong Fit / Partial Fit / Gaps Present]
Technical chops: [strong / adequate / gap]
Marketing/distribution chops: [strong / adequate / gap]
Access to first customers: [concrete path / vague / none]
Main gap: [if any]

### Pain to Validate (chosen approach)
Signal: [Easy / Medium effort / Hard]
Validation path: [conversations / prototype / full build]
Estimated time to first signal: [rough estimate]

---

## Red Flags

[Bulleted list of specific concerns the founder should investigate before building]
[Or: "No red flags identified" if all signals are favorable]

---

## What to Test First

[One concrete recommendation for the fastest validation action based on the Pain to Validate lens + the weakest scoring lens]
```

**What makes a good scorecard output:**
- Specific, not generic. "B2B ops buyer with existing software budget" not "business customers."
- Honest about gaps. If founder fit has a marketing gap, say so directly.
- Actionable. Each weak signal should translate to something the founder can test or investigate.
- Not a grade. No total score. No pass/fail binary. The narrative tells the story.

---

## Complexity Assessment by New Feature

| Feature | Where in Workflow | Complexity | Primary Risk |
|---------|-------------------|------------|--------------|
| Problem 2x2 | Step 1, post-problem lock | MEDIUM | AI must correctly interpret its own search findings to place the problem — subjective judgment call |
| Purchaser classification | Step 1, post-customer lock | MEDIUM | B2A is an unusual tier that many founders won't recognize; needs clear explanation |
| Willingness-to-pay / tech adoption | Step 1, part of Purchaser | LOW | 2 short questions; straightforward interpretation |
| Subscription + ARPA questions | Step 1, post-Purchaser | LOW | Simple questions; ARPA mismatch detection is the only edge case |
| Market research (RESEARCH-04) | Step 1, new search | HIGH | Web search results for market sizing are often garbage (TAM claims, not reachable signals); AI must interpret intelligently |
| Founder Fit additions (chops + access) | Step 3, context_reload | LOW | 2 additive questions; no structural change to existing section |
| Pain to Validate label | Step 3, Matrix 3 | LOW | Annotation on existing matrix output; minimal structural change |
| 5PM Scorecard template | New file | MEDIUM | Template must accommodate AI-narrative fields, not just locked values |
| Write 5PM Scorecard at end | section_write_outputs | MEDIUM | Fifth output file; section_write_outputs must be extended |
| Translate to FR/JA/PT | All 3 language workflows | HIGH | Each language workflow must replicate all 5PM additions; 5PM scorecard template needs 4 language variants |

**HIGH complexity features:** Market research (RESEARCH-04), translation to all language workflows
**MEDIUM complexity features:** Problem 2x2, Purchaser classification, 5PM Scorecard template + write step
**LOW complexity features:** WTP/adoption questions, Subscription/ARPA questions, Founder Fit additions, Pain to Validate annotation

---

## Integration Points with Existing Workflow

| New 5PM Feature | Hooks Into | Reuses | Avoids |
|----------------|-----------|--------|--------|
| Problem 2x2 | After `section_problem` lock | RESEARCH-03 search findings | Running a new search |
| Purchaser questions | After `section_customer` lock, before `section_problem` | Customer segment locked value | Redundancy with competitor buyer signals in Step 2 |
| Market research | After `section_problem` lock, before `section_advantages` | Customer + Problem locked values | The separate competitor research (gyst-researcher) |
| Founder Fit additions | `section_context_reload` (Step 3) | Capacity, Insight, Motivation from Step 1 | Re-asking what's already locked |
| Pain to Validate | `section_approach_evaluation` Matrix 3 | Existing Matrix 3 quadrant placement logic | Adding a 5th matrix |
| 5PM Scorecard | `section_write_outputs` | All locked values from Steps 1-3 | Replacing any existing output file |

---

## Sources

- Rob Walling, "The 5 PM Pre-Validation Framework," Episode 628, Startups for the Rest of Us (May 2024): https://www.startupsfortherestofus.com/episodes/episode-628-the-5-pm-pre-validation-framework
- "The 5 P.M. Idea Evaluation Framework" PDF worksheet: https://www.startupsfortherestofus.com/wp-content/uploads/The-5-PM-Idea-Evaluation-Framework.pdf
- Medium summary by Mica Linscheid: https://medium.com/@micalinscheid/5pm-framework-for-saas-success-from-rob-walling-a-guide-to-building-your-product-ff2a5a65650d
- Direct analysis of `get-your-shit-together/workflows/foundation-sprint.md` (1,268 lines, 22 sections)
- Direct analysis of existing output templates: HYPOTHESIS.md, SPRINT.md, POSITIONING.md, COMPETITORS.md
- B2C/B2A/B2B/B2E tier definitions sourced from podcast transcript (MEDIUM confidence) — verify the B2A tier definition against the original PDF before implementing

---

*Feature research for: GYST v1.2 — 5PM Idea Evaluation Framework integration*
*Researched: 2026-03-22*
