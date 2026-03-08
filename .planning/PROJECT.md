# Get Your Shit Together (GYST)

## What This Is

A Claude slash-command package that guides solo entrepreneurs through the Foundation Sprint from Jake Knapp's "Click." It replaces the group dynamic of the original sprint with an AI thinking partner: the AI asks questions, helps generate options, researches competitors and markets, and leads the user from a fuzzy idea to a testable hypothesis in one focused session.

The full sprint runs as a single command (`/gyst:foundation-sprint`) across 4 steps in one Claude Code session, producing three structured output files: HYPOTHESIS.md, SPRINT.md, and POSITIONING.md. As of v1.1, the sprint supports multiple languages — French is available via `/gyst:foundation-sprint, -french`, with a fully pre-translated workflow and output templates. The architecture is extensible: adding a new language requires only a translated workflow file and templates.

## Core Value

One command, one session, one testable hypothesis — solo entrepreneurs get the clarity that the Foundation Sprint was designed to produce, without needing a team.

## Next Milestone Goals

Spanish language support or v2.0 scope TBD. Start with `/gsd:new-milestone`.

## Requirements

### Validated

- ✓ `/gyst:foundation-sprint` command runs the full sprint end-to-end — v1.0
- ✓ Guided monologue interaction: AI asks questions, user answers freeform, AI proposes options (replaces silent-vote group mechanic) — v1.0
- ✓ Web search + analysis for competitor mapping, customer research, and market context — v1.0
- ✓ 4 steps executed in sequence: The Basics → Differentiation → Approaches → Final Hypothesis — v1.0
- ✓ Produces HYPOTHESIS.md (X/Y/Z/W/U/V format + testable form) — v1.0
- ✓ Produces SPRINT.md (full journal of decisions and rationale at each step) — v1.0
- ✓ Produces POSITIONING.md (2x2 matrix, mini-manifesto, differentiation summary) — v1.0
- ✓ Installs at `~/.claude/get-your-shit-together/` as a standalone package — v1.0
- ✓ No binary tooling required — pure markdown workflows and agent files — v1.0
- ✓ `/gyst:foundation-sprint, -french` runs the sprint fully in French — v1.1
- ✓ Language flag routing is extensible: new languages require only a translated workflow + templates — v1.1
- ✓ Unsupported language flag falls back to English with a message — v1.1
- ✓ French output templates exist at `templates/fr/` (COMPETITORS, HYPOTHESIS, SPRINT, POSITIONING) — v1.1
- ✓ Complete pre-translated French workflow (`foundation-sprint-french.md`) with 22 named sections, `vous` register, language directive, per-section reinforcements — v1.1
- ✓ French workflow produces French output files via `templates/fr/` paths — v1.1
- ✓ `TRANSLATION-SYNC.md` records English source commit hash for future updates — v1.1

### Active

- [ ] Spanish language support: `/gyst:foundation-sprint, -spanish` — LANG-08

### Out of Scope

- Binary/Node.js tooling (gsd-tools.cjs equivalent) — single session, no state to persist
- Multi-session tracking or resume by default (one sprint = one session; v2 feature)
- NEXT-STEPS.md — kept lean, fastest test goes inside HYPOTHESIS.md
- Group mode — GYST is solo-only by design
- Settings/config system — no workflow preferences needed for a single-flow wizard

## Context

- The Foundation Sprint method comes from Jake Knapp's "Click" (2025). The book and extracted steps are in `references/`.
- The sprint has 4 steps: (1) The Basics — lock client/problem/competitive context; (2) Differentiation — find a 2x2 position where you dominate; (3) Approaches — generate and evaluate solution approaches via 2x2 matrices; (4) Final Hypothesis — formulate "If we help X solve Y with Z, they'll choose us over W because U and V."
- The original method uses a no-brainstorm, silent-vote approach for a group of max 5. GYST adapts this for solo use: the AI generates the option set the group would have generated, the user chooses.
- GSD (`~/.claude/get-shit-done/`) is the reference architecture. GYST mirrors its structure but is entirely independent.
- The `references/` folder contains: Click (Jake Knapp).pdf, Sprint (Jake Knapp).pdf, and Foundation Sprint.docx (structured summary with AI intervention points already mapped out).
- **v1.0 shipped 2026-02-28:** 1,268-line workflow with 22 named sections; 4 phases, 8 plans.
- **v1.1 shipped 2026-03-08:** French language support — `$ARGUMENTS`-based routing, 4 French templates (371 lines), 1,291-line French workflow, TRANSLATION-SYNC.md; 3 phases, 4 plans.

## Constraints

- **Platform**: Claude Code only — slash commands run as markdown workflows read by Claude
- **Scope**: Single sprint session — no persistence layer, no git commits, no config
- **Architecture**: Lean — workflows + agents + templates only (no binary)
- **Research**: Web search via Claude's built-in search (no external API needed)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| One main command (`/gyst:foundation-sprint`) | Sprint is linear, single-session — no benefit to splitting into sub-commands | ✓ Good — linear flow maps cleanly to single workflow file |
| Guided monologue (not simulated group vote) | Freeform is more natural for solo users than a sticker-vote simulation | ✓ Good — implemented as open question → AI proposes options → user picks |
| Web search for research | Competitor and market research is the highest-value AI contribution in the sprint | ✓ Good — inline search in Step 1, gyst-researcher sub-agent for profiles |
| No binary tooling | No multi-session state to track, no git commits needed | ✓ Good — pure markdown approach worked cleanly |
| Install at `~/.claude/get-your-shit-together/` | Mirrors GSD's install pattern, independent package | ✓ Good — `bin/install.js` with TTY detection works for interactive and npx pipe |
| gyst-researcher as Task sub-agent | Isolates competitor research from main thread; returns structured profiles | ✓ Good — clean separation of concerns |
| COMPETITORS.md written at end of Step 1 | Fixes competitor list for entire session; Step 2 reads file, no re-search | ✓ Good — RESEARCH-02 enforced cleanly |
| Explicit lock for hypothesis (not "yes") | Prevents premature lock of hypothesis from casual confirmation | ✓ Good — "lock it", "locked", "finalize" required; "yes"/"looks good" rejected |
| User proposes A1 first in Step 3 | Respects founder's existing idea; AI generates additions only | ✓ Good — INTERNAL FILTER silently removes non-executable alternatives |
| 4-matrix evaluation sequential (one per response) | Prevents overwhelming wall of ASCII grids | ✓ Good — SPRINT-13 enforced across Step 3 |
| section_write_outputs as ONLY output location | Prevents partial writes from earlier sections | ✓ Good — zero-placeholder rule enforced for all 3 output files |
| `$ARGUMENTS`-based language routing (v1.1) | Natural-language process block reads $ARGUMENTS — no code, no conditionals | ✓ Good — extensible to any language without touching command file |
| Pre-translated workflow file per language (v1.1) | Full translation in one file — no runtime switching, no injection | ✓ Good — `language_directive` + `language_reinforcement` blocks prevent drift |
| `* MAIN ADVERSARY` preserved verbatim (v1.1) | Machine-readable marker; translating it would break competitor lookup | ✓ Good — documented in STATE.md as hard rule; Phase 6 human checkpoint enforced it |
| gyst-researcher Task brief stays English-only (v1.1) | Sub-agent is English-only by design; surrounding workflow prose translated | ✓ Good — language reinforcement block before section ensures French output despite English Task |
| TRANSLATION-SYNC.md for diff-based updates (v1.1) | Records source commit hash so future English changes can be selectively synced | ✓ Good — establishes maintenance pattern for v1.2+ language updates |

---
*Last updated: 2026-03-08 after v1.1 milestone*
