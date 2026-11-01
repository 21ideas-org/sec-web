---
title: "Bisq 2: logs in versions 2.1.3–2.1.13 contain identity private keys"
description: "According to the project, log files in Bisq versions 2.1.3–2.1.13 contain the onion private keys of all node identities and, when the API is enabled, user profile private keys as well. The released version 2.1.14 is described as an important security update: it fixes vulnerabilities found during the project audit, includes a recent Tor security release, adds Bisq Easy trade checks (offer and price matching, reputation limits, and amount checks in Bitcoin URIs and Lightning invoices) and storage signatures. On first launch, 2.1.14 removes keys from logs in its own data directory, but all other copies remain exposed: logs previously sent to anyone, backups and docker logs output. A separate announcement states that all nodes must update to 2.1.14 or later by November 25, 2026, otherwise connectivity and data transmission problems will begin."
pubDate: "2026-10-15T02:31:01.450Z"
statusTags: ["patch_available"]
audience: ["holders","node_operators"]
product: "bisq"
vendor: "Bisq"
action: "Update to 2.1.14 now: the update is stated to be mandatory to continue trading. Do not share old logs or docker logs output with anyone; remove their copies from backups and support chats. If such logs have already been shared externally, treat the affected identities and profiles as compromised and replace them, and keep funds in wallets whose keys did not end up in the logs. Intel Mac users should note that, because builds have been renamed, the in-app updater may offer an incompatible version; install the correct build manually. The deadline for updating nodes is November 25, 2026."
hijacked: false
incidentKey: "bisq|product-fp:0c7f36adc2a52c8b"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/bisq-network/bisq2/releases/tag/v2.1.14"}]
---
