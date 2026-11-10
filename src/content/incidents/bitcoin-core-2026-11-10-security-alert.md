---
"title": "Bitcoin Core: раскрыт CVE-2025-62859 — остановка обработки блоков через witness malleation в compact blocks"
"description": "По описанию проекта, в версиях Bitcoin Core до 29.2 и 30.0 состояние загрузки compact-блока сбрасывалось до проверки witness malleation, и при неудачной проверке узел заново запрашивал блок у того же пира через GETDATA с таймаутом 10 минут. Злонамеренный пир, первым объявивший compact-блок, мог так затормозить обработку блоков у жертвы; при контроле над всеми 3 high-bandwidth пирами или при запуске с -blocksonly это могло повторяться бесконечно. Проект оценивает серьёзность как Medium; исправление вышло в 30.0 и 29.2, последняя уязвимая ветка (29.x) снята с поддержки."
"pubDate": "2026-11-10T20:10:20.821Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Bitcoin Core"
"action": "Если вы держите узел на сборке без этих исправлений (старее 29.2 или 30.0), обновитесь на версию с фиксом; особенно это касается конфигураций с -blocksonly. Узлам, уже работающим с этими исправлениями, действий не требуется. Подробности — в advisory по ссылке в посте."
"hijacked": false
"incidentKey": "bitcoin core|CVE-2025-62859"
"links":
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62859/"
  - "label": "github.com"
    "url": "https://github.com/bitcoin/bitcoin/pull/32646"
---
