---
title: "Electrum: a malicious server substitutes a just-sent transaction to steal funds when the fee is bumped"
description: "According to the advisory, a server connected to a lightweight client can “swallow” a broadcast transaction and show a conflicting forgery in the history with the same inputs but an output to the attacker's address; the forged transaction's signatures were not checked because of the lightweight client's design. If the user manually increases the fee on that transaction, they sign and fund a transfer to the attacker. The developers report that some servers are carrying out this attack in practice: they received two private reports from users, one of whom lost funds; the forged address was chosen so that its last four characters matched those of the legitimate address. The fix is included in version 4.8.3 — the client verifies signatures for its own (is_mine) inputs in mempool transactions; “incoming” transactions with other people's inputs are still not validated. The advisory is linked in the post."
pubDate: "2026-10-24T13:01:19.260Z"
statusTags: ["exploitation_confirmed","patch_available"]
audience: ["holders"]
product: "electrum"
vendor: "Electrum"
action: "This affects Electrum users connecting through public servers. Update to 4.8.3 (binaries have been released) without delay. Until you update: check recipient addresses and amounts when signing any transaction, including a fee bump — matching final characters of an address prove nothing; if an unknown transaction appears in your history in place of yours, do not bump its fee. Those connecting only to their own or a trusted server are not affected; no additional action is required on 4.8.3 with this fix."
hijacked: false
incidentKey: "electrum|GHSA-6JP4-8V48-CC5V"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/spesmilo/electrum/security/advisories/GHSA-6jp4-8v48-cc5v"}]
---
