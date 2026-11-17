---
"title": "Coldcard: Edge-прошивка 6.6.2X/6.6.2QX с правками, включая непреднамеренную замену master seed на Q"
"description": "Вендор выпустил Edge-прошивку 6.6.2X для Mk4/Mk5 и 6.6.2QX для Q. Помимо функций (Codex32/BIP-93, Shamir-доли), заявлены защитные изменения: для Q — исправления Key Teleport MuSig lookups и непреднамеренной замены master seed при сканировании секретов; в общей части — аутентифицированное шифрование USB ncry v3 с защитой от повторов, более строгая проверка xpub, key-origin и BIP-388, отклонение некорректных PSBT и P2SH-P2WSH, усиленные проверки Proof-of-Reserves и HSM-политик, проверка границ прошивки и flash, защита виртуального диска PSRAM, более безопасное восстановление из backup, правки в Taproot, MuSig2 и Miniscript. Исправленная реализация RNG прошла сторонний аудит Keylabs; аудит вендор называет свидетельством, а не гарантией. Также запущена страница Security Status о текущих релизах, границах затронутых версий и ограничениях."
"pubDate": "2026-11-17T20:10:19.489Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "coldcard firmware"
"vendor": "Coinkite / Coldcard"
"action": "Условие: на устройстве используется Edge-прошивка. Тогда поставьте выпущенную сборку с этими исправлениями — 6.6.2X для Mk4/Mk5, 6.6.2QX для Q; ссылки на release notes и загрузки в посте. Если этих исправлений у вас уже нет повода ставить — то есть вы на стабильной прошивке — действий не требуется: вендор прямо пишет, что Edge предназначена разработчикам и ранним пользователям, не прошла квалификацию обычных релизов и большинству пользователей следует оставаться на стабильной прошивке. Сроков вендор не называет."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "coldcard firmware|fp:ca21d5582c2ba8f6"
"links":
  - "label": "x.com - COLDCARDwallet"
    "url": "https://x.com/COLDCARDwallet/status/2122782501118902640"
  - "label": "github.com"
    "url": "https://github.com/Coldcard/firmware/blob/2026-11-17T1904-v6.6.2X/releases/EdgeChangeLog.md"
---
