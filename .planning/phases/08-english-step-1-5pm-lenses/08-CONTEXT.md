# Phase 8: English Step 1 — 5PM Lenses - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Add Problem Important/Urgent matrix, Purchaser classification, and Market sizing to the English Foundation Sprint Step 1 as non-blocking awareness passes. No new lock cycles, no banner updates, no visible framework branding. Flow into Step 2 must remain uninterrupted.

</domain>

<decisions>
## Implementation Decisions

### Placement & pacing
- Step 1 flow becomes: Problem → Customer → **Problem I/U matrix** → **Purchaser** → Competitors → **Market sizing** → Advantages → Step 2
- Problem I/U matrix lands after problem+customer are locked, before competitor research — creates a natural checkpoint
- Purchaser lands right after Customer (natural pairing) — buyer type context is available before competitor search
- Market sizing lands after Competitors — benefits from competitive landscape context already gathered
- All three modules are quick pass: 1-2 questions each, ~2 minutes total — "awareness checkpoint" not deep dive
- No lock cycles, no banner updates for any of these modules

### Question framing
- Problem I/U: AI classifies the problem into the 2x2 quadrant based on what was discussed, shows the grid, asks "Does this feel right?"
- Use "vitamin vs aspirin" language from 5PM framework — founders know this concept
- Purchaser: Direct ask — "Who is the buyer? How tech-savvy are they? Are they willing to pay?"
- Present B2C/B2A/B2B/B2E with descriptions — B2A ("aspirational buyers" — photographers, bloggers, podcasters) must be explicitly defined in the workflow
- AI gives brief insight per answer (one sentence of relevant context, e.g., "B2A buyers are price-sensitive but passionate — good for community-driven products")
- Insights also saved for scorecard synthesis

### Market data display
- AI-researched market data presented as a 2-3 sentence prose summary
- Explicit caveat: "These are rough signals, not reliable TAM estimates. Validate with direct customer research."
- Proxy signals to search for: community sizes, job board volume, conference activity, subreddit subscribers, industry reports
- After showing AI research, ask founder: "Does this match your sense of the market? Growing, flat, or declining?"

### Value capture
- Named fields at capture time (e.g., scorecard_problem_iu, scorecard_purchaser_tier) — section_write_outputs assembles from these references, not memory reconstruction
- No mid-session recap — values captured silently, only surfaced in final 5PM-SCORECARD.md
- 5PM data lives exclusively in 5PM-SCORECARD.md — no cross-pollination to SPRINT.md, HYPOTHESIS.md, or POSITIONING.md
- If problem classified as "vitamin" (not urgent), add gentle nudge: "Vitamin problems are harder to sell — keep this in mind during differentiation" — but don't gate or block

### Claude's Discretion
- Exact wording of the 2x2 grid labels
- How many proxy signal searches to run (within reason — quick pass)
- Whether to combine Purchaser + willingness-to-pay into one question or two
- Named field naming convention (exact label format)

</decisions>

<specifics>
## Specific Ideas

- The I/U matrix should use Rob Walling's "vitamin vs aspirin" framing — it's a powerful mental model that resonates with founders
- B2A tier is the unusual one — most founders won't know what "aspirational buyer" means without an explicit definition and examples
- Market data must never look authoritative — web search for TAM is notoriously unreliable, so heavy hedging is appropriate
- Brief insights after each answer serve double duty: they validate the founder's thinking AND seed material for the scorecard

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-english-step-1-5pm-lenses*
*Context gathered: 2026-03-22*
