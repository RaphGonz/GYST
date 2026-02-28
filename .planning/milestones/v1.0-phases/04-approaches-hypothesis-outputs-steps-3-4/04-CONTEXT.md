# Phase 4: Approaches + Hypothesis + Outputs (Steps 3-4) - Context

**Gathered:** 2026-02-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Step 3 opens with context reload (founder Capacity + Insight advantages and chosen differentiating axes), user proposes their initial approach first, AI generates 3-4 total approaches filtered by founder fit, all approaches are evaluated across 4 fixed matrices, user commits to the strongest approach, formulates the full hypothesis, derives the testable form, and all three output files are written to disk. Navigation and Step 1–2 content are previous phases; this phase closes the sprint end-to-end.

</domain>

<decisions>
## Implementation Decisions

### Approach generation flow
- Step 3 opens by displaying the reloaded Capacity + Insight advantages and chosen axes, then opens the floor: "What's your initial approach idea?" — full context visible before user types
- After user proposes, AI probes with 1-2 clarifying questions to sharpen the approach before recording it as Approach 1
- Additional approaches are proposed one at a time; user reacts (keep/drop) until 3-4 total approaches are finalized
- Approaches that don't fit founder Capacity or Insight are silently excluded — user only sees viable options, no mention of filtered candidates

### Matrix evaluation (4 fixed matrices)
- **Customer vision**: Ease to use × How perfectly it solves the problem
- **Money vision**: Recurring revenues long term × Number of customers
- **Pragmatic vision**: Ease to build × How fast to build
- **Growth vision**: Adaptability × Number of customers
- Evaluation is matrix by matrix (not all at once) — AI walks through each of the 4 matrices sequentially
- Each matrix renders as an ASCII 2x2 grid with approach labels plotted on the quadrant
- After all 4 matrices: AI immediately identifies and recommends the approach with the strongest global pattern across matrices, naming the second-best as backup
- User can override freely — AI acknowledges and moves forward without pushback

### Hypothesis construction
- AI pre-fills the full hypothesis template from context captured in Steps 1-3 (segment, problem, chosen approach, differentiating axes, main competitor) — user edits any slot they disagree with
- Template: "If we help X solve Y with Z, they will choose us over W because we are U and V"
- After hypothesis is confirmed, AI derives all 4 testable form components automatically: success metric, falsification condition, main risk, fastest validation test
- User can iterate on individual slots freely until explicitly locking ("lock it" or equivalent) — sprint never auto-advances from hypothesis

### Step 3 → Step 4 transition
- Transition marked by a visible step banner: "Step 4: Hypothesis" — user sees a clear stage change after approach is committed

### Output files
- **HYPOTHESIS.md**: hypothesis statement + 4 testable form components only — clean reference document
- **SPRINT.md**: full sprint summary capturing all decisions across all 4 steps (segment, problem, founder advantages, competitors, differentiating axes, chosen approach, final hypothesis)
- **POSITIONING.md**: positioning statement + competitive context showing where the chosen approach sits relative to top competitors on the chosen differentiating axes
- All 3 files written together at sprint end — clear endpoint ceremony, not incremental

### Claude's Discretion
- Exact wording of the approach probe questions
- How "keep/drop" reactions are prompted during one-at-a-time approach generation
- Formatting and visual style of each file beyond structure specified above

</decisions>

<specifics>
## Specific Ideas

- No specific references or examples raised — open to standard approaches within the decisions above

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-approaches-hypothesis-outputs-steps-3-4*
*Context gathered: 2026-02-27*
