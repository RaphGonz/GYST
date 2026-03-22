# Phase 10: Language Scorecard Templates - Research

**Researched:** 2026-03-22
**Domain:** Markdown template authoring — translation of 5PM-SCORECARD.md into FR, JA, and PT; 5PM terminology register creation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Translation tone & style:** Same directness as English across all languages — the 5PM framework is confrontational by design, Scorecards should hit just as hard regardless of language
- **Verdict labels (FAVORABLE/CAUTION/UNFAVORABLE):** Translated into each target language — the Scorecard is a founder-facing document that should be fully in their language
- **All section headers (Evidence, Rationale, Red Flags, etc.):** Fully translated — no mixing of English structural terms with target-language content
- **Formality register:** Matches the existing foundation-sprint workflow for each language — keep consistency within each language's established tone

### Claude's Discretion

- 5PM term handling strategy per language — whether framework terms (Pain to Validate, Purchaser, B2A, Founder Fit) are loan words, translated concepts, or explanatory phrases
- Terminology register format and location — standalone file vs embedded, level of detail per entry
- Template structural parity — whether translated templates must be structurally identical to English or can adapt for the target language

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TRNS-01 | 5PM Scorecard template translated to all existing languages (FR, JA, PT) at `templates/{lang}/5PM-SCORECARD.md` | English template fully read; all strings identified; target paths confirmed; formality registers confirmed from workflow files and TRANSLATION-SYNC.md |
</phase_requirements>

---

## Summary

Phase 10 delivers three new template files — `templates/fr/5PM-SCORECARD.md`, `templates/ja/5PM-SCORECARD.md`, and `templates/pt/5PM-SCORECARD.md` — plus a 5PM terminology register documenting how each framework-specific term is handled per language. No libraries, tooling, or build steps are involved. This is static file authoring, identical in kind to Phase 6 (French Output Templates).

The English source template (`get-your-shit-together/templates/5PM-SCORECARD.md`) has been fully read. It contains 5 lens sections plus a Verdict Summary block, with 9 distinct field labels to translate per language. The existing translated SPRINT.md files for FR, JA, and PT confirm each language's established formality register. The TRANSLATION-SYNC.md confirms the register for each language explicitly. The translated workflow files confirm that Phase 11 will reference `templates/{lang}/5PM-SCORECARD.md` paths — these files must exist before Phase 11 attempts to `@`-include them.

The principal research task unique to this phase — beyond applying the Phase 6 translation pattern — is determining how to handle five framework-specific 5PM terms (Pain to Validate, Purchaser, Founder Fit, B2A, and the verdict labels FAVORABLE/CAUTION/UNFAVORABLE) in each of the three languages. These terms are conceptual rather than common vocabulary and require deliberate handling decisions that are documented in the terminology register.

**Primary recommendation:** Create three template files following the same mirror-English-structure pattern established in Phase 6, using the verified formality registers below, then co-produce a standalone `5PM-TERMINOLOGY-REGISTER.md` documenting each term's per-language treatment.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown | N/A | File format for all three templates | Same format as English original and all prior translated templates |
| Direct authoring (AI translation) | N/A | Translate user-facing strings | Pre-translation is the project's established reliability strategy |

### Supporting

No libraries, npm packages, or build tooling required. Static file creation only.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Pre-translated static files | Runtime translation in workflow | Runtime translation causes language drift — explicitly ruled out in REQUIREMENTS.md Out of Scope table |
| Separate `5PM-TERMINOLOGY-REGISTER.md` file | Embedding register in each template as comments | Standalone file is easier to reference across phases; embedded comments would require reading 3 files instead of 1 |

**Installation:** None.

---

## Architecture Patterns

### Target Directory Structure

```
get-your-shit-together/
└── templates/
    ├── 5PM-SCORECARD.md          # English source (unchanged)
    ├── fr/
    │   ├── COMPETITORS.md        # Existing (Phase 6)
    │   ├── HYPOTHESIS.md         # Existing (Phase 6)
    │   ├── SPRINT.md             # Existing (Phase 6)
    │   ├── POSITIONING.md        # Existing (Phase 6)
    │   └── 5PM-SCORECARD.md     # Phase 10 deliverable
    ├── ja/
    │   ├── COMPETITORS.md        # Existing
    │   ├── HYPOTHESIS.md         # Existing
    │   ├── SPRINT.md             # Existing
    │   ├── POSITIONING.md        # Existing
    │   └── 5PM-SCORECARD.md     # Phase 10 deliverable
    └── pt/
        ├── COMPETITORS.md        # Existing
        ├── HYPOTHESIS.md         # Existing
        ├── SPRINT.md             # Existing
        ├── POSITIONING.md        # Existing
        └── 5PM-SCORECARD.md     # Phase 10 deliverable
```

The terminology register lives at:
```
get-your-shit-together/templates/5PM-TERMINOLOGY-REGISTER.md
```

### Pattern: Mirror English Structure, Replace User-Visible Strings

**What:** Every structural element (heading levels, horizontal rules, bold field labels, bracket placeholder format) is preserved exactly. Only the natural-language text visible to the founder (or to Claude reading the template at sprint end) is translated.

**When to use:** Always — consistent with Phase 6 and every prior translated template.

### What to Translate vs. What to Preserve

#### English 5PM-SCORECARD.md — Complete String Inventory

The English template has these user-visible strings (all must be translated):

| String | Type | Notes |
|--------|------|-------|
| `# 5PM Scorecard` | H1 title | Translate the word "Scorecard"; "5PM" is a proper noun — keep as-is |
| `**Sprint date:**` | Field label | Translate |
| `**Idea:**` | Field label | Translate |
| `## Verdict Summary` | Section heading | Translate |
| `[FAVORABLE / MIXED / UNFAVORABLE — overall pattern across all 5 lenses]` | Bracket placeholder | Translate prose; verdict labels per terminology register |
| `## Lens 1: Problem` | Section heading | Translate "Lens" and "Problem" |
| `**Verdict:**` | Field label | Translate |
| `[FAVORABLE / CAUTION / UNFAVORABLE]` | Bracket placeholder | Translate verdict labels per terminology register |
| `**Evidence:**` | Field label | Translate |
| `[point 1]`, `[point 2]`, `[point 3 if applicable]` | Bracket placeholders | Translate prose |
| `**Rationale:**` | Field label | Translate |
| `[1-2 sentence synthesis]` | Bracket placeholder | Translate prose |
| `**Red flags:**` | Field label | Translate |
| `[none / flagged items]` | Bracket placeholder | Translate prose |
| `## Lens 2: Purchaser` | Section heading | Translate per terminology register |
| `## Lens 3: Market` | Section heading | Translate |
| `## Lens 4: Founder Fit` | Section heading | Translate per terminology register |
| `[point 1 — background/expertise]` | Bracket placeholder | Translate prose |
| `[point 2 — market access/network]` | Bracket placeholder | Translate prose |
| `[point 3 — passion check]` | Bracket placeholder | Translate prose |
| `[none / flagged items — passion = no or lukewarm is mandatory red flag]` | Bracket placeholder | Translate prose including the flag condition |
| `## Lens 5: Pain to Validate` | Section heading | Translate per terminology register |
| `[chosen approach name and Matrix 5 placement]` | Bracket placeholder | Translate prose |
| `[elegance assessment]` | Bracket placeholder | Translate |
| `[build speed assessment]` | Bracket placeholder | Translate |
| `[none / flagged items — bottom-left quadrant = build pain risk]` | Bracket placeholder | Translate prose |

#### Strings to Preserve Verbatim

- `5PM` — framework proper noun, not translated in any language
- The filename `5PM-SCORECARD.md` when referenced in prose — preserve
- Structural markdown: `---` horizontal rules, `**bold**` formatting, `##` heading levels, `- ` list items
- Bracket placeholder format: `[text]` — keep square brackets; translate the prose inside

### Established Formality Registers (HIGH confidence, confirmed from TRANSLATION-SYNC.md)

| Language | Register | Source Confirmation |
|----------|----------|---------------------|
| French (fr) | "vous" — formal second person | TRANSLATION-SYNC.md explicit: "Register : 'vous' exclusivement pour toute adresse directe à l'utilisateur" |
| Portuguese (pt) | "você" — informal, natural for entrepreneurs | TRANSLATION-SYNC.md explicit: "Registro: 'você' para tratamento direto com o usuário (informal, natural para empreendedores)" |
| Japanese (ja) | Polite register appropriate for business context, "あなた" for direct address | TRANSLATION-SYNC.md explicit: "敬語：「あなた」でユーザーへの直接の呼びかけ（ビジネス文脈に適した丁寧な表現）" |

Note: The 5PM-SCORECARD.md template has minimal direct address to the founder (it is an output document, not a conversation file). Register consistency is most relevant in the bracket placeholders that describe what evidence to record.

### Anti-Patterns to Avoid

- **Translating `5PM`:** "5PM" is the Rob Walling framework name, a proper noun. It does not become "5MP" or any language-native expansion.
- **Leaving verdict labels in English:** CONTEXT.md locks this — FAVORABLE/CAUTION/UNFAVORABLE must be translated in each template. The terminology register documents the chosen translations.
- **Mixing English structural labels with translated content:** All section headers and field labels must be in the target language (locked decision).
- **Creating files at wrong path:** Templates must be at `get-your-shit-together/templates/{lang}/5PM-SCORECARD.md`, not at `templates/{lang}/` at the project root.
- **Renaming the file:** Phase 11 will `@`-include `templates/{lang}/5PM-SCORECARD.md` — this exact filename must be used.

---

## 5PM Terminology Register — Research Findings

This is the substantive research unique to Phase 10. The planner must produce a `5PM-TERMINOLOGY-REGISTER.md` based on these findings.

### Term: FAVORABLE / CAUTION / UNFAVORABLE (Verdict Labels)

These are the primary output labels a founder reads. They must be translated per the locked decision.

| Language | FAVORABLE | CAUTION | UNFAVORABLE | Notes |
|----------|-----------|---------|-------------|-------|
| French | FAVORABLE | ATTENTION | DÉFAVORABLE | "FAVORABLE" is a direct French cognate; "ATTENTION" signals caution/warning; "DÉFAVORABLE" is the standard negative |
| Portuguese | FAVORÁVEL | ATENÇÃO | DESFAVORÁVEL | Cognates with slight orthographic adaptation; natural to BR Portuguese entrepreneurs |
| Japanese | 有望 (yūbō) | 注意 (chūi) | 懸念あり (kenen ari) | "有望" = promising/favorable; "注意" = caution/attention; "懸念あり" = concerns exist; all are natural business Japanese |

Confidence: MEDIUM (plausible translations; should be confirmed by a native speaker before Phase 11 integration, but sufficient for template authoring)

### Term: MIXED (Verdict Summary only)

| Language | MIXED | Notes |
|----------|-------|-------|
| French | MITIGÉ | Standard French for mixed/nuanced results |
| Portuguese | MISTO | Direct cognate; natural in Portuguese |
| Japanese | 混在 (konzai) | Mixed/heterogeneous; accurate for "signals are mixed" |

Confidence: MEDIUM

### Term: Lens (as in "Lens 1: Problem")

"Lens" as a conceptual framework term (a way of examining a question).

| Language | Translation | Approach | Notes |
|----------|-------------|----------|-------|
| French | Prisme | Translated concept | "Prisme" (prism/lens) captures the "view through a particular perspective" meaning; "Lentille" is the optical lens but less natural in business French |
| Portuguese | Lente | Translated concept | Direct translation of optical lens; used in business Portuguese as "analytical lens" |
| Japanese | 視点 (shiten) | Translated concept | "Viewpoint/perspective"; "レンズ" (renzu, loan word) is also used but 視点 feels more natural in business analysis |

Confidence: MEDIUM

### Term: Purchaser

"Purchaser" in 5PM refers specifically to the decision-maker who writes the check — distinct from the end user.

| Language | Translation | Approach | Notes |
|----------|-------------|----------|-------|
| French | Acheteur | Translated concept | "Acheteur" = buyer/purchaser; captures the decision-maker who pays; "Décideur" (decision-maker) is also valid but loses the financial specificity |
| Portuguese | Comprador | Translated concept | "Comprador" = buyer/purchaser; natural in BR Portuguese business context |
| Japanese | 購買担当者 (kōbai tantōsha) | Translated concept with role specification | "Purchasing decision-maker"; pure "購入者" (buyer) also works but 購買担当者 conveys the B2B decision-maker meaning more precisely |

Confidence: MEDIUM

### Term: B2C / B2A / B2B / B2E (Purchaser Tier Labels)

These are framework classification codes. Recommendation: Keep as loan words/acronyms in all three languages — they are internationally recognized business classification codes, not natural-language phrases.

| Language | Treatment | Rationale |
|----------|-----------|-----------|
| French | B2C / B2A / B2B / B2E verbatim | These acronyms are widely used in French business contexts without translation |
| Portuguese | B2C / B2A / B2B / B2E verbatim | Same — standard international business vocabulary in Brazil |
| Japanese | B2C / B2A / B2B / B2E verbatim | Common in Japanese tech/startup culture; no native equivalents in common use |

Confidence: HIGH — using internationally recognized acronyms is safe; translating them would create confusion.

Note: B2A (aspirational buyers) should be parenthetically described the first time it appears in each workflow (Phase 11 concern), but in the template itself, the label B2A appears only in bracket placeholders and does not need additional explanation.

### Term: Founder Fit

"Founder Fit" = the degree to which this specific founder is the right person to build this specific idea.

| Language | Translation | Approach | Notes |
|----------|-------------|----------|-------|
| French | Adéquation Fondateur | Translated concept | "Adéquation" = fit/alignment; "Fondateur" = founder; natural in French startup discourse |
| Portuguese | Fit do Fundador | Hybrid (loan word + translation) | "Fit" is commonly used as a loan word in Brazilian startup culture; "Fundador" = founder |
| Japanese | 創業者適性 (sōgyōsha tekisei) | Translated concept | "Founder aptitude/fit"; alternatively "ファウンダーフィット" (loan word) — 創業者適性 is more natural in formal business contexts |

Confidence: MEDIUM

### Term: Pain to Validate

"Pain to Validate" in 5PM = the difficulty of validating that customers actually have this pain (time, effort, cost of the MVP to test the hypothesis).

| Language | Translation | Approach | Notes |
|----------|-------------|----------|-------|
| French | Douleur à Valider | Translated concept | Direct translation; "douleur" = pain; "à valider" = to validate; captures the framework meaning |
| Portuguese | Dificuldade de Validação | Translated concept | "Difficulty of validation" — more natural than literal "Dor a Validar"; captures the friction/effort meaning |
| Japanese | 検証コスト (kenshō kosuto) | Translated concept | "Validation cost/difficulty"; more natural than direct loan word; "Pain" doesn't translate literally into Japanese with the same business connotation |

Confidence: MEDIUM — these translations are reasonable but the framework-specific meaning (how hard is it to test this hypothesis cheaply?) should be preserved in the bracket placeholder text within each template.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Translation quality | Custom translation script | Direct AI authoring per file | One-time authoring act; no runtime tooling in project |
| Terminology consistency | Per-file term decisions | Centralized 5PM-TERMINOLOGY-REGISTER.md | Phase 11 (workflow translation) must use same term choices; register is the single source of truth |
| File creation | Shell script | Direct Write operations | Three static files; scripting adds no value |

**Key insight:** This phase has no technical complexity. The only domain knowledge required is (a) which strings to translate, (b) which strings to preserve, (c) what the correct term translations are per language, and (d) where to write the files. All four are documented above.

---

## Common Pitfalls

### Pitfall 1: Translating Verdict Labels Inconsistently Across Template and Future Workflow

**What goes wrong:** Phase 10 chooses one French translation for FAVORABLE, but Phase 11 independently chooses a different one when translating the workflow's section_write_outputs instructions.
**Why it happens:** Verdict labels appear in two places — the template (Phase 10) and the workflow assembly instructions (Phase 11). If different people or sessions handle each, terms diverge.
**How to avoid:** The 5PM-TERMINOLOGY-REGISTER.md is the authority. Phase 11 must read it before choosing any verdict label translations.
**Warning signs:** FAVORABLE appears in French as both "FAVORABLE" and "POSITIF" in different files.

### Pitfall 2: Keeping English Verdict Labels in the Template

**What goes wrong:** FAVORABLE/CAUTION/UNFAVORABLE left in English in the translated template, even though CONTEXT.md locks the decision to translate them.
**Why it happens:** They look like proper names or codes rather than natural language.
**How to avoid:** CONTEXT.md is explicit. All verdict labels must appear in the target language.
**Warning signs:** Any English all-caps word (FAVORABLE, CAUTION, UNFAVORABLE, MIXED) in a FR/JA/PT template file.

### Pitfall 3: Wrong Output Path

**What goes wrong:** Files created at `templates/5PM-SCORECARD.md` (root) or `templates/fr-scorecard.md` instead of `templates/fr/5PM-SCORECARD.md`.
**Why it happens:** The `5PM-SCORECARD.md` filename is unusual among the language templates (all others are COMPETITORS, HYPOTHESIS, SPRINT, POSITIONING — no language subdirectory had a scorecard previously).
**How to avoid:** Verify that `get-your-shit-together/templates/fr/COMPETITORS.md` exists alongside the new `5PM-SCORECARD.md` in the same directory.
**Warning signs:** `ls get-your-shit-together/templates/fr/` shows fewer than 5 files after Phase 10.

### Pitfall 4: Translating `5PM` or Altering the Filename

**What goes wrong:** Template renamed to `FICHE-5PM.md` (French) or `5PM-スコアカード.md` (Japanese); or "5PM" in the H1 title becomes a native phrase.
**Why it happens:** Natural impulse to make filenames locale-friendly.
**How to avoid:** Phase 11 will `@`-include `templates/{lang}/5PM-SCORECARD.md`. The filename must be byte-for-byte identical.
**Warning signs:** Any `ls templates/fr/` result that doesn't show exactly `5PM-SCORECARD.md`.

### Pitfall 5: Terminology Register Buried or Inaccessible

**What goes wrong:** Register embedded as comments inside one template instead of a standalone file; Phase 11 researcher/planner can't find it.
**Why it happens:** Feels more "DRY" to co-locate register with templates.
**How to avoid:** Write `5PM-TERMINOLOGY-REGISTER.md` as a standalone file at `get-your-shit-together/templates/5PM-TERMINOLOGY-REGISTER.md` — top-level templates directory, visible alongside the English source.
**Warning signs:** No standalone register file exists after Phase 10 completes.

---

## Code Examples

### English Source (for reference during translation)

```markdown
# 5PM Scorecard

**Sprint date:** [date]
**Idea:** [one-line description of the idea from the sprint]

---

## Verdict Summary

[FAVORABLE / MIXED / UNFAVORABLE — overall pattern across all 5 lenses]

---

## Lens 1: Problem

**Verdict:** [FAVORABLE / CAUTION / UNFAVORABLE]

**Evidence:**
- [point 1]
- [point 2]
- [point 3 if applicable]

**Rationale:** [1-2 sentence synthesis]

**Red flags:** [none / flagged items]
```

### Example FR Translation Pattern

```markdown
# 5PM Scorecard

**Date du sprint :** [date]
**Idée :** [description en une ligne de l'idée issue du sprint]

---

## Résumé du Verdict

[FAVORABLE / MITIGÉ / DÉFAVORABLE — tendance générale sur les 5 prismes]

---

## Prisme 1 : Problème

**Verdict :** [FAVORABLE / ATTENTION / DÉFAVORABLE]

**Preuves :**
- [point 1]
- [point 2]
- [point 3 si applicable]

**Justification :** [synthèse en 1-2 phrases]

**Signaux d'alerte :** [aucun / éléments signalés]
```

### Example JA Translation Pattern (Partial)

```markdown
# 5PMスコアカード

**スプリント日：** [日付]
**アイデア：** [スプリントから得たアイデアの一文説明]

---

## 総合判定

[有望 / 混在 / 懸念あり — 5つの視点全体のパターン]

---

## 視点1：問題

**判定：** [有望 / 注意 / 懸念あり]

**根拠：**
- [ポイント1]
- [ポイント2]
- [該当する場合ポイント3]

**評価：** [1〜2文の総合評価]

**懸念点：** [なし / 指摘事項]
```

### Example PT Translation Pattern (Partial)

```markdown
# 5PM Scorecard

**Data do sprint:** [data]
**Ideia:** [descrição em uma linha da ideia do sprint]

---

## Resumo do Veredicto

[FAVORÁVEL / MISTO / DESFAVORÁVEL — padrão geral nos 5 prismas]

---

## Lente 1: Problema

**Veredicto:** [FAVORÁVEL / ATENÇÃO / DESFAVORÁVEL]

**Evidências:**
- [ponto 1]
- [ponto 2]
- [ponto 3 se aplicável]

**Justificativa:** [síntese em 1-2 frases]

**Sinais de alerta:** [nenhum / itens sinalizados]
```

### Terminology Register Structure

```markdown
# 5PM Terminology Register

## Purpose
This register documents how each 5PM framework-specific term is rendered in each translated language.
Phase 11 (Language Workflow Updates) must use these translations when updating workflow files.

## Term Decisions

### Verdict Labels

| English | French | Portuguese | Japanese | Treatment |
|---------|--------|------------|----------|-----------|
| FAVORABLE | FAVORABLE | FAVORÁVEL | 有望 | Cognate / concept |
| CAUTION | ATTENTION | ATENÇÃO | 注意 | Translated concept |
| UNFAVORABLE | DÉFAVORABLE | DESFAVORÁVEL | 懸念あり | Translated concept |
| MIXED | MITIGÉ | MISTO | 混在 | Translated concept |

### Framework Terms

| English | French | Portuguese | Japanese | Treatment |
|---------|--------|------------|----------|-----------|
| Lens | Prisme | Lente | 視点 | Translated concept |
| Purchaser | Acheteur | Comprador | 購買担当者 | Translated concept |
| B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | Loan word (verbatim) |
| Founder Fit | Adéquation Fondateur | Fit do Fundador | 創業者適性 | Translated / hybrid |
| Pain to Validate | Douleur à Valider | Dificuldade de Validação | 検証コスト | Translated concept |
| 5PM | 5PM | 5PM | 5PM | Proper noun (verbatim) |
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Runtime translation | Pre-translated static templates | Defined at project start | Eliminates mid-session language drift |
| Language templates for 4 original outputs only | Language templates now extended to include 5PM-SCORECARD.md | Phase 10 | Completes template parity for all 5 output files across all 3 languages |

**Deprecated/outdated:**
- Runtime translation: explicitly ruled out in REQUIREMENTS.md Out of Scope table.

---

## Open Questions

1. **Japanese verdict labels — 懸念あり vs. 不利 for UNFAVORABLE**
   - What we know: "懸念あり" (concerns exist) is a softer, more contextual term; "不利" (unfavorable) is a more direct translation
   - What's unclear: Whether the confrontational tone mandate (same directness as English) favors 不利 (blunter) or 懸念あり (contextually appropriate in Japanese business communication)
   - Recommendation: Use 懸念あり — in Japanese business communication, this phrase conveys serious concern without sounding unnatural. "不利" in this context sounds like a legal or competitive term, not an assessment verdict. Flag for native speaker review before Phase 11.

2. **French: FAVORABLE vs. POSITIF for the verdict label**
   - What we know: "FAVORABLE" is a valid French word (cognate, no adaptation needed); "POSITIF" is more colloquial
   - What's unclear: Whether the all-caps presentation in French feels clinical or natural
   - Recommendation: Use FAVORABLE — it is a direct cognate, consistent with the English all-caps verdict convention, and unambiguous in French.

3. **Template structural adaptation for Japanese**
   - What we know: The CONTEXT.md leaves structural parity to Claude's discretion
   - What's unclear: Whether Japanese convention favors any reordering of Evidence/Rationale/Red flags
   - Recommendation: Keep the same section order as English. The 5PM-SCORECARD.md is an AI-assembled output document (not a conversation document), so it benefits from structural predictability across languages. The workflow's section_write_outputs assembly logic references sections by their content role, not by name — any reordering would break that logic in Phase 11.

---

## Sources

### Primary (HIGH confidence)

- Direct file read: `get-your-shit-together/templates/5PM-SCORECARD.md` — full content inspected, all strings catalogued
- Direct file read: `get-your-shit-together/templates/fr/SPRINT.md` — formality register confirmed (vous)
- Direct file read: `get-your-shit-together/templates/ja/SPRINT.md` — formality register confirmed (丁寧語)
- Direct file read: `get-your-shit-together/templates/pt/SPRINT.md` — formality register confirmed (você)
- Direct file read: `TRANSLATION-SYNC.md` — all three registers confirmed explicitly per language
- Direct file read: `.planning/phases/06-french-output-templates/06-RESEARCH.md` — Phase 6 translation pattern confirmed
- Direct file read: `get-your-shit-together/workflows/foundation-sprint.md` lines 1476–1515 — confirmed `@~/.claude/get-your-shit-together/templates/5PM-SCORECARD.md` path pattern for English workflow
- Direct file read: `get-your-shit-together/workflows/foundation-sprint-french.md` — confirmed `templates/fr/` path pattern; no scorecard include yet (Phase 11 adds it)
- Direct file read: `get-your-shit-together/workflows/foundation-sprint-japanese.md` — confirmed `templates/ja/` path pattern
- Direct file read: `get-your-shit-together/workflows/foundation-sprint-portuguese.md` — confirmed `templates/pt/` path pattern
- Direct file read: `.planning/REQUIREMENTS.md` — TRNS-01 requirement text confirmed

### Secondary (MEDIUM confidence)

- Terminology translations (Verdict labels, Lens, Purchaser, Founder Fit, Pain to Validate): derived from linguistic knowledge of French, Portuguese, and Japanese in business contexts. These are plausible translations, not verified by native speakers.

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no libraries; static file authoring identical to Phase 6
- Architecture: HIGH — directory structure confirmed from existing templates and workflow `@`-include paths
- Pitfalls: HIGH — derived from Phase 6 precedent and direct reading of English source template
- Terminology register: MEDIUM — translations are linguistically reasonable but not native-speaker verified

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (30 days — domain is stable; English template does not change in Phase 10)
