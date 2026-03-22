# 5PM Terminology Register

## Purpose

This register is the single source of truth for how each 5PM framework-specific term is rendered in French (FR), Japanese (JA), Portuguese (PT), Spanish (ES), German (DE), and Chinese (ZH).

Phase 11 (Language Workflow Updates) **must** read this register before writing any translated workflow sections that reference verdict labels or framework terms. Using the translations documented here ensures no divergence between the scorecard templates (Phase 10) and the workflow assembly instructions (Phase 11).

---

## Verdict Labels

These labels appear in the `**Verdict:**` and `**Résumé du Verdict**` / `**総合判定**` / `**Resumo do Veredicto**` / `**Resumen del Veredicto**` / `**Zusammenfassung des Urteils**` / `**综合判定**` fields of each translated template.

| English | French | Portuguese | Japanese | Spanish | German | Chinese | Treatment |
|---------|--------|------------|----------|---------|--------|---------|-----------|
| FAVORABLE | FAVORABLE | FAVORÁVEL | 有望 | FAVORABLE | GÜNSTIG | 有利 | FR/ES: direct cognate — no adaptation; PT: orthographic cognate; JA: translated concept (promising/favorable); DE: translated concept (favorable/beneficial); ZH: translated concept (advantageous) |
| CAUTION | ATTENTION | ATENÇÃO | 注意 | PRECAUCIÓN | VORSICHT | 谨慎 | FR/PT: translated concept (attention/warning); JA: translated concept (caution); ES: translated concept (precaution); DE: translated concept (caution/care); ZH: translated concept (careful/prudent) |
| UNFAVORABLE | DÉFAVORABLE | DESFAVORÁVEL | 懸念あり | DESFAVORABLE | UNGÜNSTIG | 不利 | FR/PT/ES: translated concept with prefix; JA: translated phrase (concerns exist); DE: translated concept (unfavorable/disadvantageous); ZH: translated concept (disadvantageous) |
| MIXED | MITIGÉ | MISTO | 混在 | MIXTO | GEMISCHT | 混合 | FR: translated concept (nuanced/mixed); PT: direct cognate; JA: translated concept (heterogeneous/mixed); ES: translated concept (mixed); DE: translated concept (mixed/blended); ZH: translated concept (mixed/combined) |

**Usage note — Verdict Summary vs. Lens verdicts:**
- Verdict Summary uses the full set: FAVORABLE / CAUTION-equivalent / UNFAVORABLE / MIXED
  - FR: `FAVORABLE / MITIGÉ / DÉFAVORABLE`
  - PT: `FAVORÁVEL / MISTO / DESFAVORÁVEL`
  - JA: `有望 / 混在 / 懸念あり`
  - ES: `FAVORABLE / MIXTO / DESFAVORABLE`
  - DE: `GÜNSTIG / GEMISCHT / UNGÜNSTIG`
  - ZH: `有利 / 混合 / 不利`
- Per-lens verdicts use three options only (no MIXED at lens level):
  - FR: `FAVORABLE / ATTENTION / DÉFAVORABLE`
  - PT: `FAVORÁVEL / ATENÇÃO / DESFAVORÁVEL`
  - JA: `有望 / 注意 / 懸念あり`
  - ES: `FAVORABLE / PRECAUCIÓN / DESFAVORABLE`
  - DE: `GÜNSTIG / VORSICHT / UNGÜNSTIG`
  - ZH: `有利 / 谨慎 / 不利`

---

## Framework Terms

These terms appear in section headings and field labels across all translated templates.

| English | French | Portuguese | Japanese | Spanish | German | Chinese | Treatment |
|---------|--------|------------|----------|---------|--------|---------|-----------|
| Lens | Prisme | Lente | 視点 | Lente | Linse | 视角 | FR: translated concept (prism — analytical perspective); PT/ES: translated concept (optical lens, natural in business usage); JA: translated concept (viewpoint/perspective); DE: translated concept (optical lens — standard analytical term); ZH: translated concept (perspective/viewpoint — more natural than loan word in formal analysis) |
| Purchaser | Acheteur | Comprador | 購買担当者 | Comprador | Käufer | 购买者 | FR: translated concept (buyer/purchaser); PT/ES: translated concept (buyer/purchaser — same root); JA: translated concept with role specification (purchasing decision-maker); DE: translated concept (buyer/purchaser); ZH: translated concept (buyer/purchaser) |
| B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | B2C / B2A / B2B / B2E | Loan word (verbatim) — internationally recognized business codes; translating creates confusion |
| Founder Fit | Adéquation Fondateur | Fit do Fundador | 創業者適性 | Encaje del Fundador | Gründer-Passung | 创始人匹配度 | FR: translated concept (fit/alignment + founder); PT: hybrid loan word + translation; JA: translated concept (founder aptitude/fit); ES: translated concept (fit/match of the founder); DE: compound noun (founder + fit/match — standard German formation); ZH: translated concept (founder match degree) |
| Pain to Validate | Douleur à Valider | Dificuldade de Validação | 検証コスト | Costo de Validación | Validierungsaufwand | 验证成本 | FR: direct translation; PT: translated concept (difficulty of validation); JA: translated concept (validation cost/difficulty); ES: translated concept (validation cost — natural in LatAm/Spain startup usage); DE: compound noun (validation effort/cost — standard German formation); ZH: translated concept (validation cost) |
| 5PM | 5PM | 5PM | 5PM | 5PM | 5PM | 5PM | Proper noun (verbatim) — Rob Walling framework name; not translated in any language |
| Matrix 5 | Matrix 5 | Matrix 5 | Matrix 5 | Matrix 5 | Matrix 5 | Matrix 5 | Proper noun (verbatim) — framework reference; not translated in any language |

---

## Formatting Conventions by Language

These conventions apply to all translated templates and must be honored in Phase 11 workflow instructions.

| Convention | French | Portuguese | Japanese | Spanish | German | Chinese |
|------------|--------|------------|----------|---------|--------|---------|
| Space before colon | Yes — `**Verdict :**` | No — `**Veredicto:**` | N/A — use full-width colon `**判定：**` | No — `**Veredicto:**` | No — `**Urteil:**` | N/A — use full-width colon `**判定：**` |
| Bracket placeholders | `[texte en français]` | `[texto em português]` | `[日本語テキスト]` | `[texto en español]` | `[Text auf Deutsch]` | `[中文文本]` |
| Direct address register | "vous" exclusively | "você" | 丁寧語 (polite register) | "tú" (informal — standard LatAm/Spain hybrid) | "Sie" (formal) | 中性书面语 (neutral written register) |

---

## Open Questions for Native Speaker Review

The following translations are linguistically reasonable but have not been verified by native speakers. Flag for review before any public-facing use.

1. **Japanese: 懸念あり vs. 不利 for UNFAVORABLE** — 懸念あり (concerns exist) chosen over 不利 (unfavorable) because it is more natural in Japanese business communication without sounding like a legal/competitive term.
2. **Japanese: 視点 vs. レンズ for Lens** — 視点 (viewpoint) chosen over loan word レンズ as more natural in formal business analysis.
3. **French: FAVORABLE vs. POSITIF** — FAVORABLE chosen as direct cognate matching the all-caps English convention; POSITIF is more colloquial.
4. **Spanish: Costo vs. Coste for Pain to Validate** — Costo chosen as the LatAm/Spain hybrid standard; Coste is more Spain-specific.
5. **German: Validierungsaufwand vs. Validierungskosten for Pain to Validate** — Validierungsaufwand (effort/complexity) chosen over Validierungskosten (monetary cost) as it captures the original meaning of validation difficulty more precisely in German business context.
6. **Chinese: 视角 vs. 镜头 for Lens** — 视角 (perspective/angle) chosen over 镜头 (camera lens) as it is more natural in formal business analysis context.
