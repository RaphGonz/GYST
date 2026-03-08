# Project Research Summary

**Project:** GYST v1.1 — French Localization
**Domain:** Multilingual Claude Code slash-command workflow (pure markdown, no binary tooling)
**Researched:** 2026-03-08
**Confidence:** HIGH

## Executive Summary

GYST v1.1 adds French language support to an existing AI-guided foundation sprint workflow. The scope is tightly constrained: no new technologies, no new tooling, no changes to the English workflow or the sub-agent. The deliverable is a routing update to one command file, four translated French output templates in a new `templates/fr/` subdirectory, and one complete French translation of the 1,268-line workflow. The routing mechanism — natural language flag detection in the `<process>` block using `$ARGUMENTS` substitution — is the only architectural pattern required, and it is already verified to work in production GSD commands.

The recommended approach is to build in dependency order: command routing update first (immediately testable, zero risk to English users), French templates second (required before French workflow can be tested end-to-end), French workflow translation third. The workflow must be translated as a complete standalone file — not as a conditional-block overlay on the English source. Section identifiers, `@` template paths, and the `* MAIN ADVERSARY` string are functional anchors that must not be translated. Everything else the user reads must be in French, using a consistent "vous" register throughout.

The critical risks are structural (not linguistic): translating XML section name attributes breaks cross-references silently, leaving the wrong `@` template paths in the French workflow produces English-structured output files, and failing to include a strong French-language directive at the top of the French workflow causes Claude to drift back to English mid-session after WebSearch calls accumulate English content in context. All six identified pitfalls are preventable by following build order and applying a pre-translation checklist — none require post-hoc recovery if addressed during the translation phase.

## Key Findings

### Recommended Stack

GYST v1.1 introduces zero new technologies. The entire implementation uses the patterns already present in v1.0: Claude Code `$ARGUMENTS` substitution in `<process>` blocks, markdown workflow files, `@`-include syntax for static template injection, and ISO 639-1 subdirectory conventions for organizing translated templates. The `Read` tool (already declared in `allowed-tools`) handles dynamic workflow loading after routing. The `<execution_context>` block, which performed static @-include of the English workflow, must be removed — it cannot participate in routing decisions.

**Core technologies:**
- `$ARGUMENTS` substitution in `<process>` block: language flag routing — already verified in production GSD commands, zero new risk
- Markdown workflow file per language (`foundation-sprint-french.md`): full French translation — ensures Claude has no English completion paths available for user-facing text
- `templates/fr/` subdirectory with ISO 639-1 naming: French output template organization — keeps English root paths unchanged, identical filenames across languages
- Natural language routing in `<process>` block: branch to correct workflow file — no binary tooling required; Claude reads and acts on routing instructions reliably for simple string flags

### Expected Features

The core feature set for v1.1 is well-defined. All P1 items are table stakes — missing any one of them produces an incomplete or broken French session.

**Must have (table stakes):**
- French workflow file with all 27 sections translated (user-facing prose, questions, banners, option framing, lock announcements, navigation menus) — a missing or partial translation produces a mixed-language session
- Language flag routing (`-french` flag in command file routes to French workflow) — without this, the feature is not accessible
- French output templates for all 4 files (HYPOTHESIS.md, SPRINT.md, POSITIONING.md, COMPETITORS.md in `templates/fr/`) — without these, output files have English headers and labels
- Unsupported language fallback (unknown flag returns English with a message) — required by LANG-03; graceful degradation
- Consistent "vous" register throughout — mixing "tu" and "vous" is a professional quality failure with no English equivalent

**Should have (competitive):**
- Pre-translated probing examples (A/B/C option models in French) — French examples improve AI output naturalness; English examples produce calque-flavored options
- Translated ACCEPTED/REJECTED examples for the three Capacity/Insight/Motivation sub-dimensions — without these, Claude may accept vague French answers that English reference points would reject
- French-idiomatic manifesto prompts ("Nous sommes...", "Nous ne ferons jamais...") — the evaluation logic must match the French phrasing to function correctly
- `TRANSLATION-SYNC.md` file recording the English source commit hash — prevents silent sync drift when the English workflow is updated

**Defer (v2+):**
- Spanish workflow (`-spanish`) — only after French workflow is validated through a real session; implementation pattern is identical to French
- Dynamic language routing from stored user preference — unnecessary until 3+ language variants exist
- French-language gyst-researcher (translated sub-agent with French search queries) — only relevant if the sprint is primarily used for French-language market research; adds complexity for marginal gain

### Architecture Approach

The architecture is a single-command routing layer that delegates to language-specific workflow files, each of which is self-contained and independently testable. The command file is the only shared entry point; it grows by one bullet per language added. Workflow files are per-language complete translations. Template files are organized by ISO language code subdirectory. The English sub-agent (gyst-researcher) is shared across all languages and unchanged.

**Major components:**
1. Command file (`foundation-sprint.md`) — routing only; reads `$ARGUMENTS`, selects and loads the correct workflow via `Read` tool; `<execution_context>` block removed
2. French workflow (`foundation-sprint-french.md`) — complete French translation of all Claude instructions and user-facing text; references `templates/fr/` paths; invokes English researcher via Task tool
3. French templates (`templates/fr/*.md`) — translated output structure; field keys and `* MAIN ADVERSARY` preserved verbatim for workflow read-back compatibility

### Critical Pitfalls

1. **Translating XML section `name=` attribute values** — cross-references throughout the 1,268-line workflow point to section name strings by exact value; translating any `name=` value causes silent reference failures at runtime. Prevention: pre-translation checklist listing all 20 section identifiers as "DO NOT TRANSLATE"; post-translation automated check comparing `name=` values byte-for-byte against English source.

2. **Language drift to English mid-session** — the French workflow contains ~15-20% English characters (section identifiers, file paths, technical labels) which flattens Claude's token distribution and creates drift pressure, especially after WebSearch calls return English research results. Prevention: place a strong French-language directive ("Toutes tes réponses dans cette session doivent être en français.") as the first content in the file; add per-section French reinforcement directives before sections that follow WebSearch calls; translate CRITICAL/IMPORTANT labels to `CRITIQUE :` / `IMPORTANT :`.

3. **Output template `@` paths not updated to `fr/`** — the French workflow is typically created by copying the English workflow; the `@~/.claude/.../templates/FILENAME.md` references look like technical syntax and get skipped during translation, causing French output files to be structured with English headers. Prevention: create French templates first, before translating the workflow; treat every `@` path containing `templates/` as requiring the `fr/` prefix update.

4. **Register inconsistency (mixing "tu" and "vous")** — a 1,268-line file translated across sections naturally drifts register; the onboarding uses "vous" but probing questions use "tu," which is jarring in French business communication. Prevention: decide register before the first word is translated (recommendation: "vous" throughout, consistent with French B2B SaaS conventions); run automated search for "tu ", "ton ", "ta ", "tes " after translation.

5. **Sync drift when English source is updated** — future CRITICAL rule additions to the English workflow will not automatically propagate to the French file; French users get outdated enforcement logic. Prevention: create `TRANSLATION-SYNC.md` as part of v1.1 delivery (not deferred); record English source commit hash; add `<!-- SYNC-CRITIQUE -->` inline comments in high-sensitivity sections.

## Implications for Roadmap

Research identifies a strict build order driven by file dependencies. Routing must exist before French workflow can be invoked. French templates must exist before French workflow can be tested. Translation quality controls (register policy, verbatim block inventory, section identifier checklist) must be established before translation begins — not discovered during review.

### Phase 1: Command Routing Update

**Rationale:** This is the only change to an existing file and is immediately testable. Completing it first means the English workflow is unaffected (no-flag invocation still works), the fallback path (unknown flag) is live, and the `-french` flag fails gracefully (workflow file does not exist yet) rather than silently. Zero risk to English users.

**Delivers:** Updated `foundation-sprint.md` command file with `$ARGUMENTS`-based routing to English, French (future), and unknown-flag fallback. Removes `<execution_context>` static @-include. Adds `argument-hint: "[-french]"` to frontmatter.

**Addresses:** LANG-01 (single command entry point), LANG-02 (extensibility), LANG-03 (unknown flag fallback)

**Avoids:** Anti-Pattern 1 (separate command files per language); Anti-Pattern 2 (static @-include routing)

### Phase 2: French Templates

**Rationale:** French templates must exist at their target paths before the French workflow can be tested end-to-end. Creating templates first also forces the naming convention decision (`templates/fr/`) before the workflow is written, preventing the most common path-mismatch pitfall (Pitfall 4). Templates are lower complexity than the workflow — good starting point for translation quality calibration.

**Delivers:** Four translated template files at `templates/fr/HYPOTHESIS.md`, `templates/fr/SPRINT.md`, `templates/fr/POSITIONING.md`, `templates/fr/COMPETITORS.md`. All field labels and structural prose in French. `* MAIN ADVERSARY` string preserved verbatim. YAML structural keys preserved.

**Addresses:** P1 French output templates requirement; establishes `fr/` path convention for the workflow to reference

**Avoids:** Pitfall 4 (template paths not updated); flat naming anti-pattern (COMPETITORS-fr.md alongside COMPETITORS.md)

### Phase 3: Pre-Translation Style Guide and Checklist

**Rationale:** The most expensive pitfalls (register inconsistency, translated section identifiers) cannot be fixed efficiently after translation is complete. A register inconsistency in 1,268 lines requires full human re-read; recovery cost is HIGH. Investing one small artifact before translation begins eliminates this risk entirely. This phase is short but structurally necessary.

**Delivers:** A translation preparation document (can live in `.planning/` or as a header comment in the French workflow) that specifies: (a) all 20 section `name=` values marked DO NOT TRANSLATE, (b) all verbatim output blocks inventoried and marked for translation (not omission), (c) register decision documented as "vous" throughout with prohibited forms listed, (d) `CRITIQUE :`/`IMPORTANT :` substitution rule established.

**Avoids:** Pitfall 1 (translated section identifiers), Pitfall 3 (verbatim blocks left in English), Pitfall 5 (register inconsistency)

### Phase 4: French Workflow Translation

**Rationale:** This is the core deliverable and the most complex phase. With routing live (Phase 1), templates created (Phase 2), and translation controls established (Phase 3), translation can proceed section-by-section with immediate testability at each step. The 27-section workflow has 3 HIGH complexity sections (`section_advantages`, `section_manifesto`, `section_approach_generation`) that require the most care.

**Delivers:** `foundation-sprint-french.md` — complete French translation of all user-facing prose across all 27 sections. French-language directive at file top. Per-section French reinforcement directives in WebSearch-heavy sections. Translated ACCEPTED/REJECTED examples (P2 but low additional cost during translation). French manifesto prompts. French Task call instruction to gyst-researcher. `TRANSLATION-SYNC.md` created and committed alongside workflow.

**Addresses:** All P1 must-have features; P2 differentiators (probing examples, advantages validation); TRANSLATION-SYNC.md requirement

**Avoids:** Pitfall 2 (language drift), Pitfall 3 (verbatim blocks in English), Pitfall 6 (sync drift)

### Phase 5: End-to-End Validation

**Rationale:** Language drift is a performance trap — it does not manifest in short tests or with English test inputs. A complete 4-step French session with French user inputs is required to surface drift patterns, especially after WebSearch calls accumulate English context. The "looks done but isn't" checklist from PITFALLS.md provides a concrete verification protocol.

**Delivers:** Validation report covering: routing verification (English default, French routing, unknown flag fallback), full 4-step French session test, post-WebSearch language hold verification, output file inspection (all 4 files in French with correct structure), register consistency spot-check, section identifier integrity check.

**Avoids:** Performance traps (short test sessions, English test inputs, single-session manual testing); ensures Pitfall 2 mitigations are effective before shipping

### Phase Ordering Rationale

- Phase 1 before all others: routing must exist for any flag-based invocation to work; also immediately verifies the English workflow is undisturbed
- Phase 2 before Phase 4: French templates must exist at their exact paths before the French workflow can run its `section_write_outputs` step; creating templates first also forces the path convention decision
- Phase 3 before Phase 4: register inconsistency and section identifier errors are pre-translation errors, not post-translation fixable errors — the checklist must exist before the first translated line is written
- Phase 5 last: validation requires all prior phases to be complete and the full dependency chain (routing + templates + workflow) to be exercised together

### Research Flags

Phases with well-documented patterns (can proceed without additional research):
- **Phase 1** — $ARGUMENTS routing is fully documented in official Claude Code skills docs; exact implementation is confirmed against working GSD commands; HIGH confidence, no research needed
- **Phase 2** — Template translation is straightforward content work; the `fr/` subdirectory pattern is established in Phase 1 routing; no research needed
- **Phase 5** — Validation protocol is defined in PITFALLS.md "Looks Done But Isn't" checklist and "Performance Traps" table; no research needed

Phases that may benefit from deeper review during planning:
- **Phase 3** — The register decision ("vous" vs "tu") is recommended with HIGH confidence based on French B2B SaaS conventions, but should be validated with a native French speaker before the style guide is finalized. The ACCEPTED/REJECTED examples for Capacity/Insight/Motivation (Phase 4 P2 scope) also benefit from native French speaker review.
- **Phase 4** — The three HIGH-complexity sections (`section_advantages`, `section_manifesto`, `section_approach_generation`) involve nuanced translation of validation logic and behavior instructions. If the translator is not a native French speaker, these sections warrant a separate review pass.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | $ARGUMENTS behavior verified against official Claude Code docs and existing production commands; no new technology introduced |
| Features | HIGH | Based on direct analysis of the 1,268-line source workflow, all 4 templates, and sub-agent; no inference required |
| Architecture | HIGH | Routing pattern verified against official docs and existing GSD commands; component boundaries confirmed by direct file inspection |
| Pitfalls | HIGH | Structural pitfalls verified against actual workflow source; language drift mechanics verified against Anthropic official docs and peer-reviewed ArXiv paper |

**Overall confidence:** HIGH

### Gaps to Address

- **French copy quality:** Research establishes the register decision ("vous"), identifies Business French vocabulary preferences, and flags the three HIGH-complexity sections — but the actual French translation quality depends on the translator's native fluency. Validate the final French workflow with a native French speaker before shipping, specifically the sharpening probe questions, lock announcements, and manifesto prompts.

- **Axis label translation decision:** FEATURES.md identifies an open question: the 8 bipolar methodology axes (`Slow ←→ Fast`, `Expensive ←→ Free`, etc.) appear in both the interactive session and the SPRINT.md output table. Research recommends translating them in the French workflow (for French user coherence) but notes the consistency dependency — the French SPRINT.md template's axis table must match exactly. This decision should be documented in the Phase 3 style guide and verified in Phase 5.

- **gyst-researcher output language:** PITFALLS.md identifies that the researcher sub-agent must receive an explicit "Réponds en français" instruction in the French workflow's Task call. This is a LOW-effort fix but must be verified during Phase 5 by running Step 1 with at least two competitors and confirming COMPETITORS.md is written in French.

## Sources

### Primary (HIGH confidence)
- Official Claude Code skills documentation (verified 2026-03-08): https://code.claude.com/docs/en/slash-commands — `$ARGUMENTS` substitution, `argument-hint` frontmatter, `<execution_context>` static resolution
- Anthropic official multilingual support documentation: https://platform.claude.com/docs/en/build-with-claude/multilingual-support — French performance at 97.5% relative to English; language directive best practices
- Anthropic official prompt engineering best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices — primacy effect, XML tag conventions, language directive placement
- "Understanding and Mitigating Language Confusion in LLMs" (ArXiv 2406.20052): https://arxiv.org/html/2406.20052v1 — root cause of language drift; prevention via strong opening directives
- Direct inspection of `foundation-sprint.md` (v1.0.0, 1,268 lines) — all 20 section names, all `@` template references, all verbatim output blocks inventoried
- Direct inspection of all 4 templates, `gyst-researcher.md`, and `commands/gyst/foundation-sprint.md`
- GSD reference commands: `~/.claude/commands/gsd/execute-phase.md` and `add-phase.md` — confirmed `$ARGUMENTS` routing pattern in production

### Secondary (MEDIUM confidence)
- LangChain issue #14974 "LLMs start replying in other languages": https://github.com/langchain-ai/langchain/issues/14974 — primacy effect with large non-target-language system prompts; prepend directive as mitigation
- French business communication conventions (Alliance Française Silicon Valley, italki French for Business, WizMantra 2025) — "vous" standard for B2B SaaS professional context

### Tertiary (LOW confidence — validate before final copy)
- Business French vocabulary recommendations (register, lock phrase translations, Franglais conventions) — training data; validate with native French speaker before shipping translated workflow

---
*Research completed: 2026-03-08*
*Ready for roadmap: yes*
