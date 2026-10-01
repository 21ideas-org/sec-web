---
"title": "Две DoS-уязвимости в открытии каналов Eclair исправлены в v0.14.1"
"description": "В Eclair v0.14.0 и ранее раскрыты две уязвимости в потоке открытия каналов. Первая (LNF-2026-0003) — гонка при проверке дублирующегося temporary_channel_id: конвейер одинаковых open_channel порождает осиротевшие акторы каналов, утечка около 1 МБ в секунду приводит к OOM в JVM или к спирали сборки мусора, которая выводит узел из сети. Вторая — обход ограничителя незафиксированных каналов за счёт переиспользования финального id канала как временного: одно соединение без затрат on-chain исчерпало 4 ГБ heap примерно за 48 минут, а поскольку каналы сохраняются на диск, узел падал снова при каждом перезапуске, пока оператор не увеличивал heap или не удалял записи вручную. Затрагивает операторов лайтнинг-узлов на Eclair."
"pubDate": "2026-10-01T19:01:26.560Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "eclair"
"vendor": "Delving Bitcoin"
"action": "Обновите Eclair до v0.14.1 или новее сейчас — узел с прежней версией валится от одного входящего соединения. Если узел уже падает при старте с OOM, поднимите heap или вручную удалите записи незавершённых каналов, чтобы запуститься, и затем обновитесь; подробности в advisory по ссылкам в посте."
"hijacked": false
"incidentKey": "eclair|fp:147f70ef607d6408"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/disclosure-dos-vulnerabilities-fixed-in-eclair-v0-14-1/2928"
  - "label": "lnfuzz.org"
    "url": "https://lnfuzz.org/advisories/eclair-open-channel-race-dos/"
  - "label": "morehouse.dev"
    "url": "https://morehouse.dev/lightning/fake-channel-dos/"
  - "label": "erickcestari.dev"
    "url": "https://erickcestari.dev/blog/eclair-oom-pending-channels/"
---
