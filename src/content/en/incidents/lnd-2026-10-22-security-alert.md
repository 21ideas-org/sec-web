---
title: "Lightning Labs: certificate authority compromise requires updates to lnd, btcd, tapd and litd"
description: "The project team reports a CVE related to the compromise of the eMudhra certificate authority and strongly recommends that users of lnd, btcd, tapd and litd either move to fresh release binaries or rebuild their own from source using Go 1.27.3. The trusted set of root certificates used by the node's TLS connections and related services is affected. While a node runs an old build, its connections trust certificates from the compromised authority."
pubDate: "2026-10-22T03:10:24.553Z"
statusTags: ["patch_available"]
audience: ["node_operators","developers"]
product: "lnd"
vendor: "LND"
action: "Update to the releases linked below today, or rebuild your binaries using Go 1.27.3. Do not put this off until a scheduled maintenance window: the advice comes from the project itself and applies to all four components."
hijacked: false
incidentKey: "lnd|CVE-2026-111943"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - lightning","url":"https://x.com/lightning/status/2113104345848021019"},{"label":"github.com","url":"https://github.com/lightningnetwork/lnd/releases/tag/v0.21.5-beta.rc1"},{"label":"github.com","url":"https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.7"},{"label":"github.com","url":"https://github.com/btcsuite/btcd/releases/tag/v0.27.0"},{"label":"github.com","url":"https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8"}]
---
