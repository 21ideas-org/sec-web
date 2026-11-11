---
"title": "Bitcoin Core раскрыл три уязвимости: одна высокой и две средней серьёзности"
"description": "После пре-анонса двухнедельной давности разработчики опубликовали детали трёх уязвимостей Bitcoin Core: CVE-2025-62861 — несогласованность mempool при обработке реорганизаций, эксплуатация которой мешает майнеру получать корректные блок-шаблоны; CVE-2025-62860 — неверное применение whitelist-привилегий к входящим Tor-соединениям, что позволяет вызвать DoS узла или утечку внутреннего состояния; CVE-2025-62859 — неуместная проверка malleation witness, позволяющая вредоносному пиру застопорить обработку блоков. Все три исправлены в Bitcoin Core 29.2 и последующих релизах 29.x, а также в 30.0 и всех более поздних версиях. Детали — в advisory по ссылкам в посте."
"pubDate": "2026-11-11T00:31:13.454Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "bitcoin core"
"vendor": "bitcoin-dev mailing list"
"action": "Если вы запускаете Bitcoin Core без этих исправлений, обновитесь до 29.2 или более позднего релиза 29.x либо до 30.0 или новее. Особое внимание — узлам с включёнными whitelist-привилегиями и входящими Tor-соединениями, а также майнинговым установкам, получающим блок-шаблоны. Установкам, уже содержащим эти исправления, действий не требуется."
"hijacked": false
"incidentKey": "bitcoin-dev mailing list|CVE-2025-62861"
"links":
  - "label": "mailing-list.bitcoindevs.xyz"
    "url": "https://mailing-list.bitcoindevs.xyz/bitcoindev/x8_ouI-b5d4xOuHCR353f-mt-bnpMdMK9joxUdYcVQdeiloXqBk2nZl1HNeyFPb-0a5Ef4z-v3EpT4NjjU85f6x5Cb2h-ZoVo7YrGcvEQ9E=@protonmail.com/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62861/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62860/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/2026/11/10/disclose-cve-2025-62859/"
  - "label": "bitcoincore.org"
    "url": "https://bitcoincore.org/en/security-advisories/"
---
