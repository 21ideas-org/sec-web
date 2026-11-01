---
title: "Coldcard: seed generation vulnerability in several firmware versions; affected seeds must be replaced"
description: "The vendor reports a new critical vulnerability in seed generation in newer COLDCARD firmware. It asks users to check versions Mk4/Mk5 ≥5.6.0, Q ≥1.5.0Q, Mk2/Mk3 ≥4.2.0. This is a separate finding from the vendor's previous advisories: if a seed was generated on an affected version and remains in use, updating the firmware alone does not remove the risk; migration is required. The post does not state that a confirmed fix specifically for this area has been released, and promises a detailed report later. The vendor separately warns that neither it nor “helpers” ever ask for seeds, and that phishing messages offering a “fix” are possible."
pubDate: "2026-10-11T05:00:59.487Z"
statusTags: []
audience: ["holders"]
product: "coldcard firmware"
vendor: "Coinkite / Coldcard"
action: "If the seed was created on one of the listed versions, treat it as affected: generate a new seed on your device and transfer funds to your own new addresses, rather than only updating the firmware. Before taking action, read the vendor's full guide from the original source and check your version. Never enter seed words, a passphrase or private keys on websites or in forms, and do not give them to anyone offering help; treat unsolicited messages and links offering a “fix” as phishing."
hijacked: false
incidentKey: "coldcard firmware|fp:6e0ee2079efaad10"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - COLDCARDwallet","url":"https://x.com/COLDCARDwallet/status/2109145240779059236"}]
---
