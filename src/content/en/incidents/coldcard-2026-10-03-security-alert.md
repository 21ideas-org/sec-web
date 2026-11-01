---
title: "Coldcard: firmware update fixes seed generation, but previously created seeds must be replaced"
description: "The vendor reports on its channel that the released firmware update fixes seed generation only for future keys. The update does not “repair” a seed created on affected firmware — such a key remains defective, and funds at its addresses are at risk. Restoring from backup or cloning the device does not solve the issue: the defect travels with the key. All owners who generated a seed on vulnerable firmware versions are affected."
pubDate: "2026-10-03T14:01:13.699Z"
statusTags: ["patch_available"]
audience: ["holders"]
product: "coldcard firmware"
vendor: "Coinkite / Coldcard"
action: "Update the firmware to the current version now. If your current seed was created on affected firmware, do more than update: generate a new seed on the device and make an on-chain transfer of funds to new addresses — do not restore from backup or clone. Migration instructions are at the links in the post."
hijacked: false
incidentKey: "coldcard firmware|fp:f9a54759e8be3c75"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - COLDCARDwallet","url":"https://x.com/COLDCARDwallet/status/2106383840176419079"},{"label":"coldcard.com","url":"https://coldcard.com/security/migrate"}]
---
