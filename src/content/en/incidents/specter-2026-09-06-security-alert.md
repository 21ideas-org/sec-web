---
title: "Specter-DIY v1.10.5 fixes random number handling failure and weak change verification"
description: "In previous versions of Specter-DIY firmware, a hardware random number generator failure could be silently accepted as valid entropy, while transaction change was checked using metadata supplied by the computer without verification on the device itself — opening the way for a malicious host to substitute the change address. A warning check for mixing inputs from different wallets in one transaction, which had previously failed to trigger, was also restored. This affects Specter-DIY hardware wallet owners."
pubDate: "2026-09-06T15:22:40.466Z"
statusTags: ["patch_available"]
audience: ["holders"]
product: "specter-diy firmware"
vendor: "Specter Desktop"
action: "Update Specter-DIY firmware to v1.10.5 via SD card; if you are on v1.9.0 or earlier, install v1.10.3 first — it was a mandatory intermediate update."
hijacked: false
incidentKey: "specter-diy firmware|fp:e0c25781242c667b"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com","url":"https://x.com/SpecterDIY/status/2096553405728641444"},{"label":"github.com","url":"https://github.com/cryptoadvance/specter-diy/releases/tag/v1.10.5"}]
---
