---
title: "lnd v0.20.7 and v0.21.6 released with a Go mitigation (disabling MPTCP) for CVE-2026-98432"
description: "According to lnd, releases v0.20.7 and v0.21.6 contain a Go-specific mitigation — disabling the MPTCP flag — for CVE-2026-98432, a use-after-free in the Linux kernel's IPv4 TCP implementation. The source stresses that this is a kernel-level vulnerability: only a kernel patch fully fixes it, since any network service may be affected; known PoCs use MPTCP, but other vectors are not ruled out. The developers recommend that all users update."
pubDate: "2026-10-30T22:51:08.428Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "lnd"
vendor: "LND"
action: "Operators of lnd nodes on Linux: update to v0.20.7 or v0.21.6 as recommended by the source. Existing binaries can be protected by launching them with the environment variable GODEBUG=multipathtcp=0. Regardless of the lnd update, apply the Linux kernel patch — according to the source, only this fully resolves the vulnerability, and it concerns any network service on the host. The releases and Go explanation are linked in the post."
hijacked: false
incidentKey: "lnd|CVE-2026-98432"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - lightning","url":"https://x.com/lightning/status/2116301336807666159"},{"label":"github.com","url":"https://github.com/lightningnetwork/lnd/releases/tag/v0.21.6-beta"},{"label":"github.com","url":"https://github.com/lightningnetwork/lnd/releases/tag/v0.20.7-beta"},{"label":"github.com","url":"https://github.com/golang/go/issues/82717#issuecomment-6508681582"}]
---
