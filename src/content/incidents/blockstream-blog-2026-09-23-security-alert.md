---
"title": "Blockstream: консенсус-баг в Elements использован для эмиссии необеспеченных LBTC и вывода около 4000 BTC из резерва Liquid"
"description": "6 сентября 2026 года атакующий использовал ошибку в кэше проверки rangeproof в Elements: ключ кэша не включал asset commitment и scriptPubKey, поэтому узлы приняли транзакцию, выход которой не был обеспечен входами. Так было выпущено около 4000 LBTC без стоящего за ними биткоина, после чего средства ушли через штатный peg-out; резерв Liquid упал примерно с 4205 BTC до 197 BTC. Атакующий вернул 3400 BTC, около 602 BTC остаются невозвращёнными; другие активы Liquid (USDt, DePix и прочие) не затронуты, но были недоступны на время остановки сети. Blockstream остановил bridge-узлы, выкатил срочный временный патч и затем выпустил проверенный релиз Elements v23.3.4."
"pubDate": "2026-09-23T22:00:37.238Z"
"statusTags":
  - "exploitation_confirmed"
  - "patch_available"
"audience":
  - "holders"
  - "node_operators"
"product": "elements"
"vendor": "Blockstream"
"action": "Операторам узлов Elements/Liquid — обновиться до Elements v23.3.4 немедленно, не откладывая на плановое окно: уязвимость подтверждённо эксплуатировалась на мейннете, а старые сборки могут разойтись с сетью по результатам валидации. Держателям LBTC — учитывать, что часть резерва не восстановлена, и сверять доступность peg-out перед крупными операциями; ссылки на отчёт и релиз — в посте."
"hijacked": false
"incidentKey": "elements|fp:5403d639f60eedad"
"links":
  - "label": "blog.blockstream.com"
    "url": "https://blog.blockstream.com/liquid-network-security-incident-assessment/"
  - "label": "github.com"
    "url": "https://github.com/ElementsProject/elements/releases/tag/elements-23.3.4?ref=blog.blockstream.com"
---
