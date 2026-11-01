---
title: "Bitcoin Core: unbounded memory growth caused by “paused” peers without BIP 31 support"
description: "Bitcoin Core adds announcements to the send queue even for peers marked as paused because the queue is full. Peers that do not support nonced ping (BIP 31) are not disconnected after the 20-minute timeout, so a malicious peer can pretend to be one and deliberately read messages slowly — memory grows without limit, estimated by the source at up to 2 MB per hour per inbound peer and up to 5 MB per hour per outbound peer. The project rates the issue as Medium severity and easy to detect; nodes using -blocksonly are affected significantly less because transaction announcements make up most of the queue. Fixes have been released in versions 29.5, 30.4, 31.2 and 32.1."
pubDate: "2026-10-28T18:21:09.404Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "bitcoin core"
vendor: "Bitcoin Core"
action: "Bitcoin Core node operators: if your installation lacks these fixes, update to 29.5, 30.4, 31.2 or 32.1 (for your branch) soon, using the usual node shutdown and startup procedure. Nodes using -blocksonly are affected less, but still need the fix. No action is required for anyone already running a build with this fix. Details are in the advisory linked in the post."
hijacked: false
incidentKey: "bitcoin core|product-fp:b2c399571c371a0d"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"bitcoincore.org","url":"https://bitcoincore.org/en/2026/10/28/disclose-fpausesend-oom/"},{"label":"github.com","url":"https://github.com/bitcoin/bitcoin/pull/36667"}]
---
