---
title: "ACINQ releases Eclair v0.14.6 with security fixes; some issues could be exploited by hostile nodes"
description: "According to ACINQ, this is a patch release with security-hardening fixes, and some of the issues addressed could be exploited by hostile nodes; the vendor strongly recommends updating. A configuration parameter has also been added to control whether unconfirmed inputs may be spent during a splice (not allowed by default). The issues were responsibly disclosed by an external researcher; detailed release notes are linked in the post."
pubDate: "2026-10-27T17:21:11.144Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "eclair"
vendor: "ACINQ / Eclair"
action: "If you run an Eclair node without these fixes, update now: download the build, verify the checksums and release signature with ACINQ's key, then stop eclair, install v0.14.6 and restart — no channel closures are required, and the release is compatible with previous versions. Separately, check the new parameter for spending unconfirmed inputs during a splice in your configuration: this is disallowed by default, and you should not change it without a need. Those already running a build with these fixes need no action."
hijacked: false
incidentKey: "eclair|fp:081da0d13d6471eb"
parent: "eclair-2026-10-20-security-alert"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/ACINQ/eclair/releases/tag/v0.14.6"}]
---
