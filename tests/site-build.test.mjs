import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
// Use the same parser as Astro's content loader, from its locked dependency tree.
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { z } from 'astro/zod';

const ROOT = dirname(fileURLToPath(import.meta.url));
const REPOSITORY = dirname(ROOT);
const PRODUCER_FIXTURE_ID = 'fixture-2026-09-05-producer-alert';
const PRODUCER_SHA256 = '4703b93ff04788c0833c670ee9d5d93ccedf1425229f4846c9274c996a56ea21';

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
const LEGACY_AUDIENCE_FIXTURE_ID = 'fixture-2030-09-04-legacy-audience';
const EMPTY_AUDIENCE_FIXTURE_ID = 'fixture-2029-09-04-empty-audience';
const MISSING_AUDIENCE_FIXTURE_ID = 'fixture-2028-09-04-missing-audience';
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
audience: ["developers", "держатели", "holders", "разработчики", "<audience & unknown>"]
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

const legacyAudienceFixture = `---
title: "Legacy audience fixture"
description: "Broad audience aliases remain unresolved"
pubDate: 2030-09-04T12:00:00.000Z
urgency: []
audience: ["all", "все", "всем"]
links: []
---
`;

const emptyAudienceFixture = `---
title: "Empty audience fixture"
description: "An empty list remains empty"
pubDate: 2029-09-04T12:00:00.000Z
urgency: []
audience: []
links: []
---
`;

const missingAudienceFixture = `---
title: "Missing audience fixture"
description: "A missing field uses the empty default"
pubDate: 2028-09-04T12:00:00.000Z
urgency: []
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

function frontmatter(source) {
  const data = parseFrontmatter(source).frontmatter;
  // Match the site's date coercion; missing/invalid dates must not silently skip counts.
  return { ...data, pubDate: z.coerce.date().parse(data.pubDate) };
}

async function corpus(directory) {
  const files = await readdir(directory, { recursive: true });
  return Promise.all(files.filter((file) => file.endsWith('.md')).map(async (file) => ({
    id: file.split('/').at(-1).slice(0, -3),
    data: frontmatter(await text(join(directory, file))),
  })));
}

function buildSite(site) {
  return spawnSync(process.execPath, [join(REPOSITORY, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    cwd: site,
    encoding: 'utf8',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    timeout: 120_000,
  });
}

async function installProducer(site) {
  const bytes = await readFile(join(ROOT, 'fixtures/site-generated-alert.md'));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), PRODUCER_SHA256);
  const path = join(site, 'src/content/incidents', `${PRODUCER_FIXTURE_ID}.md`);
  await writeFile(path, bytes);
  assert.deepEqual(await readFile(path), bytes);
  return frontmatter(bytes.toString('utf8'));
}

test('temporary fixture cleanup also runs after a failed assertion', async () => {
  let created;
  await assert.rejects(
    withTemporaryDirectory(async (directory) => {
      created = directory;
      const site = join(directory, 'site');
      await copySite(site);
      await installProducer(site);
      throw new Error('intentional fixture failure');
    }),
    /intentional fixture failure/,
  );
  assert.equal(existsSync(created), false);
  assert.equal(existsSync(join(REPOSITORY, 'src/content/incidents', `${PRODUCER_FIXTURE_ID}.md`)), false);
});

test('frontmatter accepts equivalent key styles and rejects invalid required dates', () => {
  assert.deepEqual(
    frontmatter('---\n"pubDate": "2026-09-06T00:00:00Z"\n"parent": "root"\n---\n'),
    frontmatter('---\npubDate: 2026-09-06T00:00:00Z\nparent: root\n---\n'),
  );
  assert.throws(() => frontmatter('---\ntitle: Missing date\n---\n'));
  assert.throws(() => frontmatter('---\n"pubDate": "not-a-date"\n---\n'));
  assert.throws(() => frontmatter('---\n"pubDate": [broken\n---\n'));
});

test('actual content schema rejects malformed required fields in the temporary site', async () => {
  for (const [fields, expectedField] of [
    ['', 'pubDate'],
    ['"pubDate": "not-a-date"\n', 'pubDate'],
    ['pubDate: 2030-09-04T12:00:00.000Z\naudience: "holders"\n', 'audience'],
    ['pubDate: 2030-09-04T12:00:00.000Z\nstatusTags: "patch_available"\n', 'statusTags'],
    ['pubDate: 2030-09-04T12:00:00.000Z\nstatusTags: [42]\n', 'statusTags'],
  ]) {
    await withTemporaryDirectory(async (directory) => {
      const site = join(directory, 'site');
      await copySite(site);
      await writeFile(join(site, 'src/content/incidents/fixture-invalid-shape.md'),
        `---\ntitle: Invalid shape fixture\n${fields}---\n`);
      const build = buildSite(site);
      assert.notEqual(build.status, 0);
      assert.match(`${build.stdout}\n${build.stderr}`, new RegExp(expectedField));
      assert.match(`${build.stdout}\n${build.stderr}`, /InvalidContentEntryDataError/);
    });
  }
});

test('isolated generated fixtures preserve routes, archive behavior, status rendering, and threads', async () => {
  let created;
  await withTemporaryDirectory(async (directory) => {
    created = directory;
    const site = join(directory, 'site');
    await copySite(site);
    const producer = await installProducer(site);

    const fixtureDirectory = join(site, 'src/content/incidents');
    await writeFile(join(fixtureDirectory, `${ROOT_FIXTURE_ID}.md`), rootFixture);
    await writeFile(join(fixtureDirectory, `${UPDATE_FIXTURE_ID}.md`), updateFixture);
    await writeFile(join(fixtureDirectory, `${UNKNOWN_FIXTURE_ID}.md`), unknownFixture);
    await writeFile(join(fixtureDirectory, `${LEGACY_AUDIENCE_FIXTURE_ID}.md`), legacyAudienceFixture);
    await writeFile(join(fixtureDirectory, `${EMPTY_AUDIENCE_FIXTURE_ID}.md`), emptyAudienceFixture);
    await writeFile(join(fixtureDirectory, `${MISSING_AUDIENCE_FIXTURE_ID}.md`), missingAudienceFixture);

    const build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);

    for (const id of INCIDENT_IDS) {
      assert.equal(existsSync(join(site, 'dist/incidents', id, 'index.html')), true, id);
    }

    const generatedBackfill = [];
    for (const [id, expectedParent] of BACKFILL) {
      const source = await text(join(site, 'src/content/incidents', `${id}.md`));
      const actualParent = frontmatter(source).parent ?? null;
      assert.equal(actualParent, expectedParent, `${id} parent changed`);
      assert.ok(!('telegramUrl' in frontmatter(source)), `${id} contains telegramUrl`);
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
      const actualUrl = frontmatter(source).sourceUrl;
      assert.equal(actualUrl, expectedUrl, `${id} sourceUrl changed`);
      assert.equal(existsSync(join(site, 'dist/incidents', id, 'index.html')), false, id);
      assert.ok(feed.includes(expectedUrl), `${id} missing from archive feed`);
      assert.ok(!rss.includes(expectedUrl), `${id} leaked into RSS`);
    }

    const rootPage = await text(join(site, 'dist/incidents', ROOT_FIXTURE_ID, 'index.html'));
    const updatePage = await text(join(site, 'dist/incidents', UPDATE_FIXTURE_ID, 'index.html'));
    const unknownPage = await text(join(site, 'dist/incidents', UNKNOWN_FIXTURE_ID, 'index.html'));
    const legacyAudiencePage = await text(join(site, 'dist/incidents', LEGACY_AUDIENCE_FIXTURE_ID, 'index.html'));
    const emptyAudiencePage = await text(join(site, 'dist/incidents', EMPTY_AUDIENCE_FIXTURE_ID, 'index.html'));
    const missingAudiencePage = await text(join(site, 'dist/incidents', MISSING_AUDIENCE_FIXTURE_ID, 'index.html'));
    const index = await text(join(site, 'dist/index.html'));
    assert.ok(!index.includes('без патча'));
    assert.ok(!index.includes('Без патча'));

    assert.ok(rootPage.includes('Эксплуатация подтверждена'));
    assert.ok(rootPage.includes('Патч есть'));
    assert.ok(!rootPage.includes('#патча_нет'));
    assert.ok(!updatePage.includes('#патч_частичный'));
    assert.ok(!updatePage.includes('class="u u-warn"'));
    assert.ok(updatePage.includes('/og/critical.png'));

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
    assert.ok(!unknownPage.includes('class="status-note"'));
    assert.ok(!unknownPage.includes('fixStatus=future_fix_state'));
    assert.ok(!unknownPage.includes('updateSufficiency=future_sufficiency_state'));
    assert.ok(!unknownPage.includes('actionTiming=future_timing_state'));
    assert.match(index, /<article class="card panel" style="--accent: var\(--dim\)">[\s\S]*?Unknown status fixture/);

    const holdersPosition = unknownPage.indexOf('class="aud">Ходлеры</span>');
    const developersPosition = unknownPage.indexOf('class="aud">Разработчики</span>');
    const unknownAudience = '&lt;audience &amp; unknown&gt;';
    assert.ok(holdersPosition >= 0, 'canonical holders label is missing');
    assert.ok(developersPosition > holdersPosition, 'known audiences are not in canonical order');
    assert.equal(unknownPage.split('class="aud">Ходлеры</span>').length - 1, 1, 'holders alias was not deduplicated');
    assert.equal(unknownPage.split('class="aud">Разработчики</span>').length - 1, 1, 'developers alias was not deduplicated');
    assert.ok(unknownPage.includes(`class="aud">${unknownAudience}</span>`), 'unknown audience was not escaped');
    assert.ok(index.includes('class="aud">Ходлеры</span>'));
    assert.ok(index.includes('class="aud">Разработчики</span>'));
    assert.ok(index.includes(`class="aud">${unknownAudience}</span>`));
    assert.ok(updatePage.includes('class="aud">операторы</span>'), 'unlisted legacy alias was reclassified');
    assert.ok(!updatePage.includes('class="aud">Операторы нод</span>'));
    assert.equal(legacyAudiencePage.split('Все — старая категория').length - 1, 1, 'broad aliases were not deduplicated');
    assert.ok(!legacyAudiencePage.includes('class="aud">Ходлеры</span>'));
    assert.ok(!legacyAudiencePage.includes('class="aud">Операторы нод</span>'));
    assert.ok(!legacyAudiencePage.includes('class="aud">Разработчики</span>'));
    assert.ok(!legacyAudiencePage.includes('class="aud">Мерчанты</span>'));
    assert.ok(!emptyAudiencePage.includes('class="aud">'), 'empty audience invented a label');
    assert.ok(!missingAudiencePage.includes('class="aud">'), 'missing audience invented a label');

    const nodeOperatorPage = await text(join(site, 'dist/incidents/cln-2026-08-27-offline-guidance/index.html'));
    const merchantPage = await text(join(site, 'dist/incidents/btcpay-2026-08-26-cln-routes-off/index.html'));
    assert.ok(rootPage.includes('class="aud">Ходлеры</span>'));
    assert.ok(nodeOperatorPage.includes('class="aud">Операторы нод</span>'));
    assert.ok(merchantPage.includes('class="aud">Мерчанты</span>'));
    const entries = await corpus(join(site, 'src/content'));
    const own = entries.filter(({ data }) => !data.external && !data.draft);
    const roots = own.filter(({ data }) => !data.parent);
    const expectedRecentRoots = roots.filter(({ data }) => data.pubDate.valueOf() >= Date.now() - 365 * 864e5).length;
    assert.equal(BACKFILL.filter(([, parent]) => parent === null).length, 3);
    assert.ok(
      index.includes(`<span>за год<b>${expectedRecentRoots}</b></span>`),
      'updates inflated the incident count',
    );
    assert.ok(index.includes(`<span>всего<b>${own.length}</b></span>`), 'archive entries leaked into counters');
    const anchor = roots.map(({ data }) => data.pubDate.valueOf()).sort((a, b) => b - a)[0];
    assert.ok(index.includes(`data-since="${new Date(anchor).toISOString()}"`));
    for (const { id } of own) {
      assert.ok(feed.includes(`/incidents/${id}/`), `${id} missing from feed`);
      rssItemFor(rss, id);
    }

    assert.deepEqual([
      producer.exploitationStatus, producer.fixStatus, producer.updateSufficiency, producer.actionTiming,
    ], ['active', 'partial', 'additional_action_required', 'now']);
    assert.deepEqual(producer.urgency, ['#эксплуатируется', '#патч_частичный']);
    assert.deepEqual(producer.links, [{ label: 'coldcard.com', url: 'https://coldcard.com/security' }]);
    assert.equal(producer.parent, 'start9-2026-08-26-cln-update');
    for (const field of ['reason', 'linkRefs', 'telegramUrl', 'sourceUrl']) {
      assert.ok(!(field in producer), `${field} leaked into producer frontmatter`);
    }
    const producerPage = await text(join(site, 'dist/incidents', PRODUCER_FIXTURE_ID, 'index.html'));
    const producerRoot = await text(join(site, 'dist/incidents', producer.parent, 'index.html'));
    assert.ok(producerPage.includes(`/incidents/${producer.parent}/`));
    assert.ok(producerRoot.includes(`/incidents/${PRODUCER_FIXTURE_ID}/`));
    const { item: producerRss } = rssItemFor(rss, PRODUCER_FIXTURE_ID);
    for (const output of [producerPage, rssContent(producerRss)]) {
      assert.ok(output.includes(producer.description));
      assert.ok(output.includes(producer.action));
      assert.ok(output.includes('href="https://coldcard.com/security"'));
      assert.ok(output.includes('coldcard.com'));
      for (const field of ['reason', 'linkRefs', 'telegramUrl']) assert.ok(!output.includes(field));
    }
    assert.ok(!producerPage.includes('#патч_частичный'));
    assert.ok(!producerRss.includes('<category>#патч_частичный</category>'));
    for (const label of ['Эксплуатация подтверждена']) {
      assert.ok(producerPage.includes(label));
      assert.ok(producerRss.includes(`<category>${label}</category>`));
    }

    assert.ok(rootPage.includes(`/incidents/${UPDATE_FIXTURE_ID}/`));
    assert.ok(updatePage.includes(`/incidents/${ROOT_FIXTURE_ID}/`));
    assert.ok(rss.includes(`/incidents/${ROOT_FIXTURE_ID}/`));
    assert.ok(rss.includes('Эксплуатация подтверждена'));
    assert.ok(rss.includes('Патч есть'));
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
    const { item: audienceRssItem } = rssItemFor(rss, UNKNOWN_FIXTURE_ID);
    assert.ok(!rssContent(audienceRssItem).includes('<strong>Первоисточники:</strong>'));
    assert.equal(audienceRssItem.split('<category>Ходлеры</category>').length - 1, 1);
    assert.equal(audienceRssItem.split('<category>Разработчики</category>').length - 1, 1);
    assert.ok(audienceRssItem.includes('<category>&lt;audience &amp; unknown&gt;</category>'));
    const { item: legacyAudienceRss } = rssItemFor(rss, LEGACY_AUDIENCE_FIXTURE_ID);
    assert.equal(legacyAudienceRss.split('<category>Все — старая категория</category>').length - 1, 1);
    const { item: updateAudienceRss } = rssItemFor(rss, UPDATE_FIXTURE_ID);
    assert.ok(updateAudienceRss.includes('<category>операторы</category>'));
    assert.ok(!updateAudienceRss.includes('<category>Операторы нод</category>'));
    const { item: holderRss } = rssItemFor(rss, ROOT_FIXTURE_ID);
    const { item: nodeOperatorRss } = rssItemFor(rss, 'cln-2026-08-27-offline-guidance');
    const { item: merchantRss } = rssItemFor(rss, 'btcpay-2026-08-26-cln-routes-off');
    assert.ok(holderRss.includes('<category>Ходлеры</category>'));
    assert.ok(nodeOperatorRss.includes('<category>Операторы нод</category>'));
    assert.ok(merchantRss.includes('<category>Мерчанты</category>'));
    for (const id of [EMPTY_AUDIENCE_FIXTURE_ID, MISSING_AUDIENCE_FIXTURE_ID]) {
      const { item } = rssItemFor(rss, id);
      assert.ok(!item.includes('<category>Ходлеры</category>'));
      assert.ok(!item.includes('<category>Все — старая категория</category>'));
    }
    assert.ok(!rss.includes('fixStatus=future_fix_state'));
    assert.ok(!rss.includes('<category>fixStatus='));
    assert.ok(!rss.includes('src/content/archive'));
    for (const output of [index, feed, rss, rootPage, updatePage, unknownPage, ...generatedBackfill]) {
      assert.ok(!output.includes('t.me/c/4443934489'), 'private Telegram URL leaked into generated output');
    }
  });

  assert.equal(existsSync(created), false);
  for (const id of [
    ROOT_FIXTURE_ID,
    UPDATE_FIXTURE_ID,
    UNKNOWN_FIXTURE_ID,
    LEGACY_AUDIENCE_FIXTURE_ID,
    EMPTY_AUDIENCE_FIXTURE_ID,
    MISSING_AUDIENCE_FIXTURE_ID,
    PRODUCER_FIXTURE_ID,
  ]) {
    assert.equal(existsSync(join(REPOSITORY, 'src/content/incidents', `${id}.md`)), false);
  }
});

// Synthetic reader cases only. The pinned producer fixture above remains exact legacy evidence.
test('synthetic optional facts share labels and accents across cards, rows, pages, RSS and OG', async () => {
  const cases = [
    ['empty', [], [], 'dim', 'default'],
    ['unknown', ['future_status'], [], 'dim', 'default'],
    ['exploited', ['exploitation_confirmed'], ['Эксплуатация подтверждена'], 'crit-fg', 'critical'],
    ['unavailable', ['patch_unavailable'], ['Патча нет'], 'warn-fg', 'unpatched'],
    ['available', ['patch_available'], ['Патч есть'], 'ok-fg', 'patched'],
    ['exploited-unavailable', ['patch_unavailable', 'exploitation_confirmed'], ['Эксплуатация подтверждена', 'Патча нет'], 'crit-fg', 'critical'],
    ['exploited-available', ['patch_available', 'exploitation_confirmed', 'patch_available'], ['Эксплуатация подтверждена', 'Патч есть'], 'crit-fg', 'critical'],
    ['conflict', ['patch_available', 'patch_unavailable'], [], 'dim', 'default'],
    ['exploited-conflict', ['patch_available', 'exploitation_confirmed', 'patch_unavailable'], ['Эксплуатация подтверждена'], 'crit-fg', 'critical'],
  ];
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    for (const [name, tags] of cases) {
      await writeFile(join(site, `src/content/incidents/synthetic-${name}.md`), `---
title: "Synthetic ${name}"
description: "Source-supported description"
pubDate: 2033-09-04T12:00:00.000Z
statusTags: ${JSON.stringify(tags)}
urgency: ["#эксплуатируется", "#патча_нет", "#патч_есть"]
exploitationStatus: active
fixStatus: available
audience: [node_operators]
action: "Read the source advice"
parent: missing-synthetic-root
links: [{label: Source, url: "https://source.example/advice"}]
---
`);
    }
    await writeFile(join(site, 'src/content/incidents/synthetic-draft.md'), '---\ntitle: Synthetic draft\npubDate: 2040-01-01\nstatusTags: [patch_available]\ndraft: true\n---\n');
    const build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    assert.equal(existsSync(join(site, 'dist/incidents/synthetic-draft/index.html')), false);
    assert.match(build.stdout + build.stderr, /Conflicting patch status tags: both patch claims omitted/);
    const feed = await text(join(site, 'dist/feed/index.html'));
    const rss = await text(join(site, 'dist/rss.xml'));
    const index = await text(join(site, 'dist/index.html'));
    const card = index.match(/<article class="card panel"[\s\S]*?<\/article>/)?.[0];
    assert.ok(card);
    for (const output of [index, feed, rss]) assert.ok(!output.includes('Synthetic draft'));
    for (const [name, , labels, accent, og] of cases) {
      const page = await text(join(site, `dist/incidents/synthetic-${name}/index.html`));
      const row = feed.split('<div class="row">').find((part) => part.includes(`>Synthetic ${name}</a>`));
      assert.ok(row, name);
      const { item } = rssItemFor(rss, `synthetic-${name}`);
      for (const label of ['Эксплуатация подтверждена', 'Патча нет', 'Патч есть']) {
        for (const output of [page, row]) {
          assert.equal(output.split(`>${label}</span>`).length - 1, labels.includes(label) ? 1 : 0, name + label);
        }
        assert.equal(item.split(`<category>${label}</category>`).length - 1, labels.includes(label) ? 1 : 0, name + label);
      }
      assert.ok(page.includes(`/og/${og}.png`), name);
      assert.ok(page.includes('Операторы нод'));
      assert.ok(page.includes('Read the source advice'));
      assert.ok(page.includes('href="https://source.example/advice"'));
      assert.ok(!page.includes('Апдейт инцидента:'));
      assert.ok(item.includes('<pubDate>Sun, 04 Sep 2033 12:00:00 GMT</pubDate>'));
      for (const output of [page, row, item]) {
        assert.ok(!output.includes('future_status'));
        assert.ok(!output.includes('Conflicting patch'));
        assert.ok(!output.includes('#эксплуатируется'));
      }
      if (card.includes(`>Synthetic ${name}</a>`)) {
        assert.ok(card.includes(`--accent: var(--${accent})`));
        for (const label of labels) assert.ok(card.includes(`>${label}</span>`));
      }
    }
  });
});
