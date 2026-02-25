# Get Your Shit Together (GYST)

## What This Is

A Claude slash-command package that guides solo entrepreneurs through the Foundation Sprint from Jake Knapp's "Click." It replaces the group dynamic of the original sprint with an AI thinking partner: the AI asks questions, helps generate options, researches competitors and markets, and leads the user from a fuzzy idea to a testable hypothesis in one focused session.

## Core Value

One command, one session, one testable hypothesis — solo entrepreneurs get the clarity that the Foundation Sprint was designed to produce, without needing a team.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] `/gyst:foundation-sprint` command runs the full sprint end-to-end
- [ ] Guided monologue interaction: AI asks questions, user answers freeform, AI proposes options (replaces silent-vote group mechanic)
- [ ] Web search + analysis for competitor mapping, customer research, and market context
- [ ] 4 steps executed in sequence: The Basics → Differentiation → Approaches → Final Hypothesis
- [ ] Produces HYPOTHESIS.md (X/Y/Z/W/U/V format + testable form)
- [ ] Produces SPRINT.md (full journal of decisions and rationale at each step)
- [ ] Produces POSITIONING.md (2x2 matrix, mini-manifesto, differentiation summary)
- [ ] Installs at `~/.claude/get-your-shit-together/` as a standalone package
- [ ] No binary tooling required — pure markdown workflows and agent files

### Out of Scope

- Binary/Node.js tooling (gsd-tools.cjs equivalent) — single session, no state to persist
- Multi-session tracking or resume (one sprint = one session)
- NEXT-STEPS.md — kept lean, fastest test goes inside HYPOTHESIS.md
- Group mode — GYST is solo-only by design
- Settings/config system — no workflow preferences needed for a single-flow wizard

## Context

- The Foundation Sprint method comes from Jake Knapp's "Click" (2025). The book and extracted steps are in `references/`.
- The sprint has 4 steps: (1) The Basics — lock client/problem/competitive context; (2) Differentiation — find a 2x2 position where you dominate; (3) Approaches — generate and evaluate solution approaches via 2x2 matrices; (4) Final Hypothesis — formulate "If we help X solve Y with Z, they'll choose us over W because U and V."
- The original method uses a no-brainstorm, silent-vote approach for a group of max 5. GYST adapts this for solo use: the AI generates the option set the group would have generated, the user chooses.
- GSD (`~/.claude/get-shit-done/`) is the reference architecture. GYST mirrors its structure but is entirely independent.
- The `references/` folder contains: Click (Jake Knapp).pdf, Sprint (Jake Knapp).pdf, and Foundation Sprint.docx (structured summary with AI intervention points already mapped out).

## Constraints

- **Platform**: Claude Code only — slash commands run as markdown workflows read by Claude
- **Scope**: Single sprint session — no persistence layer, no git commits, no config
- **Architecture**: Lean — workflows + agents + templates only (no binary)
- **Research**: Web search via Claude's built-in search (no external API needed)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| One main command (`/gyst:foundation-sprint`) | Sprint is linear, single-session — no benefit to splitting into sub-commands | — Pending |
| Guided monologue (not simulated group vote) | Freeform is more natural for solo users than a sticker-vote simulation | — Pending |
| Web search for research | Competitor and market research is the highest-value AI contribution in the sprint | — Pending |
| No binary tooling | No multi-session state to track, no git commits needed | — Pending |
| Install at `~/.claude/get-your-shit-together/` | Mirrors GSD's install pattern, independent package | — Pending |

---
*Last updated: 2026-02-25 after initialization*
