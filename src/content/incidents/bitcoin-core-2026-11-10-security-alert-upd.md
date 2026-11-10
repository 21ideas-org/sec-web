---
"title": "Bitcoin Core: входящие Tor-соединения ошибочно получали права -whitelist (CVE-2025-62860)"
"description": "Bitcoin Core до версий 28.3, 29.2 и 30.0 применял права -whitelist к входящим Tor-пирам, если IP-диапазон из -whitelist совпадал с адресом локального Tor-демона; -whitelist снимает ряд DoS-ограничений и мер против утечек приватности для доверенных пиров. Severity оценена как Medium. По данным раскрытия, популярные вендоры поставляли Bitcoin Core вместе с Tor-демоном и задавали -whitelist под его IP-диапазон, из-за чего тысячи достижимых mainnet-узлов вайтлистили все входящие Tor-соединения. Узлы без нестандартной опции -whitelist затронуты не были."
"pubDate": "2026-11-10T20:10:20.821Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Bitcoin Core"
"action": "Касается узлов с заданной опцией -whitelist (в том числе готовых сборок, где она выставлена под локальный Tor-демон). Обновитесь до Bitcoin Core 30.0 или новее, либо 29.2 или новее, либо 28.3 или новее — в них входящие соединения на onion-bind не вайтлистятся. Если сборка уже содержит это исправление, действий не требуется; сборки на основе прежних версий обновляйте через своего поставщика дистрибутива. Подробности — в advisory по ссылке в посте."
"hijacked": false
"incidentKey": "bitcoin core|CVE-2025-62860"
"links":
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62860/"
  - "label": "github.com"
    "url": "https://github.com/bitcoin/bitcoin/pull/33395"
---
