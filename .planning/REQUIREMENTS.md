# Requirements: Get Your Shit Together (GYST)

**Defined:** 2026-02-25
**Core Value:** One command, one session, one testable hypothesis — solo entrepreneurs get the clarity the Foundation Sprint was designed to produce, without needing a team.

## v1 Requirements

### Sprint Flow

- [ ] **SPRINT-01**: User can start a Foundation Sprint from scratch with `/gyst:foundation-sprint`
- [ ] **SPRINT-02**: Step 1 (The Basics) — User can identify and select a target customer segment from AI-generated options
- [ ] **SPRINT-03**: Step 1 — User can identify and select the core problem/pain point from AI-generated options
- [ ] **SPRINT-04**: Step 1 — AI verifies client-problem fit (is this pain real, critical, and frequent for this specific client?)
- [ ] **SPRINT-05**: Step 1 — User can articulate founder advantages across three dimensions: Capacity (what you can build), Insight (what you've seen before others), Motivation (why you're doing this)
- [ ] **SPRINT-06**: Step 1 — User can map direct and indirect competitors and identify the main adversary (the one capturing the budget or habit today)

- [ ] **SPRINT-07**: Step 2 (Differentiation) — User can rate their dream company on the 8 standard bipolar axes (slow/fast, hard/easy, expensive/free, complex/simple, dumb/smart, siloed/integrated, manual/automatic, and one more)
- [ ] **SPRINT-08**: Step 2 — User can add custom bipolar axes relevant to their specific domain and client
- [ ] **SPRINT-09**: Step 2 — When user proposes 2 axes as differentiators, AI automatically researches and rates all identified competitors on those 2 axes, then plots the full 2x2 matrix
- [ ] **SPRINT-10**: Step 2 — If any competitor lands in the top-right quadrant (same as the dream company), AI flags the conflict and prompts the user to choose different axes
- [ ] **SPRINT-11**: Step 2 — User can write a 3-phrase mini-manifesto: Differentiator 1, Differentiator 2, Safeguard (formulated as advice to new team members, not marketing copy)

- [ ] **SPRINT-12**: Step 3 (Approaches) — User can generate and explore 3-4 distinct solution approaches (not UI variants — genuinely different mechanisms)
- [ ] **SPRINT-13**: Step 3 — Each approach is evaluated on 4 standard 2x2 matrices: Customer Vision (ease × solves perfectly), Money Vision (recurring revenue × number of clients), Pragmatic Vision (ease to build × speed to build), Growth Vision (adaptability × client acquisition over time)
- [ ] **SPRINT-14**: Step 3 — AI identifies the approach with the strongest global pattern (consistently top-right across matrices) and recommends it, keeping the 2nd best as backup

- [ ] **SPRINT-15**: Step 4 (Final Hypothesis) — User fills in the full hypothesis template: "If we help X solve Y with Z, they will choose us over W because we are U and V"
- [ ] **SPRINT-16**: Step 4 — AI transforms the hypothesis into a testable form: success metric, falsification condition, main risk, and fastest test to validate

### Interaction Model

- [ ] **INTER-01**: Sprint opens with a clear onboarding message explaining the 4 steps, the no-brainstorm method, and what the session produces
- [ ] **INTER-02**: At each step, AI asks open freeform questions first, then proposes a concrete set of options for the user to choose from (replacing the silent-vote group mechanic)
- [ ] **INTER-03**: Stage banners and progress indicators clearly show which step is active and what has been decided so far

### Research & Competitor Rating

- [ ] **RESEARCH-01**: During Step 1, AI researches the identified competitors (direct and indirect) via web search to build a factual competitor profile before Differentiation
- [ ] **RESEARCH-02**: During Step 2, when the user proposes 2 axes, AI automatically rates each identified competitor on those axes via web research, with visible rationale for each rating
- [ ] **RESEARCH-03**: During Step 1, AI validates the proposed customer segment and pain point — confirms they exist and that the pain is real (not assumed)

### Navigation

- [ ] **NAVIG-01**: At the end of each step, user is presented with three options: iterate more within the step, advance to the next step, or go back to a specific earlier step
- [ ] **NAVIG-02**: When user goes back to an earlier step, all downstream decisions and outputs are discarded and rebuilt from that point — no patching
- [ ] **NAVIG-03**: Each step loops until the user explicitly chooses to advance — never auto-advanced

### Output

- [ ] **OUTPUT-01**: `HYPOTHESIS.md` produced at end of sprint — full X/Y/Z/W/U/V hypothesis, testable form, success metric, falsification condition, and fastest validation test
- [ ] **OUTPUT-02**: `SPRINT.md` produced at end of sprint — full journal of every decision made at each step, with the options considered and the rationale for what was chosen
- [ ] **OUTPUT-03**: `POSITIONING.md` produced at end of sprint — the 2x2 matrix with all competitor positions plotted, the mini-manifesto, and the chosen differentiation axes

### Infrastructure

- [ ] **INFRA-01**: Package installs at `~/.claude/get-your-shit-together/` as a standalone directory
- [ ] **INFRA-02**: Slash command entry point at `~/.claude/commands/gyst/foundation-sprint.md`
- [ ] **INFRA-03**: Main workflow at `~/.claude/get-your-shit-together/workflows/foundation-sprint.md`
- [ ] **INFRA-04**: Researcher agent at `~/.claude/get-your-shit-together/agents/gyst-researcher.md`
- [ ] **INFRA-05**: Output templates for HYPOTHESIS.md, SPRINT.md, and POSITIONING.md
- [ ] **INFRA-06**: `README.md` with install instructions (copy commands to get it running)

## v2 Requirements

### Session Persistence

- **SESS-01**: User can pause mid-sprint and resume in a new session (save sprint state to disk)
- **SESS-02**: User can view a history of completed sprints

### Comparison

- **COMP-01**: User can run multiple sprints and compare hypotheses side by side

## Out of Scope

| Feature | Reason |
|---------|--------|
| Binary tooling (gyst-tools.cjs) | Single-session wizard — no state management or git commits needed |
| Multi-session tracking by default | V1 is one session; persistence is v2 |
| Group mode | GYST is solo-only by design |
| Settings / config system | No workflow preferences needed for a linear single-flow wizard |
| NEXT-STEPS.md as separate file | Fastest test and success metric live inside HYPOTHESIS.md |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 through INFRA-06 | Phase ? | Pending |
| SPRINT-01 through SPRINT-06 | Phase ? | Pending |
| INTER-01 through INTER-03 | Phase ? | Pending |
| RESEARCH-01 through RESEARCH-03 | Phase ? | Pending |
| SPRINT-07 through SPRINT-11 | Phase ? | Pending |
| NAVIG-01 through NAVIG-03 | Phase ? | Pending |
| SPRINT-12 through SPRINT-16 | Phase ? | Pending |
| OUTPUT-01 through OUTPUT-03 | Phase ? | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 0
- Unmapped: 30 ⚠️

---
*Requirements defined: 2026-02-25*
*Last updated: 2026-02-25 after initial definition*
