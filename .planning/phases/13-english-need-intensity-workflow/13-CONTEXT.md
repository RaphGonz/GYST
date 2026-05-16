# Phase 13: English Need Intensity Workflow - Context

**Gathered:** 2026-05-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Add a Need Intensity scoring section to the English Foundation Sprint Step 1 (foundation-sprint.md), immediately after the user states their client and problem. Also produce a NEED-INTENSITY.md output file at session end. The phase covers the scoring interaction, web search calibration, formula computation, and the below-1000 advisory loop. Other sprint steps, other languages, and the competitor search (which is reused from Need Intensity) are out of scope here.

</domain>

<decisions>
## Implementation Decisions

### Dimension rating flow
- AI introduces the Need Intensity concept before showing the dimensions — one paragraph explaining what it measures and why it matters before the list appears
- All 6 dimensions are shown at once in a formatted block; user rates all 6 in a single response (not one-by-one)
- Each dimension entry shows: name, plain-English definition, why it matters for purchasing behavior, and inline 0/10 anchors (both extremes defined as concrete examples)
- Per-dimension negotiation happens AFTER the web search, not during the initial rating — AI needs search evidence to justify calibration

### Calibration transparency
- AI shows both the specific search finding AND the reasoning per dimension: e.g. "I found 3 dominant tools (Notion, Coda, Obsidian) — the solution space is not neglected. I'd rate Neglected at 3, not your 8. Agree?"
- Calibration is downward only — AI can only propose lower ratings, never higher (conservative by default)
- If no clear evidence is found for a dimension: keep the user's original rating and say so explicitly ("I didn't find strong signals on Urgency — keeping your rating of 7")
- Per-dimension exchange: user proposes a rating → AI responds conservatively (after search) → AI asks if user agrees → if yes, AI's rating is taken; if no, user's original rating is taken

### Below-1000 advisory loop
- When score falls below 1,000: AI suggests both a tighter client segment AND a problem reframe (two distinct suggestions, one of each)
- First-pass ratings are done entirely by the user
- On re-rate (after a reframe): AI does the full 6-dimension re-rating itself — user only decides which reframe to pursue, not the scores
- If score is still below 1,000 after a re-rate: AI re-rates again (not user) — maximum 5 reframe loops total
- After 5 loops without crossing 1,000: AI recommends the highest-scoring attempt with rationale ("Your best framing was [X] at [score]. Here's why it's worth proceeding: [reasoning]") — user then decides whether to proceed or stop the sprint

### Claude's Discretion
- Exact formatting/layout of the 6-dimension block (table vs. numbered list vs. definition list)
- How competitor data is stored internally for reuse in COMPETITORS.md (a variable, a named section, etc.)
- Exact structure and length of NEED-INTENSITY.md output file (must contain all required fields per success criteria, layout is Claude's call)

</decisions>

<specifics>
## Specific Ideas

- The advisory loop is advisory, not blocking — user can always choose to proceed even below 1,000
- The flow should feel like a structured conversation, not a form — AI reasons out loud, not just outputs scores
- Competitor names from the Need Intensity web search must be stored and reused for COMPETITORS.md later in Step 1 — the competitor search must not run a second time

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 13-english-need-intensity-workflow*
*Context gathered: 2026-05-16*
