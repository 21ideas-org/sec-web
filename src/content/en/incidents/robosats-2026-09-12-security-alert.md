---
title: "RoboSats v0.8.7-alpha fixes client-side XSS; patch for a second issue involving reward payouts is unconfirmed"
description: "RoboSats v0.8.7-alpha fixes XSS in the coordinator information window: the coordinator's message is now displayed as text rather than HTML, closing this path for web, Android and desktop clients. However, a fix for the second issue in the advisory is unconfirmed: when a reward payout times out, the amount may be returned to the robot even though the first Lightning payment may still complete, allowing the reward to be received twice. This affects coordinator operators. Both issues are rated medium in the advisory; no exploitation has been reported."
pubDate: "2026-09-12T09:31:00.935Z"
statusTags: ["patch_available"]
audience: ["holders","node_operators"]
product: "robosats"
vendor: "RoboSats"
action: "RoboSats users: update to v0.8.7-alpha from the official release to fix XSS through the coordinator information window. Coordinator operators: until a fix is separately confirmed, do not consider the duplicate reward payout issue resolved; pause reward withdrawals or increase the timeout and manually reconcile payments that may still be in flight before paying again."
hijacked: false
incidentKey: "robosats|GHSA-HP64-3GP5-V8FR"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/RoboSats/robosats/security/advisories/GHSA-hp64-3gp5-v8fr"},{"label":"github.com","url":"https://github.com/RoboSats/robosats/releases/tag/v0.8.7-alpha"}]
---
