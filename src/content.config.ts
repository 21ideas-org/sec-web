import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * ⚠️ Схема проверяет ФОРМУ и НЕ проверяет СЛОВАРЬ.
 *
 * `sec-watcher-bot` создаёт incident files create-only. Упавшая сборка останавливает
 * ВЕСЬ сайт, а не один плохой пост, поэтому `urgency`, `audience` и `vendor` —
 * свободные строки: неизвестное значение
 * отрисуется нейтрально (см. `urgencyClass`), а расхождение контракта поймает
 * глаз в ленте, а не 404 на всём домене.
 */
const incidents = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content',
    // Папка (`incidents/` или `archive/`) — способ хранения, а НЕ часть адреса.
    // Без этого slug выходит `incidents/cln-...`, и постоянная ссылка становится
    // /incidents/incidents/cln-... — а её потом уже не переименовать: она уехала
    // в канал. Slug = имя файла, и только оно.
    generateId: ({ entry }) => entry.replace(/^.*\//, '').replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().default(''),
    pubDate: z.coerce.date(),

    /**
     * ⚠️ Legacy compatibility list, не каноническая классификация. Бот пишет его
     * детерминированно вместе с четырьмя независимыми status-осями; site presentation
     * использует legacy-тег только как fallback, когда соответствующая ось отсутствует.
     */
    urgency: z.array(z.string()).default([]),
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
     * Canonical classification axes. Bot-generated incidents несут все четыре;
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
  }),
});

export const collections = { incidents };
