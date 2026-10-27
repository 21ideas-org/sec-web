---
"title": "Bitcoin Core v31.1: исправлен путь, при котором режим -privatebroadcast мог соединяться через clearnet"
"description": "В обсуждении релиза сообщается, что v31.1 закрывает путь, при котором соединение в режиме -privatebroadcast могло пойти через clearnet, несмотря на включённую приватную сеть. Автор советует всем, кто использует этот режим, обновиться без задержки. Деталей дефекта и сведений об эксплуатации в сообщении нет."
"pubDate": "2026-10-27T16:00:15.553Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Delving Bitcoin"
"action": "Если нода запускается с -privatebroadcast и этих исправлений в ней нет — обновитесь на указанный в сообщении релиз в ближайшее время. До обновления не полагайтесь на этот режим как на гарантию приватности отправки: трансляция могла уходить вне приватной сети. Установкам, где режим не используется, и уже содержащим это исправление действий не требуется."
"hijacked": false
"incidentKey": "bitcoin core|fp:657c8748c4d4e4af"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/bitcoin-core-v31-1-released/2696#post_2"
---
