# AGENTS.md

`sec-web` — публичный статический сайт `sec.21ideas.org`. Канонический content
автоматически создаёт
[`sec-watcher-bot`](https://github.com/21ideas-org/sec-watcher-bot): immutable Markdown
пишется create-only запросом в `sec-web/main`, а парное Telegram-уведомление ссылается
на его permalink.

Implementation work приходит только из central tracker
[`21ideas-org/sec-watcher-bot`](https://github.com/21ideas-org/sec-watcher-bot/issues).
Issue обязан содержать применимые решения website delivery plan; не достраивать target
по комментариям вне текущего issue или произвольному описанию.

## Safety contract

- Content schema проверяет обязательную форму и оставляет status-словари открытыми:
  неизвестные statusTags, legacy urgency и значения status-осей принимаются как строки,
  но не публикуются и не создают claims или цвет. Неверная форма останавливает
  check/build; schema errors не проглатывать.
- В bot-generated incident content `reason`, raw model links и URL без cross-check не
  публикуются: ссылки приходят только из validated `links[]`, hijack banner строится
  кодом из trusted `vendor`. Human-maintained archive отдельно использует доверенный
  `sourceUrl`; не переносить этот путь в автоматическую доставку.
- Slug равен basename Markdown file. Папка не входит в route. Никогда не переименовывать
  опубликованный basename/permalink.
- Incident filename: `<product>-<YYYY-MM-DD>-<short>.md`; date — UTC frozen logical
  publication time, известное до GitHub/Telegram network calls. Archive сохраняет свой
  `<YYYY-MM-DD>-<name>` naming.
- `parent` у update равен root slug. Orphan должен остаться видимой самостоятельной
  страницей, а не уронить build.
- `external: true` одновременно отключает собственную incident page и RSS, исключает
  запись из counter и направляет link на `sourceUrl`. Не разъединять эти следствия.
- Counter считает от первого post последнего thread; facts описывают отдельную
  публикацию, а не агрегированное текущее состояние инцидента.

## Current schema и delivery

- `statusTags?: string[]` — optional supported facts. Наличие, включая `[]`, полностью
  отключает legacy fallback. Unknown IDs не печатаются и не создают claims; неверная
  форма останавливает build. Единственная presentation boundary — `src/status.ts`.
- Для legacy content без `statusTags` каждая explicit status-ось блокирует fallback
  своего `urgency[]` значения, включая unknown. Active/observed означают подтверждённую
  эксплуатацию; partial не означает отсутствие патча. Conflicting patch tags оба
  опускаются с безопасным build diagnostic, exploitation сохраняется.
- Приоритет card/OG: exploitation red, patch unavailable yellow, patch available green,
  иначе neutral. Green означает только наличие патча. Совместимые факты показаны вместе;
  пустой набор не означает безопасность. Не добавлять статусную статистику или фильтры.
- `audience[]` остаётся free-string списком; reader нормализует только явные aliases.
  Audience, identity, thread links и source provenance независимы от status facts.
- Единственная нормализация audience — `src/audience.ts` (`normalizeAudience`), единственная
  логика фильтра — `src/audience-filter.ts`; браузерный скрипт импортирует их, а не заводит
  свой словарь. Состояние фильтра живёт в URL (`/feed?audience=<id>`, повторяющийся ключ,
  OR-совпадение, все четыре ID = лента без фильтра, нераспознанное значение = явное
  invalid-состояние со сбросом). Фильтрация клиентская, поверх уже отрендеренных строк:
  без backend, без подгрузки, без filtered RSS и audience landing pages. Legacy `all`,
  пустые и неизвестные audience видны только в полной ленте и не получают выдуманной
  принадлежности; `external` хроника в фильтр не входит.
- Website — роль общего crash-safe outbox. Slug, Markdown bytes и logical `pubDate`
  замораживаются до первого сетевого вызова; GitHub write создаёт только отсутствующий
  файл и не перезаписывает его после Telegram delivery. `telegramUrl` остаётся optional
  reserved field.
- Одна bounded website-попытка идёт перед парным Telegram send, но bot не ждёт retry,
  workflow, Pages, DNS или HTTP 200. Custom 404 честно покрывает build window.
- Live и `--dry-run` одинаково пишут канонический public incident content в
  `sec-web/main` для `https://sec.21ideas.org`. Runtime mode меняет только парный
  Telegram target (`channel` или `dry_channel`) и не выбирает другой website, staging
  или mode-specific content. PAT, live seed/state, Pages/DNS/settings и deploy — human
  rollout, не agent implementation.

## Не менять автономно

- Schema/routes/thread/RSS/OG/status UI — только по scoped issue и с fixture/tests,
  затем `npm run check` и `npm run build`.
- `.github/workflows/*`, Pages settings, custom domain и DNS — deployment boundary;
  workflow files правятся только отдельным явно разрешённым issue.
- Existing `src/content/**/*.md` URLs/frontmatter не переписывать массово.
- Donation addresses намеренно публичны; они живут только в `src/consts.ts` и
  показываются только на `/support`. Не дублировать их в alert content.

## Rendering invariants

- Missing/unknown status не создаёт публичных claims; без известных фактов card/OG neutral.
  Audience отображается независимо по собственному контракту.
- OG images are static assets selected by code. Не добавлять per-incident generation в
  deploy critical path.
- Dates форматируются в UTC, независимо от timezone builder.
- Command-line flags в prose не переносятся по внутреннему hyphen (`keepFlags`).
- Link preview/third-party assets не добавляются в critical alert path.

## Команды

| Команда | Назначение |
| --- | --- |
| `npm test` | isolated behavioral harness: во временном site tree проверяет pinned exact producer fixture против schema, routes, counters, threads и RSS, включая cleanup после успеха и ошибки; без сети и соседнего checkout |
| `npm run check` | Astro/TypeScript validation; обязательно для PR |
| `npm run build` | production build; обязательно для PR |
| `npm run dev` | локальный development server |
| `npm run og` | ручная пересборка static OG assets |

Не запускать deploy и не менять repository settings из coding session. Commit/PR —
короткие, без AI attribution и `Co-Authored-By`.

## Visual system

- Dark tokens — base; light theme overrides tokens. Explicit choice sets `data-theme`,
  otherwise use `prefers-color-scheme`.
- Background is a fixed time scale; spacing follows `--step`. Do not replace it with a
  scrolling decorative grid.
- `.panel` is opaque with a hard shadow. List rows use translucent fill, not separator
  rules over the grid.
- Status colors encode only supported publication facts; links use a separate signal color. Card accent
  is an inset `::before`, not `border-left`.
- JetBrains Mono is for instrument UI; IBM Plex Sans is for prose. Fonts stay local in
  `public/fonts`.
- Keep three size tiers (11px service text, 15px navigation, 18px section headings) and
  one `.sec-h` treatment for peer section headings.
