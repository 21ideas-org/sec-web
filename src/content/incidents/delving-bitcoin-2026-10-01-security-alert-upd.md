---
"title": "Две DoS-уязвимости в открытии каналов Eclair исправлены в v0.14.1"
"description": "В Eclair v0.14.0 и ранее найдены две проблемы в потоке открытия каналов. Первая (LNF-2026-0003) — гонка при проверке дублирующегося temporary_channel_id: поток одинаковых open_channel порождает осиротевшие акторы каналов и утечку памяти порядка мегабайта в секунду, что приводит к OOM-падению JVM или к зависанию на сборке мусора и уходу узла из сети. Вторая обходит ограничитель незавершённых каналов за счёт переиспользования финального id канала как временного: одно соединение без затрат on-chain за примерно 48 минут исчерпало 4 ГБ heap, а поскольку каналы сохраняются на диск, узел падал снова при каждом перезапуске до ручной чистки или увеличения heap. Атаки требуют лишь соединения с узлом; свидетельств эксплуатации в сети в сообщении нет."
"pubDate": "2026-10-01T19:01:26.560Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "eclair"
"vendor": "Delving Bitcoin"
"action": "Обновите Eclair до v0.14.1 или новее сейчас, не дожидаясь планового окна: атака бесплатна для нападающего и уводит узел из сети. Если узел уже падает по памяти с множеством незавершённых каналов, после обновления временно поднимите heap, чтобы узел стартовал, и уберите накопившиеся записи о фейковых каналах. Подробности и разбор — по ссылкам в посте."
"hijacked": false
"incidentKey": "eclair|fp:168da24e92097d16"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-1/2928#post_1"
  - "label": "lnfuzz.org"
    "url": "https://lnfuzz.org/advisories/eclair-open-channel-race-dos/"
  - "label": "morehouse.dev"
    "url": "https://morehouse.dev/lightning/fake-channel-dos/"
  - "label": "erickcestari.dev"
    "url": "https://erickcestari.dev/blog/eclair-oom-pending-channels/"
---
