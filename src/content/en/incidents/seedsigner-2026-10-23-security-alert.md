---
title: "Implants with preset seed phrases found in Trezor One and Model T devices bought from third-party sellers"
description: "Researcher Joe Grand found a replacement microcontroller with malicious firmware in two devices — a Model T from Facebook Marketplace (Canada, 2025) and a Trezor One from a TikTok shop (August 2026, shipped from China). Instead of a random recovery phrase, the device produces one of roughly a dozen hardcoded by the attackers, meaning they know the keys from the outset. Integrity checks are bypassed using a copy of the official firmware (on a soldered microSD card or in the second half of flash memory). The Trezor One owner's funds have already been stolen: the current version of Trezor Suite flags this unit during verification, but allows the user to continue using the device. Both models have been discontinued, but are still being bought on the secondhand market; Trezor has publicly stated that there is no evidence of its devices being compromised and is reducing the number of authorized sellers."
pubDate: "2026-10-23T05:30:19.728Z"
statusTags: ["exploitation_confirmed"]
audience: ["holders"]
product: "trezor one and model t devices"
vendor: "SeedSigner"
action: "If your Trezor One or Model T was bought from somewhere other than the vendor directly or an authorized seller, stop using it right now; do not reinitialize it or trust its checks. Generate a new seed on a device of known, trusted origin and immediately transfer funds to addresses from that new wallet: consider any seed created by a compromised device known to the attackers, even if there were no warnings. Do not treat a verification warning in Trezor Suite as permission to continue using the device."
hijacked: false
incidentKey: "trezor one and model t devices|fp:b172449df5f0a587"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - sesi_the_man","url":"https://x.com/sesi_the_man/status/2112198043940372787"},{"label":"www.zetter-zeroday.com","url":"https://www.zetter-zeroday.com/trezor-wallets-also-compromised-with-implants/"}]
---
