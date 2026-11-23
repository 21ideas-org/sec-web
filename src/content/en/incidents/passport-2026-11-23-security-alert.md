---
"title": "Passport Core 2.4.0 beta: security fixes and hardening for signing and seed handling"
"description": "Foundation Devices has released Passport Core 2.4.0 beta firmware. The vendor describes it as including a long list of security fixes and hardening improvements, many of them responsibly disclosed by independent security researchers. Claimed changes: change outputs are confirmed to belong to your wallet before the transaction is shown for signing, and Taproot inputs are now included in suspicious-change checks; seed word handling is hardened and seed creation gets additional random number generator health checks; temporary seeds and signing keys are cleared from memory as soon as they are no longer needed; firmware updates are hardened, so malformed update files are rejected instead of causing a crash, the update is re-checked while it is staged, and developer keys are validated and require confirmation; input validation is strengthened in low-level code, cryptography bindings, the secure element interface and settings storage; Taproot inputs that explicitly request SIGHASH_ALL are handled correctly, and unsupported sighash types are rejected before signing. The vendor labels this release a beta and says the official release should be available shortly."
"pubDate": "2026-11-23T10:20:20.082Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "passport"
"vendor": "Foundation Devices / Passport"
"action": "Passport owners: these fixes are currently available only in the 2.4.0 beta firmware. To install it, you must first add the beta public key via Settings -> Advanced -> Developer PubKey. If you are not comfortable with that, the vendor advises waiting for the official release, which it says should be available shortly. Before installing, verify the firmware by following the vendor's firmware update and verification instructions. Note one change: passphrase entry is now limited to 256 characters. If you previously entered a longer passphrase, your wallet uses its first 256 characters."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "passport|fp:bec734f6e09bed61"
"enPublishedAt": "2026-11-23T10:30:17.431Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/Foundation-Devices/passport2/releases/tag/v2.4.0-beta-7"
---
