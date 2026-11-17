---
"title": "Coldcard: Edge firmware 6.6.2X/6.6.2QX released with security hardening, including a fix for unintended master seed replacement on Q"
"description": "The vendor released Edge firmware 6.6.2X for Mk4/Mk5 and 6.6.2QX for Q. Besides new features (Codex32/BIP-93, Shamir shares), it lists protective changes. For Q: fixes for Key Teleport MuSig lookups and for unintended master seed replacement while scanning secrets. Common to both: authenticated USB ncry v3 encryption with replay protection, stricter xpub, key-origin and BIP-388 validation, rejection of malformed PSBTs and P2SH-P2WSH, stronger Proof-of-Reserves and HSM policy checks, better firmware and flash boundary validation, PSRAM virtual-disk protections, safer backup restoration, and fixes in Taproot, MuSig2 and Miniscript. The corrected RNG implementation received a third-party audit from Keylabs; the vendor calls an audit evidence, not a guarantee. The vendor also launched a Security Status page on current releases, affected-version boundaries and known limitations."
"pubDate": "2026-11-17T20:10:19.489Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "coldcard firmware"
"vendor": "Coinkite / Coldcard"
"action": "If your device runs Edge firmware, install the release containing these fixes: 6.6.2X for Mk4/Mk5 or 6.6.2QX for Q. Release notes and downloads are linked in the post. If you are on stable firmware, no action is needed: the vendor states that Edge is intended for developers and early adopters, has not been qualified to the same standard as regular releases, and most users should remain on stable firmware. The vendor gives no deadline."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "coldcard firmware|fp:ca21d5582c2ba8f6"
"enPublishedAt": "2026-11-17T20:20:13.769Z"
"links":
  - "label": "x.com - COLDCARDwallet"
    "url": "https://x.com/COLDCARDwallet/status/2122782501118902640"
  - "label": "github.com"
    "url": "https://github.com/Coldcard/firmware/blob/2026-11-17T1904-v6.6.2X/releases/EdgeChangeLog.md"
---
