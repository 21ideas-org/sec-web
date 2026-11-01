---
title: "Core Lightning: gossip announcement with identical node_id values crashes the node; fixed in v26.04.1"
description: "The disclosure describes Core Lightning versions v25.02–v26.04 crashing on receipt of a channel_announcement whose node_id_1 and node_id_2 identify the same node: gossipd does not check that the endpoints differ, triggering a duplicate assertion. The announcement is written to gossip_store before loading, so the crash repeats on every restart and the node stays offline until the operator manually removes the entry. All an attacker needs is a controlled, unspent 2-of-2 output, so the cost amounts to the on-chain fee. According to the disclosure, the fix was released in v26.04.1; the current release at the time of publication is v26.06.9."
pubDate: "2026-10-24T07:00:16.791Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "core lightning"
vendor: "Delving Bitcoin"
action: "Update Core Lightning to at least v26.04.1, preferably to the current release v26.06.9. If the node is already stuck in a startup crash loop, manually remove the problematic entry from gossip_store before starting it. Technical details and the release link are linked below."
hijacked: false
incidentKey: "core lightning|fp:eb68b182e9106d2e"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"delvingbitcoin.org","url":"https://delvingbitcoin.org/t/cln-self-referential-channel-announcement-dos-disclosure/2974"},{"label":"nishantbansal2003.github.io","url":"https://nishantbansal2003.github.io/posts/CLN-Self-Referential-Channel-Announcement-DoS/"},{"label":"github.com","url":"https://github.com/ElementsProject/lightning/releases/tag/v26.04.1"}]
---
