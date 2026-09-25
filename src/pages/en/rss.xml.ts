import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_NAME } from '../../consts.ts';
import { allEnIncidents } from '../../lib.ts';
import { displayUrgency } from '../../status.ts';
import { displayAudience } from '../../audience.ts';
import { displaySourceLinks } from '../../source-links.ts';
import type { EnIncident } from '../../en-incidents.ts';

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
function content(entry: EnIncident): string {
  const d = entry.data;
  const links = d.hijacked ? [] : displaySourceLinks(d.links);
  return [
    d.hijacked && `<p><strong>The official ${esc(d.vendor ?? 'vendor')} account appears to be compromised.</strong><br>Do not follow links from its posts or enter your seed anywhere.</p>`,
    d.description && `<p>${esc(d.description)}</p>`,
    d.action && `<p><strong>Actions to take:</strong> ${esc(d.action)}</p>`,
    links.length === 1 && `<p><strong>Source:</strong> <a href="${esc(links[0]!.url)}">${esc(links[0]!.label)}</a></p>`,
    links.length > 1 && `<p><strong>Sources:</strong></p><ul>${links.map((link) => `<li><a href="${esc(link.url)}">${esc(link.label)}</a></li>`).join('')}</ul>`,
  ].filter(Boolean).join('\n');
}
export async function GET(context: APIContext) {
  const posts = (await allEnIncidents()).sort((a, b) => b.data.enPublishedAt.valueOf() - a.data.enPublishedAt.valueOf());
  return rss({
    title: `${SITE_NAME} · English`,
    description: 'Bitcoin security alerts in English.',
    site: new URL('/en/', context.site!),
    items: posts.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.enPublishedAt,
      link: `/en/incidents/${entry.id}/`,
      content: content(entry),
      categories: [...displayUrgency(entry.data, 'en'), ...displayAudience(entry.data.audience, 'en').map(({ label }) => label)],
    })),
    customData: '<language>en</language>',
  });
}
