---
"title": "lnd v0.20.7 и v0.21.6 выпущены с Go-мерой (отключение MPTCP) против CVE-2026-98432"
"description": "По сообщению lnd, релизы v0.20.7 и v0.21.6 содержат Go-специфичную меру — отключение флага MPTCP — для CVE-2026-98432, use-after-free в IPv4 TCP ядра Linux. Источник подчёркивает, что уязвимость уровня ядра: полностью её закрывает только патч ядра, поскольку затронутым может быть любой сетевой сервис; известные PoC используют MPTCP, но другие векторы не исключены. Разработчики рекомендуют всем пользователям обновиться."
"pubDate": "2026-10-30T22:51:08.428Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "lnd"
"vendor": "LND"
"action": "Операторам узлов lnd на Linux: обновитесь до v0.20.7 или v0.21.6 по рекомендации источника. Уже имеющиеся бинарники можно защитить, запуская их с переменной окружения GODEBUG=multipathtcp=0. Независимо от обновления lnd примените патч ядра Linux — по словам источника, только это полностью устраняет уязвимость, и она касается любого сетевого сервиса на хосте. Ссылки на релизы и пояснение Go — в посте."
"hijacked": false
"incidentKey": "lnd|CVE-2026-98432"
"links":
  - "label": "x.com - lightning"
    "url": "https://x.com/lightning/status/2116301336807666159"
  - "label": "github.com"
    "url": "https://github.com/lightningnetwork/lnd/releases/tag/v0.21.6-beta"
  - "label": "github.com"
    "url": "https://github.com/lightningnetwork/lnd/releases/tag/v0.20.7-beta"
  - "label": "github.com"
    "url": "https://github.com/golang/go/issues/82717#issuecomment-6508681582"
---
