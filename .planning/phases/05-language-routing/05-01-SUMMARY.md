---
phase: 05-language-routing
plan: 01
subsystem: cli
tags: [slash-command, routing, arguments, language-selection, foundation-sprint]

# Dependency graph
requires: []
provides:
  - "$ARGUMENTS-driven three-branch routing in foundation-sprint command file"
  - "Removed static execution_context @-include that blocked routing"
  - "argument-hint set to [-french] for autocomplete"
affects:
  - 06-french-workflow
  - 07-translation

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Language routing via natural-language <process> block with $ARGUMENTS — no code, no conditionals, just instructions Claude follows at runtime"
    - "Two-copy deployment: repo source (commands/) -> cp -> installed (~/.claude/commands/) — surgical, avoids re-copying unrelated files"

key-files:
  created: []
  modified:
    - commands/gyst/foundation-sprint.md
    - ~/.claude/commands/gyst/foundation-sprint.md

key-decisions:
  - "LANG-02 interpretation: the unrecognized-flag fallback satisfies 'zero command file changes for future languages' because new languages need only a new workflow file; the fallback catches all unrecognized flags automatically without touching the command file"
  - "Plain paths inside <process>, not @-syntax: @-includes are statically resolved before Claude reads <process>, which would override routing and always load the English file"
  - "cp instead of node bin/install.js: surgical copy of only the changed file; installer would also copy workflows and templates (unchanged in Phase 5)"

patterns-established:
  - "Routing pattern: natural-language <process> block with $ARGUMENTS as three-branch if/else — Claude interprets at runtime, no shell scripting needed"
  - "No-@-include-in-process: any @-syntax inside <process> is static injection, defeating dynamic routing"

requirements-completed: [LANG-01, LANG-02, LANG-03]

# Metrics
duration: 8min
completed: 2026-03-08
---

# Phase 5 Plan 01: Language Routing — Command File Routing Summary

**$ARGUMENTS-driven three-branch routing added to foundation-sprint command; static execution_context @-include removed; deployed to ~/.claude/commands/gyst/**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-08T09:15:37Z
- **Completed:** 2026-03-08T09:23:52Z
- **Tasks:** 2 of 3 complete (Task 3 is checkpoint:human-verify, awaiting user)
- **Files modified:** 1 (commands/gyst/foundation-sprint.md + deployed copy)

## Accomplishments
- Removed the static `<execution_context>` block that hard-coded the English workflow path and made any user flag invisible to Claude
- Rewrote `<process>` block with explicit three-branch routing: no-flag -> English, `-french` -> French (graceful fail until Phase 7 delivers the file), unknown flag -> informative message + English fallback
- Updated `argument-hint` to `"[-french]"` so Claude Code autocomplete surfaces the flag
- Deployed updated file to installed location via cp; verified diff-clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite command file with routing logic** - `ba2110d` (feat)
2. **Task 2: Deploy to installed location** - filesystem operation only (no repo change; ~/.claude/ is outside repo)
3. **Task 3: Human verify routing branches** - PENDING (checkpoint:human-verify)

**Plan metadata:** pending final commit after checkpoint resolution

## Files Created/Modified
- `commands/gyst/foundation-sprint.md` - Routing logic: removed execution_context, rewrote process block, updated argument-hint
- `~/.claude/commands/gyst/foundation-sprint.md` - Deployed copy (identical to repo source; diff returns 0)

## Decisions Made
- **Plain paths inside `<process>` (not @-syntax):** @-includes are resolved statically before Claude reads the process block. Using @-syntax inside process would pre-load the English file at parse time, collapsing all three branches to English before routing logic runs.
- **LANG-02 fallback design:** The unrecognized-flag branch ("Language '$ARGUMENTS' is not yet supported. Running the sprint in English.") satisfies the requirement for "zero command file changes for future languages." Future languages only need a new workflow file; the fallback catches unknown flags without modifying the command file.
- **cp over installer:** `node bin/install.js` copies all assets (workflows, templates) which are unchanged in Phase 5. cp is faster and more surgical — touches only the changed file.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Routing infrastructure live and deployed — ready for Phase 6 (French workflow authoring)
- Phase 7 will confirm the `-french` branch succeeds end-to-end once `foundation-sprint-french.md` exists
- Concern (pre-existing): Phase 7 must resolve axis label translation for the SPRINT.md template

---
*Phase: 05-language-routing*
*Completed: 2026-03-08*
