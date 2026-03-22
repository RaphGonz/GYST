# Stack Research

**Domain:** Structured idea evaluation framework integration into an existing markdown-based Claude Code sprint workflow
**Researched:** 2026-03-22
**Confidence:** HIGH — 5PM framework sourced from Rob Walling's official episode transcript (Episode 628, startupsfortherestofus.com); existing workflow patterns verified by direct code read; markdown rendering patterns verified against working Step 2 and Step 3 sections already in production.

---

## What This Milestone Adds to the Stack

v1.1 used: command file + workflow files (per language) + templates + sub-agent. All pure markdown.

v1.2 adds: **zero new technologies.** The additions are new sections inside existing workflow files, a new output template (5PM-SCORECARD.md), and market-sizing search queries added to the inline research step. The stack does not change — the pattern library expands with three new techniques.

---

## Recommended Stack

### Core Technologies

No changes. The v1.2 stack is identical to v1.1:

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Claude Code slash commands (`.claude/commands/`) | Current | Command entry point + argument routing | Already the GYST execution model; unchanged |
| Markdown workflow files | n/a | Sprint execution with 5PM lenses | Pure markdown already handles all matrix rendering and scoring needed |
| ASCII 2x2 grid rendering pattern | n/a | Important/Urgent matrix, Pain to Validate matrix | Already proven in Steps 2 and 3 — same pattern reused verbatim |
| Markdown GFM table | n/a | 5PM Scorecard output, Purchaser profile, scoring summary | Already used in SPRINT.md, HYPOTHESIS.md, COMPETITORS.md |
| Inline `WebSearch` tool call | n/a | Market sizing research (new in Step 1) | Already used for problem validation; extend the same pattern |
| `@`-include for templates | n/a | 5PM-SCORECARD.md template injection | Already used for all other output templates |

### New Pattern: Scored Lens Block (not a library — a workflow instruction shape)

The 5PM framework is explicitly NOT a point-based scoring system (Walling: "No final score exists — the goal is comparative analysis"). The workflow must reflect this. The right representation is a **lens block** — a structured prose+table unit that records a qualitative signal (Favorable / Caution / Unfavorable) per dimension, not a numeric score.

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| Lens block with signal column | Represent each 5PM dimension assessment without false numerical precision | Every 5PM dimension in the scorecard and in the SPRINT.md journal |
| ASCII 2x2 grid (existing) | Render Important/Urgent matrix for Problem and Pain to Validate matrix per approach | Reuse the exact grid format from section_matrix_render — no new syntax |
| GFM Markdown table with signal indicators | Render the 5PM Scorecard summary in 5PM-SCORECARD.md | The scorecard output file only |
| Signal tokens: `FAVORABLE` / `CAUTION` / `UNFAVORABLE` | Machine-readable-ish column value that is also human-readable | Every row of the 5PM summary table |

### Scorecard Output Template Structure

The 5PM-SCORECARD.md template must follow the existing GYST template conventions:

- HTML comment header explaining the file's purpose (matches HYPOTHESIS.md, SPRINT.md pattern)
- One section per 5PM dimension — same order as the framework: Problem, Purchaser, Pricing Model, Market, Product-Founder Fit, Pain to Validate
- A summary table at the top (like the Breakdown table in HYPOTHESIS.md) showing all six signals at a glance
- No numeric final score — the scorecard closes with a qualitative "Verdict" field

Example summary table shape (to be used in the template):

```markdown
| Dimension | Signal | Key Rationale |
|-----------|--------|---------------|
| Problem | FAVORABLE | Important and urgent — aspirin, not vitamin |
| Purchaser | CAUTION | B2B, tech-adopting, but pricing sensitivity unconfirmed |
| Pricing Model | FAVORABLE | Subscription viable at $[ARPA]/month |
| Market | FAVORABLE | [Size] market, growing, reachable via [channel] |
| Product-Founder Fit | CAUTION | Strong on Capacity, limited network in space |
| Pain to Validate | FAVORABLE | Conversable before code; MVP possible in [timeframe] |
```

### Important/Urgent 2x2 Matrix: Exact Rendering Pattern

The Problem dimension uses a 2x2 whose axes are **Importance** (Not Important → Important) and **Urgency** (Not Urgent → Urgent). The ideal quadrant is top-right: Important AND Urgent.

Use the existing Step 2 / Step 3 ASCII grid format verbatim — no new syntax needed:

```
          Important
              ^
  [ideas that  |  Your idea
   feel nice]  |  lands here (goal)
               |
───────────────+──────────────► Urgent
               |
  [ignore]     |  [bandaid fixes
               |   nobody keeps]
          Not Important
```

Placement rule: the workflow instructs Claude to place the idea in the quadrant that matches the founder's answers to "Is this important to your customer?" and "Is this urgent for them right now?" The grid is rendered once and does not require user scoring — Claude places the idea based on conversation evidence.

### Pain to Validate 2x2 Matrix: Exact Rendering Pattern

Per approach in Step 3, the Pain to Validate lens evaluates **Validation Speed** (Slow → Fast) versus **MVP Feasibility** (Hard → Easy). Same ASCII grid format.

```
          Fast to validate
                ^
  [conversable  |  [conversable
   but hard     |   AND easy —
   to build]    |   ideal]
                |
────────────────+──────────────► Easy to build MVP
                |
  [avoid]       |  [risky — easy
                |   to overbuild]
          Slow to validate
```

This reuses the Step 3 four-matrix pattern exactly: one grid per approach, rendered sequentially (not all at once), user says "next" to advance.

### Market Sizing: Research Query Patterns for Claude's Web Search

The Market dimension requires two research inputs:
1. **AI research** — Claude searches for market size, growth rate, and reach signals
2. **Founder perception** — Claude asks the founder a direct question about market size

These run in the same inline WebSearch pattern already used for problem validation in RESEARCH-03. No new tooling.

**Market sizing query templates (embed these in the workflow instruction):**

```
Query 1 (size): "[customer segment] market size [current year] OR [current year - 1]"
Query 2 (growth): "[customer segment] market growth rate CAGR [current year]"
Query 3 (reach): "how do [customer segment] discover new tools" OR "[customer segment] communities forums newsletters"
```

Claude runs these queries, synthesizes what it finds, and reports:
- Estimated market size range (with source date and confidence note)
- Growth trajectory signal: growing / flat / declining
- Primary reachability channel(s) found

If market data is not found or is older than 3 years, Claude flags it as "unverified — founder should validate" rather than suppressing the finding.

**Founder perception question (after AI research):**

"Based on what I found: [AI summary]. How does that match your intuition? Do you believe there are enough customers here to reach $[target ARR]?"

This follows the existing RESEARCH-03 pattern: AI finds, AI shares, user confirms or overrides.

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| Signal tokens (FAVORABLE / CAUTION / UNFAVORABLE) | Numeric 1-5 score per dimension | Contradicts Walling's explicit design: "not a point-based scoring system" — numeric scores imply false precision and distort qualitative judgment |
| Signal tokens (FAVORABLE / CAUTION / UNFAVORABLE) | Emoji (green/yellow/red circles) | Emoji are explicitly banned in GYST banners and output files (PROJECT.md key decisions); consistency requires text-only signals |
| ASCII 2x2 grid (existing pattern) | Mermaid diagram | Claude Code renders Mermaid only in supported contexts; pure ASCII is guaranteed to render in all markdown viewers and terminals |
| ASCII 2x2 grid (existing pattern) | HTML table with colspan | No binary tooling constraint; HTML is inconsistently rendered in markdown contexts; ASCII is already proven |
| Inline WebSearch for market sizing | gyst-researcher sub-agent | Market sizing is a bounded, 2-3 query task — spawning a sub-agent adds latency and complexity for what the existing inline search pattern handles cleanly in one step |
| Per-section 5PM integration in existing workflow | Separate `/gyst:5pm` command | The 5PM dimensions are woven into Steps 1 and 3 at specific decision points — a separate command breaks the linear session flow and creates context-switching friction |
| Qualitative verdict in 5PM-SCORECARD.md | Pass/fail gate that blocks sprint progress | Walling is explicit: no absolute gatekeepers; each dimension is a data point, not a dealbreaker; the workflow must not refuse to continue based on 5PM signals |

---

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Numeric scoring (weighted sum, total score) | Rob Walling explicitly designed 5PM as qualitative — a point system misrepresents the framework and creates false confidence | Signal tokens (FAVORABLE / CAUTION / UNFAVORABLE) with written rationale |
| External scoring API or database | No state persistence exists in GYST; no session carries between sprints; an API would require auth, keys, and a persistence layer none of which exist | Inline assessment stored in 5PM-SCORECARD.md written at sprint end |
| Mermaid or PlantUML for matrix rendering | Rendering is context-dependent; ASCII grids already work in production for Steps 2 and 3 | Existing ASCII grid pattern from section_matrix_render |
| Progress bar or gauge visualization | No rendering primitive available in plain markdown beyond character tricks; adds visual noise without semantic value | Signal token in the summary table column |
| Separate 5PM session or command | Fragment the linear sprint session; require the user to manage state across commands | 5PM questions integrated into Steps 1 and 3 at their natural decision points |
| Walling's 6 dimensions re-ordered | The ordered importance (Problem first, Purchaser second, etc.) is structural — reordering changes what the founder focuses on when | Maintain exact 5PM order in both the workflow and the scorecard |
| Translated gyst-researcher for market research | Market data is in English regardless of session language; sub-agent already stays English-only | Extend inline WebSearch (which already runs in English for problem validation) |
| "Vitamin vs. aspirin" binary gate | Too rigid — founders often have partial answers; the Important/Urgent 2x2 captures nuance better | Important/Urgent 2x2 grid with narrative placement rationale |

---

## Stack Patterns by Scenario

**For the Important/Urgent 2x2 (Problem dimension, Step 1):**
- One ASCII grid, rendered once, after founder answers two questions
- Placement is Claude's judgment from conversation evidence, not user scoring
- No "next" prompt needed — single grid, immediately proceed to Purchaser

**For the Pain to Validate matrix (Step 3, per approach):**
- One ASCII grid per approach, rendered inside the existing 4-matrix evaluation loop
- Becomes Matrix 5 in the sequence (after the existing 4)
- Same "next" gate behavior as Matrices 1-4
- Axes: Validation Speed (Slow → Fast) × MVP Feasibility (Hard → Easy)

**For market sizing in Step 1:**
- 2-3 inline WebSearch calls, same as RESEARCH-03
- Run after problem validation, before or during competitor research (natural point in Step 1 flow)
- Results feed both the Market section of the 5PM-SCORECARD.md and the SPRINT.md journal

**For the 5PM-SCORECARD.md template (new file):**
- Located at `templates/5PM-SCORECARD.md` (English)
- Each language gets `templates/{iso}/5PM-SCORECARD.md` (translated)
- Same `@`-include injection pattern as HYPOTHESIS.md, SPRINT.md, POSITIONING.md
- Written at sprint end in section_write_outputs, same as other 3 output files
- Zero-placeholder rule applies: no `[brackets]` may remain in the written file

**For adding the 5PM-SCORECARD.md output to existing languages (FR, JA, PT):**
- Translate the template, add to `templates/{fr|ja|pt}/5PM-SCORECARD.md`
- Add one entry to the `write_outputs` section in each language workflow
- No changes to the command routing file or the English workflow structure

---

## File Naming and Location Conventions

| File | Location | Convention |
|------|----------|-----------|
| 5PM Scorecard template (English) | `templates/5PM-SCORECARD.md` | SCREAMING-KEBAB-CASE, matches existing template names |
| 5PM Scorecard template (French) | `templates/fr/5PM-SCORECARD.md` | Identical filename, language-scoped subdirectory |
| 5PM Scorecard template (Japanese) | `templates/ja/5PM-SCORECARD.md` | Identical filename, language-scoped subdirectory |
| 5PM Scorecard template (Portuguese) | `templates/pt/5PM-SCORECARD.md` | Identical filename, language-scoped subdirectory |
| Written output (sprint session) | `./5PM-SCORECARD.md` | Written to user's working directory, same as other output files |

The section name for the output write step should be `write_5pm_scorecard` or included inside the existing `section_write_outputs` — consistent with the existing `write_competitors_md` / `section_write_outputs` naming convention.

---

## Version Compatibility

| Component | Compatibility Note |
|-----------|-------------------|
| Existing ASCII grid format | No changes needed — the same grid format from section_matrix_render works for both new 5PM matrices |
| `section_write_outputs` | Extend with a fourth Write call for 5PM-SCORECARD.md — same pattern as the three existing calls |
| Language workflows (FR, JA, PT) | Require the same 5PM section additions as the English workflow, plus translated 5PM-SCORECARD.md templates |
| SPRINT.md template | Requires a new `### 5PM Assessment` subsection within Step 1 and Step 3 to record the scorecard signals in the journal |
| Inline WebSearch | Already in `allowed-tools`; no changes needed for market research queries |

---

## Sources

- Episode 628, Startups For the Rest of Us — Rob Walling's 5PM Pre-Validation Framework: https://www.startupsfortherestofus.com/episodes/episode-628-the-5-pm-pre-validation-framework
  - 5PM dimensions and their ordering — HIGH confidence (official source)
  - "Not a point-based scoring system" design decision — HIGH confidence (direct quote)
  - B2C/B2A/B2B/B2E purchaser hierarchy — HIGH confidence
  - Important/Urgent 2x2 for Problem dimension — HIGH confidence
  - Pain to Validate as near-equivalent importance to other dimensions — HIGH confidence
- Existing GYST workflow (`get-your-shit-together/workflows/foundation-sprint.md`) — read directly
  - ASCII grid format (section_matrix_render, section_approach_evaluation) — HIGH confidence (in production)
  - Inline WebSearch pattern (RESEARCH-03, section_problem) — HIGH confidence (in production)
  - Output template injection pattern (section_write_outputs) — HIGH confidence (in production)
  - section_write_outputs zero-placeholder rule — HIGH confidence
- Existing GYST templates (HYPOTHESIS.md, SPRINT.md, POSITIONING.md) — read directly
  - GFM table structure in output files — HIGH confidence (in production)
  - HTML comment header convention — HIGH confidence (in production)
- PROJECT.md (GYST) — read directly
  - No binary tooling constraint — HIGH confidence (explicit project constraint)
  - Emoji ban in output files — HIGH confidence (Key Decisions table)

---

*Stack research for: GYST v1.2 — 5PM Framework integration into Foundation Sprint workflow*
*Researched: 2026-03-22*
