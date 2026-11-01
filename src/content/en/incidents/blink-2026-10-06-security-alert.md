---
title: "Tampering with scopes in Galoy/Blink OAuth consent gave any client admin privileges; September attack took over 35 accounts and withdrew funds from 24"
description: "The Galoy/Blink consent application accepted a scope list directly from a browser form without checking it against what the OAuth client had requested, allowing an ordinary registered user to obtain a token with a full set of administrative privileges. In affected deployments, the admin gateway and admin GraphQL API trusted these scopes without their own checks, allowing access to customer data (balances, history, contacts, login methods), email and phone changes, and account takeover through passwordless login. No compromise of signing keys was required: the identity provider itself issued the tokens, so signature verification does not detect the attack. According to the incident analysis, this method was used to take over 35 custodial accounts at Blink in September 2026 and withdraw about 6.61 BTC from 24 of them."
pubDate: "2026-10-06T14:40:39.201Z"
statusTags: ["exploitation_confirmed","patch_available"]
audience: ["holders","node_operators"]
product: "galoy/blink stack"
vendor: "Blink Wallet"
action: "Operators of Galoy/Blink deployments should update now to version 0.22.65 or a later version that retains the fix (or backport the consent and admin API fixes), updating both components; keep the dedicated admin-audience value enabled and do not use the option to disable it. Also fix the production gateway configuration: remove the route forwarding client tokens to the admin API, and restrict the admin API to a VPN or private network as a temporary measure. Then check issued grants and tokens for unexpected administrative scopes, revoke unauthorized grants, access tokens and refresh tokens, terminate sessions and restore changed contact details using a verified procedure — the patch does not revoke privileges already issued. Anyone holding funds in custodial accounts with these services should check their account contact details and transaction history, and contact the operator if anything differs."
hijacked: false
incidentKey: "blink wallet|GHSA-W9WX-P7XR-7JVP"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/blinkbitcoin/blink/security/advisories/GHSA-w9wx-p7xr-7jvp"}]
---
