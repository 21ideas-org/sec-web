---
title: "Bitcoin Core 32.1: the same -privatebroadcast IP-leak fix reaches the new major branch; 29.x and older versions reach end of support"
description: "The release announcement says a path has been fixed where a transaction sent through sendrawtransaction with -privatebroadcast=1 could go directly over IPv4/IPv6 when falling back from P2P v2 to v1, bypassing the enforced route through the Tor proxy. Additionally: build 32.0 was tagged but never fully released, and branches 29.x and older have been declared End of Life and will receive no further updates; the source promises disclosure in two weeks of medium- and high-severity vulnerabilities fixed in 30.0 (3 in total)."
pubDate: "2026-10-28T16:00:10.554Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "bitcoin core"
vendor: "Delving Bitcoin"
action: "If your node runs 29.x or older, it will receive no further updates, so plan a move to a supported release; do not use build 32.0, as it was not released. Procedure: stop the node, wait for it to shut down completely (sometimes several minutes), then run the installer (Windows) or copy Bitcoin-Qt (macOS) or bin/ and libexec/ (Linux); when moving from an EOL version, migrating the data directory may take time. Those who already have these fixes available need no additional action."
hijacked: false
incidentKey: "bitcoin core|fp:657c8748c4d4e4af"
parent: "delving-bitcoin-2026-10-27-security-alert"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/bitcoin-core-v32-1-released/3008"},{"label":"bitcoincore.org","url":"https://bitcoincore.org/bin/bitcoin-core-32.1/"}]
---
