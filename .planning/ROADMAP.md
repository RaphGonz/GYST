# Roadmap: Get Your Shit Together (GYST)

## Overview

Four phases that build from nothing to a fully functional Foundation Sprint command. Phase 1 scaffolds the package. Phase 2 delivers the entry point and Step 1 (The Basics) — the interaction model, navigation, and research foundation all come here since they're inseparable from the first step; it also writes COMPETITORS.md to disk, which fixes the competitor list for the rest of the session. Phase 3 delivers Step 2 (Differentiation) — it reads COMPETITORS.md to rate the fixed competitor list on proposed axes and plots the 2x2 matrix; no re-discovering competitors. Phase 4 delivers Steps 3 and 4 together (Approaches + Final Hypothesis) and produces the three remaining output files (HYPOTHESIS.md, SPRINT.md, POSITIONING.md), completing the sprint end-to-end.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Infrastructure** - Scaffold the package directory, slash command entry point, agent, templates, and README
- [ ] **Phase 2: The Basics (Step 1)** - Running sprint command with onboarding, customer/problem/founder/competitor elicitation, navigation, research foundation, and COMPETITORS.md written to disk
- [ ] **Phase 3: Differentiation (Step 2)** - Bipolar axis rating, competitor re-rating from COMPETITORS.md on proposed axes, 2x2 plotting, conflict detection, and mini-manifesto
- [ ] **Phase 4: Approaches + Hypothesis + Outputs (Steps 3-4)** - Solution approach generation and evaluation, final hypothesis formulation, testable form derivation, and three remaining output files

## Phase Details

### Phase 1: Infrastructure
**Goal**: The package exists on disk in the correct location and all structural files are in place — nothing works yet, but everything has a home
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06
**Success Criteria** (what must be TRUE):
  1. Directory `~/.claude/get-your-shit-together/` exists with the correct subdirectory structure (workflows/, agents/, templates/)
  2. Slash command file exists at `~/.claude/commands/gyst/foundation-sprint.md` and is recognized by Claude Code
  3. Main workflow file exists at `~/.claude/get-your-shit-together/workflows/foundation-sprint.md`
  4. Researcher agent file exists at `~/.claude/get-your-shit-together/agents/gyst-researcher.md`
  5. README.md contains copy-paste install instructions that get the package running from scratch
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Create package machinery: package.json, bin/install.js, slash command wrapper
- [ ] 01-02-PLAN.md — Create content stubs: workflow stub, agent stub, 4 output templates, README

### Phase 2: The Basics (Step 1)
**Goal**: User can run `/gyst:foundation-sprint`, receive a clear onboarding, work through Step 1 (client, problem, founder advantages, competitors), use the navigation controls, receive AI-researched competitor context, and have COMPETITORS.md written to disk with the fixed competitor list (max 5, main adversary flagged)
**Depends on**: Phase 1
**Requirements**: SPRINT-01, SPRINT-02, SPRINT-03, SPRINT-04, SPRINT-05, SPRINT-06, INTER-01, INTER-02, INTER-03, NAVIG-01, NAVIG-02, NAVIG-03, RESEARCH-01, RESEARCH-03, OUTPUT-04
**Success Criteria** (what must be TRUE):
  1. User types `/gyst:foundation-sprint` and receives a clear onboarding message explaining all 4 steps and what the session will produce
  2. At each decision point in Step 1, AI asks an open question, then proposes a concrete set of options the user can choose from (not freeform guessing)
  3. Stage banners visibly show which step is active and summarize decisions made so far
  4. AI researches identified competitors and validates the proposed customer segment and pain point via web search before advancing
  5. User can iterate within Step 1, go back to an earlier sub-decision, or explicitly advance — the sprint never auto-advances
  6. At the end of Step 1, `COMPETITORS.md` is written to disk containing the finalized competitor list (max 5, main adversary flagged) with a research profile for each competitor
**Plans**: TBD

Plans:
- [ ] 02-01: Implement sprint entry point, onboarding, and Step 1 guided monologue flow
- [ ] 02-02: Implement navigation controls, research/validation calls for Step 1, and COMPETITORS.md writer

### Phase 3: Differentiation (Step 2)
**Goal**: User can rate their dream company on bipolar axes, AI rates each competitor from COMPETITORS.md on the 2 proposed axes using their existing research profiles (no re-searching), see the 2x2 matrix plotted, detect and resolve positioning conflicts, and write the mini-manifesto
**Depends on**: Phase 2
**Requirements**: SPRINT-07, SPRINT-08, SPRINT-09, SPRINT-10, SPRINT-11, RESEARCH-02
**Success Criteria** (what must be TRUE):
  1. User can rate their dream company on the 8 standard bipolar axes and add custom axes relevant to their domain
  2. When user proposes 2 differentiating axes, AI reads COMPETITORS.md and rates each competitor on those axes using the profiles already captured in Step 1 — no additional web searching occurs
  3. The 2x2 matrix is plotted with all competitors from COMPETITORS.md positioned based on the ratings derived from their research profiles, with visible rationale for each placement
  4. If any competitor lands in the top-right quadrant (same position as the dream company), AI flags the conflict and prompts axis selection again
  5. User can write the 3-phrase mini-manifesto (two differentiators + safeguard) before advancing
**Plans**: TBD

Plans:
- [ ] 03-01: Implement bipolar axis rating, custom axes, and COMPETITORS.md-based competitor scoring (read profiles, derive ratings, no re-search)
- [ ] 03-02: Implement 2x2 matrix rendering, conflict detection, and mini-manifesto step

### Phase 4: Approaches + Hypothesis + Outputs (Steps 3-4)
**Goal**: Step 3 opens by reloading the founder's advantages (Capacity + Insight) and the chosen differentiating axes as active context. User proposes their own initial approach first; AI then generates additional approaches to reach a total of 3-4, filtered by the founder's actual capabilities and constrained by the Step 2 positioning axes. All approaches are evaluated across 4 standard matrices. User commits to the strongest approach, formulates the full hypothesis, derives the testable form, and receives all three remaining output files written to disk
**Depends on**: Phase 3
**Requirements**: SPRINT-12, SPRINT-13, SPRINT-14, SPRINT-15, SPRINT-16, OUTPUT-01, OUTPUT-02, OUTPUT-03
**Success Criteria** (what must be TRUE):
  1. At the start of Step 3, the founder's advantages (Capacity + Insight) and the chosen differentiating axes from Step 2 are explicitly loaded as context before any approach is generated. User proposes their own initial approach first. AI then generates additional approaches — filtered by the founder's actual Capacity and Insight so only executable ones are proposed, and constrained by the Step 2 differentiating axes — to reach a total of 3-4 genuinely distinct approaches (not UI variants). All approaches are evaluated together across all 4 standard 2x2 matrices
  2. AI identifies the approach with the strongest global pattern across matrices and recommends it, keeping the second-best as a named backup
  3. User completes the full hypothesis statement: "If we help X solve Y with Z, they will choose us over W because we are U and V"
  4. AI produces the testable form of the hypothesis: success metric, falsification condition, main risk, and fastest validation test
  5. At sprint end, `HYPOTHESIS.md`, `SPRINT.md`, and `POSITIONING.md` are all written to disk with complete, correctly structured content
**Plans**: TBD

Plans:
- [ ] 04-01: Implement Step 3 approach generation and 4-matrix evaluation flow
- [ ] 04-02: Implement Step 4 hypothesis formulation, testable form derivation, and all three output file writers

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure | 0/2 | Planned | - |
| 2. The Basics (Step 1) | 0/2 | Not started | - |
| 3. Differentiation (Step 2) | 0/2 | Not started | - |
| 4. Approaches + Hypothesis + Outputs | 0/2 | Not started | - |
