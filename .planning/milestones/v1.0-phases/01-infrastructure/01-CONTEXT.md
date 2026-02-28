# Phase 1: Infrastructure - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the complete npm-publishable package skeleton for GYST — every directory, every file, in the right place. This includes the installer script, the slash command entry point, the workflow stub, the researcher agent stub, all four output templates, and the package.json. Nothing does anything useful yet, but everything has a home and the installer works end-to-end.

</domain>

<decisions>
## Implementation Decisions

### Package structure
- This repo (`Desktop/GYST/`) is the npm package — what gets published
- Install target: `~/.claude/get-your-shit-together/` (global, Claude only)
- Commands install to: `~/.claude/commands/gyst/`
- Package directories mirror GSD: `bin/`, `commands/gyst/`, `get-your-shit-together/workflows/`, `get-your-shit-together/agents/`, `get-your-shit-together/templates/`
- Dev workflow: `node bin/install.js` to install locally during development

### Installer (bin/install.js)
- Simpler than GSD's installer — Claude-only, no runtime selection, no local/global choice
- Just installs to `~/.claude/get-your-shit-together/` and registers commands in `~/.claude/commands/gyst/`
- Interactive: shows a banner, confirms install location, copies files, prints success message
- No dependencies — pure Node.js like GSD's installer

### Slash command pattern
- `commands/gyst/foundation-sprint.md` is a thin wrapper — same pattern as GSD
- Contains: `<objective>`, `<execution_context>` with @-reference to the workflow, `<process>` summary
- Paths hardcoded to `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` (same approach as GSD's hardcoded `~/.claude/get-shit-done/` paths)

### Output templates
- 4 templates: `HYPOTHESIS.md`, `SPRINT.md`, `POSITIONING.md`, `COMPETITORS.md`
- Richly annotated: section headers + inline comments explaining what the AI should write in each section — guides consistent, complete output every sprint
- Live in `get-your-shit-together/templates/` in the package, copied to `~/.claude/get-your-shit-together/templates/` on install
- Workflow @-references them when writing output files at sprint end

### Claude's Discretion
- Banner design for the installer (ASCII art, colors, wording)
- Exact success/error messages in the installer
- Whether to include a VERSION file (GSD does)

</decisions>

<specifics>
## Specific Ideas

- "Exactly like GSD" — user ran `npx get-shit-done-cc` and got an interactive wizard. GYST should feel the same: run `npx [package-name]`, wizard activates, installs to ~/.claude/, done.
- The npm package name should be something like `get-your-shit-together` or `gyst-cc` — TBD at publish time, not a Phase 1 blocker
- The installer should be simpler than GSD's (which supports Claude, OpenCode, Gemini, Codex). GYST is Claude-only — no multi-runtime complexity.

</specifics>

<deferred>
## Deferred Ideas

- npm publish setup (package name, registry, versioning) — not needed until the package is feature-complete
- Update/uninstall commands in the installer — Phase 1 is install-only

</deferred>

---

*Phase: 01-infrastructure*
*Context gathered: 2026-02-25*
