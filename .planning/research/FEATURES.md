# Feature Research

**Domain:** Localization of an AI workflow (Claude markdown + sub-agent + templates)
**Researched:** 2026-03-08
**Confidence:** HIGH — based on direct analysis of the 1,268-line source workflow, all 4 templates, and the sub-agent file. No external sources needed; the answer comes from reading the actual artifact.

---

## What Needs to Be Translated vs What Must Stay in English

This is the core question for the milestone. The workflow mixes four distinct categories of text with very different localization rules.

---

## Category 1: Translate (User-Facing Text)

These are the words the user reads and speaks during the sprint session. Translating them is the entire point of the milestone.

| Element | Where It Appears | Complexity | Notes |
|---------|-----------------|------------|-------|
| Welcome/onboarding block | Lines 27-57 of workflow | LOW | 1 verbatim block; translate in full |
| Step banners (Steps 1-4) | `step1_banner`, `step2_banner`, `step3_banner`, `step4_banner` | LOW | Labels: "Customer", "Problem", "Advantages", "Competitors", "X-axis", "Y-axis", "Dream company", "Manifesto", "Approaches", "Chosen", "Segment", "Adversary", "Hypothesis", "Approach", "Axes" — 15 distinct labels across 4 banners |
| Open questions to the user | ~20 questions throughout 20 sections | MEDIUM | Each question is a precise interaction design choice; register matters ("tu" vs "vous" — see French-specific section) |
| Options presented to user (A/B/C format) | Every option block in sections 1-4 | MEDIUM | Labels A/B/C stay; the prose framing each option translates |
| AI behavior instructions that produce visible output | Section text like "Say:", "Tell the user:", example dialogue | HIGH | These produce what the user sees; must be idiomatic French |
| Lock announcements | "Got it — your target customer: [value]", "These work. Locking your manifesto." | LOW | ~8-10 lock announcement patterns |
| Navigation menus | A/B/C menus after each step completes | LOW | 3 navigation menus in the workflow |
| Conflict detection message | Lines 774-782 | LOW | 1 block, translate in full |
| Recommendation output | "Looking across all 4 matrices: [A#] has the strongest pattern..." | LOW | 1 template block |
| Sprint completion message | Lines 1257-1267 | LOW | Final message after files are written |
| Output template prose | All 4 templates (HYPOTHESIS.md, SPRINT.md, POSITIONING.md, COMPETITORS.md) | MEDIUM | HTML comments (instructions to Claude), section headers, field labels, example placeholder text |

**Estimated translatable units in the main workflow:** approximately 60-80 distinct prose passages across 20 sections.

---

## Category 2: Preserve in English (or Language-Neutral)

These elements must not be translated. Translating them breaks the workflow.

| Element | Where It Appears | Why Preserve | Notes |
|---------|-----------------|-------------|-------|
| YAML front matter | Lines 1-5 of workflow | Claude metadata — functional, not display | `name:`, `description:`, `version:` keys stay in English |
| XML section tags | `<section name="...">`, `<objective>`, `<onboarding>`, etc. | Claude parses these structurally | 20+ named sections; tags are invisible to user |
| Section `name=""` attribute values | `section_customer`, `section_problem`, `section_axis_rating`, etc. | Used as internal references and anchors | Do NOT translate: `write_competitors_md`, `navigation_controls`, `section_write_outputs`, etc. |
| `@` file path references | `@~/.claude/get-your-shit-together/templates/HYPOTHESIS.md` | File system paths — functional | French workflow still reads from the same install path |
| Template file paths for French output | New French templates | Path is English, content is French | French workflow reads `HYPOTHESIS-FR.md` (or equivalent) |
| The 8 standard bipolar axes labels in section_axis_rating | Lines 548-555 | These are the Foundation Sprint methodology — domain-specific jargon | Translate the surrounding prose ("Now we position your dream company on 8 bipolar axes"), but the axis labels themselves (`Slow ←→ Fast`, `Hard ←→ Easy`, etc.) may be kept or translated — see note below |
| Variable placeholders like `[X]`, `[Y]`, `[Z]`, `[W]`, `[U]`, `[V]` | Throughout | Structural markers referencing locked values | Do not alter these |
| YAML keys in templates | `**Sprint date:**`, structural markers | Claude reads these as field identifiers | Keep field key names consistent with what the workflow references |
| `* MAIN ADVERSARY` marker | COMPETITORS.md template | Workflow checks for this exact string when reading back | Must remain verbatim |
| ASCII grid characters | `←`, `→`, `^`, `|`, `+`, `►` | Language-neutral visual structure | Not text, not translated |
| gyst-researcher.md | Sub-agent file | Searches the web in English regardless of sprint language; English queries return better results | Do NOT translate; French workflow still invokes English researcher |
| HTML comment delimiters | `<!--` and `-->` in templates | Structural markdown | Not user-visible; do not translate the delimiters |

**Critical note on the 8 bipolar axes:** The methodology labels (`Slow ←→ Fast`, `Expensive ←→ Free`, etc.) appear in BOTH the interactive session (where the user rates their dream company) AND in the final SPRINT.md output (the table of ratings). If translated in the workflow, the French labels must also be used in the French SPRINT.md template's axis table. This creates a consistency dependency. Recommendation: translate the axis labels in the French workflow since French users will be entering ratings and reading feedback in French, but document that French template's axis table must match exactly.

---

## Category 3: Translate with Care (Instructions to Claude)

These are workflow instructions that Claude reads, not the user — but they produce user-visible output. They must be translated because Claude will generate French output based on them.

| Element | Complexity | Notes |
|---------|------------|-------|
| INTERNAL FILTER block (section_approach_generation) | LOW | This is a behavior rule; translate the logic description so a French Claude session applies it correctly |
| DIMENSION A/B/C guidance (Capacity, Insight, Motivation) | MEDIUM | Examples of ACCEPTED vs REJECTED answers are in English; French examples should reference French-language patterns |
| Acceptance check examples | MEDIUM | Examples like "Solo founders building B2B SaaS, pre-revenue" may stay in English or be Frenchified — the user answers in French, so French framing examples help Claude recognize valid responses |
| Validation condition logic | LOW | "If validation finds strong evidence... If validation finds little or no evidence..." — translate the condition text, not the WebSearch query strategy |
| WebSearch query templates | DO NOT TRANSLATE | `"[customer segment] [problem description] pain points"` — search queries work better in English or in the user's language of the target market |

---

## Category 4: Template Files — What Translates

The 4 output templates each have two layers: structural markers Claude uses to navigate, and prose the human reads.

| Template | What Translates | What Stays |
|----------|----------------|------------|
| HYPOTHESIS.md | HTML comments (instructions), section headers, breakdown table labels (X, Y, Z, W, U, V labels), example placeholder text in comments | The variable labels X/Y/Z/W/U/V (structural) |
| SPRINT.md | Section headers, sub-section labels, table column names, HTML comments | Field key names if workflow references them by string |
| POSITIONING.md | Section headers, HTML comments, manifesto phrase starters ("We are...", "We will never...") | ASCII matrix structure |
| COMPETITORS.md | Field labels (**What they do:**, **Pricing model:**, etc.), HTML comments, summary table column names | `* MAIN ADVERSARY` string (workflow reads this back) |

---

## Table Stakes Features for This Localization

Features that must be present for the French workflow to be considered complete. Missing any of these = incomplete localization.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full French welcome/onboarding block | First thing user sees — sets the register for the session | LOW | Must match the formatting intent of the English original (4 steps, 4 files, method description) |
| All 4 step banners in French | Banners render 20+ times across a session; English labels in a French session break immersion | LOW | 15 banner labels across 4 banners |
| French open questions for all 20 sections | Every question the AI asks must be in French | MEDIUM | ~20 questions; register choice (tu/vous) must be consistent throughout |
| French option framing examples | The A/B/C option blocks in Claude's instructions must model French framing | MEDIUM | Examples in English sections guide Claude's output style; French examples improve output quality |
| French lock announcements | Every lock confirmation reads back to the user | LOW | 8-10 patterns; must feel natural in French |
| French navigation menus | A/B/C choice menus after each step | LOW | 3 menus |
| French output templates (all 4) | Sprint output files are in French | MEDIUM | 4 files; translate field labels, comments, structural prose |
| Consistent register throughout | All user-facing text uses the same register (formal "vous" vs informal "tu") | LOW (decision) / MEDIUM (consistency enforcement) | See French-specific section below |
| Language flag routing in command | `/gyst:foundation-sprint, -french` invokes the French workflow | LOW | One-line routing addition to the command file |
| Fallback for unsupported languages | Unknown `-lang` flag returns English with a message | LOW | Error path in command routing |

---

## Differentiators (What Makes This Localization High Quality)

| Feature | Value Proposition | Complexity | Notes |
|---------|------------------|------------|-------|
| Pre-translated probing examples | AI-generated A/B/C options will read more naturally in French if the instructional examples inside the workflow are already in French | MEDIUM | The English examples like "Solo B2B SaaS founders, pre-revenue" should be matched with French-idiomatic equivalents |
| French-idiomatic manifesto prompts | The mini-manifesto section ("Phrase 1", "Phrase 2", "Phrase 3") gives French examples — avoids English-calque output | LOW | One block; French examples make a real difference in output quality |
| Translated ACCEPTED/REJECTED examples for Capacity/Insight/Motivation | Without these, Claude may accept vague French answers because its validation logic has English reference points | MEDIUM | 3 sections in `section_advantages` each have ACCEPTED/REJECTED lists |
| French validation research note | The RESEARCH-03 inline WebSearch validation note can acknowledge that pain-point articles may be in French for French-speaking markets | LOW | One paragraph; helps Claude interpret French-language search results correctly |

---

## Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Translate gyst-researcher.md into French | "The whole thing should be in French" | The researcher runs web searches; English queries + English-language search results are the internet default and return higher-quality competitor data | Keep researcher in English; it returns data that the French workflow then presents to the user in French |
| Translate XML section name attributes | "Consistency" | Section name values are referenced as internal anchors in instructions ("proceed to section_axis_selection") — translating them breaks cross-references silently | Keep section identifiers in English; only translate displayed content |
| Single bilingual workflow file (conditionals) | "Fewer files to maintain" | A 1,268-line workflow with language conditionals throughout becomes unmaintainable; no clear ownership of each language variant | Separate files per language: `foundation-sprint.md` (English), `foundation-sprint-french.md` (French) |
| Auto-detect language from user's first message | "More magical UX" | Claude's language detection is unreliable for short messages; ambiguity causes wrong-language sessions | Explicit flag (`-french`) is unambiguous and matches GSD's established pattern |
| Translate template field key names | "French output files should look fully French" | The workflow reads back specific strings like `* MAIN ADVERSARY` and field names to populate output — changing these strings breaks the read-back logic | Translate the surrounding prose and labels; preserve functional string markers |

---

## Feature Dependencies

```
Language flag routing (command file)
    └──requires──> French workflow file exists (foundation-sprint-french.md)
                       └──requires──> French output templates exist (all 4)
                                          └──requires──> Template field keys preserved for workflow read-back

French workflow (foundation-sprint-french.md)
    └──reads──> French templates at write time (HYPOTHESIS-FR, SPRINT-FR, etc.)
    └──invokes──> English gyst-researcher.md (no translation needed)

French templates
    └──must preserve──> * MAIN ADVERSARY string (read back by competitor scoring section)
```

### Dependency Notes

- **French workflow requires French templates:** The `section_write_outputs` section reads template files before writing output. If French templates do not exist at the expected paths, the write step fails.
- **French workflow still invokes English researcher:** The researcher is a separate agent that runs web searches and returns English-language profiles. The French workflow's competitor presentation section takes that English data and presents it in French to the user — this handoff must be preserved.
- **`* MAIN ADVERSARY` string must not be translated:** The competitor scoring section reads `./COMPETITORS.md` and uses this exact string. If the French COMPETITORS template uses a French marker, the scoring section will fail to detect the main adversary.

---

## MVP Definition

### Launch With (v1.1)

- [ ] French workflow file (`foundation-sprint-french.md`) — all user-facing prose, questions, options, banners, lock announcements, navigation menus in French
- [ ] Language flag routing (`-french` → French workflow) in command file
- [ ] Fallback message for unsupported flags (LANG-03)
- [ ] French COMPETITORS.md template — field labels in French, `* MAIN ADVERSARY` preserved
- [ ] French HYPOTHESIS.md template — section headers and field labels in French
- [ ] French SPRINT.md template — section headers, table column names in French
- [ ] French POSITIONING.md template — section headers, manifesto prompts in French

### Add After Validation (v1.x)

- [ ] French-idiomatic ACCEPTED/REJECTED examples in Capacity/Insight/Motivation sections — add once users report that AI-generated options feel like English-calques
- [ ] Spanish workflow (`-spanish`) — only after French workflow is validated through a full sprint session

### Future Consideration (v2+)

- [ ] Dynamic language routing from user preference stored in config — defer until there are 3+ language variants and manual flag selection becomes friction
- [ ] Translated gyst-researcher with French-language search queries for French markets — only relevant if the sprint is primarily used for French-language market research

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| French workflow file (all user-facing prose) | HIGH | MEDIUM | P1 |
| Language flag routing | HIGH | LOW | P1 |
| French output templates (all 4) | HIGH | LOW | P1 |
| Unsupported language fallback | MEDIUM | LOW | P1 |
| French probing examples (A/B/C option models) | MEDIUM | MEDIUM | P2 |
| French ACCEPTED/REJECTED examples for advantages | MEDIUM | LOW | P2 |
| Spanish workflow | LOW | HIGH | P3 |

---

## French-Specific Considerations

### Register: "Vous" is the Right Choice

The Foundation Sprint workflow addresses a solo entrepreneur as a thinking partner. The English original uses an informal but professional register ("What have you built?", "Who is this for?"). In French, this maps to **"vous"** (formal singular) rather than "tu" (informal).

Rationale: GYST users are running a business decision-making session, not a casual conversation. Entrepreneurs speaking to a professional AI tool expect "vous." Using "tu" risks feeling presumptuous or inappropriate for a first-time user.

**The register decision must be made once, stated explicitly in the French workflow's `<objective>` block, and applied consistently to every user-facing question.** Inconsistency between sections (some "tu", some "vous") is worse than either choice alone.

### Business French vs Colloquial French

Several English constructs in the workflow have Business French equivalents that differ from colloquial usage:

| English | Avoid (colloquial) | Use (Business French) |
|---------|-------------------|-----------------------|
| "Got it" | "Pigé", "Compris" | "Bien noté", "D'accord" |
| "Lock it" (user trigger phrase) | "Bloquer ça" | "Valider", "Confirmer", "Verrouiller" — the French workflow must define what lock phrases it accepts |
| "Your target customer" | "Ton client cible" | "Votre client cible" |
| "Go back" | "Retourner en arrière" | "Revenir à", "Retour à" |
| "That works" | "Ça marche" | "C'est bon", "Cela convient" |

### Lock Phrase Translation is a Logic Dependency

The English workflow has an explicit lock phrase list: "lock it", "locked", "finalize", "done", "that's it", "confirmed". These are checked against user input. The French workflow must define equivalent French lock phrases — and the check must be strict enough to prevent premature locking on casual agreement ("d'accord", "ok", "oui" should NOT trigger a lock, just as "yes" does not in English).

Suggested French lock triggers: "valider", "validé", "verrouillé", "verrouiller", "confirmer", "confirmé", "c'est définitif", "on garde ça" — the workflow instruction must list these explicitly.

### Franglais in Tech Context

Many of the sprint's domain terms are already used in French business contexts in their English form: "startup", "SaaS", "pitch", "hypothesis" (though "hypothèse" exists), "sprint", "positioning" (though "positionnement" exists). The French workflow should use the established French business vocabulary where it exists ("hypothèse", "positionnement", "segment cible", "axe de différenciation") and accept English terms where they are industry-standard in the French entrepreneurship ecosystem ("SaaS", "startup", "pitch").

### The Mini-Manifesto Section

The English manifesto prompts are:
- "We are [DIFFERENTIATOR 1]:"
- "We are [DIFFERENTIATOR 2]:"
- "We will never [SAFEGUARD]:"

French equivalents:
- "Nous sommes [DIFFÉRENCIATEUR 1] :"
- "Nous sommes [DIFFÉRENCIATEUR 2] :"
- "Nous ne ferons jamais [GARDE-FOU] :"

The POSITIONING.md French template must use these exact French forms so the AI's evaluation logic ("do they read as decision-making tools, not marketing headlines?") applies correctly to French-language manifesto phrases.

---

## Complexity Assessment by Workflow Section

| Section | Line Range | Translation Complexity | Localization Notes |
|---------|-----------|------------------------|-------------------|
| `<objective>` | 7-25 | LOW | AI instructions; translate behavior descriptions |
| `<onboarding>` | 27-57 | LOW | 1 verbatim block; high-visibility |
| `<step1_banner>` | 59-84 | LOW | 5 labels; banner format stays |
| `section_customer` | 86-134 | MEDIUM | Open question + option format example; 1 probing fallback |
| `section_problem` | 136-207 | MEDIUM | Open question + validation search note + option format |
| `section_advantages` | 209-333 | HIGH | 3 sub-dimensions each with ACCEPTED/REJECTED examples; most text-dense section |
| `section_competitors` | 335-352 | LOW | 1 question |
| `section_competitors_research` | 354-399 | MEDIUM | Research invocation prose + fallback paths |
| `section_main_adversary` | 401-423 | LOW | 1 question + lock announcement |
| `write_competitors_md` | 425-454 | LOW | Technical instructions; some confirmation prose |
| `navigation_controls` | 456-509 | LOW | 3 navigation menus + back logic descriptions |
| `<step2_banner>` | 511-532 | LOW | 4 labels |
| `section_axis_rating` | 534-581 | MEDIUM | Rating scale intro + 8 axis labels + confirmation block |
| `section_custom_axes` | 583-621 | MEDIUM | Proposal format + skip option |
| `section_axis_selection` | 623-668 | LOW | List display + selection prompt |
| `section_competitor_scoring` | 671-710 | LOW | Mostly technical rules; score display format |
| `section_matrix_render` | 712-788 | MEDIUM | Conflict detection block (high-visibility) |
| `section_manifesto` | 790-837 | HIGH | Manifesto prompts + evaluation criteria + valid/invalid examples |
| `section_step2_navigation` | 839-887 | LOW | Summary block + navigation menu |
| `<step3_banner>` | 889-909 | LOW | 3 labels |
| `section_context_reload` | 911-940 | LOW | Transition message |
| `section_approach_generation` | 942-998 | HIGH | INTERNAL FILTER + approach framing + 2-phase generation logic |
| `section_approach_evaluation` | 1000-1086 | MEDIUM | 4 matrix names + axis labels + "Ready for Matrix N?" prompts |
| `section_approach_recommendation` | 1088-1122 | LOW | Recommendation template block |
| `<step4_banner>` | 1124-1141 | LOW | 6 labels |
| `section_hypothesis` | 1143-1172 | MEDIUM | Pre-filled hypothesis template + lock instruction |
| `section_testable_form` | 1174-1202 | MEDIUM | 4 testable form components + confirmation prompt |
| `section_write_outputs` | 1204-1268 | LOW | Technical write instructions + final message |

**Total sections:** 27 (including 4 banners as sub-elements)
**HIGH complexity sections:** 3 (`section_advantages`, `section_manifesto`, `section_approach_generation`)
**MEDIUM complexity sections:** 11
**LOW complexity sections:** 13

---

## Sources

- Direct analysis of `get-your-shit-together/workflows/foundation-sprint.md` (1,268 lines, 20 named sections)
- Direct analysis of `get-your-shit-together/agents/gyst-researcher.md`
- Direct analysis of all 4 templates: HYPOTHESIS.md, SPRINT.md, POSITIONING.md, COMPETITORS.md
- Direct analysis of `commands/gyst/foundation-sprint.md` (routing entry point)
- Business French register conventions: training data (MEDIUM confidence) — validate with a native French speaker before final copy

---

*Feature research for: GYST v1.1 French localization*
*Researched: 2026-03-08*
