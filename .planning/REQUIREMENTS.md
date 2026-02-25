# Requirements: Get Your Shit Together (GYST)

**Defined:** 2026-02-25
**Core Value:** One command, one session, one testable hypothesis — solo entrepreneurs get the clarity the Foundation Sprint was designed to produce, without needing a team.

## v1 Requirements

### Sprint Flow

- [ ] **SPRINT-01**: User can start a Foundation Sprint from scratch with `/gyst:foundation-sprint`
- [ ] **SPRINT-02**: Step 1 (The Basics) — User can identify and select a target customer segment from AI-generated options
- [ ] **SPRINT-03**: Step 1 — User can identify and select the core problem/pain point from AI-generated options
- [ ] **SPRINT-04**: Step 1 — AI verifies client-problem fit (is this pain real, critical, and frequent for this specific client?)
- [ ] **SPRINT-05**: Step 1 — User can articulate founder advantages across three dimensions: Capacity (what you can build), Insight (what you've seen before others), Motivation (why you're doing this). AI does not simply record what the user says — it pushes back until each advantage is formalized as a concrete, specific assertion rather than a slogan. Vague claims are rejected and rephrased collaboratively (e.g., "I know how to build things" is rejected; "I shipped 3 B2B SaaS products and know the sales cycle personally" is accepted).
- [ ] **SPRINT-06**: Step 1 — User can map direct and indirect competitors and identify the main adversary (the one capturing the budget or habit today)

- [ ] **SPRINT-07**: Step 2 (Differentiation) — User can rate their dream company on the 8 standard bipolar axes (slow/fast, hard/easy, expensive/free, complex/simple, dumb/smart, siloed/integrated, manual/automatic, and one more)
- [ ] **SPRINT-08**: Step 2 — User can add custom bipolar axes relevant to their specific domain and client
- [ ] **SPRINT-09**: Step 2 — When user proposes 2 axes as differentiators, AI rates all competitors from COMPETITORS.md on those 2 axes using existing research profiles, then plots the full 2x2 matrix
- [ ] **SPRINT-10**: Step 2 — If any competitor lands in the top-right quadrant (same as the dream company), AI flags the conflict and prompts the user to choose different axes
- [ ] **SPRINT-11**: Step 2 — User can write a 3-phrase mini-manifesto: Differentiator 1, Differentiator 2, Safeguard (formulated as advice to new team members, not marketing copy)

- [ ] **SPRINT-12**: Step 3 (Approaches) — Step 3 opens by loading the founder's advantages (Capacity + Insight from Step 1) and the chosen differentiating axes (from Step 2) as active context. The user proposes their OWN initial approach first (their existing idea). AI then generates additional approaches to reach a total of 3-4, using web research and reasoning about the problem space, filtered by the founder's actual Capacity and Insight (only executable approaches are proposed) and constrained by the Step 2 differentiating axes (approaches must reinforce the chosen positioning). All approaches — user's and AI's — are then evaluated together on the 4 standard matrices.
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
- [ ] **RESEARCH-02**: During Step 2, when the user proposes 2 axes, AI rates each competitor from COMPETITORS.md on those axes using the existing research profiles — no additional web searching required
- [ ] **RESEARCH-03**: During Step 1, AI validates the proposed customer segment and pain point — confirms they exist and that the pain is real (not assumed)

### Navigation

- [ ] **NAVIG-01**: At the end of each step, user is presented with three options: iterate more within the step, advance to the next step, or go back to a specific earlier step
- [ ] **NAVIG-02**: When user goes back to an earlier step, all downstream decisions and outputs are discarded and rebuilt from that point — no patching
- [ ] **NAVIG-03**: Each step loops until the user explicitly chooses to advance — never auto-advanced

### Output

- [ ] **OUTPUT-01**: `HYPOTHESIS.md` produced at end of sprint — full X/Y/Z/W/U/V hypothesis, testable form, success metric, falsification condition, and fastest validation test
- [ ] **OUTPUT-02**: `SPRINT.md` produced at end of sprint — full journal of every decision made at each step, with the options considered and the rationale for what was chosen
- [ ] **OUTPUT-03**: `POSITIONING.md` produced at end of sprint — the 2x2 matrix with all competitor positions plotted, the mini-manifesto, and the chosen differentiation axes
- [ ] **OUTPUT-04**: `COMPETITORS.md` produced at end of Step 1 — the fixed competitor list (max 5, main adversary flagged) with research profiles for each; read by Step 2 for axis rating without re-searching

### Infrastructure

- [x] **INFRA-01**: Package installs at `~/.claude/get-your-shit-together/` as a standalone directory
- [x] **INFRA-02**: Slash command entry point at `~/.claude/commands/gyst/foundation-sprint.md`
- [ ] **INFRA-03**: Main workflow at `~/.claude/get-your-shit-together/workflows/foundation-sprint.md`
- [ ] **INFRA-04**: Researcher agent at `~/.claude/get-your-shit-together/agents/gyst-researcher.md`
- [ ] **INFRA-05**: Output templates for HYPOTHESIS.md, SPRINT.md, POSITIONING.md, and COMPETITORS.md
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

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| INFRA-05 | Phase 1 | Pending |
| INFRA-06 | Phase 1 | Pending |
| SPRINT-01 | Phase 2 | Pending |
| SPRINT-02 | Phase 2 | Pending |
| SPRINT-03 | Phase 2 | Pending |
| SPRINT-04 | Phase 2 | Pending |
| SPRINT-05 | Phase 2 | Pending |
| SPRINT-06 | Phase 2 | Pending |
| INTER-01 | Phase 2 | Pending |
| INTER-02 | Phase 2 | Pending |
| INTER-03 | Phase 2 | Pending |
| NAVIG-01 | Phase 2 | Pending |
| NAVIG-02 | Phase 2 | Pending |
| NAVIG-03 | Phase 2 | Pending |
| RESEARCH-01 | Phase 2 | Pending |
| RESEARCH-03 | Phase 2 | Pending |
| OUTPUT-04 | Phase 2 | Pending |
| SPRINT-07 | Phase 3 | Pending |
| SPRINT-08 | Phase 3 | Pending |
| SPRINT-09 | Phase 3 | Pending |
| SPRINT-10 | Phase 3 | Pending |
| SPRINT-11 | Phase 3 | Pending |
| RESEARCH-02 | Phase 3 | Pending |
| SPRINT-12 | Phase 4 | Pending |
| SPRINT-13 | Phase 4 | Pending |
| SPRINT-14 | Phase 4 | Pending |
| SPRINT-15 | Phase 4 | Pending |
| SPRINT-16 | Phase 4 | Pending |
| OUTPUT-01 | Phase 4 | Pending |
| OUTPUT-02 | Phase 4 | Pending |
| OUTPUT-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-25*
*Last updated: 2026-02-25 — added OUTPUT-04 (COMPETITORS.md), updated SPRINT-09 and RESEARCH-02 to reflect re-rating from persisted profiles rather than re-discovering competitors, updated INFRA-05 to include COMPETITORS.md template*
