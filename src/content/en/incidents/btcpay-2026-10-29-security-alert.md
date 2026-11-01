---
title: "BTCPay Server 2.4.7: bug-fix release addresses 85 security findings; update especially recommended for shared servers"
description: "The vendor has released 2.4.7 and describes it as a bug-fix release addressing security, reliability and payment accounting issues; the scan report lists 85 findings fixed (1 Critical, 13 High, 52 Medium, 19 Low), with details of Critical and High findings deliberately withheld. The named fixes include: canceled payouts can no longer be reopened to bypass pull payment limits; confirmation policies and expiry limits apply to anonymously created BitPay API invoices, reading an individual invoice requires authentication, and supplied tokens are checked against the authenticated identity; cases where forms, search, notifications and Greenfield listings exposed another store's data or forms have been fixed; 2FA attempt limits have been strengthened for concurrent logins; LNURL-auth challenges expire after five minutes and are invalidated when credentials change; cached addresses are checked for ownership by the current wallet after replacement, deletion or multisig setup. The vendor strongly recommends the update, particularly for servers shared by several merchants. The legacy /invoices/create routes have also been removed in favor of /stores/{storeId}/invoices/create."
pubDate: "2026-10-29T13:50:22.515Z"
statusTags: ["patch_available"]
audience: ["merchant_infra"]
product: "btcpay server"
vendor: "BTCPay Server"
action: "If you run your own BTCPay Server installation without these fixes, update it: Server Settings → Maintenance → Update, or use the standard update script; the vendor considers this particularly important for servers shared by several merchants. If your integrations use the legacy /invoices/create routes, switch them to /stores/{storeId}/invoices/create before updating, otherwise payment acceptance through them will stop working. Installations that already have these fixes require no action."
hijacked: false
incidentKey: "btcpay server|product-fp:751bcf37809ddc75"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/btcpayserver/btcpayserver/releases/tag/v2.4.7"}]
---
