# Phase 9: English Step 3 — Fit, Validation, and Scorecard - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Step 3 of the English Foundation Sprint confronts the founder on personal fit, validates each approach against build pain (Pain to Validate), and assembles a 5PM-SCORECARD.md output file at session end. Depends on Phase 8 — scorecard field names from Step 1 must exist before Scorecard assembly.

</domain>

<decisions>
## Implementation Decisions

### Founder Fit tone & framing
- Direct and blunt tone — "Why are YOU the right person for this?" No softening. Matches the 5PM confrontation spirit
- Three separate questions: background/expertise, market access/network, and why-you — not combined into one prompt
- Delta check against Step 1: AI quotes back the founder's previously captured advantages verbatim, then challenges whether their personal background supports those claims
- Step 2 captures *what* the advantages are; Step 3 Fit challenges *whether the founder can personally deliver on them*
- Passion check: "Do you love this problem?" — if answer is lukewarm or no, flag it as a red flag in the Scorecard but continue the sprint. The Scorecard reflects, it doesn't gatekeep
- Founder Fit is a non-blocking awareness lens — no lock cycle, no banner update, consistent with the 5PM philosophy from Phase 8

### Pain to Validate presentation
- Summary matrix after all approaches are evaluated — NOT inline per approach
- Becomes Matrix 5 within the existing sequential matrix pattern (capstone of the approach evaluation block)
- Two dimensions: solution elegance (how perfectly and simply it solves the problem) and build speed (how fast to build)
- AI assesses both dimensions based on sprint data — founder does not self-score
- Uses the same label scale as other matrices (HIGH/MEDIUM/LOW) for consistency

### Scorecard format & verdicts
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

</decisions>

<specifics>
## Specific Ideas

- Pain to Validate is NOT about technical difficulty — it's about "how perfectly and simply it solves the problem" combined with "how fast is it to build." Think best bang for the buck
- The Scorecard write happens exclusively in section_write_outputs — no partial Scorecard appears earlier (zero-placeholder rule)
- Founder Fit section goes before approach evaluation in Step 3 — challenge the founder on themselves before evaluating approaches, so Fit data is available during Pain to Validate assessment

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 09-english-step-3-fit-validation-and-scorecard*
*Context gathered: 2026-03-22*
