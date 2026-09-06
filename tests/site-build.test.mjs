import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const ROOT = dirname(fileURLToPath(import.meta.url));
const REPOSITORY = dirname(ROOT);

const INCIDENT_IDS = [
  'btcpay-2026-08-26-cln-routes-off',
  'btcpay-2026-08-29-cln-26067',
  'cln-2026-08-27-offline-guidance',
  'cln-2026-08-28-blockstream-advisory',
  'cln-2026-08-28-release-26067',
  'ledger-2026-08-27-donjon-bulletins',
  'ledger-2026-08-28-qr-phishing',
  'npm-2026-08-29-test-in-one',
  'start9-2026-08-26-cln-update',
  'umbrel-2026-08-27-cln-update',
];

const BACKFILL = [
  ['specter-2026-09-01-security-alert', null],
  ['specter-2026-09-01-security-alert-upd', 'specter-2026-09-01-security-alert'],
  ['specter-2026-09-01-security-alert-upd2', 'specter-2026-09-01-security-alert'],
  ['start9-2026-09-01-security-alert', 'start9-2026-08-26-cln-update'],
  ['core-lightning-2026-09-02-security-alert', 'start9-2026-08-26-cln-update'],
  ['ghsa-malware-2026-09-03-security-alert', null],
  ['trezor-2026-09-04-security-alert', null],
];

const BACKFILL_NEWEST_FIRST = [...BACKFILL].reverse().map(([id]) => id);

const ARCHIVE_SOURCE_URLS = new Map([
  ['2013-08-11-android-securerandom', 'https://bitcoin.org/en/alert/2013-08-11-android'],
  ['2014-04-11-heartbleed', 'https://bitcoin.org/en/alert/2014-04-11-heartbleed'],
  ['2018-11-20-event-stream-copay', 'https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident'],
  ['2020-01-31-trezor-voltage-glitch', 'https://blog.trezor.io/our-response-to-the-read-protection-downgrade-attack-28d23f8949c6'],
  ['2020-05-18-coldcard-laser', 'https://blog.coinkite.com/laser-fault-injection/'],
  ['2021-05-11-cake-wallet-seeds', 'https://milksad.info/posts/research-update-9/'],
  ['2022-06-07-electrum-file-scheme', 'https://github.com/spesmilo/electrum/security/advisories/GHSA-4fh4-hx35-r355'],
  ['2023-08-08-milk-sad', 'https://milksad.info/disclosure.html'],
  ['2023-11-14-randstorm', 'https://www.unciphered.com/disclosure-of-vulnerable-bitcoin-wallet-library-2/'],
  ['2024-01-04-bip3x-weak-rng', 'https://milksad.info/posts/research-update-4/'],
  ['2025-04-03-pypi-bitcoinlib', 'https://www.reversinglabs.com/blog/malicious-python-packages-target-popular-bitcoin-library'],
  ['2026-01-30-phpcoinaddress', 'https://milksad.info/posts/research-update-18/'],
  ['2026-07-30-coldcard-entropy', 'https://blog.coinkite.com/entropy-technical-backgrounder/'],
]);

const ROOT_FIXTURE_ID = 'fixture-2031-09-04-status-axes';
const UPDATE_FIXTURE_ID = 'fixture-2031-09-05-status-update';
const UNKNOWN_FIXTURE_ID = 'fixture-2032-09-04-unknown-status';
const SOURCE_FIXTURE_LABEL = `Source & <safe> "double" 'single'`;
const SOURCE_FIXTURE_URL = `https://sources.example/path?amp=1&lt=<tag>&double="quoted"&single='quoted'`;
const SECOND_SOURCE_FIXTURE_URL = 'https://second.example/source?one=1&two=2';

const rootFixture = `---
title: "Status axes fixture"
description: "All canonical axes coexist"
pubDate: 2031-09-04T12:00:00.000Z
urgency: ["#патча_нет"]
audience: ["держатели"]
product: "Fixture"
vendor: "Fixture Vendor"
action: "Use the safe release"
exploitationStatus: "active"
fixStatus: "available"
updateSufficiency: "additional_action_required"
actionTiming: "now"
hijacked: true
incidentKey: "fixture-thread"
links:
  - label: "must not render for hijack"
    url: "https://untrusted.example/"
---
`;

const updateFixture = `---
title: "Status axes update fixture"
description: "Update remains in the root thread"
pubDate: 2031-09-05T12:00:00.000Z
urgency: []
audience: ["операторы"]
product: "Fixture"
vendor: "Fixture Vendor"
action: "Review the update"
exploitationStatus: "observed"
fixStatus: "partial"
updateSufficiency: "additional_action_required"
actionTiming: "now"
hijacked: false
incidentKey: "fixture-thread"
parent: "${ROOT_FIXTURE_ID}"
links:
  - label: 'Source & <safe> "double" ''single'''
    url: 'https://sources.example/path?amp=1&lt=<tag>&double="quoted"&single=''quoted'''
  - label: "Second source"
    url: "${SECOND_SOURCE_FIXTURE_URL}"
---
`;

const unknownFixture = `---
title: "Unknown status fixture"
description: "Unknown canonical values stay neutral"
pubDate: 2032-09-04T12:00:00.000Z
urgency: ["#патч_есть"]
audience: []
product: "Fixture"
vendor: "Fixture Vendor"
exploitationStatus: "future_exploitation_state"
fixStatus: "future_fix_state"
updateSufficiency: "future_sufficiency_state"
actionTiming: "future_timing_state"
hijacked: false
incidentKey: "fixture-unknown"
links: []
---
`;

async function withTemporaryDirectory(run) {
  const directory = await mkdtemp(join(tmpdir(), 'sec-web-test-'));
  try {
    return await run(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

async function copySite(target) {
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

async function text(path) {
  return readFile(path, 'utf8');
}

function rssItemFor(xml, id) {
  const canonical = `https://sec.21ideas.org/incidents/${id}/`;
  const item = xml
    .split('<item>')
    .slice(1)
    .map((part) => `<item>${part.slice(0, part.indexOf('</item>') + '</item>'.length)}`)
    .find((part) => part.includes(`<link>${canonical}</link>`));
  assert.ok(item, `${id} is missing from RSS`);
  return { canonical, item };
}

function rssContent(item) {
  const encoded = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1];
  assert.ok(encoded, 'RSS item has no content:encoded');
  return encoded
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

async function recentRootCount(directory) {
  const cutoff = Date.now() - 365 * 864e5;
  let count = 0;
  for (const file of await readdir(directory)) {
    if (!file.endsWith('.md')) continue;
    const source = await text(join(directory, file));
    if (/^parent:/m.test(source)) continue;
    const pubDate = source.match(/^pubDate: (\S+)$/m)?.[1];
    assert.ok(pubDate, `${file} has no pubDate`);
    if (Date.parse(pubDate) >= cutoff) count += 1;
  }
  return count;
}

test('temporary fixture cleanup also runs after a failed assertion', async () => {
  let created;
  await assert.rejects(
    withTemporaryDirectory(async (directory) => {
      created = directory;
      throw new Error('intentional fixture failure');
    }),
    /intentional fixture failure/,
  );
  assert.equal(existsSync(created), false);
});

test('isolated generated fixtures preserve routes, archive behavior, status rendering, and threads', async () => {
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);

    const fixtureDirectory = join(site, 'src/content/incidents');
    await writeFile(join(fixtureDirectory, `${ROOT_FIXTURE_ID}.md`), rootFixture);
    await writeFile(join(fixtureDirectory, `${UPDATE_FIXTURE_ID}.md`), updateFixture);
    await writeFile(join(fixtureDirectory, `${UNKNOWN_FIXTURE_ID}.md`), unknownFixture);

    const build = spawnSync(process.execPath, [join(REPOSITORY, 'node_modules/astro/bin/astro.mjs'), 'build'], {
      cwd: site,
      encoding: 'utf8',
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
      timeout: 120_000,
    });
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);

    for (const id of INCIDENT_IDS) {
      assert.equal(existsSync(join(site, 'dist/incidents', id, 'index.html')), true, id);
    }

    const generatedBackfill = [];
    for (const [id, expectedParent] of BACKFILL) {
      const source = await text(join(site, 'src/content/incidents', `${id}.md`));
      const actualParent = source.match(/^parent: ["']([^"']+)["']$/m)?.[1] ?? null;
      assert.equal(actualParent, expectedParent, `${id} parent changed`);
      assert.ok(!source.includes('telegramUrl:'), `${id} contains telegramUrl`);
      assert.ok(!source.includes('t.me/c/4443934489'), `${id} contains a private Telegram URL`);
      const page = join(site, 'dist/incidents', id, 'index.html');
      assert.equal(existsSync(page), true, id);
      generatedBackfill.push(await text(page));
    }

    const feed = await text(join(site, 'dist/feed/index.html'));
    const rss = await text(join(site, 'dist/rss.xml'));
    let feedPosition = -1;
    let rssPosition = -1;
    for (const id of BACKFILL_NEWEST_FIRST) {
      const nextFeedPosition = feed.indexOf(`/incidents/${id}/`);
      const nextRssPosition = rss.indexOf(`/incidents/${id}/`);
      assert.ok(nextFeedPosition > feedPosition, `${id} is missing or out of order in feed`);
      assert.ok(nextRssPosition > rssPosition, `${id} is missing or out of order in RSS`);
      feedPosition = nextFeedPosition;
      rssPosition = nextRssPosition;
    }
    for (const [id, expectedUrl] of ARCHIVE_SOURCE_URLS) {
      const source = await text(join(site, 'src/content/archive', `${id}.md`));
      const actualUrl = source.match(/^sourceUrl: ["']([^"']+)["']$/m)?.[1];
      assert.equal(actualUrl, expectedUrl, `${id} sourceUrl changed`);
      assert.equal(existsSync(join(site, 'dist/incidents', id, 'index.html')), false, id);
      assert.ok(feed.includes(expectedUrl), `${id} missing from archive feed`);
      assert.ok(!rss.includes(expectedUrl), `${id} leaked into RSS`);
    }

    const rootPage = await text(join(site, 'dist/incidents', ROOT_FIXTURE_ID, 'index.html'));
    const updatePage = await text(join(site, 'dist/incidents', UPDATE_FIXTURE_ID, 'index.html'));
    const unknownPage = await text(join(site, 'dist/incidents', UNKNOWN_FIXTURE_ID, 'index.html'));
    const index = await text(join(site, 'dist/index.html'));

    assert.ok(rootPage.includes('#эксплуатируется'));
    assert.ok(rootPage.includes('#патч_есть'));
    assert.ok(!rootPage.includes('#патча_нет'));
    assert.ok(updatePage.includes('#патч_частичный'));
    assert.ok(updatePage.includes('class="u u-warn">#патч_частичный</span>'));

    const hijack = rootPage.match(/<aside class="hijack[^>]*>([\s\S]*?)<\/aside>/);
    assert.ok(hijack, 'trusted hijack banner is missing');
    assert.ok(hijack[1].includes('официальный аккаунт Fixture Vendor угнан'));
    assert.ok(!hijack[1].includes('<a '), 'hijack banner must not contain links');
    assert.ok(!rootPage.includes('https://untrusted.example/'), 'hijacked page must suppress source links');

    const actionPosition = updatePage.indexOf('class="action panel"');
    const sourcesPosition = updatePage.indexOf('class="links"');
    const threadPosition = updatePage.indexOf('class="thread"');
    assert.ok(actionPosition >= 0, 'threaded fixture action is missing');
    assert.ok(sourcesPosition > actionPosition, 'sources must render after the action');
    assert.ok(threadPosition > sourcesPosition, 'sources must render before incident history');
    assert.ok(!unknownPage.includes('<h2>Первоисточники</h2>'), 'empty links rendered a source block');

    assert.ok(!unknownPage.includes('class="u u-ok"'));
    assert.ok(!unknownPage.includes('#патч_есть'));
    assert.ok(!unknownPage.includes('class="u u-neutral"'));
    assert.ok(unknownPage.includes('class="status-note"'));
    assert.ok(unknownPage.includes('fixStatus=future_fix_state'));
    assert.ok(unknownPage.includes('updateSufficiency=future_sufficiency_state'));
    assert.ok(unknownPage.includes('actionTiming=future_timing_state'));
    assert.match(index, /<article class="card panel" style="--accent: var\(--dim\)">[\s\S]*?Unknown status fixture/);
    const expectedRecentRoots = await recentRootCount(join(site, 'src/content/incidents'));
    assert.equal(BACKFILL.filter(([, parent]) => parent === null).length, 3);
    assert.ok(
      index.includes(`<span>за год<b>${expectedRecentRoots}</b></span>`),
      'updates inflated the incident count',
    );
    assert.ok(index.includes('<span>всего<b>20</b></span>'), 'archive entries leaked into counters');

    assert.ok(rootPage.includes(`/incidents/${UPDATE_FIXTURE_ID}/`));
    assert.ok(updatePage.includes(`/incidents/${ROOT_FIXTURE_ID}/`));
    assert.ok(rss.includes(`/incidents/${ROOT_FIXTURE_ID}/`));
    assert.ok(rss.includes('#эксплуатируется'));
    assert.ok(rss.includes('#патч_есть'));
    assert.ok(rss.includes('официальный аккаунт Fixture Vendor угнан'));
    assert.ok(!rss.includes('https://untrusted.example/'));
    const { canonical, item: updateRssItem } = rssItemFor(rss, UPDATE_FIXTURE_ID);
    assert.ok(updateRssItem.includes(`<link>${canonical}</link>`));
    assert.ok(updateRssItem.includes(`<guid isPermaLink="true">${canonical}</guid>`));
    const updateRssContent = rssContent(updateRssItem);
    const rssActionPosition = updateRssContent.indexOf('<strong>Что делать:</strong>');
    const rssSourcesPosition = updateRssContent.indexOf('<strong>Первоисточники:</strong>');
    assert.ok(rssSourcesPosition > rssActionPosition, 'RSS sources must render after the action');
    assert.ok(!updateRssContent.includes(SOURCE_FIXTURE_LABEL), 'RSS source label was not escaped');
    assert.ok(!updateRssContent.includes(SOURCE_FIXTURE_URL), 'RSS source URL was not escaped');
    assert.ok(updateRssContent.includes('Source &amp; &lt;safe&gt; &quot;double&quot; &#39;single&#39;'));
    assert.ok(
      updateRssContent.includes(
        'href="https://sources.example/path?amp=1&amp;lt=&lt;tag&gt;&amp;double=&quot;quoted&quot;&amp;single=&#39;quoted&#39;"',
      ),
    );
    assert.ok(updateRssContent.includes(`href="${SECOND_SOURCE_FIXTURE_URL.replace('&', '&amp;')}"`));
    const { item: emptyRssItem } = rssItemFor(rss, UNKNOWN_FIXTURE_ID);
    assert.ok(!rssContent(emptyRssItem).includes('<strong>Первоисточники:</strong>'));
    assert.ok(rss.includes('fixStatus=future_fix_state'));
    assert.ok(!rss.includes('<category>fixStatus='));
    assert.ok(!rss.includes('src/content/archive'));
    for (const output of [index, feed, rss, rootPage, updatePage, unknownPage, ...generatedBackfill]) {
      assert.ok(!output.includes('t.me/c/4443934489'), 'private Telegram URL leaked into generated output');
    }
  });

  for (const id of [ROOT_FIXTURE_ID, UPDATE_FIXTURE_ID, UNKNOWN_FIXTURE_ID]) {
    assert.equal(existsSync(join(REPOSITORY, 'src/content/incidents', `${id}.md`)), false);
  }
});
