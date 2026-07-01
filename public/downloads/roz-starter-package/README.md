# Roz Starter Package

Roz is the personal assistant base model for the InferenceLab Agent Starter Kit. This package is designed for a moderately technical buyer who already has a ChatGPT subscription and wants a working assistant without building an agent stack from scratch.

## What is included

- A guided personal-assistant first run using pre-canned demo data for email, calendar, files, Telegram, and local setup.
- A Hermes-oriented setup path for people who have heard about OpenClaw but want a packaged first experience.
- A small local OAuth-first setup app: `apps/roz_setup_app.py`.
- Mac and Windows installer helpers: `installers/mac/Roz Installer.command` and `installers/windows/Roz Installer.ps1`.
- A Hermes installer helper script: `scripts/install-hermes.sh`.
- A sanitized Hermes/Roz profile template: `config/hermes-profile.template.yaml`.
- A Telegram onboarding design where buyers message a prebuilt Roz bot with a one-time setup code before download/allowlisting.
- A service connection checklist for ChatGPT/OpenAI, Google, Telegram, and optional app integrations.

## What is not included

- No passwords.
- No API keys.
- No OAuth client secrets.
- No access tokens.
- No private checkout credentials.
- No connection strings.

Any credential value shown in examples must remain `[REDACTED]` or a placeholder.

## First-run flow

1. Buy the starter kit and receive a one-time setup code.
2. Message the prebuilt Roz Telegram onboarding bot with the setup code so your Telegram user ID can be allowlisted.
3. Download and unzip the Roz starter package.
4. Run the pre-canned demo first:
   ```bash
   scripts/run-pre-canned-demo.sh
   ```
5. Run the installer helper for your OS:
   - macOS: double-click `installers/mac/Roz Installer.command`
   - Windows: right-click `installers/windows/Roz Installer.ps1` and run with PowerShell
6. Use the setup app to complete OAuth-style sign-in for ChatGPT/OpenAI and Google.
7. Message Roz on Telegram and approve the first drafts before sending anything.
8. If you are not up and running in 15 minutes, use the setup-call link from the website.

## Shopify delivery scope

The package can be attached to Shopify as a Digital Downloads file or supported post-purchase access link. The preferred launch flow is: Shopify purchase → one-time setup code → Telegram onboarding bot → allowlist → installer/package access.
