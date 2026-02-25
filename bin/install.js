#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const pkg = require('../package.json');

// ANSI color constants
const cyan    = '\x1b[36m';
const green   = '\x1b[32m';
const yellow  = '\x1b[33m';
const dim     = '\x1b[2m';
const reset   = '\x1b[0m';

// Banner
console.log('');
console.log(cyan + '  ██████╗ ██╗   ██╗███████╗████████╗' + reset);
console.log(cyan + '  ██╔════╝ ╚██╗ ██╔╝██╔════╝╚══██╔══╝' + reset);
console.log(cyan + '  ██║  ███╗ ╚████╔╝ ███████╗   ██║   ' + reset);
console.log(cyan + '  ██║   ██║  ╚██╔╝  ╚════██║   ██║   ' + reset);
console.log(cyan + '  ╚██████╔╝   ██║   ███████║   ██║   ' + reset);
console.log(cyan + '   ╚═════╝    ╚═╝   ╚══════╝   ╚═╝   ' + reset);
console.log('');
console.log('  ' + dim + 'Get Your Shit Together' + reset + '  ' + dim + 'v' + pkg.version + reset);
console.log('  ' + dim + 'One command. One session. One testable hypothesis.' + reset);
console.log('');

// Install target paths
const homeDir    = os.homedir();
const configDir  = path.join(homeDir, '.claude');
const gystDir    = path.join(configDir, 'get-your-shit-together');
const commandsDir = path.join(configDir, 'commands', 'gyst');
const agentsDir  = path.join(configDir, 'agents');

// Repo root (one level up from bin/)
const repoRoot = path.join(__dirname, '..');

/**
 * Recursively copy a directory from src to dest.
 * Creates dest if it does not exist.
 */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Perform the installation — copy package files to ~/.claude/
 */
function install() {
  console.log(dim + '  Installing to ' + gystDir + reset);
  console.log('');

  // Create all target directories
  fs.mkdirSync(gystDir,     { recursive: true });
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.mkdirSync(agentsDir,   { recursive: true });

  // Copy get-your-shit-together/ → ~/.claude/get-your-shit-together/
  const gystSrc = path.join(repoRoot, 'get-your-shit-together');
  if (fs.existsSync(gystSrc)) {
    copyDir(gystSrc, gystDir);
    console.log(green + '  [OK] Workflows and templates copied to ' + gystDir + reset);
  } else {
    console.log(yellow + '  [SKIP] get-your-shit-together/ not found — skipping workflow copy' + reset);
  }

  // Copy commands/gyst/ → ~/.claude/commands/gyst/
  const commandsSrc = path.join(repoRoot, 'commands', 'gyst');
  if (fs.existsSync(commandsSrc)) {
    copyDir(commandsSrc, commandsDir);
    console.log(green + '  [OK] Slash commands copied to ' + commandsDir + reset);
  } else {
    console.log(yellow + '  [SKIP] commands/gyst/ not found — skipping command copy' + reset);
  }

  // Copy agent file to flat agents/ discovery path
  const agentSrc  = path.join(repoRoot, 'get-your-shit-together', 'agents', 'gyst-researcher.md');
  const agentDest = path.join(agentsDir, 'gyst-researcher.md');
  if (fs.existsSync(agentSrc)) {
    fs.mkdirSync(agentsDir, { recursive: true });
    fs.copyFileSync(agentSrc, agentDest);
    console.log(green + '  [OK] Agent copied to ' + agentDest + reset);
  } else {
    console.log(yellow + '  [SKIP] gyst-researcher.md not found — skipping agent copy' + reset);
  }
}

/**
 * Print final success message with next steps.
 */
function finish() {
  console.log('');
  console.log(green + '  Installation complete!' + reset);
  console.log('');
  console.log('  Next step:');
  console.log(cyan + '  Open any directory in Claude Code and run /gyst:foundation-sprint' + reset);
  console.log('');
}

/**
 * Prompt the user for yes/no confirmation.
 * Auto-approves (defaultYes) if stdin is not a TTY.
 *
 * @param {string}   question    - Question to display
 * @param {boolean}  defaultYes  - Use true as default on empty input
 * @param {function} callback    - Called with boolean answer
 */
function promptConfirm(question, defaultYes, callback) {
  if (!process.stdin.isTTY) {
    callback(true);
    return;
  }

  const hint = defaultYes ? '[Y/n]' : '[y/N]';
  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
  });

  rl.question('  ' + question + ' ' + hint + ' ', function(answer) {
    rl.close();
    const trimmed = answer.trim().toLowerCase();
    if (trimmed === '') {
      callback(defaultYes);
    } else if (trimmed === 'y' || trimmed === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
}

// ---- Main ----

if (!process.stdin.isTTY) {
  // Non-interactive (e.g. npx pipe) — auto-install
  install();
  finish();
} else {
  console.log('  Install target: ' + dim + gystDir + reset);
  console.log('');
  promptConfirm('Install GYST to ~/.claude/get-your-shit-together/?', true, function(confirmed) {
    if (confirmed) {
      install();
      finish();
    } else {
      console.log('');
      console.log(yellow + '  Installation cancelled.' + reset);
      console.log('');
      process.exit(0);
    }
  });
}
