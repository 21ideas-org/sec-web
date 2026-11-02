---
"title": "BTCPay Server: hot wallet thefts on 2.4.1 and earlier, updating alone is not enough, vendor advises moving to a clean server"
"description": "On 1 November 2026 the vendor received reports of Bitcoin and Litecoin stolen from BTCPay Server hot wallets. Its investigation found the attacks targeted servers running 2.4.1 (released 23 July 2026) or earlier, using a different method to exploit the vulnerability fixed in 2.4.2 (7 August 2026). Further security updates followed, including 2.4.4 and 2.4.5. The vendor stresses that updating cannot remove access an attacker may already have gained, and that an unchanged wallet balance does not rule out an earlier attack. It has not established when exploitation began. Funds in wallets whose spending keys are held off the server, including hardware wallets, were not affected by these thefts, and the vendor still recommends accepting payments into such wallets."
"pubDate": "2026-11-02T14:41:11.947Z"
"statusTags":
  - "exploitation_confirmed"
  - "patch_available"
"audience":
  - "holders"
  - "node_operators"
  - "merchant_infra"
"product": "btcpay server"
"vendor": "BTCPay Server"
"action": "If your server ran 2.4.1 or earlier, the vendor advises moving to a fresh server, even without signs of theft and even if you updated after the 1 November warning. On a trusted device create a new wallet with a new seed (don't reuse the old one) and sweep remaining hot-wallet funds into it. Take the old server offline, keeping logs and transaction records. Deploy a clean VM with the latest supported release from trusted sources; don't restore the old server wholesale. From a trusted device replace passwords and access keys (hosting, SSH, application, API, Lightning); never enter them on the old machine. With signs of unauthorized access, treat the whole machine and its secrets as compromised. The vendor saw no impact on servers already on 2.4.2 or later on 1 November."
"hijacked": false
"incidentKey": "btcpay server|product-fp:7615b343d49512a2"
"enPublishedAt": "2026-11-02T15:00:07.301Z"
"links":
  - "label": "x.com - BtcpayServer"
    "url": "https://x.com/BtcpayServer/status/2117264826569211992"
  - "label": "blog.btcpayserver.org"
    "url": "https://blog.btcpayserver.org/btcpay-server-security-incident-2-4-1-and-earlier/"
---
