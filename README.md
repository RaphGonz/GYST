<div align="center">

# Get Your Shit Together (GYST)

[![npm version](https://img.shields.io/npm/v/get-your-shit-together?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/get-your-shit-together)
[![npm downloads](https://img.shields.io/npm/dm/get-your-shit-together?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/get-your-shit-together)
[![Languages](https://img.shields.io/badge/languages-English%20%7C%20French%20%7C%20Spanish%20%7C%20German%20%7C%20Chinese%20%7C%20Portuguese%20%7C%20Japanese-4B8BBE?style=for-the-badge)](https://github.com/RaphGonz/GYST)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

</div>

An interactive wizard for solo entrepreneurs to find solid ideas ! Based on the excellent book "Click" by Jake Knapp and John Zeratsky.


```bash
npx get-your-shit-together
```
<div align="center">
<img src="asset/illustration.PNG" alt="GYST illustration" />
</div>

## Why did I do this

After failing for the fifth time to create a company that makes money or that is somewhat useful to anyone in the world, I decided to work on myself and learn everything again, back to the roots. I stumbled across a book called "Click : Make something people want" and it just blew my mind.

I read it in a morning, and tried to apply the method on a vague idea I had of a start-up. It cleared up so many questions, I thought it was incredible. I finally have something solid to work on and huge motivations to do so !

So the next was simply to make an interactive tool to let anyone create an hypothesis and start working immediatly !

You should read the book [https://www.theclickbook.com/](there) It provides way deeper insights and examples that the wizard simply doesn't provide. It will give you the deeper understanding of what you're doing.

I didn't implement what comes after a foundation sprint. It's all detailed [https://www.thesprintbook.com/](there).

## Who is it for

Solo entrepreneurs, existing companies but also artists or game-designers that want to make money and live from their art. Any solo weirdos. Could also be used in group, if you guys can share a screen.

## What It Does

- Runs the full 4-step Foundation Sprint interactively inside Claude Code
- Researches competitors and validates your target customer's pain using web search
- Guides you through positioning (2x2 matrix) and differentiator selection
- Evaluates multiple solution approaches using five business lenses (the 5PM framework)
- Scores how deeply the market needs a solution using the Need Intensity framework (6 dimensions, 0–6,000 scale)
- Runs five reality gates that can stop the sprint outright when the idea doesn't survive an honest look
- Produces six output files in your project directory: competitor profiles, positioning map, decision journal, falsifiable hypothesis, a 5PM Scorecard, and a Need Intensity report

## The 5PM Framework

The sprint evaluates your idea across five lenses to surface signal before you build.

- **Problem** — Is this problem important AND urgent for the target customer? Vitamin vs. aspirin classification drives the whole sprint. A true aspirin solves something people are already actively trying to fix; a vitamin is nice to have but rarely purchased.
- **Purchaser** — Who actually pays? This lens looks at tech adoption readiness, willingness to pay, and whether the buyer is B2C, B2A (aspirational — photographers, podcasters), B2B, or B2E. The buyer shapes every pricing and distribution decision downstream.
- **Pricing Model** — What revenue shape does this business naturally take? Assessed qualitatively — subscription dynamics, ARPA range, and billing cadence signals tell you whether the unit economics make sense before you write a line of code.
- **Market** — Is the market reachable and growing? AI performs a live web search for community size, job board volume, and conference activity to ground your estimate in current evidence rather than assumptions.
- **Product/Founder Fit** — Are you the right person to build this? Background, network, market access, and the passion check ("Do you love this problem?") determine whether you have an unfair advantage or are starting from scratch in a market you barely know.

At sprint end the AI writes a `5PM-SCORECARD.md` with a FAVORABLE / CAUTION / UNFAVORABLE verdict per lens, with evidence and rationale.

## The Five Reality Gates

The sprint is a facilitator: it helps you decide. The gates are the opposite — five points where the AI stops facilitating and gives you a verdict, and where the sprint can stop for good.

They're interleaved, not bolted onto the front. Each one runs where the sprint has just produced what that gate needs in order to judge:

| Gate | Question | Runs after | What it catches |
|------|----------|-----------|-----------------|
| **1 — Explain it plainly** | Can the idea be said in four sentences a twelve-year-old would follow? | the welcome, before Step 1 | jargon standing in for a missing thought |
| **2 — How is this solved today?** | What do people do now, and what specifically is bad about it? | Need Intensity | "there isn't much wrong with the current solution" |
| **3 — Name the person** | Is there a real, findable person with this problem? | Gate 2 | a persona assembled from plausibility — "Sarah, 34, a busy marketing manager" |
| **4 — What has to go right** | Everything that must go right, ranked most-likely-to-fail first. Is the top risk testable in twelve weeks? | the approach is chosen | a bet dressed up as a risk |
| **5 — The midterm and the final** | A week-4 and a week-12 test. Can they fail? | the testable form | a plan that cannot be proven wrong |

Gates 2 and 3 are evidence, not reasoning. The AI searches the customer's own vocabulary ("how do you quote scanned PDFs fast", not "workflow automation for legal translation") and ranks what it finds: someone already paying for a bad version beats a two-star review, which beats a forum post naming the workaround, which beats anything five-star. Gates 1, 4 and 5 are thinking, and are deliberately not researched.

A STOP never ends the session behind your back. You get three choices: revise the idea and re-run that gate, proceed anyway (the override is recorded in your output files as an open risk), or end the sprint there with nothing written.

Every claim the AI asserts without a source lands in a **Still unverified** ledger that follows the sprint to the end and is written into `SPRINT.md` and `HYPOTHESIS.md`. A sprint that reaches Gate 5 carrying nine unverified claims tells you more than a clean verdict does.

> Most ideas stop at one of the first three gates. That's the point of having them.

> The gates run in all seven languages.

## Need Intensity

Need Intensity measures how strongly a market actually needs a solution — not whether your idea is clever, but whether the pain is deep enough to drive purchasing behavior.

- **Real** — Is there documented evidence that people are actively trying to solve this? Are there communities, job postings, conferences, or tools dedicated to this problem?
- **Urgent** — Do people need a solution now, not eventually? Time pressure signals willingness to pay today.
- **Critical** — How severe is the consequence of NOT solving it? Loss of income, health risk, and regulatory exposure score higher than inconvenience.
- **Imposed** — Is the need externally mandated — by law, employer, or market standard? External mandate removes the "nice to have" objection.
- **Neglected** — How thin is the existing solution landscape? A crowded market with dominant players scores low; whitespace scores high.
- **Consciousness** — Does the target customer already know they have this problem? Aware buyers need less education before they convert.

The score is calculated as:

```
Score = Neglected × (Critical + Consciousness) × (Urgent + Imposed + Real)
```

Each dimension is rated 0–10 (calibrated by AI web search). Maximum score: 6,000.

| Score | Verdict |
|-------|---------|
| Above 2,000 | Very good — strong signal, potential for hypergrowth |
| 1,500 – 2,000 | Viable — growing slowly, solid foundation to build on |
| 1,000 – 1,499 | Stable business — viable but difficult |
| 500 – 999 | Segment better — reframe your client or problem before building |
| 0 – 499 | Not viable — revisit the problem statement entirely |

When the score falls below 1,000, the AI suggests two more precise client segments or problem reframings — you decide whether to re-rate or proceed.

## Requirements

- Node.js >= 16.7.0
- Claude Code (claude.ai/code)

## Install

```bash
# Install via npx (recommended)
npx get-your-shit-together

# Or clone and install locally (for development)
git clone https://github.com/your-repo/GYST
cd GYST
node bin/install.js
```

## Usage

After installing, open any project directory in Claude Code (with full permissions in order to not validate 50 times web searches)
```
claude --dangerously-skip-permissions
```

and run:

```
/gyst:foundation-sprint
```

The sprint runs entirely within your Claude Code session. No account, no API keys, no config.

### Run in another language

Pass a language flag to run the sprint in your language — all questions, guidance, and output files will be translated:

| Flag | Language |
|------|----------|
| `-french` | 🇫🇷 French / Français |
| `-spanish` | 🇪🇸 Spanish / Español |
| `-german` | 🇩🇪 German / Deutsch |
| `-chinese` | 🇨🇳 Chinese / 中文 |
| `-portuguese` | 🇧🇷 Portuguese / Português |
| `-japanese` | 🇯🇵 Japanese / 日本語 |

```
/gyst:foundation-sprint -french
```

Claude switches to a fully pre-translated workflow and writes all six output files — `COMPETITORS.md`, `HYPOTHESIS.md`, `SPRINT.md`, `POSITIONING.md`, `5PM-SCORECARD.md`, and `NEED-INTENSITY.md` — in the chosen language.

> Unsupported flags fall back to English with a message.

## What You Get

Six output files written to your project directory:

- `COMPETITORS.md` — competitor research profiles (written after Step 1)
- `NEED-INTENSITY.md` — Need Intensity scores, formula, verdict tier, and AI rationale per dimension
- `HYPOTHESIS.md` — your testable hypothesis (X/Y/Z/W/U/V format)
- `SPRINT.md` — full decision journal
- `POSITIONING.md` — 2x2 matrix and mini-manifesto
- `5PM-SCORECARD.md` — 5PM framework scorecard with verdicts across all five lenses

## Install Location

`~/.claude/get-your-shit-together/`

## Uninstall

```bash
rm -rf ~/.claude/get-your-shit-together/
rm -rf ~/.claude/commands/gyst/
```

## License

MIT
