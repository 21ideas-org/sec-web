---
"title": "Core Lightning: плагин currencyrate доверяет скомпрометированным сертификатам, возможен MITM по HTTPS (RUSTSEC-2026-0381)"
"description": "Проект Core Lightning в своём канале сообщает, что старые версии зависимости webpki-roots продолжают доверять скомпрометированным промежуточным сертификатам emSign, из-за чего HTTPS-запросы могут быть подвержены MITM. Сам код CLN и протокол Lightning не затронуты: проблема ограничена плагином currencyrate, который включён по умолчанию. Риск возникает при использовании команд этого плагина и при настройке пересчёта валюты для плагина bookkeeper. Плагин BIP353 на практике не затронут, поскольку опирается на DNS и игнорирует уязвимый путь проверки сертификата."
"pubDate": "2026-10-22T13:30:08.724Z"
"statusTags": []
"audience":
  - "node_operators"
"product": "core lightning"
"vendor": "Core Lightning (CLN)"
"action": "Если функциональность currencyrate вам не нужна, отключите плагин сейчас, добавив в конфигурацию CLN строку disable-plugin=cln-currencyrate. Исправление пока не выпущено: оно ждёт обновления зависимости и следующего релиза CLN, поэтому до него полагайтесь на отключение плагина, а не на обновление."
"hijacked": false
"incidentKey": "core lightning|fp:5a90bc87fa079831"
"links":
  - "label": "x.com - Core_LN"
    "url": "https://x.com/Core_LN/status/2113259577789575352"
---
