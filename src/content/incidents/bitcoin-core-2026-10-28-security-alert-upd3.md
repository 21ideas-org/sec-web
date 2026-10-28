---
"title": "Bitcoin Core: пир может уронить узел на Windows, macOS и BSD через TCP urgent data"
"description": "По раскрытию Bitcoin Core, на платформах кроме Linux используется backend мониторинга сокетов на основе select(), который отслеживал исключительные состояния сокета независимо от того, приостановлено ли чтение. Отправкой TCP urgent (out-of-band) данных злонамеренный пир обходит механизм backpressure и заставляет узел складывать в очередь неограниченный объём данных; источник пишет, что на практике это позволяет тривиально обрушить любой узел под Windows, macOS или BSD, к которому атакующий подключён. Severity оценена как Medium, путь кода select() — единственный затронутый, узлы на Linux не затронуты. Исправление вышло в версиях 29.5, 30.4, 31.2 и 32.1."
"pubDate": "2026-10-28T18:31:22.448Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "Bitcoin Core"
"action": "Операторам узлов Bitcoin Core на Windows, macOS или BSD: если этих исправлений в установке нет — обновитесь на 29.5, 30.4, 31.2 или 32.1 по своей ветке в ближайшее время. Узлы на Linux не затронуты; установкам, где эти исправления уже есть, действий не нужно."
"hijacked": false
"incidentKey": "bitcoin core|product-fp:cd10194486d7ba74"
"links":
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/10/28/disclose-tcp-oom/"
---
