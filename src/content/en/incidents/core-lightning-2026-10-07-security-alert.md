---
title: "Core Lightning releases 26.06.9: another set of security fixes and a fix for the gossip regression in 26.06.8"
description: "Patch release 26.06.9 fixes vulnerabilities in channel reestablishment, splicing, HTLC handling during closure, onion, onchaind, gossip queries, runes and setconfig, plus a number of remote crashes. It also fixes a 26.06.8 regression that caused a busy node to throttle ordinary gossip, pings and onion messages, and delay channel traffic. Again there is no embargo: the fixes are available immediately, while their tests are temporarily withheld to allow time for updates. Reproducible arm64 and armv7 builds are now available with separate signed manifests."
pubDate: "2026-10-07T13:21:04.303Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "core lightning"
vendor: "Core Lightning (CLN)"
action: "Update your Core Lightning node to 26.06.9 now, without waiting for a maintenance window — technical details of the vulnerabilities will become public later. Verify signatures and checksums against the manifest for your architecture. Note that a restricted rune no longer creates new runes without those restrictions or returns blacklisted ones in the list, and listconfigs now hides passwords and wallet paths — adjust your automation. Nodes that have run master builds cannot be downgraded to 26.06.x."
hijacked: false
incidentKey: "core lightning|fp:694a1e3c1378c9b7"
parent: "core-lightning-2026-09-15-security-alert"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/ElementsProject/lightning/releases/tag/v26.06.9"}]
---
