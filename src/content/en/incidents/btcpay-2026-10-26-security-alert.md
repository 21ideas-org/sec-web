---
title: "BTCPay Server 2.4.6: security fixes for API key permissions, redirects, subscriptions and untrusted input handling"
description: "The release fixes a number of security defects responsibly disclosed by researchers: restricted API keys now stay within their granted store and user permissions, even if the key owner is a server administrator; only absolute HTTP/HTTPS redirects are accepted in key authorization and invoice requests in the Greenfield and BitPay-compatible APIs; new subscriptions can no longer take over existing accounts; sanitization of custom HTML/CSS and handling of untrusted input in the API, wallet, forms, webhooks and Payjoin requests have been strengthened; logging out requires a protected POST. .NET and the Ubuntu container's trusted certificate store have also been updated for the Brotli decoder vulnerability (CVE-2026-111497) and to revoke trust in certificates affected by the compromise of the eMudhra CA key. Breaking change: the deprecated invoice-level notificationEmail option has been removed."
pubDate: "2026-10-26T14:30:16.405Z"
statusTags: ["patch_available"]
audience: ["merchant_infra"]
product: "btcpay server"
vendor: "BTCPay Server"
action: "If you operate your own BTCPay Server instance without these fixes, update to 2.4.6 soon. Before updating, account for the breaking change: invoices no longer have the notificationEmail option, so notifications must be moved to the store's email rules. After updating, check restricted API keys and configured redirects — their permission scope is now strictly enforced. No action is required for anyone already on 2.4.6."
hijacked: false
incidentKey: "btcpay server|CVE-2026-111497"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/btcpayserver/btcpayserver/releases/tag/v2.4.6"}]
---
