# Get Your Shit Together (GYST)

A Claude Code command that guides solo entrepreneurs through the Foundation Sprint — from fuzzy idea to testable hypothesis in one focused session.

## What It Does

- Runs the full 4-step Foundation Sprint interactively inside Claude Code
- Researches competitors and validates your target customer's pain using web search
- Guides you through positioning (2x2 matrix) and differentiator selection
- Evaluates multiple solution approaches using four business lenses
- Produces four output files in your project directory: competitor profiles, positioning map, decision journal, and a falsifiable hypothesis

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

> **Note:** The npx package name is a placeholder pending npm publish. For now, dev install via `node bin/install.js` is the working path.

## Usage

After installing, open any project directory in Claude Code and run:

```
/gyst:foundation-sprint
```

The sprint runs entirely within your Claude Code session. No account, no API keys, no config.

## What You Get

Four output files written to your project directory:

- `COMPETITORS.md` — competitor research profiles (written after Step 1)
- `HYPOTHESIS.md` — your testable hypothesis (X/Y/Z/W/U/V format)
- `SPRINT.md` — full decision journal
- `POSITIONING.md` — 2x2 matrix and mini-manifesto

## Install Location

`~/.claude/get-your-shit-together/`

## Uninstall

```bash
rm -rf ~/.claude/get-your-shit-together/
rm -rf ~/.claude/commands/gyst/
```

## License

MIT
