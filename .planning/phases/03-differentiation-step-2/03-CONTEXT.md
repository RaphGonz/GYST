# Phase 3: Differentiation (Step 2) - Context

**Gathered:** 2026-02-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver Step 2 of the Foundation Sprint workflow: user rates their dream company on bipolar axes, AI scores each competitor from COMPETITORS.md profiles (no re-searching), 2x2 matrix is plotted, positioning conflicts are detected and resolved, and the user writes the mini-manifesto. Phase ends with a summary block and navigation to Step 3.

</domain>

<decisions>
## Implementation Decisions

### Axis rating UX
- All 8 standard bipolar axes presented at once as a numbered labeled list
- Rating scale: -5 to +5 on each axis, with pole labels shown on both ends (e.g., `-5 = Price ←→ Quality = +5`)
- After rating, user picks the 2 differentiating axes freely — no AI suggestion, user's own judgment
- Custom axes: an optional but prominent step after the standard 8 — both the user AND the AI propose domain-specific axes (AI analyzes the space and suggests 1-2 relevant ones based on the industry/competitors from COMPETITORS.md)
- After the user locks their 2 differentiating axes: re-render the Step 2 banner with the chosen X-axis, Y-axis, and the dream company's position — same lock pattern as Step 1

### 2x2 matrix rendering
- ASCII art grid with competitor names placed inside their quadrant based on scores
- No coordinates in the grid — names only, placed spatially
- Short names pulled from COMPETITORS.md as-is (truncated to fit if needed)
- Below the matrix: a brief rationale section — one line per competitor explaining their placement with a reference to the key profile detail that drove the score
- Dream company always labeled "You" in the top-right region

### Competitor scoring transparency
- As AI derives scores from COMPETITORS.md profiles, display each competitor's scores with a 1-line rationale inline: `CompA: X-axis +2, Y-axis -3 — [key profile detail]`
- No user override — scores are derived from existing research profiles; trust the AI
- Low-data handling: if a profile lacks sufficient evidence for an axis, score 0 (neutral center) and flag it explicitly (`CompA Y-axis: 0 — limited data`)
- Conflict detection: if any competitor lands in the top-right quadrant (same space as the dream company), flag the conflict with a clear explanation of why it matters, then require the user to go back and select different axes — no option to continue with the conflict

### Mini-manifesto flow
- User writes all 3 phrases (2 differentiators + 1 safeguard) freely as open text
- After submission, AI gives a single holistic evaluation of all 3 phrases together — not phrase-by-phrase critique
- After the manifesto is locked: show a Step 2 summary block (chosen axes, dream company position, matrix overview, manifesto) followed by a navigation menu — A) Continue to Step 3, B) Go back

### Claude's Discretion
- Exact axis labels and their order in the standard 8 (source from the book/framework)
- How the ASCII grid scales to accommodate varying numbers of competitors
- Visual formatting of the -5 to +5 rating display (inline scale vs just the number)
- Exact wording of conflict detection message and the prompt to re-select axes

</decisions>

<specifics>
## Specific Ideas

- The -5 to +5 rating should be presented so users can see both poles simultaneously when rating — not just a number prompt
- The Step 2 banner lock should feel like a mirror image of Step 1's lock: clear, structured, shows locked values in a repeatable format
- No additional web searching occurs in Step 2 — all competitor scoring is derived from profiles already captured in Step 1; this is a hard constraint

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-differentiation-step-2*
*Context gathered: 2026-02-26*
