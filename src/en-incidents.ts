import type { CollectionEntry } from 'astro:content';

export type EnIncident = CollectionEntry<'enIncidents'>;

type ThreadEntry = { id: string; data: { pubDate: Date; parent?: string } };

export interface EnIncidentGroup<T extends ThreadEntry = EnIncident> {
  rootSlug: string;
  date: Date;
  posts: T[];
  hasEnglishRoot: boolean;
}

export const enRootSlug = (entry: ThreadEntry) => entry.data.parent ?? entry.id;

/**
 * Group EN artifacts by the shared root slug. A known RU root owns the incident's
 * date even while EN contains only orphan updates; adding the EN root later never
 * rewrites those immutable update artifacts or changes the count/date.
 */
export function enIncidentGroups<T extends ThreadEntry, R extends ThreadEntry>(
  english: T[],
  russian: R[],
): EnIncidentGroup<T>[] {
  const grouped = new Map<string, T[]>();
  for (const entry of english) {
    const root = enRootSlug(entry);
    const posts = grouped.get(root) ?? [];
    posts.push(entry);
    grouped.set(root, posts);
  }

  return [...grouped.entries()]
    .map(([rootSlug, posts]) => {
      posts.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
      const russianRoot = russian.find((entry) => entry.id === rootSlug);
      const englishRoot = posts.find((entry) => entry.id === rootSlug);
      return {
        rootSlug,
        date: russianRoot?.data.pubDate ?? englishRoot?.data.pubDate ?? posts[0]!.data.pubDate,
        posts,
        hasEnglishRoot: Boolean(englishRoot),
      };
    })
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
