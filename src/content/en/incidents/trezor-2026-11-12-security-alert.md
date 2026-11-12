---
"title": "Trezor: firmware 2.13.1 blocks the implants found in CryptoBilis Safe 5 devices, but moving to a new seed is still advised"
"description": "Trezor updated its investigation into a hardware implant in Trezor Safe 5 devices sold by the reseller CryptoBilis. The implant is confirmed in three devices bought between 20 August and 23 September 2026 through CryptoBilis stores. Trezor found no tampering in devices from other resellers or in other models, and none of the 48 customers who have come forward reported lost funds. The implant is an extra board between the main board and the screen. It does not change the firmware or Secure Element. It copies what is shown on the screen, recognizes and stores recovery words and any passphrase, and sends them encrypted over the mobile network to an attacker-controlled server. Firmware 2.13.1, released on 11 November, stops the implants found so far from capturing anything. Trezor also cut its reseller network by about 80%. Its guidance for CryptoBilis buyers is unchanged."
"pubDate": "2026-11-12T14:10:02.642Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "trezor safe 5"
"vendor": "Trezor / SatoshiLabs"
"action": "If your Trezor was bought from CryptoBilis since March 2026, update to firmware 2.13.1, but do not treat the update as enough: it cannot protect a backup captured before the update. Trezor's advice is still to move your funds to your own new wallet. Create a new seed in a trusted, unaffected environment, write down the backup and verify it. Then transfer your funds to addresses you control in the new wallet, wait for confirmation, and stop using the old wallet. Do not enter the old seed anywhere. Keep the device and contact Trezor Support: CryptoBilis purchases since March 2026 are eligible for a replacement. If you are unsure where your device came from, ask Trezor Support."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "trezor safe 5|fp:a18bf53b4a2afaef"
"enPublishedAt": "2026-11-12T14:30:07.499Z"
"links":
  - "label": "x.com - Trezor"
    "url": "https://x.com/Trezor/status/2120880182173073421"
---
