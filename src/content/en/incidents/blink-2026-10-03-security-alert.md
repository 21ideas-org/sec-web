---
title: "Blink publishes an analysis of the September 19 attack: 35 custodial accounts taken over, 6.61 BTC withdrawn"
description: "Since October 2023, anyone with a free Blink account could use a browser to grant themselves support privileges: change another account's email and phone number, log in as its owner and raise its limits — three authorization flaws in the admin tools. On September 19, an attacker took over 35 accounts and withdrew about 6.61 BTC from 24 of them, and also viewed data (in some cases a phone number or email) for another 3817 accounts; this did not include names, documents, passwords or seed phrases. The money came from the hot wallet; cold multisig storage and non-self... non-custodial accounts were not affected. All 22 affected customers had their balances reimbursed by shareholders. None of the 24 drained accounts had two-factor authentication, and nine withdrawal attempts from accounts with 2FA (18 attempts) resulted in zero losses."
pubDate: "2026-10-03T17:01:29.080Z"
statusTags: ["exploitation_confirmed"]
audience: ["holders","developers"]
product: "blink wallet"
vendor: "Blink Wallet"
action: "If you have a custodial Blink account, enable two-factor authentication today in the app's security settings, and separately enable it on the linked email account. Ignore any emails and text messages about this incident that contain links: according to the vendor, it contacted affected users only through in-app messages and never asks for a PIN, password, seed phrase or login code. If you are a developer running code derived from their open-source codebase, review the admin panel's authorization checks using the technical details in the analysis — linked in the post."
hijacked: false
incidentKey: "blink wallet|product-fp:4db727045e502979"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - blinkbtc","url":"https://x.com/blinkbtc/status/2106429174931939487"},{"label":"www.blink.sv","url":"https://www.blink.sv/blog/sept-19-attack-postmortem-and-bounty"}]
---
