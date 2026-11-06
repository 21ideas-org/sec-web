---
"title": "Blink: on-chain exit from Spark needs a wallet snapshot, not just the seed phrase; 3.0.46 saves it automatically"
"description": "Blink says that if the Spark operators vanish, the 12-word seed phrase alone cannot recover your bitcoin on-chain. You also need a snapshot of the wallet state made while the operators were online. Starting with release 3.0.46, the app keeps such a snapshot: it is created after your first transaction, refreshed after every payment, and saved together with your cloud backup. In July the vendor ran a unilateral exit itself on mainnet with a real wallet and 100,000 sats, using open-source tooling, and documented every failure. The vendor's posts have the full write-up."
"pubDate": "2026-11-06T12:21:02.108Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "blink wallet"
"vendor": "Blink Wallet"
"action": "If you hold bitcoin in a Blink Spark balance, update to release 3.0.46, make a payment or transaction so the snapshot is created, and confirm that cloud backup is enabled and the snapshot date is recent. Re-check it after each top-up. Do not rely on the 12 words alone to recover these funds on-chain. If there is no snapshot and you cannot update, avoid adding to your Spark balance. If 3.0.46 is already installed and the snapshot is being refreshed, no further action is needed."
"hijacked": false
"incidentKey": "blink wallet|product-fp:1081b95a7f90b48b"
"enPublishedAt": "2026-11-06T13:00:05.592Z"
"links":
  - "label": "x.com - blinkbtc"
    "url": "https://x.com/blinkbtc/status/2118679557272129610"
  - "label": "www.blink.sv"
    "url": "https://www.blink.sv/blog/case-study-spark-unilateral-exit-on-bitcoin-mainnet"
  - "label": "www.blink.sv"
    "url": "https://www.blink.sv/blog/emergency-exit-on-blink"
---
