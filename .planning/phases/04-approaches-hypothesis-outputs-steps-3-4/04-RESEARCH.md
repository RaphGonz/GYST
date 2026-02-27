# Phase 4: Approaches + Hypothesis + Outputs (Steps 3-4) - Research

**Researched:** 2026-02-27
**Domain:** Claude Code markdown workflow authoring — approach generation, 4-matrix evaluation, hypothesis formulation, testable form derivation, and three output file writers
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Approach generation flow:**
- Step 3 opens by displaying the reloaded Capacity + Insight advantages and chosen axes, then opens the floor: "What's your initial approach idea?" — full context visible before user types
- After user proposes, AI probes with 1-2 clarifying questions to sharpen the approach before recording it as Approach 1
- Additional approaches are proposed one at a time; user reacts (keep/drop) until 3-4 total approaches are finalized
- Approaches that don't fit founder Capacity or Insight are silently excluded — user only sees viable options, no mention of filtered candidates

**Matrix evaluation (4 fixed matrices):**
- **Customer vision**: Ease to use × How perfectly it solves the problem
- **Money vision**: Recurring revenues long term × Number of customers
- **Pragmatic vision**: Ease to build × How fast to build
- **Growth vision**: Adaptability × Number of customers
- Evaluation is matrix by matrix (not all at once) — AI walks through each of the 4 matrices sequentially
- Each matrix renders as an ASCII 2x2 grid with approach labels plotted on the quadrant
- After all 4 matrices: AI immediately identifies and recommends the approach with the strongest global pattern across matrices, naming the second-best as backup
- User can override freely — AI acknowledges and moves forward without pushback

**Hypothesis construction:**
- AI pre-fills the full hypothesis template from context captured in Steps 1-3 (segment, problem, chosen approach, differentiating axes, main competitor) — user edits any slot they disagree with
- Template: "If we help X solve Y with Z, they will choose us over W because we are U and V"
- After hypothesis is confirmed, AI derives all 4 testable form components automatically: success metric, falsification condition, main risk, fastest validation test
- User can iterate on individual slots freely until explicitly locking ("lock it" or equivalent) — sprint never auto-advances from hypothesis

**Step 3 → Step 4 transition:**
- Transition marked by a visible step banner: "Step 4: Hypothesis" — user sees a clear stage change after approach is committed

**Output files:**
- **HYPOTHESIS.md**: hypothesis statement + 4 testable form components only — clean reference document
- **SPRINT.md**: full sprint summary capturing all decisions across all 4 steps (segment, problem, founder advantages, competitors, differentiating axes, chosen approach, final hypothesis)
- **POSITIONING.md**: positioning statement + competitive context showing where the chosen approach sits relative to top competitors on the chosen differentiating axes
- All 3 files written together at sprint end — clear endpoint ceremony, not incremental

### Claude's Discretion
- Exact wording of the approach probe questions
- How "keep/drop" reactions are prompted during one-at-a-time approach generation
- Formatting and visual style of each file beyond structure specified above

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SPRINT-12 | Step 3 opens by loading founder advantages (Capacity + Insight from Step 1) and chosen differentiating axes (from Step 2) as active context; user proposes their own initial approach first; AI generates additional approaches to reach 3-4 total, filtered by founder Capacity/Insight and constrained by Step 2 axes; all evaluated together on 4 standard matrices | Context reload pattern: read from in-session state (no new files). User-first approach with probe questions. Silently filtered AI-generated approaches. All 4 approaches evaluated simultaneously across all 4 matrices |
| SPRINT-13 | Each approach is evaluated on 4 standard 2x2 matrices: Customer Vision (ease × solves perfectly), Money Vision (recurring revenue × number of clients), Pragmatic Vision (ease to build × speed to build), Growth Vision (adaptability × client acquisition over time) | 4 sequential ASCII 2x2 matrices. Same rendering pattern as Phase 3 (score-based quadrant placement). Each matrix labels approaches with short identifiers (A1, A2, A3, A4). AI walks through one matrix at a time |
| SPRINT-14 | AI identifies the approach with the strongest global pattern (consistently top-right across matrices) and recommends it, keeping the 2nd best as backup | Post-matrix global pattern summary. Recommend = name the winner and backup. User can override without pushback |
| SPRINT-15 | User fills in the full hypothesis template: "If we help X solve Y with Z, they will choose us over W because we are U and V" | Pre-filled template from session context. User edits slots. Explicit lock trigger required — no auto-advance |
| SPRINT-16 | AI transforms the hypothesis into a testable form: success metric, falsification condition, main risk, and fastest test to validate | AI-derived from the locked hypothesis. All 4 fields auto-generated. Shown after hypothesis is locked |
| OUTPUT-01 | HYPOTHESIS.md produced at sprint end — hypothesis statement + breakdown table + testable form (success metric, falsification condition, main risk, fastest validation test) | Write tool call using HYPOTHESIS.md template. All bracketed fields replaced. Written at sprint end ceremony with SPRINT.md and POSITIONING.md |
| OUTPUT-02 | SPRINT.md produced at sprint end — complete journal of every decision made at each step | Write tool call using SPRINT.md template. All 4 steps captured. Approach evaluation table included. Written at sprint end ceremony |
| OUTPUT-03 | POSITIONING.md produced at sprint end — 2x2 matrix + competitor positions + mini-manifesto | Write tool call using POSITIONING.md template. Matrix reproduced from Step 2 data. Written at sprint end ceremony |

</phase_requirements>

---

## Summary

Phase 4 is the final workflow extension phase: replace the `<step3_stub>` block in `get-your-shit-together/workflows/foundation-sprint.md` with full Steps 3 and 4 logic, then add the three output file writers at sprint end. The file is currently 903 lines with `<step3_stub>` occupying lines 887-903. Like Phases 2 and 3, no new infrastructure is created — everything builds on the existing workflow file and the session state accumulated from Steps 1 and 2.

The architectural pattern is identical to prior phases: named `<section>` blocks in the workflow, each with a clear entry condition, instructions, and exit. Phase 4 replaces the stub with approximately 7-9 new named sections: `<step3_banner>`, `<section_context_reload>`, `<section_approach_generation>`, `<section_approach_evaluation>`, `<section_approach_recommendation>`, `<step4_banner>`, `<section_hypothesis>`, `<section_testable_form>`, and `<section_write_outputs>`. The workflow must tell Claude exactly how to surface Capacity + Insight from conversation context, how to generate approaches silently filtered by those advantages, how to walk through 4 ASCII matrix evaluations sequentially, and how to write three complete files with no template placeholders remaining.

The two hardest design problems in this phase are: (1) the "context reload" at Step 3 entry — Claude must surface the Capacity, Insight, and chosen axes from the conversation history without re-asking the user, and display them clearly before anything else; and (2) the three output file writers at sprint end — each must produce a complete file with all brackets filled, sourcing content from four different points in the conversation (Steps 1, 2, 3, and 4). Both require the workflow to give Claude explicit instruction about what to read from context and exactly where to place it.

**Primary recommendation:** Write Step 3 as two plans: Plan 04-01 for approach generation and matrix evaluation (Steps 3 context reload through approach commitment), and Plan 04-02 for hypothesis formulation and all three output file writers (Step 4 through sprint end ceremony). Replace the `<step3_stub>` entirely; do not leave any stubs at the end of the file since Phase 4 completes the sprint.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Claude Code markdown workflow | Current | Entire Steps 3-4 interaction model | Same architecture as Phases 2 and 3; established pattern |
| Claude Code `Write` tool | Current | Write HYPOTHESIS.md, SPRINT.md, POSITIONING.md at sprint end | Same pattern as COMPETITORS.md in Phase 2 |
| Claude Code `Read` tool | Current | Read output templates for structure reference at write time | Same pattern as COMPETITORS.md template read in Phase 2 |
| foundation-sprint.md (existing) | 903 lines | The workflow file Phase 4 extends | Phase 4 replaces `<step3_stub>` at lines 887-903 of this exact file |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| HYPOTHESIS.md template | Structure reference when writing the output | Read at write time via `@~/.claude/get-your-shit-together/templates/HYPOTHESIS.md` |
| SPRINT.md template | Structure reference for the decision journal | Read at write time via `@~/.claude/get-your-shit-together/templates/SPRINT.md` |
| POSITIONING.md template | Structure reference for the positioning output | Read at write time via `@~/.claude/get-your-shit-together/templates/POSITIONING.md` |
| COMPETITORS.md (runtime, already on disk) | Source of competitor names/profiles for POSITIONING.md and SPRINT.md | Already present from Step 1; no re-reading needed if Step 2 data is in-context |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Sequential matrix evaluation (one at a time) | All 4 matrices rendered simultaneously | Sequential is per locked decision; simultaneous risks overwhelming the user and reduces per-matrix engagement |
| ASCII matrix (same as Phase 3) | Prose table listing approach scores | ASCII matrix creates visual pattern recognition — the "global pattern" recommendation logic depends on seeing quadrant clustering across matrices |
| Write all 3 output files at sprint end ceremony | Write incrementally as each step completes | Locked decision: all 3 together at sprint end. Ceremony effect is intentional. Also avoids partial files from abandoned sprints |

**Installation:** No new packages. All tools built into Claude Code and already declared in the slash command.

---

## Architecture Patterns

### Phase 4 Workflow Structure

Phase 4 modifies exactly one file. No new files or directories are created during implementation:

```
get-your-shit-together/
└── workflows/
    └── foundation-sprint.md     # Replace <step3_stub> (lines 887-903) with Steps 3-4 sections
```

Output files written at runtime (by the workflow, not during implementation):
```
./HYPOTHESIS.md                  # Written at sprint end by the workflow
./SPRINT.md                      # Written at sprint end by the workflow
./POSITIONING.md                 # Written at sprint end by the workflow
```

After editing, run `node bin/install.js` from `C:/Users/raphg/Desktop/GYST` to push changes to `~/.claude/get-your-shit-together/`.

### Step 3-4 Section Map

```
foundation-sprint.md (903 lines)
...
<step3_stub> ← REPLACE THIS ENTIRE BLOCK with:
  <step3_banner>                 # Step 3 banner (mirrors step1/step2 banner format)
  <section_context_reload>       # Display Capacity, Insight, axes from session — no re-asking
  <section_approach_generation>  # User proposes approach 1; AI generates 2-3 more (silently filtered); keep/drop loop
  <section_approach_evaluation>  # Walk through 4 ASCII matrices sequentially; all approaches labeled A1-A4
  <section_approach_recommendation>  # Global pattern summary; recommend winner + backup; user commits
  <step4_banner>                 # "Step 4: Hypothesis" — clear stage transition banner
  <section_hypothesis>           # Pre-filled template; user edits slots; explicit lock required
  <section_testable_form>        # AI derives all 4 testable form components from locked hypothesis
  <section_write_outputs>        # Write HYPOTHESIS.md, SPRINT.md, POSITIONING.md at sprint end ceremony
```

### Pattern 1: Step 3 Banner Format

**What:** A progress banner analogous to the Step 1 and Step 2 banners, rendered on Step 3 entry and after the approach is committed.

**When to use:** When Step 3 opens AND after the chosen approach is locked.

```
─── Step 3: Approaches ──────────────────────────
Context: Capacity + Insight loaded
Approach 1: [user's approach, "pending"]
Approaches: [N finalized, "pending"]
Chosen: ["pending" / approach name]
─────────────────────────────────────────────────
```

After approach is committed:
```
─── Step 3: Approaches ──────────────────────────
Approaches evaluated: A1, A2, A3 (3 total)
Chosen: A2 — [short name of chosen approach]
Backup: A1 — [short name]
─────────────────────────────────────────────────
```

**Rules:** Same visual style as Steps 1 and 2: divider lines, no emoji, width approximately 50 characters.

### Pattern 2: Context Reload at Step 3 Entry

**What:** Before asking the user anything, Claude displays the Capacity advantage, Insight advantage, and locked differentiating axes from the session context. User sees the full foundation before proposing an approach.

**When to use:** Immediately after the Step 3 banner renders on entry.

**Critical rule:** Claude reads this from the in-session conversation state — NOT from a file, NOT by re-asking the user. Capacity, Insight, and the chosen axes are all locked earlier in the same session and must be present in Claude's context window.

```markdown
<section name="section_context_reload">

## Context Reload

**When entering this section:** After the Step 3 banner renders.

Say exactly:

> "Before we look at approaches, let me pull up what we know about you:
>
> **Your Capacity:** [locked Capacity statement from Step 1]
> **Your Insight:** [locked Insight statement from Step 1]
>
> **Your differentiating axes:**
> - X-axis: [locked X-axis from Step 2]
> - Y-axis: [locked Y-axis from Step 2]
>
> Any approach we consider will need to fit these — something you can actually build,
> leveraging what you know, and reinforcing where you want to position.
>
> What's your initial approach idea?"

Wait for user response. Do NOT generate approach options before the user has proposed theirs.

</section>
```

**Why this matters:** SPRINT-12 explicitly requires that context is "loaded as active context before any approach is generated." Displaying it at entry satisfies this and orients the user before they type.

### Pattern 3: Approach Generation — User-First, One-at-a-Time

**What:** User proposes Approach 1. AI sharpens it with 1-2 probe questions. Then AI generates additional approaches one at a time until 3-4 total are finalized. Keep/drop loop per approach.

**When to use:** After context reload section.

**Sequencing rules:**
1. User proposes approach → AI asks 1-2 clarifying probes → AI records as Approach 1 (labeled A1)
2. AI proposes one more approach (filtered silently by Capacity/Insight fit and axis constraint) → user reacts: "keep" or "drop"
3. If kept, it becomes A2. AI proposes next if needed to reach 3-4 total.
4. If dropped, AI proposes a different one. Never mention filtered/excluded approaches.
5. Loop continues until 3-4 approaches are finalized.

**Probe question pattern (Claude's Discretion on wording):**

```
> "Interesting — a couple of quick questions before I record this:
>
> 1. [Question sharpening delivery mechanism, business model, or key constraint]
> 2. [Question about who specifically executes or experiences this approach]
>
> Once you answer these, I'll record this as your Approach 1."
```

**Keep/drop pattern (Claude's Discretion on exact wording):**

```
> "**Approach 2:** [description — 2-3 sentences. Grounded in your Capacity + Insight. Reinforces your differentiating axes.]
>
> Keep it or drop it?"
```

If drop: acknowledge and propose a new one without explaining why the dropped one was filtered or what wasn't proposed.

**Silent filtering rule (critical):** The workflow instruction must say: "Before proposing any AI-generated approach, internally check: Does this approach require capabilities the founder stated in Capacity? Does it leverage the Insight the founder stated? Does it reinforce the chosen differentiating axes (X and Y)? If not — do NOT propose it. Never explain why you didn't propose something. Simply propose only what passes."

### Pattern 4: 4-Matrix Sequential Evaluation

**What:** All finalized approaches are evaluated on 4 fixed 2x2 matrices, walked through one at a time. Each matrix is an ASCII grid with approach labels plotted in their quadrant.

**When to use:** After all 3-4 approaches are finalized.

**The 4 matrices with their axes:**

| Matrix | X-axis | Y-axis |
|--------|--------|--------|
| Customer Vision | Ease to use (Hard → Easy) | How perfectly it solves the problem (Partially → Perfectly) |
| Money Vision | Revenue type (One-time → Recurring long term) | Number of customers (Few → Many) |
| Pragmatic Vision | Ease to build (Hard → Easy) | Speed to build (Slow → Fast) |
| Growth Vision | Adaptability (Rigid → Adaptable) | Number of customers over time (Few → Many) |

**Matrix presentation order:** Customer Vision → Money Vision → Pragmatic Vision → Growth Vision. This order is from insight (customer value) through operational reality (build ease) to long-term optionality (growth). Keep this order.

**Rating approach:** For each matrix, Claude evaluates each approach and assigns a position (positive or negative on each axis) based on reasoning about what the approach implies for that dimension. This is Claude's judgment call — the workflow must give Claude clear axis definitions and examples.

**ASCII matrix format (same pattern as Phase 3):**

```
      [Y-axis high label]
              ^
  [A2]        |        [A1]
              |
──────────────+──────────────► [X-axis high label]
              |
  [A3]        |        [A4]
              |
      [Y-axis low label]
```

Approaches labeled with their short identifiers: A1, A2, A3, A4. The workflow should instruct Claude to:
- Assign each approach a short descriptor (e.g., A1: API-first, A2: No-code builder)
- Show position based on quadrant reasoning (no numeric scores needed — quadrant placement is sufficient)
- Stack labels vertically if multiple approaches share a quadrant

**Per-matrix flow:**
1. Name the matrix and define the two axes
2. Explain each approach's position in 1 sentence each
3. Render the ASCII grid
4. Wait for the user to absorb it before moving to the next matrix (no auto-advance)

```markdown
> **Matrix 1: Customer Vision**
> Axes: Ease to use (Hard → Easy) × How perfectly it solves the problem (Partial → Perfect)
>
> - A1 [name]: [1-sentence reasoning why it lands where it does]
> - A2 [name]: [1-sentence reasoning]
> - A3 [name]: [1-sentence reasoning]
>
> [ASCII grid]
>
> Ready to see the next matrix? (yes/next or ask questions first)"
```

### Pattern 5: Global Pattern Recommendation

**What:** After all 4 matrices are displayed, AI identifies which approach has the strongest global pattern (most consistently in the top-right, fewest bottom-left placements) and recommends it. Names second-best as backup.

**When to use:** Immediately after the 4th matrix is displayed and user is ready to commit.

**Recommendation format:**

```
> **Recommendation:**
>
> Looking across all 4 matrices, **A2 ([approach name])** has the strongest overall pattern —
> top-right in [Matrix X] and [Matrix Y], with the most favorable position in [Matrix Z].
>
> **My recommendation: A2.**
>
> Second-best: **A1 ([name])** — strong in [dimension], weaker in [dimension].
>
> You're free to choose any approach. What's your call?"
```

**Override rule:** If user picks a different approach, acknowledge and move forward without any pushback or "are you sure?" The workflow must explicitly say "accept the user's choice unconditionally."

### Pattern 6: Step 4 Banner (Stage Transition)

**What:** A visible step banner that signals the sprint has entered Step 4 (Hypothesis). Mirrors the same banner format used throughout.

**When to use:** After the user commits to an approach.

```
─── Step 4: Final Hypothesis ─────────────────────
Segment:   [X — from Step 1]
Problem:   [Y — from Step 1]
Approach:  [Z — just committed]
Adversary: [W — from Step 1]
Axes:      [U and V — from Step 2]
Hypothesis: pending
──────────────────────────────────────────────────
```

This banner shows all the hypothesis variables before the template is filled, so the user can see what they're working with.

### Pattern 7: Hypothesis Formulation — Pre-Filled Template

**What:** AI pre-fills the hypothesis template with all 6 variables from session context. User edits any slot they disagree with. Explicit lock trigger required before advancing.

**When to use:** After the Step 4 banner renders.

**Context sourcing for each variable:**

| Variable | Source |
|----------|--------|
| X (target customer) | Step 1 — locked Customer Segment |
| Y (problem) | Step 1 — locked Core Problem |
| Z (approach) | Step 3 — committed approach |
| W (main adversary) | Step 1 — main adversary from COMPETITORS.md selection |
| U (differentiator 1) | Step 2 — Manifesto phrase 1 (or X-axis label) |
| V (differentiator 2) | Step 2 — Manifesto phrase 2 (or Y-axis label) |

**Pre-fill display:**

```
> "Here's your hypothesis, pre-filled from what we've built:
>
> **If we help** [X: customer segment from Step 1]
> **solve** [Y: core problem from Step 1]
> **with** [Z: chosen approach from Step 3],
> **they will choose us over** [W: main adversary from Step 1]
> **because we are** [U: differentiator 1 from Step 2] **and** [V: differentiator 2 from Step 2].
>
> Edit any part — or say "lock it" if it's right."
```

**Iteration loop:** User can edit any slot(s). AI confirms the edit and displays the full updated hypothesis. Loop continues until user says "lock it" or equivalent. The workflow must NOT auto-advance after a single confirmation — requires explicit "lock" trigger.

### Pattern 8: Testable Form — Auto-Derived

**What:** After hypothesis is locked, AI derives all 4 testable form components automatically from the hypothesis content. No user input required to generate them.

**When to use:** Immediately after hypothesis is locked.

**The 4 components:**

| Component | What it is | How AI derives it |
|-----------|-----------|-------------------|
| Success metric | Observable, measurable sign of working | What "enough customers paying" looks like for Z solving Y for X |
| Falsification condition | Specific conditions under which hypothesis is proven wrong | N outreach attempts with M% conversion threshold |
| Main risk | Single biggest assumption that could kill this | What about X, Y, or Z is most uncertain |
| Fastest validation test | Cheapest experiment that could confirm or kill the hypothesis | Manual / landing page / direct outreach |

**Display format:**

```
> "**Your hypothesis in testable form:**
>
> **Success metric:** [specific, measurable — number + timeframe]
> **Falsification condition:** [specific threshold — if X then wrong]
> **Main risk:** [one sentence — the assumption most likely to be false]
> **Fastest validation test:** [one concrete experiment to run first]
>
> These are locked with your hypothesis. Ready to write your output files?"
```

**Design note:** These are AI-derived, not user-confirmed field-by-field. The user can iterate on the hypothesis itself (which changes the testable form automatically), but does not separately edit each component. Once the hypothesis is locked, the testable form is locked with it.

### Pattern 9: Sprint End Ceremony — Three Output File Writers

**What:** After the testable form is shown, write all 3 output files at once. Clear ceremony marking sprint completion.

**When to use:** After testable form is displayed and user confirms readiness.

**Write sequence and sources:**

```markdown
<section name="section_write_outputs">

## Sprint End — Write Output Files

**When entering this section:** After testable form is confirmed ready.

Say:
> "Sprint complete. Writing your 3 output files now."

1. Read the HYPOTHESIS.md template for structure:
   @~/.claude/get-your-shit-together/templates/HYPOTHESIS.md

   Write ./HYPOTHESIS.md with:
   - Full hypothesis statement (the locked "If we help X..." sentence)
   - Breakdown table with all 6 variables (X, Y, Z, W, U, V)
   - Success metric (from testable form)
   - Falsification condition (from testable form)
   - Main risk (from testable form)
   - Fastest validation test (from testable form)
   CRITICAL: No template placeholders remain. No square brackets [...] in output.

2. Read the SPRINT.md template for structure:
   @~/.claude/get-your-shit-together/templates/SPRINT.md

   Write ./SPRINT.md with ALL 4 steps captured:
   - Step 1: Customer, Problem, Founder Advantages, Competitors + adversary
   - Step 2: All 8+ axis ratings, chosen differentiating axes, competitor matrix positions, conflict check result, mini-manifesto
   - Step 3: All approaches (A1-A4 descriptions), 4-matrix evaluation table, recommended approach, backup, chosen approach
   - Step 4: Full hypothesis statement (matches HYPOTHESIS.md exactly)
   CRITICAL: No template placeholders remain.

3. Read the POSITIONING.md template for structure:
   @~/.claude/get-your-shit-together/templates/POSITIONING.md

   Write ./POSITIONING.md with:
   - Both differentiating axes (X and Y from Step 2, with descriptions)
   - The rationale for choosing those axes
   - The 2x2 matrix (reproduced from the Step 2 matrix — same competitor positions)
   - Competitor positions table (all competitors from COMPETITORS.md with Axis 1 score, Axis 2 score, quadrant, rationale)
   - Mini-manifesto (all 3 phrases from Step 2)
   CRITICAL: No template placeholders remain.

4. After all 3 files are written, say:
   > "Done. Your sprint is complete.
   >
   > **Written to your project directory:**
   > - `HYPOTHESIS.md` — your testable hypothesis
   > - `SPRINT.md` — the complete decision journal
   > - `POSITIONING.md` — your positioning map and manifesto
   >
   > Your next step: run the fastest validation test."

</section>
```

**CRITICAL write rule (same as COMPETITORS.md in Phase 2):** Before writing each file, read its template for structure. Fill ALL bracketed fields with real content from the session. No `[placeholder]` text may remain in any output file.

### Anti-Patterns to Avoid

- **Generating AI approaches before the user proposes theirs:** SPRINT-12 explicitly requires user-first. The workflow must not generate any approaches until after the user submits and the probe questions are answered.
- **Mentioning filtered approaches:** The silent filter is absolute. Never say "I considered X but ruled it out because..." — the user only sees viable approaches.
- **Evaluating all 4 matrices at once:** The locked decision is sequential, one matrix at a time. A table showing all approaches on all 4 matrices simultaneously is the wrong format.
- **Auto-advancing from hypothesis:** The workflow must require an explicit "lock it" trigger. A simple "yes that looks right" to the pre-filled hypothesis must not be treated as a lock — only explicit locking language advances the sprint.
- **Deriving testable form before hypothesis is locked:** The testable form depends on the locked hypothesis. Derive only after "lock it."
- **Writing output files incrementally:** All 3 files written together at sprint end. No partial writes as each step completes.
- **Leaving template placeholders in output files:** The write instruction must state this explicitly for each file. A file with `[TARGET CUSTOMER: specific role...]` still in it fails OUTPUT-01.
- **Writing POSITIONING.md using Step 3/4 data for the matrix:** POSITIONING.md's matrix is from Step 2 (the differentiating axes matrix with competitor positions). The chosen approach does not appear in the POSITIONING.md matrix — that's Step 2 data.
- **Re-reading COMPETITORS.md during Steps 3-4:** No new file reads needed. Competitor data (profiles, main adversary, names) is in conversation context from Step 1. Only template reads for write-time structure reference.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Approach filtering | Custom filter logic, scored ranking | Workflow instruction: "before proposing, internally check Capacity/Insight fit and axis constraint" | Claude reasons about fit from natural language; no code needed |
| Matrix evaluation scoring | Numeric scoring system, JSON state | Workflow instruction defining what each matrix axis means + quadrant placement | ASCII placement is quadrant-based (positive/negative), not precise coordinates |
| Global pattern detection | Algorithm counting top-right hits | Workflow instruction: "look for the approach with the most consistent top-right placement across all 4 matrices" | Claude synthesizes visual patterns from the 4 matrices already in context |
| Hypothesis template filling | Form system, slot-filling code | Workflow instruction: "pre-fill from session context, display the full sentence, wait for lock trigger" | Claude fills the template inline from conversation context |
| Output file templating | Template engine, variable substitution | Read template at write time, fill all brackets from context, write via Write tool | Same pattern as COMPETITORS.md in Phase 2 — verified to work |

**Key insight:** Steps 3 and 4 have no new algorithms. All "logic" is Claude reasoning from workflow instructions. The planner should never create tasks that involve writing Node.js or Python for any of these features.

---

## Common Pitfalls

### Pitfall 1: Context Reload Becomes a Re-Ask

**What goes wrong:** Claude says "Can you remind me of your Capacity advantage?" at Step 3 entry instead of reading from session state.

**Why it happens:** Claude may not have the exact Capacity/Insight wording reliably in working memory if the conversation is long. Without explicit instruction, it defaults to asking.

**How to avoid:** The workflow's `section_context_reload` must say: "Read the locked Capacity and Insight statements from earlier in this session — do NOT re-ask the user. Display them before asking for their approach. If you cannot find them in context, display 'not found' and proceed — do not ask the user to repeat themselves."

**Warning signs:** Step 3 opens with a question asking for the user's Capacity or Insight instead of displaying them.

### Pitfall 2: User's Approach Gets Overwritten by AI

**What goes wrong:** After the user proposes their approach idea, Claude immediately generates 3-4 AI alternatives and presents them, overshadowing the user's idea.

**Why it happens:** The workflow says "generate 3-4 approaches" without making the user-first constraint emphatic enough.

**How to avoid:** The workflow must have two distinct phases in `section_approach_generation`: (1) user-proposes → probe → record as A1, THEN (2) AI-generates one at a time. The section must explicitly say "Do NOT generate any approaches until after A1 is finalized."

**Warning signs:** After the user types their idea, the AI presents a list of 3 alternatives instead of sharpening the user's idea with probe questions.

### Pitfall 3: Matrix Evaluation Renders All 4 at Once

**What goes wrong:** Claude renders a table with all approaches on all 4 matrices simultaneously rather than walking through each matrix.

**Why it happens:** The SPRINT.md template shows a summary table of all approaches across all matrices — Claude may confuse the journal format with the live interaction format.

**How to avoid:** The workflow must say explicitly: "Walk through each matrix one at a time. Do NOT render all 4 matrices in a single response. Show Matrix 1, wait for the user to engage or say 'next', then show Matrix 2, etc." The SPRINT.md summary table is for the output file only, not for the live evaluation UX.

**Warning signs:** First matrix evaluation response contains all 4 matrices.

### Pitfall 4: Hypothesis Lock Is Triggered by Implicit Confirmation

**What goes wrong:** User says "Yeah that looks good" and the sprint auto-advances to writing output files without an explicit lock.

**Why it happens:** The workflow's hypothesis section doesn't make the lock trigger explicit enough.

**How to avoid:** The workflow must say: "Do NOT advance to writing output files until the user says 'lock it', 'locked', 'finalize', or equivalent explicit lock language. A simple 'yes' or 'that's good' is NOT a lock — ask 'Ready to lock this hypothesis?' if ambiguous."

**Warning signs:** Sprint advances from hypothesis to output files after a vague confirmation.

### Pitfall 5: SPRINT.md Missing Step 2 or Step 3 Detail

**What goes wrong:** SPRINT.md is written but is thin — the approach evaluation table is missing, or only the chosen approach is recorded, or competitor matrix positions are omitted.

**Why it happens:** The write instruction is too brief about what "complete" means for each step.

**How to avoid:** The workflow write instruction for SPRINT.md must list every field explicitly: all 8 axis ratings, all approach descriptions (A1-A4), the full matrix table, which was recommended, which was backup, which was chosen, and the full hypothesis statement. Not "fill in the SPRINT.md template" — that's too vague.

**Warning signs:** SPRINT.md has many sections with "[placeholder]" text still in them, or it's shorter than expected.

### Pitfall 6: POSITIONING.md Uses Wrong Matrix Data

**What goes wrong:** POSITIONING.md's 2x2 matrix shows the approach evaluation results instead of the Step 2 competitor positioning matrix.

**Why it happens:** Phase 4 has two different matrices — the 4-matrix approach evaluation and the Step 2 positioning matrix. These are easy to confuse.

**How to avoid:** The workflow write instruction must say explicitly: "POSITIONING.md's 2x2 matrix is from Step 2 — it shows competitors plotted on the two differentiating axes chosen in Step 2. It does NOT show approaches or the Step 3 matrices. The Step 3 evaluation exists in SPRINT.md, not POSITIONING.md."

**Warning signs:** POSITIONING.md shows A1/A2/A3/A4 labels instead of competitor names.

### Pitfall 7: Output Files Written Before Sprint End

**What goes wrong:** One or two files are written earlier in the session (e.g., POSITIONING.md written right after Step 2) and the sprint end only writes the remaining ones.

**Why it happens:** The workflow doesn't make the "all at once at sprint end" constraint visible enough.

**How to avoid:** The write section must be the ONLY place where Write tool calls appear in the entire workflow for these 3 files. The workflow section header must say "This is the ONLY place where HYPOTHESIS.md, SPRINT.md, and POSITIONING.md are written."

**Warning signs:** The workflow has Write calls for output files scattered across multiple sections.

---

## Code Examples

### Step 3 Banner Block

```markdown
<step3_banner>
<!-- BANNER RENDER INSTRUCTION — reusable for Step 3. Render on Step 3 entry AND after approach is committed. -->

The Step 3 banner format on entry:

─── Step 3: Approaches ──────────────────────────
Context: loading...
Approaches: pending
Chosen: pending
─────────────────────────────────────────────────

After approaches are finalized and committed:

─── Step 3: Approaches ──────────────────────────
Approaches: [N] finalized (A1, A2, A3[, A4])
Recommended: [A#] — [short name]
Chosen: [A#] — [short name]
─────────────────────────────────────────────────

Rules: Same visual style as Step 1 and Step 2 banners. No emoji. Width ~50 chars.
</step3_banner>
```

### Context Reload Section

```markdown
<section name="section_context_reload">

## Step 3: Context Reload and Approach Prompt

**When entering this section:** Immediately after the Step 3 banner renders.

Read the locked Capacity and Insight statements from earlier in this session.
Do NOT re-ask the user. Display them now.

Say:

> "Before we look at approaches, let me bring up what we established about you:
>
> **Your Capacity:** [locked Capacity statement from Step 1]
> **Your Insight:** [locked Insight statement from Step 1]
>
> **Your differentiating position:**
> - [X-axis locked from Step 2]
> - [Y-axis locked from Step 2]
>
> Any approach we consider will need to fit what you can actually build,
> draw on what you know first-hand, and reinforce where you want to sit
> relative to competitors.
>
> With that in mind — what's your initial approach idea?"

Wait for user response. Do NOT generate any approach options before the user responds.

</section>
```

### Approach Generation Section

```markdown
<section name="section_approach_generation">

## Approach Generation (SPRINT-12)

**When entering this section:** After user has responded with their initial approach idea.

**Phase 1: Sharpen the user's approach**

Ask 1-2 probe questions to clarify the approach before recording it as A1.
Ask them together in one message — do not string probes over multiple turns.

Example probe questions (adjust to what the user actually said):
- "How would this be delivered — is this a self-serve product, or does it involve hands-on work from you?"
- "Who specifically experiences the core value — the customer directly, or someone else first?"

Wait for user to answer. Then record the approach as A1 with a short name and 2-3 sentence description.
Announce: "Got it — this is Approach 1: [short name]. [Description]"

**Phase 2: AI-generated approaches (one at a time)**

INTERNAL FILTER (do NOT explain or expose this):
Before proposing any approach, verify internally:
- Does this require capabilities explicitly stated in the user's Capacity? If not, skip it silently.
- Does this leverage the specific Insight the user stated? If not, skip it silently.
- Does this reinforce the differentiating axes (X and Y from Step 2)? If not, skip it silently.
Never mention what was filtered. Never say "I considered X but..."

Generate one additional approach at a time. For each:

> "**Approach [N]:** [short name]
>
> [2-3 sentence description — grounded in the founder's Capacity and Insight, constrained by differentiating axes]
>
> Keep it or drop it?"

Wait for user reaction.
- If "keep": record as A[N], assign the next letter label, continue to next approach if < 4 total.
- If "drop": propose a different approach (still filtered). Do not explain what was dropped or why.

Continue until 3-4 total approaches are finalized (A1 + 2-3 AI-generated).

After 3-4 approaches are finalized, confirm the lineup:

> "Here are your [N] approaches:
> - **A1:** [short name] — [one-line summary]
> - **A2:** [short name] — [one-line summary]
> - **A3:** [short name] — [one-line summary]
> [- **A4:** ...if applicable]
>
> Ready to evaluate these across 4 lenses?"

Wait for user confirmation before proceeding to section_approach_evaluation.

</section>
```

### 4-Matrix Evaluation Section (per-matrix example)

```markdown
<section name="section_approach_evaluation">

## 4-Matrix Evaluation (SPRINT-13)

**When entering this section:** After all approaches are finalized and user is ready.

Walk through each of the 4 matrices sequentially — one at a time. Do NOT render all 4 in a single response.

**For each matrix:**
1. Name the matrix and define its two axes
2. Explain each approach's position in 1 sentence
3. Render the ASCII 2x2 grid with approach labels
4. Wait for user to say "next" or ask questions before proceeding

---

**Matrix 1: Customer Vision**
Axes: Ease to use (Hard → Easy) × How perfectly it solves the problem (Partially → Perfectly)

> [Explain each approach's quadrant placement, 1 sentence each]
>
> [ASCII grid — same format as Phase 3 competitor matrix, but with A1/A2/A3/A4 labels]
>
> Ready for Matrix 2?

---

**Matrix 2: Money Vision**
Axes: Revenue type (One-time → Recurring long term) × Number of customers (Few → Many)

> [same structure]

---

**Matrix 3: Pragmatic Vision**
Axes: Ease to build (Hard → Easy) × Speed to build (Slow → Fast)

> [same structure]

---

**Matrix 4: Growth Vision**
Axes: Adaptability (Rigid → Highly Adaptable) × Number of customers over time (Few → Many)

> [same structure]

After Matrix 4: proceed immediately to section_approach_recommendation.

</section>
```

### Hypothesis Section

```markdown
<section name="section_hypothesis">

## Step 4: Final Hypothesis (SPRINT-15)

**When entering this section:** After the Step 4 banner renders.

Pre-fill the hypothesis from session context:

> "Here's your hypothesis, built from everything we've decided:
>
> **If we help** [X — customer segment from Step 1]
> **solve** [Y — core problem from Step 1]
> **with** [Z — chosen approach from Step 3],
> **they will choose us over** [W — main adversary flagged in Step 1]
> **because we are** [U — Differentiator 1 from Step 2 manifesto] **and** [V — Differentiator 2 from Step 2 manifesto].
>
> Edit any part you'd change, or say **"lock it"** to finalize."

Wait for user response.

**Iteration loop:**
- If user edits one or more slots: update, display the full hypothesis again, ask "Anything else to change, or lock it?"
- If user says "lock it" / "locked" / "finalize" / "done": lock the hypothesis. Proceed to section_testable_form.
- A simple "yes" or "looks good" is NOT a lock. Ask "Ready to lock this?" if ambiguous.

Do NOT advance until explicit lock language is received.

</section>
```

### Output File Writer Section

```markdown
<section name="section_write_outputs">

## Sprint End — Output Files (OUTPUT-01, OUTPUT-02, OUTPUT-03)

**When entering this section:** After the testable form has been derived and displayed.

This is the ONLY place in the workflow where HYPOTHESIS.md, SPRINT.md, and POSITIONING.md are written.

Say: "Sprint complete. Writing your 3 output files now."

**1. Write HYPOTHESIS.md**

Read template for structure: @~/.claude/get-your-shit-together/templates/HYPOTHESIS.md

Write ./HYPOTHESIS.md with:
- The full hypothesis statement as a single sentence
- Breakdown table (X, Y, Z, W, U, V — all 6 variables)
- Success metric (from testable form)
- Falsification condition (from testable form)
- Main risk (from testable form)
- Fastest validation test (from testable form)
CRITICAL: No template placeholders. No square brackets remain in the file.

**2. Write SPRINT.md**

Read template for structure: @~/.claude/get-your-shit-together/templates/SPRINT.md

Write ./SPRINT.md with ALL of the following:
- Step 1: target customer (options considered, chosen, rationale), core problem (options, chosen, validation result), founder advantages (Capacity, Insight, Motivation), competitors (all selected, main adversary flagged, research summary)
- Step 2: all 8+ axis ratings, chosen X-axis and Y-axis, conflict check result, mini-manifesto (all 3 phrases)
- Step 3: all approach descriptions (A1 through A[N]), 4-matrix evaluation table, recommended approach, backup approach, chosen approach
- Step 4: full hypothesis statement (matches HYPOTHESIS.md exactly)
CRITICAL: No template placeholders. Every field has real content.

**3. Write POSITIONING.md**

Read template for structure: @~/.claude/get-your-shit-together/templates/POSITIONING.md

Write ./POSITIONING.md with:
- Axis 1 (X-axis from Step 2): name, description, rationale for choosing
- Axis 2 (Y-axis from Step 2): name, description, rationale for choosing
- 2x2 matrix from Step 2 (competitor positions — NOT approach labels)
- Competitor positions table: all competitors from Step 1 with axis scores, quadrant, rationale
- Mini-manifesto: all 3 phrases from Step 2

CRITICAL: POSITIONING.md's matrix shows COMPETITORS (from Step 2). It does NOT show approaches (from Step 3).
CRITICAL: No template placeholders remain.

**After all 3 files are written:**

> "Done. Your Foundation Sprint is complete.
>
> **Files written to your project directory:**
> - `HYPOTHESIS.md` — your testable hypothesis
> - `SPRINT.md` — the complete decision journal
> - `POSITIONING.md` — your positioning map and manifesto
>
> **Your next move:** [fastest validation test from HYPOTHESIS.md]"

</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Steps 3-4 are a stub | Steps 3-4 fully implemented in Phase 4 | Phase 4 | Sprint can complete end-to-end |
| POSITIONING.md never written | POSITIONING.md written at sprint end | Phase 4 | Permanent record of Step 2 decisions |
| HYPOTHESIS.md never written | HYPOTHESIS.md written at sprint end | Phase 4 | Testable hypothesis persists after session |
| SPRINT.md never written | SPRINT.md written at sprint end | Phase 4 | Complete decision journal for post-sprint review |

**Key existing patterns to preserve:**

- **step3_stub location:** Lines 887-903 of `foundation-sprint.md`. The entire block from `<step3_stub>` to `</step3_stub>` is replaced. No content above line 886 is touched.
- **Install pattern:** `node bin/install.js` from `C:/Users/raphg/Desktop/GYST` (not from inside the package). Confirmed working from Phase 3.
- **Banner visual language:** Same format (─── heading ─────) as Steps 1 and 2. No emoji. Width ~50 chars.
- **No-web-search constraint in Step 3:** Approaches are generated from reasoning about founder advantages and constraints — not from WebSearch. The workflow must not call WebSearch in Steps 3-4.
- **COMPETITORS.md not re-read in Steps 3-4:** Competitor data is already in session context from Step 1. No additional file reads for competitor info. Only template reads at write time.

---

## Plan Decomposition Recommendation

Phase 4 maps cleanly to the roadmap's suggested two plans:

**Plan 04-01: Step 3 — Approach Generation and Matrix Evaluation**
- Replace `<step3_stub>` (lines 887-903) with:
  - `<step3_banner>` — Step 3 banner format
  - `<section_context_reload>` — display Capacity/Insight/axes before any approach generation
  - `<section_approach_generation>` — user-first approach + probe + AI approaches (silently filtered) + keep/drop loop
  - `<section_approach_evaluation>` — 4 sequential ASCII matrices
  - `<section_approach_recommendation>` — global pattern recommendation + user commits to chosen approach
- Section ends with flow to `<step4_banner>`
- File grows from 903 lines to approximately 1,100 lines

**Plan 04-02: Step 4 — Hypothesis, Testable Form, and Output Files**
- Append after Plan 04-01:
  - `<step4_banner>` — Stage transition banner with all hypothesis variables pre-shown
  - `<section_hypothesis>` — Pre-filled template; explicit lock required
  - `<section_testable_form>` — Auto-derived 4 components after lock
  - `<section_write_outputs>` — Three Write tool calls + sprint end ceremony
- File grows from ~1,100 to approximately 1,350 lines
- Sprint is now complete end-to-end — no stubs remain

---

## Open Questions

1. **How to handle approach evaluation when Claude hasn't kept precise approach descriptions**
   - What we know: By the time the matrix evaluation runs, Claude should have A1-A4 descriptions in context. The session is single-turn and the context window is ample.
   - What's unclear: If a user has a very long Step 1 conversation, Capacity/Insight might be deep in context. The context reload section's "read from session" instruction should be specific enough.
   - Recommendation: The context reload section should instruct Claude to surface Capacity and Insight verbatim, not paraphrase. Include "if you cannot find the exact wording, display your best recollection and ask the user to confirm before proceeding."

2. **Matrix evaluation: numeric scores vs. pure quadrant placement**
   - What we know: The locked decision is quadrant placement (top-left, top-right, etc.) not numeric scores. The matrices are evaluative/qualitative, not precise.
   - What's unclear: Whether the planner should specify a scoring rubric per axis or leave it as pure Claude judgment.
   - Recommendation: Leave it as Claude's judgment per matrix. The workflow defines what each axis means (see Pattern 4 above) and specifies quadrant placement rules. No numeric scoring — this avoids false precision and keeps the evaluation conversational.

3. **U and V in hypothesis: manifesto phrases or axis labels**
   - What we know: The hypothesis template says "because we are U and V." The manifesto has 2 differentiators + 1 safeguard. The chosen differentiating axes also represent differentiation.
   - What's unclear: Should U and V be the manifesto differentiator phrases (more evocative) or the axis labels (more structural)?
   - Recommendation: Use the manifesto differentiator phrases for U and V — they were written specifically as human-readable positioning statements. The axis labels are the underlying mechanism; the manifesto phrases are the expression. The HYPOTHESIS.md template uses "DIFFERENTIATOR 1" and "DIFFERENTIATOR 2" which aligns with manifesto phrases.

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/04-approaches-hypothesis-outputs-steps-3-4/04-CONTEXT.md` — All locked decisions; flow, matrices, hypothesis template, output files; direct specification
- `.planning/REQUIREMENTS.md` — Requirement definitions SPRINT-12 through SPRINT-16 and OUTPUT-01 through OUTPUT-03 verbatim
- `get-your-shit-together/workflows/foundation-sprint.md` (903 lines) — Exact file to be extended; `<step3_stub>` confirmed at lines 887-903
- `get-your-shit-together/templates/HYPOTHESIS.md` — Output schema confirmed; 6-variable breakdown table, testable form structure (success metric, falsification, main risk, fastest test)
- `get-your-shit-together/templates/SPRINT.md` — Output schema confirmed; all 4 steps, approach evaluation table structure, matrix evaluation summary format
- `get-your-shit-together/templates/POSITIONING.md` — Output schema confirmed; axes, 2x2 matrix, competitor positions table, mini-manifesto
- `.planning/phases/03-differentiation-step-2/03-RESEARCH.md` — Architecture patterns, banner format, ASCII matrix pattern, section naming conventions all inherited
- `.planning/phases/03-differentiation-step-2/03-01-PLAN.md` and `03-02-PLAN.md` — Plan structure, task format, verify commands, success criteria pattern — Phase 4 plans follow the same template

### Secondary (MEDIUM confidence)
- Foundation Sprint framework — 4-matrix evaluation structure: Customer Vision, Money Vision, Pragmatic Vision, Growth Vision — these matrix names and axis pairs are consistent with the framework's approach evaluation methodology as described in secondary sources

### Tertiary (LOW confidence)
- Matrix axis label choices (e.g., "Partially → Perfectly", "Rigid → Highly Adaptable") — derived from Phase 4 CONTEXT.md descriptions and first principles, not verified against the Click book directly. The planner should treat these as working definitions and adjust wording if the actual labels are known.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — identical to Phases 2 and 3; no new tools
- Architecture patterns: HIGH — direct inspection of all output templates, plan files, and existing workflow; section structure verified from Phase 3 plans
- Approach generation flow: HIGH — directly specified in CONTEXT.md locked decisions
- Matrix evaluation: MEDIUM — matrix names and axes confirmed from CONTEXT.md; axis label wording is interpretation from descriptions
- Hypothesis flow: HIGH — template structure verified from HYPOTHESIS.md template; lock trigger pattern is established UX pattern from prior steps
- Output file writing: HIGH — template structures verified directly; Write tool pattern confirmed working from Phase 2 (COMPETITORS.md)

**Research date:** 2026-02-27
**Valid until:** 2026-03-27 (stable domain — no external dependencies; all sources are internal project files)
