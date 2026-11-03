---
"title": "myNode clarifies v0.3.52 contents: two more CVEs and why Raspberry Pi may still show an error"
"description": "According to myNode, release v0.3.52 mitigates CVE-2026-98432 and also includes a NodeJS upgrade for CVE-2026-111497 and a Bitcoin upgrade for CVE-2026-117349, plus new firewall rules. The vendor says the fixes are required to prevent possible unauthorized access and control of the device. On Raspberry Pi, an error message may remain on the home page after the upgrade because no kernel update with the TCP fix is available for that platform; for such devices the release includes mitigations: LND v0.21.6, new firewall rules and MPTCP disabled."
"pubDate": "2026-11-03T00:50:17.994Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "mynode"
"vendor": "myNode"
"action": "If you run a Raspberry Pi and an error message remains on the home page after upgrading: the vendor says this is expected (no kernel update with the TCP fix exists for the platform) and no extra steps are needed, since the mitigations are already in the release. If you do not yet have these fixes, the vendor advises upgrading to v0.3.52 or newer."
"hijacked": false
"incidentKey": "mynode|CVE-2026-98432"
"parent": "mynode-2026-10-31-security-alert-upd"
"enPublishedAt": "2026-11-03T01:10:04.529Z"
"links":
  - "label": "x.com - mynodebtc"
    "url": "https://x.com/mynodebtc/status/2117418076069130380"
  - "label": "mynodebtc.com"
    "url": "https://mynodebtc.com/security"
---
