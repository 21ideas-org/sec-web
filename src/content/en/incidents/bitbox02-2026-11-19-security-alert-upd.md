---
"title": "BitBox releases Cresta update fixing several firmware and BitBoxApp security issues"
"description": "Per BitBox, the release fixes several issues in the BitBox firmware and one in BitBoxApp. In the bootloader, a precisely timed power interruption while saving settings could reset the minimum accepted firmware version, letting an attacker with physical access install older signed firmware and reintroduce previously fixed flaws. During Bitcoin transaction signing, incomplete validation let a malicious app make the device show a lower fee than miners would actually receive; this required specially prepared funds and repeated approvals. In device-verified swaps, the refund address was not checked against the user's wallet, so a compromised app could substitute its own. For registered multisig accounts, a receive address outside the usual derivation paths could be requested, making received funds hard to locate. The authenticity-failure warning banner was not shown at every step. The vendor says it has seen no signs of exploitation and received no reports of stolen funds."
"pubDate": "2026-11-19T10:51:09.767Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "bitbox firmware"
"vendor": "Shift Crypto / BitBox02"
"action": "If you use BitBox, the vendor recommends that all users update BitBoxApp and the device firmware. The release includes a bootloader update, so you will see several progress bars during the upgrade. If you have already updated both, nothing more is needed. Per BitBox, Miniscript policies and successfully completed swaps to the verified destination were not affected. See the vendor post for technical details."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "bitbox firmware|fp:1c03308d4e4d5fe8"
"enPublishedAt": "2026-11-19T11:00:13.084Z"
"links":
  - "label": "blog.bitbox.swiss"
    "url": "https://blog.bitbox.swiss/en/bitbox-11-2026-cresta-update/"
---
