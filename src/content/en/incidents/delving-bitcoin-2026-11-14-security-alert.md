---
"title": "Core Lightning: duplicate funding outpoint can crash nodes, fixed in v26.06.8"
"description": "Disclosure LNF-2026-0004 says Core Lightning v0.12.0 through v26.06.7 accepts a funding_created that reuses another channel's funding outpoint, so the two channels share a v1 channel_id. If both channels are live, reconnecting trips an assertion in connectd and crashes the node, at no cost to the attacker and repeatably on every restart. If the first channel is already closed, closing the second trips an assertion in lightningd, and the node crash-loops on restart until upgraded, at the cost of only on-chain fees to the attacker. The issue was found by fuzzing the funding flow; the closed-channel variant was found separately. The fix is in Core Lightning v26.06.8."
"pubDate": "2026-11-14T20:00:41.015Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "core lightning"
"vendor": "Delving Bitcoin"
"action": "Core Lightning node operators running v0.12.0 through v26.06.7: upgrade to at least v26.06.8; the source advises installing the latest release. If your node is already crash-looping on every start, upgrading is what the source describes as the way out. Installations that already include this fix need no action."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "core lightning|fp:8184091757ff7bc6"
"enPublishedAt": "2026-11-14T20:20:10.580Z"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/disclosure-dos-vulnerability-fixed-in-core-lightning-v26-06-8/3072"
  - "label": "lnfuzz.org"
    "url": "https://lnfuzz.org/advisories/cln-duplicate-funding-outpoint-dos/"
---
