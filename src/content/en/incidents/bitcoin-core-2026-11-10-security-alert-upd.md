---
"title": "Bitcoin Core: inbound Tor connections wrongly received -whitelist permissions (CVE-2025-62860)"
"description": "Bitcoin Core versions before 28.3, 29.2 and 30.0 applied -whitelist permissions to inbound Tor peers when the IP range set in -whitelist matched the address of the local Tor daemon. The -whitelist option lifts several DoS limits and privacy-leak mitigations for trusted peers. Severity is rated Medium. According to the disclosure, popular vendors bundled Bitcoin Core with a Tor daemon and set -whitelist to the daemon's IP range, so thousands of reachable mainnet nodes whitelisted all incoming Tor connections. Nodes that did not set the non-default -whitelist option were never affected."
"pubDate": "2026-11-10T20:10:20.821Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Bitcoin Core"
"action": "This applies to nodes with -whitelist set, including prebuilt distributions that set it for a local Tor daemon. Update to Bitcoin Core 30.0 or later, 29.2 or later, or 28.3 or later; in these versions inbound connections on an onion bind are not whitelisted. If your build already includes the fix, no action is needed. For builds based on earlier versions, update through your distribution vendor. See the advisory linked in the post for details."
"hijacked": false
"incidentKey": "bitcoin core|CVE-2025-62860"
"enPublishedAt": "2026-11-10T20:40:02.992Z"
"links":
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62860/"
  - "label": "github.com"
    "url": "https://github.com/bitcoin/bitcoin/pull/33395"
---
