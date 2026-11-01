---
title: "umbrelOS 2.0.1 fixes a Linux kernel vulnerability in handling incoming network connections"
description: "Umbrel has released umbrelOS 2.0.1 as an important security update. On Umbrel Home, Umbrel Pro and other x86 devices, it includes a Linux kernel patched for the recently disclosed CVE-2026-98432. On Raspberry Pi, where a patched kernel is not yet available, umbrelOS blocks the network traffic needed to trigger the vulnerability. The same release fixes a HEIC decoder vulnerability triggered when generating a thumbnail of a specially crafted image, removes trust in certificate authorities recently distrusted following a security incident, hardens the updater and includes recent Debian security updates."
pubDate: "2026-11-01T09:31:11.512Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "umbrelos"
vendor: "Umbrel"
action: "Node operators running umbrelOS without these fixes should install 2.0.1 soon. On x86 devices (Umbrel Home, Umbrel Pro and others), the update provides a patched kernel. On Raspberry Pi, a patched kernel is not yet available: protection relies on blocking the traffic needed to trigger the vulnerability, so a fix for the kernel vulnerability itself is expected later. If you have already updated to 2.0.1, no further action is needed. Images and update files for amd64 and Pi, along with SHA256SUMS, are available on the linked release page."
hijacked: false
incidentKey: "umbrel|CVE-2026-98432"
links: [{"label":"github.com","url":"https://github.com/getumbrel/umbrel/releases/tag/2.0.1"}]
enPublishedAt: "2026-11-01T11:11:31.651Z"
---
