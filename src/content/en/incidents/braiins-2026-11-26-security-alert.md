---
"title": "Braiins: plain Stratum V1 hashrate hijacking grew to 1.9 EH/s and hit more than 1,000 mining sites"
"description": "In an FAQ, Braiins describes an attack on miners across all pools that exploits a weakness in plain Stratum V1: the protocol cannot authenticate the pool. An attacker reroutes internet traffic and impersonates the pool, so the miner's configuration stays unchanged but its hashrate goes to someone else. Braiins says no machines, settings or pools are breached; the breach is at the internet-provider level. According to Braiins, the scope was 175 PH/s in early November and grew to 1.9 EH/s by Nov 20, with more than 1,000 sites affected at once. Victims were ordinary miners on plain V1 running more than 12 firmware types on hundreds of networks. The payout so far is small (CoinDesk estimates about $17k), but between waves the attacker changed the method and moved from Latin America to Europe, which Braiins reads as possible testing of the waters. Braiins says this is not the same incident as the breach two weeks earlier, which compromised a fleet-management platform and changed pool settings on clients' machines. Braiins Pool and Braiins OS, like other pools and firmware, were not compromised. Braiins notes that Dell SecureWorks documented the same routing trick in 2014 (about $83k); what is new is the scale."
"pubDate": "2026-11-26T18:10:22.100Z"
"statusTags":
  - "exploitation_confirmed"
"audience":
  - "node_operators"
"product": "stratum v1"
"vendor": "Braiins"
"action": "If you mine over plain Stratum V1, whether on a large farm, a single mini miner or a solo pool, move to Stratum V2 or to Stratum V1 over TLS. With TLS, your firmware must validate the pool's certificate, otherwise there is no protection. V2 is an open protocol that any pool can run. Changing your miner configuration will not help: according to Braiins, settings are not altered by this attack. Braiins says only hashrate is stolen on its way to the pool, and accounts, balances and payout settings are safe, so they do not need to be changed. If you already use V2, or V1 over TLS with certificate validation, no action is needed."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "stratum v1|fp:3414372b8667a38a"
"parent": "braiins-2026-11-25-security-alert"
"enPublishedAt": "2026-11-26T18:20:25.783Z"
"links":
  - "label": "x.com - Braiins"
    "url": "https://x.com/Braiins/status/2126013474325348442"
---
