# sec-web

Сайт [sec.21ideas.org](https://sec.21ideas.org) — критические security-оповещения
для биткоинеров. Канонический контент автоматически создаёт
[`sec-watcher-bot`](https://github.com/21ideas-org/sec-watcher-bot) create-only запросом
в `sec-web/main` через Contents API. И live, и `--dry-run` пишут сюда публичную страницу;
режим меняет только адресата парного Telegram-уведомления. После каждого push в `main`
Actions собирают и деплоят сайт на GitHub Pages.

Astro без фреймворков, статика.

```
npm install
npm run dev
```
