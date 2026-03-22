# 5PM Terminology Register

## Purpose

This register is the single source of truth for how each 5PM framework-specific term is rendered in French (FR), Japanese (JA), and Portuguese (PT).

Phase 11 (Language Workflow Updates) **must** read this register before writing any translated workflow sections that reference verdict labels or framework terms. Using the translations documented here ensures no divergence between the scorecard templates (Phase 10) and the workflow assembly instructions (Phase 11).

---

## Verdict Labels

These labels appear in the `**Verdict:**` and `**Résumé du Verdict**` / `**総合判定**` / `**Resumo do Veredicto**` fields of each translated template.

| English | French | Portuguese | Japanese | Treatment |
|---------|--------|------------|----------|-----------|
| FAVORABLE | FAVORABLE | FAVORÁVEL | 有望 | FR: direct cognate — no adaptation; PT: orthographic cognate; JA: translated concept (promising/favorable) |
| CAUTION | ATTENTION | ATENÇÃO | 注意 | FR/PT: translated concept (attention/warning); JA: translated concept (caution) |
| UNFAVORABLE | DÉFAVORABLE | DESFAVORÁVEL | 懸念あり | FR/PT: translated concept with prefix; JA: translated phrase (concerns exist) |
| MIXED | MITIGÉ | MISTO | 混在 | FR: translated concept (nuanced/mixed); PT: direct cognate; JA: translated concept (heterogeneous/mixed) |

**Usage note — Verdict Summary vs. Lens verdicts:**
- Verdict Summary uses the full set: FAVORABLE / CAUTION-equivalent / UNFAVORABLE / MIXED
  - FR: `FAVORABLE / MITIGÉ / DÉFAVORABLE`
  - PT: `FAVORÁVEL / MISTO / DESFAVORÁVEL`
  - JA: `有望 / 混在 / 懸念あり`
- Per-lens verdicts use three options only (no MIXED at lens level):
  - FR: `FAVORABLE / ATTENTION / DÉFAVORABLE`
  - PT: `FAVORÁVEL / ATENÇÃO / DESFAVORÁVEL`
  - JA: `有望 / 注意 / 懸念あり`

---

## Framework Terms

These terms appear in section headings and field labels across all translated templates.

| English | French | Portuguese | Japanese | Treatment |
|---------|--------|------------|----------|-----------|
| Lens | Prisme | Lente | 視点 | FR: translated concept (prism — analytical perspective); PT: translated concept (optical lens, natural in business Portuguese); JA: translated concept (viewpoint/perspective — more natural than loan word レンズ in formal analysis) |
| Purchaser | Acheteur | Comprador | 購買担当者 | FR/PT: translated concept (buyer/purchaser); JA: translated concept with role specification (purchasing decision-maker — conveys B2B decision-maker meaning precisely) |
| B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | Loan word (verbatim) — internationally recognized business codes; translating creates confusion |
| Founder Fit | Adéquation Fondateur | Fit do Fundador | 創業者適性 | FR: translated concept (fit/alignment + founder); PT: hybrid loan word + translation ("Fit" is common in BR startup culture); JA: translated concept (founder aptitude/fit) |
| Pain to Validate | Douleur à Valider | Dificuldade de Validação | 検証コスト | FR: direct translation (pain to validate); PT: translated concept (difficulty of validation — more natural than literal); JA: translated concept (validation cost/difficulty) |
| 5PM | 5PM | 5PM | 5PM | Proper noun (verbatim) — Rob Walling framework name; not translated in any language |
| Matrix 5 | Matrix 5 | Matrix 5 | Matrix 5 | Proper noun (verbatim) — framework reference; not translated in any language |

---

## Formatting Conventions by Language

These conventions apply to all translated templates and must be honored in Phase 11 workflow instructions.

| Convention | French | Portuguese | Japanese |
|------------|--------|------------|----------|
| Space before colon | Yes — `**Verdict :**` | No — `**Veredicto:**` | N/A — use full-width colon `**判定：**` |
| Bracket placeholders | `[texte en français]` | `[texto em português]` | `[日本語テキスト]` |
| Direct address register | "vous" exclusively | "você" | 丁寧語 (polite register) |

---

## Open Questions for Native Speaker Review

The following translations are linguistically reasonable but have not been verified by native speakers. Flag for review before any public-facing use.

1. **Japanese: 懸念あり vs. 不利 for UNFAVORABLE** — 懸念あり (concerns exist) chosen over 不利 (unfavorable) because it is more natural in Japanese business communication without sounding like a legal/competitive term.
2. **Japanese: 視点 vs. レンズ for Lens** — 視点 (viewpoint) chosen over loan word レンズ as more natural in formal business analysis.
3. **French: FAVORABLE vs. POSITIF** — FAVORABLE chosen as direct cognate matching the all-caps English convention; POSITIF is more colloquial.
