# Requirements: Get Your Shit Together (GYST)

**Defined:** 2026-03-08
**Core Value:** One command, one session, one testable hypothesis — solo entrepreneurs get the clarity that the Foundation Sprint was designed to produce, without needing a team.

## v1.1 Requirements

### Language Routing

- [x] **LANG-01**: User can run the sprint in French by passing `-french` flag: `/gyst:foundation-sprint, -french`
- [x] **LANG-02**: The language flag system is extensible — adding a new language requires only a pre-translated workflow file and templates, with zero changes to the command file
- [x] **LANG-03**: If an unsupported language flag is passed, the command informs the user and falls back to English

### French Output Templates

- [x] **LANG-04**: French versions of all 4 output templates exist at `templates/fr/` (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) — all headers, labels, and structural text in French; `* MAIN ADVERSARY` string and YAML keys preserved verbatim

### French Workflow

- [x] **LANG-05**: A complete pre-translated French workflow exists (`foundation-sprint-french.md`) — all user-facing text in French using consistent "vous" register; all 22 section `name=` identifiers preserved in English; strong French-language directive at top to prevent language drift; per-section French reinforcements before WebSearch-heavy sections
- [x] **LANG-06**: The French workflow references `templates/fr/` paths and produces French output files (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md all in French)
- [x] **LANG-07**: A `TRANSLATION-SYNC.md` file records the English source commit hash so future English updates can be tracked and synced to the French version

## v1.2 Requirements

### Problem Validation

- [ ] **PROB-01**: Sprint presents an Important/Urgent 2x2 matrix for the user's problem in Step 1, classifying whether the problem is a vitamin or aspirin
- [ ] **PROB-02**: Problem classification (important+urgent, important+not urgent, etc.) is captured and carried forward to the 5PM Scorecard

### Purchaser Analysis

- [ ] **PURC-01**: Sprint asks purchaser sophistication questions in Step 1 — tech adoption readiness, willingness to pay, and B2C/B2A/B2B/B2E classification
- [ ] **PURC-02**: B2A ("aspirational buyers" — photographers, bloggers, podcasters) is explicitly defined in the workflow so founders recognize the tier
- [ ] **PURC-03**: Purchaser classification is non-blocking — awareness pass, not a lock cycle

### Market Assessment

- [ ] **MRKT-01**: AI performs inline web research for market size and growth signals in Step 1 (proxy signals: community sizes, job board volume, conference activity)
- [ ] **MRKT-02**: Sprint asks the founder about ease of reaching customers (are they online?) and market maturity perception
- [ ] **MRKT-03**: Market data is explicitly framed as estimates with ranges, not presented as confirmed facts

### Product/Founder Fit

- [ ] **PFIT-01**: Sprint confronts the founder in Step 3 on background, market access, and why they are the right person to build this
- [ ] **PFIT-02**: Sprint probes for Founder's Unique Advantage — audience, network, domain expertise
- [ ] **PFIT-03**: Sprint asks "Do you love this problem?" as a direct founder-passion check
- [ ] **PFIT-04**: Founder Fit is a delta check against existing advantages already captured in Step 1, not a duplicate elicitation

### Pain to Validate

- [ ] **PAIN-01**: Sprint presents a Pain to Validate assessment per approach in Step 3 — time to MVP and pain of building
- [ ] **PAIN-02**: Pain to Validate uses the existing sequential matrix pattern (Matrix 5 in approach evaluation)

### 5PM Scorecard Output

- [ ] **SCRD-01**: Sprint produces a new output file `5PM-SCORECARD.md` with signal verdicts (FAVORABLE/CAUTION/UNFAVORABLE) per lens
- [ ] **SCRD-02**: Each lens block includes: signal label, evidence from the sprint, rationale, and red flags (if any)
- [ ] **SCRD-03**: Scorecard is written exclusively in `section_write_outputs` (zero-placeholder rule — no partial writes earlier)
- [ ] **SCRD-04**: Scorecard template exists at `templates/5PM-SCORECARD.md`

### Translation

- [ ] **TRNS-01**: 5PM Scorecard template translated to all existing languages (FR, JA, PT) at `templates/{lang}/5PM-SCORECARD.md`
- [ ] **TRNS-02**: All new/modified workflow sections translated into French, Japanese, and Portuguese workflow files
- [ ] **TRNS-03**: TRANSLATION-SYNC.md updated with new English source commit hash after all translations complete

## v2 Requirements

### Session Persistence

- **SESS-01**: User can pause mid-sprint and resume in a new session (save sprint state to disk)
- **SESS-02**: User can view a history of completed sprints

### Pricing Model (deferred from v1.2)

- **PRIC-01**: Sprint asks pricing model questions in Step 1 — subscription vs not, ARPA estimate, billing cadence

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
| Numeric 5PM scoring | Rob Walling designed 5PM as qualitative, not point-based — signal verdicts are faithful to the framework |
| Pricing Model lens in v1.2 | Deferred — Purchaser + Market cover the financial angle sufficiently for v1.2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| LANG-01 | Phase 5 | Complete |
| LANG-02 | Phase 5 | Complete |
| LANG-03 | Phase 5 | Complete |
| LANG-04 | Phase 6 | Complete |
| LANG-05 | Phase 7 | Complete |
| LANG-06 | Phase 7 | Complete |
| LANG-07 | Phase 7 | Complete |
| PROB-01 | Phase 8 | Pending |
| PROB-02 | Phase 8 | Pending |
| PURC-01 | Phase 8 | Pending |
| PURC-02 | Phase 8 | Pending |
| PURC-03 | Phase 8 | Pending |
| MRKT-01 | Phase 8 | Pending |
| MRKT-02 | Phase 8 | Pending |
| MRKT-03 | Phase 8 | Pending |
| PFIT-01 | Phase 9 | Pending |
| PFIT-02 | Phase 9 | Pending |
| PFIT-03 | Phase 9 | Pending |
| PFIT-04 | Phase 9 | Pending |
| PAIN-01 | Phase 9 | Pending |
| PAIN-02 | Phase 9 | Pending |
| SCRD-01 | Phase 9 | Pending |
| SCRD-02 | Phase 9 | Pending |
| SCRD-03 | Phase 9 | Pending |
| SCRD-04 | Phase 9 | Pending |
| TRNS-01 | Phase 10 | Pending |
| TRNS-02 | Phase 11 | Pending |
| TRNS-03 | Phase 11 | Pending |

**Coverage:**
- v1.2 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-22 after v1.2 roadmap creation (Phases 8-11)*
