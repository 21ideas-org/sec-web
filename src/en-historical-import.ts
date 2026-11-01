import { z } from 'astro/zod';
import catalog from './data/en-historical-import.json' with { type: 'json' };

const slug = z.string().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const schema = z.object({
  version: z.literal(1),
  sourceCommit: z.string().regex(/^[a-f0-9]{40}$/),
  preparedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/).refine((value) => {
    const date = new Date(value);
    return Number.isFinite(date.valueOf()) && date.toISOString() === value;
  }),
  entries: z.array(z.object({
    slug,
    sourceSha256: z.string().regex(/^[a-f0-9]{64}$/),
    manualIdentity: z.string().optional(),
  }).strict()),
}).strict().superRefine((data, context) => {
  const seen = new Set<string>();
  for (const [index, entry] of data.entries.entries()) {
    if (seen.has(entry.slug) || (entry.manualIdentity !== undefined && entry.manualIdentity !== `manual-translation:${entry.slug}`)) {
      context.addIssue({ code: 'custom', path: ['entries', index], message: 'Invalid historical import identity' });
    }
    seen.add(entry.slug);
  }
});

/** A finite manual import, never an age/root/language-based filter for future alerts. */
export function parseEnHistoricalImport(value: unknown) {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error('Invalid EN historical import catalog');
  return parsed.data;
}
const historical = new Set(parseEnHistoricalImport(catalog).entries.map((entry) => entry.slug));
export const isEnHistoricalImport = (id: string): boolean => historical.has(id);
