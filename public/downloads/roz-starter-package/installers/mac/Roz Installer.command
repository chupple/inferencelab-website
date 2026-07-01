#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

printf 'Roz macOS installer helper\n'
printf 'This opens the local OAuth-first setup app and checks Hermes if available.\n'
printf 'No API tokens are required on the website.\n\n'

if command -v hermes >/dev/null 2>&1; then
  printf 'Hermes found at: '
  command -v hermes
  hermes doctor || true
else
  printf 'Hermes was not found. You can install it with scripts/install-hermes.sh after reviewing the command.\n'
fi

if command -v python3 >/dev/null 2>&1; then
  python3 apps/roz_setup_app.py
else
  printf 'python3 is required to launch the Roz setup app.\n'
  exit 1
fi
