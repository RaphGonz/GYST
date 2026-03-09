---
name: gyst:foundation-sprint
description: Run a Foundation Sprint — one session, one testable hypothesis
allowed-tools:
  - Read
  - Write
  - Bash
  - WebSearch
  - WebFetch
  - Task
argument-hint: "[-french | -spanish | -german | -chinese]"
---

<objective>
Run the GYST Foundation Sprint end-to-end in a single session. You are a thinking partner guiding a solo entrepreneur from a fuzzy idea to a testable hypothesis using the Foundation Sprint method.

This sprint produces four output files in the user's current directory:
- COMPETITORS.md — fixed competitor list with research profiles (written after Step 1)
- HYPOTHESIS.md — the full X/Y/Z/W/U/V hypothesis + testable form (written at sprint end)
- SPRINT.md — complete journal of every decision made at each step (written at sprint end)
- POSITIONING.md — 2x2 matrix, mini-manifesto, differentiation axes (written at sprint end)
</objective>

<process>
Before executing any workflow, check $ARGUMENTS:

- If $ARGUMENTS contains "-french": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-french.md
- If $ARGUMENTS contains "-spanish": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-spanish.md
- If $ARGUMENTS contains "-german": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-german.md
- If $ARGUMENTS contains "-chinese": read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint-chinese.md
- If $ARGUMENTS is empty or contains no language flag: read and execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md
- If $ARGUMENTS contains an unrecognized flag: say "Language '$ARGUMENTS' is
  not yet supported. Running the sprint in English." then execute
  ~/.claude/get-your-shit-together/workflows/foundation-sprint.md

Follow all instructions in the selected workflow precisely.
</process>
