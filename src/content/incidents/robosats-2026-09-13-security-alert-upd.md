---
"title": "RoboSats v0.8.7-alpha исправляет XSS у клиентов; для выплаты наград фикс не подтверждён"
"description": "Уточнение к сообщению от 12 сентября: в RoboSats v0.8.7-alpha опасное HTML-сообщение координатора теперь выводится как текст, поэтому описанный XSS-путь у веб-, Android- и десктоп-клиентов исправлен. Однако проверка кода этого релиза не подтверждает исправление второй проблемы из advisory — повторной выплаты награды после неопределённого исхода Lightning-платежа. Поле advisory, называющее v0.8.7 исправленной версией для обеих проблем, расходится с опубликованным кодом релиза."
"pubDate": "2026-09-13T11:08:34.000Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
  - "node_operators"
"product": "robosats"
"vendor": "RoboSats"
"action": "Пользователям RoboSats: обновитесь до v0.8.7-alpha из официального релиза — это закрывает XSS через окно информации о координаторе. Операторам координаторов: до отдельного подтверждения исправления не считайте проблему с повторной выплатой наград закрытой; сохраняйте прежние меры — приостановите вывод наград либо увеличьте таймаут и вручную сверяйте платежи, которые ещё могут быть в пути, перед повторной выплатой."
"hijacked": false
"incidentKey": "robosats|GHSA-HP64-3GP5-V8FR"
"parent": "robosats-2026-09-12-security-alert"
"links":
  - "label": "github.com"
    "url": "https://github.com/RoboSats/robosats/security/advisories/GHSA-hp64-3gp5-v8fr"
  - "label": "github.com"
    "url": "https://github.com/RoboSats/robosats/releases/tag/v0.8.7-alpha"
---
