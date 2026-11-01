---
title: "RoboSats v0.8.8-alpha: XSS in order logs fixed, coordinator payout checks added, old Android client no longer connects"
description: "The release fixes XSS (user-controlled data is escaped and order logs are stored as JSON), adds coordinator checks of reward sources and buyer payouts against Lightning node data with an optional withdrawal limit, fixes repeated crediting of collateral from a single slashed bond, and updates Django and Pillow. The changelog names fixes for two GHSAs, but the fix for one of them is subsequently marked as reverted. The Tor bundled with the Android app has been updated: according to the release, the previous Tor version can no longer connect to the network."
pubDate: "2026-10-31T20:30:27.700Z"
statusTags: ["patch_available"]
audience: ["holders","node_operators"]
product: "robosats"
vendor: "RoboSats"
action: "RoboSats users (web, Android, desktop): update to v0.8.8-alpha and verify the build's GPG signature using the release instructions; on Android, the update is also needed for functionality, since the previous bundled Tor cannot connect to the network. Coordinators: update the backend to v0.8.8-alpha (payout checks against LND data, updated Django and Pillow) and, if needed, set WITHDRAWAL_LIMIT to limit reward withdrawals; coordinator onion addresses are listed on the access page as a fallback route. Those already on v0.8.8-alpha require no action."
hijacked: false
incidentKey: "robosats|GHSA-HP64-3GP5-V8FR"
parent: "robosats-2026-09-12-security-alert"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/RoboSats/robosats/releases/tag/v0.8.8-alpha"}]
---
