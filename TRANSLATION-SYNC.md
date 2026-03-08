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

Les sections suivantes comportent des traductions complexes et devraient être relues par un locuteur natif avant diffusion :

| Section | Complexité | Contenu concerné |
|---------|-----------|-----------------|
| `section_advantages` | HAUTE | Explications des dimensions Capacité, Perspicacité, Motivation |
| `section_manifesto` | HAUTE | Exemples de mini-manifeste et critères d'évaluation |
| `section_approach_generation` | HAUTE | Logique de génération et de filtrage des approches, questions de précision |

## Notes de traduction

- Register : "vous" exclusivement pour toute adresse directe à l'utilisateur
- Marqueur machine `* MAIN ADVERSARY` : préservé verbatim dans write_competitors_md — ne jamais traduire
- Sous-agent gyst-researcher : opère en anglais (intentionnel) ; le brief Task reste en anglais
- Chemins `@./COMPETITORS.md` dans section_write_outputs : inchangés (fichier de sortie, pas le modèle)
- Compte de sections : 22 sections `name=` — identique à la source anglaise

---

## Registro de la traducción al español

| Campo | Valor |
|-------|-------|
| Archivo español | `get-your-shit-together/workflows/foundation-sprint-spanish.md` |
| Fuente francesa | `get-your-shit-together/workflows/foundation-sprint-french.md` |
| Commit fuente | `dfd3253580395ea200a0e4780d32ac000ee7ee7b` |
| Fecha de traducción | 2026-03-08 |
| Traducido por | Claude (gyst:add-language spanish) |

## Cómo usar este registro

Cuando se actualice el workflow francés (`foundation-sprint-french.md`), ejecuta:

```bash
git diff dfd3253580395ea200a0e4780d32ac000ee7ee7b HEAD -- get-your-shit-together/workflows/foundation-sprint-french.md
```

Esto muestra cada modificación realizada a la fuente desde que se creó la traducción al español.
Aplica los cambios equivalentes a `foundation-sprint-spanish.md`, luego actualiza el hash de commit anterior.

## Notas de traducción (español)

- Registro: "usted" o "tú" — se usa "tú" para el trato directo con el usuario (informal, más natural para emprendedores)
- Marcador de máquina `* MAIN ADVERSARY`: preservado verbatim en write_competitors_md — nunca traducir
- Sub-agente gyst-researcher: opera en inglés (intencional); el brief Task permanece en inglés
- Rutas de plantillas: `templates/es/` en lugar de `templates/fr/`
- Recuento de secciones: 22 secciones `name=` — idéntico a la fuente inglesa y francesa

---

## Protokoll der deutschen Übersetzung

| Feld | Wert |
|------|------|
| Deutsche Datei | `get-your-shit-together/workflows/foundation-sprint-german.md` |
| Französische Quelle | `get-your-shit-together/workflows/foundation-sprint-french.md` |
| Quell-Commit | `71d5893e82aa06e7f1937d606956a4d2d801c8d6` |
| Übersetzungsdatum | 2026-03-08 |
| Übersetzt von | Claude (gyst:add-language german) |

## Verwendung dieses Protokolls

Wenn der französische Workflow (`foundation-sprint-french.md`) aktualisiert wird, führe aus:

```bash
git diff 71d5893e82aa06e7f1937d606956a4d2d801c8d6 HEAD -- get-your-shit-together/workflows/foundation-sprint-french.md
```

Dadurch werden alle Änderungen an der Quelle seit der Erstellung der deutschen Übersetzung angezeigt.
Wende entsprechende Änderungen auf `foundation-sprint-german.md` an und aktualisiere dann den Commit-Hash oben.

## Übersetzungshinweise (Deutsch)

- Anrede: „Sie" für die formelle Ansprache des Benutzers (professioneller Kontext)
- Maschinenmarker `* MAIN ADVERSARY`: in write_competitors_md verbatim erhalten — niemals übersetzen
- Sub-Agent gyst-researcher: arbeitet auf Englisch (beabsichtigt); Task-Brief bleibt auf Englisch
- Vorlagenpfade: `templates/de/` anstelle von `templates/fr/`
- Abschnittszählung: 22 `name=`-Abschnitte — identisch mit englischer und französischer Quelle
