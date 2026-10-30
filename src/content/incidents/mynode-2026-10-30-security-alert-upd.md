---
"title": "myNode опубликовал новую меру смягчения: правило iptables для узла"
"description": "В дополнение к ранее объявленной уязвимости вендор myNode выпустил новую меру смягчения — правило iptables, которое нужно выполнить в терминале Linux на самом узле."
"pubDate": "2026-10-30T22:51:08.428Z"
"statusTags": []
"audience":
  - "node_operators"
"product": "mynode"
"vendor": "myNode"
"action": "Если у вас узел на myNode: выполните в терминале Linux команду вендора — sudo iptables -t raw -I PREROUTING -m u32 --u32 \"0>>24&0x0F=6:15\" -j DROP. Вендор подаёт это как дополнительную меру смягчения, а не как замену ранее названным."
"hijacked": false
"incidentKey": "mynode|product-fp:c55582f683687a41"
"parent": "mynode-2026-10-30-security-alert"
"links":
  - "label": "x.com - mynodebtc"
    "url": "https://x.com/mynodebtc/status/2116301608225309180"
---
