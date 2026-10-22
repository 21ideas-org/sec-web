---
"title": "Разработчик lnd рекомендует срочно обновить lnd, btcd, tapd и litd из-за CVE-2026-111943 (компрометация удостоверяющего центра)"
"description": "В посте ведущего разработчика lnd говорится о CVE-2026-111943 — компрометации удостоверяющего центра eMudhra, из-за которой доверенный в сборках корневой сертификат больше нельзя считать надёжным. Затронуты пользователи lnd, btcd, tapd и litd: скомпрометированный CA подрывает доверие к TLS-соединениям демонов, то есть к каналу, по которому идут RPC-подключения и внешний трафик узла. Для всех четырёх проектов уже опубликованы релизы, собранные с исправленным набором доверия; альтернатива — самостоятельная пересборка с Go 1.27.3."
"pubDate": "2026-10-22T03:30:46.715Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
  - "developers"
"product": "lnd, btcd, tapd, litd"
"vendor": "Amboss / Magma"
"action": "Обновите lnd, btcd, tapd и litd до релизов, ссылки на которые даны в посте, либо пересоберите свои бинарники с Go 1.27.3 — сделайте это сегодня, не дожидаясь планового окна обслуживания. Если собираете сами из исходников, обновите тулчейн Go до указанной версии перед пересборкой."
"hijacked": false
"incidentKey": "amboss / magma|CVE-2026-111943"
"links":
  - "label": "x.com - ambosstech"
    "url": "https://x.com/ambosstech/status/2113108185309454469"
  - "label": "github.com"
    "url": "https://github.com/lightningnetwork/lnd/releases/tag/v0.21.5-beta.rc1"
  - "label": "github.com"
    "url": "https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.7"
  - "label": "github.com"
    "url": "https://github.com/btcsuite/btcd/releases/tag/v0.27.0"
  - "label": "github.com"
    "url": "https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8"
---
