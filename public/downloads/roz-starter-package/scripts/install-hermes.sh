#!/usr/bin/env bash
set -euo pipefail

printf 'Roz starter package: Hermes installer helper\n'
printf 'This script installs Hermes Agent from the official Nous Research installer, then opens the setup wizard.\n'
printf 'No package credentials are embedded here. Values entered during setup remain on your local machine.\n\n'

if command -v hermes >/dev/null 2>&1; then
  printf 'Hermes already found at: '
  command -v hermes
else
  printf 'Installing Hermes Agent...\n'
  curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
fi

printf '\nRunning Hermes health check...\n'
hermes doctor || true

printf '\nOpening Hermes setup wizard. Use the GUI app for local credential placeholders and run the pre-canned demo first if unsure.\n'
hermes setup
