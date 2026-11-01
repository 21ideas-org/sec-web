---
title: "lnd developer recommends urgently updating lnd, btcd, tapd and litd because of CVE-2026-111943 (certificate authority compromise)"
description: "A post by the lead lnd developer discusses CVE-2026-111943 — the compromise of certificate authority eMudhra, which means the root certificate trusted in the builds can no longer be considered reliable. Users of lnd, btcd, tapd and litd are affected: the compromised CA undermines trust in the daemons' TLS connections, the channel carrying RPC connections and the node's external traffic. Releases built with a corrected trust set have already been published for all four projects; the alternative is to rebuild them yourself with Go 1.27.3."
pubDate: "2026-10-22T03:30:46.715Z"
statusTags: ["patch_available"]
audience: ["node_operators","developers"]
product: "lnd, btcd, tapd, litd"
vendor: "Amboss / Magma"
action: "Update lnd, btcd, tapd and litd to the releases linked in the post, or rebuild your binaries with Go 1.27.3 — do this today, without waiting for a scheduled maintenance window. If you build from source yourself, update the Go toolchain to the specified version before rebuilding."
hijacked: false
incidentKey: "amboss / magma|CVE-2026-111943"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - ambosstech","url":"https://x.com/ambosstech/status/2113108185309454469"},{"label":"github.com","url":"https://github.com/lightningnetwork/lnd/releases/tag/v0.21.5-beta.rc1"},{"label":"github.com","url":"https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.7"},{"label":"github.com","url":"https://github.com/btcsuite/btcd/releases/tag/v0.27.0"},{"label":"github.com","url":"https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8"}]
---
