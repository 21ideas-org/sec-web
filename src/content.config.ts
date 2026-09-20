import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * ⚠️ Схема проверяет ФОРМУ и НЕ проверяет СЛОВАРЬ.
 *
 * `sec-watcher-bot` создаёт incident files create-only. Упавшая сборка останавливает
 * ВЕСЬ сайт, а не один плохой пост, поэтому `urgency`, `audience` и `vendor` —
 * свободные строки: неизвестное значение
 * не создаст неподтверждённый status claim (см. `src/status.ts`). Неверная форма
 * по-прежнему останавливает сборку.
 */
const incidentSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  pubDate: z.coerce.date(),

  /**
   * Legacy compatibility list. Used only without statusTags and when the
   * corresponding legacy axis is absent; explicit unknown blocks fallback.
   */
  urgency: z.array(z.string()).default([]),
  /** Optional supported facts; present [] disables all legacy status fallback. */
  statusTags: z.array(z.string()).optional(),
  /**
   * Bot writers use canonical IDs (holders, node_operators, developers,
   * merchant_infra). This stays a free-string list so legacy and future values
   * render neutrally instead of stopping the whole site build.
   */
  audience: z.array(z.string()).default([]),

  product: z.string().optional(),
  vendor: z.string().optional(),
  action: z.string().optional(),

  /**
   * Legacy classification axes. Historical incidents may carry all four;
   * optional сохраняет старый content, а open values не дают новому значению бота
   * остановить весь сайт.
   */
  exploitationStatus: z.string().optional(),
  fixStatus: z.string().optional(),
  updateSufficiency: z.string().optional(),
  actionTiming: z.string().optional(),
  hijacked: z.boolean().optional(),

  /**
   * Ссылки приходят из вердикта ПОСЛЕ позиционной сверки. Модель не выдаёт
   * URL никогда — сайт лишь показывает то, что уже сверено кодом.
   */
  links: z
    .array(z.object({ label: z.string(), url: z.url() }))
    .default([]),

  /** CVE / GHSA / fingerprint — по нему бот склеивает тред. */
  incidentKey: z.string().optional(),
  /** Заполняется у апдейта треда: slug первого поста. */
  parent: z.string().optional(),
  /** Reserved: create-only delivery не перезаписывает файл после Telegram. */
  telegramUrl: z.url().optional(),

  /**
   * Историческая хроника. Три следствия одного флага: своей страницы нет,
   * ссылка ведёт на первоисточник, в RSS не попадает и счётчик не обнуляет.
   * Иначе раскрытие 2014 года однажды уедет подписчикам как свежее оповещение.
   */
  external: z.boolean().default(false),
  source: z.string().optional(),
  sourceUrl: z.url().optional(),

  draft: z.boolean().default(false),
});

const incidents = defineCollection({
  loader: glob({
    pattern: '{incidents,archive}/**/*.md',
    base: './src/content',
    // Папка (`incidents/` или `archive/`) — способ хранения, а НЕ часть адреса.
    // Без этого slug выходит `incidents/cln-...`, и постоянная ссылка становится
    // /incidents/incidents/cln-... — а её потом уже не переименовать: она уехала
    // в канал. Slug = имя файла, и только оно.
    generateId: ({ entry }) => entry.replace(/^.*\//, '').replace(/\.md$/, ''),
  }),
  schema: incidentSchema,
});

const frozenUtcTimestamp = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'timestamp must be a full UTC ISO timestamp')
  .refine((value) => {
    const parsed = new Date(value);
    return Number.isFinite(parsed.valueOf()) && parsed.toISOString() === value;
  }, 'timestamp must be a valid date')
  .transform((value) => new Date(value));

/**
 * Version 1 of the immutable English website artifact. Unlike the broad RU reader,
 * this contract is strict: private evidence and producer-only fields must fail the
 * build instead of being silently discarded. Open dictionaries remain free strings.
 */
const enIncidentSchema = z
  .object({
    title: z.string().min(1),
    description: z.string(),
    pubDate: frozenUtcTimestamp,
    statusTags: z.array(z.string()),
    audience: z.array(z.string()),
    product: z.string().optional(),
    vendor: z.string().optional(),
    action: z.string().optional(),
    hijacked: z.boolean(),
    incidentKey: z.string().min(1),
    parent: z.string().min(1).optional(),
    enPublishedAt: frozenUtcTimestamp,
    links: z.array(z.object({
      label: z.string(),
      url: z.url().refine((value) => {
        const protocol = new URL(value).protocol;
        return protocol === 'https:' || protocol === 'http:';
      }, 'links must use http or https'),
    }).strict()),
  })
  .strict()
  .superRefine((data, context) => {
    if (data.enPublishedAt.valueOf() < data.pubDate.valueOf()) {
      context.addIssue({
        code: 'custom',
        path: ['enPublishedAt'],
        message: 'enPublishedAt must not be earlier than pubDate',
      });
    }
  });

const enIncidents = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/en/incidents',
    generateId: ({ entry }) => entry.replace(/^.*\//, '').replace(/\.md$/, ''),
  }),
  schema: enIncidentSchema,
});

export const collections = { incidents, enIncidents };
