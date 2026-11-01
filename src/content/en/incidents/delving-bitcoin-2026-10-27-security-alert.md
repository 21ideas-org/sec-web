---
title: "Bitcoin Core v31.1: fixed a path where -privatebroadcast mode could connect over clearnet"
description: "The release discussion reports that v31.1 fixes a path where a connection in -privatebroadcast mode could go over clearnet despite a private network being enabled. The author advises everyone using this mode to update without delay. The message contains no details of the defect or information about exploitation."
pubDate: "2026-10-27T16:00:15.553Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "bitcoin core"
vendor: "Delving Bitcoin"
action: "If your node starts with -privatebroadcast and does not have these fixes, update to the release specified in the message soon. Until you update, do not rely on this mode as a guarantee of broadcast privacy: broadcasts could go outside the private network. Installations that do not use the mode, and those that already contain this fix, need no action."
hijacked: false
incidentKey: "bitcoin core|fp:657c8748c4d4e4af"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/bitcoin-core-v31-1-released/2696#post_2"}]
---
