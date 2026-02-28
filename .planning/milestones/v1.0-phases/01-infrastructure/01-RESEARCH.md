# Phase 1: Infrastructure - Research

**Researched:** 2026-02-25
**Domain:** npm package structure, Node.js installer scripting, Claude Code slash command discovery
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Package structure:**
- This repo (`Desktop/GYST/`) is the npm package — what gets published
- Install target: `~/.claude/get-your-shit-together/` (global, Claude only)
- Commands install to: `~/.claude/commands/gyst/`
- Package directories mirror GSD: `bin/`, `commands/gyst/`, `get-your-shit-together/workflows/`, `get-your-shit-together/agents/`, `get-your-shit-together/templates/`
- Dev workflow: `node bin/install.js` to install locally during development

**Installer (bin/install.js):**
- Simpler than GSD's installer — Claude-only, no runtime selection, no local/global choice
- Just installs to `~/.claude/get-your-shit-together/` and registers commands in `~/.claude/commands/gyst/`
- Interactive: shows a banner, confirms install location, copies files, prints success message
- No dependencies — pure Node.js like GSD's installer

**Slash command pattern:**
- `commands/gyst/foundation-sprint.md` is a thin wrapper — same pattern as GSD
- Contains: `<objective>`, `<execution_context>` with @-reference to the workflow, `<process>` summary
- Paths hardcoded to `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` (same approach as GSD's hardcoded `~/.claude/get-shit-done/` paths)

**Output templates:**
- 4 templates: `HYPOTHESIS.md`, `SPRINT.md`, `POSITIONING.md`, `COMPETITORS.md`
- Richly annotated: section headers + inline comments explaining what the AI should write in each section — guides consistent, complete output every sprint
- Live in `get-your-shit-together/templates/` in the package, copied to `~/.claude/get-your-shit-together/templates/` on install
- Workflow @-references them when writing output files at sprint end

### Claude's Discretion
- Banner design for the installer (ASCII art, colors, wording)
- Exact success/error messages in the installer
- Whether to include a VERSION file (GSD does)

### Deferred Ideas (OUT OF SCOPE)
- npm publish setup (package name, registry, versioning) — not needed until the package is feature-complete
- Update/uninstall commands in the installer — Phase 1 is install-only
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Package installs at `~/.claude/get-your-shit-together/` as a standalone directory | GSD install pattern: `copyWithPathReplacement(skillSrc, skillDest, ...)` — same approach, different target dir name |
| INFRA-02 | Slash command entry point at `~/.claude/commands/gyst/foundation-sprint.md` | GSD copies `commands/gsd/` to `~/.claude/commands/gsd/` — identical pattern, substitute gyst namespace |
| INFRA-03 | Main workflow at `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` | GSD stores workflows in `get-shit-done/workflows/` — copy structure, rename directory |
| INFRA-04 | Researcher agent at `~/.claude/get-your-shit-together/agents/gyst-researcher.md` | GSD installs agents to `~/.claude/agents/gsd-*.md` — same flat-file agent pattern |
| INFRA-05 | Output templates for HYPOTHESIS.md, SPRINT.md, POSITIONING.md, and COMPETITORS.md | GSD's templates live in `get-shit-done/templates/` and are @-referenced by workflows |
| INFRA-06 | `README.md` with install instructions (copy commands to get it running) | Standard npm package README with `npx [package-name]` instructions |
</phase_requirements>

---

## Summary

Phase 1 is a file scaffolding phase — no logic runs, nothing is interactive beyond the installer itself. The primary deliverable is the npm package directory structure with all placeholder files in place, plus a working `bin/install.js` that copies them to the correct locations under `~/.claude/`.

The reference implementation (`get-shit-done-cc` at version 1.21.0) has been fully inspected. GYST's installer is a strict subset of GSD's: same Node.js-only approach, same `readline` interactive prompting pattern, same `fs.mkdirSync({ recursive: true })` + `fs.copyFileSync` / `fs.writeFileSync` copy logic, same ANSI color constants. The key simplification is eliminating all multi-runtime branching (`isOpencode`, `isGemini`, `isCodex`) — GYST is Claude-only, so every path leads to `~/.claude/get-your-shit-together/`.

Claude Code discovers slash commands by scanning `~/.claude/commands/` recursively for `.md` files. A command file at `~/.claude/commands/gyst/foundation-sprint.md` becomes the slash command `/gyst:foundation-sprint`. The command file is a thin wrapper that uses YAML frontmatter to declare metadata and an `<execution_context>` block with `@`-references to load the actual workflow at invocation time.

**Primary recommendation:** Mirror GSD's file structure and installer logic exactly, remove all non-Claude paths, target `get-your-shit-together/` instead of `get-shit-done/`.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js `fs` | built-in | Directory creation, file copy, file write | No dependencies required; runs anywhere Node is installed |
| Node.js `path` | built-in | Cross-platform path construction | Handles Windows/Unix path separators |
| Node.js `os` | built-in | Resolve home directory (`os.homedir()`) | Correct `~` expansion without shell |
| Node.js `readline` | built-in | Interactive user prompts (y/n confirmations) | GSD pattern; no external libraries needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Node.js `crypto` | built-in | SHA256 hashing for file manifest | Only if implementing update detection (GSD feature — likely defer) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Pure `fs` copy | `fs-extra` npm package | fs-extra is simpler but adds a dependency — GSD chose zero-dependency and so should GYST |
| `readline` prompts | `inquirer` npm package | inquirer is friendlier but adds a dependency — avoid |

**Installation:**

No external dependencies. `package.json` will have empty `"dependencies": {}` — same as GSD.

```bash
# Development: install locally
node bin/install.js
```

## Architecture Patterns

### Recommended Project Structure

```
GYST/                                    # npm package root (what gets published)
├── bin/
│   └── install.js                       # npx entry point — interactive installer
├── commands/
│   └── gyst/
│       └── foundation-sprint.md         # Slash command wrapper
├── get-your-shit-together/
│   ├── workflows/
│   │   └── foundation-sprint.md         # Stub workflow (Phase 2 fills this in)
│   ├── agents/
│   │   └── gyst-researcher.md           # Stub agent (Phase 2 fills this in)
│   └── templates/
│       ├── HYPOTHESIS.md                # Annotated output template
│       ├── SPRINT.md                    # Annotated output template
│       ├── POSITIONING.md               # Annotated output template
│       └── COMPETITORS.md               # Annotated output template
├── package.json                         # `bin` field points to bin/install.js
└── README.md                            # Install instructions

# After bin/install.js runs, installs to:
~/.claude/
├── commands/
│   └── gyst/
│       └── foundation-sprint.md         # Copied from commands/gyst/
├── get-your-shit-together/
│   ├── workflows/
│   │   └── foundation-sprint.md
│   ├── agents/
│   │   └── gyst-researcher.md
│   └── templates/
│       ├── HYPOTHESIS.md
│       ├── SPRINT.md
│       ├── POSITIONING.md
│       └── COMPETITORS.md
└── agents/
    └── gyst-researcher.md               # Flat agents dir (Claude Code convention)
```

**Note on agents location:** GSD installs agents to `~/.claude/agents/gsd-*.md` (flat file, top-level agents dir). The GYST researcher agent should follow this same pattern: install to `~/.claude/agents/gyst-researcher.md`. INFRA-04 says `~/.claude/get-your-shit-together/agents/` — this may be a slightly different model (workflow-embedded agent vs. global agent). Recommend: install to `~/.claude/agents/gyst-researcher.md` (GSD convention) AND also copy to `~/.claude/get-your-shit-together/agents/gyst-researcher.md` if the workflow @-references it from there.

### Pattern 1: npx `bin` Field

**What:** `package.json` `bin` field maps a command name to a script file. When installed via `npx`, Node.js runs that script.

**When to use:** Any npm package that needs a runnable CLI entry point.

**Example:**

```json
// Source: GSD package.json (inspected directly from npm cache)
{
  "name": "get-your-shit-together",
  "version": "1.0.0",
  "bin": {
    "get-your-shit-together": "bin/install.js"
  },
  "files": [
    "bin",
    "commands",
    "get-your-shit-together"
  ],
  "engines": {
    "node": ">=16.7.0"
  },
  "dependencies": {}
}
```

The `bin/install.js` shebang line must be present:

```javascript
#!/usr/bin/env node
```

### Pattern 2: Installer Structure (Claude-Only Simplified)

**What:** The installer is a single Node.js file with no dependencies. It shows a banner, resolves the home directory, creates target directories, copies files, and prints a success message.

**When to use:** Always — this is the entire installer pattern for GYST.

**Example (core install function):**

```javascript
// Source: Derived from GSD bin/install.js (inspected), stripped to Claude-only essentials

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const cyan  = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const dim   = '\x1b[2m';
const reset = '\x1b[0m';

const pkg = require('../package.json');

const homeDir   = os.homedir();
const configDir = path.join(homeDir, '.claude');
const gystDir   = path.join(configDir, 'get-your-shit-together');
const commandsDir = path.join(configDir, 'commands', 'gyst');
const agentsDir = path.join(configDir, 'agents');

function install() {
  const src = path.join(__dirname, '..');

  // 1. Create target directories
  fs.mkdirSync(gystDir, { recursive: true });
  fs.mkdirSync(path.join(gystDir, 'workflows'), { recursive: true });
  fs.mkdirSync(path.join(gystDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(gystDir, 'templates'), { recursive: true });
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.mkdirSync(agentsDir, { recursive: true });

  // 2. Copy get-your-shit-together/ directory contents
  copyDir(
    path.join(src, 'get-your-shit-together'),
    gystDir
  );
  console.log(`  ${green}✓${reset} Installed get-your-shit-together`);

  // 3. Copy commands/gyst/ to ~/.claude/commands/gyst/
  copyDir(
    path.join(src, 'commands', 'gyst'),
    commandsDir
  );
  console.log(`  ${green}✓${reset} Installed commands/gyst`);

  // 4. Copy agent to ~/.claude/agents/
  fs.copyFileSync(
    path.join(src, 'get-your-shit-together', 'agents', 'gyst-researcher.md'),
    path.join(agentsDir, 'gyst-researcher.md')
  );
  console.log(`  ${green}✓${reset} Installed agents/gyst-researcher.md`);

  console.log(`
  ${green}Done!${reset} Open any directory in Claude Code and run ${cyan}/gyst:foundation-sprint${reset}.
`);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
```

### Pattern 3: Interactive Confirmation Prompt

**What:** Use `readline` to ask the user to confirm the install location before proceeding. GSD pattern: show the path, ask y/n, default to y on Enter.

**Example:**

```javascript
// Source: Derived from GSD bin/install.js readline pattern

function promptConfirm(question, defaultYes, callback) {
  if (!process.stdin.isTTY) {
    // Non-interactive (CI/pipe) — auto-confirm
    callback(true);
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const hint = defaultYes ? '[Y/n]' : '[y/N]';
  rl.question(`  ${question} ${dim}${hint}${reset}: `, (answer) => {
    rl.close();
    const trimmed = answer.trim().toLowerCase();
    if (trimmed === '') {
      callback(defaultYes);
    } else {
      callback(trimmed === 'y' || trimmed === 'yes');
    }
  });
}
```

### Pattern 4: Slash Command Wrapper File

**What:** A `.md` file in `commands/gyst/` that Claude Code loads when the user types `/gyst:foundation-sprint`. It is a thin wrapper with YAML frontmatter and a `<execution_context>` block that `@`-references the real workflow file.

**When to use:** All GYST slash commands use this pattern. The wrapper holds metadata; the workflow holds logic.

**Example:**

```markdown
// Source: Inspected GSD commands/gsd/new-project.md and plan-phase.md directly

---
name: gyst:foundation-sprint
description: Run a Foundation Sprint — one session, one testable hypothesis
allowed-tools:
  - Read
  - Write
  - Bash
  - WebSearch
  - WebFetch
---

<objective>
Run the GYST Foundation Sprint end-to-end in a single session. Produces HYPOTHESIS.md,
SPRINT.md, POSITIONING.md, and COMPETITORS.md in the current directory.
</objective>

<execution_context>
@~/.claude/get-your-shit-together/workflows/foundation-sprint.md
</execution_context>

<process>
Execute the foundation-sprint workflow from @~/.claude/get-your-shit-together/workflows/foundation-sprint.md end-to-end.
</process>
```

**Key details:**
- The `name:` field in frontmatter is what Claude Code uses for the slash command name: `gyst:foundation-sprint` → `/gyst:foundation-sprint`
- The `@`-reference in `<execution_context>` causes Claude Code to load and inline the workflow at invocation time
- Paths are hardcoded to `~/.claude/` (not relative) — this is intentional and how GSD works
- The `allowed-tools:` array declares which tools the command can use (YAML array format)

### Pattern 5: Agent File Structure

**What:** An agent `.md` file with YAML frontmatter declaring name, description, and tools. GSD installs these as flat files in `~/.claude/agents/`.

**Example:**

```markdown
// Source: Inspected ~/.claude/agents/gsd-phase-researcher.md (installed GSD agent)

---
name: gyst-researcher
description: Researches competitors, market segments, and pain points for the Foundation Sprint.
tools: Read, Write, WebSearch, WebFetch
color: cyan
---

<role>
You are the GYST researcher. You are invoked during the Foundation Sprint to ...
[stub — Phase 2 fills in the actual content]
</role>
```

**Key frontmatter fields for Claude Code agents:**
- `name`: identifier used when spawning (matches filename without `.md`)
- `description`: shown in Claude Code's agent picker
- `tools`: comma-separated list of tools the agent can use (Claude Code format)
- `color`: optional display color (cyan, green, yellow, etc.)

### Anti-Patterns to Avoid

- **Hardcoding Windows paths:** Use `path.join(os.homedir(), '.claude', ...)` — never string-concatenate with `\` or `C:\Users\`. `path.join` handles platform differences.
- **Using `~` in Node.js paths:** Node.js does not expand `~`. Always use `os.homedir()` to resolve the home directory.
- **Skipping `{ recursive: true }` in `mkdirSync`:** If `~/.claude/commands/` doesn't exist yet (e.g., fresh Claude Code install), `mkdirSync` will throw. Always use `{ recursive: true }`.
- **Single-file copy without directory check:** Call `fs.mkdirSync(destDir, { recursive: true })` before `fs.copyFileSync()`.
- **Not checking `process.stdin.isTTY`:** If piped (non-interactive), `readline` will hang waiting for input. GSD handles this by auto-confirming. GYST must too.
- **Stub files with no content:** Even stub workflow/agent files need at least a frontmatter block and a single `<role>` or `<purpose>` section, or Claude Code may reject them.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Home directory resolution | Custom env var parsing | `os.homedir()` | Handles Windows, Mac, Linux correctly including unusual setups |
| Recursive directory creation | Manual parent-dir walking | `fs.mkdirSync(path, { recursive: true })` | Built into Node.js since v10.12 |
| Recursive directory copy | Custom recursive function beyond basic | Simple `copyDir()` helper (3 lines) | GSD implements this — no library needed at this scale |
| Cross-platform path joins | String concatenation | `path.join(...)` | Handles `/` vs `\` automatically |
| Interactive prompts | Event-driven readline from scratch | `readline.createInterface` with `rl.question()` | GSD's exact pattern, well-tested |

**Key insight:** GYST's installer is simpler than any npm package that does this job (e.g., `make-dir`, `fs-extra`) because it has zero install-time dependencies. The Node.js built-ins cover everything needed for file copy at this scale.

## Common Pitfalls

### Pitfall 1: Agent File Registered in Wrong Location

**What goes wrong:** Agent file copied to `~/.claude/get-your-shit-together/agents/` but not to `~/.claude/agents/`. Claude Code's global agent discovery scans `~/.claude/agents/` — the nested path under `get-your-shit-together/` is NOT automatically discovered.

**Why it happens:** INFRA-04 says "Researcher agent at `~/.claude/get-your-shit-together/agents/gyst-researcher.md`" which could be misread as the only install location.

**How to avoid:** Install the agent to BOTH locations — copy to `~/.claude/agents/gyst-researcher.md` (for Claude Code discovery) and also to `~/.claude/get-your-shit-together/agents/gyst-researcher.md` (so the workflow can @-reference it with a predictable path if needed). GSD follows the flat `~/.claude/agents/` pattern.

**Warning signs:** Claude Code doesn't show the agent when it should be invoked; `/gyst:foundation-sprint` runs but the researcher sub-agent is unknown.

### Pitfall 2: Command Namespace Collision

**What goes wrong:** A command named `foundation-sprint.md` inside `commands/gyst/` creates the slash command `/gyst:foundation-sprint`. If another package also uses the `gyst` namespace, commands will collide.

**Why it happens:** Claude Code merges all `~/.claude/commands/*/` directories. The folder name is the namespace.

**How to avoid:** The namespace `gyst` is unique — no collision risk with GSD (`gsd`). Just verify the folder name is exactly `gyst`.

**Warning signs:** Wrong command triggered when typing `/gyst:...`.

### Pitfall 3: The `#!/usr/bin/env node` Shebang on Windows

**What goes wrong:** `bin/install.js` works fine when run as `node bin/install.js` during development but fails as `npx get-your-shit-together` if the shebang is missing or malformed.

**Why it happens:** npm uses the shebang to know how to execute the bin file. On Windows, npm wraps the shebang in a CMD script automatically — but only if the shebang exists.

**How to avoid:** First line of `bin/install.js` must be exactly `#!/usr/bin/env node` with no blank lines before it.

**Warning signs:** `npx` runs but immediately exits with no output; Windows shows "cannot find `node`".

### Pitfall 4: `@`-Reference Path Doesn't Match Install Path

**What goes wrong:** Command wrapper uses `@~/.claude/get-your-shit-together/workflows/foundation-sprint.md` but installer copies the file to a different path.

**Why it happens:** Mismatch between the hardcoded path in the command wrapper and where the installer actually puts the file.

**How to avoid:** Define the install target path once (in installer) and derive it. The command wrapper must reference exactly `~/.claude/get-your-shit-together/workflows/foundation-sprint.md` — this is what CONTEXT.md locked. Install must put files there.

**Warning signs:** `/gyst:foundation-sprint` runs but Claude Code reports the @-reference file as not found.

### Pitfall 5: Stub Files That Crash Claude Code

**What goes wrong:** An empty `.md` file (0 bytes) or a file with only a single line may be valid on disk but confuse Claude Code's command/agent loader.

**Why it happens:** Stub files often get created as `touch filename.md` (empty). Claude Code parses frontmatter from these files.

**How to avoid:** Every `.md` stub file must have at minimum:
- A YAML frontmatter block (`---` ... `---`)
- A single paragraph or section explaining it's a stub

**Warning signs:** Command shows up in `/` picker but throws an error when invoked.

### Pitfall 6: Non-Interactive Terminal During `npx`

**What goes wrong:** Running `npx get-your-shit-together` in a non-TTY environment (CI, piped shell) causes the `readline` prompt to hang indefinitely.

**Why it happens:** `readline` blocks waiting for stdin that will never have input.

**How to avoid:** Always check `process.stdin.isTTY` before creating a readline interface. If false, default to global install without asking.

**Warning signs:** `npx get-your-shit-together` hangs in a CI environment.

## Code Examples

Verified patterns from inspected GSD source:

### Installer Entry Point Structure

```javascript
// Source: GSD bin/install.js (inspected from npm cache, v1.21.0)

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// ANSI color constants
const cyan   = '\x1b[36m';
const green  = '\x1b[32m';
const yellow = '\x1b[33m';
const dim    = '\x1b[2m';
const reset  = '\x1b[0m';

const pkg = require('../package.json');

// Show banner immediately on load
console.log(banner);  // defined above as ASCII art string

// Main logic at bottom of file
// (all functions defined above the main block)

// Interactive: prompt → install → finish
if (!process.stdin.isTTY) {
  // Non-interactive: auto-install without prompting
  install();
  finish();
} else {
  promptConfirm(`Install to ${cyan}~/.claude/get-your-shit-together/${reset}?`, true, (confirmed) => {
    if (!confirmed) {
      console.log(`\n  ${yellow}Installation cancelled${reset}\n`);
      process.exit(0);
    }
    install();
    finish();
  });
}
```

### package.json `bin` + `files` Fields

```json
// Source: GSD package.json (inspected), adapted for GYST

{
  "name": "get-your-shit-together",
  "version": "1.0.0",
  "description": "One command, one session, one testable hypothesis — Foundation Sprint for solo entrepreneurs.",
  "bin": {
    "get-your-shit-together": "bin/install.js"
  },
  "files": [
    "bin",
    "commands",
    "get-your-shit-together",
    "README.md"
  ],
  "engines": {
    "node": ">=16.7.0"
  },
  "dependencies": {},
  "license": "MIT"
}
```

The `"files"` array controls what npm packages when publishing — only list directories/files needed at install time. Omit `.planning/`, `.git/`, etc.

### Recursive Copy Helper

```javascript
// Source: Derived from GSD install.js copyWithPathReplacement() — simplified for GYST

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
```

Note: GSD's version also does path replacement (substituting `~/.claude/` references in `.md` files). GYST's installer can optionally do the same — since paths are hardcoded to `~/.claude/get-your-shit-together/`, no replacement is needed in Phase 1 (all files already reference the correct path).

### Claude Code Slash Command Frontmatter

```markdown
// Source: Inspected GSD commands/gsd/new-project.md and plan-phase.md

---
name: gyst:foundation-sprint
description: Run a Foundation Sprint — one session, one testable hypothesis
allowed-tools:
  - Read
  - Write
  - Bash
  - WebSearch
  - WebFetch
---
```

**Confirmed fields:**
- `name`: full command name including namespace (`gyst:foundation-sprint`)
- `description`: shown in Claude Code's command palette
- `allowed-tools`: YAML array (not comma-separated for command files)
- `argument-hint`: optional, shows in palette as hint text
- `agent`: optional, delegates to a named agent instead of running inline

### Claude Code Agent Frontmatter

```markdown
// Source: Inspected ~/.claude/agents/gsd-phase-researcher.md (live install)

---
name: gyst-researcher
description: Researches competitors and market data for the GYST Foundation Sprint.
tools: Read, Write, WebSearch, WebFetch
color: cyan
---
```

**Note:** Agent files use `tools:` (comma-separated string) not `allowed-tools:` (YAML array). Command files use `allowed-tools:`. This asymmetry is how GSD's installer handles them differently.

### Annotated Output Template Pattern

```markdown
// Pattern: Richly annotated template — section headers + inline guidance for the AI

# HYPOTHESIS.md

<!--
  This file is produced at the end of your Foundation Sprint.
  Each section below should be filled with specific, concrete information
  from your sprint session. No vague language — every claim should be
  falsifiable or checkable.
-->

## The Hypothesis

> If we help **[TARGET CUSTOMER: be specific — role, company size, industry]**
> solve **[PROBLEM: the specific pain in concrete terms]**
> with **[APPROACH: your solution method]**,
> they will choose us over **[MAIN ADVERSARY: the incumbent capturing this budget today]**
> because we are **[DIFFERENTIATOR 1]** and **[DIFFERENTIATOR 2]**.

<!-- Fill in each bracketed section. The adversary is the competitor from COMPETITORS.md
     flagged as "main adversary" — the one your client uses today. -->

## Testable Form

...
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Global npm install (`npm install -g`) | `npx` one-time run | ~2017 (npm 5.2) | User never has a stale global install; each `npx` run fetches latest |
| Flat command files in `~/.claude/commands/` | Namespaced subdirectories `~/.claude/commands/gyst/` | Claude Code shipped with nested support | Commands from multiple packages coexist under separate namespaces |

**Note on Claude Code command discovery (MEDIUM confidence):** Claude Code scans `~/.claude/commands/` for `.md` files. The directory name becomes the command namespace (e.g., `commands/gyst/` → `/gyst:...`). This matches the installed GSD behavior (`commands/gsd/` → `/gsd:...`) confirmed by direct inspection of the installed files. The exact Claude Code documentation for this was not separately verified against official Anthropic docs — the evidence comes from GSD's working implementation.

## Open Questions

1. **Agent dual-location question**
   - What we know: GSD installs agents to `~/.claude/agents/gsd-*.md` (flat). INFRA-04 specifies `~/.claude/get-your-shit-together/agents/gyst-researcher.md`.
   - What's unclear: Does Claude Code also scan `~/.claude/get-your-shit-together/agents/` for agents? Or only `~/.claude/agents/`?
   - Recommendation: Install to `~/.claude/agents/gyst-researcher.md` (confirmed discovery path) AND copy to `~/.claude/get-your-shit-together/agents/gyst-researcher.md` (satisfies INFRA-04 literally). The installer does both.

2. **Package name for `npx`**
   - What we know: The npm package name is TBD (`get-your-shit-together` or `gyst-cc` — locked as out of scope for Phase 1).
   - What's unclear: Whether `bin` key in package.json needs to match package name.
   - Recommendation: The `bin` key name can differ from the package name. Set it to something reasonable for now (`get-your-shit-together`). The planner can leave a TODO comment. This does not block Phase 1.

3. **Workflow stub depth**
   - What we know: Phase 2 fills in the actual workflow content.
   - What's unclear: How minimal can the workflow stub be without causing errors when `/gyst:foundation-sprint` is accidentally invoked in Phase 1?
   - Recommendation: The stub workflow should at minimum say "This sprint is under construction. Please wait for the next release." with proper frontmatter — so invoking the command produces a clear message rather than an error.

## Sources

### Primary (HIGH confidence)
- GSD `bin/install.js` v1.21.0 — inspected directly from `C:/Users/raphg/AppData/Local/npm-cache/_npx/4db0de1f85c3165e/node_modules/get-shit-done-cc/bin/install.js` — full installer logic, readline pattern, copy functions, banner pattern
- GSD `package.json` — inspected directly — `bin` field, `files` field, zero-dependency approach confirmed
- GSD `commands/gsd/new-project.md` — inspected directly — slash command frontmatter format, `@`-reference pattern, `allowed-tools` YAML array format
- GSD `commands/gsd/plan-phase.md` — inspected directly — `agent:` field usage, frontmatter structure confirmed
- `~/.claude/agents/gsd-phase-researcher.md` — inspected directly — live installed agent, `tools:` comma-separated format confirmed
- `~/.claude/get-shit-done/` — inspected directory listing — `workflows/`, `templates/`, `references/`, `bin/`, `VERSION` confirmed

### Secondary (MEDIUM confidence)
- Claude Code slash command namespace discovery (`commands/namespace/command.md` → `/namespace:command`) — inferred from working GSD installation + directory structure; not verified against official Anthropic docs

### Tertiary (LOW confidence)
- Claude Code agent discovery from `~/.claude/agents/` (flat) vs. subdirectories — working assumption based on GSD behavior; Anthropic's official docs not consulted

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero-dependency Node.js built-ins verified against GSD source
- Architecture: HIGH — directory structure directly inspected from working GSD installation
- Pitfalls: MEDIUM — derived from code reading + known Node.js patterns; not all tested against Claude Code directly
- Slash command format: HIGH — confirmed from multiple GSD command files
- Agent format: HIGH — confirmed from live installed agent file

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (stable domain — Claude Code command format changes rarely)
