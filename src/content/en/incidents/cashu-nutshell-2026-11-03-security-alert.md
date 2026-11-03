---
"title": "Nutshell 0.22.0 released with security fixes for mint accounting, authentication and seed handling"
"description": "Nutshell 0.22.0 includes, per the release notes, security fixes and hardening across mint accounting, authentication, seed handling, logging and request validation. The notes do not describe the individual defects or whether they are exploitable. The release also includes mint database migrations, BIP-39 mint seed support via MINT_MNEMONIC (MINT_PRIVATE_KEY is deprecated but still supported), in-memory response caching without Redis, and changes to Lightning payment handling. A patch is available."
"pubDate": "2026-11-03T01:00:14.377Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
  - "merchant_infra"
"product": "cashu nutshell"
"vendor": "Cashu / Nutshell"
"action": "Mint operators running Nutshell without these fixes: back up your databases and stop all older mint workers before upgrading. Spark operators should reconcile existing pending payments before upgrading. After upgrading, if you use legacy keysets with MINT_SEED_DECRYPTION_KEY, re-run the seed encryption migration as described in the release notes. For pip/pipx installs, Python 3.12 is recommended. If you set MINT_MNEMONIC, keep a secure backup of it; existing keysets are not rotated automatically, and each unit moves over through an explicit rotation. Installations that are already updated need no action."
"hijacked": false
"incidentKey": "cashu nutshell|fp:6fb642f1aca87a62"
"enPublishedAt": "2026-11-03T01:20:05.525Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/cashubtc/nutshell/releases/tag/0.22.0"
---
