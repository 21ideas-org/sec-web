---
"title": "Bitcoin Core 32.1: тот же фикс утечки IP в -privatebroadcast вышел и в новой мажорной ветке, версии 29.x и старше сняты с поддержки"
"description": "В анонсе релиза сообщается, что исправлен путь, при котором транзакция, отправленная через sendrawtransaction с -privatebroadcast=1, могла уйти напрямую по IPv4/IPv6 при откате с P2P v2 на v1, в обход принудительного прохода через Tor-прокси. Дополнительно: сборка 32.0 была помечена тегом, но полностью не выпускалась, а ветки 29.x и старше объявлены End of Life и обновлений больше не получат; среднюю и высокую тяжесть уязвимостей, исправленных в 30.0 (их 3), источник обещает раскрыть через две недели."
"pubDate": "2026-10-28T16:00:10.554Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Delving Bitcoin"
"action": "Если нода работает на 29.x или старше — обновлений для неё больше не будет, запланируйте переход на поддерживаемый релиз; сборку 32.0 не используйте, она не выпускалась. Процедура: остановить ноду, дождаться полного завершения работы (иногда несколько минут), затем запустить установщик (Windows) либо скопировать Bitcoin-Qt (macOS) или bin/ и libexec/ (Linux); при переходе с EOL-версии миграция каталога данных может занять время. Кому эти исправления уже доступны, дополнительных действий не требуется."
"hijacked": false
"incidentKey": "bitcoin core|fp:657c8748c4d4e4af"
"parent": "delving-bitcoin-2026-10-27-security-alert"
"links":
  - "label": "delvingbitcoin.org"
    "url": "https://delvingbitcoin.org/t/bitcoin-core-v32-1-released/3008"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/bin/bitcoin-core-32.1/"
---
