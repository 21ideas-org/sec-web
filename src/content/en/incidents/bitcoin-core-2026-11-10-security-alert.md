---
"title": "Bitcoin Core: CVE-2025-62859 lets a malicious peer stall block processing via witness malleation in compact blocks"
"description": "According to the project, Bitcoin Core versions before 29.2 and 30.0 cleared a compact block's download state before checking for witness malleation. If that check failed, the node fell back to requesting the block from the same peer via GETDATA with a 10-minute timeout. A malicious peer that announced a compact block to a victim first could use this to stall the victim's block processing. If the attacker controlled all 3 of the victim's high-bandwidth peers, or the victim ran with -blocksonly, this could be repeated indefinitely. The project rates the severity as Medium. The fix shipped in 30.0 and 29.2, and the last vulnerable branch (29.x) is now end of life."
"pubDate": "2026-11-10T20:10:20.821Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Bitcoin Core"
"action": "If your node runs a build older than 29.2 or 30.0, update to a version with the fix; this matters especially for nodes running with -blocksonly. Nodes already running these fixed versions need no action. See the project's advisory for details."
"hijacked": false
"incidentKey": "bitcoin core|CVE-2025-62859"
"enPublishedAt": "2026-11-10T20:30:01.945Z"
"links":
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62859/"
  - "label": "github.com"
    "url": "https://github.com/bitcoin/bitcoin/pull/32646"
---
