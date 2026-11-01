---
title: "Two DoS vulnerabilities in Eclair channel opening fixed in v0.14.1"
description: "Two vulnerabilities have been disclosed in the channel-opening flow in Eclair v0.14.0 and earlier. The first (LNF-2026-0003) is a race condition when checking for duplicate temporary_channel_id values: pipelining identical open_channel messages creates orphaned channel actors, and a leak of about 1 MB per second leads to JVM OOM or a garbage collection spiral that takes the node offline. The second bypasses the limit on uncommitted channels by reusing a final channel ID as a temporary one: a single connection with no on-chain cost exhausted 4 GB of heap in about 48 minutes, and because channels are saved to disk, the node crashed again on every restart until the operator increased the heap or manually deleted records. Operators of Lightning nodes running Eclair are affected."
pubDate: "2026-10-01T19:01:26.560Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "eclair"
vendor: "Delving Bitcoin"
action: "Update Eclair to v0.14.1 or later to protect against the described DoS attacks. The source describes repeated startup crashes caused by saved unfinished channels but does not provide a safe database cleanup procedure in this message. Do not manually delete channel records based on this brief announcement. Disclosure details are available at the links in the post."
hijacked: false
incidentKey: "eclair|fp:147f70ef607d6408"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-1/2928"},{"label":"lnfuzz.org","url":"https://lnfuzz.org/advisories/eclair-open-channel-race-dos/"},{"label":"morehouse.dev","url":"https://morehouse.dev/lightning/fake-channel-dos/"},{"label":"erickcestari.dev","url":"https://erickcestari.dev/blog/eclair-oom-pending-channels/"}]
---
