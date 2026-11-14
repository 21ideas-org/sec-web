---
"title": "Core Lightning: чужой funding outpoint в открытии канала роняет узел, фикс в v26.06.8"
"description": "Раскрытие LNF-2026-0004 описывает, что Core Lightning с v0.12.0 по v26.06.7 принимает funding_created, повторно использующий funding outpoint другого канала, из-за чего два канала получают один v1 channel_id. Если оба канала живы, переподключение срабатывает на assertion в connectd и роняет узел — бесплатно для атакующего и повторяемо при каждом перезапуске; если первый канал уже закрыт, закрытие второго срабатывает на assertion в lightningd, и узел уходит в crash-loop при старте до обновления, а атакующему это стоит только ончейн-комиссий. Уязвимость найдена фаззингом funding-флоу, вариант с закрытым каналом найден независимо; исправлено в Core Lightning v26.06.8, ссылка на advisory в посте."
"pubDate": "2026-11-14T20:00:41.015Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "core lightning"
"vendor": "Delving Bitcoin"
"action": "Операторам узлов Core Lightning версий с v0.12.0 по v26.06.7: обновитесь минимум до v26.06.8, источник советует ставить последний релиз. Если узел уже уходит в crash-loop при каждом старте, обновление — то, что источник называет выходом из этого состояния. Установкам, где это исправление уже есть, действий не требуется."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "core lightning|fp:8184091757ff7bc6"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/disclosure-dos-vulnerability-fixed-in-core-lightning-v26-06-8/3072"
  - "label": "lnfuzz.org"
    "url": "https://lnfuzz.org/advisories/cln-duplicate-funding-outpoint-dos/"
---
