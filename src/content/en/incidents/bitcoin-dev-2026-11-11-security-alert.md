---
"title": "Bitcoin Core discloses three vulnerabilities: one high and two medium severity"
"description": "Following a pre-announcement two weeks ago, the Bitcoin Core developers published details of three vulnerabilities. CVE-2025-62861 is a mempool inconsistency in reorg handling that can be exploited to prevent a miner from obtaining valid block templates. CVE-2025-62860 is an incorrect application of whitelist privileges to inbound Tor connections, which can be exploited to DoS a node or make it leak internal state. CVE-2025-62859 is a misplaced witness malleation check that lets a malicious peer stall block processing. All three are fixed in Bitcoin Core 29.2 and later 29.x releases, and in 30.0 and all later versions. Details are in the linked advisories."
"pubDate": "2026-11-11T00:31:13.454Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "bitcoin-dev mailing list"
"action": "If you run Bitcoin Core without these fixes, update to 29.2 or a later 29.x release, or to 30.0 or newer. Pay particular attention to nodes with whitelist privileges enabled and inbound Tor connections, and to mining setups that obtain block templates. Installations that already include these fixes need no action."
"hijacked": false
"incidentKey": "bitcoin-dev mailing list|CVE-2025-62861"
"enPublishedAt": "2026-11-11T00:50:05.611Z"
"links":
  - "label": "mailing-list.bitcoindevs.xyz"
    "url": "https://mailing-list.bitcoindevs.xyz/bitcoindev/x8_ouI-b5d4xOuHCR353f-mt-bnpMdMK9joxUdYcVQdeiloXqBk2nZl1HNeyFPb-0a5Ef4z-v3EpT4NjjU85f6x5Cb2h-ZoVo7YrGcvEQ9E=@protonmail.com/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62861/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62860/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62859/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/security-advisories/"
---
