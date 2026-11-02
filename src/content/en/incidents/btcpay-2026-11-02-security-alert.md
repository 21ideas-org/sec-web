---
"title": "BTCPay Server: attacker logged in as admin on self-hosted instances before 2.4.2, method still unknown"
"description": "A BTCPay Server developer reports that on affected instances an attacker was able to log in as an administrator; the team is still working out how. According to the developer, the attack reports concern installations before 2.4.2, and the project's own public servers running 2.4.7 were not attacked. The cause and the full list of affected installations are not stated."
"pubDate": "2026-11-02T01:21:08.061Z"
"statusTags":
  - "exploitation_confirmed"
"audience":
  - "node_operators"
  - "merchant_infra"
"product": "btcpay server"
"vendor": "BTCPay Server"
"action": "If you run your own BTCPay Server, especially a version before 2.4.2, act now: review login logs and the lists of administrators and users for unknown accounts and sessions, reset administrator passwords and API keys, and enable 2FA. Check store, payout and withdrawal address settings for tampering, and reconcile recent payouts. If you see signs of unauthorized access, treat hot wallets and Lightning nodes tied to the server as compromised and move funds to new keys created in a trusted environment. The vendor's message is linked in the post."
"hijacked": false
"incidentKey": "btcpay server|product-fp:47e11916bdec015f"
"enPublishedAt": "2026-11-02T01:40:03.502Z"
"links":
  - "label": "x.com - BtcpayServer"
    "url": "https://x.com/BtcpayServer/status/2117063204602007922"
---
