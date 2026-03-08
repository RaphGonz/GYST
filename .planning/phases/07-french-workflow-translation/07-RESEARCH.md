# Phase 7: French Workflow Translation - Research

**Researched:** 2026-03-08
**Domain:** Markdown workflow authoring — French translation of a 1,268-line Claude workflow file
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LANG-05 | A complete pre-translated French workflow exists (`foundation-sprint-french.md`) — all user-facing text in French using consistent "vous" register; all 20 section `name=` identifiers preserved in English; strong French-language directive at top to prevent language drift; per-section French reinforcements before WebSearch-heavy sections | English workflow fully read; all 20 section identifiers catalogued; WebSearch-heavy sections identified; language drift mitigation patterns researched from prior phase decisions |
| LANG-06 | The French workflow references `templates/fr/` paths and produces French output files (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md all in French) | All 4 `@` template references in the English workflow identified; target `fr/` paths known; French templates confirmed to exist at `get-your-shit-together/templates/fr/` |
| LANG-07 | A `TRANSLATION-SYNC.md` file records the English source commit hash so future English updates can be tracked and synced to the French version | Current HEAD commit hash recorded: `97e468e21a184026db29b8f25aa54d8b5a185ab7` (the commit at time of translation authoring); format pattern documented below |
</phase_requirements>

---

## Summary

Phase 7 delivers a single 1,268-line Markdown file: `foundation-sprint-french.md`. This file is a complete French translation of `get-your-shit-together/workflows/foundation-sprint.md`. No libraries, tooling, or build steps are involved — this phase is pure content authoring. The translation strategy is identical to Phase 6: mirror the English structure exactly, translate all user-facing prose to French, and preserve machine-readable identifiers verbatim.

The English workflow has 20 named sections (confirmed by direct grep), four banner blocks, one `<objective>` block, and one `<onboarding>` block. It also contains four `@` template references that must be repointed from `templates/` to `templates/fr/`. Two sections invoke WebSearch (`section_problem` at line 179, `section_competitors_research` at line 363) — these require per-section French-language reinforcement directives placed immediately before the section content. The `section_approach_generation`, `section_advantages`, and `section_manifesto` sections are the three named in STATE.md as HIGH-complexity translation targets requiring native speaker review.

The deliverables are: (1) `get-your-shit-together/workflows/foundation-sprint-french.md`, and (2) `TRANSLATION-SYNC.md` at the project root recording the English source commit hash `97e468e21a184026db29b8f25aa54d8b5a185ab7`.

**Primary recommendation:** Translate the workflow section by section, in document order, preserving all XML tags, `name=` attributes, and structural delimiters byte-for-byte, while translating all natural-language prose to French in the "vous" register.

---

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown | N/A | File format for the French workflow | Same format as the English workflow; Claude reads it via the `Read` tool call in the command file |
| Manual French translation | N/A | Translate all user-facing prose | Pre-translation is the project's mandated reliability strategy — runtime translation causes language drift (explicitly out of scope in REQUIREMENTS.md) |

### Supporting

No libraries, npm packages, or build tooling required. This phase is static file creation only.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual translation | Runtime AI translation | Runtime translation causes language drift mid-session — explicitly ruled out in REQUIREMENTS.md Out of Scope table |
| One-file approach | Split by step into multiple files | Multi-file would require command routing changes; single file is what the command file expects at `foundation-sprint-french.md` |

**Installation:** None.

---

## Architecture Patterns

### Target File Location

```
get-your-shit-together/
└── workflows/
    ├── foundation-sprint.md          # English source (unchanged)
    └── foundation-sprint-french.md   # French translation (Phase 7 deliverable)

get-your-shit-together/
└── templates/
    ├── COMPETITORS.md                # English templates (unchanged)
    ├── HYPOTHESIS.md
    ├── SPRINT.md
    ├── POSITIONING.md
    └── fr/                           # Phase 6 deliverables (already exist)
        ├── COMPETITORS.md
        ├── HYPOTHESIS.md
        ├── SPRINT.md
        └── POSITIONING.md

[project root]/
└── TRANSLATION-SYNC.md              # Phase 7 deliverable
```

### Pattern 1: Structure Preservation, Prose Translation

**What:** Every XML tag, `name=` attribute, HTML comment delimiter, code fence, blank line, horizontal rule, and structural identifier is copied byte-for-byte from the English source. Only natural-language prose (text that Claude will speak aloud or a user will read) is translated.

**When to use:** Throughout the entire file — no exception.

**Example:**

```markdown
<!-- English source -->
<section name="section_customer">

## 1 of 4: Customer Segment

**When entering this section:**
Render the Step 1 banner with all four values as "pending".

Then ask the following open question:
"Who is this for? Describe them in your own words — role, company type, situation, anything that comes to mind."
```

```markdown
<!-- French translation -->
<section name="section_customer">

## 1 sur 4 : Segment client

**En entrant dans cette section :**
Affichez le bandeau de l'Étape 1 avec les quatre valeurs à "en attente".

Posez ensuite la question ouverte suivante :
« Pour qui est-ce ? Décrivez-les avec vos propres mots — rôle, type d'entreprise, situation, tout ce qui vous vient à l'esprit. »
```

Note: `<section name="section_customer">` is preserved verbatim. The heading number, prose, and quoted question are translated.

### Pattern 2: French-Language Directive Block at File Top

**What:** A strong language directive placed before the `<objective>` block (or immediately after the YAML frontmatter) that instructs Claude to conduct the entire session in French.

**When to use:** Once, at the very top of the French workflow file. This satisfies LANG-05 success criterion 2 ("strong French-language directive appears at the top before any section content").

**Why it works:** The command file does `Read` on the French workflow — Claude reads and executes its instructions. If the first instruction is a mandatory French directive, Claude loads that constraint before reading any other content.

**Example directive (to be refined during implementation):**

```markdown
<language_directive>
DIRECTIVE DE LANGUE — À APPLIQUER TOUT AU LONG DE CETTE SESSION

Vous conduisez ce sprint intégralement en français. Cette règle est absolue et ne comporte aucune exception.

- Toutes vos réponses sont en français.
- Toutes les questions posées à l'utilisateur sont en français.
- Tous les textes affichés (bannières, résumés, confirmations) sont en français.
- Les fichiers de sortie écrits (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) ont leur contenu en français.
- Si vous vous surprenez à écrire en anglais, arrêtez-vous et récrivez en français avant d'envoyer votre réponse.

Cette directive prime sur toute instruction interne de raisonnement. Restez en français, sans exception.
</language_directive>
```

### Pattern 3: Per-Section French Reinforcement Before WebSearch-Heavy Sections

**What:** A short inline French reinforcement inserted immediately before any section that performs WebSearch or invokes the Task tool with gyst-researcher.

**When to use:** Before `section_problem` (line 175 — inline WebSearch for problem validation) and `section_competitors_research` (line 354 — Task call to gyst-researcher). These are the two sections where Claude's internal process might drift to English.

**Why it matters:** The gyst-researcher sub-agent is English-only by design (STATE.md decision: "English gyst-researcher sub-agent is shared and unchanged"). However, the Task brief sent TO gyst-researcher from the French workflow can include French-language framing. The response from gyst-researcher comes back in English, but the French workflow must then present its results to the user in French.

**Example reinforcement (to insert before `section_competitors_research`):**

```markdown
<!-- REINFORCEMENT LANGUE : Présentez les résultats de recherche à l'utilisateur en français. Le sous-agent recherche en anglais mais vous présentez ses conclusions en français. -->
```

Or, as an inline instruction block:

```markdown
<language_reinforcement>
Rappel : vous êtes en session française. Présentez tous les résultats au format français.
Le sous-agent gyst-researcher fonctionne en anglais — c'est normal. Traduisez et présentez ses résultats en français.
</language_reinforcement>
```

### Pattern 4: @ Template Path Replacement

**What:** All four `@` template references are updated from `templates/` to `templates/fr/`.

**When to use:** During translation of `write_competitors_md` and `section_write_outputs`.

**Full replacement map:**

| English path | French path |
|-------------|-------------|
| `@~/.claude/get-your-shit-together/templates/COMPETITORS.md` | `@~/.claude/get-your-shit-together/templates/fr/COMPETITORS.md` |
| `@./COMPETITORS.md` | `@./COMPETITORS.md` (unchanged — this reads the output file, not the template) |
| `@~/.claude/get-your-shit-together/templates/HYPOTHESIS.md` | `@~/.claude/get-your-shit-together/templates/fr/HYPOTHESIS.md` |
| `@~/.claude/get-your-shit-together/templates/SPRINT.md` | `@~/.claude/get-your-shit-together/templates/fr/SPRINT.md` |
| `@~/.claude/get-your-shit-together/templates/POSITIONING.md` | `@~/.claude/get-your-shit-together/templates/fr/POSITIONING.md` |

Note: The `@./COMPETITORS.md` reference at line 681 reads the written output file (not the template) — it stays unchanged because the output file is always named `COMPETITORS.md` regardless of language.

### Pattern 5: TRANSLATION-SYNC.md Format

**What:** A Markdown file at the project root recording the English source commit from which the French translation was derived.

**When to use:** Created as a standalone task — written after the French workflow file is complete.

**Format:**

```markdown
# TRANSLATION-SYNC.md

## French Workflow Translation Record

| Field | Value |
|-------|-------|
| French file | `get-your-shit-together/workflows/foundation-sprint-french.md` |
| English source | `get-your-shit-together/workflows/foundation-sprint.md` |
| English source commit | `97e468e21a184026db29b8f25aa54d8b5a185ab7` |
| Translation date | 2026-03-08 |
| Translated by | Claude (Phase 7) |

## How to Use This Record

When the English workflow (`foundation-sprint.md`) is updated, run:

```bash
git diff 97e468e21a184026db29b8f25aa54d8b5a185ab7 HEAD -- get-your-shit-together/workflows/foundation-sprint.md
```

This shows every change made to the English source since the French translation was created. Apply equivalent changes to `foundation-sprint-french.md`, then update the commit hash above.

## Sections Flagged for Native Speaker Review

The following sections involve complex French prose and should be reviewed by a native French speaker before shipping:

- `section_advantages` — Capacity, Insight, and Motivation dimension explanations
- `section_manifesto` — Mini-manifesto examples and evaluation criteria
- `section_approach_generation` — Approach generation and filtering logic
```

### The Complete Section Inventory (All 20 Sections)

Confirmed from direct grep of English source. All `name=` values must appear byte-for-byte identical in the French workflow:

| # | Section name= | Brief description | Translation complexity |
|---|---------------|-------------------|----------------------|
| 1 | `section_customer` | Customer segment open question + locking | LOW |
| 2 | `section_problem` | Problem framing + WebSearch validation | MEDIUM (WebSearch reinforcement needed) |
| 3 | `section_advantages` | Capacity/Insight/Motivation 3-loop | HIGH (complex examples, nuanced criteria) |
| 4 | `section_competitors` | Initial competitors question | LOW |
| 5 | `section_competitors_research` | Task call to gyst-researcher | MEDIUM (Task brief language, results presentation) |
| 6 | `section_main_adversary` | Main adversary selection | LOW |
| 7 | `write_competitors_md` | Write COMPETITORS.md (@ path must change) | LOW (structural, path replacement) |
| 8 | `navigation_controls` | Step 1 navigation A/B/C | LOW |
| 9 | `section_axis_rating` | 8 bipolar axes rating | MEDIUM (axis label canonical French strings) |
| 10 | `section_custom_axes` | Propose 1-2 domain-specific axes | LOW |
| 11 | `section_axis_selection` | Choose X and Y differentiating axes | LOW |
| 12 | `section_competitor_scoring` | Score competitors on axes | LOW |
| 13 | `section_matrix_render` | Render 2x2 ASCII matrix | LOW |
| 14 | `section_manifesto` | Write mini-manifesto | HIGH (examples, evaluation criteria) |
| 15 | `section_step2_navigation` | Step 2 summary and A/B navigation | LOW |
| 16 | `section_context_reload` | Context reload at Step 3 entry | LOW |
| 17 | `section_approach_generation` | Sharpen + generate approaches | HIGH (filtering logic, probe questions) |
| 18 | `section_approach_evaluation` | 4-matrix evaluation | MEDIUM (matrix names, dimension definitions) |
| 19 | `section_approach_recommendation` | Global pattern recommendation | LOW |
| 20 | `section_hypothesis` | Final hypothesis construction | LOW |

Plus non-section structural blocks: `<objective>`, `<onboarding>`, `<step1_banner>`, `<step2_banner>`, `<step3_banner>`, `<step4_banner>`, `<section name="section_testable_form">`, `<section name="section_write_outputs">`.

Wait — `section_testable_form` and `section_write_outputs` are also named sections. The grep confirmed 20 section name= tags. Let me reconcile: the grep output shows 20 entries including `section_testable_form` and `section_write_outputs`. The inventory table above covers 20 sections (sections 1-15 from Step 1/2 plus sections 16-20 from Step 3/4, with testable_form and write_outputs as the last two of the 20).

Corrected final section count from grep:

```
section_customer, section_problem, section_advantages, section_competitors,
section_competitors_research, section_main_adversary, write_competitors_md,
navigation_controls, section_axis_rating, section_custom_axes,
section_axis_selection, section_competitor_scoring, section_matrix_render,
section_manifesto, section_step2_navigation, section_context_reload,
section_approach_generation, section_approach_evaluation,
section_approach_recommendation, section_hypothesis,
section_testable_form, section_write_outputs
```

That is 22 distinct `<section name=` tags. The grep showed 22 lines. The LANG-05 requirement says "all 20 original section `name=` identifiers" — this may refer to a count from an earlier document or a different enumeration. The planner should verify the exact count by running `grep -c '<section name=' foundation-sprint.md` against the English source and use whatever that returns as the authoritative count to validate against.

### Canonical French Axis Labels (from STATE.md — LOCKED)

These exact strings were established in Phase 6 (06-01 verification, human-approved):

| English axis | French axis |
|-------------|-------------|
| Slow / Fast | Lent / Rapide |
| Hard / Easy | Difficile / Facile |
| Expensive / Free | Cher / Gratuit |
| Complex / Simple | Complexe / Simple |
| Dumb / Smart | Basique / Intelligent |
| Siloed / Integrated | Cloisonné / Intégré |
| Manual / Automatic | Manuel / Automatique |

The 8th axis in the English workflow is `Narrow / Broad` — this does NOT appear in the Phase 6 canonical list. The planner must decide its French equivalent. Recommendation: `Étroit / Large` (standard French equivalents). This is the only axis without a locked French canonical.

### Anti-Patterns to Avoid

- **Translating `name=` attribute values:** `<section name="section_customer">` must never become `<section name="segment_client">`. The command file references no `name=` values, but LANG-05 success criterion 1 requires byte-for-byte match against the English source.
- **Translating XML tag names:** `<objective>`, `<onboarding>`, `<step1_banner>`, etc. must remain in English.
- **Translating the YAML frontmatter field names:** `name:`, `description:`, `version:` stay in English; only their values may be translated (e.g., `description:` value can be French).
- **Repointing `@./COMPETITORS.md`:** This reference (line 681) reads the project-output file, not the template — it stays unchanged.
- **Running gyst-researcher in French:** STATE.md decision is explicit: "English gyst-researcher sub-agent is shared and unchanged." The Task brief can include French context but the sub-agent uses English for web searches.
- **Missing the `* MAIN ADVERSARY` marker:** The French workflow's `write_competitors_md` section must still instruct Claude to write `* MAIN ADVERSARY` verbatim (it's a machine-readable marker in the template, per Phase 6 decisions).
- **"Vous" vs "Tu" register inconsistency:** The "vous" register was locked as the project standard. All direct address to the user must use "vous" throughout the file, including in all quoted questions.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Translation quality assurance | Custom diff script | Direct read + human comparison | Four-step manual verification is sufficient for a one-time translation |
| File creation | Shell script or template engine | Direct Write operation | Single static file; no runtime parameterization needed |
| Language detection | Runtime flag parsing | Already done in Phase 5 command file | Command file routes to `foundation-sprint-french.md` — the French file just needs to exist |

**Key insight:** This phase has no technical complexity. It is entirely authoring work. The only domain knowledge required is (a) which structural identifiers must be preserved verbatim, (b) which sections need special treatment (WebSearch, high complexity), and (c) the canonical French axis labels from STATE.md.

---

## Common Pitfalls

### Pitfall 1: Translating XML Tag Names or `name=` Attribute Values

**What goes wrong:** `<section name="section_competitors">` becomes `<section name="section_concurrents">` or `<competitors>`. The LANG-05 success criterion 1 explicitly requires byte-for-byte match of all section `name=` identifiers.
**Why it happens:** Natural impulse during translation is to translate everything that looks like text.
**How to avoid:** Treat all XML/HTML structural markup as code, not prose. Only translate what a human user would read or hear.
**Warning signs:** Any `name=` value that contains French words.

### Pitfall 2: Language Drift Without a Top-Level Directive

**What goes wrong:** Claude reads the French workflow, begins in French, but drifts to English mid-session — particularly during complex reasoning steps (approach generation, matrix evaluation).
**Why it happens:** Claude's training data is predominantly English; complex reasoning under pressure reverts to English.
**How to avoid:** Place a strong `<language_directive>` block before `<objective>`, and add `<language_reinforcement>` before WebSearch-heavy sections. The directive must be explicit and unambiguous ("Cette règle est absolue et ne comporte aucune exception").
**Warning signs:** English words in Claude's responses during a French session, particularly in reasoning steps or when presenting research results.

### Pitfall 3: Wrong @ Template Paths

**What goes wrong:** The French workflow still reads from `templates/COMPETITORS.md` (English template) instead of `templates/fr/COMPETITORS.md`, producing English-structured output files.
**Why it happens:** A simple copy-paste of the English workflow without auditing `@` references.
**How to avoid:** After writing the French workflow, run `grep '@' foundation-sprint-french.md` and verify each path. There should be exactly 4 `@` references: 3 pointing to `templates/fr/` and 1 pointing to `@./COMPETITORS.md` (the output file).
**Warning signs:** Any `@~/.claude/get-your-shit-together/templates/` path NOT followed by `fr/`.

### Pitfall 4: Inconsistent "Vous" Register

**What goes wrong:** Mixed "vous"/"tu" address across sections, particularly in quoted questions or banner text.
**Why it happens:** Long document, translated in chunks; register slips in later sections.
**How to avoid:** Use "vous" exclusively. Canonical question forms: "Décrivez-les...", "Quel est...", "Que souhaitez-vous...", "Êtes-vous prêt..." (not "Décris-les", "Qu'est-ce que tu...", "Tu veux...").
**Warning signs:** Any second-person singular verb form (tu, te, ton, ta, tes) in user-facing text.

### Pitfall 5: Missing the Section Count Validation

**What goes wrong:** A section `name=` is inadvertently omitted or duplicated during translation.
**Why it happens:** Manual line-by-line translation of a 1,268-line file — easy to miss or duplicate a tag.
**How to avoid:** After writing the French workflow, run `grep -c '<section name=' foundation-sprint-french.md` and compare against the English count. The counts must be identical.
**Warning signs:** Count differs from the English source count.

### Pitfall 6: Axis Label Inconsistency with Phase 6 Templates

**What goes wrong:** The French workflow outputs axis scores using different French labels than what Phase 6 baked into `templates/fr/SPRINT.md`. For example, using "Rapide/Lent" instead of "Lent/Rapide" breaks the expected order.
**Why it happens:** The canonical axis strings were established in Phase 6 — a Phase 7 translator working from memory might render them differently.
**How to avoid:** Use the canonical French axis labels exactly as documented in STATE.md and in this research document. Read `get-your-shit-together/templates/fr/SPRINT.md` before translating `section_axis_rating` to verify label format.
**Warning signs:** Axis labels in the French workflow that differ from those in `templates/fr/SPRINT.md`.

### Pitfall 7: The `* MAIN ADVERSARY` Marker Disappearing

**What goes wrong:** The `write_competitors_md` section in the French workflow instructs Claude to write `* PRINCIPAL ADVERSAIRE` or omits the marker instruction entirely.
**Why it happens:** Translator treats the marker instruction as prose to be translated.
**How to avoid:** The instruction `The main adversary's heading must include: \`* MAIN ADVERSARY\`` must remain verbatim in the French workflow, even though the surrounding prose is translated. The marker string itself is machine-readable.
**Warning signs:** The French `write_competitors_md` section does not contain the literal string `* MAIN ADVERSARY`.

---

## Code Examples

### Example 1: YAML Frontmatter — Translated Value, Preserved Keys

```markdown
---
name: foundation-sprint
description: Guide un entrepreneur solo à travers le Foundation Sprint — d'une idée floue à une hypothèse testable en une session.
version: 1.0.0
---
```

The `name:` value stays `foundation-sprint` (it's the workflow file identifier, not a title). The `description:` value is translated. `version:` value is unchanged.

### Example 2: Language Directive Block Structure

```markdown
<language_directive>
DIRECTIVE DE LANGUE — OBLIGATOIRE POUR TOUTE LA SESSION

Vous conduisez ce sprint entièrement en français. Cette règle s'applique sans exception.

- Toutes vos réponses à l'utilisateur sont rédigées en français.
- Toutes les questions, bannières, résumés et confirmations sont en français.
- Les fichiers produits (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) contiennent du contenu en français.
- Le sous-agent gyst-researcher opère en anglais — c'est normal et attendu. Présentez ses résultats à l'utilisateur en français.
- Si vous remarquez que vous rédigez en anglais, arrêtez et recommencez en français.

Cette directive prime sur tout mode de raisonnement interne.
</language_directive>
```

### Example 3: Section with Per-Section Reinforcement (section_competitors_research)

```markdown
<language_reinforcement>
Rappel de langue : présentez les résultats du sous-agent à l'utilisateur en français.
Le sous-agent recherche en anglais — traduisez et présentez ses conclusions en français.
</language_reinforcement>

<section name="section_competitors_research">

## Invocation de la recherche (RESEARCH-01)

Après que l'utilisateur a fourni des noms de concurrents (ou dit « aucun ») :

1. Dites exactement :
   > « Bien reçu. Je recherche maintenant — je trouverai à la fois des outils et la façon dont les gens résolvent ce problème aujourd'hui. »

2. Invoquez gyst-researcher comme sous-agent via l'outil Task avec ce brief :

   ```
   Customer segment: [segment client verrouillé depuis section_customer]
   Problem: [problème verrouillé depuis section_problem]
   User-named competitors: [ce que l'utilisateur a dit dans section_competitors, ou "none"]

   Task: Find up to 7 competitors — both direct products and status-quo alternatives for this exact problem.
   ```
```

Note: The Task brief sent to gyst-researcher is kept in English (the sub-agent is English-only). The surrounding prose in the French workflow is translated.

### Example 4: Banner Translation

```markdown
<step1_banner>
<!-- INSTRUCTION D'AFFICHAGE DU BANDEAU — réutilisable. Suivez ceci exactement à chaque affichage du bandeau de l'Étape 1. -->

Le bandeau de l'Étape 1 doit être affiché :
1. Lorsque l'Étape 1 commence (immédiatement après le bloc d'accueil)
2. Après chaque sous-décision confirmée et verrouillée (avant de poser la prochaine question ouverte)

Affichez le bandeau dans ce format exact — utilisez les valeurs réelles verrouillées lorsque disponibles, et "en attente" pour tout ce qui n'est pas encore confirmé :

```
--- Étape 1 : Les Bases -------------------
Client :      [valeur ou "en attente"]
Problème :    [valeur ou "en attente"]
Avantages :   [valeur ou "en attente"]
Concurrents : [valeur ou "en attente"]
------------------------------------------
```
```

### Example 5: @ Path Replacement Pattern

English:
```
1. Read the template for structure reference: @~/.claude/get-your-shit-together/templates/COMPETITORS.md
```

French:
```
1. Lisez le modèle pour référence structurelle : @~/.claude/get-your-shit-together/templates/fr/COMPETITORS.md
```

### Example 6: TRANSLATION-SYNC.md Structure

```markdown
# TRANSLATION-SYNC.md

## Enregistrement de la traduction française

| Champ | Valeur |
|-------|--------|
| Fichier français | `get-your-shit-together/workflows/foundation-sprint-french.md` |
| Source anglaise | `get-your-shit-together/workflows/foundation-sprint.md` |
| Commit source anglais | `97e468e21a184026db29b8f25aa54d8b5a185ab7` |
| Date de traduction | 2026-03-08 |
| Traduit par | Claude (Phase 7) |

## Comment utiliser cet enregistrement

Quand le workflow anglais (`foundation-sprint.md`) est mis à jour, exécutez :

```bash
git diff 97e468e21a184026db29b8f25aa54d8b5a185ab7 HEAD -- get-your-shit-together/workflows/foundation-sprint.md
```

Cela affiche chaque modification apportée à la source anglaise depuis la création de la traduction française.
Appliquez les modifications équivalentes à `foundation-sprint-french.md`, puis mettez à jour le hash de commit ci-dessus.

## Sections signalées pour révision par un locuteur natif

- `section_advantages` — explications des dimensions Capacité, Perspicacité, Motivation
- `section_manifesto` — exemples de mini-manifeste et critères d'évaluation
- `section_approach_generation` — logique de génération et de filtrage des approches
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Runtime translation on-the-fly | Pre-translated standalone workflow file | Defined at project start | Eliminates mid-session language drift — the single most critical reliability improvement |
| Single global workflow | Language-namespaced workflow files (`foundation-sprint-french.md`) | Phase 5 | Extensible — future languages add a new file, zero command changes needed |
| No translation tracking | TRANSLATION-SYNC.md commit hash record | Phase 7 | Future English updates can be diffed and applied to the French version |

**Deprecated/outdated:**
- Runtime translation: explicitly ruled out in REQUIREMENTS.md Out of Scope table.
- Separate French command (`/gyst:fondation-sprint`): ruled out by REQUIREMENTS.md — argument-based routing from single command is the design.

---

## Open Questions

1. **Exact section count: 20 or 22?**
   - What we know: LANG-05 says "all 20 original section `name=` identifiers". The grep of the English workflow returns 22 lines matching `<section name=`. The discrepancy may be due to the requirement being written before the final two sections (`section_testable_form`, `section_write_outputs`) were added in Phase 4 commit `8c4d286`.
   - What's unclear: Whether "20" in LANG-05 is a stale count or an intentional exclusion.
   - Recommendation: Run `grep -c '<section name=' get-your-shit-together/workflows/foundation-sprint.md` in the plan task to get the authoritative count, use that number as the validation target, and note the discrepancy in a comment. The requirement intent is clearly "all section identifiers preserved" regardless of count.

2. **The 8th bipolar axis (`Narrow / Broad`) has no locked French canonical**
   - What we know: STATE.md records 7 canonical French axis pairs (Lent/Rapide, Difficile/Facile, Cher/Gratuit, Complexe/Simple, Basique/Intelligent, Cloisonné/Intégré, Manuel/Automatique). The English 8th axis is `Narrow ←→ Broad`.
   - What's unclear: Whether Phase 6 templates included a French equivalent for this axis or left it out (the SPRINT.md template includes the axis table).
   - Recommendation: Read `get-your-shit-together/templates/fr/SPRINT.md` at plan execution time to see how Phase 6 rendered this axis, then match it in the French workflow. If Phase 6 used `Étroit / Large`, use that. If Phase 6 omitted it, use `Étroit / Large` as the canonical.

3. **TRANSLATION-SYNC.md placement: project root or inside `get-your-shit-together/`?**
   - What we know: LANG-07 says `TRANSLATION-SYNC.md` exists "on disk" — no specific path given.
   - What's unclear: Whether it belongs at the GYST project root (`C:/Users/raphg/Desktop/GYST/`) or inside `get-your-shit-together/`.
   - Recommendation: Place at the GYST project root (alongside `.planning/`, `commands/`, `get-your-shit-together/`). This makes it a project-level metadata file, not a component-level file. If the planner prefers `get-your-shit-together/TRANSLATION-SYNC.md`, that is also valid — pick one and document.

4. **Task brief language for gyst-researcher: translate the intro or keep English-only?**
   - What we know: The English workflow sends the Task brief entirely in English. STATE.md says "English gyst-researcher sub-agent is shared and unchanged". The sub-agent only supports English search strategies.
   - What's unclear: Whether the French workflow should add French context to the brief (e.g., "Note: This sprint is in French; present results to the user in French") or keep the brief identical to the English version.
   - Recommendation: Keep the Task brief in English — it is an instruction to the sub-agent, not user-facing prose. Add the French presentation instruction as a `<language_reinforcement>` block in the French workflow AFTER the Task call instruction, instructing Claude to translate/present the results in French.

---

## Sources

### Primary (HIGH confidence)

- Direct file read: `get-your-shit-together/workflows/foundation-sprint.md` — full content read; all 22 section names catalogued; all 4 `@` references identified; WebSearch invocation points confirmed at lines 179 and 363
- Direct file read: `.planning/REQUIREMENTS.md` — LANG-05, LANG-06, LANG-07 requirement text confirmed
- Direct file read: `.planning/STATE.md` — architectural decisions confirmed: "vous" register, English gyst-researcher unchanged, axis canonical strings, complexity flags for three HIGH sections
- Direct file read: `.planning/phases/06-french-output-templates/06-RESEARCH.md` — canonical French axis labels confirmed from 06-01 decisions; `* MAIN ADVERSARY` preservation requirement confirmed; template path pattern `templates/fr/` confirmed
- Direct file read: `get-your-shit-together/agents/gyst-researcher.md` — English-only sub-agent confirmed; Task brief format confirmed
- Direct file read: `commands/gyst/foundation-sprint.md` — routing logic confirmed; target path `foundation-sprint-french.md` confirmed; location `~/.claude/get-your-shit-together/workflows/`
- `git rev-parse HEAD` — English source commit hash at translation time: `97e468e21a184026db29b8f25aa54d8b5a185ab7`
- `ls get-your-shit-together/templates/fr/` — confirmed all four Phase 6 French templates exist

### Secondary (MEDIUM confidence)

- None required — all findings derived from direct file inspection.

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no libraries involved; purely static file authoring
- Architecture: HIGH — file structure, paths, and section identifiers confirmed from direct source reads
- Pitfalls: HIGH — all pitfalls derived from direct reading of requirements, STATE.md decisions, and source workflow structure
- Translation inventory: HIGH — all sections confirmed by grep; WebSearch sections confirmed by line number inspection
- Axis canonicals: HIGH — locked in STATE.md from Phase 6 human verification; 7 of 8 confirmed; 8th needs template read at plan time

**Research date:** 2026-03-08
**Valid until:** 2026-04-07 (30 days — English workflow is stable; templates do not change unless English originals change)
