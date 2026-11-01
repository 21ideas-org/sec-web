---
title: "Blockstream: Elements consensus bug exploited to issue unbacked LBTC and withdraw about 4000 BTC from Liquid's reserve"
description: "On September 6, 2026, an attacker exploited a vulnerability in Elements' rangeproof verification cache: according to Blockstream's report, the attack used Bug B — an error in constructing the cache key when combining fields. This allowed about 4000 LBTC to be issued without backing bitcoin, after which the funds left through the standard peg-out process; Liquid's reserve fell from about 4205 BTC to 197 BTC. The attacker returned 3400 BTC, while about 602 BTC remains unreturned; other Liquid assets (USDt, DePix and others) were not affected, but were unavailable during the network halt. Blockstream stopped the bridge nodes, rolled out an urgent temporary patch and then released the reviewed Elements v23.3.4."
pubDate: "2026-09-23T22:00:37.238Z"
statusTags: ["exploitation_confirmed","patch_available"]
audience: ["holders","node_operators"]
product: "elements"
vendor: "Blockstream"
action: "Elements/Liquid node operators should update to Elements v23.3.4 immediately, without waiting for a scheduled window: the vulnerability was confirmed to have been exploited on mainnet, and older builds may diverge from the network in their validation results. LBTC holders should account for the fact that part of the reserve has not been restored, and check peg-out availability before large operations; the report and release are linked in the post."
hijacked: false
incidentKey: "elements|fp:5403d639f60eedad"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"blog.blockstream.com","url":"https://blog.blockstream.com/liquid-network-security-incident-assessment/"},{"label":"github.com","url":"https://github.com/ElementsProject/elements/releases/tag/elements-23.3.4?ref=blog.blockstream.com"}]
---
