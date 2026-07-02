import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'index.html',
  'src/App.tsx',
  'src/index.css',
  'src/components/Hero.tsx',
  'src/components/HowItWorks.tsx',
  'src/components/Features.tsx',
  'src/components/Setup.tsx',
  'src/components/Pricing.tsx',
  'public/downloads/roz-starter-package/README.md',
  'public/downloads/roz-starter-package/config/roz.example.yaml',
  'public/downloads/roz-starter-package/credential-flow.html',
];

const combined = files
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

const required = [
  'InferenceLab Agent Starter Kit',
  '$50',
  '10 minutes',
  'ChatGPT',
  'Google',
  'OAuth',
  'Telegram',
  '@RozAssistantBot',
  'Your personal AI assistant,',
  'running in 10 minutes.',
  'Meet Roz',
  'From zero to assistant in 3 steps',
  'Everything you need, built-in',
  'Frictionless Setup',
  'Start using Roz today',
  'Buy Now',
  'One-time purchase',
  'Mac & Windows Installers',
  'Local orchestration engine',
  'Telegram bot integration',
  'Email & Calendar skills',
  '15-minute setup guarantee',
  'Free future skill updates',
  'Mac or Windows',
  'one-time purchase code',
  'pre-canned demo',
  'OAuth-first setup',
  'already has a ChatGPT subscription',
  'installers/mac/Roz Installer.command',
  'installers/windows/Roz Installer.ps1',
  '[REDACTED]',
];

const forbidden = [
  'Total Tickets',
  'Kanban Board',
  'Karla',
  'Jim',
  'Paddler Early Access',
  'YOUR_REAL_API_KEY',
  'sk-',
  'ghp_',
  'gho_',
  'xoxb-',
  'AIza',
];

const missing = required.filter((text) => !combined.includes(text));
const stale = forbidden.filter((text) => combined.includes(text));

if (missing.length || stale.length) {
  console.error(JSON.stringify({ missing, stale }, null, 2));
  process.exit(1);
}

console.log(`Landing content contract passed (${required.length} required strings, ${forbidden.length} stale/secret-like strings forbidden).`);
