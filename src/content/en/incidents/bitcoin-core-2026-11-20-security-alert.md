---
"title": "Bitcoin Core: a connected peer can temporarily stall block and transaction processing (CVE-2026-117348)"
"description": "Per the Bitcoin Core disclosure, a peer could repeatedly announce an orphan transaction with many missing parents. A single inv message can carry up to 50,000 entries and duplicates were not skipped, so each such message stalled the node for over a dozen seconds, during which it processed no messages from other peers, including blocks. Affected versions are 29.0 to 29.5, 30.0 to 30.4 and 31.0 to 31.2. The issue is rated Medium and easily discoverable. A fix was released in 30.5, 31.3 and 32.1. The 29.x series has reached end of life and will not receive a fix."
"pubDate": "2026-11-20T15:10:25.000Z"
"statusTags": []
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Bitcoin Core"
"action": "If your node runs 29.0 to 29.5, 30.0 to 30.4 or 31.0 to 31.2, update to 30.5, 31.3 or 32.1. There will be no fix within the 29.x series because, per the source, it has reached end of life, so 29.x nodes need to move to a supported series that includes the fix. Nodes already running 30.5, 31.3 or 32.1 need no action. The link to the Bitcoin Core disclosure is in the post."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "bitcoin core|CVE-2026-117348"
"enPublishedAt": "2026-11-20T15:20:17.185Z"
"links":
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/20/disclose-orphan-inv-stall/"
---
