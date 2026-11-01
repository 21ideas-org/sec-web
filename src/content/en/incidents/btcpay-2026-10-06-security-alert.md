---
title: "BTCPay Server 2.4.5: Tor becomes optional, some Docker integrations removed"
description: "The vendor has released BTCPay Server 2.4.5 with security hardening around Lightning and LNURL, while also simplifying the standard Docker deployment. Tor is no longer included by default: existing installations must explicitly opt in, or the server will lose its onion address after the next Docker configuration or update. A number of abandoned integrations have also been removed (including JoinMarket, Electrum Personal Server and BWT, BlueWallet LNDHub, Traefik, BTCTransmuter and Configurator, as well as obsolete altcoin chains) — configurations that depend on them will stop building. Public LND and Core Lightning APIs have not been exposed by default since 2.4.2; the btcpay-routes command has been introduced in place of manual Nginx editing."
pubDate: "2026-10-06T15:10:27.961Z"
statusTags: []
audience: ["node_operators","merchant_infra"]
product: "btcpay server"
vendor: "BTCPay Server"
action: "Before updating, check whether your deployment depends on Tor or the removed integrations, and plan the migration. Update through Server Settings > Maintenance > Update; if you need an onion address, run sudo btcpay-fragments add opt-add-tor immediately after moving to 2.4.5 — existing Tor data remains in the current volumes. If external tools such as Zeus need access to the Lightning API, expose only the necessary routes through btcpay-routes and protect the credentials. Details are linked below."
hijacked: false
incidentKey: "btcpay server|product-fp:9a6ad14cdd04ec46"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - BtcpayServer","url":"https://x.com/BtcpayServer/status/2107488561599488205"},{"label":"x.com","url":"https://x.com/i/article/2107483879258918912"}]
---
