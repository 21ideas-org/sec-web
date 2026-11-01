---
title: "Apple patches CVE-2026-86950 in CoreGraphics: zero-day used in real-world attacks"
description: "According to the vendor, Apple has released a fix for CoreGraphics vulnerability CVE-2026-86950, which has already been used in real-world attacks: a single malicious file was enough for full code execution on a device. Devices running iOS 26.7 and corresponding macOS builds are at risk. For a Bitcoin holder, this means a wallet, seed phrase or passwords stored on such a phone or computer may have been read by an attacker."
pubDate: "2026-09-29T12:00:14.470Z"
statusTags: ["exploitation_confirmed","patch_available"]
audience: ["holders"]
product: "ios"
vendor: "Keystone"
action: "Update to iOS 26.7.1 (and the corresponding macOS update) today without delay. If a vulnerable device held a hot wallet or had a seed phrase entered on it, treat the secret as compromised: generate a new seed in an environment known to be clean or on a hardware signer and transfer funds to new addresses. Updating the system alone does not undo the theft of a key."
hijacked: false
incidentKey: "keystone|CVE-2026-86950"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - KeystoneWallet","url":"https://x.com/KeystoneWallet/status/2104904022767632523"},{"label":"x.com - TheHackersNews","url":"https://x.com/TheHackersNews/status/2104652226409214048"}]
---
