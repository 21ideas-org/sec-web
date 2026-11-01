---
title: "COLDCARD Mk2–Q: predictable entropy generator; thefts of funds recorded"
description: "Block's engineering team and independent researchers analyzed an RNG integration error in COLDCARD firmware: instead of the STM32 hardware generator, it uses a deterministic MicroPython software fallback initialized from the chip UID and timers. On Mk2/Mk3 (v4), no cryptographic entropy is added to generation at all; on Mk4/Q/Mk5, only a few bytes from the secure element are retained, and reseeding replaces one 32-bit state word. This makes seeds generated on the device recoverable. The investigation was prompted by reports from COLDCARD owners of missing funds; Block writes that exploitation is ongoing and refers to a separate Coinkite analysis."
pubDate: "2026-09-21T12:00:57.827Z"
statusTags: ["exploitation_confirmed"]
audience: ["holders"]
product: "coldcard firmware"
vendor: "Stacker News"
action: "Treat a seed generated on these generations of COLDCARD as compromised: create a new seed in another trusted environment (not on the affected device) and transfer all funds there immediately. Updating the firmware alone does not protect a seed already created: replacing the secret is mandatory. Multisig using several affected devices does not protect you: a quorum of devices with independent entropy is required. Details and links to the analyses are at the links below."
hijacked: false
incidentKey: "coldcard firmware|fp:7ed3bb2a96e889a7"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"engineering.block.xyz","url":"https://engineering.block.xyz/blog/predictable-rng-fallback-and-32-bit-reseed-in-coldcard-firmware"},{"label":"stacker.news","url":"https://stacker.news/items/1536720"}]
---
