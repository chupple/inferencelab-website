import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'index.html',
  'src/App.tsx',
  'src/index.css',
  'package.json',
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
  'pre-canned demo',
  'moderately technical',
  'OpenClaw',
  'Roz first-run console',
  'See Roz handle a workday',
  'Built around your workday',
  'Your personal AI assistant, running in 10 minutes',
  'Meet Roz',
  'From zero to assistant in 3 steps',
  'Magic Patterns direction applied',
  'Start using Roz today',
  'Obvious value in your first session',
  'You are not buying a business idea',
  'Start your day with a ranked plan',
  'Stop context switching between apps',
  'Try it before connecting real accounts',
  'guided personal-assistant',
  'screenshot-style preview',
  'What can agents do?',
  'Email triage and drafting',
  'Calendar scheduling',
  'File organization',
  'Local setup help',
  'App/API integrations',
  'If you aren',
  'up and running in 15 mins schedule a call',
  'Schedule setup call',
  'Shopify checkout, accounts, and access scope',
  'Customer Account API',
  'Multipass',
  'Shopify Plus',
  'Digital Downloads',
  'post-purchase',
  'OAuth-first setup',
  'Small setup app',
  'checks/installs Hermes',
  'apps/roz_setup_app.py',
  'scripts/install-hermes.sh',
  'hermes-profile.template.yaml',
  'existing ChatGPT subscription',
  'OAuth-first setup',
  'OAuth-style sign-in',
  'Simple setup, not token setup',
  'Message Roz on Telegram',
  'Telegram onboarding logistics',
  'Mac installer',
  'Windows installer',
  'one-time setup code',
  'prebuilt Roz onboarding bot',
  'installers/mac/Roz Installer.command',
  'installers/windows/Roz Installer.ps1',
  'starter kit',
  'downloads/roz-starter-package.zip',
  'downloads/roz-starter-package/README.md',
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
