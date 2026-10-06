---
"title": "BTCPay Server 2.4.5: Tor становится опциональным, часть Docker-интеграций удалена"
"description": "Вендор выпустил BTCPay Server 2.4.5 с ужесточением безопасности вокруг Lightning и LNURL и одновременно упростил стандартное Docker-развёртывание. Tor больше не входит в состав по умолчанию: существующие установки должны выбрать его явно, иначе после следующей настройки или обновления Docker сервер останется без своего onion-адреса. Также удалён ряд заброшенных интеграций (среди них JoinMarket, Electrum Personal Server и BWT, BlueWallet LNDHub, Traefik, BTCTransmuter и Configurator, а также устаревшие альткоин-цепочки) — конфигурации, которые на них опираются, перестанут собираться. Публичные API LND и Core Lightning по умолчанию не выставлены начиная с 2.4.2, вместо ручной правки Nginx появилась команда btcpay-routes."
"pubDate": "2026-10-06T15:10:27.961Z"
"statusTags": []
"audience":
  - "node_operators"
  - "merchant_infra"
"product": "btcpay server"
"vendor": "BTCPay Server"
"action": "Перед обновлением проверьте, зависит ли ваше развёртывание от Tor или от снятых интеграций, и спланируйте миграцию. Обновляйтесь через Server Settings > Maintenance > Update; если нужен onion-адрес, сразу после перехода на 2.4.5 выполните sudo btcpay-fragments add opt-add-tor — существующие Tor-данные сохраняются в текущих томах. Если внешним инструментам вроде Zeus нужен доступ к Lightning-API, откройте только необходимые маршруты через btcpay-routes и защитите учётные данные. Подробности по ссылкам ниже."
"hijacked": false
"incidentKey": "btcpay server|product-fp:9a6ad14cdd04ec46"
"links":
  - "label": "x.com - BtcpayServer"
    "url": "https://x.com/BtcpayServer/status/2107488561599488205"
  - "label": "x.com"
    "url": "https://x.com/i/article/2107483879258918912"
---
