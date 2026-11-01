---
title: "Duplicate payment hash values in BOLT11 invoices: library disagreement has already led to theft from an LN service"
description: "A BOLT11 invoice could contain multiple payment hash values, and different libraries selected different ones: some the first, others the last. If a system combined both interpretations, it considered a payout unsuccessful after the payment had actually been made, allowing the balance to be drained through repeated withdrawals. According to the post, this is how a popular Telegram P2P bot was hacked and funds were lost. A specification change has been proposed to reject invoices with more than one payment hash; test vectors have been updated."
pubDate: "2026-09-18T23:20:52.616Z"
statusTags: ["exploitation_confirmed"]
audience: ["node_operators","developers","merchant_infra"]
product: "bolt11"
vendor: "Stacker News"
action: "Check how your stack parses BOLT11: compare the behavior of all libraries and the node you use on an invoice with multiple payment hash values. Reject such invoices on input and always check the paid hash against the one you expected before treating a payout as unsuccessful. Check automated withdrawal logs for discrepancies between claimed payments and those actually made. Details of the specification change are linked below."
hijacked: false
incidentKey: "bolt11|fp:90ff2a1fc8ee80a2"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/lightning/bolts/pull/1357"},{"label":"stacker.news","url":"https://stacker.news/items/1576513"}]
---
