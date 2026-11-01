---
title: "Two DoS vulnerabilities in Eclair disclosed; fixed in version 0.14.0"
description: "In Eclair 0.13.1 and earlier, feature vectors were parsed bit by bit: one maximum-length init message generated about 300 MB of heap garbage and occupied the parsing thread for up to 300 ms (LNF-2026-0001). According to the researcher's description, a stream of such messages disconnects all the victim's peers within a minute and exhausts memory within five. The second issue (LNF-2026-0002) is that zlib-compressed channel queries are still accepted without an output size limit: a 64 KB query expands to 64 MB and around 17 million heap objects, and a stream of these messages takes the node offline in seconds. Both are fixed in Eclair 0.14.0."
pubDate: "2026-09-24T23:00:54.736Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "eclair"
vendor: "Delving Bitcoin"
action: "Check your Eclair version now: if it is below 0.14.0, update to 0.14.0 or later during this maintenance window — until you update, any peer can crash your node and disconnect its channels. No action is required for anyone already on 0.14.3. Advisory details are at the links in the post."
hijacked: false
incidentKey: "eclair|fp:a8e7db1954ddcadf"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-0/2914"},{"label":"lnfuzz.org","url":"https://lnfuzz.org/advisories/eclair-feature-parsing-dos/"},{"label":"lnfuzz.org","url":"https://lnfuzz.org/advisories/eclair-zlib-decompression-dos/"}]
---
