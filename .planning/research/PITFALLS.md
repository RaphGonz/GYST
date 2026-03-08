# Pitfalls Research

**Domain:** Claude workflow translation — adding French language support to a structured AI prompt workflow
**Researched:** 2026-03-08
**Confidence:** HIGH (structural pitfalls verified against actual workflow source; language-drift mechanics verified against Anthropic official docs and peer-reviewed LLM research)

---

## Critical Pitfalls

### Pitfall 1: Translating XML Section Identifiers

**What goes wrong:**
The workflow uses `<section name="...">` attributes as machine-readable anchors that Claude cross-references within the same file. For example, `section_write_outputs` appears in navigation instructions ("proceed to section_write_outputs"), CRITICAL rules ("This is the ONLY place... HYPOTHESIS.md is written"), and cross-section references throughout the 1,268-line workflow. If a translator renders these as `<section name="section_ecriture_sorties">`, the cross-references in prose instructions remain pointing at the English identifier — Claude cannot reconcile the mismatch and the constraint collapses silently.

**Why it happens:**
Translators follow a blanket rule: "translate everything." XML tag names and attribute values look like English words, so they feel like translation targets. The danger is invisible at translation time because the workflow still reads as grammatically correct French — it only fails at runtime when Claude processes the cross-references.

**How to avoid:**
Define a strict two-tier rule before translation begins:

- **Tier 1 — Never translate (technical identifiers):** All `name=` attribute values inside `<section name="...">` tags. Every reference to those names in prose (e.g., "proceed to section_write_outputs", "navigate to section_axis_rating"). The `@~/.claude/get-your-shit-together/...` file path strings. Output file names (HYPOTHESIS.md, SPRINT.md, POSITIONING.md, COMPETITORS.md, COMPETITORS-FR.md). Template path references in `@` syntax.
- **Tier 2 — Translate fully:** All prose inside section bodies. All user-facing prompts, options, and questions. All banner label text (e.g., "Customer:" → "Client :"). All inline explanatory text.

Apply a mechanical check before shipping: search the French file for every `section name=` value from the English original and verify they are byte-for-byte identical.

**Warning signs:**
- A French version of the file where `section_write_outputs`, `section_hypothesis`, `section_approach_evaluation`, etc. appear with accents or French words substituted in the `name=` attribute.
- Any `@~/.claude/` path that has been altered.
- Output file names changed from their English originals (e.g., `HYPOTHESE.md`).

**Phase to address:**
Phase that creates `foundation-sprint-french.md` — add a translation checklist that lists every section identifier by name and marks it "DO NOT TRANSLATE."

---

### Pitfall 2: Language Drift — Claude Slipping Back to English Mid-Session

**What goes wrong:**
Claude's training corpus is heavily English-dominated. Anthropic's own research confirms that French performance sits at ~97.5% relative to English (measured by MMLU scores), but this masks a specific failure mode: when the system prompt or workflow file contains significant English content alongside French instructions, Claude's probability distribution over tokens flattens, increasing the chance of English tokens being sampled. In a 1,268-line workflow where technical identifiers (section names, file paths, CRITICAL/IMPORTANT labels) remain in English, approximately 15-20% of the character count is English even in a "French" translation. This creates continuous pressure to drift.

Concretely observed failure modes in similar multilingual LLM deployments:
1. Claude completes a full step in French, then produces the banner in English.
2. Claude uses French prose but reverts to English for locked-value announcements ("Got it — your target customer: ...").
3. Claude drifts to English after a long context window fills with English content from tool calls (WebSearch results are predominantly English).

**Why it happens:**
The English-centricity of Claude's training means English completion paths have lower perplexity (higher probability). The primacy effect (documented in the LangChain multilingual issue tracker and confirmed in the language confusion research from University of Edinburgh / 2024 ArXiv paper) shows that when a system prompt contains large volumes of content in a non-target language, the model defaults to that language regardless of single-line language directives. The GYST workflow compounds this because Step 1's WebSearch calls return English-language research results, which then accumulate in context.

**How to avoid:**
Four concrete countermeasures, applied in combination:

1. **Lead with a strong French-language directive at the very top of the workflow file** — before any other content, including the YAML front matter's `description` field. Example: `Toutes tes réponses dans cette session doivent être en français. Ne réponds jamais en anglais, même si l'utilisateur écrit en anglais.` Placement matters: first 50 tokens are highest-weight.

2. **Place a French language reinforcement directive inside every major section header** — not as a separate instruction but woven into the section's opening line. For sections that follow English-heavy tool use (section_competitors_research, section_approach_evaluation), add an explicit "Réponds en français" reminder immediately after the section opens.

3. **Make all verbatim user-facing text explicitly French** — not just translated but marked as the only acceptable output. Lock phrases like "Parfait — " (not "Got it — "), "Compris — " (not "Locked."), so Claude has fewer English completion paths available.

4. **Translate the CRITICAL/IMPORTANT labels themselves** — these are not technical identifiers, they are emphasis markers. Keeping `CRITICAL:` and `IMPORTANT:` in English creates English anchors that pull subsequent text toward English patterns. Use `CRITIQUE :` and `IMPORTANT :` (note French spacing before colon).

**Warning signs:**
- Banner renders partially in English (e.g., "pending" instead of "en attente").
- Lock announcements slip to English phrasing ("Got it" instead of the French equivalent).
- Any response after a WebSearch call is in English.
- Step transition messages ("Let's move to Step 2") appear in English.

**Phase to address:**
Translation phase (creating `foundation-sprint-french.md`) plus a dedicated session-testing phase where a French session is run end-to-end, specifically checking responses immediately following WebSearch calls.

---

### Pitfall 3: Translating Verbatim Instructions That Claude Must Reproduce Exactly

**What goes wrong:**
The English workflow contains several blocks that Claude must reproduce verbatim or near-verbatim to the user — specifically the onboarding welcome block, the banner formats, and the Step navigation menus. The French workflow must ensure these verbatim blocks are themselves in French. The pitfall is double-sided: (a) the translator leaves verbatim blocks in English thinking "this is what Claude says, not what Claude is instructed," and (b) the French translation of verbatim blocks diverges from what the underlying French logic expects.

Specifically hazardous: the `<onboarding>` block says "output the following welcome message verbatim." If the block is still in English, Claude will output it in English regardless of language directives elsewhere. This is the first text the French user sees — failing here destroys the entire user experience before Step 1 begins.

**Why it happens:**
Translators distinguish between "instructions for Claude" and "content Claude outputs." In the English source, these are visually similar (both are markdown prose inside XML sections). There is no obvious marker that "this block is verbatim output" vs. "this block is behavioral instruction." Translators unfamiliar with the workflow's structure miss the distinction.

**How to avoid:**
Before translating, annotate every verbatim reproduction block in the English source. In the GYST workflow these are:
- The entire onboarding welcome message block (lines 34-56 in the English source).
- All four banner format specifications (`step1_banner`, `step2_banner`, `step3_banner`).
- The Step 1 navigation menu (options A, B, C in `navigation_controls`).
- The sprint completion message ("Done. Your Foundation Sprint is complete.").
- The COMPETITORS.md written confirmation (`> "COMPETITORS.md written to your project directory."`).

Mark each with a comment in the French file: `<!-- BLOC VERBATIM : traduire le texte ci-dessous EXACTEMENT comme Claude le dira à l'utilisateur -->`.

**Warning signs:**
- French workflow contains English text inside the `<onboarding>` block.
- Banner format shows English labels ("Customer:", "Problem:") rather than French equivalents.
- Navigation options (A, B, C) are in English inside the French workflow.

**Phase to address:**
Translation phase — create a "verbatim output block inventory" before starting translation.

---

### Pitfall 4: Output Template File Paths Not Updated in the French Workflow

**What goes wrong:**
The French workflow must reference French-language output templates, but the template read instructions in the workflow use `@` syntax pointing to specific file paths. In the English workflow these are:
```
@~/.claude/get-your-shit-together/templates/HYPOTHESIS.md
@~/.claude/get-your-shit-together/templates/SPRINT.md
@~/.claude/get-your-shit-together/templates/POSITIONING.md
@~/.claude/get-your-shit-together/templates/COMPETITORS.md
```

If the French workflow is created by copying the English workflow and translating prose, these `@` references remain pointing to the English templates. Claude then reads the English template structure and produces output structured for English (English headers, English placeholder text, English variable labels like "X — Target customer").

**Why it happens:**
The `@` file references look like technical syntax — they are easy to recognize as "don't touch" and therefore get skipped during translation. But the target of the reference (the template file path) needs to change to point to French templates, even though the `@` syntax itself stays the same.

**How to avoid:**
Create French template files first, before translating the workflow. Suggested naming convention:
```
templates/fr/HYPOTHESIS.md
templates/fr/SPRINT.md
templates/fr/POSITIONING.md
templates/fr/COMPETITORS.md
```

Then update every `@~/.claude/get-your-shit-together/templates/` reference in the French workflow to `@~/.claude/get-your-shit-together/templates/fr/`. This is a small change but has complete scope: if any `@` reference remains pointing at the English template, the corresponding output file will have mixed French/English structure.

**Warning signs:**
- French workflow file contains `@~/.claude/get-your-shit-together/templates/HYPOTHESIS.md` (not `templates/fr/`).
- HYPOTHESIS.md output written at sprint end has English section headers or English variable labels.
- Template placeholder text appears in English inside French output files.

**Phase to address:**
Template translation phase — French templates must exist and be at their correct paths before the French workflow is created.

---

### Pitfall 5: Register Inconsistency — Mixing "tu" and "vous" Within the Workflow

**What goes wrong:**
French has two second-person singular forms with distinct social implications. "Tu" is informal/intimate; "vous" is formal/respectful. The GYST sprint addresses the user directly throughout — asking questions, proposing options, confirming locks, challenging vague answers. If the workflow inconsistently mixes "tu" and "vous," the user perceives the AI as socially confused or unprofessional. This is not a stylistic preference — in French business communication, switching registers mid-conversation is jarring in a way that has no English equivalent.

The risk is highest at transition points: the onboarding welcome, the sharpening probes, the pushback phrases ("Can you be more specific?"), and the lock announcements. These are written in different styles in the English source and may be translated by different translators or at different times, each choosing a different register.

**Why it happens:**
English has one "you." Translators working from English have no natural anchor for French register and may make different choices at different points in the document. A 1,268-line file translated sequentially will naturally drift if no register policy is declared upfront.

**How to avoid:**
Make a register decision before starting translation and enforce it globally:

- **Recommended register: "vous" (formal).** The solo entrepreneur user is a customer and a professional. The sprint is a structured business process. "Vous" matches French SaaS conventions and avoids any risk of presumed familiarity. This is consistent with how French B2B tools (Notion FR, Figma FR, Linear FR) address users.
- Document the decision in a translation style guide: "This workflow uses 'vous' throughout. Every direct address to the user must use vous-form verbs and pronouns. Never use 'tu', 'ton', 'ta', 'tes', 'toi'."
- After translation, run a search for all occurrences of "tu " (with space after), "ton ", "ta ", "tes ", "toi" and verify each is intentional (e.g., "ton idée" inside a quoted user input example is acceptable; "Peux-tu..." is not).

**Warning signs:**
- Onboarding uses "vous" but probes use "tu".
- Lock announcements use "Parfait, votre client cible..." but sharpening probes say "Peux-tu être plus précis?"
- Any mixture of "votre" and "ton/ta" within a single section.

**Phase to address:**
Translation phase — document register policy in a pre-translation style guide, not discovered during review.

---

### Pitfall 6: Sync Drift When the English Source Is Updated

**What goes wrong:**
The English `foundation-sprint.md` is an actively maintained file. Requirements LANG-04 through LANG-06 create a French translation as a separate file (`foundation-sprint-french.md`). Without a structured sync process, every update to the English source (bug fixes, new CRITICAL rules, changed lock phrases, added sections) creates silent divergence. The French workflow becomes a version behind and users running the French sprint get subtly different behavior — different lock acceptance rules, outdated output file instructions, missing CRITICAL constraints.

The most dangerous form: a CRITICAL enforcement rule is added to the English file after a bug is found (e.g., "Zero square brackets remain in HYPOTHESIS.md" — a rule that exists because Claude was leaving placeholders). The French file doesn't get the rule. French users get placeholder-filled outputs.

**Why it happens:**
Markdown files have no native diff-to-translation tooling. The French file is treated as a finished artifact rather than a maintained branch of the English source. Standard git diffs between the two files are noisy (every translated line shows as changed) and don't highlight semantically meaningful changes (a new CRITICAL rule buried in a paragraph looks the same as a translated sentence in the diff).

**How to avoid:**
Two concrete structural choices that make sync maintainable:

1. **Preserve section structure exactly.** The French file must have the same number of sections, in the same order, with the same `name=` attribute values. This makes structural diff possible: if the English file gets a new section, a simple section-count comparison detects it.

2. **Maintain a sync log.** Add a `TRANSLATION-SYNC.md` file (tracked in git alongside the French workflow) that records: the English source commit hash at time of last French sync, a list of every section and whether it was touched in that update, and the translator's notes on what changed. When the English file is updated, the sync log identifies which sections were touched and which French sections need re-review.

For sections with especially high sensitivity to divergence (specifically `section_write_outputs`, `section_hypothesis`, `section_testable_form`, and all CRITICAL constraint blocks), add inline comments in the French file:
```
<!-- SYNC-CRITIQUE : ce bloc correspond à "section_write_outputs" anglais v1.0.0 — vérifier à chaque mise à jour de la source -->
```

**Warning signs:**
- English source has a CRITICAL rule that does not appear in the French file.
- English source section count does not match French file section count.
- A bug reported in English sprint behavior that "was already fixed" — but the fix was never synced to French.
- French output files contain `[placeholder]` text that the English version no longer produces.

**Phase to address:**
The sync strategy should be established in the same phase that creates the French workflow — not as an afterthought in a future maintenance milestone. The `TRANSLATION-SYNC.md` file and comment convention should be created as part of LANG-04 delivery, not added later.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy English workflow, translate prose in-place | Fast — one file to edit | Section identifiers may be accidentally translated; `@` template paths left pointing at English templates; debt compounds with every update | Never — always translate from an annotated checklist |
| Keep English CRITICAL/IMPORTANT labels | Preserves "scan-ability" for maintainers who read English | Creates English anchors that pull Claude's token distribution toward English mid-session | Never — translate to `CRITIQUE :` / `IMPORTANT :` |
| Skip French templates, rely on English templates | Fewer files to create | Output files have English headers, English variable labels (X — Target customer); user sees English in their output | Never — French output requires French templates |
| Single-register translation pass, fix inconsistencies in QA | Faster first draft | Register inconsistencies in a 1,268-line file are extremely hard to catch in QA; you will miss some | Never — decide register before first word is translated |
| No sync log, rely on git blame | No overhead at creation | Six months later, a contributor cannot determine which English changes were synced to French and which weren't | Acceptable only if English source is frozen (it isn't) |

---

## Integration Gotchas

Common mistakes when connecting the French workflow to the routing system.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Language flag routing (`-french`) | Routing command references English workflow file path only; French flag has no corresponding French workflow path | Add `foundation-sprint-french.md` path to routing logic before testing the flag |
| `@` file inclusion in French workflow | French workflow `@` paths point to English templates because translator skipped `@` lines as "technical syntax" | Treat every `@` path as a translation target for the file path portion — update `templates/` to `templates/fr/` |
| French template file names | French templates named with French words (HYPOTHESE.md, POSITIONNEMENT.md) causing path mismatch with what French workflow expects | Name French templates identically to English originals but place them in a `fr/` subdirectory — paths are English, directory is French-namespaced |
| gyst-researcher sub-agent | Sub-agent instructions are in English; WebSearch results return English; sub-agent produces English competitor profiles piped into a French session | French workflow must include a French version of gyst-researcher instructions, or add an explicit "respond in French" directive to the researcher task call |

---

## Performance Traps

Patterns that work in testing but fail in real French sessions.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Testing French workflow with English test inputs | Claude responds in French because English inputs don't trigger drift | Test with French user inputs throughout; drift is more likely when user speaks French and Claude has English technical context | First real session with a French-speaking user |
| Short test sessions only | Language holds for Steps 1-2 but drifts in Step 3 after WebSearch fills context with English | Run a full 4-step test session before shipping; drift risk increases with context length | Approximately after 300+ tokens of English WebSearch results accumulate in context |
| Single-session manual testing | One tester's session stays in French, no systematic check | Run language-hold verification at each section transition in test protocol | Statistically uncommon sessions where English token probability crosses sampling threshold |

---

## UX Pitfalls

Common user experience mistakes specific to French workflow.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Translating "pending" to "en attente" in banners | Grammatically correct but visually mismatched — "en attente" is 10 characters vs 7 for "pending", breaking the banner's fixed-width alignment | Use "—" (em dash) or "..." as the pending placeholder in banners, which is language-agnostic and preserves alignment |
| ASCII art banners with French text breaking alignment | French words are often longer than English equivalents — "Client" (6) vs "Customer" (8); "Problème" (8) with accent vs "Problem" (7) | Re-calibrate banner widths to accommodate the longest French field label; test banner rendering before shipping |
| Formal business French tone clashing with sprint energy | "Vous" + subjunctive constructions in push-back probes feel bureaucratic rather than energizing | Use "vous" forms but prefer direct, crisp constructions — "Pouvez-vous préciser?" not "Serait-il possible que vous puissiez préciser?" |
| Translating founder advantage section labels verbatim | "CAPACITY", "INSIGHT", "MOTIVATION" become "CAPACITE", "PERSPECTIVE", "MOTIVATION" — the capitalized label style reads strangely in French | Consider keeping English labels as concept names (they function as proper nouns in a methodology) or use a natural French equivalent: "CAPACITE", "VISION", "MOTIVATION" with consistent style |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **French workflow file exists:** Verify that `section_write_outputs` references `templates/fr/` paths, not `templates/` paths — the file can exist and still point to English templates.
- [ ] **Section identifiers unchanged:** Check that all 20 `section name=` attribute values are byte-for-byte identical to the English source — the prose inside each section may be translated but the `name=` value must not be.
- [ ] **French templates exist at correct paths:** Verify `templates/fr/HYPOTHESIS.md`, `templates/fr/SPRINT.md`, `templates/fr/POSITIONING.md`, `templates/fr/COMPETITORS.md` exist at the exact paths referenced by `@` syntax in the French workflow.
- [ ] **Language directive at file top:** Verify the first non-YAML content in the French workflow is a French-language instruction to respond in French — not a translated English objective that begins with "Vous êtes..." (insufficient — needs explicit language mandate).
- [ ] **Verbatim output blocks are French:** Verify the `<onboarding>` block's welcome message body is in French — not just the instructions around it.
- [ ] **Register consistency:** Search the French file for "tu " (space after), "ton ", "ta ", "tes " — any occurrence in a direct-address context is a register error.
- [ ] **gyst-researcher sub-agent:** Verify the Task call to gyst-researcher in the French workflow includes a French-language instruction — the sub-agent inherits its own context and won't automatically respond in French.
- [ ] **TRANSLATION-SYNC.md created:** The sync log exists, records the English source commit hash at time of translation, and is committed alongside the French workflow.

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Section identifiers accidentally translated | LOW | Find-replace all `name=` attribute values in French file with English originals; test that cross-references resolve correctly |
| Language drift discovered in testing | MEDIUM | Add explicit French directive at top of file; add per-section language reinforcements before each major section; re-test full session |
| Template paths pointing to English templates | LOW | Update all `@~/.claude/.../templates/` references to `@~/.claude/.../templates/fr/`; verify French template files exist at target paths |
| Register inconsistency throughout file | HIGH | Full re-read of translated file required; cannot be fixed with find-replace since "tu" also appears in legitimate contexts (quoted user input examples); requires human review |
| English sync divergence discovered months later | HIGH | Structural diff of English vs French file section-by-section; each changed CRITICAL constraint must be manually reviewed and re-translated; no shortcut |
| gyst-researcher producing English competitor profiles | LOW | Add `Réponds en français.` to the Task call in the French workflow; no structural changes needed |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Translated section identifiers (Pitfall 1) | Phase: Create French workflow (LANG-04) — pre-translation checklist with all 20 section names marked "DO NOT TRANSLATE" | Automated: count sections in French file, compare `name=` values byte-for-byte with English source |
| Language drift mid-session (Pitfall 2) | Phase: Create French workflow (LANG-04) — French directive at file top + per-section reinforcements | Manual: run full 4-step session in French; check every response after a WebSearch call |
| Verbatim blocks left in English (Pitfall 3) | Phase: Create French workflow (LANG-04) — verbatim block inventory annotated before translation starts | Manual: read onboarding welcome, all banners, and navigation menus in French workflow; confirm they are French |
| Template `@` paths not updated (Pitfall 4) | Phase: Create French templates first (LANG-05), then French workflow (LANG-04) | Automated: grep for `@~/.claude/.../templates/` in French workflow — every occurrence must include `fr/` |
| Register inconsistency (Pitfall 5) | Phase: Pre-translation style guide created before LANG-04 begins | Automated: grep for "tu ", "ton ", "ta ", "tes " in French workflow and review each hit |
| Sync drift on updates (Pitfall 6) | Phase: LANG-04 delivery — TRANSLATION-SYNC.md created as part of done criteria | Process: TRANSLATION-SYNC.md updated with English commit hash every time English source changes |
| gyst-researcher producing English output | Phase: Create French workflow (LANG-04) — French Task call instruction added | Manual: run Step 1 with at least two competitors; verify COMPETITORS.md is written in French |

---

## Sources

- Anthropic official multilingual support documentation: https://platform.claude.com/docs/en/build-with-claude/multilingual-support — confirmed French performance at 97.5% relative to English; confirmed "provide clear language context" as best practice; HIGH confidence
- Anthropic official prompt engineering best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices — confirmed XML tag naming conventions, primacy effect in long prompts, language directive placement; HIGH confidence
- "Understanding and Mitigating Language Confusion in LLMs" (ArXiv 2406.20052): https://arxiv.org/html/2406.20052v1 — root cause of language drift is flat token distribution + English-centric training bias; prevention via strong opening directives and reduced nucleus sampling; HIGH confidence (peer-reviewed)
- LangChain issue #14974 "LLMs start replying in other languages": https://github.com/langchain-ai/langchain/issues/14974 — documented primacy effect with large non-target-language system prompts; confirmed prepend directive as mitigation; MEDIUM confidence (community-verified but platform-agnostic)
- Direct inspection of `foundation-sprint.md` (GYST v1.0.0, 1,268 lines) — all 20 section names inventoried, all `@` template references documented, all verbatim output blocks identified; HIGH confidence
- French business communication conventions (cross-referenced: Alliance Française Silicon Valley, italki French for Business, WizMantra 2025) — "vous" is standard for B2B SaaS professional context; HIGH confidence for register recommendation

---
*Pitfalls research for: Claude workflow translation — French language support (GYST v1.1)*
*Researched: 2026-03-08*
