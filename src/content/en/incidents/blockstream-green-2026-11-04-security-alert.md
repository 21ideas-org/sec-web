---
"title": "Blockstream releases GDK 0.78.1: keys and seeds wiped from memory, sighash flags validated before signing"
"description": "The release lists security-related changes: credentials, keys, seeds and other sensitive data are wiped from memory once no longer needed; user sighash flags are validated before signing with any signer, including hardware signers; in multisig, the PIN password returned by the server must be at least 36 characters, and the value and asset of explicit Liquid UTXOs are taken from the transaction rather than from the server. It also fixes a use-after-free when websocket clients are destroyed (Wamp), rounds up the RBF replacement fee as Bitcoin Core does, and reports out-of-range output indices as user errors. The source does not describe a vulnerability, exploitation or urgency."
"pubDate": "2026-11-04T17:11:15.166Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
  - "developers"
"product": "blockstream gdk"
"vendor": "Blockstream"
"action": "If you use a wallet or app built on GDK (including Blockstream Green) or embed this library, move to a build that includes these fixes. Developers: update the dependency and rebuild your product in the coming days. Users: install the app update once the vendor releases it. Installations that already include these fixes need no action. Replacing your seed is not required: the source does not report any key exposure."
"hijacked": false
"incidentKey": "blockstream gdk|fp:582098df78ce0911"
"enPublishedAt": "2026-11-04T17:30:04.542Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/Blockstream/gdk/releases/tag/release_0.78.1"
---
