# Phase 6: French Output Templates - Research

**Researched:** 2026-03-08
**Domain:** Markdown template authoring — French translation of structured output files
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LANG-04 | French versions of all 4 output templates exist at `templates/fr/` (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) — all headers, labels, and structural text in French; `* MAIN ADVERSARY` string and YAML keys preserved verbatim | Source templates fully read; all strings to translate and strings to preserve identified; target directory path confirmed |
</phase_requirements>

---

## Summary

Phase 6 delivers four Markdown template files in a new `templates/fr/` subdirectory. The templates are direct French translations of the four existing English templates at `get-your-shit-together/templates/`. No new libraries, tooling, or build steps are involved — this phase is purely content authoring.

The English source files have been fully read and catalogued. Every string needing translation has been identified, and every string that must remain verbatim (the `* MAIN ADVERSARY` marker, YAML-style keys used for machine processing) has been noted. The French workflow (Phase 7) will reference these files via `@~/.claude/get-your-shit-together/templates/fr/` paths, so the `fr/` subdirectory must sit inside `get-your-shit-together/templates/`.

**Primary recommendation:** Create `get-your-shit-together/templates/fr/` and write all four files in one plan, translating all user-visible text to French while preserving the verbatim strings documented below.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown | N/A | File format for all four templates | Same format as English originals; Sprint workflow reads/writes .md |
| Manual French translation | N/A | Translate user-facing strings | Pre-translation is the project's chosen reliability strategy (see STATE.md) |

### Supporting

No libraries, npm packages, or build tooling required. This phase is static file creation only.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual translation | Runtime AI translation | Runtime translation causes language drift — explicitly ruled out in REQUIREMENTS.md Out of Scope table |
| Single `fr/` subdirectory | Suffix-named files (`HYPOTHESIS-fr.md`) | Suffix naming violates LANG-04 success criterion 4 and breaks `@`-include paths in the French workflow |

**Installation:** None.

---

## Architecture Patterns

### Target Directory Structure

```
get-your-shit-together/
└── templates/
    ├── COMPETITORS.md        # English source (unchanged)
    ├── HYPOTHESIS.md         # English source (unchanged)
    ├── SPRINT.md             # English source (unchanged)
    ├── POSITIONING.md        # English source (unchanged)
    └── fr/
        ├── COMPETITORS.md    # French translation (Phase 6 deliverable)
        ├── HYPOTHESIS.md     # French translation (Phase 6 deliverable)
        ├── SPRINT.md         # French translation (Phase 6 deliverable)
        └── POSITIONING.md    # French translation (Phase 6 deliverable)
```

The `fr/` subdirectory is what Phase 7 will reference in its `@`-include paths:

```
@~/.claude/get-your-shit-together/templates/fr/COMPETITORS.md
@~/.claude/get-your-shit-together/templates/fr/HYPOTHESIS.md
@~/.claude/get-your-shit-together/templates/fr/SPRINT.md
@~/.claude/get-your-shit-together/templates/fr/POSITIONING.md
```

### Pattern: Mirror English Structure, Replace User-Visible Strings

**What:** Every structural element (heading levels, table columns, HTML comment blocks, code fences, blank lines, horizontal rules) is preserved exactly. Only the natural-language text visible to a user or to Claude during sprint execution is translated.

**When to use:** Always — this is the only translation approach consistent with the project's pre-translation strategy and template injection model.

### What to Translate vs. What to Preserve

#### COMPETITORS.md

Translate:
- File title: `# COMPETITORS.md` — leave as-is (it is a filename, not prose; see note below)
- HTML comment instructional text (inside `<!-- ... -->` blocks)
- Field labels: `**Sprint date:**`, `**Customer segment:**`, `**Main adversary:**`
- Section heading: `## Competitors`, `## Summary Table`
- Field labels within competitor blocks: `**Type:**`, `**What they do:**`, `**Pricing model:**`, `**Known strengths:**`, `**Known weaknesses:**`, `**Positioning signals:**`, `**Research sources:**`
- Table column headers: `Competitor`, `Type`, `Main Adversary`, `Pricing`, `Key Strength`, `Key Weakness`
- Bracket placeholder text: `[date]`, `[the segment identified in Step 1]`, etc.

Preserve verbatim (do NOT translate):
- `* MAIN ADVERSARY` — this is a machine-readable marker used by the workflow to identify which competitor is flagged; LANG-04 success criterion 3 explicitly requires this
- `Direct / Indirect` — these are enumeration values referenced by the workflow; translate the label but preserve the value options or use consistent French equivalents; treat as LOW-risk but confirm with Phase 7
- HTML comment delimiters `<!--` and `-->` — structural, not text

> Note on file title: The H1 heading `# COMPETITORS.md` in the English file is a filename-as-title convention. In the French template it can remain `# COMPETITORS.md` (it is a filename, not translated prose) — but the planner should decide. The safer approach is to leave it unchanged since Phase 7 produces a file named `COMPETITORS.md`.

#### HYPOTHESIS.md

Translate:
- HTML comment instructional text
- Section headings: `## The Hypothesis`, `### Breakdown`, `## Testable Form`, `### Success Metric`, `### Falsification Condition`, `### Main Risk`, `### Fastest Validation Test`
- Table column headers in Breakdown table: `Variable`, `Value`
- Row labels in Breakdown table: `X — Target customer`, `Y — Problem`, `Z — Approach`, `W — Main adversary`, `U — Differentiator 1`, `V — Differentiator 2`
- Inline bracket placeholder text and example text (inside `[e.g., ...]` blocks)

Preserve verbatim:
- Variable letters in Breakdown table row labels (X, Y, Z, W, U, V) — these are formal variable identifiers referenced in the hypothesis formula
- The hypothesis formula structure in the blockquote — translate the prose words but preserve the bracket variable names `[TARGET CUSTOMER:`, `[PROBLEM:`, `[APPROACH:`, `[MAIN ADVERSARY:`, `[DIFFERENTIATOR 1:`, `[DIFFERENTIATOR 2:` (the colon-label format is functional)

#### SPRINT.md

Translate:
- File title prose: `# SPRINT.md — Foundation Sprint Journal` → French equivalent
- HTML comment instructional text
- All section and subsection headings (Step 1–4 labels, sub-headings within each step)
- Field labels within each section: `**Options considered:**`, `**Chosen:**`, `**Rationale:**`, etc.
- Table column headers and inline labels
- The axis names in the Bipolar Axis Ratings table — translate the axis labels (e.g., `Slow <-> Fast`)
- Matrix row labels in the 4-Matrix Evaluation table

Preserve verbatim:
- The `**Full hypothesis:**` formula line: `If we help [X] solve [Y] with [Z], they will choose us over [W] because we are [U] and [V].` — this is a template formula; translate the prose but preserve variable placeholders
- YAML-style keys are not present in SPRINT.md; no special preservation needed beyond the above

#### POSITIONING.md

Translate:
- HTML comment instructional text
- Section headings: `## Differentiation Axes`, `## 2x2 Matrix`, `### Competitor Positions`, `## Mini-Manifesto`
- Field labels: `**Axis 1 (horizontal):**`, `**Axis 2 (vertical):**`, `**Rationale:**`
- Table column headers: `Competitor`, `Axis 1 Score`, `Axis 2 Score`, `Quadrant`, `Rationale`
- ASCII matrix axis labels: `High [Axis 2]`, `High [Axis 1]`, `Low`
- Mini-Manifesto labels: `**We are [DIFFERENTIATOR 1]:**`, `**We are [DIFFERENTIATOR 2]:**`, `**We will never [SAFEGUARD]:**`
- `### Competitor Positions` subsection heading

Preserve verbatim:
- The ASCII art structure of the 2x2 matrix (arrows, spacing) — translate the word labels only
- Bracket placeholder names within the matrix (`[YOUR CO]`, `[competitor A]` etc.) — these are instructional placeholders, translate as appropriate

### Anti-Patterns to Avoid

- **Translating `* MAIN ADVERSARY`:** This marker is read by the workflow to identify the main adversary competitor. Translating it breaks the injection. The success criteria explicitly prohibit this.
- **Renaming the files:** `CONCURRENTS.md` or `HYPOTHESE.md` would silently break the Phase 7 `@`-include paths. All four files must keep their original English filenames.
- **Modifying the English source templates:** Phase 6 creates new files only — no edits to the originals.
- **Creating files at wrong path:** Files must be at `get-your-shit-together/templates/fr/`, not at a project-root `templates/fr/` or at a system-level path. The `bin/` install path resolves to `~/.claude/get-your-shit-together/` — the `fr/` subfolder must be nested correctly.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Translation quality | Custom translation script | Direct human/AI authoring | No runtime tooling exists in this project; translation is a one-time authoring act |
| File creation | Shell script | Direct Write operations | Four static files; scripting adds no value |

**Key insight:** This phase has no technical complexity. The only domain knowledge required is (a) knowing which strings to translate and (b) knowing which strings to preserve. Both are catalogued above.

---

## Common Pitfalls

### Pitfall 1: Translating `* MAIN ADVERSARY`

**What goes wrong:** The workflow uses the literal string `* MAIN ADVERSARY` as a structured marker to identify the flagged competitor. If translated (e.g., `* ADVERSAIRE PRINCIPAL`), the workflow cannot match it.
**Why it happens:** It looks like natural-language text in the template.
**How to avoid:** Leave `* MAIN ADVERSARY` byte-for-byte identical to the English source.
**Warning signs:** Any French text following a `*` on a heading line in COMPETITORS.md.

### Pitfall 2: Wrong directory path

**What goes wrong:** Files created at `templates/fr/` at the project root rather than at `get-your-shit-together/templates/fr/`.
**Why it happens:** The project root has no `templates/` directory but one might be created by mistake.
**How to avoid:** Verify path by checking that `get-your-shit-together/templates/COMPETITORS.md` exists alongside `fr/COMPETITORS.md`.
**Warning signs:** `ls get-your-shit-together/templates/fr/` fails while `ls templates/fr/` succeeds.

### Pitfall 3: French filename variants

**What goes wrong:** Files named `CONCURRENTS.md`, `HYPOTHESE.md`, or `SPRINT-fr.md` — any deviation from the exact English filenames.
**Why it happens:** Natural impulse to make French filenames.
**How to avoid:** LANG-04 success criterion 4 is explicit. Use exactly: `COMPETITORS.md`, `HYPOTHESIS.md`, `SPRINT.md`, `POSITIONING.md`.
**Warning signs:** Any `fr/` file whose name differs from the four English originals.

### Pitfall 4: Partial translation (missed strings)

**What goes wrong:** HTML comment text left in English, or table column headers left untranslated.
**Why it happens:** HTML comments are visually subtle; easy to skim past them.
**How to avoid:** Treat HTML comment instructional text as user-facing (Claude reads it during sprint execution). Translate all text inside `<!-- ... -->` blocks.
**Warning signs:** English words visible when the template is opened or when Claude reads it in a French sprint session.

### Pitfall 5: YAML key preservation scope creep

**What goes wrong:** Treating `* MAIN ADVERSARY` preservation as a signal to also leave other field labels untranslated (e.g., `**Type:**`, `**What they do:**`).
**Why it happens:** Misreading the success criteria.
**How to avoid:** The success criteria say "YAML structural keys" — only `* MAIN ADVERSARY` is the machine-readable marker in COMPETITORS.md. All other field labels are translatable prose.
**Warning signs:** Large swaths of English labels in an otherwise French template.

---

## Code Examples

### Example: COMPETITORS.md fr/ structure (key preserved marker)

```markdown
### [Nom du Concurrent 1] * MAIN ADVERSARY

**Type :** Direct / Indirect

**Ce qu'ils font :**
[Description spécifique de leur produit/service...]

**Modèle tarifaire :**
[Gratuit / Freemium / Abonnement (X€/mois) / ...]

**Points forts connus :**
- [force 1]

**Points faibles connus :**
- [faiblesse 1]

**Signaux de positionnement :**
[Comment ils se positionnent...]

**Sources de recherche :**
[URLs ou noms de sources]
```

Note: `* MAIN ADVERSARY` is on the same line as the heading, preserved exactly.

### Example: HYPOTHESIS.md fr/ hypothesis blockquote structure

```markdown
## L'Hypothèse

> Si nous aidons **[CLIENT CIBLE : rôle spécifique, taille d'entreprise, secteur]**
> à résoudre **[PROBLÈME : la douleur spécifique en termes concrets]**
> avec **[APPROCHE : votre méthode de solution]**,
> ils nous choisiront plutôt que **[ADVERSAIRE PRINCIPAL : le concurrent qui capte ce budget aujourd'hui]**
> parce que nous sommes **[DIFFÉRENCIATEUR 1 : du mini-manifeste]** et **[DIFFÉRENCIATEUR 2 : du mini-manifeste]**.
```

The bracket-label format is preserved; the prose words inside brackets are translated.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Runtime translation (on-the-fly) | Pre-translated standalone files | Defined at project start | Eliminates mid-session language drift |
| Single global templates dir | Language-namespaced subdirs (`templates/fr/`) | Phase 6 | Allows per-language templates without file naming collisions |

**Deprecated/outdated:**
- Runtime translation: explicitly ruled out in REQUIREMENTS.md Out of Scope table — not a valid fallback for Phase 6.

---

## Open Questions

1. **File title headings: translate or leave as-is?**
   - What we know: The H1 of each English template is `# COMPETITORS.md`, `# HYPOTHESIS.md`, etc. — these are filename-as-title headings, not descriptive prose.
   - What's unclear: Whether to translate them (e.g., `# COMPETITORS.md` stays unchanged since it IS the filename) or replace with French titles (e.g., `# Concurrents`).
   - Recommendation: Leave the H1 titles as-is (they are filenames), or use neutral French descriptions. The planner should make an explicit call and the plan task should record it. Either choice is correct — consistency with the English approach (where H1 = filename) suggests leaving unchanged.

2. **`Direct / Indirect` enumeration values in COMPETITORS.md**
   - What we know: The English template uses `Direct / Indirect` as value options for the `**Type:**` field. These are presentational, not machine-parsed.
   - What's unclear: Whether Phase 7's French workflow will output `Direct / Indirect` (English) or `Direct / Indirect` equivalents in French when filling the template.
   - Recommendation: Translate to `Directe / Indirecte` in the French template. If Phase 7 workflow produces French content it should match the French template. Note this as a known cross-phase dependency in the plan.

3. **Axis label translation in SPRINT.md bipolar ratings table**
   - What we know: The Bipolar Axis Ratings table has axes like `Slow <-> Fast`, `Hard <-> Easy`, etc. STATE.md flags this as an open concern for Phase 7.
   - What's unclear: Whether Phase 6 should translate the axis labels in the SPRINT.md template, or leave them for Phase 7 to decide.
   - Recommendation: Translate them in Phase 6 (they are user-visible structural text). The Phase 7 workflow translation must then match what Phase 6 puts in the template. Document the chosen French axis labels explicitly in the plan task so Phase 7 can mirror them.

---

## Sources

### Primary (HIGH confidence)

- Direct file read: `get-your-shit-together/templates/COMPETITORS.md` — full content inspected
- Direct file read: `get-your-shit-together/templates/HYPOTHESIS.md` — full content inspected
- Direct file read: `get-your-shit-together/templates/SPRINT.md` — full content inspected
- Direct file read: `get-your-shit-together/templates/POSITIONING.md` — full content inspected
- Direct file read: `.planning/REQUIREMENTS.md` — LANG-04 requirement text confirmed
- Direct file read: `.planning/ROADMAP.md` — Phase 6 success criteria confirmed
- Direct file read: `.planning/STATE.md` — architectural decisions and open concerns confirmed
- Direct file read: `get-your-shit-together/workflows/foundation-sprint.md` lines with `@templates/` — confirmed target path pattern for Phase 7

### Secondary (MEDIUM confidence)

- None — no external sources needed. This phase is internal file authoring.

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no libraries involved; purely static file authoring
- Architecture: HIGH — directory structure confirmed from source files and workflow @-include paths
- Pitfalls: HIGH — all pitfalls derived from direct reading of requirements and source templates, not speculation
- Translation strings: HIGH — derived from exhaustive read of all four source files

**Research date:** 2026-03-08
**Valid until:** 2026-04-07 (30 days — this domain is stable; templates do not change unless English originals change)
