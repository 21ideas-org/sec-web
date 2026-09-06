---
"title": "Specter-DIY v1.10.5: устранены сбой обработки случайных чисел и слабая проверка сдачи"
"description": "В прошлых версиях прошивки Specter-DIY сбой аппаратного генератора случайных чисел мог быть тихо принят за валидную энтропию, а сдача в транзакции проверялась по метаданным, переданным компьютером, без сверки на самом устройстве — это открывало путь к подмене адреса сдачи вредоносным хостом. Также была восстановлена предупреждающая проверка на смешивание входов из разных кошельков в одной транзакции, которая ранее не срабатывала. Затрагивает держателей аппаратного кошелька Specter-DIY."
"pubDate": "2026-09-06T15:22:40.466Z"
"urgency":
  - "#патч_есть"
"audience":
  - "держатели"
"product": "specter-diy firmware"
"vendor": "Specter Desktop"
"action": "Обновите прошивку Specter-DIY до v1.10.5 через SD-карту; если у вас версия v1.9.0 или старше, сначала установите v1.10.3 — это было обязательное промежуточное обновление."
"exploitationStatus": "unknown"
"fixStatus": "available"
"updateSufficiency": "unknown"
"actionTiming": "now"
"hijacked": false
"incidentKey": "specter-diy firmware|fp:e0c25781242c667b"
"links":
  - "label": "x.com"
    "url": "https://x.com/SpecterDIY/status/2096553405728641444"
  - "label": "github.com"
    "url": "https://github.com/cryptoadvance/specter-diy/releases/tag/v1.10.5"
---
