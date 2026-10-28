---
"title": "Раскрыты две DoS-уязвимости в Eclair, исправленные в версии 0.14.0"
"description": "В Eclair 0.13.1 и раньше разбор вектора фич шёл побитово: одно init-сообщение максимальной длины вызывало около 300 МБ мусора в куче и занимало поток разбора до 300 мс (LNF-2026-0001). Поток таких сообщений, по описанию исследователя, отключает все пиры жертвы за минуту и исчерпывает память за пять. Вторая проблема (LNF-2026-0002) — всё ещё принимаемые zlib-сжатые channel queries без ограничения на размер вывода: запрос на 64 КБ разворачивается в 64 МБ и около 17 млн объектов в куче, поток таких сообщений уводит узел в офлайн за секунды. Обе исправлены в Eclair 0.14.0."
"pubDate": "2026-09-24T23:00:54.736Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "eclair"
"vendor": "Delving Bitcoin"
"action": "Проверьте версию Eclair сейчас: если она ниже 0.14.0, обновитесь до 0.14.0 или новее в это окно обслуживания — до обновления любой пир может уронить ваш узел и оборвать каналы. Кто уже перешёл на 0.14.3, действий не требует. Подробности advisory — по ссылкам в посте."
"hijacked": false
"incidentKey": "eclair|fp:a8e7db1954ddcadf"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-0/2914"
  - "label": "lnfuzz.org"
    "url": "https://lnfuzz.org/advisories/eclair-feature-parsing-dos/"
  - "label": "lnfuzz.org"
    "url": "https://lnfuzz.org/advisories/eclair-zlib-decompression-dos/"
---
