import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readFile, readdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
// Use the same parser as Astro's content loader, from its locked dependency tree.
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { z } from 'astro/zod';

/** Shared isolated-harness plumbing: no network and no neighboring checkout. */
export const TESTS = dirname(dirname(fileURLToPath(import.meta.url)));
export const REPOSITORY = dirname(TESTS);
export const FIXTURES = join(TESTS, 'fixtures');

export async function withTemporaryDirectory(run) {
  const directory = await mkdtemp(join(tmpdir(), 'sec-web-test-'));
  try {
    return await run(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

export async function copySite(target) {
  const excluded = new Set(['.astro', '.git', 'dist', 'node_modules']);
  await cp(REPOSITORY, target, {
    recursive: true,
    filter(source) {
      const first = relative(REPOSITORY, source).split('/')[0];
      return !excluded.has(first);
    },
  });
  await symlink(join(REPOSITORY, 'node_modules'), join(target, 'node_modules'), 'dir');
}

export async function text(path) {
  return readFile(path, 'utf8');
}

export function buildSite(site) {
  return spawnSync(process.execPath, [join(REPOSITORY, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    cwd: site,
    encoding: 'utf8',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    timeout: 120_000,
  });
}

export function frontmatter(source) {
  const data = parseFrontmatter(source).frontmatter;
  // Match the site's date coercion; missing/invalid dates must not silently skip counts.
  return { ...data, pubDate: z.coerce.date().parse(data.pubDate) };
}

export async function corpus(directory) {
  const files = await readdir(directory, { recursive: true });
  return Promise.all(files.filter((file) => file.endsWith('.md')).map(async (file) => ({
    id: file.split('/').at(-1).slice(0, -3),
    data: frontmatter(await text(join(directory, file))),
  })));
}

export function rssItemFor(xml, id) {
  const canonical = `https://sec.21ideas.org/incidents/${id}/`;
  const item = xml
    .split('<item>')
    .slice(1)
    .map((part) => `<item>${part.slice(0, part.indexOf('</item>') + '</item>'.length)}`)
    .find((part) => part.includes(`<link>${canonical}</link>`));
  assert.ok(item, `${id} is missing from RSS`);
  return { canonical, item };
}

export function rssContent(item) {
  const encoded = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1];
  assert.ok(encoded, 'RSS item has no content:encoded');
  return encoded
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * One feed row, isolated by an identifying markup fragment, usually the permalink.
 *
 * The split keeps a single row in scope: a chunk ends where the next row begins.
 * Producer fixtures share their title, so the title alone cannot identify a row.
 */
export function rowFor(html, needle) {
  const row = html.split('<div class="row"').find((part) => part.includes(needle));
  assert.ok(row, `row for ${needle} is missing`);
  return row;
}

/**
 * Canonical audience IDs a row exposes to the client filter.
 *
 * An empty list renders as a bare attribute, so both forms are accepted, but the
 * attribute itself must be present: a row without it would silently drop out of
 * every filtered result.
 */
export function rowAudiences(row) {
  const match = row.match(/^ data-audience(?:="([^"]*)")?[ >]/);
  assert.ok(match, 'row is missing data-audience');
  return (match[1] ?? '').split(' ').filter(Boolean);
}
