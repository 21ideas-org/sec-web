---
"title": "Keystone: malware in Optimizely scripts swaps crypto addresses; about $7,040 reached attacker wallets in ~9 hours on Nov 16"
"description": "Keystone reports that attackers injected malicious code into scripts from Optimizely, a marketing tool, and it reached visitors of sites of 178 organizations, including CNN, BBC, Zoom, Salesforce and GitLab. One script, served to every visitor, swaps addresses on the page and in the clipboard. It validates checksums, so it replaces only real addresses on BTC, ETH and EVM chains, Solana, TRON, TON and others. The same script skims card data typed into a site's own checkout forms, steals cookies and a screenshot when it swaps an address near wallet or payment text, and targets iPhones and iPads with the Coruna and DarkSword exploit kits. Keystone says about $7,040 reached the attacker's wallets in roughly nine hours on Nov 16."
"pubDate": "2026-11-17T12:01:11.210Z"
"statusTags":
  - "exploitation_confirmed"
"audience":
  - "holders"
  - "merchant_infra"
"product": "optimizely scripts"
"vendor": "Keystone"
"action": "If you send BTC by copying an address from a website: check the full address on your hardware wallet screen, not just the first and last 4 characters; compare it with the original source, not your clipboard; use a saved address book or whitelist; send a small test transaction first. Update your iPhone or iPad to the latest iOS version available for the device. Site owners who embed Optimizely scripts: Keystone points to the full breakdown and cleanup steps from the researcher's team mentioned in the post."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "optimizely scripts|fp:7836e4c2ff79e529"
"enPublishedAt": "2026-11-17T12:10:16.656Z"
"links":
  - "label": "x.com - KeystoneWallet"
    "url": "https://x.com/KeystoneWallet/status/2122661038575493299"
---
