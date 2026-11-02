---
"title": "BTCPay Server: attack vector targets instances on version 2.4.1 or older; some hosted servers shut down automatically"
"description": "After its incident response investigation, the BTCPay Server team says the attack vector it identified targets instances running version 2.4.1 (July 23, 2026) or older. The vendor has no credible reports of hot wallet drains for users on the latest release, 2.4.7. It again urges everyone to keep BTCPay Server updated and asks anyone affected to send all details and logs to its security contact given in the announcement. If your instance runs through a hosting provider, it may have been shut down automatically to keep older versions from being exploited. The vendor thanks hosting providers for their swift action after its initial announcement."
"pubDate": "2026-11-02T04:10:56.174Z"
"statusTags":
  - "exploitation_confirmed"
  - "patch_available"
"audience":
  - "holders"
  - "node_operators"
  - "merchant_infra"
"product": "btcpay server"
"vendor": "BTCPay Server"
"action": "If you run BTCPay Server 2.4.1 or older, update to 2.4.7 now: Server Settings → Maintenance → Update, or the standard update script on a Docker deployment. Review login logs, the administrator list, API keys, payout settings and withdrawal addresses. If you see signs of unauthorized access, treat linked hot wallets and Lightning nodes as compromised and move funds to new keys created in a trusted environment. If your hosted instance is unavailable, the provider may have stopped it because of the old version: ask the provider and update before it is started again. If you were affected, send details and logs to the vendor's security contact. Instances already on 2.4.7 need no update."
"hijacked": false
"incidentKey": "btcpay server|product-fp:2c129a2ecc239e1a"
"enPublishedAt": "2026-11-02T04:30:02.550Z"
"links":
  - "label": "x.com - BtcpayServer"
    "url": "https://x.com/BtcpayServer/status/2117106240098611681"
---
