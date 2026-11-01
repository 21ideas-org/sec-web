---
title: "Keystone: leaked authenticity-check key allows counterfeit devices to pass verification — shipments received from October 20 are at risk"
description: "The vendor published an analysis of the consequences of its website breach. Confirmed: order data for 2024–2026 may have been exposed, and the attacker has the web authentication key. According to the vendor, this key can be used to build a counterfeit device that passes authenticity checks as genuine, so hardware wallets received on or after October 20, as well as packages in transit, are suspect. The vendor considers devices delivered before October 20 unaffected and recommends checking them using the previous verification page. The firmware signing key, according to the vendor, is separate from the leaked key and unaffected; the vendor says firmware updates are safe. All stock of the current model has been designated for destruction, and new orders are being taken as preorders with new keys and a 4–6-week lead time. The page for checking whether you are affected is not yet live. There is no released fix for the key leak itself: it will only be addressed by changing the keys in the next batch."
pubDate: "2026-10-29T15:30:29.798Z"
statusTags: ["exploitation_confirmed"]
audience: ["holders"]
product: "keystone device authentication key"
vendor: "Keystone"
action: "If you received the device on or after October 20, do not initialize it or enter a recovery phrase into it; contact the vendor's support through an official channel. Do not accept a package in transit, and notify the vendor. You can continue using a device received before October 20 after checking it on the vendor's verification page; firmware updates are permitted. If you have already entered a recovery phrase into a device received from October 20 onward, consider it compromised: create a new seed on a trusted device and transfer funds to new addresses. Because order data was leaked, expect calls, emails and paper notices offering refunds, replacements or a “fix” — the vendor never requests recovery phrases or private keys under any circumstances. Enter the website and support addresses yourself using your bookmarks, rather than following links in incoming messages."
hijacked: false
incidentKey: "keystone device authentication|fp:f8869cdcb7b8b53b"
parent: "keystone-2026-10-26-security-alert"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - KeystoneWallet","url":"https://x.com/KeystoneWallet/status/2115826835900792966"}]
---
