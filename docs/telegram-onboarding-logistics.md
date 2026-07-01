# Roz Telegram Onboarding Logistics

## Goal

Make messaging Roz feel prebuilt for the buyer. The buyer should not create a Telegram bot or paste bot tokens. They should buy the kit, message a prebuilt Roz onboarding bot, verify with a one-time setup code, and receive the download/onboarding path.

## Proposed flow

1. Shopify purchase completes.
2. Shopify or the fulfillment app generates a one-time setup code tied to the order email.
3. Confirmation page/email says: “Message the Roz onboarding bot on Telegram and send this setup code.”
4. Buyer messages the prebuilt Roz onboarding bot.
5. Bot verifies the setup code server-side, captures Telegram user ID and handle, and adds that user ID to the Roz allowlist.
6. Bot sends the package download link, Mac/Windows installer choices, and first message prompt.
7. Buyer installs Roz and signs in through OAuth-style ChatGPT/OpenAI and Google flows locally.

## Why this is simpler

- The buyer does not create a bot.
- The buyer does not paste a Telegram bot token.
- The buyer does not edit an allowlist file.
- The buyer uses a familiar message flow plus a one-time purchase code.

## Implementation notes

- Prebuild one Roz onboarding bot controlled by InferenceLab.
- Treat the setup code as proof of purchase, not as an API token.
- Store only Telegram user ID, order ID/email hash, and code redemption state.
- Mark codes single-use and expiring.
- Keep support fallback: if Telegram onboarding fails, the buyer can schedule the 15-minute setup call.

## Open decisions

- Where to generate and store setup codes: Shopify app, lightweight backend, or fulfillment service.
- Whether the Roz runtime uses one shared Telegram bot with allowlisted users or one bot per buyer later.
- How to rotate/revoke a buyer's Telegram access on refund.
- Which deployment host stores the allowlist before public launch.
