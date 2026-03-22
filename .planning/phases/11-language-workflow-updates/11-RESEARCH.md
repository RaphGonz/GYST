# Phase 11: Language Workflow Updates - Research

**Researched:** 2026-03-22
**Domain:** Workflow translation / sync — French, Japanese, Portuguese foundation sprint files
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TRNS-02 | All new/modified workflow sections translated into French, Japanese, and Portuguese workflow files | Full diff analysis of all 7 commits from Phases 8–9; exact sections, insertion points, and terminology register documented below |
| TRNS-03 | TRANSLATION-SYNC.md updated with new English source commit hash after all translations complete | Current HEAD hash identified: `b4c1af63a1f4fb6976a640ec8f97401ca3e57293`; update mechanics documented below |
</phase_requirements>

---

## Summary

Phases 8 and 9 added 274 lines and modified 13 lines across the English workflow (`foundation-sprint.md`). The changes introduced four new `<section>` blocks, modified three existing sections, and changed the onboarding/output count from 3 to 4 files. None of these changes have been applied to the French, Japanese, or Portuguese workflows — all three are still at their original Phase 7 state.

The translation work for Phase 11 is a surgical sync operation: insert four new sections at the correct positions, update three existing sections with targeted modifications, and finally update TRANSLATION-SYNC.md with the new English source commit hash. The 5PM-TERMINOLOGY-REGISTER.md (created in Phase 10) is the authoritative term source for all translated content.

**Primary recommendation:** Work through each language workflow file sequentially. For each file: (1) insert four new sections in the exact structural positions shown below, (2) apply targeted modifications to three existing sections, (3) update onboarding and language_directive references from 3 to 4 output files. After all three workflow files are updated, update TRANSLATION-SYNC.md.

---

## Standard Stack

### What Changed in Phases 8–9 (English Source)

The diff between commit `97e468e` (French translation baseline) and HEAD covers 7 commits:

| Commit | What Was Added/Changed |
|--------|----------------------|
| `a2c773b` | New section: `section_purchaser` (inserted between `section_customer` and `section_problem`) |
| `9e7745c` | New section: `section_problem_importance` (inserted between `section_problem` and `section_advantages`) |
| `26e032d` | Modified: `navigation_controls` — DISCARD RULE expanded to include 7 sub-decisions; NAVIG-02 question updated |
| `7866cf6` | New section: `section_market_sizing` (inserted between `write_competitors_md` and `navigation_controls`) |
| `bf34ba9` | New section: `section_founder_fit` (inserted between `section_context_reload` and `section_approach_generation`); `section_approach_evaluation` title changed to "5-Matrix Evaluation" and Matrix 5 added; `section_approach_recommendation` updated to reference "all 4 matrices" and capture `scorecard_chosen_approach` |
| `e61204d` | Modified: `section_approach_recommendation` — added `scorecard_chosen_approach` field capture before banner re-render |
| `1a10d83` | Modified: `section_write_outputs` — 4th output file (5PM-SCORECARD.md) added; output count changed from 3 to 4 |

### Sections Missing from All Three Language Workflows

Comparison of `section name=` identifiers between English and each language workflow confirms all three are missing the same four sections:

| Missing Section | English Line | Insertion Point |
|----------------|-------------|-----------------|
| `section_purchaser` | After `section_customer`, before `section_problem` | After the customer lock block, before the language_reinforcement block that precedes `section_problem` |
| `section_problem_importance` | After `section_problem`, before `section_advantages` | After the problem lock block (end of `section_problem`), before `section_advantages` |
| `section_market_sizing` | After `write_competitors_md`, before `navigation_controls` | After the COMPETITORS.md write block, before navigation_controls |
| `section_founder_fit` | After `section_context_reload`, before `section_approach_generation` | After Step 3 context reload, before approach generation |

### Modified Sections in All Three Language Workflows

Three existing translated sections need targeted updates:

| Section | What Changed in English | What to Update in Translations |
|---------|------------------------|-------------------------------|
| `navigation_controls` | NAVIG-02 sub-decision list expanded from 4 to 7 items; discard examples expanded from 4 to 7 with scorecard_* field names | Add Purchaser, Problem I/U, Market sizing to the sub-decision question; add 7 discard examples matching English; update "start over" wipe list to include all scorecard_* fields |
| `section_approach_evaluation` | Title changed to "5-Matrix Evaluation (SPRINT-13)"; Matrix 5 (Pain to Validate) added after Matrix 4; `scorecard_pain_matrix` field capture added | Update section heading; add Matrix 5 block after Matrix 4; change "proceed immediately to section_approach_recommendation" to "proceed to Matrix 5 below"; add scorecard_pain_matrix field capture |
| `section_write_outputs` | 4th file (5PM-SCORECARD.md) added; output count changed from 3 to 4; scorecard assembly logic added | Add "4. Write 5PM-SCORECARD.md" block using language-specific template path; update "3 files" to "4 files" in all prose; add 5PM-SCORECARD.md to the written-files list |

### Additional Surface: Onboarding and Language Directives

The `<onboarding>` block and `<language_directive>` in all three workflows reference only 3 output files. These need updating to include `5PM-SCORECARD.md`.

| Location | Current Text | Required Change |
|----------|-------------|-----------------|
| `<onboarding>` output list | Lists 3 files (COMPETITORS.md, HYPOTHESIS.md, SPRINT.md, POSITIONING.md) | Add `5PM-SCORECARD.md` with language-specific description |
| `<language_directive>` output files list | Lists COMPETITORS.md, SPRINT.md, HYPOTHESIS.md, POSITIONING.md | Add 5PM-SCORECARD.md |
| Step 3 description in objective | References "4-matrix evaluation" | Update to "5-matrix evaluation" |

---

## Architecture Patterns

### Structural Position Map (All Three Language Workflows)

The four new sections must be inserted at these exact structural positions:

```
[Current Structure]               [Phase 11 Structure]
section_customer                  section_customer
  (language_reinforcement)          (language_reinforcement)
section_problem                   section_purchaser          ← INSERT HERE
  ...                             section_problem
section_advantages                section_problem_importance ← INSERT HERE
  ...                             section_advantages
write_competitors_md                ...
navigation_controls               write_competitors_md
  ...                             section_market_sizing      ← INSERT HERE
                                  navigation_controls
section_context_reload              ...
section_approach_generation       section_context_reload
                                  section_founder_fit        ← INSERT HERE
                                  section_approach_generation
```

### Translation Register Per Language

Each new section must be rendered in the language's established register:

| Language | Direct Address | Register Notes |
|----------|---------------|----------------|
| French | "vous" exclusively | Space before colon: `**Verdict :**`; "Prisme" for Lens |
| Japanese | 丁寧語 (polite register) | Full-width colon: `**判定：**`; "視点" for Lens |
| Portuguese | "você" | No space before colon: `**Veredicto:**`; "Lente" for Lens |

### Term Translations for New Sections

From `templates/5PM-TERMINOLOGY-REGISTER.md` (the single authority):

| English Term | French | Japanese | Portuguese |
|-------------|--------|----------|-----------|
| Purchaser | Acheteur | 購買担当者 | Comprador |
| Founder Fit | Adéquation Fondateur | 創業者適性 | Fit do Fundador |
| Pain to Validate | Douleur à Valider | 検証コスト | Dificuldade de Validação |
| FAVORABLE | FAVORABLE | 有望 | FAVORÁVEL |
| CAUTION | ATTENTION | 注意 | ATENÇÃO |
| UNFAVORABLE | DÉFAVORABLE | 懸念あり | DESFAVORÁVEL |
| Lens | Prisme | 視点 | Lente |
| B2C/B2A/B2B/B2E | B2C/B2A/B2B/B2E | B2C/B2A/B2B/B2E | B2C/B2A/B2B/B2E |
| Matrix 5 | Matrix 5 | Matrix 5 | Matrix 5 |
| 5PM | 5PM | 5PM | 5PM |

### Template Path for 5PM-SCORECARD.md in section_write_outputs

Each language workflow uses its own template subdirectory. The 4th output block must reference the correct path:

| Language | Template Path |
|----------|--------------|
| French | `@~/.claude/get-your-shit-together/templates/fr/5PM-SCORECARD.md` |
| Japanese | `@~/.claude/get-your-shit-together/templates/ja/5PM-SCORECARD.md` |
| Portuguese | `@~/.claude/get-your-shit-together/templates/pt/5PM-SCORECARD.md` |

All three template files exist at these paths (confirmed in Phase 10).

### TRANSLATION-SYNC.md Update Mechanics

After all three workflow files are updated, TRANSLATION-SYNC.md must be updated. The current structure has one record per language. For French, Japanese, and Portuguese, the "Commit source" field must change from the old hash to the new English source commit.

| Language Section | Old Commit Hash | New Commit Hash |
|-----------------|----------------|-----------------|
| French (`Commit source anglais`) | `97e468e21a184026db29b8f25aa54d8b5a185ab7` | `b4c1af63a1f4fb6976a640ec8f97401ca3e57293` |
| Portuguese (`Commit fonte`) | `c8f8c23cabe7a890b1574217ccc5f81224f914bf` | `b4c1af63a1f4fb6976a640ec8f97401ca3e57293` |
| Japanese (`ソースコミット`) | `9ba359e9a94ac7f1c9bf3c2aa731b2e2df3384d0` | `b4c1af63a1f4fb6976a640ec8f97401ca3e57293` |

The git diff command in each language record also needs updating to reference the new hash. The "Date de traduction" / equivalent date field should be updated to 2026-03-22.

**Note:** Spanish (`dfd3253...`), German (`71d5893...`), and Chinese (`7d5534c...`) are NOT scope for Phase 11 — TRNS-02 specifies only French, Japanese, and Portuguese. Do not update those records.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Term translations | Re-translating 5PM framework terms | `templates/5PM-TERMINOLOGY-REGISTER.md` | Single authority established in Phase 10; diverging would break scorecard template alignment |
| Scorecard assembly logic | Writing custom verdict rules per language | Mirror English `section_write_outputs` exactly, with language-specific template path | Assembly logic is authoritative only in English; translated workflows must match it faithfully |
| Navigation DISCARD examples | Inventing new language for discard cascades | Translate the exact 7 discard examples from English `navigation_controls` verbatim | These examples are precise behavioral rules, not prose — must be structurally identical |

---

## Common Pitfalls

### Pitfall 1: Inserting Sections in Wrong Structural Order

**What goes wrong:** Section ordering in language workflows differs slightly from English (e.g., `step2_banner` appears in a different relative position). Naively following English line numbers will put sections in wrong positions.
**Why it happens:** The language workflows were translated from an earlier version; the section order was preserved but some layout blocks moved slightly.
**How to avoid:** Use section name anchors, not line numbers. Insert each new section immediately after the named preceding section's closing `</section>` tag.
**Warning signs:** If `section_purchaser` ends up after `section_problem` instead of before it, or `section_market_sizing` ends up after `navigation_controls`.

### Pitfall 2: Missing the navigation_controls DISCARD Expansion

**What goes wrong:** Translating only the new sections but leaving `navigation_controls` at its old 4-item list, making it inconsistent with the new 7-section Step 1 flow.
**Why it happens:** `navigation_controls` is an existing section — easy to overlook as needing updates.
**How to avoid:** Explicitly treat `navigation_controls` as a modified section requiring update, not just a passthrough.
**Warning signs:** NAVIG-02 sub-decision list in language workflow still reads "(Customer segment / Problem / Founder advantages / Competitors)" with only 4 items.

### Pitfall 3: Matrix Count Mismatch in section_approach_evaluation

**What goes wrong:** The section title stays "4-Matrix Evaluation" and the "proceed immediately to section_approach_recommendation" line stays, skipping Matrix 5 entirely.
**Why it happens:** Matrix 5 was added inside an existing section; it's easy to miss the two textual changes accompanying the new matrix block.
**How to avoid:** Update (a) the section heading to "5-Matrix Evaluation", (b) the transition after Matrix 4 from "proceed immediately to section_approach_recommendation" to "proceed to Matrix 5 below", (c) add the full Matrix 5 block, (d) add `scorecard_pain_matrix` field capture.
**Warning signs:** Section title still says "4 Matrices" in translated workflow.

### Pitfall 4: scorecard_chosen_approach Missing from section_approach_recommendation

**What goes wrong:** The approach recommendation section doesn't store `scorecard_chosen_approach` before the banner re-render, making Lens 5 scorecard assembly impossible at sprint end.
**Why it happens:** The field capture was added in a separate commit (`e61204d`) after the main Phase 9 work, making it easy to miss.
**How to avoid:** Check that the translated `section_approach_recommendation` includes the named field store block before the banner re-render instruction.
**Warning signs:** "store: **scorecard_chosen_approach**" line absent from translated section.

### Pitfall 5: section_write_outputs Still References 3 Files

**What goes wrong:** The translated section says "Writing your 3 output files now" and lists only HYPOTHESIS.md, SPRINT.md, POSITIONING.md at the end.
**Why it happens:** Multiple places in this section say "3" — the opening statement, the "After all 3 files" close, and the written-files list at the end.
**How to avoid:** Search for "3" as a count reference (not a step or section number) in section_write_outputs. Update all occurrences: opening sentence, closing sentence, and the file list.
**Warning signs:** Any language workflow section_write_outputs that still says "3 fichiers" / "3つのファイル" / "3 arquivos".

### Pitfall 6: Wrong Lens Terminology in section_write_outputs

**What goes wrong:** Using "Lens" (English) when describing the 5 lenses in the translated 5PM-SCORECARD.md write block, instead of the language-specific term.
**Why it happens:** The English scorecard assembly logic uses "Lens 1", "Lens 2", etc. — translators may carry these over verbatim.
**How to avoid:** Use the term from TERMINOLOGY-REGISTER: "Prisme" (FR), "視点" (JA), "Lente" (PT).
**Warning signs:** "Lens 1 — Problem" appearing in French section_write_outputs.

---

## Code Examples

### section_purchaser — English Original (verbatim for translation reference)

```
<section name="section_purchaser">

## Purchaser Awareness (AWARENESS-01)

**IMPORTANT: This is a non-blocking awareness pass.**
- Do NOT announce a lock. Do NOT use "Got it — [thing] locked." phrasing.
- Do NOT re-render the Step 1 banner.
- One confirmatory question only. Accept first response and move on.

**When entering this section:** Customer is already locked. Do not re-ask for it.

---

Present the four buyer tiers with their inline definitions:

- **B2C** — consumers; highly price-sensitive; churn fast
- **B2A** — aspirational buyers (photographers, bloggers, podcasters, side-hustlers); emotionally invested; willing to pay if product matches their identity, but budgets are tight ($20–100/mo range)
- **B2B** — businesses buying for teams; budget exists; longer sales cycle; ROI-driven
- **B2E** — enterprise; large contracts; long sales cycle; high switching cost

---

Ask this single combined question — do not ask separate follow-ups:

"Based on your customer segment, which tier best describes your buyer? How tech-savvy are they, and are they willing to pay?"

Wait for the user to respond.

---

**After receiving their response:**

Give one sentence of relevant context (the "insight") based on the tier they identified. Example: "B2A buyers are price-sensitive but passionate — good for community-driven products."

---

**Named field capture (store these for Scorecard assembly):**

- **scorecard_purchaser_tier** = "[B2C / B2A / B2B / B2E — whichever they identified]"
- **scorecard_purchaser_insight** = "[the one-sentence insight you provided above]"

Then proceed to section_problem. Do not ask anything else in this section.

</section>
```

Source: `get-your-shit-together/workflows/foundation-sprint.md` lines 136–179

### navigation_controls DISCARD RULE — Updated English (key changed lines)

```
"Which sub-decision do you want to revisit? (Customer segment / Purchaser / Problem /
Problem I/U classification / Founder advantages / Competitors / Market sizing)"

Examples:
- User goes back to Customer segment: wipe scorecard_purchaser_*, scorecard_problem_iu,
  scorecard_problem_iu_nudge, Problem, Advantages, Competitors, scorecard_market_*.
  Re-run all Step 1 sections from section_customer forward.
- User goes back to Purchaser: wipe scorecard_purchaser_* only. Re-run section_purchaser only.
- User goes back to Problem: wipe scorecard_problem_iu, scorecard_problem_iu_nudge,
  Advantages, Competitors, scorecard_market_*. Re-run from section_problem forward.
- User goes back to Problem I/U classification: wipe scorecard_problem_iu,
  scorecard_problem_iu_nudge only. Re-run section_problem_importance only.
- User goes back to Founder advantages: wipe Competitors, scorecard_market_*.
  Re-run from section_advantages forward.
- User goes back to Competitors: wipe competitor selection, main adversary, scorecard_market_*.
  Re-run from section_competitors forward (includes section_market_sizing).
- User goes back to Market sizing: wipe scorecard_market_* only.
  Re-run section_market_sizing only.

"Start over" wipe list:
customer segment, purchaser (scorecard_purchaser_*), problem, problem I/U classification
(scorecard_problem_iu, scorecard_problem_iu_nudge), advantages, competitors, market sizing
(scorecard_market_*)
```

Source: `get-your-shit-together/workflows/foundation-sprint.md` lines 631–656

### section_write_outputs — 4th File Block (English, for translation)

```
**4. Write 5PM-SCORECARD.md**

Read template for structure:
@~/.claude/get-your-shit-together/templates/5PM-SCORECARD.md

Write ./5PM-SCORECARD.md assembling the following named fields from this session:

**Verdict Summary:** Look across all 5 lens verdicts. If 4-5 are FAVORABLE, overall = FAVORABLE.
If 2-3 are FAVORABLE, overall = MIXED. If 0-1 are FAVORABLE, overall = UNFAVORABLE.

**Lens 1 — Problem (scorecard_problem_iu, scorecard_problem_iu_nudge)**
- Verdict: FAVORABLE if Important+Urgent (Aspirin), CAUTION if Important+Not Urgent (Vitamin),
  UNFAVORABLE if Not Important
- Evidence: what was discussed about the problem classification
- Rationale: 1-2 sentences from the I/U matrix context
- Red flags: if Vitamin nudge was shown (scorecard_problem_iu_nudge = yes), flag it

**Lens 2 — Purchaser (scorecard_purchaser_tier, scorecard_purchaser_insight)**
- Verdict: FAVORABLE if B2B or B2B-leaning B2A, CAUTION if pure B2A or B2C with strong WTP,
  UNFAVORABLE if B2C with low WTP
- Evidence: purchaser tier + tech-savviness + willingness to pay answers
- Rationale: scorecard_purchaser_insight verbatim or slightly expanded
- Red flags: if B2C with low WTP or B2E with no enterprise connections

**Lens 3 — Market (scorecard_market_research, scorecard_market_founder_perception)**
- Verdict: FAVORABLE if growing signals + reachable, CAUTION if flat or mixed, UNFAVORABLE
  if declining or no online presence
- Evidence: scorecard_market_research summary
- Rationale: scorecard_market_founder_perception + AI synthesis
- Red flags: if founder perception and research signals diverge significantly

**Lens 4 — Founder Fit (scorecard_fit_background, scorecard_fit_access, scorecard_fit_passion)**
- Verdict: FAVORABLE if strong background + strong access + yes passion, CAUTION if 1-2 weak
  areas, UNFAVORABLE if two or more are weak/no
- Evidence: founder's answers to the three Fit questions
- Rationale: AI synthesis of fit against the chosen approach
- Red flags: if scorecard_fit_passion = no or lukewarm — mandatory red flag

**Lens 5 — Pain to Validate (scorecard_pain_matrix, scorecard_chosen_approach)**
- Verdict: top-right = FAVORABLE, top-left or bottom-right = CAUTION, bottom-left = UNFAVORABLE
- Evidence: Matrix 5 placement for the chosen approach
- Rationale: why elegance + speed pattern for the chosen approach matters
- Red flags: if chosen approach is bottom-left, flag build pain risk

CRITICAL: Zero square brackets remain in 5PM-SCORECARD.md. All 5 lenses have real content.
```

Source: `get-your-shit-together/workflows/foundation-sprint.md` lines 1476–1515

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 22 sections in language workflows | 26 sections (4 new awareness sections) | Phases 8–9 (March 2026) | Language workflows are out of sync — produce no scorecard data |
| 4-Matrix Evaluation in Step 3 | 5-Matrix Evaluation (Matrix 5 = Pain to Validate) | Phase 9 | Language workflows show wrong section heading; skip Matrix 5 entirely |
| 3 output files | 4 output files (+ 5PM-SCORECARD.md) | Phase 9 (template), Phase 10 (lang templates) | Language workflows don't write 5PM-SCORECARD.md |
| TRANSLATION-SYNC.md records commit `97e468e` (FR), `c8f8c23` (PT), `9ba359e` (JA) | All three should point to `b4c1af6` | Phase 11 | Future diff detection will be broken until hashes are updated |

---

## Open Questions

1. **Spanish, German, Chinese workflows — same delta applies**
   - What we know: Those three workflows have the same missing sections (confirmed by structure analysis). Their TRANSLATION-SYNC.md hashes are also stale.
   - What's unclear: Whether updating them is in scope for Phase 11.
   - Recommendation: TRNS-02 explicitly names only French, Japanese, Portuguese. Do NOT update the other three — defer to a future phase or separate task if needed.

2. **section_approach_recommendation references "all 4 matrices" in English**
   - What we know: The English `section_approach_recommendation` opening still says "Review all 4 matrices" even after Matrix 5 was added (Matrix 5 is AI-scored, not user-reviewed). This is intentional — the recommendation is based on Matrices 1–4; Matrix 5 is informational.
   - What's unclear: Whether translated versions should say "4 matrices" or "5 matrices" in this specific section.
   - Recommendation: Keep "4 matrices" in `section_approach_recommendation` to stay faithful to English. The section heading change ("5-Matrix Evaluation") is in `section_approach_evaluation`, not in `section_approach_recommendation`.

---

## Sources

### Primary (HIGH confidence)
- `get-your-shit-together/workflows/foundation-sprint.md` — full read, lines 86–1529
- `get-your-shit-together/workflows/foundation-sprint-french.md` — full structure analysis
- `get-your-shit-together/workflows/foundation-sprint-japanese.md` — full structure analysis
- `get-your-shit-together/workflows/foundation-sprint-portuguese.md` — full structure analysis
- `get-your-shit-together/templates/5PM-TERMINOLOGY-REGISTER.md` — full read
- `get-your-shit-together/templates/fr/5PM-SCORECARD.md` — full read
- `get-your-shit-together/templates/ja/5PM-SCORECARD.md` — full read
- `get-your-shit-together/templates/pt/5PM-SCORECARD.md` — full read
- `TRANSLATION-SYNC.md` — full read (current commit hashes per language)
- `git diff 97e468e..HEAD -- foundation-sprint.md` — full diff output reviewed
- `git log --oneline 97e468e..HEAD -- foundation-sprint.md` — 7 commits confirmed
- `git rev-parse HEAD` — confirmed `b4c1af63a1f4fb6976a640ec8f97401ca3e57293`

### Secondary (MEDIUM confidence)
- `.planning/REQUIREMENTS.md` — TRNS-02, TRNS-03 scope confirmed
- `.planning/STATE.md` — Phase 10 completion confirmed; Phase 11 scope confirmed

---

## Metadata

**Confidence breakdown:**
- Sections missing from language workflows: HIGH — confirmed by direct section-name comparison
- Insertion points: HIGH — determined from English structure and language workflow structure
- Modified section content: HIGH — full diff reviewed, all changed lines documented
- Terminology: HIGH — 5PM-TERMINOLOGY-REGISTER.md is the authoritative source, created in Phase 10
- TRANSLATION-SYNC.md update: HIGH — current HEAD hash confirmed via git command

**Research date:** 2026-03-22
**Valid until:** Stable — this is a file-to-file sync task with fixed source material; no expiry risk
