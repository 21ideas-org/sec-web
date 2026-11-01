---
title: "Two DoS vulnerabilities in Eclair channel opening fixed in v0.14.1"
description: "Two issues have been found in the channel-opening flow in Eclair v0.14.0 and earlier. The first (LNF-2026-0003) is a race condition when checking for a duplicate temporary_channel_id: a stream of identical open_channel messages creates orphaned channel actors and a memory leak of roughly one megabyte per second, leading to a JVM OOM crash or a garbage-collection hang that takes the node offline. The second bypasses the pending-channel limiter by reusing the final channel id as a temporary one: a single connection, with no on-chain cost, exhausted 4 GB of heap in about 48 minutes, and because the channels are saved to disk, the node crashed again on every restart until manual cleanup or a heap increase. The attacks require only a connection to the node; the report provides no evidence of exploitation on the network."
pubDate: "2026-10-01T19:01:26.560Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "eclair"
vendor: "Delving Bitcoin"
action: "Update Eclair to v0.14.1 or newer to protect against the described DoS attacks. The source describes repeated startup crashes caused by saved pending channels, but does not provide a safe database cleanup procedure in this report. Do not manually delete channel records based on this brief announcement. Disclosure details are linked in the post."
hijacked: false
incidentKey: "eclair|fp:168da24e92097d16"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-1/2928#post_1"},{"label":"lnfuzz.org","url":"https://lnfuzz.org/advisories/eclair-open-channel-race-dos/"},{"label":"morehouse.dev","url":"https://morehouse.dev/lightning/fake-channel-dos/"},{"label":"erickcestari.dev","url":"https://erickcestari.dev/blog/eclair-oom-pending-channels/"}]
---
