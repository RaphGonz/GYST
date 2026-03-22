# Phase 9: English Step 3 — Fit, Validation, and Scorecard - Research

**Researched:** 2026-03-22
**Domain:** Markdown workflow authoring — inserting Founder Fit, Pain to Validate (Matrix 5), and Scorecard output into the existing 25-section Claude workflow; creating 5PM-SCORECARD.md template
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Founder Fit tone & framing**
- Direct and blunt tone — "Why are YOU the right person for this?" No softening. Matches the 5PM confrontation spirit
- Three separate questions: background/expertise, market access/network, and why-you — not combined into one prompt
- Delta check against Step 1: AI quotes back the founder's previously captured advantages verbatim, then challenges whether their personal background supports those claims
- Step 2 captures *what* the advantages are; Step 3 Fit challenges *whether the founder can personally deliver on them*
- Passion check: "Do you love this problem?" — if answer is lukewarm or no, flag it as a red flag in the Scorecard but continue the sprint. The Scorecard reflects, it doesn't gatekeep
- Founder Fit is a non-blocking awareness lens — no lock cycle, no banner update, consistent with the 5PM philosophy from Phase 8

**Pain to Validate presentation**
- Summary matrix after all approaches are evaluated — NOT inline per approach
- Becomes Matrix 5 within the existing sequential matrix pattern (capstone of the approach evaluation block)
- Two dimensions: solution elegance (how perfectly and simply it solves the problem) and build speed (how fast to build)
- AI assesses both dimensions based on sprint data — founder does not self-score
- Uses the same label scale as other matrices (HIGH/MEDIUM/LOW) for consistency

**Scorecard format & verdicts**
- All 5 lenses, one verdict each: Problem (importance/urgency), Purchaser (tier/sophistication), Market (size/growth), Founder Fit (background/access/passion), Pain to Validate (elegance/speed)
- Verdict scale: FAVORABLE / CAUTION / UNFAVORABLE per lens
- Structured blocks per lens: verdict label, 2-3 bullet points of evidence from the sprint, 1-2 sentence rationale, and red flags (if any)
- English-only template for now — French Scorecard translation belongs in Phase 10/11
- Scorecard is a complete surprise at session end — zero foreshadowing, zero breadcrumbs during the sprint. First time the founder sees all signals assembled is in the output file

### Claude's Discretion
- Whether to include an overall summary verdict at the top of the Scorecard (beyond per-lens verdicts)
- Exact wording of the three Founder Fit questions
- How to format the Pain to Validate Matrix 5 within the existing matrix pattern
- Scorecard template layout details

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PFIT-01 | Sprint confronts the founder in Step 3 on background, market access, and why they are the right person to build this | New section `section_founder_fit` inserted before `section_approach_evaluation` in Step 3; three-question structure confirmed; non-blocking awareness pattern confirmed from Phase 8 |
| PFIT-02 | Sprint probes for Founder's Unique Advantage — audience, network, domain expertise | The three Fit questions explicitly target background/expertise, market access/network, and why-you; mapped to `scorecard_fit_background`, `scorecard_fit_access`, `scorecard_fit_passion` |
| PFIT-03 | Sprint asks "Do you love this problem?" as a direct founder-passion check | Third question in `section_founder_fit`; lukewarm/no answer captured as red flag in scorecard but does NOT block the sprint |
| PFIT-04 | Founder Fit is a delta check against existing advantages already captured in Step 1, not a duplicate elicitation | Section instruction: AI quotes `scorecard_purchaser_insight` and Capacity/Insight from Step 1 verbatim before asking Fit questions — challenges delivery capability, does not re-elicit |
| PAIN-01 | Sprint presents a Pain to Validate assessment per approach in Step 3 — time to MVP and pain of building | Matrix 5 placed after `section_approach_evaluation` (all matrices 1-4 complete); AI assesses elegance and build speed per approach using sprint data |
| PAIN-02 | Pain to Validate uses the existing sequential matrix pattern (Matrix 5 in approach evaluation) | Same ASCII 2x2 format, same "Wait for user to say next" cadence, same per-approach quadrant placement as Matrices 1-4; becomes the fifth matrix in `section_approach_evaluation` |
| SCRD-01 | Sprint produces a new output file `5PM-SCORECARD.md` with signal verdicts (FAVORABLE/CAUTION/UNFAVORABLE) per lens | New write instruction added to `section_write_outputs`; template created at `templates/5PM-SCORECARD.md` |
| SCRD-02 | Each lens block includes: signal label, evidence from the sprint, rationale, and red flags (if any) | Template design: five structured blocks, one per lens; each block has a fixed 4-part structure: verdict / evidence bullets / rationale sentence / red flags |
| SCRD-03 | Scorecard is written exclusively in `section_write_outputs` (zero-placeholder rule — no partial writes earlier) | All `scorecard_*` named fields captured silently during the session; assembly and write happen only in `section_write_outputs` alongside the existing 3 output files |
| SCRD-04 | Scorecard template exists at `templates/5PM-SCORECARD.md` | New template file at `get-your-shit-together/templates/5PM-SCORECARD.md`; English-only in Phase 9 |
</phase_requirements>

---

## Summary

Phase 9 adds three new deliverables to the English Foundation Sprint: a `section_founder_fit` awareness section in Step 3, Matrix 5 (Pain to Validate) as the capstone of `section_approach_evaluation`, and a new `5PM-SCORECARD.md` output written in `section_write_outputs`. No new technologies are introduced — this is pure markdown authoring that extends the established patterns from Phase 8.

The foundation is already in place: the six `scorecard_*` named fields from Phase 8 (problem, purchaser, market) are captured and waiting. Phase 9 adds five more fields (three for Founder Fit, one for Pain to Validate per approach, one for overall chosen-approach signal) and the write instruction that assembles them all into `5PM-SCORECARD.md`. The critical constraint is that no Scorecard content appears before `section_write_outputs` — the founder sees all five lenses for the first time as a complete assembled output at session end.

The highest-risk implementation decision is the insertion point for `section_founder_fit`. It must come BEFORE `section_approach_evaluation` (so Fit data is available during Pain to Validate scoring) but AFTER `section_context_reload` (so the context summary is already shown). Within `section_approach_evaluation`, Matrix 5 is appended after Matrix 4 in the existing sequential cadence — the most surgical change possible. The `section_write_outputs` modification adds a fourth write instruction (5PM-SCORECARD.md) alongside the existing three.

**Primary recommendation:** Insert `section_founder_fit` between `section_context_reload` and `section_approach_generation`, append Matrix 5 to `section_approach_evaluation` after the existing Matrix 4 instruction, and add Scorecard assembly + write to `section_write_outputs`. Capture five new named fields during the session.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown workflow file | N/A | Extend `foundation-sprint.md` with new section and modified sections | Same format as all 25 existing sections; Claude reads verbatim |
| ASCII 2x2 grid pattern | N/A | Render Matrix 5 (Pain to Validate) in `section_approach_evaluation` | Identical to Matrices 1-4 already in that section; no new syntax |
| Named field capture | N/A | Store Fit and Pain to Validate data at interaction time | Established project pattern from Phase 8; required for reliable Scorecard assembly |
| `section_write_outputs` write block | N/A | Add 4th output file write (5PM-SCORECARD.md) to sprint end | Same write-from-template pattern used for HYPOTHESIS.md, SPRINT.md, POSITIONING.md |

### Supporting

No libraries, npm packages, or build tooling required. This phase is static file authoring only.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Matrix 5 appended to `section_approach_evaluation` | Separate `section_pain_to_validate` section | Separate section is cleaner but breaks PAIN-02's "Matrix 5 within existing sequential matrix pattern" requirement; append is the locked decision |
| Non-blocking awareness for Founder Fit | Lock cycle with banner update | Lock cycle would add a sub-decision to Step 3 navigation, complicating go-back logic; non-blocking is consistent with the Phase 8 philosophy |
| Write Scorecard in `section_approach_recommendation` | Write Scorecard in `section_write_outputs` | Writing earlier breaks SCRD-03's zero-placeholder rule and violates the "complete surprise" requirement |

**Installation:** None.

---

## Architecture Patterns

### Current Step 3 Section Order (After Phase 8 — Step 3 sections only)

```
<step3_banner>
<section name="section_context_reload">        # Context summary + initial approach prompt
<section name="section_approach_generation">   # A1 (user's idea) + A2-A4 (AI-generated, filtered)
<section name="section_approach_evaluation">   # 4 matrices sequentially (Matrix 1-4)
<section name="section_approach_recommendation"> # Global pattern rec, user commits to chosen approach
```

### Phase 9 Step 3 Section Order (Target)

```
<step3_banner>
<section name="section_context_reload">        # UNCHANGED — context summary + initial approach prompt
<section name="section_founder_fit">           # NEW — Founder Fit awareness (3 questions, non-blocking)
<section name="section_approach_generation">   # UNCHANGED — A1-A4 finalized
<section name="section_approach_evaluation">   # MODIFIED — Matrix 1-4 unchanged + Matrix 5 appended
<section name="section_approach_recommendation"> # UNCHANGED — global rec + user commitment
```

And in `section_write_outputs`:

```
<section name="section_write_outputs">
  # MODIFIED — adds 4th write: 5PM-SCORECARD.md assembled from all scorecard_* fields
```

### New template file

```
get-your-shit-together/templates/5PM-SCORECARD.md   # NEW — English-only in Phase 9
```

### Named Fields: Full Inventory

Phase 8 established these fields (already in the workflow):
```
scorecard_purchaser_tier
scorecard_purchaser_insight
scorecard_problem_iu
scorecard_problem_iu_nudge
scorecard_market_research
scorecard_market_founder_perception
```

Phase 9 adds these fields:
```
scorecard_fit_background      # founder's background/expertise self-assessment + AI probe
scorecard_fit_access          # founder's market access/network + AI probe
scorecard_fit_passion         # founder's love-this-problem answer (yes / lukewarm / no)
scorecard_pain_matrix         # AI-scored Pain to Validate table (per approach: elegance / speed)
scorecard_chosen_approach     # the approach the founder committed to (from section_approach_recommendation)
```

Total scorecard fields available for assembly: 11

### Pattern 1: Founder Fit Awareness Section (Non-Blocking)

**What:** A named section that quotes Step 1 advantages back at the founder, then asks three direct questions about personal delivery capability. No lock cycle. No banner update. AI captures named fields. Transitions to `section_approach_generation`.

**When to use:** Immediately after `section_context_reload`, before approach generation — so Fit data is available when Pain to Validate scores are assigned in Matrix 5.

**Structural requirements (mandatory, do not deviate):**
1. Non-blocking instruction block at the top (same pattern as Phase 8 sections)
2. Entry context: quote Step 1 Capacity + Insight + Purchaser insight verbatim before asking anything
3. Three questions asked sequentially (NOT combined — locked decision)
4. Passion check is explicit: "Do you love this problem?" — not softened
5. Named field capture before transition
6. Transition to `section_approach_generation`

**Example structure:**

```markdown
<section name="section_founder_fit">

## Founder Fit (AWARENESS-04)

**IMPORTANT: This is a non-blocking awareness lens.**
- Do NOT announce a lock. Do NOT use "Got it — [thing] locked." phrasing.
- Do NOT re-render any step banner.
- Three questions, asked one at a time. Accept first response to each and move on.

**When entering this section:** Context reload is complete. Advantages from Step 1 are locked.

Before asking anything, recap what the founder already established in Step 1:

"Here's what you told me about yourself:

**Capacity:** [locked Capacity statement from Step 1]
**Insight:** [locked Insight statement from Step 1]

Now let's challenge whether you're the right person to execute on this.

**Question 1:** What's your background and expertise that directly supports building this? Not what you plan to learn — what do you already bring?"

Wait for response. Do not probe or push back.

"**Question 2:** How strong is your access to the people in this market? Do you have a network, an audience, or a direct line to potential customers?"

Wait for response. Do not probe or push back.

"**Question 3:** Do you love this problem? Not the solution — the problem itself. Would you be energized working on this for 3 years even if the revenue was slow to come?"

Wait for response. Do not probe or push back.

Store the following named fields for Scorecard assembly:
- **scorecard_fit_background** = "[founder's answer to Question 1 + any relevant context from Step 1 Capacity]"
- **scorecard_fit_access** = "[founder's answer to Question 2]"
- **scorecard_fit_passion** = "[yes / lukewarm / no — AI interpretation of Question 3 answer]"

Then proceed to section_approach_generation. Do not ask anything else in this section.

</section>
```

### Pattern 2: Matrix 5 Appended to section_approach_evaluation

**What:** After Matrix 4 (Growth Vision) is displayed, add Matrix 5 (Pain to Validate) in the same sequential pattern — AI scores all approaches on two dimensions (solution elegance × build speed), displays the ASCII 2x2 grid, waits for user to say "next."

**Key difference from Matrices 1-4:** The two axes for Matrix 5 are defined by the CONTEXT.md locked decision:
- X-axis: Build speed (Slow → Fast)
- Y-axis: Solution elegance (Partial → Perfect) — "how perfectly and simply it solves the problem"

**AI assessment rule:** AI scores both dimensions based on sprint data (approach description, founder Capacity from Step 1, the chosen differentiating axes from Step 2). The founder does NOT self-score.

**Label scale:** HIGH/MEDIUM/LOW for consistency with other matrices — but rendered as quadrant position in the ASCII 2x2.

**After Matrix 5:** Proceed immediately to `section_approach_recommendation` (no change to existing transition).

**Named field capture:** Store the full Matrix 5 assessment for Scorecard assembly:
- `scorecard_pain_matrix` = "[per-approach assessment: A1: elegance=X / speed=Y, A2: elegance=X / speed=Y, ...]"

**Example Matrix 5 block (to be appended to the end of section_approach_evaluation, after the Matrix 4 block):**

```markdown
---

**Matrix 5: Pain to Validate**
Axes: Build speed (Slow → Fast) × Solution elegance (Partial → Perfect)

For each approach: how fast can a working MVP be built given the founder's Capacity? How perfectly and simply does it solve the stated problem — not feature completeness, but problem-fit elegance?

[Explain each approach's quadrant placement, 1 sentence each]

[ASCII grid with A1/A2/A3/A4 placed in their quadrants]

Store the following for Scorecard assembly:
- **scorecard_pain_matrix** = "[per-approach: A1: elegance=X / speed=Y, A2: elegance=X / speed=Y, ...]"

After Matrix 5 is displayed: proceed immediately to section_approach_recommendation.
```

### Pattern 3: 5PM-SCORECARD.md Write Block in section_write_outputs

**What:** A fourth write instruction added to `section_write_outputs`, placed AFTER the existing three writes (HYPOTHESIS.md, SPRINT.md, POSITIONING.md). Assembles all 11 `scorecard_*` named fields into the structured five-lens template.

**Zero-placeholder rule (same as existing outputs):** No `[placeholder]` remains in the written file. Every field has real content from the session.

**Assembly instruction structure in section_write_outputs:**

```markdown
**4. Write 5PM-SCORECARD.md**

Read template for structure:
@~/.claude/get-your-shit-together/templates/5PM-SCORECARD.md

Write ./5PM-SCORECARD.md assembling the following named fields from this session:

**Lens 1 — Problem (scorecard_problem_iu, scorecard_problem_iu_nudge)**
- Verdict: FAVORABLE if Aspirin, CAUTION if Vitamin, UNFAVORABLE if Background noise or Emergency
- Evidence: [what was discussed about the problem classification]
- Rationale: [1-2 sentences from the I/U matrix context]
- Red flags: [if Vitamin nudge was shown (scorecard_problem_iu_nudge = yes): flag it]

**Lens 2 — Purchaser (scorecard_purchaser_tier, scorecard_purchaser_insight)**
- Verdict: FAVORABLE if B2B or B2B-leaning B2A, CAUTION if pure B2A or B2C with strong WTP signals, UNFAVORABLE if B2C with low WTP
- Evidence: [purchaser tier + tech-savviness + willingness to pay answers]
- Rationale: [scorecard_purchaser_insight verbatim or slightly expanded]
- Red flags: [if B2C with low WTP or B2E with no enterprise connections]

**Lens 3 — Market (scorecard_market_research, scorecard_market_founder_perception)**
- Verdict: FAVORABLE if growing signals + reachable, CAUTION if flat or mixed signals, UNFAVORABLE if declining or no online presence
- Evidence: [scorecard_market_research summary]
- Rationale: [scorecard_market_founder_perception + AI synthesis]
- Red flags: [if founder perception and research signals diverge significantly]

**Lens 4 — Founder Fit (scorecard_fit_background, scorecard_fit_access, scorecard_fit_passion)**
- Verdict: FAVORABLE if strong background + strong access + yes passion, CAUTION if 1-2 weak areas, UNFAVORABLE if two or more are weak/no
- Evidence: [founder's answers to the three Fit questions]
- Rationale: [AI synthesis of fit against the chosen approach]
- Red flags: [if scorecard_fit_passion = no or lukewarm — mandatory red flag per CONTEXT.md]

**Lens 5 — Pain to Validate (scorecard_pain_matrix, scorecard_chosen_approach)**
- Verdict: based on the chosen approach's quadrant in Matrix 5 — top-right = FAVORABLE, top-left or bottom-right = CAUTION, bottom-left = UNFAVORABLE
- Evidence: [Matrix 5 placement for the chosen approach]
- Rationale: [why elegance + speed pattern for the chosen approach matters]
- Red flags: [if chosen approach is bottom-left: flag build pain risk]

CRITICAL: Zero square brackets remain in 5PM-SCORECARD.md. All 5 lenses have real content.
```

### Pattern 4: scorecard_chosen_approach Capture in section_approach_recommendation

**What:** After the founder commits to their chosen approach in `section_approach_recommendation`, capture it as a named field for Scorecard assembly.

**Minimal modification:** Add a single named-field capture line after the existing "accept the user's choice" instruction:

```markdown
After user commits, store:
- **scorecard_chosen_approach** = "[A# — short name]"

Then re-render the Step 3 banner with the chosen approach locked: [existing banner instruction]
```

### Pattern 5: 5PM-SCORECARD.md Template

**What:** A new template file at `get-your-shit-together/templates/5PM-SCORECARD.md`. This is the structural scaffold that `section_write_outputs` reads to populate the Scorecard.

**Required sections (from CONTEXT.md locked decisions):**
- Header: date, sprint identifier
- Five lens blocks, each with: verdict label, evidence bullets, rationale, red flags
- (Claude's Discretion) Optional overall summary verdict at the top

**Template block format (one per lens):**

```markdown
## [Lens Name]

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [bullet 1]
- [bullet 2]
- [bullet 3 if applicable]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items]
```

### Anti-Patterns to Avoid

- **Asking Fit questions inside section_context_reload:** The context reload presents existing information; Fit challenges are confrontational and must be in their own section.
- **Combining the three Fit questions into one prompt:** CONTEXT.md explicitly locks three separate questions. Merging them softens the confrontation and prevents clean per-question field capture.
- **Matrix 5 inline per approach during section_approach_generation:** CONTEXT.md locks a summary matrix after all approaches are evaluated — NOT inline per approach.
- **Any Scorecard content before section_write_outputs:** Zero foreshadowing. No partial Scorecard. The founder's first view of assembled signals is the output file.
- **section_approach_recommendation writing the Scorecard:** It is tempting to write the Scorecard after the recommendation since all data is theoretically available — but SCRD-03 locks the write to `section_write_outputs` only.
- **Letting the passion check block the sprint:** If the founder says "no" to "Do you love this problem?", flag it in `scorecard_fit_passion = no` and proceed. The Scorecard reflects; it does not gatekeep.
- **Verdict formulas presented as rules in the template:** The template should show the verdict slot (`FAVORABLE / CAUTION / UNFAVORABLE`) but the synthesis logic lives in the `section_write_outputs` assembly instruction, not the template file itself.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Matrix 5 rendering | Custom table or list | Existing ASCII 2x2 pattern from Matrices 1-4 in section_approach_evaluation | Same rendering primitive; no new syntax; consistent visual language |
| Scorecard field storage | Mid-session recap or memory reconstruction | Named fields captured at each interaction point (scorecard_fit_*, scorecard_pain_matrix) | Context drift over hundreds of turns makes memory reconstruction unreliable — established pattern from Phase 8 |
| Scorecard assembly logic | Complex conditional branching in template | Assembly logic lives in `section_write_outputs` instruction prose; template is a structural scaffold only | Template complexity would confuse the write phase; instructions in the workflow section are the authoritative logic layer |
| Founder Fit detection | AI reasoning about whether founder "seems" right | Three explicit questions + three named field captures | Explicit capture prevents the AI from hallucinating or omitting Fit data during Scorecard assembly |

**Key insight:** Every rendering primitive needed for Phase 9 already exists in the workflow. The implementation task is prose authoring — inserting one new section, modifying two existing sections, and creating one template file.

---

## Common Pitfalls

### Pitfall 1: section_founder_fit Inserted After section_approach_generation

**What goes wrong:** Fit questions appear after approaches are finalized, but CONTEXT.md locks the ordering as "Founder Fit before approach evaluation so Fit data is available during Pain to Validate assessment." If Fit comes after approach generation, the AI cannot use Fit context to inform Matrix 5 scoring.
**Why it happens:** Developers default to "user knows their approaches before being confronted" — which is user-friendly but violates the 5PM sequencing logic.
**How to avoid:** Insertion point is explicit: between `section_context_reload` and `section_approach_generation`. Verify via grep that `section_founder_fit` appears before `section_approach_generation` in the file.
**Warning signs:** `section_founder_fit` appears on a higher line number than `section_approach_generation` in the file.

### Pitfall 2: Scorecard Written in section_approach_recommendation

**What goes wrong:** All five lenses have data by the time the founder commits to their approach. It is tempting to write the Scorecard there — but this produces a partial Scorecard mid-session, violating SCRD-03 and the "complete surprise" principle.
**Why it happens:** The natural implementation moment feels like "all data is available, write now."
**How to avoid:** The write instruction must live in `section_write_outputs` exclusively. Plan verification must grep for any "5PM-SCORECARD" or "Write ./5PM-SCORECARD" reference outside `section_write_outputs`.
**Warning signs:** Any text containing "5PM-SCORECARD.md" appears in `section_approach_recommendation` or elsewhere outside `section_write_outputs`.

### Pitfall 3: scorecard_chosen_approach Not Captured

**What goes wrong:** The Scorecard's Pain to Validate lens needs to identify which approach's Matrix 5 position to use for the verdict. If `scorecard_chosen_approach` is not captured, the `section_write_outputs` assembly instruction cannot reliably identify which approach was chosen from hundreds of turns ago.
**Why it happens:** `section_approach_recommendation` already re-renders the Step 3 banner with the chosen approach — developers assume this is sufficient for retrieval.
**How to avoid:** Add an explicit `scorecard_chosen_approach` named field capture line to `section_approach_recommendation` immediately after the user commits. This is a minimal change to an existing section.
**Warning signs:** `section_approach_recommendation` does not contain the text "scorecard_chosen_approach."

### Pitfall 4: Pain to Validate Axes Confused with Matrix 3 (Pragmatic Vision)

**What goes wrong:** Matrix 3 already has "Ease to build (Hard → Easy) × Speed to build (Slow → Fast)." Matrix 5 has "Solution elegance (Partial → Perfect) × Build speed (Slow → Fast)." The Y-axes are different — elegance is NOT the same as ease-to-build. Using Matrix 3's axes for Matrix 5 produces a duplicate instead of a new signal.
**Why it happens:** Both matrices reference "build speed" on one axis; it looks like a duplicate.
**How to avoid:** Matrix 5 Y-axis is "how perfectly and simply it solves the problem" — problem-fit elegance, not technical difficulty. Matrix 3 Y-axis is "ease to build" — developer effort. They are distinct. The plan must include an explicit axis definition for Matrix 5 that quotes the CONTEXT.md language verbatim.
**Warning signs:** Matrix 5 Y-axis description reads "ease to build" or "how hard to build" instead of "how perfectly and simply it solves the problem."

### Pitfall 5: Three Fit Questions Combined into One Prompt

**What goes wrong:** CONTEXT.md locks three separate questions. Combining them ("Tell me about your background, market access, and whether you love this problem?") softens the confrontation and makes it impossible to cleanly capture three distinct named fields.
**Why it happens:** Developers optimize for conversational brevity (one prompt = fewer turns).
**How to avoid:** Each question is a separate AI message, followed by a wait for response. Three turns, three captures. The plan must verify the section contains three distinct question blocks and three distinct named field capture lines.
**Warning signs:** `section_founder_fit` contains a single question with three sub-bullets.

### Pitfall 6: 5PM-SCORECARD.md Template Contains Assembly Logic

**What goes wrong:** The template file at `templates/5PM-SCORECARD.md` contains verdict formulas or conditional logic (e.g., "if Aspirin → FAVORABLE"). When the AI reads the template and tries to execute logic from it, the results are unpredictable.
**Why it happens:** Developers put logic in the template for "completeness."
**How to avoid:** The template is a structural scaffold only — it shows placeholder slots for verdict, evidence, rationale, red flags. All assembly logic lives in the `section_write_outputs` instruction prose in the workflow file.
**Warning signs:** The template file contains "if/then" or "FAVORABLE if" language.

---

## Code Examples

### section_founder_fit Non-Blocking Header (established pattern from Phase 8)

```markdown
**IMPORTANT: This is a non-blocking awareness lens.**
- Do NOT announce a lock. Do NOT use "Got it — [thing] locked." phrasing.
- Do NOT re-render any step banner.
- Three questions, asked one at a time. Accept first response to each and move on.
```

### Matrix 5 Axes Definition

Axis definitions to use verbatim in the workflow (derived from CONTEXT.md locked decisions):

```
**Matrix 5: Pain to Validate**
Axes: Build speed (Slow → Fast) × Solution elegance (Partial → Perfect)

Solution elegance means: how perfectly and simply does this approach solve the stated problem?
This is NOT about feature completeness — it is about problem-fit elegance.
Build speed means: how fast can a working MVP be built given the founder's stated Capacity?
```

### Matrix 5 Scoring Approach

AI scores both dimensions using only sprint data already captured — no new founder input needed:
- Elegance score derives from: approach description + how well it addresses the locked problem statement + differentiating axes (Step 2)
- Build speed score derives from: approach description + founder Capacity (Step 1) + any complexity signals in the approach

### 5PM-SCORECARD.md Template Structure

```markdown
# 5PM Scorecard

**Sprint date:** [date]
**Idea:** [one-line description of the idea from the sprint]

---

## Verdict Summary
<!-- Optional: Claude's Discretion on whether to include overall summary -->
[FAVORABLE / MIXED / UNFAVORABLE — overall pattern across all 5 lenses]

---

## Lens 1: Problem

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [point 1]
- [point 2]
- [point 3 if applicable]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items]

---

## Lens 2: Purchaser

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [point 1]
- [point 2]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items]

---

## Lens 3: Market

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [point 1]
- [point 2]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items]

---

## Lens 4: Founder Fit

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [point 1 — background/expertise]
- [point 2 — market access/network]
- [point 3 — passion check]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items — passion = no or lukewarm is mandatory red flag]

---

## Lens 5: Pain to Validate

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [chosen approach name and Matrix 5 placement]
- [elegance assessment]
- [build speed assessment]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items — bottom-left quadrant = build pain risk]
```

### Named Field Capture Format (established pattern — per Phase 8)

All captures follow this format, placed as the last instruction before the transition:

```markdown
Store the following named fields for Scorecard assembly:
- **scorecard_fit_background** = "[founder's answer to background question + Capacity delta]"
- **scorecard_fit_access** = "[founder's answer to market access question]"
- **scorecard_fit_passion** = "[yes / lukewarm / no — AI interpretation]"

Then proceed to section_approach_generation. Do not ask anything else in this section.
```

### section_write_outputs Modification Insertion Point

The 4th write block must be inserted after the existing 3rd write (POSITIONING.md) and before the "After all files are written" closing message. The closing message must be updated to list four files instead of three:

```markdown
**After all 4 files are written:**

"Done. Your Foundation Sprint is complete.

**Files written to your project directory:**
- `HYPOTHESIS.md` — your testable hypothesis
- `SPRINT.md` — the complete decision journal
- `POSITIONING.md` — your positioning map and manifesto
- `5PM-SCORECARD.md` — your 5PM signal scorecard

**Your next move:** [fastest validation test from the testable form]"
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Step 3 had no Founder Fit challenge | Phase 9 adds `section_founder_fit` with 3 direct questions using Step 1 data as delta | Founder confronted on personal delivery capability before evaluating approaches |
| Step 3 had 4 evaluation matrices | Phase 9 adds Matrix 5 (Pain to Validate) as the capstone | Approaches assessed on problem-fit elegance + build speed using sprint data |
| Sprint produced 3 output files | Phase 9 adds 4th output: `5PM-SCORECARD.md` | Founder receives assembled 5PM signal verdicts at session end |
| All 5PM signals captured but never assembled | Phase 9 assembles 11 named fields into a structured Scorecard | Phase 8 named-field investment pays off here |

**Note:** The "complete surprise" principle is intentional 5PM design — the founder should not be calibrating their answers toward a visible scorecard during the sprint.

---

## Open Questions

1. **Overall summary verdict at top of Scorecard**
   - What we know: CONTEXT.md marks this as Claude's Discretion
   - What's unclear: Whether a single overall verdict (FAVORABLE / MIXED / UNFAVORABLE) helps or clutters the output
   - Recommendation: Include it. An overall verdict gives the founder an immediate orientation before reading the five lenses. Label it "MIXED" when verdicts are not uniform. Place it in a brief summary block before Lens 1.

2. **Exact wording of the three Founder Fit questions**
   - What we know: CONTEXT.md marks exact wording as Claude's Discretion; tone must be direct and blunt
   - What's unclear: How blunt to make Q1 and Q2 (Q3 "Do you love this problem?" is explicitly locked)
   - Recommendation: Q1 — "What's your background and expertise that directly supports building this? Not what you plan to learn — what do you already bring?"; Q2 — "How strong is your access to the people in this market? Do you have a network, an audience, or a direct line to potential customers?"; Q3 — "Do you love this problem? Not the solution — the problem itself." These are direct without being hostile, and each maps cleanly to a named field.

3. **Matrix 5 format: sequential (one at a time) vs. displayed after Matrix 4**
   - What we know: CONTEXT.md locks "summary matrix after all approaches are evaluated" and "capstone of the approach evaluation block"; Pain to Validate uses "the existing sequential matrix pattern"
   - What's unclear: Whether "sequential" means Matrix 5 gets its own "wait for user to say next" beat, or is displayed immediately after Matrix 4 without a wait
   - Recommendation: Give Matrix 5 the same pattern as Matrices 1-4 — display it, then "After Matrix 5 is displayed: proceed immediately to section_approach_recommendation" (matching the existing transition after Matrix 4). This is consistent and requires no special handling.

4. **DISCARD RULE cascade: does section_founder_fit need an entry?**
   - What we know: Founder Fit is non-blocking and has no upstream dependencies in Step 3; there is no Step 3 navigation_controls equivalent that tracks go-back scenarios
   - What's unclear: Whether a founder who says "go back" from Step 3 would need to re-run Founder Fit
   - Recommendation: No DISCARD RULE update needed for Phase 9. Step 3 has no equivalent to Step 1's navigation_controls. The Step 2 navigation (section_step2_navigation) only handles axis selection and manifesto go-backs, not Step 3. If a founder goes back to Step 3 from Step 4, the entire Step 3 re-runs including section_founder_fit — no special cascade logic needed.

---

## Files to Modify / Create

| File | Change Type | What Changes |
|------|-------------|-------------|
| `get-your-shit-together/workflows/foundation-sprint.md` | Insert new section | `section_founder_fit` inserted between `section_context_reload` and `section_approach_generation` |
| `get-your-shit-together/workflows/foundation-sprint.md` | Append to existing section | Matrix 5 block appended to end of `section_approach_evaluation` (after Matrix 4) |
| `get-your-shit-together/workflows/foundation-sprint.md` | Minimal modification | `scorecard_chosen_approach` named field capture added to `section_approach_recommendation` |
| `get-your-shit-together/workflows/foundation-sprint.md` | Append to existing section | 4th write block (5PM-SCORECARD.md) added to `section_write_outputs`; closing message updated to list 4 files |
| `get-your-shit-together/templates/5PM-SCORECARD.md` | Create new file | English Scorecard template with 5 lens blocks |

Section count: 25 sections currently → 26 after Phase 9 (one new section added).

---

## Sources

### Primary (HIGH confidence)
- Direct read of `get-your-shit-together/workflows/foundation-sprint.md` — all 25 section names confirmed via grep; exact section text for `section_context_reload`, `section_approach_generation`, `section_approach_evaluation`, `section_approach_recommendation`, `section_write_outputs` read at lines 1060-1417; insertion points identified
- `.planning/phases/09-english-step-3-fit-validation-and-scorecard/09-CONTEXT.md` — all locked decisions, tone requirements, matrix structure, Scorecard format, and Claude's Discretion areas confirmed verbatim
- `.planning/phases/08-english-step-1-5pm-lenses/08-RESEARCH.md` — non-blocking awareness pattern, named-field capture format, and anti-patterns confirmed; Phase 9 reuses all Phase 8 structural patterns
- `.planning/REQUIREMENTS.md` — PFIT-01 through SCRD-04 verbatim confirmed
- `.planning/STATE.md` — Phase 9 scope and dependency on Phase 8 DISCARD RULE confirmed

### Secondary (MEDIUM confidence)
- `.planning/phases/08-english-step-1-5pm-lenses/08-01-PLAN.md` and `08-02-PLAN.md` — task structure and verification patterns from Phase 8 plans; used to inform plan structure recommendations
- `get-your-shit-together/templates/SPRINT.md` — zero-placeholder rule confirmed; pattern for "write from template" instructions confirmed

### Tertiary (LOW confidence)
- None required — all findings derived from direct codebase inspection and CONTEXT.md locked decisions

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new technologies; all patterns confirmed in live 25-section workflow
- Architecture: HIGH — all insertion points identified by section name and confirmed by line grep; all five files to modify/create identified
- Pitfalls: HIGH — all six pitfalls derived from direct inspection of the live workflow, CONTEXT.md locked decisions, and patterns established in Phase 8

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable domain — pure markdown authoring with no external dependencies)
