---
title: "Bitcoin Core discloses an undo-file position overflow: a miner can cause another node to stop"
description: "According to Bitcoin Core's disclosure, positions within rev*.dat were stored as 32-bit integers, while undo-file sizes were unrestricted: a miner can mine blocks with disproportionately large undo data, causing new records to overwrite old ones and the file to be truncated. During a reorg, the node then cannot read the undo data and shuts down; restarting does not help. On Windows and 32-bit systems, the node crashes during writing, even without a reorg, and does not start after a restart. The source classifies the issue as Low severity and considers exploitation on 64-bit systems practically infeasible (non-standard transactions, thousands of blocks, and precisely matching a particular node's file layout). The fix — 64-bit positions and 64-bit positioning calls on Windows — was released in 29.5, 30.4, 31.2 and 32.1; the on-disk format has not changed. According to the report, 32-bit systems and nodes whose blocks directory is on FAT32 remain affected even after updating."
pubDate: "2026-10-28T18:21:09.404Z"
statusTags: []
audience: ["node_operators"]
product: "bitcoin core"
vendor: "Bitcoin Core"
action: "Bitcoin Core node operators: if your installation lacks these fixes, update to 29.5, 30.4, 31.2 or 32.1 for your branch through the usual process; installations already fixed need no action. Updating does not resolve the issue on 32-bit systems or where the blocks directory is on FAT32 — according to the source's description, the node still stops when it reaches the file limit; for FAT32, move the blocks directory to a filesystem without the 4 GiB limit. If the node already fails to start because of corrupted undo data, the source indicates recovery through -reindex on a fixed version."
hijacked: false
incidentKey: "bitcoin core|product-fp:046ca36c75f596b5"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"bitcoincore.org","url":"https://bitcoincore.org/en/2026/10/28/disclose-undo-overflow/"}]
---
