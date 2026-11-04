---
"title": "Core Lightning 26.06.10 fixes vulnerabilities in dual funding, splicing, onchaind, gossip, connectd, runes and hsmd"
"description": "The Core Lightning project says point release 26.06.10 fixes vulnerabilities reported responsibly by a number of researchers, and strongly recommends upgrading as soon as practical. The fixes cover signature checks on the peer's tx_signatures in dual funding and splicing, HTLC resolution in onchaind, gossip resource limits, connectd, runes and commando, plugin hooks and hsmd, plus a number of remote-crash and hardening fixes. There is no embargo: the release and its fixes are available immediately. The project is temporarily withholding the tests for the security fixes, to make it harder to quickly turn the fixes into working exploits and to give users more time to upgrade. Reproducible amd64, arm64 and armv7 binaries are provided for Ubuntu 22.04, 24.04 and 26.04 (amd64 also for Fedora 40), along with multi-platform Docker images."
"pubDate": "2026-11-04T13:40:22.036Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "core lightning"
"vendor": "Core Lightning (CLN)"
"action": "Core Lightning node operators who do not yet have these fixes: upgrade to 26.06.10 as soon as possible. Before installing, verify the signature on the signed checksum manifest and then the checksums, following the release instructions and passing both files; ARM tarballs have their own separate manifests and signatures. Then review the runes issued on your node: bind runes used over commando to the node that uses them with an id restriction, and blacklist any you cannot account for with blacklistrune and reissue them with tighter restrictions. Nodes that have run development (master) builds cannot downgrade to a 26.06.x release because the database schema is newer. The project discourages zero-conf channels with peers you do not trust."
"hijacked": false
"incidentKey": "core lightning|fp:2590082fd8066138"
"enPublishedAt": "2026-11-04T14:00:03.603Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/ElementsProject/lightning/releases/tag/v26.06.10"
---
