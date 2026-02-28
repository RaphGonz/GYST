---
phase: 04-approaches-hypothesis-outputs-steps-3-4
verified: 2026-02-27T19:45:00Z
status: passed
score: 9/9 must-haves verified
re_verification: false
---

# Phase 4: Approaches, Hypothesis, Outputs (Steps 3 & 4) — Verification Report

**Phase Goal:** Step 3 opens by reloading the founder's advantages (Capacity + Insight) and the chosen differentiating axes as active context. User proposes their own initial approach first; AI then generates additional approaches to reach a total of 3-4, filtered by the founder's actual capabilities and constrained by the Step 2 positioning axes. All approaches are evaluated across 4 standard matrices. User commits to the strongest approach, formulates the full hypothesis, derives the testable form, and receives all three remaining output files written to disk.

**Verified:** 2026-02-27T19:45:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Step 3 opens by displaying locked Capacity, Insight, and both differentiating axes from session — no re-asking | VERIFIED | `section_context_reload` (line 911) reads locked values from session and explicitly instructs "Do NOT re-ask the user for this information. Do NOT skip this step." |
| 2 | User proposes their own initial approach first; AI waits before generating alternatives | VERIFIED | Line 938: "Wait for user response. Do NOT generate any approach options before the user responds." Line 961: "Do NOT generate any AI-proposed approaches until A1 is finalized." |
| 3 | AI generates additional approaches filtered by Capacity, Insight, and axis fit to reach 3-4 total; genuinely distinct approaches | VERIFIED | `INTERNAL FILTER` block (lines 965-970) enforces silent triple-check (Capacity, Insight, axis fit) before proposing any AI approach; keep/drop loop runs until 3-4 approaches finalized |
| 4 | All approaches evaluated together across all 4 standard 2x2 matrices sequentially | VERIFIED | `section_approach_evaluation` (line 1000): "Do NOT render all 4 matrices in a single response." All 4 matrices defined: Customer Vision, Money Vision, Pragmatic Vision, Growth Vision (lines 1036-1082) |
| 5 | AI identifies strongest global pattern and recommends it; names second-best as backup | VERIFIED | `section_approach_recommendation` (line 1088): explicitly derives winner (top-right pattern), names backup, and "Accept the user's choice unconditionally" |
| 6 | User completes the full hypothesis statement (X, Y, Z, W, U, V) | VERIFIED | `section_hypothesis` (line 1143): pre-fills "If we help X solve Y with Z, they will choose us over W because we are U and V" from session context; iteration loop with explicit lock trigger required |
| 7 | AI produces testable form automatically: success metric, falsification condition, main risk, fastest validation test | VERIFIED | `section_testable_form` (line 1174): all 4 components derived by AI from locked hypothesis; "Do NOT ask the user for input on these" |
| 8 | HYPOTHESIS.md, SPRINT.md, and POSITIONING.md written at sprint end with complete, correctly structured content | VERIFIED | `section_write_outputs` (line 1204): "ONLY place in the entire workflow where HYPOTHESIS.md, SPRINT.md, and POSITIONING.md are written"; each file's required content enumerated with zero-square-brackets rule |
| 9 | Sprint ends with closing message listing all 3 files and naming the fastest validation test | VERIFIED | Lines 1259-1266: explicit closing message template listing all 3 files and "Your next move: [fastest validation test from the testable form]" |

**Score:** 9/9 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `get-your-shit-together/workflows/foundation-sprint.md` | Step 3 full flow: banner, context reload, approach generation, 4-matrix evaluation, recommendation | VERIFIED | File is 1268 lines; all 5 Plan 01 sections present: `step3_banner`, `section_context_reload`, `section_approach_generation`, `section_approach_evaluation`, `section_approach_recommendation` |
| `get-your-shit-together/workflows/foundation-sprint.md` | Step 4 full flow: step4_banner, section_hypothesis, section_testable_form, section_write_outputs | VERIFIED | All 4 Plan 02 sections present; step4_banner shows all 6 hypothesis variables (Segment, Problem, Approach, Adversary, Axis 1, Axis 2) |
| Installed: `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` | Live copy matching repo | VERIFIED | File exists at `C:/Users/raphg/.claude/get-your-shit-together/workflows/foundation-sprint.md`; 1268 lines; timestamp 2026-02-27 19:30; all 9 section markers present (count: 19 occurrences across open/close tags and references) |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `section_step2_navigation` | `step3_banner` | Direct flow after user chooses A (advance to Step 3) | WIRED | Line 872: "**If A:** Proceed to step3_banner." — stale `step3_stub` reference was auto-fixed in commit f1f998c |
| `section_context_reload` | `section_approach_generation` | After user responds with their initial approach idea | WIRED | Line 938 ends with prompt for user's approach; section_approach_generation (line 942) opens "After user has responded with their initial approach idea" |
| `section_approach_generation` | `section_approach_evaluation` | After 3-4 approaches finalized and user confirms ready | WIRED | Line 996: "Wait for user confirmation before proceeding to section_approach_evaluation" |
| `section_approach_evaluation` | `section_approach_recommendation` | Immediately after Matrix 4 is shown | WIRED | Line 1084: "After Matrix 4 is displayed: proceed immediately to section_approach_recommendation" |
| `section_approach_recommendation` | `step4_banner` | After user commits to chosen approach | WIRED | Line 1120: "Then proceed to step4_banner" |
| `step4_banner` | `section_hypothesis` | Immediate flow after banner renders | WIRED | section_hypothesis (line 1143): "Immediately after the Step 4 banner renders" |
| `section_hypothesis` | `section_testable_form` | Explicit lock trigger from user | WIRED | Lines 1167-1170: lock language enumerated; "Do NOT advance to section_testable_form until explicit lock language is received" |
| `section_testable_form` | `section_write_outputs` | User confirms ready after testable form displayed | WIRED | Line 1200: "Wait for user to confirm readiness before proceeding to section_write_outputs" |
| `section_write_outputs` | `HYPOTHESIS.md, SPRINT.md, POSITIONING.md` | Write tool calls — all 3 at sprint end | WIRED | Line 1210: "This is the ONLY place in the entire workflow where HYPOTHESIS.md, SPRINT.md, and POSITIONING.md are written." |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| SPRINT-12 | 04-01-PLAN.md | Step 3 opens with advantages + axes loaded; user proposes approach first; AI generates 3-4 filtered approaches | SATISFIED | `section_context_reload` + `section_approach_generation` — INTERNAL FILTER block, user-first constraint, keep/drop loop |
| SPRINT-13 | 04-01-PLAN.md | 4-matrix evaluation: Customer Vision, Money Vision, Pragmatic Vision, Growth Vision | SATISFIED | `section_approach_evaluation` (lines 1000-1086) — all 4 matrices with axes defined, ASCII grid format, sequential display rule |
| SPRINT-14 | 04-01-PLAN.md | AI recommends strongest global pattern approach; names backup; user override unconditional | SATISFIED | `section_approach_recommendation` (lines 1088-1122) — recommendation logic, backup naming, "unconditionally" override rule |
| SPRINT-15 | 04-02-PLAN.md | User fills in full hypothesis template; AI pre-fills from session context; explicit lock required | SATISFIED | `section_hypothesis` (lines 1143-1172) — pre-fill from context, lock trigger enumerated, "is NOT a lock" for vague confirms |
| SPRINT-16 | 04-02-PLAN.md | AI derives testable form: success metric, falsification condition, main risk, fastest test | SATISFIED | `section_testable_form` (lines 1174-1202) — all 4 components, AI-derived without per-field user input |
| OUTPUT-01 | 04-02-PLAN.md | HYPOTHESIS.md: full hypothesis, 6-variable breakdown, all 4 testable form components | SATISFIED | `section_write_outputs` lines 1214-1227: all required content enumerated; zero-square-brackets rule |
| OUTPUT-02 | 04-02-PLAN.md | SPRINT.md: full journal of all 4 steps with decisions, approaches, matrices, chosen approach, hypothesis | SATISFIED | `section_write_outputs` lines 1229-1240: all 4 steps enumerated with full content requirements |
| OUTPUT-03 | 04-02-PLAN.md | POSITIONING.md: 2x2 matrix with competitors (not approaches), axes, manifesto | SATISFIED | `section_write_outputs` lines 1242-1255: competitor-name matrix disambiguation explicit; mini-manifesto required |

**All 8 Phase 4 requirements satisfied.**

No orphaned requirements detected. REQUIREMENTS.md traceability table lists all 8 IDs (SPRINT-12 through SPRINT-16, OUTPUT-01 through OUTPUT-03) as "Phase 4 | Complete" — all accounted for.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `foundation-sprint.md` | 1140 | `[placeholder]` appears | Info | This is an instruction NOT to use placeholders ("do NOT leave any variable as '[placeholder]'") — not actual placeholder content. False positive. |
| `foundation-sprint.md` | 1219, 1227, 1234, 1247 | "no square brackets" / "Zero square brackets remain" | Info | All are instructions enforcing no-placeholder rule on output files. Not stub content. |

**No blocking anti-patterns found.** Zero stubs remain in the file. The grep for "stub" returns zero results. All "placeholder" occurrences are instructions about avoiding placeholders in AI output.

---

### Human Verification Required

None required for the automated checks performed. The following items are inherently runtime behavior and cannot be verified statically, but they are not blocking for phase goal confirmation:

#### 1. Context Reload Accuracy at Runtime

**Test:** Run the sprint through Steps 1-2, then observe Step 3 opening message.
**Expected:** AI displays the exact locked Capacity statement, exact locked Insight statement, and both differentiating axes without prompting the user to repeat them.
**Why human:** Cannot verify AI memory retrieval from a static file — this is runtime LLM behavior.

#### 2. INTERNAL FILTER Silence

**Test:** Run the sprint and observe whether AI mentions filtered approach candidates.
**Expected:** AI never says "I considered X but ruled it out" — only presents approaches that pass all three filter conditions.
**Why human:** Silent filtering is a behavioral constraint on LLM reasoning, not a static code check.

#### 3. Output File Completeness (Zero Square Brackets)

**Test:** Complete a full sprint and inspect HYPOTHESIS.md, SPRINT.md, POSITIONING.md.
**Expected:** No `[...]` template placeholders remain in any output file. All 6 hypothesis variables are real content.
**Why human:** Output file content is runtime-generated by the LLM from session data.

---

### Gaps Summary

No gaps. All 9 observable truths are verified. All 8 phase 4 requirements are satisfied. All 9 key links are wired in the correct sequence. No stubs or placeholder content remain in foundation-sprint.md. The installed file at `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` matches the repo (1268 lines, modified 2026-02-27 19:30). All 5 commits documented in the summaries (57f0bfd, f1f998c, 5909e5a, 8c4d286, 5b748b6) exist and are verified in git history.

The Foundation Sprint workflow is complete end-to-end: Steps 1-4 fully implemented, all output files specified, sprint end ceremony in place.

---

_Verified: 2026-02-27T19:45:00Z_
_Verifier: Claude Sonnet 4.6 (gsd-verifier)_
