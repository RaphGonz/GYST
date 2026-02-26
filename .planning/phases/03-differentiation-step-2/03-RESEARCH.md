# Phase 3: Differentiation (Step 2) - Research

**Researched:** 2026-02-26
**Domain:** Claude Code markdown workflow authoring — bipolar axis rating, AI-derived competitor scoring, ASCII 2x2 matrix rendering, conflict detection, mini-manifesto elicitation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Axis rating UX:**
- All 8 standard bipolar axes presented at once as a numbered labeled list
- Rating scale: -5 to +5 on each axis, with pole labels shown on both ends (e.g., `-5 = Price ←→ Quality = +5`)
- After rating, user picks the 2 differentiating axes freely — no AI suggestion, user's own judgment
- Custom axes: an optional but prominent step after the standard 8 — both the user AND the AI propose domain-specific axes (AI analyzes the space and suggests 1-2 relevant ones based on the industry/competitors from COMPETITORS.md)
- After the user locks their 2 differentiating axes: re-render the Step 2 banner with the chosen X-axis, Y-axis, and the dream company's position — same lock pattern as Step 1

**2x2 matrix rendering:**
- ASCII art grid with competitor names placed inside their quadrant based on scores
- No coordinates in the grid — names only, placed spatially
- Short names pulled from COMPETITORS.md as-is (truncated to fit if needed)
- Below the matrix: a brief rationale section — one line per competitor explaining their placement with a reference to the key profile detail that drove the score
- Dream company always labeled "You" in the top-right region

**Competitor scoring transparency:**
- As AI derives scores from COMPETITORS.md profiles, display each competitor's scores with a 1-line rationale inline: `CompA: X-axis +2, Y-axis -3 — [key profile detail]`
- No user override — scores are derived from existing research profiles; trust the AI
- Low-data handling: if a profile lacks sufficient evidence for an axis, score 0 (neutral center) and flag it explicitly (`CompA Y-axis: 0 — limited data`)
- Conflict detection: if any competitor lands in the top-right quadrant (same space as the dream company), flag the conflict with a clear explanation of why it matters, then require the user to go back and select different axes — no option to continue with the conflict

**Mini-manifesto flow:**
- User writes all 3 phrases (2 differentiators + 1 safeguard) freely as open text
- After submission, AI gives a single holistic evaluation of all 3 phrases together — not phrase-by-phrase critique
- After the manifesto is locked: show a Step 2 summary block (chosen axes, dream company position, matrix overview, manifesto) followed by a navigation menu — A) Continue to Step 3, B) Go back

### Claude's Discretion
- Exact axis labels and their order in the standard 8 (source from the book/framework)
- How the ASCII grid scales to accommodate varying numbers of competitors
- Visual formatting of the -5 to +5 rating display (inline scale vs just the number)
- Exact wording of conflict detection message and the prompt to re-select axes

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SPRINT-07 | Step 2 — User can rate their dream company on the 8 standard bipolar axes (slow/fast, hard/easy, expensive/free, complex/simple, dumb/smart, siloed/integrated, manual/automatic, and one more) | Standard 8 axes documented below; -5 to +5 scale; all presented at once as numbered list |
| SPRINT-08 | Step 2 — User can add custom bipolar axes relevant to their specific domain and client | Custom axis step after standard 8; AI proposes 1-2 domain-specific axes from COMPETITORS.md context; user can add their own |
| SPRINT-09 | Step 2 — When user proposes 2 axes as differentiators, AI rates all competitors from COMPETITORS.md on those 2 axes using existing research profiles, then plots the full 2x2 matrix | Read COMPETITORS.md at runtime; derive scores from profile fields; ASCII art grid; rationale per competitor |
| SPRINT-10 | Step 2 — If any competitor lands in the top-right quadrant (same as the dream company), AI flags the conflict and prompts the user to choose different axes | Top-right detection logic: both axis scores > 0 (positive on both); hard block — no continue option |
| SPRINT-11 | Step 2 — User can write a 3-phrase mini-manifesto: Differentiator 1, Differentiator 2, Safeguard (formulated as advice to new team members, not marketing copy) | Open text input; holistic AI evaluation; lock and summarize |
| RESEARCH-02 | During Step 2, when the user proposes 2 axes, AI rates each competitor from COMPETITORS.md on those axes using the existing research profiles — no additional web searching required | File read at axis-selection time; scoring from profile text only; no WebSearch call anywhere in Step 2 |

</phase_requirements>

---

## Summary

Phase 3 is a **workflow extension phase**: the primary deliverable is replacing the `<step2_stub>` block in `get-your-shit-together/workflows/foundation-sprint.md` with full Step 2 logic. Like Phase 2, no new infrastructure is created — everything builds on the existing workflow file, the COMPETITORS.md file produced by Step 1, and the POSITIONING.md template already installed. The work is entirely writing markdown that Claude Code executes as a multi-turn conversation.

The architectural pattern is identical to Phase 2: named `<section>` blocks in the workflow, each with a clear entry condition, instructions, and exit. Phase 3 replaces the stub with approximately 6-8 new named sections: `<step2_banner>`, `<section_axis_rating>`, `<section_custom_axes>`, `<section_axis_selection>`, `<section_competitor_scoring>`, `<section_matrix_render>`, `<section_manifesto>`, and `<section_step2_navigation>`. The workflow must tell Claude exactly when to read COMPETITORS.md, how to derive scores from profile text (no WebSearch), how to render the ASCII grid with variable competitor counts, and how to detect and hard-block on top-right conflicts.

The hardest design problem in this phase is making RESEARCH-02 robust: the AI must produce defensible, consistent axis ratings from unstructured text (COMPETITORS.md profiles), with no web lookup, and explain each rating in one line. The scoring instruction in the workflow must give Claude a clear rubric: what profile fields to look at for each axis type, what "neutral" (0) means, and when to flag "limited data." If the scoring instructions are vague, Claude will produce inconsistent ratings across runs.

**Primary recommendation:** Write Step 2 as a single well-structured workflow extension with one named `<section>` per phase sub-problem. Read COMPETITORS.md once at the start of `<section_competitor_scoring>` (not before). Give Claude an explicit scoring rubric in the workflow instructions so ratings are reproducible. Treat the top-right conflict as an absolute hard block requiring axis re-selection — no "continue anyway" path.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Claude Code markdown workflow | Current | Entire Step 2 interaction model | Same architecture as Step 1; established in Phase 2 |
| Claude Code `Read` tool | Current | Read COMPETITORS.md at scoring time | The only way Step 2 accesses competitor profiles without re-searching |
| Claude Code `Write` tool | Current | Not needed in Step 2 (POSITIONING.md written at sprint end in Phase 4) | Used as reference — Phase 3 does NOT write POSITIONING.md |
| foundation-sprint.md (existing) | 518 lines | The workflow file Phase 3 extends | Phase 3 replaces the `<step2_stub>` block in this exact file |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| COMPETITORS.md (runtime file) | Source of all competitor data for scoring | Read once when user selects 2 differentiating axes |
| POSITIONING.md template | Structure reference for Phase 4 — Phase 3 does NOT write it | Reviewed during research to understand downstream expectations |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Read COMPETITORS.md at scoring time | Inline context carry from Step 1 | File read is more reliable across session boundaries; Claude may not carry 518-line context perfectly |
| ASCII art grid | Mermaid quadrantChart | Mermaid quadrant charts do not render in all Claude Code contexts; ASCII is guaranteed to render correctly in any markdown view |
| Fixed 8-axis list in workflow | Dynamically generated axis list | Fixed list is simpler and matches the locked decision; AI customizes via the custom axis step, not by altering the standard 8 |

**Installation:** No new packages. All tools are built into Claude Code and already declared in the slash command.

---

## Architecture Patterns

### Phase 3 Workflow Structure

Phase 3 modifies exactly one file. No new files or directories are created:

```
get-your-shit-together/
└── workflows/
    └── foundation-sprint.md     # Replace <step2_stub> with full Step 2 sections
```

After editing, run `node bin/install.js` to push changes to `~/.claude/get-your-shit-together/`.

### Step 2 Section Map

```
foundation-sprint.md (existing, 518 lines)
...
<step2_stub> ← REPLACE THIS ENTIRE BLOCK with:
  <step2_banner>            # Banner format for Step 2 (like step1_banner)
  <section_axis_rating>     # Present 8 axes, collect -5 to +5 ratings
  <section_custom_axes>     # AI proposes + user adds domain-specific axes
  <section_axis_selection>  # User picks 2 differentiating axes, lock banner
  <section_competitor_scoring>  # Read COMPETITORS.md, derive scores, display rationale
  <section_matrix_render>   # Render ASCII 2x2, rationale block, conflict check
  <section_manifesto>       # Collect 3-phrase manifesto, holistic AI eval, lock
  <section_step2_navigation> # Summary block + A/B navigation
  <step3_stub>              # Graceful dead-end for now (Phase 4 replaces)
```

### Pattern 1: Step 2 Banner Format

**What:** A progress banner analogous to the Step 1 banner, re-rendered at key moments in Step 2.

**When to use:** When Step 2 opens AND after the differentiating axes are locked.

```
─── Step 2: Differentiation ─────────────────────
X-axis: [value or "pending"]
Y-axis: [value or "pending"]
Dream company position: [value or "pending"]
Manifesto: [3 phrases locked / pending]
─────────────────────────────────────────────────
```

After axes are locked, re-render with the chosen axes and the dream company's scores on each:
```
─── Step 2: Differentiation ─────────────────────
X-axis: Manual ←→ Automatic (You: +4)
Y-axis: Expensive ←→ Free (You: +2)
Dream company position: top-right (X: +4, Y: +2)
Manifesto: pending
─────────────────────────────────────────────────
```

**Rules:**
- Same visual style as the Step 1 banner: divider lines, bold labels, no emoji
- Show locked values inline; "pending" for not-yet-decided
- Width approximately 50 characters

### Pattern 2: Axis Rating Presentation

**What:** All 8 standard bipolar axes shown at once as a numbered list. User rates each on -5 to +5 with pole labels visible.

**When to use:** At the start of Step 2, after the opening banner.

```
Rate your dream company on each axis.
Scale: -5 = far left pole, 0 = neutral, +5 = far right pole

1. Slow ←————————→ Fast          [ -5 to +5 ]
2. Hard ←————————→ Easy          [ -5 to +5 ]
3. Expensive ←———→ Free          [ -5 to +5 ]
4. Complex ←—————→ Simple        [ -5 to +5 ]
5. Dumb ←————————→ Smart         [ -5 to +5 ]
6. Siloed ←——————→ Integrated    [ -5 to +5 ]
7. Manual ←——————→ Automatic     [ -5 to +5 ]
8. [8th axis] ←——→ [8th axis]   [ -5 to +5 ]

Reply with 8 numbers in order (e.g., "+3, -1, +5, +2, +4, 0, +3, +2")
```

**Design decision (Claude's Discretion):** The 8th standard axis. Based on the Foundation Sprint framework's standard differentiators and common positioning dimensions, the 8th axis should be **Narrow ←→ Broad** (niche/specialist vs. broad/generalist scope). This is consistently used in positioning frameworks alongside the others. The CONTEXT.md explicitly marks this as Claude's discretion.

**Standard 8 axes (recommended order):**
1. Slow ←→ Fast
2. Hard ←→ Easy
3. Expensive ←→ Free
4. Complex ←→ Simple
5. Dumb ←→ Smart
6. Siloed ←→ Integrated
7. Manual ←→ Automatic
8. Narrow ←→ Broad

**Accept ratings as a comma-separated list** ("+3, -1, +5, +2, +4, 0, +3, +2") or as a numbered response. Either format is fine — Claude parses both.

### Pattern 3: Custom Axis Step

**What:** After the standard 8 are rated, an optional but prominent step where both AI and user can add domain-specific axes.

**When to use:** After standard 8 ratings are locked, before axis selection.

**AI proposal logic:** Claude reads the COMPETITORS.md context (already in conversation from the Step 1 session) and proposes 1-2 domain-specific axes based on the industry and competitor positioning signals. Example: for a freelancer invoicing tool market where competitors cluster on "client communication" features, Claude might propose "Reactive ←→ Proactive" as a domain-specific differentiating axis.

```
Now let's think about axes specific to your market.

Based on your competitors' profiles, I'd suggest these domain-specific axes:

**A) [AI-proposed axis 1]:** [Left pole] ←→ [Right pole]
   *Why: [one sentence — what this measures and why it matters in your market]*

**B) [AI-proposed axis 2]:** [Left pole] ←→ [Right pole]
   *Why: [one sentence]*

Do you want to add any of these, or propose your own? You can:
- Accept A, B, or both (and rate them now)
- Propose your own axis (give it a name and two poles)
- Skip this step and work with the standard 8

Your call:
```

**After user responds:**
- If they accept AI axes: rate them on -5 to +5 immediately
- If they propose their own: rate it on -5 to +5
- If they skip: proceed to axis selection with only the standard 8

### Pattern 4: COMPETITORS.md Reading and Scoring

**What:** Claude reads COMPETITORS.md at scoring time, derives a -5 to +5 score for each competitor on each of the 2 selected axes, displays scores with 1-line rationale.

**When to use:** After the 2 differentiating axes are locked, before rendering the matrix.

**Critical rule (RESEARCH-02):** No WebSearch calls anywhere in this section. All scoring is derived from the profile text in COMPETITORS.md. The workflow must explicitly state: "Do NOT run any web searches. All information must come from the competitor profiles already in COMPETITORS.md."

**Read instruction in workflow:**
```markdown
Read the competitor profiles from COMPETITORS.md:
@./COMPETITORS.md

For each competitor, derive a score on each of the 2 selected axes
using ONLY the information in their profile. Do not search the web.
```

**Scoring rubric (workflow must specify):**

| Axis type | What to look at in the profile |
|-----------|-------------------------------|
| Slow ←→ Fast | Onboarding description, feature complexity, time-to-value claims |
| Hard ←→ Easy | Setup friction, target audience (technical vs. non-technical), UX signals |
| Expensive ←→ Free | Pricing model field directly |
| Complex ←→ Simple | Feature count, positioning signals ("all-in-one" = complex, "focused" = simple) |
| Dumb ←→ Smart | AI/automation claims, intelligence features in strengths |
| Siloed ←→ Integrated | Integration mentions, API mentions, ecosystem claims |
| Manual ←→ Automatic | Automation features, workflow automation claims |
| Narrow ←→ Broad | Target audience breadth, vertical vs. horizontal claims |
| Domain-specific | Relevant positioning signals field |

**Score display format (before matrix render):**
```
Scoring competitors on [X-axis] and [Y-axis]:

CompA: X-axis +2, Y-axis -3 — pricing is enterprise-only ($500/mo); positioned for "large teams"
CompB: X-axis +4, Y-axis 0 — strong automation features; pricing unknown (limited data)
CompC: X-axis -1, Y-axis +5 — free tier; complex setup documented in weaknesses
```

**Low-data handling:** If a profile has insufficient evidence for an axis, score 0 (neutral) and flag it:
```
CompB Y-axis: 0 — limited data (pricing not found in profile)
```

### Pattern 5: ASCII 2x2 Matrix Rendering

**What:** A text-based grid with competitor names placed spatially within their quadrant. No coordinates shown — names only.

**When to use:** After all competitor scores are derived and displayed.

**Grid structure (scalable):**

```
                    High [Y-axis right pole]
                    ^
                    |
  [names in         |         You
   top-left         |     [names in top-right]
   quadrant]        |
────────────────────+────────────────────────►
                    |         High [X-axis right pole]
  [names in         |
   bottom-left]     |     [names in bottom-right]
                    |
    Low [Y-axis left pole]
```

**Claude's Discretion on grid scaling:** The grid width is fixed at approximately 60 characters. Names are truncated to fit within their quadrant region (approximately 20 characters per name, 2 names per row max per quadrant). If more than 2 competitors land in the same quadrant, stack them vertically.

**Placement algorithm the workflow must specify:**
- Score > 0 on X-axis = right half of grid
- Score ≤ 0 on X-axis = left half of grid
- Score > 0 on Y-axis = top half of grid
- Score ≤ 0 on Y-axis = bottom half of grid
- "You" (dream company) is always placed in top-right, regardless of scores (scores were already locked as positive in that quadrant by the user's rating)
- Score of exactly 0 = place near the center line

**Rationale block below matrix (per competitor, one line):**
```
Competitor positions:
- CompA (top-right): Automated workflow engine + free tier matches your axes — CONFLICT
- CompB (bottom-left): Enterprise pricing and manual setup — opposite quadrant
- CompC (bottom-right): Automated but expensive — high X, low Y
```

### Pattern 6: Conflict Detection

**What:** After the matrix is rendered, check if any competitor lands in the top-right quadrant (X > 0 AND Y > 0). If so, hard-block with a clear explanation and require axis re-selection.

**Conflict condition:** Both `x_score > 0` AND `y_score > 0` for any competitor.

**Conflict message (Claude's Discretion on wording, workflow provides the logic):**

```
CONFLICT DETECTED

[CompA] lands in the top-right quadrant — the same position as your dream company.

This means [CompA] is already doing what you're claiming as your differentiation.
If customers see you as "the same as [CompA]," you don't have a positioning advantage.

You need to choose different axes — axes where YOU are in the top-right and [CompA] is not.

Go back and choose 2 different differentiating axes. Your current scores on all 8 axes are preserved — you just need to pick a different pair.
```

**Hard block rule:** No "continue anyway" option. The workflow must NOT offer a way to proceed with a conflict. The only action is to return to axis selection. Workflow instruction: "After displaying the conflict message, ask the user to select 2 new differentiating axes. Return to `section_axis_selection`. Do not offer any other option."

### Pattern 7: Mini-Manifesto Elicitation

**What:** User writes all 3 phrases as open text at once. AI gives a single holistic evaluation. Lock.

**When to use:** After the matrix is rendered (and no conflict exists).

**Prompt:**
```
Now write your mini-manifesto — 3 short phrases that define what you stand for.

These aren't marketing taglines. Write them as advice to a new team member:
"We are [X]" and "We will never [Y]."

**Phrase 1 (Differentiator 1):** What you are, based on your X-axis position
**Phrase 2 (Differentiator 2):** What you are, based on your Y-axis position
**Phrase 3 (Safeguard):** What you will never compromise on, even if it costs you

Write all three at once — you can revise after I respond.
```

**After user submits:**
- AI evaluates all 3 phrases together holistically — NOT phrase by phrase
- Check: Are they written as team-member advice (not taglines)? Are they specific enough to constrain decisions? Do they connect to the chosen axes?
- Provide one cohesive evaluation: what works, what to sharpen, or confirm they're strong
- If strong: lock them
- If too vague or marketing-copy: give one round of feedback, ask user to revise, then accept whatever comes next

**Do NOT critique each phrase separately.** One integrated response for all three.

### Pattern 8: Step 2 Summary Block and Navigation

**What:** After the manifesto is locked, show a structured summary of all Step 2 decisions, then present navigation.

**When to use:** After manifesto is locked.

```
─── Step 2 Complete ─────────────────────────────
Differentiating axes:
  X: [axis name] — You: [score]
  Y: [axis name] — You: [score]

Competitor positions:
  [CompA]: X: [score], Y: [score] → [quadrant]
  [CompB]: X: [score], Y: [score] → [quadrant]

Mini-manifesto:
  We are [Differentiator 1]
  We are [Differentiator 2]
  We will never [Safeguard]
─────────────────────────────────────────────────

What would you like to do?

A) **Continue to Step 3** — solution approaches
B) **Go back** — revisit axis selection or manifesto
```

**Go-back logic:** The CONTEXT.md does not specify a DISCARD RULE for Step 2 sub-decisions (unlike Step 1's strict wipe). The navigation is simpler: A or B. If B, ask what they want to revisit:
- "Axis selection" → return to `section_axis_selection` (scores on all 8 axes preserved, just pick different 2)
- "Manifesto" → return to `section_manifesto` (axes and matrix preserved)

No wipe of the entire step — just targeted redo of the sub-decision they want to change.

### Anti-Patterns to Avoid

- **Searching the web in Step 2:** RESEARCH-02 is an absolute hard constraint. Never call WebSearch or WebFetch during Step 2. The workflow must say "Do NOT search the web" explicitly.
- **Letting the user pick axes before rating:** The rating step (all 8 axes) must complete before axis selection. If scores aren't known, the user can't make an informed pick.
- **Allowing AI to suggest the 2 differentiating axes:** The user picks freely. The workflow must not say "I recommend axes X and Y." Claude's Discretion covers only the custom axis suggestions (step 3), not the differentiating axis selection.
- **Soft conflict handling:** A competitor in the top-right is a hard block. No "that said, you could proceed if..." phrasing.
- **Phrase-by-phrase manifesto critique:** The locked decision is holistic evaluation. Do not break it into 3 separate critiques.
- **Rendering POSITIONING.md in Phase 3:** POSITIONING.md is written at sprint end (Phase 4). Phase 3 only stores the Step 2 decisions in-context.
- **Scoring from memory/training:** Claude must Read COMPETITORS.md explicitly. Do not rely on what Claude might remember from the Step 1 conversation — read the file fresh.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Competitor scoring | Custom scoring algorithm, JSON state | Workflow instructions telling Claude what fields to look at per axis type | GYST is zero-binary; scoring is Claude reasoning from text |
| Quadrant placement | Coordinate math, grid library | Simple ASCII template with quadrant regions labeled | Claude places names spatially within a fixed text grid |
| Conflict detection | Threshold comparison code | Workflow instruction: "if both scores > 0 for any competitor, hard-block" | Claude interprets the condition from instructions |
| Axis rating input parsing | Input validation code | Accept comma-separated list, numbered list, or named format — Claude parses all | Claude handles flexible input naturally |
| State between Step 1 and Step 2 | State files, JSON persistence | COMPETITORS.md file on disk + in-context conversation state | Single-session; the file is the bridge |

**Key insight:** Every "algorithm" in GYST is an instruction to Claude. Scoring, conflict detection, and quadrant placement are all natural language rules in the workflow, not code. Claude handles fuzzy input, partial data, and edge cases through instruction, not runtime logic.

---

## Common Pitfalls

### Pitfall 1: Web Search Accidentally Called During Scoring

**What goes wrong:** Claude encounters a competitor with incomplete data and instinctively searches the web to fill in the gap.

**Why it happens:** Claude is trained to be helpful and resolve gaps. Without explicit prohibition, it will search.

**How to avoid:** The workflow's `section_competitor_scoring` must say twice: (1) "Read COMPETITORS.md using the Read tool" and (2) "Do NOT run any web searches. Score 0 and flag as 'limited data' if a field is missing. Never search to fill gaps."

**Warning signs:** Scoring output references information not present in COMPETITORS.md. Profile data is suspiciously complete for competitors with thin profiles.

### Pitfall 2: Axis Selection Before Scoring Is Complete

**What goes wrong:** Workflow allows user to pick 2 differentiating axes before rating all 8 standard axes, so they don't have quantitative data for the selection.

**Why it happens:** The workflow skips or conflates the rating step with the selection step.

**How to avoid:** The workflow must have two distinct sequential sections: `section_axis_rating` (rate all 8) → `section_custom_axes` (optional adds) → `section_axis_selection` (pick 2 from the rated set). Selection cannot happen until all ratings are locked.

**Warning signs:** User picks differentiating axes and then is asked to rate them — inverted order.

### Pitfall 3: Top-Right Conflict Offers "Continue Anyway"

**What goes wrong:** After detecting a conflict, Claude says something like "CompA is in the top-right, but you may want to proceed and differentiate on execution." User continues with a broken positioning.

**Why it happens:** Claude naturally seeks to be helpful and avoid blocking. Without an explicit hard-block instruction, it finds a middle path.

**How to avoid:** The workflow's conflict detection section must say: "After displaying the conflict, ask the user to pick 2 new axes. Do NOT offer any other option. Do NOT suggest proceeding with the current axes." The workflow must use emphatic language: "There is no option to continue — axis re-selection is required."

**Warning signs:** After conflict detection, user proceeds to the manifesto without re-selecting axes.

### Pitfall 4: Manifesto Phrases Sound Like Marketing Copy

**What goes wrong:** Claude accepts "We are the most innovative solution for [X]" as a valid manifesto phrase.

**Why it happens:** Claude doesn't know what "advice to a new team member" means without examples.

**How to avoid:** The workflow must define what makes a phrase valid vs. invalid:
- REJECTED (marketing copy): "We are the leader in X", "We deliver unparalleled Y", "We are the fastest/best/cheapest"
- ACCEPTED (decision-making tool): "We build for one persona and say no to feature requests from others", "We never charge per seat — pricing is always flat", "We will never add features that require a sales call to explain"

If the user submits marketing copy, give one round of feedback with an example of what a decision-making constraint sounds like, then accept whatever comes next.

**Warning signs:** All 3 phrases sound like a website headline. None of them would actually constrain a product decision.

### Pitfall 5: ASCII Matrix Doesn't Scale With Competitor Count

**What goes wrong:** With 5 competitors, some quadrants have 3-4 names that overflow the grid, making it unreadable.

**Why it happens:** The grid is designed for 1-2 competitors per quadrant.

**How to avoid:** The workflow must specify: "If more than 2 competitors land in the same quadrant, stack them vertically (one per line) within that quadrant. If names are longer than 15 characters, truncate with ellipsis. The grid may extend vertically to accommodate stacked names."

**Warning signs:** Grid output has names overlapping or extending beyond the axis lines.

### Pitfall 6: Scoring Is Inconsistent Across Re-Runs

**What goes wrong:** Running Step 2 twice produces different axis scores for the same competitor. User loses trust in the scoring.

**Why it happens:** Without a scoring rubric, Claude uses different reasoning each time.

**How to avoid:** The workflow must give Claude explicit heuristics for each axis type (see Pattern 4 above). The rubric anchors scoring to specific profile fields, not Claude's general impression.

**Warning signs:** Re-running scoring produces scores that differ by more than 1-2 points for the same competitor/axis pair.

### Pitfall 7: Step 2 Banner Is Never Shown

**What goes wrong:** Step 2 jumps straight into axis questions without a banner. User doesn't know what step they're in or what's been decided.

**Why it happens:** Phase 3 adds Step 2 but doesn't define a `<step2_banner>` block analogous to `<step1_banner>`.

**How to avoid:** Define a `<step2_banner>` block at the top of the Step 2 sections, with the same "render on entry AND after each lock" instruction as the Step 1 banner. The banner must show at minimum: X-axis, Y-axis, dream company position, manifesto status.

---

## Code Examples

### Step 2 Banner Block

```markdown
<step2_banner>
<!-- BANNER RENDER INSTRUCTION — reusable for Step 2. Render on Step 2 entry AND after axes are locked. -->

The Step 2 banner format:

─── Step 2: Differentiation ─────────────────────
X-axis: [value or "pending"]
Y-axis: [value or "pending"]
Dream company: [X score, Y score or "pending"]
Manifesto: [locked / pending]
─────────────────────────────────────────────────

After axes are locked (example with real values):
─── Step 2: Differentiation ─────────────────────
X-axis: Manual ←→ Automatic (You: +4)
Y-axis: Expensive ←→ Free (You: +3)
Dream company: top-right (+4, +3)
Manifesto: pending
─────────────────────────────────────────────────

Rules: Same visual style as Step 1 banner. No emoji. Width ~50 chars.
</step2_banner>
```

### Axis Rating Section

```markdown
<section name="section_axis_rating">

## Step 2: Rating the Dream Company

**When entering this section:** Render the Step 2 banner with all values as "pending".

Present all 8 axes at once:

> Rate your dream company on each axis.
> Scale: -5 = far left pole, 0 = neutral, +5 = far right pole
>
> 1. Slow ←————————→ Fast
> 2. Hard ←————————→ Easy
> 3. Expensive ←———→ Free
> 4. Complex ←—————→ Simple
> 5. Dumb ←————————→ Smart
> 6. Siloed ←——————→ Integrated
> 7. Manual ←——————→ Automatic
> 8. Narrow ←——————→ Broad
>
> Reply with 8 numbers in order, e.g.: "+3, -1, +5, +2, +4, 0, +3, +2"
> Or rate them one at a time — your choice.

Wait for the user to respond.

Accept: comma-separated list, numbered list, or any readable format.
Parse the 8 values and store them as: axis_1_score through axis_8_score.

Confirm back:
> "Got it. Your dream company ratings:
> 1. Slow ←→ Fast: [score]
> 2. Hard ←→ Easy: [score]
> ... (all 8)
>
> Are these right? (Yes to lock, or tell me what to change.)"

Wait for confirmation. Accept on first confirmation.

After confirmation: lock all 8 ratings. Proceed to section_custom_axes.

</section>
```

### Competitor Scoring Section

```markdown
<section name="section_competitor_scoring">

## Competitor scoring (RESEARCH-02)

**CRITICAL: Do NOT run any web searches in this section. Do NOT call WebSearch or WebFetch.
All scoring uses ONLY information from COMPETITORS.md. If data is missing, score 0 and flag.**

Read the competitor profiles:
@./COMPETITORS.md

For each competitor, derive a score from -5 to +5 on each of the 2 selected axes:
- X-axis: [locked X-axis name and poles]
- Y-axis: [locked Y-axis name and poles]

Use only the following fields from each competitor's profile:
- "What they do" — for feature/capability inference
- "Pricing model" — directly informs price-related axes
- "Known strengths" — confirms positive axis positions
- "Known weaknesses" — confirms negative axis positions
- "Positioning signals" — their claimed differentiators

Score 0 and flag "limited data" if a field is empty or "Unknown".

Display scores with rationale BEFORE rendering the matrix:
> CompA: X-axis +2, Y-axis -3 — [one key profile detail that drove this rating]
> CompB: X-axis +4, Y-axis 0 — [detail]; Y-axis 0 — limited data (pricing unknown)

</section>
```

### Conflict Detection

```markdown
<section name="section_conflict_check">

## Conflict detection (SPRINT-10)

After scoring all competitors:

Check: Does any competitor have BOTH x_score > 0 AND y_score > 0?

If YES (conflict detected):
- Display the matrix (so the user can see why)
- Immediately after the matrix, display the conflict message:
  > **CONFLICT: [CompA] is in the top-right quadrant.**
  >
  > This means [CompA] already holds the same differentiating position
  > you're claiming. Customers seeing both won't have a clear reason to
  > choose you over them.
  >
  > Choose 2 different axes — ones where you're in the top-right and
  > [CompA] is not. Your ratings on all 8 axes are preserved.

- DO NOT offer any other option. DO NOT say "you could proceed anyway."
- Return to section_axis_selection. Start over from axis picking only.

If NO conflict: proceed to section_manifesto.

</section>
```

### Mini-Manifesto Section

```markdown
<section name="section_manifesto">

## Mini-manifesto (SPRINT-11)

After the matrix is confirmed (no conflict):

Say:
> "Now write your mini-manifesto — 3 short phrases that define what you stand for.
>
> Write them as advice to a new team member, not as marketing copy.
> They should constrain decisions, not describe aspirations.
>
> **Phrase 1 (Differentiator 1):** Connected to your X-axis position
>   Example: "We are fully automated — no manual steps for the customer, ever."
>
> **Phrase 2 (Differentiator 2):** Connected to your Y-axis position
>   Example: "We are always free to start — no credit card, no trial expiry."
>
> **Phrase 3 (Safeguard):** What you will never compromise on
>   Example: "We will never add enterprise features that break the simple user experience."
>
> Write all three at once."

Wait for response.

**Evaluate holistically — ONE response for all three:**
- Do they read as decision-making tools, not marketing headlines?
- Are they specific enough to actually constrain a product decision?
- Do they connect to the chosen axes?

If strong: "These work. Locking your manifesto."
If marketing copy or too vague: one round of feedback (give an example of what a decision-constraining version would look like), then accept whatever the user writes next.

DO NOT critique each phrase separately.

Lock the manifesto. Re-render the Step 2 banner with "Manifesto: locked".

</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Step 2 is a stub | Step 2 is fully implemented in Phase 3 | Phase 3 | Users can complete Differentiation end-to-end |
| POSITIONING.md written during Step 2 | POSITIONING.md written at sprint end (Phase 4) | By design | Phase 3 only stores Step 2 state in-context; Phase 4 writes the file |
| Competitor scoring from fresh research | Competitor scoring from COMPETITORS.md profiles only | GYST design decision (RESEARCH-02) | No re-searching; profiles must be comprehensive enough from Step 1 |

**Key existing decision to preserve:** The COMPETITORS.md template's `Positioning signals` field was specifically designed for axis rating in Step 2 (see template comment: "Used for axis rating in Step 2"). This field is the primary signal source for most axis scores.

---

## Open Questions

1. **The 8th standard bipolar axis**
   - What we know: REQUIREMENTS.md says "slow/fast, hard/easy, expensive/free, complex/simple, dumb/smart, siloed/integrated, manual/automatic, and one more." The 8th is explicitly marked undefined.
   - What's unclear: Jake Knapp's Click book is not publicly available for full text review; the specific 8th axis from the original framework could not be verified from public sources.
   - Recommendation: Use **Narrow ←→ Broad** as the 8th axis. This is a standard positioning dimension (specialist vs. generalist) that complements the other 7 and is universally applicable across industries. Mark as MEDIUM confidence — this is Claude's Discretion per CONTEXT.md, and the planner should simply pick one and commit.

2. **How to handle 0-5 competitor sets in ASCII grid**
   - What we know: Up to 5 competitors from COMPETITORS.md. They may distribute unevenly across quadrants.
   - What's unclear: The exact visual representation when all competitors land in 1-2 quadrants vs. spread across all 4.
   - Recommendation: Specify in the workflow that the grid always renders all 4 quadrants, even if some are empty (labeled with "—"). Stack names vertically when multiple competitors share a quadrant. Truncate names > 15 characters.

3. **Whether to render the matrix before or after showing competitor scores**
   - What we know: CONTEXT.md says "display each competitor's scores with a 1-line rationale inline" AND "below the matrix: a brief rationale section."
   - What's unclear: This implies scores are shown inline during derivation AND then summarized below the matrix. Both are needed.
   - Recommendation: Show scores during derivation (pre-matrix), then render the matrix, then show the rationale block again below the matrix for reference. The first display is the "working notes"; the second is the reference section.

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/03-differentiation-step-2/03-CONTEXT.md` — All locked decisions; direct specification of UI, flow, and constraints
- `.planning/REQUIREMENTS.md` — Requirement definitions SPRINT-07 through SPRINT-11 and RESEARCH-02 verbatim
- `get-your-shit-together/workflows/foundation-sprint.md` (518 lines) — Exact file to be extended; `<step2_stub>` location confirmed at lines 509-518
- `get-your-shit-together/templates/COMPETITORS.md` — Input file structure for Step 2 scoring; `Positioning signals` field confirmed as Step 2 input
- `get-your-shit-together/templates/POSITIONING.md` — Output template structure; Phase 3 does NOT write this but must understand its schema
- `get-your-shit-together/agents/gyst-researcher.md` (140 lines) — Confirmed Step 2 does NOT invoke the researcher agent; gyst-researcher is Step 1 only
- `.planning/phases/02-the-basics-step-1/02-RESEARCH.md` — Architecture patterns inherited from Phase 2 (section structure, banner format, navigation patterns)
- `.planning/phases/02-the-basics-step-1/02-02-SUMMARY.md` — Confirmed actual state of foundation-sprint.md (518 lines, seam replaced, all Step 1 sections present)

### Secondary (MEDIUM confidence)
- Foundation Sprint framework (Jake Knapp / Character Capital) — Mini-manifesto structure confirmed: 2 differentiators + 1 safeguard; safeguard framed as "prevents unintended harm / what we'll never compromise on" — verified via InnovationTraining.org summary and multiple secondary sources
- The 7 confirmed standard axes (slow/fast, hard/easy, expensive/free, complex/simple, dumb/smart, siloed/integrated, manual/automatic) — mentioned in REQUIREMENTS.md and consistent with Foundation Sprint methodology descriptions found in public sources

### Tertiary (LOW confidence)
- 8th axis "Narrow ←→ Broad" — not confirmed from official Foundation Sprint materials (book behind paywall); recommended as Claude's Discretion choice based on standard positioning framework patterns
- ASCII grid scaling approach — derived from first principles and tool constraints; no official Claude Code guidance found on preferred text diagram format

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — same stack as Phase 2, no new tools
- Architecture patterns: HIGH — direct inspection of all Phase 2 files; section structure, banner format, and navigation patterns all verified
- Scoring rubric: MEDIUM — derived from COMPETITORS.md field structure and general positioning framework knowledge; not validated against actual runtime behavior
- 8th standard axis: LOW — Claude's Discretion; "Narrow ←→ Broad" is a reasonable choice but not confirmed from the Click book
- ASCII matrix design: MEDIUM — based on Phase 2 established patterns and CONTEXT.md locked decisions; actual rendering behavior in Claude Code confirmed to work for simple ASCII

**Research date:** 2026-02-26
**Valid until:** 2026-03-26 (stable domain — Claude Code markdown workflow execution model; GYST architecture established)
