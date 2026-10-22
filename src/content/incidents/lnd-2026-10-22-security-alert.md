---
"title": "Lightning Labs: из-за компрометации удостоверяющего центра нужно обновить lnd, btcd, tapd и litd"
"description": "Команда проекта сообщает о CVE, связанном с компрометацией удостоверяющего центра eMudhra, и настоятельно рекомендует пользователям lnd, btcd, tapd и litd либо перейти на свежие релизные бинарники, либо пересобрать свои из исходников с Go 1.27.3. Затронут доверенный набор корневых сертификатов, на который опираются TLS-соединения узла и сопутствующих сервисов. Пока узел работает со старой сборкой, его соединения доверяют сертификатам скомпрометированного центра."
"pubDate": "2026-10-22T03:10:24.553Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
  - "developers"
"product": "lnd"
"vendor": "LND"
"action": "Сегодня же обновитесь до релизов, ссылки на которые приведены ниже, либо пересоберите свои бинарники с Go 1.27.3. Не откладывайте до планового окна обслуживания: совет исходит от самого проекта и касается всех четырёх компонентов."
"hijacked": false
"incidentKey": "lnd|CVE-2026-111943"
"links":
  - "label": "x.com - lightning"
    "url": "https://x.com/lightning/status/2113104345848021019"
  - "label": "github.com"
    "url": "https://github.com/lightningnetwork/lnd/releases/tag/v0.21.5-beta.rc1"
  - "label": "github.com"
    "url": "https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.7"
  - "label": "github.com"
    "url": "https://github.com/btcsuite/btcd/releases/tag/v0.27.0"
  - "label": "github.com"
    "url": "https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8"
---
