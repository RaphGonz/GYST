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

---

## 中文翻译记录

| 字段 | 值 |
|------|-----|
| 中文文件 | `get-your-shit-together/workflows/foundation-sprint-chinese.md` |
| 法文来源 | `get-your-shit-together/workflows/foundation-sprint-french.md` |
| 来源提交 | `7d5534cae0f89c96111c9e4cc6e767d744f40861` |
| 翻译日期 | 2026-03-09 |
| 翻译者 | Claude (gyst:add-language chinese) |

## 如何使用此记录

当法文工作流（`foundation-sprint-french.md`）更新时，运行：

```bash
git diff 7d5534cae0f89c96111c9e4cc6e767d744f40861 HEAD -- get-your-shit-together/workflows/foundation-sprint-french.md
```

这将显示自创建中文翻译以来对源文件所做的每项更改。
将等效更改应用到 `foundation-sprint-chinese.md`，然后更新上方的提交哈希。

## 翻译说明（中文）

- 称谓："您"用于对用户的直接称呼（正式，适合商业场景）
- 机器标记 `* MAIN ADVERSARY`：在 write_competitors_md 中逐字保留——永不翻译
- 子代理 gyst-researcher：以英文操作（有意为之）；Task 简报保持英文
- 模板路径：`templates/zh/` 替代 `templates/fr/`
- 节数统计：22个 `name=` 节——与英文和法文来源相同

---

## Registro da tradução para português

| Campo | Valor |
|-------|-------|
| Arquivo português | `get-your-shit-together/workflows/foundation-sprint-portuguese.md` |
| Fonte inglesa | `get-your-shit-together/workflows/foundation-sprint.md` |
| Commit fonte | `c8f8c23cabe7a890b1574217ccc5f81224f914bf` |
| Data de tradução | 2026-03-09 |
| Traduzido por | Claude (gyst:add-language portuguese) |

## Como usar este registro

Quando o workflow inglês (`foundation-sprint.md`) for atualizado, execute:

```bash
git diff c8f8c23cabe7a890b1574217ccc5f81224f914bf HEAD -- get-your-shit-together/workflows/foundation-sprint.md
```

## Notas de tradução (português)

- Registro: "você" para tratamento direto com o usuário (informal, natural para empreendedores)
- Marcador de máquina `* MAIN ADVERSARY`: preservado verbatim em write_competitors_md — nunca traduzir
- Sub-agente gyst-researcher: opera em inglês (intencional); o briefing Task permanece em inglês
- Caminhos de templates: `templates/pt/` em vez de `templates/`
- Contagem de seções: 22 seções `name=` — idêntico à fonte inglesa

---

## 日本語翻訳の記録

| フィールド | 値 |
|-----------|-----|
| 日本語ファイル | `get-your-shit-together/workflows/foundation-sprint-japanese.md` |
| 英語ソース | `get-your-shit-together/workflows/foundation-sprint.md` |
| ソースコミット | `9ba359e9a94ac7f1c9bf3c2aa731b2e2df3384d0` |
| 翻訳日 | 2026-03-09 |
| 翻訳者 | Claude (gyst:add-language japanese) |

## このレコードの使い方

英語ワークフロー（`foundation-sprint.md`）が更新されたら、以下を実行する：

```bash
git diff 9ba359e9a94ac7f1c9bf3c2aa731b2e2df3384d0 HEAD -- get-your-shit-together/workflows/foundation-sprint.md
```

これにより、日本語翻訳が作成されてからソースに加えられた変更がすべて表示される。
`foundation-sprint-japanese.md` に同等の変更を適用し、上記のコミットハッシュを更新する。

## 翻訳メモ（日本語）

- 敬語：「あなた」でユーザーへの直接の呼びかけ（ビジネス文脈に適した丁寧な表現）
- 機械マーカー `* MAIN ADVERSARY`：write_competitors_md で逐語的に保持 — 翻訳しない
- サブエージェント gyst-researcher：英語で動作（意図的）；Task ブリーフは英語のまま
- テンプレートパス：`templates/ja/`
- セクション数：22個の `name=` セクション — 英語ソースと同一
