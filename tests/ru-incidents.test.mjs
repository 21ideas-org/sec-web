import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { buildSite, copySite, rssItemFor, text, withTemporaryDirectory } from './helpers/site.mjs';

const NOW = Date.parse('2026-11-15T12:00:00.000Z');

async function emptyRussianContent(site) {
  for (const name of ['incidents', 'archive']) {
    const directory = join(site, 'src/content', name);
    await rm(directory, { recursive: true, force: true });
    await mkdir(directory, { recursive: true });
  }
}

async function writeIncident(site, id, pubDate, fields = '') {
  await writeFile(join(site, 'src/content/incidents', `${id}.md`), `---
title: ${id}
description: RU thread counter fixture
pubDate: ${pubDate}
audience: [holders]
statusTags: []
links: []
${fields}
---
`);
}

function buildAtFixedTime(site) {
  const built = buildSite(site, { now: NOW });
  assert.equal(built.status, 0, `${built.stdout}\n${built.stderr}`);
}

test('RU orphan counters follow routable roots before and after a missing parent arrives', async () => {
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    await emptyRussianContent(site);
    // Write in neither date nor filename order; allIncidents owns chronology.
    await writeIncident(site, 'counter-draft-child', '2026-11-11T00:00:00.000Z', 'parent: counter-draft-root');
    await writeIncident(site, 'counter-root', '2026-11-01T00:00:00.000Z');
    await writeIncident(site, 'counter-latest-update', '2026-11-14T00:00:00.000Z', 'parent: counter-root');
    await writeIncident(site, 'counter-missing-child', '2026-11-13T00:00:00.000Z', 'parent: counter-missing-root');
    await writeIncident(site, 'counter-old', '2025-11-15T11:59:59.999Z');
    await writeIncident(site, 'counter-external-root', '2026-11-15T10:00:00.000Z', 'external: true\nsourceUrl: https://source.invalid/external');
    await writeIncident(site, 'counter-draft-root', '2026-11-15T11:00:00.000Z', 'draft: true');
    await writeIncident(site, 'counter-other-update', '2026-11-08T00:00:00.000Z', 'parent: counter-root');
    await writeIncident(site, 'counter-missing-sibling', '2026-11-12T00:00:00.000Z', 'parent: counter-missing-root');
    await writeIncident(site, 'counter-external-child', '2026-11-10T00:00:00.000Z', 'parent: counter-external-root');
    await writeIncident(site, 'counter-year-boundary', '2025-11-15T12:00:00.000Z');

    buildAtFixedTime(site);
    const index = await text(join(site, 'dist/index.html'));
    assert.ok(index.includes('href="/incidents/counter-latest-update/"'));
    assert.ok(index.includes('data-since="2026-11-13T00:00:00.000Z"'), 'the newest visible orphan anchors the counter, not the later update or ineligible parents');
    assert.match(index, /за год<b>6<\/b>/, 'normal thread + four independent orphans + exact year boundary');
    assert.match(index, /всего<b>9<\/b>/, 'published post count still includes updates');

    const rss = await text(join(site, 'dist/rss.xml'));
    for (const [id, parent] of [
      ['counter-missing-child', 'counter-missing-root'],
      ['counter-missing-sibling', 'counter-missing-root'],
      ['counter-draft-child', 'counter-draft-root'],
      ['counter-external-child', 'counter-external-root'],
    ]) {
      const page = await text(join(site, 'dist/incidents', id, 'index.html'));
      assert.ok(!page.includes('class="up-of"'), `${id} remains standalone`);
      assert.ok(!page.includes(`href="/incidents/${parent}/"`), `${id} has no broken parent link`);
      rssItemFor(rss, id);
    }
    for (const id of ['counter-draft-root', 'counter-external-root']) {
      assert.equal(existsSync(join(site, 'dist/incidents', id, 'index.html')), false);
      assert.ok(!rss.includes(`/incidents/${id}/`), `${id} is excluded from RSS`);
    }

    await writeIncident(site, 'counter-missing-root', '2026-11-02T00:00:00.000Z');
    buildAtFixedTime(site);
    const resolved = await text(join(site, 'dist/index.html'));
    assert.ok(resolved.includes('data-since="2026-11-11T00:00:00.000Z"'), 'the remaining draft-parent orphan is now the newest incident');
    assert.match(resolved, /за год<b>5<\/b>/, 'the two former orphans now count once at their root date');
    assert.match(resolved, /всего<b>10<\/b>/);
    for (const id of ['counter-missing-child', 'counter-missing-sibling']) {
      const page = await text(join(site, 'dist/incidents', id, 'index.html'));
      assert.ok(page.includes('class="up-of"'));
      assert.ok(page.includes('href="/incidents/counter-missing-root/"'));
      assert.ok(page.includes(`<span class="self">${id}</span>`));
      const other = id === 'counter-missing-child' ? 'counter-missing-sibling' : 'counter-missing-child';
      assert.ok(page.includes(`href="/incidents/${other}/"`));
    }
  });
});

test('empty RU incident data has no counter anchor and zero statistics', async () => {
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    await emptyRussianContent(site);
    buildAtFixedTime(site);
    const index = await text(join(site, 'dist/index.html'));
    assert.ok(!index.includes('data-since='));
    assert.match(index, /за год<b>0<\/b>/);
    assert.match(index, /всего<b>0<\/b>/);
  });
});
