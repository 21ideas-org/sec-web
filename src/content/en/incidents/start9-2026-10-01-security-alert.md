---
title: "StartWRT 1.2.1: router management interface allowed settings changes without logging in"
description: "Start9 has released StartWRT 1.2.1 with security fixes for the router management interface and asks users to update without delay. According to the release description, every router settings change now requires login, and `startwrt-cli` sends local credentials only to the router on which it is running. A side effect of the update is noted separately: a VPN connection whose configuration specifies the server by hostname could not be routed through another VPN — previous versions accepted such a chain but actually connected directly over WAN; after the update, this setup switches to connecting over the internet, and this is visible in the activity log. The release reports no signs of exploitation."
pubDate: "2026-10-01T11:50:03.593Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "startwrt"
vendor: "Start9 / StartOS"
action: "Update StartWRT to 1.2.1 through the in-app update or the sysupgrade image linked below; for a fresh installation, use the microSD image and verify the release checksums. After updating, check the activity log and VPN settings: you will need to recreate the chain by importing a configuration in which `Endpoint` is an IP address, otherwise traffic will go directly over the internet. If the router management interface was accessible from an untrusted network, change its access passwords."
hijacked: false
incidentKey: "startwrt|fp:e6b7dca99cd67b50"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/Start9Labs/start-technologies/releases/tag/start-wrt/v1.2.1"}]
---
