---
"title": "Core Lightning: узел падает от gossip-анонса с одинаковыми node_id, фикс в v26.04.1"
"description": "Раскрытие описывает, что Core Lightning версий v25.02–v26.04 аварийно завершается при получении channel_announcement, у которого node_id_1 и node_id_2 — один и тот же узел: gossipd не проверяет различие конечных точек и срабатывает assertion о дубликатах. Анонс записывается в gossip_store до загрузки, поэтому падение повторяется при каждом перезапуске, и узел остаётся офлайн, пока оператор не удалит запись вручную. Атакующему достаточно контролируемого непотраченного 2-of-2 выхода, то есть затраты сводятся к ончейн-комиссии. По данным раскрытия, фикс выпущен в v26.04.1, актуальный релиз на момент публикации — v26.06.9."
"pubDate": "2026-10-24T07:00:16.791Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "core lightning"
"vendor": "Delving Bitcoin"
"action": "Обновите Core Lightning минимум до v26.04.1, а лучше до текущего релиза v26.06.9. Если узел уже падает по кругу при старте, удалите проблемную запись из gossip_store вручную перед запуском. Технические детали и ссылка на релиз — по ссылкам ниже."
"hijacked": false
"incidentKey": "core lightning|fp:eb68b182e9106d2e"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/cln-self-referential-channel-announcement-dos-disclosure/2974"
  - "label": "nishantbansal2003.github.io"
    "url": "https://nishantbansal2003.github.io/posts/CLN-Self-Referential-Channel-Announcement-DoS/"
  - "label": "github.com"
    "url": "https://github.com/ElementsProject/lightning/releases/tag/v26.04.1"
---
