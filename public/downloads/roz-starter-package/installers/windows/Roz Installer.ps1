# Roz Windows installer helper
# Run from the unzipped Roz starter package folder.
# This helper launches the OAuth-first setup app. No API-token setup is required on the website.

Write-Host "Roz Windows installer helper"
Write-Host "This opens the local OAuth-first setup app and checks whether Hermes is available."
Write-Host "Use your existing ChatGPT/OpenAI account, Google OAuth, and Telegram onboarding code."

$hermes = Get-Command hermes -ErrorAction SilentlyContinue
if ($hermes) {
  Write-Host "Hermes found at: $($hermes.Source)"
  hermes doctor
} else {
  Write-Host "Hermes was not found. Review scripts/install-hermes.sh or Hermes Windows/WSL setup instructions before continuing."
}

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
  $python = Get-Command python3 -ErrorAction SilentlyContinue
}

if ($python) {
  & $python.Source "apps/roz_setup_app.py"
} else {
  Write-Host "Python is required to launch the Roz setup app. Install Python 3, then rerun this helper."
  exit 1
}
