# Shopify checkout, authentication, and access scope

## Confirmed launch fit

- **Checkout:** Shopify can sell the $50 Roz starter package as a digital product or service. Shipping should be disabled for the product.
- **Post-purchase package access:** Shopify's Digital Downloads app can deliver a file, a ZIP archive, or a supported hosted access link after purchase.
- **Scheduling access:** The setup-call CTA can be delivered as a post-purchase link using a booking app or a supported booking provider link such as Calendly/Acuity until the final scheduling provider is chosen.
- **Customer accounts:** New Shopify customer accounts cover order history, order status, profile pages, and authenticated customer account pages.
- **Customer Account API:** Shopify's Customer Account API is OAuth/OIDC based and uses discovery endpoints plus PKCE for public clients. It is useful for customer-scoped data and authenticated actions, but it is not a substitute for Roz's local GUI credential flow.
- **Multipass:** Multipass is legacy-customer-account only and requires Shopify Plus, so it should not be assumed for the first live checkout.

## Recommended public-launch wiring

1. Create the Shopify digital product/service for the $50 starter kit.
2. Disable shipping for that product.
3. Attach `roz-starter-package.zip` or a hosted package link through Digital Downloads.
4. Replace the website mailto purchase CTA with the live Shopify checkout/product link.
5. Replace the setup-call placeholder with the chosen Cal.com, Calendly, Acuity, or Shopify booking-app link.
6. Keep all buyer service credentials in the local Roz GUI credential flow; do not collect them in Shopify or on the marketing website.

## Security boundary

No real passwords, tokens, API keys, OAuth secrets, checkout credentials, or connection strings belong in the website, package docs, or support screenshots. Use `[REDACTED]` in examples.
