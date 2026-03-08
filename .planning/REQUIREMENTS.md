# Requirements: Get Your Shit Together (GYST)

**Defined:** 2026-03-08
**Core Value:** One command, one session, one testable hypothesis — solo entrepreneurs get the clarity that the Foundation Sprint was designed to produce, without needing a team.

## v1.1 Requirements

### Language Routing

- [ ] **LANG-01**: User can run the sprint in French by passing `-french` flag: `/gyst:foundation-sprint, -french`
- [ ] **LANG-02**: The language flag system is extensible — adding a new language requires only a pre-translated workflow file and templates, with zero changes to the command file
- [ ] **LANG-03**: If an unsupported language flag is passed, the command informs the user and falls back to English

### French Output Templates

- [ ] **LANG-04**: French versions of all 4 output templates exist at `templates/fr/` (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) — all headers, labels, and structural text in French; `* MAIN ADVERSARY` string and YAML keys preserved verbatim

### French Workflow

- [ ] **LANG-05**: A complete pre-translated French workflow exists (`foundation-sprint-french.md`) — all user-facing text in French using consistent "vous" register; all 20 section `name=` identifiers preserved in English; strong French-language directive at top to prevent language drift; per-section French reinforcements before WebSearch-heavy sections
- [ ] **LANG-06**: The French workflow references `templates/fr/` paths and produces French output files (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md all in French)
- [ ] **LANG-07**: A `TRANSLATION-SYNC.md` file records the English source commit hash so future English updates can be tracked and synced to the French version

## v2 Requirements

### Session Persistence

- **SESS-01**: User can pause mid-sprint and resume in a new session (save sprint state to disk)
- **SESS-02**: User can view a history of completed sprints

### Additional Languages

- **LANG-08**: Spanish language support (`-spanish` flag, `foundation-sprint-spanish.md`)

### Comparison

- **COMP-01**: User can run multiple sprints and compare hypotheses side by side

## Out of Scope

| Feature | Reason |
|---------|--------|
| Runtime translation (detect language, translate on-the-fly) | Unreliable — Claude drifts to English mid-session; pre-translated workflow is the only reliable approach |
| French-language gyst-researcher sub-agent | Web searches return better results in English; the French workflow presents researcher output in French |
| Separate command per language (`/gyst:fondation-sprint`) | User explicitly wants argument-based routing from single command |
| Dynamic language preference stored in config | Unnecessary until 3+ languages exist |
| Binary tooling / state management | Single-session sprint; no persistence layer needed |
| Group mode | GYST is solo-only by design |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| LANG-01 | Phase 5 | Pending |
| LANG-02 | Phase 5 | Pending |
| LANG-03 | Phase 5 | Pending |
| LANG-04 | Phase 6 | Pending |
| LANG-05 | Phase 7 | Pending |
| LANG-06 | Phase 7 | Pending |
| LANG-07 | Phase 7 | Pending |

**Coverage:**
- v1.1 requirements: 7 total
- Mapped to phases: 7
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after initial definition*
