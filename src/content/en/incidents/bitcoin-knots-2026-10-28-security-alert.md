---
title: "Bitcoin Knots 29.4.3: coinbase maturity soft fork extended; nodes and miners should update before block 979919"
description: "The release extends the long coinbase maturity soft fork deployed in 29.4.2: rewards for blocks 979919 and later are delayed further, while the 45-day maturity for the 973440–979918 epoch is retained. According to the authors, starting at block 980019, a node on 29.4.2 may accept blocks that this version rejects, and miners on 29.4.2 may produce such blocks from block 986399. The release also fixes a crash during an RPC call and a wallet crash during importdescriptors with a range; the source separately describes known transaction virtual size bugs and the lack of updated translations."
pubDate: "2026-10-28T06:11:29.634Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "bitcoin knots"
vendor: "Bitcoin Knots"
action: "If you run a node or mine with Bitcoin Knots, update to 29.4.3 before block 979919. Stop the old version, wait for it to shut down completely, then run the installer (Windows) or copy the application/daemon binaries (macOS, Linux). A 29.4.2 node updated after block 979919 will recheck blocks from that height on first launch; a switch from 29.4.1 or another implementation will recheck from block 973440. A pruned node updated late may require synchronization from scratch; you will be prompted about this at startup. Those who have already updated require no action."
hijacked: false
incidentKey: "bitcoin knots|product-fp:e95fce992e4018e3"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/bitcoinknots/bitcoin/releases/tag/v29.4.3.knots20260508"}]
---
