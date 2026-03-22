# Phase 8: English Step 1 — 5PM Lenses - Research

**Researched:** 2026-03-22
**Domain:** Markdown workflow authoring — inserting non-blocking awareness sections into an existing 22-section Claude workflow file
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Placement & pacing**
- Step 1 flow becomes: Problem → Customer → **Problem I/U matrix** → **Purchaser** → Competitors → **Market sizing** → Advantages → Step 2
- Problem I/U matrix lands after problem+customer are locked, before competitor research — creates a natural checkpoint
- Purchaser lands right after Customer (natural pairing) — buyer type context is available before competitor search
- Market sizing lands after Competitors — benefits from competitive landscape context already gathered
- All three modules are quick pass: 1-2 questions each, ~2 minutes total — "awareness checkpoint" not deep dive
- No lock cycles, no banner updates for any of these modules

**Question framing**
- Problem I/U: AI classifies the problem into the 2x2 quadrant based on what was discussed, shows the grid, asks "Does this feel right?"
- Use "vitamin vs aspirin" language from 5PM framework — founders know this concept
- Purchaser: Direct ask — "Who is the buyer? How tech-savvy are they? Are they willing to pay?"
- Present B2C/B2A/B2B/B2E with descriptions — B2A ("aspirational buyers" — photographers, bloggers, podcasters) must be explicitly defined in the workflow
- AI gives brief insight per answer (one sentence of relevant context, e.g., "B2A buyers are price-sensitive but passionate — good for community-driven products")
- Insights also saved for scorecard synthesis

**Market data display**
- AI-researched market data presented as a 2-3 sentence prose summary
- Explicit caveat: "These are rough signals, not reliable TAM estimates. Validate with direct customer research."
- Proxy signals to search for: community sizes, job board volume, conference activity, subreddit subscribers, industry reports
- After showing AI research, ask founder: "Does this match your sense of the market? Growing, flat, or declining?"

**Value capture**
- Named fields at capture time (e.g., scorecard_problem_iu, scorecard_purchaser_tier) — section_write_outputs assembles from these references, not memory reconstruction
- No mid-session recap — values captured silently, only surfaced in final 5PM-SCORECARD.md
- 5PM data lives exclusively in 5PM-SCORECARD.md — no cross-pollination to SPRINT.md, HYPOTHESIS.md, or POSITIONING.md
- If problem classified as "vitamin" (not urgent), add gentle nudge: "Vitamin problems are harder to sell — keep this in mind during differentiation" — but don't gate or block

### Claude's Discretion
- Exact wording of the 2x2 grid labels
- How many proxy signal searches to run (within reason — quick pass)
- Whether to combine Purchaser + willingness-to-pay into one question or two
- Named field naming convention (exact label format)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROB-01 | Sprint presents an Important/Urgent 2x2 matrix for the user's problem in Step 1, classifying whether the problem is a vitamin or aspirin | ASCII 2x2 grid pattern confirmed in production for Steps 2 and 3; same rendering primitive applies; exact insertion point after section_problem identified |
| PROB-02 | Problem classification (important+urgent, important+not urgent, etc.) is captured and carried forward to the 5PM Scorecard | Named-field capture pattern (scorecard_problem_iu) confirmed as the project's mandated approach for context-drift prevention |
| PURC-01 | Sprint asks purchaser sophistication questions in Step 1 — tech adoption readiness, willingness to pay, and B2C/B2A/B2B/B2E classification | B2C/B2A/B2B/B2E hierarchy confirmed from official 5PM framework PDF; insertion point after section_customer identified |
| PURC-02 | B2A ("aspirational buyers" — photographers, bloggers, podcasters) is explicitly defined in the workflow so founders recognize the tier | Official 5PM framework definition confirmed; the B2A tier is the most unfamiliar tier to founders and requires an inline definition |
| PURC-03 | Purchaser classification is non-blocking — awareness pass, not a lock cycle | "Non-blocking awareness" structural definition is the critical plan decision this phase; no lock phrasing, no banner updates, one confirmatory question max per module |
| MRKT-01 | AI performs inline web research for market size and growth signals in Step 1 (proxy signals: community sizes, job board volume, conference activity) | Inline WebSearch already used in section_problem (RESEARCH-03); exact same invocation pattern; new invocation labeled RESEARCH-04 |
| MRKT-02 | Sprint asks the founder about ease of reaching customers (are they online?) and market maturity perception | One confirmatory question after market data display; same "Does this feel right?" framing as Problem I/U; no lock cycle |
| MRKT-03 | Market data is explicitly framed as estimates with ranges, not presented as confirmed facts | Market data reliability caveat is a locked decision; prose template provided in CONTEXT.md |
</phase_requirements>

---

## Summary

Phase 8 delivers three new named sections and one modified section in `get-your-shit-together/workflows/foundation-sprint.md`. The three new sections — `section_problem_importance`, `section_purchaser`, and `section_market_sizing` — add Problem I/U matrix, Purchaser classification, and Market sizing as non-blocking awareness passes in Step 1. The modified section is `navigation_controls`, whose DISCARD RULE cascade must list the new sections so that going back to an earlier sub-decision correctly discards downstream 5PM data.

No new technologies, libraries, or tooling are required. The entire implementation is prose authoring in Markdown. The Phase 8 deliverables are a direct extension of the existing workflow's pattern library: ASCII 2x2 grids (already in production for Step 2 and Step 3), inline WebSearch (already used in `section_problem`), and named field capture instructions (the project's established mechanism for cross-step data references). The English workflow grows from 22 to 25 named sections in this phase (3 new); Phases 9-11 add the remaining sections.

The single highest-risk decision in this phase is the structural definition of "non-blocking awareness." If the three new modules are written with lock phrasing, banner-render instructions, or probe loops, they degrade into independent sub-decisions and more than double Step 1's conversational length. The plan must define acceptance criteria for "non-blocking" before any prose is written: zero lock phrases, zero banner updates, one confirmatory response per module.

**Primary recommendation:** Write each new section as a named XML block with an explicit NO LOCK, NO BANNER RENDER instruction at the top, a single AI-generated display, one confirmatory question, a named-field capture line, and a transition to the next section.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown workflow file | N/A | Extend foundation-sprint.md with 3 new named sections | Same format as all existing 22 sections; Claude reads it verbatim |
| ASCII 2x2 grid pattern | N/A | Render Problem I/U matrix in section_problem_importance | Identical to the grids used in section_matrix_render (Step 2) and section_approach_evaluation (Step 3); no new syntax |
| Inline WebSearch | N/A | Market size and growth signals in section_market_sizing | Identical invocation to section_problem (RESEARCH-03); same caveat pattern |
| Named field capture | N/A | Store scorecard data at lock time (e.g., scorecard_problem_iu) | Established project pattern for long-context drift prevention; required by CONTEXT.md |

### Supporting

No libraries, npm packages, or build tooling required. This phase is static file authoring only.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Non-blocking awareness pass | Independent lock cycles per module | Lock cycles would add 4-6 new sub-decisions to Step 1, doubling session length — explicitly ruled out |
| Named-field capture | Memory reconstruction in section_write_outputs | Memory reconstruction fails after hundreds of conversational turns — explicitly ruled out by project-level decision |
| Inline WebSearch for market | Static TAM estimate in section text | Static figures go stale; inline search returns current signals — consistent with existing RESEARCH-03 pattern |

**Installation:** None.

---

## Architecture Patterns

### Current Step 1 Section Order (Baseline — 22 sections total)

```
<step1_banner>
<section name="section_customer">        # 1 of 4: Customer Segment
<section name="section_problem">         # 2 of 4: Core Problem (includes RESEARCH-03 inline WebSearch)
<section name="section_advantages">      # 3 of 4: Founder Advantages
<section name="section_competitors">     # 4 of 4: Competitors (user input)
<section name="section_competitors_research">  # Research invocation (RESEARCH-01)
<section name="section_main_adversary">  # Main adversary selection
<section name="write_competitors_md">    # Write COMPETITORS.md
<section name="navigation_controls">     # Step 1 exit + DISCARD RULE cascade
```

### Phase 8 Step 1 Section Order (After Phase 8 — 25 sections total)

```
<step1_banner>
<section name="section_customer">            # 1: Customer Segment (unchanged)
<section name="section_purchaser">           # NEW — Purchaser awareness pass (after customer)
<section name="section_problem">             # 2: Core Problem (unchanged — includes RESEARCH-03)
<section name="section_problem_importance">  # NEW — Problem I/U 2x2 awareness pass (after problem)
<section name="section_advantages">          # 3: Founder Advantages (unchanged)
<section name="section_competitors">         # 4: Competitors (unchanged)
<section name="section_competitors_research">  # Research invocation (unchanged)
<section name="section_main_adversary">      # Main adversary (unchanged)
<section name="write_competitors_md">        # Write COMPETITORS.md (unchanged)
<section name="section_market_sizing">       # NEW — Market sizing awareness pass (after competitors)
<section name="navigation_controls">         # MODIFIED — DISCARD RULE cascade updated
```

**Note:** The CONTEXT.md locked ordering places Purchaser after Customer (not after Problem). This is different from the milestone RESEARCH SUMMARY.md which had section_purchaser after section_customer and section_problem_importance after section_problem — that matches. Market sizing in CONTEXT.md goes after Competitors (not after section_problem_importance). This is the authoritative order.

### Pattern 1: Non-Blocking Awareness Section Structure

**What:** A named section that presents AI-generated information, asks one confirmatory question, captures a named field, and transitions — with no lock phrasing and no banner update.

**When to use:** All three new Phase 8 sections (`section_purchaser`, `section_problem_importance`, `section_market_sizing`).

**Example structure:**
```markdown
<section name="section_problem_importance">

## Problem Important/Urgent Check (AWARENESS-01)

**IMPORTANT: This is a non-blocking awareness pass.**
- Do NOT announce a lock. Do NOT use "Got it — [thing] locked." phrasing.
- Do NOT re-render the Step 1 banner.
- One confirmatory question only. Accept first response and move on.

**When entering this section:** Customer and Problem are already locked. Do not re-ask for them.

Based on the locked problem statement, classify the problem on the Important/Urgent 2x2:

```
         NOT URGENT        URGENT
IMPORTANT  [Vitamin]       [Aspirin]
           nice-to-have    must-have

NOT        [Background     [Emergency
IMPORTANT   noise]          but low value]
```

Place [locked problem] in the **[quadrant]** — [one-sentence rationale based on what was discussed].

> Vitamin problems are harder to sell — buyers don't feel urgency. Keep this in mind during differentiation.
> (Only show this nudge if classified as Vitamin/Important+Not Urgent.)

Does this feel right, or would you shift the classification?

Wait for response. Accept whatever the user says. Do not probe.

Store classification as: **scorecard_problem_iu** = "[quadrant label]"

Then proceed to section_advantages. Do not ask anything else in this section.

</section>
```

### Pattern 2: Purchaser Awareness Section

**What:** Direct ask for buyer characteristics — one or two questions covering tech adoption, willingness to pay, and B2C/B2A/B2B/B2E tier — with inline tier definitions and a brief AI insight after the user's answer.

**Key constraint:** B2A must be explicitly defined. Most founders do not know what "aspirational buyer" means without an example.

**Tier definitions to include inline:**
- **B2C** — consumers; highly price-sensitive; churn fast
- **B2A** — aspirational buyers (photographers, bloggers, podcasters, side-hustlers); emotionally invested; willing to pay if product matches their identity, but budgets are tight ($20-100/mo range)
- **B2B** — businesses buying for teams; budget exists; longer sales cycle; ROI-driven
- **B2E** — enterprise; large contracts; long cycle; high switching cost

**After user identifies tier:** Provide one sentence of relevant context (the "insight") and store:
- `scorecard_purchaser_tier` = "[B2C / B2A / B2B / B2E]"
- `scorecard_purchaser_insight` = "[one-sentence AI insight provided]"

### Pattern 3: Market Sizing Awareness Section (RESEARCH-04)

**What:** Inline WebSearch for market size and growth signals, presented as a 2-3 sentence prose summary with an explicit caveat, followed by one confirmatory question to the founder.

**Proxy signals to search for:**
- Community sizes (subreddits, Facebook groups, Discord servers)
- Job board volume (LinkedIn/Indeed for roles that suggest this market is active)
- Conference activity (named events, annual attendance)
- Industry reports (if publicly surfaced)

**Required framing:** Always present as a range, never a single figure. Always include the caveat line verbatim (from CONTEXT.md):
> "These are rough signals, not reliable TAM estimates. Validate with direct customer research."

**After showing research:** Ask the founder: "Does this match your sense of the market? Growing, flat, or declining?"

**Store:**
- `scorecard_market_research` = "[2-3 sentence prose summary]"
- `scorecard_market_founder_perception` = "[founder's response: Growing / Flat / Declining + their words]"

### Pattern 4: DISCARD RULE Cascade Update

**What:** `navigation_controls` lists sub-decisions a user can go back to, and specifies what downstream state gets wiped. Phase 8 adds three new awareness modules that capture named scorecard fields — these must be included in the cascade.

**Current cascade (verbatim from workflow lines 492-495):**
```
- User goes back to Customer segment: wipe Problem, Advantages, and Competitors. Re-run sections 1, 2, 3, and 4 in full.
- User goes back to Problem: wipe Advantages and Competitors. Re-run sections 2, 3, and 4 in full.
- User goes back to Founder advantages: wipe Competitors. Re-run sections 3 and 4 in full.
- User goes back to Competitors: wipe only the competitor selection and main adversary. Re-run section 4 in full.
```

**Required update (Phase 8 additions):**

The navigation menu must list the new modules so users know they can revisit them:
```
(Customer segment / Purchaser / Problem / Problem I/U classification / Founder advantages / Competitors / Market sizing)
```

The cascade examples must be updated:
```
- User goes back to Customer segment: wipe scorecard_purchaser_*, scorecard_problem_iu, Problem, Advantages, Competitors, scorecard_market_*. Re-run all Step 1 sections.
- User goes back to Purchaser: wipe scorecard_purchaser_*. Re-run section_purchaser only (Customer stays locked).
- User goes back to Problem: wipe scorecard_problem_iu, Advantages, Competitors, scorecard_market_*. Re-run from section_problem forward.
- User goes back to Problem I/U: wipe scorecard_problem_iu only. Re-run section_problem_importance only.
- User goes back to Founder advantages: wipe Competitors and scorecard_market_*. Re-run sections_advantages and forward.
- User goes back to Competitors: wipe competitor selection, main adversary, scorecard_market_*. Re-run section_competitors and section_market_sizing.
- User goes back to Market sizing: wipe scorecard_market_* only. Re-run section_market_sizing only.
```

### Anti-Patterns to Avoid

- **Lock phrasing in awareness sections:** Any "Got it — [X] locked." or "Locking [X]." in section_purchaser, section_problem_importance, or section_market_sizing is a bug. These modules capture named fields but never announce a lock.
- **Banner render in awareness sections:** Any instruction to re-render the Step 1 banner inside the three new sections is a bug. Banners only update when the four core Step 1 decisions are confirmed.
- **Probe loops:** Awareness sections ask one confirmatory question and accept the first response. No "push back once" logic. No sharpening probes.
- **Authoritative market figures:** Market sizing section must never present a single TAM figure as confirmed fact. Always ranges. Always caveated.
- **Partial scorecard assembly:** Named fields are captured as the user moves through the session. They are assembled and written only in `section_write_outputs`. No mid-session scorecard summary.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 2x2 grid rendering | Custom ASCII table | Existing 2x2 ASCII grid format from section_matrix_render | Same visual pattern already proven in production; no new syntax needed |
| Market research | Custom web search logic | Inline WebSearch, same pattern as RESEARCH-03 in section_problem | The pattern is already established, tested, and understood by Claude |
| Scorecard field storage | Memory reconstruction at write time | Named fields captured at interaction time (scorecard_problem_iu, scorecard_purchaser_tier, etc.) | Context drift over hundreds of turns makes memory reconstruction unreliable; named fields are the established project solution |

**Key insight:** Every rendering primitive needed for Phase 8 already exists in the workflow. The implementation task is prose authoring, not new pattern invention.

---

## Common Pitfalls

### Pitfall 1: Non-Blocking Awareness Written as a Lock Cycle
**What goes wrong:** The new sections include lock announcements, banner renders, or probe loops — identical to section_customer or section_problem — making Step 1 twice as long.
**Why it happens:** The pattern used for core Step 1 decisions is well-established and easy to copy; developers default to the familiar structure.
**How to avoid:** Each new section MUST begin with an explicit "IMPORTANT: This is a non-blocking awareness pass. Do NOT announce a lock. Do NOT re-render the Step 1 banner." instruction. Plan acceptance criteria: count new conversational turns, verify zero lock phrases, verify zero banner renders.
**Warning signs:** Any text containing "Got it — [X] locked", "These are locked", or "Re-render the Step 1 banner" inside section_purchaser, section_problem_importance, or section_market_sizing.

### Pitfall 2: DISCARD RULE Cascade Not Updated
**What goes wrong:** User goes back to "Problem" and the AI correctly wipes Problem but does not wipe scorecard_problem_iu — leaving a stale classification that feeds a wrong Scorecard.
**Why it happens:** The DISCARD RULE cascade in navigation_controls lists four sub-decisions by name; the new modules are not in the list and won't be automatically discarded.
**How to avoid:** The navigation_controls section update is a required Phase 8 deliverable alongside the three new sections. Include it in the same plan wave as the sections it governs.
**Warning signs:** The navigation menu still shows "(Customer segment / Problem / Founder advantages / Competitors)" without listing Purchaser, Problem I/U, or Market sizing.

### Pitfall 3: Market Data Presented as Authoritative
**What goes wrong:** AI presents a TAM figure ("The market is worth $4.2B") as fact — founders anchor on this number and stop doing customer research.
**Why it happens:** WebSearch returns press releases and analyst summaries that state figures confidently; the workflow must override that framing explicitly.
**How to avoid:** The section_market_sizing prose must include the caveat verbatim and present figures as a range. The plan must include verification that the section contains the word "estimate" or "rough signals" in the required caveat.
**Warning signs:** Market sizing output contains a single dollar figure with no range and no caveat.

### Pitfall 4: Scorecard Fields Not Named at Capture Time
**What goes wrong:** Phase 9 writes the 5PM-SCORECARD.md and the AI cannot reliably reconstruct what the user said about Purchaser or market perception from hundreds of turns ago.
**Why it happens:** Phase 8 implementors write the awareness sections without explicit named-field capture instructions, assuming the AI will remember.
**How to avoid:** Every awareness section in Phase 8 must end with explicit storage instructions: "Store as: **scorecard_problem_iu** = ..." These are the references Phase 9's section_write_outputs will use.
**Warning signs:** A new section's text ends with "proceed to the next section" with no named-field capture line.

### Pitfall 5: B2A Tier Not Defined
**What goes wrong:** Founder reads "B2A" in the Purchaser question, doesn't know what it means, picks a tier at random, and the Scorecard insight is wrong.
**Why it happens:** B2A (aspirational buyers) is a 5PM-specific tier — it does not appear in common B2C/B2B frameworks. Founders are unfamiliar with it.
**How to avoid:** section_purchaser must define all four tiers inline, with examples for B2A specifically. The plan deliverable is "B2A tier defined with examples (photographers, bloggers, podcasters)" — verify this is present in the final prose.
**Warning signs:** The section lists B2C / B2A / B2B / B2E without defining what B2A means.

---

## Code Examples

### 2x2 Grid (Existing Pattern — from section_matrix_render in Step 2)

The existing matrix format used in section_matrix_render (line ~712) for competitor positioning:
```
              [Left pole] ←——————————→ [Right pole]

  [Top pole]  ┌──────────┬──────────┐
              │          │          │
              │  (names) │  (names) │
              │          │          │
              ├──────────┼──────────┤
              │          │          │
              │  (names) │  (names) │
              │          │          │
  [Bot pole]  └──────────┴──────────┘
```

For Problem I/U matrix, the simpler 4-quadrant label format is appropriate (same as the 5PM PDF):
```
              NOT URGENT         URGENT
IMPORTANT   [ Vitamin          [ Aspirin
              nice-to-have ]     must-have ]

NOT         [ Background        [ Emergency
IMPORTANT     noise ]             low value ]
```

### Named-Field Capture Instruction Format

Each awareness section must end with explicit storage lines. Follow this pattern:

```markdown
Store the following named fields for Scorecard assembly:
- **scorecard_problem_iu** = "[quadrant label from the 2x2: Aspirin / Vitamin / Background noise / Emergency]"
- **scorecard_problem_iu_nudge** = "[yes/no — whether the vitamin nudge was shown]"

Then proceed to [next section name].
```

### Inline WebSearch Invocation (Existing Pattern — RESEARCH-03 in section_problem)

```markdown
Run an inline WebSearch to verify:
- [specific verification goal 1]
- [specific verification goal 2]

Search query to use: "[query template]"

After the search, evaluate what you found:

**If [condition A]:** [present result as X]
**If [condition B]:** [present result as Y]
```

For RESEARCH-04 (market sizing), the pattern adapts to:
```markdown
Run an inline WebSearch for market size and growth signals for this customer segment and problem.

Search query: "[customer segment] [problem] market size community growth 2024 2025"

Look for proxy signals: subreddit subscribers, community sizes, job postings volume, conference names and attendance, industry reports.

Present findings as a 2-3 sentence prose summary. Always use ranges, never single figures. Include:
> "These are rough signals, not reliable TAM estimates. Validate with direct customer research."
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Step 1 had 4 sub-decisions with lock+banner per decision | Phase 8 adds 3 awareness passes with zero lock+banner overhead | Step 1 remains navigable in a single session |
| Market data would be a static placeholder or omitted | Inline WebSearch (RESEARCH-04) fetches current proxy signals at run time | Each sprint gets fresh market signals, not stale estimates |
| Scorecard assembly deferred to write time from memory | Named fields captured at interaction time (scorecard_*) | Cross-step data references are reliable regardless of session length |

---

## Open Questions

1. **Exact ASCII grid style for Problem I/U matrix**
   - What we know: The existing Step 2 matrix uses box-drawing characters; simpler label-in-cell format is also used elsewhere
   - What's unclear: Whether to match the Step 2 box-drawing style or use the simpler 4-label format from the 5PM PDF
   - Recommendation: Use the simpler 4-label format (no box drawing) — the Problem I/U matrix is an awareness display, not an interactive positioning exercise; keep it lightweight

2. **Purchaser section: one question or two**
   - What we know: CONTEXT.md marks this as Claude's Discretion — "Whether to combine Purchaser + willingness-to-pay into one question or two"
   - What's unclear: Whether combining them risks overloading a single question or whether separating them adds unnecessary turns
   - Recommendation: Combine into one question — "Who is the buyer? How tech-savvy are they, and are they willing to pay?" — and accept a multi-part answer. This keeps the section to one AI display + one user response, matching the non-blocking awareness target.

3. **Named field label format**
   - What we know: CONTEXT.md marks exact label format as Claude's Discretion; examples given are scorecard_problem_iu and scorecard_purchaser_tier
   - What's unclear: Whether to use snake_case (scorecard_problem_iu) or include the section name (section_purchaser_tier) for disambiguation
   - Recommendation: Use `scorecard_` prefix + short descriptor in snake_case (scorecard_problem_iu, scorecard_purchaser_tier, scorecard_purchaser_insight, scorecard_market_research, scorecard_market_founder_perception). Five fields total for Phase 8.

4. **Market sizing section placement — after write_competitors_md or before?**
   - What we know: CONTEXT.md locks market sizing "after Competitors" to benefit from competitive landscape context
   - What's unclear: Whether it goes between section_main_adversary and write_competitors_md, or after write_competitors_md
   - Recommendation: Place section_market_sizing immediately after write_competitors_md and before navigation_controls. This means the competitor research is fully complete (including the COMPETITORS.md file) before market sizing runs, giving the AI maximum context for the search query.

---

## Sources

### Primary (HIGH confidence)
- Direct read of `get-your-shit-together/workflows/foundation-sprint.md` (1,268 lines, 22 named sections) — all integration points confirmed at line level: section_customer (line 86), section_problem (line 136), section_advantages (line 209), section_competitors (line 335), navigation_controls (line 456); DISCARD RULE cascade verbatim at lines 492-495
- `.planning/research/SUMMARY.md` — v1.2 milestone research; all 5PM framework findings, section insertion order, critical pitfalls, and named-field capture rationale confirmed
- `08-CONTEXT.md` — all locked decisions, question framing, market data display rules, and value capture instructions
- `REQUIREMENTS.md` — PROB-01, PROB-02, PURC-01, PURC-02, PURC-03, MRKT-01, MRKT-02, MRKT-03 verbatim

### Secondary (MEDIUM confidence)
- `.planning/ROADMAP.md` — Phase 8 success criteria and dependency chain (Phase 7 must be complete first; Phase 9 depends on Phase 8 DISCARD RULE being in place)
- `.planning/STATE.md` — confirmed blocker: "Non-blocking awareness structural definition must be resolved in plan as acceptance criteria before prose is written"
- Direct read of existing SPRINT.md template — confirms zero-placeholder rule and zero cross-pollination requirement

### Tertiary (LOW confidence — not required for Phase 8)
- Rob Walling 5PM framework PDF and podcast transcript — sourced and evaluated in `.planning/research/SUMMARY.md`; Phase 8 only needs the B2C/B2A/B2B/B2E tier definitions and the I/U 2x2 quadrant labels, which are fully documented in CONTEXT.md and SUMMARY.md

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new technologies; all patterns confirmed in the live 22-section workflow
- Architecture: HIGH — section insertion points confirmed at exact line numbers; DISCARD RULE cascade located at lines 489-495; all four deliverables identified
- Pitfalls: HIGH — all five pitfalls derived from direct inspection of the live workflow, the CONTEXT.md locked decisions, and the STATE.md recorded blockers

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable domain — pure markdown authoring with no external dependencies)
