---
"title": "Blockstream GDK 0.78.2 adds Electrum server data checks and fixes wallet crashes"
"description": "Release 0.78.2 adds singlesig checks that a transaction downloaded from the Electrum server matches the requested txid, and caps the relay fee reported by the server at 1 sat/vB when computing the minimum fee rate. Cached history entries whose transaction is missing are dropped and the account history is refetched. When bumping a fee, previous output amounts are checked against the raw transaction and, for multisig, the fee rate against its size. Fixed crashes: spending an output index the previous transaction lacks, parsing an invalid PSBT, and memory leaks in BC-UR. Formatting a crypto-account now returns an error instead of crashing, and non-UTF-8 block notifications from the server are ignored."
"pubDate": "2026-11-18T15:41:21.391Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
  - "developers"
"product": "gdk"
"vendor": "Blockstream"
"action": "If your wallet, app or service is built on gdk and does not include these fixes, update the dependency to 0.78.2 and rebuild. Users of gdk-based apps should install a build that includes these fixes. Installations that already have these fixes need no action. See the release page for details of the changes."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "gdk|fp:15d5fd0b601c7417"
"enPublishedAt": "2026-11-18T15:50:10.331Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/Blockstream/gdk/releases/tag/release_0.78.2"
---
