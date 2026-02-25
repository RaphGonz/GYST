# Phase 2: The Basics (Step 1) - Research

**Researched:** 2026-02-25
**Domain:** Claude Code markdown workflow authoring — multi-turn conversational sprint with AI-guided elicitation, web research, and file output
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Elicitation flow:**
- Open question first, then Claude reflects back 2-3 labeled options with an escape hatch ("Which fits, or how would you rephrase it?")
- If user's answer is vague/too broad: one sharpening probe, then accept whatever comes next — no repeated pushing
- Each sub-decision (client, problem, founder advantages, competitors) has its own visually distinct section with a numbered header (e.g., "--- 1 of 4: Customer Segment ---")
- Within each section, flow is conversational: open question → user responds → Claude proposes labeled options → user confirms or redirects

**Stage banners and progress:**
- Banner shows: step name + all 4 sub-decisions with their current state (locked values shown, pending shown as `[pending]`)
- Banner appears: when Step 1 opens AND after each sub-decision is confirmed/locked
- Visual format: divider lines + bold headers (not emoji-prefixed lines, not tables)
- Example structure:
  ```
  --- Step 1: The Basics -------------------
  Customer:   solo founders
  Problem:    [pending]
  Advantages: [pending]
  Competitors:[pending]
  ------------------------------------------
  ```

**Research behavior:**
- Research discovers both types of competitors from the web:
  - Products/services claiming to solve the same problem
  - How people solve it today (workarounds, habits, status quo) — e.g., email was Slack's main competitor
- User may name zero competitors — research still runs to find them
- Competitors must actually solve THE stated problem. If research returns something that solves a different problem, it is not a valid competitor and should not be included
- If no valid competitors found after thorough search: Claude flags it and suggests the user review/refine the problem statement before proceeding. "No competitors" is treated as suspicious unless Claude is fully confident
- Research results are presented as a checklist (title + description per competitor, max 5 options) — user selects which to keep
- After selection, Claude asks which one is the main adversary — user picks from the confirmed list

**COMPETITORS.md format:**
- Flat list of all competitors (no "direct" vs "indirect" sections — that distinction is a discovery tool, not a file structure)
- File starts with a header: the customer segment and problem this sprint was scoped to
- Each competitor entry has structured fields: positioning, pricing, strengths, weaknesses, main_adversary (true/false)
- Up to 5 competitors total

### Claude's Discretion
- Exact wording of section headers and divider style
- How research findings are narrated during the "Researching..." moment
- Handling of edge cases in competitor discovery (e.g., very niche markets)
- Navigation control wording ("go back", "redo", "advance" — exact commands)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SPRINT-01 | User can start a Foundation Sprint from scratch with `/gyst:foundation-sprint` | Workflow replaces the stub in `get-your-shit-together/workflows/foundation-sprint.md`; slash command wrapper already installed in Phase 1 |
| SPRINT-02 | Step 1 — User identifies and selects a target customer segment from AI-generated options | Open question → labeled options pattern; implemented as conversational turns in the workflow |
| SPRINT-03 | Step 1 — User identifies and selects the core problem/pain point from AI-generated options | Same open question → labeled options pattern as SPRINT-02, same section format |
| SPRINT-04 | Step 1 — AI verifies client-problem fit (is this pain real, critical, and frequent for this specific client?) | Inline validation via WebSearch within the workflow; confirmed before locking the problem |
| SPRINT-05 | Step 1 — User articulates founder advantages across three dimensions: Capacity, Insight, Motivation; AI pushes back until each is a concrete, specific assertion | Pushback loop pattern: Claude rejects vague claims and collaboratively rephrases until specific |
| SPRINT-06 | Step 1 — User maps direct and indirect competitors and identifies the main adversary | Research via gyst-researcher agent + checklist selection + main adversary pick |
| INTER-01 | Sprint opens with a clear onboarding message explaining the 4 steps, the no-brainstorm method, and what the session produces | Opening banner + onboarding block at top of workflow; written once at sprint start |
| INTER-02 | At each step, AI asks open freeform questions first, then proposes a concrete set of options | The open-then-options pattern is the core interaction model — implemented in each sub-decision section |
| INTER-03 | Stage banners and progress indicators clearly show which step is active and what has been decided so far | Banner rendered as markdown with divider lines and bold labels; re-emitted after each lock |
| NAVIG-01 | At the end of each step, user is presented with three options: iterate, advance, or go back | Navigation menu using labeled options at the bottom of each step |
| NAVIG-02 | When user goes back, all downstream decisions and outputs are discarded and rebuilt | Workflow explicitly instructs Claude to discard prior locked values and restart from the target sub-decision |
| NAVIG-03 | Each step loops until user explicitly chooses to advance — never auto-advanced | The workflow uses explicit "advance" confirmation before proceeding |
| RESEARCH-01 | During Step 1, AI researches the identified competitors (direct and indirect) via web search | gyst-researcher agent spawned (or inline WebSearch) after competitor names are provided |
| RESEARCH-03 | During Step 1, AI validates the proposed customer segment and pain point | Validation step in the problem section using WebSearch to confirm pain is real, critical, frequent |
| OUTPUT-04 | `COMPETITORS.md` produced at end of Step 1 — fixed competitor list (max 5, main adversary flagged) with research profiles | Write tool writes the file using the existing COMPETITORS.md template; used by Step 2 for axis rating |

</phase_requirements>

---

## Summary

Phase 2 is an **authoring phase**: the primary deliverable is replacing the stub `get-your-shit-together/workflows/foundation-sprint.md` with a complete, working workflow, and filling in the stub `get-your-shit-together/agents/gyst-researcher.md` with its full operating instructions. No new infrastructure is created — everything installs from the existing Phase 1 scaffolding. The work is almost entirely writing markdown that Claude Code reads and executes as a conversation.

The workflow pattern is well-established in this project: GYST follows the same markdown-workflow model as GSD. A Claude Code workflow is a structured markdown document with `<step>` blocks, explicit decision-point instructions, and `Write` tool calls to produce output files. Multi-turn conversations are handled natively by Claude Code — the workflow instructs Claude how to behave over multiple turns, and Claude maintains conversation state in-context. There is no binary state management required. The `gyst-researcher` agent fills in via sub-agent spawning (Task call) or inline WebSearch — the workflow must specify which approach.

The central design challenge of this phase is writing workflow instructions precise enough that Claude reliably: (1) emits the correct banner format on each lock, (2) offers the open-then-options elicitation pattern consistently across all 4 sub-decisions, (3) invokes research at the right moment, (4) validates problem-market fit before locking, and (5) writes a complete COMPETITORS.md before declaring Step 1 done. The "go back" navigation — which discards and rebuilds — must be clearly instructed or Claude will try to patch values instead.

**Primary recommendation:** Write the workflow as a single well-structured markdown document with one named `<section>` per sub-decision. Each section has the same structural template: banner, open question, options, lock, validation (where applicable), banner refresh. Navigation comes after all 4 sections lock. The gyst-researcher agent runs after competitor names are collected and before the selection checklist is shown.

---

## Standard Stack

### Core

| Library/Tool | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Claude Code markdown workflows | Current | The entire interaction model — workflow `.md` files contain the sprint logic | This is GYST's architecture — established in Phase 1, same as GSD |
| Claude Code `Write` tool | Current | Write COMPETITORS.md to disk | The only way a workflow produces output files |
| Claude Code `WebSearch` tool | Current | Competitor discovery and problem validation | Already declared in `allowed-tools` of the slash command; no additional setup |
| Claude Code `WebFetch` tool | Current | Fetch specific competitor pages for detailed profiles | Already declared in `allowed-tools`; supplements WebSearch |
| Claude Code `Read` tool | Current | Read COMPETITORS.md template when writing output | Template is at `~/.claude/get-your-shit-together/templates/COMPETITORS.md` |
| gyst-researcher agent | Stub (Phase 2 fills) | Sub-agent that does competitor research and returns structured profiles | Agent file already exists; Phase 2 writes its full instructions |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Task sub-agent spawning | Delegate competitor research to gyst-researcher | When research is substantial enough to benefit from dedicated context |
| Inline WebSearch | Lightweight validation queries | Quick "is this pain real" checks that don't need a dedicated agent |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Spawning gyst-researcher as sub-agent | Inline WebSearch in main workflow | Sub-agent gives gyst-researcher dedicated context, better research quality; inline is simpler but clutters the main conversation thread |
| Flat workflow with if/else branches | Modular `<section>` blocks | Modular sections are easier to maintain and match the 4-sub-decision structure exactly |

**Installation:** No new packages required. All tools are built into Claude Code and declared in the existing slash command wrapper.

---

## Architecture Patterns

### Recommended Project Structure

Phase 2 modifies two existing files. No new files or directories are created:

```
get-your-shit-together/
├── workflows/
│   └── foundation-sprint.md     # STUB → FULL WORKFLOW (this is the main deliverable)
└── agents/
    └── gyst-researcher.md       # STUB → FULL AGENT (fills in operating instructions)
```

After `node bin/install.js` or `npx`, these install to:
```
~/.claude/get-your-shit-together/
├── workflows/
│   └── foundation-sprint.md     # Running copy
└── agents/
    └── gyst-researcher.md       # Running copy
~/.claude/agents/
    └── gyst-researcher.md       # Global agent discovery copy (from Phase 1)
```

The developer must re-run `node bin/install.js` after editing workflow/agent files to push changes to the running copies. This is the expected GYST dev loop.

### Pattern 1: Workflow Section Structure

**What:** Each sub-decision in Step 1 is a named section in the workflow with a consistent internal structure.

**When to use:** Every sub-decision (customer, problem, founder advantages, competitors) follows this pattern.

```markdown
<section name="customer_segment">

## Eliciting the Customer Segment

**When entering this section:** Render the Step 1 banner with current state.

Ask an open question:
> "Who is this for? Describe them in your own words — role, company type, situation, anything that comes to mind."

Wait for the user's response.

**After receiving their response:** Reflect it back as 2-3 labeled options:
> "Based on what you said, here are a few ways to frame your customer:
>
> **A)** [Distilled option 1 — specific, role-based]
> **B)** [Distilled option 2 — slightly broader or different angle]
> **C)** [Distilled option 3 — alternative framing]
>
> Which fits best, or how would you rephrase it?"

**If the user's response is vague or too broad:**
Ask one sharpening probe:
> "That's a broad group — is there a specific role or context within [X] you have in mind?"
Then accept whatever they say next.

**When the user confirms a framing:** Lock it.
> "Got it — your target customer: **[confirmed framing]**"

Re-render the Step 1 banner with Customer updated.
Proceed to the next section.

</section>
```

**Key rules:**
- Open question first, always — never lead with options
- Max one sharpening probe if vague — never push more than once
- Re-render banner after every lock
- Proceed sequentially: customer → problem → advantages → competitors

### Pattern 2: Step 1 Banner Format

**What:** A simple progress display using divider lines and bold labels. Re-emitted after each sub-decision is locked. The user sees their progress accumulate.

**When to use:** When Step 1 opens AND after each sub-decision is confirmed.

```
--- Step 1: The Basics -------------------
Customer:   [value or pending]
Problem:    [value or pending]
Advantages: [value or pending]
Competitors:[value or pending]
------------------------------------------
```

**Rules (from CONTEXT.md decisions):**
- Use divider lines — not emoji-prefixed lines, not tables
- Show locked values inline; show `[pending]` for not-yet-decided
- Keep width consistent (approximately 42 characters)
- No emoji in the banner itself

### Pattern 3: Onboarding Block

**What:** A brief welcome message at the very start of the sprint that orients the user before any questions are asked. Appears once, never again.

**When to use:** Immediately when the workflow starts (SPRINT-01, INTER-01).

```markdown
**Welcome to the Foundation Sprint.**

This session produces one clear, testable hypothesis about your product idea.
No brainstorming. No endless options. You'll lock in four things in Step 1,
then we build on them through Steps 2-4.

**What you'll decide today:**
- Step 1: Target customer, core problem, founder advantages, competitors
- Step 2: How you'll differentiate (2x2 positioning)
- Step 3: Which approach to build (evaluated across 4 lenses)
- Step 4: The full testable hypothesis

**The method:** I'll ask questions, propose options, and you confirm what fits.
When something's locked, it stays locked unless you explicitly go back.

Ready? Let's start with Step 1.
```

### Pattern 4: Research Invocation

**What:** After the user has named or confirmed the problem and customer segment, Claude invokes web research to find competitors and validate the pain point. Research runs BEFORE the competitor checklist is shown.

**When to use:** Between "problem locked" and "competitor checklist shown."

**Research sequence:**
1. Problem and customer are both locked
2. Ask user: "Any competitors you already know about? (Or just say 'no' — I'll find them.)"
3. Invoke gyst-researcher (or inline WebSearch) with: customer segment + problem statement + any names the user provided
4. gyst-researcher returns: up to 7 candidate competitors with title + description each
5. Claude filters to those that actually solve THE stated problem (discards off-topic results)
6. If fewer than 1 valid competitor remains after filtering: flag it (see Pitfall 3 below)
7. Present results as a numbered checklist for the user to select from (max 5 shown)

**Research prompt to gyst-researcher (or inline):**
```
Customer segment: [locked segment]
Problem: [locked problem]
User-named competitors: [list or "none"]

Find up to 7 competitors — both:
1. Products/services that claim to solve this problem
2. How people solve this today (workarounds, status quo behaviors, incumbent habits)

For each candidate, return:
- Name
- One-sentence description of how they address the problem
- Type: direct product OR workaround/status-quo behavior
- Pricing model if known
- 2-3 known strengths
- 2-3 known weaknesses
- How they position themselves

Only include competitors that address THE STATED PROBLEM specifically.
Do not include tangentially related tools.
```

### Pattern 5: Competitor Checklist Presentation

**What:** After research, present candidates as a numbered list for the user to select which to keep.

```
I found these competitors for [customer segment] solving [problem]:

1. **[Competitor A]** — [one-sentence description of how they solve the problem]
2. **[Competitor B]** — [one-sentence description]
3. **[Competitor C]** — [one-sentence description]
4. **[Competitor D]** — [one-sentence description]
5. **[Competitor E]** — [one-sentence description]

Which of these should we track? (Pick the ones relevant to your market. You can pick all of them or just a few.)
Reply with the numbers, e.g.: "1, 3, 5" or "all"
```

After selection, ask: "Which one is your main adversary — the one capturing your target customer's budget or habit today?"

### Pattern 6: Navigation Controls

**What:** At the end of Step 1 (after COMPETITORS.md is written), present the user with explicit navigation options before any further action.

**When to use:** After COMPETITORS.md has been written to disk.

```
Step 1 complete. COMPETITORS.md written.

What would you like to do?

A) **Advance to Step 2** — move on to Differentiation
B) **Revisit something in Step 1** — go back to a specific sub-decision
C) **Start Step 1 over** — discard everything and start from customer segment

Your choice:
```

**Go back logic (NAVIG-02):** If user says "go back" or picks B, ask "Which sub-decision?" then discard all downstream locked values and restart from that section. Example: if user goes back to "problem", wipe the advantages and competitors lock; re-run from problem section onward.

### Pattern 7: COMPETITORS.md Writing

**What:** At the end of Step 1, after the user has selected competitors and flagged the main adversary, Claude writes COMPETITORS.md to disk in the user's current working directory.

**When to use:** After the main adversary is confirmed; before showing navigation options.

**File location:** Write to `./COMPETITORS.md` in the user's current working directory (the project they're running the sprint from). Do not use the template path — write to the actual output location.

**The file uses the template structure from** `~/.claude/get-your-shit-together/templates/COMPETITORS.md`. Claude reads the template for structure reference, then writes a fully populated file (no placeholders remaining).

**MAIN ADVERSARY marker:** The template marks the main adversary with `★ MAIN ADVERSARY` in the heading (note: the template file currently uses `* MAIN ADVERSARY` — either works, but be consistent).

### Anti-Patterns to Avoid

- **Auto-advancing:** Never move to the next sub-decision or step without explicit user confirmation. NAVIG-03 is absolute.
- **Patching on go-back:** When user goes back to sub-decision N, do not try to preserve downstream decisions. Wipe and rebuild from N.
- **Showing options before the open question:** Always ask the open freeform question first. Never lead with labeled options.
- **Pushing more than once:** One sharpening probe max per sub-decision. Accept whatever comes next.
- **Researching before the problem is locked:** Research requires both customer segment AND problem to be locked. Do not start research early.
- **Showing "no competitors found" without probing:** If initial search finds nothing valid, follow up with "how do people solve this today?" before concluding.
- **Writing a partially populated COMPETITORS.md:** Every field in every competitor entry must be filled. No `[pending]` or `[TBD]` in the output file.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Web search for competitors | Custom scraping logic | `WebSearch` + `WebFetch` (built-in Claude Code tools) | Already declared in slash command; no setup needed |
| State management between turns | Custom JSON state files, Bash scripts | Claude's in-context memory | GYST is single-session; state lives in the conversation |
| Progress banner rendering | Complex HTML/markdown templating | Simple markdown with divider lines as specified in CONTEXT.md | The user sees raw markdown in Claude Code; keep it plain |
| Competitor profile schema | Custom database/JSON | Markdown sections in COMPETITORS.md | Step 2 reads the file by @-reference; grep-friendly text format works |
| Input validation | Runtime code | Workflow instructions telling Claude when to accept/reject | Claude interprets vague answers; no runtime validation needed |
| Navigation state machine | Code-based state tracking | Explicit workflow instructions on what "go back" means | Claude maintains state in-context; instructions handle the branching |

**Key insight:** GYST is a zero-binary project. Everything is instructions to Claude. The "state machine" for navigation is simply the workflow telling Claude what to do when the user says certain things. Claude Code handles multi-turn conversation natively — no binary scaffolding needed.

---

## Common Pitfalls

### Pitfall 1: Claude Auto-Advances Between Sub-Decisions

**What goes wrong:** After locking the customer segment, Claude immediately asks the problem question without waiting — the user never sees the banner update.

**Why it happens:** Workflow instructions are ambiguous — "then proceed to problem" without a clear "show the banner first and wait."

**How to avoid:** After each lock, the workflow must explicitly say:
1. Re-render the banner with the new locked value
2. **Then** proceed to the next section

Separate the lock confirmation, banner re-render, and next question into distinct steps in the workflow instructions.

**Warning signs:** During testing, Step 1 feels like a machine-gun questionnaire instead of a turn-by-turn conversation.

### Pitfall 2: Founder Advantages Section Accepts Vague Claims

**What goes wrong:** Claude accepts "I'm good at building SaaS" for the Capacity dimension instead of pushing for specificity.

**Why it happens:** The workflow doesn't define what "specific enough" means or give Claude a concrete rejection criterion.

**How to avoid:** The workflow must define the acceptance standard explicitly:

```
A Capacity statement is accepted if it can be verified by a stranger.
Examples of REJECTED (too vague): "I know how to build software", "I have technical skills", "I understand the market"
Examples of ACCEPTED (specific): "I shipped 3 B2B SaaS products with paying customers", "I built and sold a Shopify app to 200 merchants", "I spent 5 years as an infrastructure engineer at [company]"

If the user provides a vague claim, respond:
"That's a start — can you make it more concrete? For example, instead of 'I know how to build things,' something like 'I've shipped X products to Y customers' or 'I have N years of experience with Z specifically.'"

Accept whatever they say on the second attempt.
```

**Warning signs:** SPRINT.md shows vague founder advantage statements like "I'm passionate about this space."

### Pitfall 3: No Competitors Found — Wrong Response

**What goes wrong:** Claude returns "I couldn't find any competitors" and moves on. Or Claude accepts one tangentially related tool that doesn't solve the stated problem.

**Why it happens:** Research found results, but filtering was too strict (or not strict enough). "No competitors" without investigation is almost always wrong.

**How to avoid:** The workflow must instruct Claude to:
1. If initial search returns no valid direct competitors: search for "how do people solve [problem] today" — workarounds, spreadsheets, manual processes
2. If still nothing found: flag it as suspicious — "I couldn't find any competitors, which is unusual. This might mean the problem is very niche, or the search terms need refinement. Let's revisit the problem statement before proceeding."
3. Never include a competitor that doesn't solve THE stated problem, even if research returned it

**Warning signs:** COMPETITORS.md has 0 entries, or entries for tools that solve adjacent but different problems.

### Pitfall 4: COMPETITORS.md Has Placeholder Text

**What goes wrong:** The output file contains `[Specific description]` or `[pricing]` instead of real data.

**Why it happens:** Claude writes the file using the template structure but doesn't populate the fields, treating template comments as instructions rather than format guides.

**How to avoid:** The workflow must explicitly say:
"When writing COMPETITORS.md, fill in EVERY field with real content from your research. The template placeholders like `[pricing]` are examples of what to write — they must be replaced with actual information. Do not write any placeholder brackets in the final file."

**Warning signs:** The output file contains square brackets `[...]` in any field.

### Pitfall 5: Navigation Go-Back Patches Instead of Rebuilds

**What goes wrong:** User says "go back to customer segment." Claude says "OK, you originally said X. What do you want to change?" and tries to preserve the problem, advantages, and competitors that were built on the old customer segment.

**Why it happens:** Patching feels more efficient to Claude than rebuilding.

**How to avoid:** The workflow must explicitly state NAVIG-02 in plain terms:
"If the user goes back to an earlier sub-decision, ALL decisions made after that point are DISCARDED. Do not try to preserve them. Re-run the full sequence from that point forward as if those decisions were never made."

**Warning signs:** After going back to customer, the problem section still shows the old problem as pre-confirmed.

### Pitfall 6: Research Runs Before Both Customer and Problem Are Locked

**What goes wrong:** Claude starts searching for competitors after only knowing the customer segment, before the problem is specified.

**Why it happens:** Workflow sequencing is ambiguous about when research is triggered.

**How to avoid:** The research trigger condition must be explicit: "Research runs ONLY after both the customer segment AND the problem statement are locked. Do not invoke research earlier."

**Warning signs:** Research results are too broad (e.g., "tools for founders" when the problem should narrow the field significantly).

---

## Code Examples

Verified patterns from Phase 1 research and GSD reference implementation:

### Workflow File: Frontmatter Structure

```markdown
---
name: foundation-sprint
description: Guides a solo entrepreneur through the Foundation Sprint — from fuzzy idea to testable hypothesis in one session.
version: 1.0.0
---
```

### Workflow File: Opening Structure

```markdown
<objective>
You are running a Foundation Sprint with a solo entrepreneur. Your role is thinking partner: you ask questions, propose options, and guide the user through 4 structured steps until they have a testable hypothesis. You do not brainstorm freely — you help the user make decisions.

This workflow covers Step 1: The Basics.
</objective>

<onboarding>
[Onboarding block — shown once at sprint start]
</onboarding>

<step1>
[Step 1 logic — customer, problem, advantages, competitors, research, output]
</step1>

<step2_stub>
<!-- Step 2 implemented in Phase 3 -->
After Step 1 navigation confirms "advance", tell the user:
"Step 2 (Differentiation) is coming in the next version. Your COMPETITORS.md is saved. See you in the next release."
</step2_stub>
```

### gyst-researcher Agent: Frontmatter Structure

```markdown
---
name: gyst-researcher
description: Researches competitors, market segments, and pain points for the GYST Foundation Sprint.
tools: Read, Write, WebSearch, WebFetch
color: cyan
---
```

Note: Agent files use `tools:` (comma-separated string). Command files use `allowed-tools:` (YAML array). This asymmetry is established in Phase 1 — do not change it.

### Writing COMPETITORS.md

```markdown
<write_competitors>
When all competitors are confirmed and the main adversary is selected:

1. Read the template for structure reference:
   @~/.claude/get-your-shit-together/templates/COMPETITORS.md

2. Write the populated file to the user's current directory:
   - Path: ./COMPETITORS.md
   - Fill every field with real research content
   - Mark the main adversary with "★ MAIN ADVERSARY" in the heading
   - Do not leave any template placeholders (square brackets) in the output
   - Include the Summary Table at the bottom

3. Confirm to the user:
   "COMPETITORS.md written to your project directory."
</write_competitors>
```

### Banner Render Pattern

```markdown
<render_step1_banner>
When rendering the Step 1 banner, output exactly this format (adjust values to current state):

---
─── Step 1: The Basics ─────────────────────
Customer:   [value or "pending"]
Problem:    [value or "pending"]
Advantages: [value or "pending"]
Competitors:[value or "pending"]
────────────────────────────────────────────
---

Use actual locked values, not placeholder text. "pending" means not yet confirmed.
</render_step1_banner>
```

### Elicitation Pattern (per sub-decision)

```markdown
<elicit name="customer_segment">

**Render banner first.**

Ask: "Who is this for? Describe them in your own words."

After response: Distill into 2-3 labeled options.

If vague: One sharpening probe, then accept next response.

On confirmation: Announce lock. Re-render banner with locked value.

</elicit>
```

### Founder Advantages Pushback Pattern

```markdown
<elicit name="founder_advantages">

For each dimension (Capacity, Insight, Motivation):

Ask the open question. After user responds:

**Acceptance check:**
- VAGUE (reject once): "I know how to build software", "I'm passionate", "I understand the space"
- SPECIFIC (accept): Contains verifiable facts — shipped products, years of specific experience, personal encounters with the problem, concrete credentials

If vague: "Can you make that more specific? Instead of '[their claim]', something like: [concrete example relevant to their domain]."

Accept whatever they say on the next attempt. Do not push more than once per dimension.

</elicit>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GSD-style binary state (gsd-tools.cjs) | Zero-binary, in-context state only | Phase 1 decision | No state files needed; Claude holds sprint state in the conversation thread |
| Template as output file | Template as reference; Write tool outputs clean file | Established pattern (Phase 1) | Workflow reads template for structure, writes fully-populated file |
| Silent-vote group mechanic (original Foundation Sprint) | Guided monologue — AI generates options, user chooses | GYST inception decision | Solo-friendly; Claude replaces the group's collective generation |

**Note on agent file update path (MEDIUM confidence):** Because the gyst-researcher agent is copied to `~/.claude/agents/gyst-researcher.md` at install time, editing the source file in `get-your-shit-together/agents/gyst-researcher.md` requires re-running `node bin/install.js` for changes to take effect in the running Claude Code session. The planner should note this in the plan's dev workflow section.

---

## Open Questions

1. **Sub-agent vs. inline research for competitor discovery**
   - What we know: gyst-researcher agent exists at `~/.claude/agents/gyst-researcher.md`. Claude Code can spawn sub-agents via the Task mechanism. Inline WebSearch in the main workflow also works.
   - What's unclear: Whether spawning a sub-agent mid-conversation interrupts the conversational flow in a way the user notices; whether inline search clutters the main thread more.
   - Recommendation: Use inline WebSearch for the problem validation (RESEARCH-03) — it is a quick "does this pain exist" check. Use gyst-researcher as a sub-agent for competitor discovery (RESEARCH-01) — it is a more substantial research task that benefits from dedicated context and structured output.

2. **How to handle the "advance to Step 2" navigation when Step 2 is not yet implemented**
   - What we know: Phase 2 only implements Step 1. Phase 3 adds Step 2.
   - What's unclear: Should the workflow stub Step 2 gracefully, or just say it is coming?
   - Recommendation: The workflow should gracefully stub Step 2 with a clear message: "Step 2 is not yet implemented in this version. Your COMPETITORS.md has been saved. Stay tuned for the next release." This prevents a confusing dead-end.

3. **Template path at runtime**
   - What we know: The COMPETITORS.md template is at `~/.claude/get-your-shit-together/templates/COMPETITORS.md` after install.
   - What's unclear: Whether @-referencing `~/.claude/...` paths from inside a workflow file works during execution.
   - Recommendation: Use `@~/.claude/get-your-shit-together/templates/COMPETITORS.md` in the workflow. This is the same @-reference pattern used by the slash command to load the workflow itself (confirmed in Phase 1). Mark HIGH confidence that this pattern works. However, if for any reason it fails, the planner should include an alternative: the workflow can inline the COMPETITORS.md structure directly rather than @-referencing the template.

---

## Sources

### Primary (HIGH confidence)
- `C:/Users/raphg/Desktop/GYST/.planning/phases/02-the-basics-step-1/02-CONTEXT.md` — User decisions; all locked choices verified here
- `C:/Users/raphg/Desktop/GYST/.planning/phases/01-infrastructure/01-RESEARCH.md` — Phase 1 research; Claude Code workflow patterns, agent file format, @-reference pattern
- `C:/Users/raphg/Desktop/GYST/get-your-shit-together/workflows/foundation-sprint.md` — Existing stub; confirms frontmatter format and 4-step structure
- `C:/Users/raphg/Desktop/GYST/get-your-shit-together/agents/gyst-researcher.md` — Existing agent stub; confirms `tools:` comma-separated format
- `C:/Users/raphg/Desktop/GYST/get-your-shit-together/templates/COMPETITORS.md` — Output template; confirms MAIN ADVERSARY marker and field structure
- `C:/Users/raphg/Desktop/GYST/commands/gyst/foundation-sprint.md` — Installed slash command; confirms `@`-reference path pattern and `allowed-tools:` YAML array format
- `C:/Users/raphg/Desktop/GYST/.planning/REQUIREMENTS.md` — All requirement definitions; phase requirement descriptions taken verbatim
- `C:/Users/raphg/.claude/get-shit-done/references/questioning.md` — Questioning patterns (open question → options, sharpening probe, accept on second attempt)
- `C:/Users/raphg/.claude/get-shit-done/references/ui-brand.md` — Stage banner and progress display patterns (GSD reference)
- `C:/Users/raphg/.claude/get-shit-done/workflows/discuss-phase.md` — Multi-turn conversational workflow pattern; section-per-topic structure

### Secondary (MEDIUM confidence)
- GSD discuss-phase.md interaction model — AskUserQuestion pattern adapted into plain-markdown equivalent for GYST (GSD uses interactive components; GYST uses prose + labeled options since it is a standalone workflow, not a GSD sub-workflow)

### Tertiary (LOW confidence)
- Whether `@~/.claude/...` paths resolve correctly from within workflow markdown during live execution — assumed from slash command pattern; not independently verified against Anthropic docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tools declared in Phase 1 slash command; no new dependencies
- Architecture: HIGH — direct inspection of all Phase 1 files; workflow pattern verified from GSD reference
- Workflow authoring patterns: HIGH — derived from GSD's own workflows and Phase 1 research
- Pitfalls: HIGH — all derived from reading the CONTEXT.md decisions carefully and identifying where naive implementation would fail them
- @-reference runtime behavior: MEDIUM — assumed from working GSD pattern; not verified against live execution

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable domain — Claude Code workflow execution model changes rarely)
