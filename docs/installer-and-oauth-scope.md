# Roz Installer and OAuth Scope

## Clinton edits incorporated

- Position the product for buyers who already have a ChatGPT subscription.
- Do not position setup as token/API-key based.
- Use OAuth-style sign-in for ChatGPT/OpenAI and Google wherever supported.
- Provide Mac and Windows installer helpers.
- Make Telegram the simple user-facing way to message Roz.

## Installer scope

### macOS

- Package path: `public/downloads/roz-starter-package/installers/mac/Roz Installer.command`
- Behavior: double-click helper, check Hermes, launch `apps/roz_setup_app.py`.

### Windows

- Package path: `public/downloads/roz-starter-package/installers/windows/Roz Installer.ps1`
- Behavior: PowerShell helper, check Hermes, launch `apps/roz_setup_app.py` using Python.

These are script-level installer helpers, not signed `.dmg` / `.exe` installers yet. A future public launch can wrap them in signed installers once distribution and code-signing choices are settled.

## Telegram onboarding logistics

- Prebuild a Roz onboarding bot controlled by InferenceLab.
- Shopify purchase generates a one-time setup code.
- Buyer messages the prebuilt Telegram bot with the setup code.
- Bot verifies the code, captures Telegram user ID/handle, and adds the user to the Roz allowlist.
- Bot sends download and first-use instructions.
- If onboarding fails, buyer uses the 15-minute setup-call guarantee.

## Security boundary

No passwords, API keys, OAuth client secrets, access tokens, checkout credentials, or connection strings should appear in website source, package docs, support screenshots, or public copy. Examples use `[REDACTED]` only.
