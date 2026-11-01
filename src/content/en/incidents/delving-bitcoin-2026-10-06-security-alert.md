---
title: "DoS vulnerabilities disclosed in Eclair, fixed in version 0.14.1"
description: "A disclosure has been published for DoS vulnerabilities in the Lightning implementation Eclair; the fix was released in version 0.14.1. Operators of their own Eclair nodes are affected: denial of service means node unavailability and a risk of channels becoming inoperable. According to the source, users of mobile wallets that use an Eclair node as an LSP (such as Phoenix) are not affected — ACINQ patched its own nodes several months ago."
pubDate: "2026-10-06T14:00:11.169Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "eclair"
vendor: "Delving Bitcoin"
action: "If you run your own Eclair node, update to 0.14.1 now, without waiting for a scheduled maintenance window; after updating, check that the node has started and channels are active. Disclosure details are linked below."
hijacked: false
incidentKey: "eclair|fp:0f8f26ee8a2802e8"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-1/2928#post_3"}]
---
