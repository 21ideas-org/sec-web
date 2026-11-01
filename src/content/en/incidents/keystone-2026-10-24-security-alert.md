---
title: "Keystone: store customer data leak confirmed"
description: "Keystone reports that it discovered unauthorized access to its website on October 20, and on October 23, after reviewing API activity with Shopify, confirmed that a third party had obtained customer data: names, contact information, shipping addresses and order details (products and prices). According to the vendor, payment and banking details, recovery phrases, private keys and wallet passwords were not affected. Access has been blocked, the vulnerability has been fixed, an investigation is under way, affected customers are being emailed, and a detailed report has been promised later. The practical risk is targeted phishing and physical targeting: knowing a name, address and order contents lets scammers convincingly impersonate the vendor by phone, SMS, email and postal mail, offering refunds, “device replacements” or an “order correction.”"
pubDate: "2026-10-24T18:01:30.398Z"
statusTags: ["exploitation_confirmed"]
audience: ["holders"]
product: "keystone website"
vendor: "Keystone"
action: "Treat any incoming message about an order, refund, replacement or device check as an attempt to deceive you, even if it correctly names your address and the model you bought. Do not follow links in these messages or scan QR codes sent to you; visit the vendor's website only by entering the address yourself using your bookmarks. Never enter a recovery phrase or private key on a website, in a form or into a device you did not order yourself, and never dictate them over the phone — the vendor does not ask for them. Do not accept “free” or “warranty replacement” devices that arrive without your order. If you receive a suspicious contact, reach the vendor's support yourself through its official channels. Changing your seed is not required: secrets were not included in the leak, but expect increased social engineering pressure over the coming weeks."
hijacked: false
incidentKey: "keystone website|fp:857f822c0bbadf48"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - KeystoneWallet","url":"https://x.com/KeystoneWallet/status/2114054080754770137"}]
---
