---
"title": "Coinkite publishes COLDCARD seed-generation postmortem: thefts confirmed, affected-seed criteria clarified"
"description": "Coinkite published its full postmortem of the COLDCARD seed-generation defect. The vendor says no device was compromised remotely: thefts were carried out offline by regenerating affected private keys. It says thefts began on July 29, 2026, the defect was identified on July 30, and fixed firmware for all five supported release tracks shipped on July 31. The vendor states that seeds made with more than 50 fair, private dice rolls were not weakened, and that a strong BIP-39 passphrase or multisig added a barrier. It matched 300 loss-related tickets to 236 customer accounts, about 0.2% of its estimated user base, and says the true number is likely higher because the device is non-custodial. New seeds combine user input with three hardware sources, and build-time and boot checks confirm that seed generation reaches the hardware RNG. Users can check their own seed with View TRNG Words and a public script. Keylabs concluded, within its stated scope, that the defect is fully closed, but the vendor says further independent review is needed and some recommendations remain open."
"pubDate": "2026-11-24T13:30:25.449Z"
"statusTags":
  - "exploitation_confirmed"
  - "patch_available"
"audience":
  - "holders"
"product": "coldcard firmware"
"vendor": "Coinkite / Coldcard"
"action": "If your seed was generated on affected firmware, check sections 1.4 and 4.1 of the postmortem and the vendor's Security Status page to see whether you are affected. The vendor says seeds made with more than 50 fair, private dice rolls were not weakened, and a strong BIP-39 passphrase or multisig added a barrier. If your seed may be weak, a firmware update does not fix it: create a new seed in a trusted, unaffected environment, write down the backup and verify it, move your funds to your own new addresses from that seed, wait for confirmation, then retire the old wallet. Never send seed words, passphrases, dice rolls, private keys or backups to anyone."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "coldcard firmware|fp:5ac4016383388608"
"enPublishedAt": "2026-11-24T13:40:26.293Z"
"links":
  - "label": "blog.coinkite.com"
    "url": "https://blog.coinkite.com/coldcard-postmortem-published/"
  - "label": "coldcard.com"
    "url": "https://coldcard.com/security/status"
---
