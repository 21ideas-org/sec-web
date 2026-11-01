---
title: "Bitcoin Core: peer can crash a node on Windows, macOS and BSD through TCP urgent data"
description: "According to Bitcoin Core's disclosure, platforms other than Linux use a select()-based socket monitoring backend that monitored exceptional socket conditions regardless of whether reading was paused. By sending TCP urgent (out-of-band) data, a malicious peer bypasses backpressure and forces the node to queue an unbounded amount of data; the source says that, in practice, this makes it trivial to crash any Windows, macOS or BSD node to which the attacker is connected. Severity is rated Medium; only the select() code path is affected, and Linux nodes are unaffected. Fixes were released in versions 29.5, 30.4, 31.2 and 32.1."
pubDate: "2026-10-28T18:31:22.448Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "bitcoin core"
vendor: "Bitcoin Core"
action: "Bitcoin Core node operators on Windows, macOS or BSD: if your installation lacks these fixes, update to 29.5, 30.4, 31.2 or 32.1 for your branch soon. Linux nodes are unaffected; installations that already have these fixes require no action."
hijacked: false
incidentKey: "bitcoin core|product-fp:cd10194486d7ba74"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"bitcoincore.org","url":"https://bitcoincore.org/en/2026/10/28/disclose-tcp-oom/"}]
---
