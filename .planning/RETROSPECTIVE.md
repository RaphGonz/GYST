# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

---

## Milestone: v1.0 — Foundation Sprint

**Shipped:** 2026-02-28
**Phases:** 4 | **Plans:** 8 | **Timeline:** 3 days (2026-02-25 → 2026-02-27)

### What Was Built

- npm installer (`bin/install.js`) with TTY detection for interactive and npx-pipe install modes
- Full Step 1 elicitation workflow — customer segment, problem validation (inline web search), founder advantages (Capacity/Insight/Motivation with explicit rejection criteria), competitor name collection
- `gyst-researcher` sub-agent: structured competitor research producing COMPETITORS.md (max 5 competitors, main adversary flagged), fixing the list for the entire session
- Step 2 differentiation: 8 standard bipolar axes, optional custom axes, user-selected differentiating pair, competitor scoring from COMPETITORS.md only (no re-search), ASCII 2x2 matrix, conflict hard-block, 3-phrase mini-manifesto
- Step 3 approaches: user-first A1 probe, INTERNAL FILTER (silent exclusion of approaches that violate Capacity/Insight/axis constraints), 4-matrix sequential ASCII evaluation (Customer/Money/Pragmatic/Growth Vision), AI recommendation with unconditional user override
- Step 4: hypothesis pre-fill from session context, explicit-lock enforcement (no casual "yes"), auto-derived testable form (4 components), single output-location write rule for all 3 files

### What Worked

- **Workflow-first architecture** — pure markdown + agents proved sufficient for a linear single-session wizard; no binary tooling needed
- **Section-by-section plan execution** — each plan added contiguous sections to the workflow file; the seam pattern (e.g., research handoff comment, `step2_stub`, `step3_stub`) made integration between phases mechanical and error-free
- **Explicit constraint rules in workflow prose** — writing enforcement rules directly into workflow text (e.g., "INTERNAL FILTER", "explicit lock required", "WebSearch PROHIBITED") produced reliable behavior without code
- **Audit before archival** — running `/gsd:audit-milestone` before `/gsd:complete-milestone` surfaced all tech debt upfront and gave a clean 35/35 result; no surprises at archival
- **Phase scope discipline** — Step 1 in Phase 2, Step 2 in Phase 3, Steps 3-4 together in Phase 4 matched the sprint's natural dependency structure

### What Was Inefficient

- **Traceability table not updated during execution** — INFRA-03 through INFRA-06 remained `[ ]` in REQUIREMENTS.md traceability despite being satisfied by Phases 2-4; required a separate cleanup commit
- **SUMMARY frontmatter not standardized early** — `requirements-completed` field not present in Phase 1 summaries (predated adoption); required a retroactive fix commit
- **Stale planning note left in production file** — `section_axis_selection` line 667 had `(implemented in Plan 03-02)` comment that survived to production; caught by audit, required dedicated fix commit
- **Tasks count at 0** — GSD task tracking wasn't wired into this project's execution; velocity was tracked manually in STATE.md instead

### Patterns Established

- **Seam-based phase integration** — each phase ends with a named stub (`step2_stub`, `step3_stub`) that the next phase replaces; stubs verify gracefully rather than error
- **COMPETITORS.md as session-fixed source of truth** — written once at end of Step 1, read-only in Step 2; prevents research drift across steps
- **Explicit lock language pattern** — for high-stakes decisions (hypothesis), use explicit trigger words and explicitly reject "yes"/"looks good"; reduces premature lock
- **INTERNAL FILTER pattern** — AI silently removes candidates that fail hard constraints before presentation; keeps user-facing flow clean without exposing filter logic
- **Single output location rule** — designate one section as the sole write location for output files; prevents partial writes from earlier sections leaking

### Key Lessons

1. **Stub → fill is the right integration pattern for multi-phase workflow files** — it makes each phase's boundary explicit and the integration trivially verifiable (check that stub is absent from production file)
2. **Write enforcement rules as prose in the workflow, not comments** — "AI MUST NOT", "PROHIBITED", "unconditional" written into workflow text propagates reliably through Claude's instruction-following
3. **Traceability hygiene should be a per-plan step, not a milestone-end task** — requires explicit reminder in plan template or executor discipline
4. **Behavioral requirements need live-session verification** — static audit can verify structure but cannot verify one-pushback enforcement, DISCARD RULE compliance, INTERNAL FILTER silence, etc.; document these as deferred to human UAT
5. **3-day build time for a 1,268-line workflow at ~12 min/plan is sustainable velocity** — plan-level granularity kept context manageable and produced consistent output quality

### Cost Observations

- Model mix: ~100% sonnet (balanced profile throughout)
- Sessions: ~6-8 sessions across 3 days
- Notable: No opus needed for this milestone — single-session wizard logic was straightforward enough for sonnet throughout; haiku was used for sub-agents (gyst-researcher)

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Process Change |
|-----------|--------|-------|-------------------|
| v1.0 | 4 | 8 | Initial build — established seam-based integration pattern |

### Top Lessons (Verified Across Milestones)

1. Seam-based phase integration (stub → fill) scales cleanly for linear workflow files
2. Write enforcement as prose in workflow text, not code comments
