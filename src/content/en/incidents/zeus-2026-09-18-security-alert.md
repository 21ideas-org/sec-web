---
title: "Zeus v13.2.2: update permanently erases wallet data in iCloud Keychain; devices opened later will lose their settings"
description: "Zeus developers report that, because of a bug in a third-party dependency, older versions stored wallet data, including seeds and connection credentials, in the keychain synced through iCloud instead of local device storage. Version v13.2.2 moves this data to local storage and then automatically and permanently deletes the iCloud copies without asking for confirmation. The deletion propagates to all devices with the same Apple ID: any device that has not yet been opened on v13.2.2 will lose its saved wallet configurations, because older versions had no separate local copy. This also affects devices that updated in the background; changing the update order does not avoid the problem. According to the vendor, iCloud Keychain is end-to-end encrypted, the data was accessible only to the user's own trusted devices, and there is no evidence of a user data leak."
pubDate: "2026-09-18T14:41:21.155Z"
statusTags: []
audience: ["holders","node_operators"]
product: "zeus"
vendor: "Zeus"
action: "If you use Zeus on iOS on more than one device and have iCloud Keychain enabled, before launching the new version on each device, make sure you have a seed phrase backup for every embedded wallet (and the Cashu seed if you use ecash), and export your wallet configurations. Disable automatic updates until you have made backups. Devices with iCloud Keychain disabled are unaffected. Details and the full list of steps are in the release notes linked below."
hijacked: false
incidentKey: "zeus|product-fp:2bab4133b1301355"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/ZeusLN/zeus/releases/tag/v13.2.2-rc1"}]
---
