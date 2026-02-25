---
phase: 01-infrastructure
plan: 01
subsystem: packaging
tags: [npm, installer, slash-command, cli]
dependency_graph:
  requires: []
  provides: [npm-package-definition, interactive-installer, slash-command-wrapper]
  affects: [02-01, 02-02, 02-03]
tech_stack:
  added: [Node.js built-ins (fs/path/os/readline)]
  patterns: [copyDir-recursive, TTY-detection, promptConfirm-default-yes]
key_files:
  created:
    - package.json
    - bin/install.js
    - commands/gyst/foundation-sprint.md
  modified: []
decisions:
  - "npm package name is get-your-shit-together (placeholder — final name TBD at publish time)"
  - "Installer auto-installs when stdin is not a TTY (npx/pipe compatibility)"
  - "Agent file copied flat to ~/.claude/agents/ for Claude Code discovery"
metrics:
  duration: 15 minutes
  completed: 2026-02-25
  tasks_completed: 3
  files_created: 3
  files_modified: 0
---

# Phase 01 Plan 01: npm Package Machinery Summary

**One-liner:** npm package scaffolding with interactive Node.js installer and /gyst:foundation-sprint slash command wrapper using zero external dependencies.

## What Was Built

Three files establish the delivery mechanism for GYST:

1. **package.json** — npm package definition with `bin` pointing to the installer and `files` array covering all distributable directories. Zero runtime dependencies.

2. **bin/install.js** — Interactive installer (167 lines, zero external deps). Displays an ASCII GYST banner on load, detects TTY vs non-interactive mode, prompts for confirmation, then copies `get-your-shit-together/`, `commands/gyst/`, and the agent file to their target locations under `~/.claude/`. Uses `fs`, `path`, `os`, `readline` only.

3. **commands/gyst/foundation-sprint.md** — Thin slash command wrapper recognized by Claude Code. Contains YAML frontmatter (`name: gyst:foundation-sprint`, `allowed-tools` array), an objective block describing sprint outputs, and an `@-reference` that loads the actual workflow from `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` at runtime.

## Verification Results

All five plan verification checks passed:
- `node -c bin/install.js` exits 0
- `node -e "require('./package.json')"` exits 0
- bin field resolves to `bin/install.js`
- `name: gyst:foundation-sprint` present in command wrapper
- `@-reference` path matches installer target path

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| npm name `get-your-shit-together` is placeholder | Final publish name TBD — keeps options open |
| Auto-install when stdin not TTY | Makes `npx get-your-shit-together` pipe-compatible |
| Skip missing source dirs gracefully | Installer is safe to run before Plan 02 completes |
| Agent copied flat to `~/.claude/agents/` | Claude Code discovers agents at this flat path |

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1: package.json | e4a21f8 | feat(01-01): create package.json with bin and files fields |
| Task 2: bin/install.js | b394a71 | feat(01-01): create bin/install.js interactive installer |
| Task 3: commands/gyst/foundation-sprint.md | 282a351 | feat(01-01): create commands/gyst/foundation-sprint.md slash command wrapper |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

All created files verified present on disk. All three task commits confirmed in git log (e4a21f8, b394a71, 282a351).
