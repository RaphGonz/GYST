# Phase 2: The Basics (Step 1) - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Running `/gyst:foundation-sprint` delivers a clear onboarding, guides the user through Step 1 (client segment, problem, founder advantages, competitors), performs AI research to discover and validate competitors, and writes COMPETITORS.md to disk with the finalized competitor list. Navigation controls and iteration within Step 1 are included. Steps 2–4 are later phases.

</domain>

<decisions>
## Implementation Decisions

### Elicitation flow
- Open question first, then Claude reflects back 2-3 labeled options with an escape hatch ("Which fits, or how would you rephrase it?")
- If user's answer is vague/too broad: one sharpening probe, then accept whatever comes next — no repeated pushing
- Each sub-decision (client, problem, founder advantages, competitors) has its own visually distinct section with a numbered header (e.g., "--- 1 of 4: Customer Segment ---")
- Within each section, flow is conversational: open question → user responds → Claude proposes labeled options → user confirms or redirects

### Stage banners & progress
- Banner shows: step name + all 4 sub-decisions with their current state (locked values shown, pending shown as `[pending]`)
- Banner appears: when Step 1 opens AND after each sub-decision is confirmed/locked
- Visual format: divider lines + bold headers (not emoji-prefixed lines, not tables)
- Example structure:
  ```
  ─── Step 1: The Basics ───────────
  Customer:   solo founders
  Problem:    [pending]
  Advantages: [pending]
  Competitors:[pending]
  ──────────────────────────────────
  ```

### Research behavior
- Research discovers both types of competitors from the web:
  - Products/services claiming to solve the same problem
  - How people solve it today (workarounds, habits, status quo) — e.g., email was Slack's main competitor
- User may name zero competitors — research still runs to find them
- Competitors must actually solve THE stated problem. If research returns something that solves a different problem, it's not a valid competitor and should not be included
- If no valid competitors found after thorough search: Claude flags it and suggests the user review/refine the problem statement before proceeding. "No competitors" is treated as suspicious unless Claude is fully confident
- Research results are presented as a checklist (title + description per competitor, max 5 options) — user selects which to keep
- After selection, Claude asks which one is the main adversary — user picks from the confirmed list

### COMPETITORS.md format
- Flat list of all competitors (no "direct" vs "indirect" sections — that distinction is a discovery tool, not a file structure)
- File starts with a header: the customer segment and problem this sprint was scoped to
- Each competitor entry has structured fields: positioning, pricing, strengths, weaknesses, main_adversary (true/false)
- Up to 5 competitors total

### Claude's Discretion
- Exact wording of section headers and divider style
- How research findings are narrated during the "Researching..." moment
- Handling of edge cases in competitor discovery (e.g., very niche markets)
- Navigation control wording ("go back", "redo", "advance" — exact commands)

</decisions>

<specifics>
## Specific Ideas

- "Competitors are companies or ways of doing that solve the problem" — the defining criteria for inclusion
- "The main competitor of Slack was plain old emails" — indirect/workaround competitors are first-class competitors, not a separate category
- Checklist for competitor selection should feel like GSD's AskUserQuestion-style multi-select (title + description per item)
- If no competitors are found, Claude should probe with "how do people solve this today?" before concluding nothing exists

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-the-basics-step-1*
*Context gathered: 2026-02-25*
