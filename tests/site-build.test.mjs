import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import {
  FIXTURES,
  REPOSITORY,
  buildSite,
  copySite,
  corpus,
  frontmatter,
  rowAudiences,
  rowFor,
  rssContent,
  rssItemFor,
  text,
  withTemporaryDirectory,
} from './helpers/site.mjs';

const PRODUCER_FIXTURE_ID = 'fixture-2026-09-05-producer-alert';
/**
 * Точные байты merged producer-фикстур: ревизия и SHA-256 пинятся парой.
 * `audiences` — фикстура из issue #92 (несколько групп в одном оповещении);
 * предыдущие ревизии остаются как явное legacy-покрытие, а не заменяются.
 */
const NEW_PRODUCERS = [
  {
    name: 'tags',
    revision: '936392aa52d8c72060bb3baf5568ae0b2167886e',
    digest: 'a1cfc1379675680d3aee74c1a5d582b626f432d7ac2f7d67cfacfc15dfbabad3',
    tags: ['exploitation_confirmed', 'patch_available'],
    audience: ['держатели'],
    labels: [['holders', 'Ходлеры']],
  },
  {
    name: 'empty',
    revision: '936392aa52d8c72060bb3baf5568ae0b2167886e',
    digest: '63faf211ed8b350ae1e8ba8944d208cba54ea2c295765db7c0cc494c04e2a072',
    tags: [],
    audience: ['держатели'],
    labels: [['holders', 'Ходлеры']],
  },
  {
    name: 'audiences',
    revision: '332fba83203d2a80daabfd91c33f351fb6fb106a',
    digest: '300a4d43eb0a3981876d75a4591777a1983fbed3fc107a273fd0e055647f4eee',
    tags: ['exploitation_confirmed', 'patch_available'],
    audience: ['holders', 'developers'],
    labels: [['holders', 'Ходлеры'], ['developers', 'Разработчики']],
  },
];
const PRODUCER_SHA256 = '4703b93ff04788c0833c670ee9d5d93ccedf1425229f4846c9274c996a56ea21';
const EN_V1_FIXTURE_ID = 'fixture-2026-09-05-en-contract-v1';
const EN_V1_SHA256 = '19a7306f50bdd9d62d6fa37f523bf69b7db3325658fdfe3114cc9dfe996f742b';
/** Бейдж известной аудитории — всегда ссылка в отфильтрованную ленту. */
const audienceLink = (id, label) => `<a class="aud aud-link" href="/feed?audience=${id}">${label}</a>`;
const legacyBadge = (label) => `<span class="aud aud-badge">${label}</span>`;

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

async function installProducer(site) {
  const bytes = await readFile(join(FIXTURES, 'site-generated-alert.md'));
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

test('source display semantics are shared by incident pages and RSS', async () => {
  const cases = [
    {
      id: 'source-single-x',
      links: [{ label: 'twitter.com', url: 'https://twitter.com/Single_Handle/status/100' }],
      page: '<p><strong>Источник:</strong> <a href="https://x.com/Single_Handle/status/100" rel="noopener">x.com - Single_Handle</a></p>',
      rss: '<p><strong>Источник:</strong> <a href="https://x.com/Single_Handle/status/100">x.com - Single_Handle</a></p>',
    },
    {
      id: 'source-mixed-x',
      links: [
        { label: 'twitter.com', url: 'https://twitter.com/First/status/200' },
        { label: 'x.com', url: 'https://x.com/Second/status/201' },
      ],
      expected: [
        ['https://x.com/First/status/200', 'x.com - First'],
        ['https://x.com/Second/status/201', 'x.com - Second'],
      ],
    },
    {
      id: 'source-duplicate-x',
      links: [
        { label: 'first', url: 'https://twitter.com/Original/status/300' },
        { label: 'duplicate', url: 'https://x.com/Renamed/status/300' },
      ],
      expected: [['https://x.com/Original/status/300', 'x.com - Original']],
    },
    {
      id: 'source-distinct-x',
      links: [
        { label: 'first', url: 'https://x.com/SameHandle/status/400' },
        { label: 'second', url: 'https://twitter.com/SameHandle/status/401' },
      ],
      expected: [
        ['https://x.com/SameHandle/status/400', 'x.com - SameHandle'],
        ['https://x.com/SameHandle/status/401', 'x.com - SameHandle'],
      ],
    },
    {
      id: 'source-fallbacks',
      links: [
        { label: 'Safe article', url: 'https://example.com/advisory' },
        { label: 'Lookalike X', url: 'https://x.com.example/Fake/status/500' },
      ],
      expected: [
        ['https://example.com/advisory', 'Safe article'],
        ['https://x.com.example/Fake/status/500', 'Lookalike X'],
      ],
    },
    { id: 'source-empty', links: [] },
    {
      id: 'source-hijacked',
      hijacked: true,
      links: [{ label: 'must stay hidden', url: 'https://x.com/Compromised/status/600' }],
    },
  ];

  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    for (const [index, fixture] of cases.entries()) {
      await writeFile(join(site, `src/content/incidents/${fixture.id}.md`), `---
title: "${fixture.id}"
description: "Source display fixture"
pubDate: 2039-01-${String(index + 1).padStart(2, '0')}T00:00:00.000Z
hijacked: ${fixture.hijacked ?? false}
links: ${JSON.stringify(fixture.links)}
---
`);
    }

    const build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    const rss = await text(join(site, 'dist/rss.xml'));

    for (const fixture of cases) {
      const page = await text(join(site, `dist/incidents/${fixture.id}/index.html`));
      const content = rssContent(rssItemFor(rss, fixture.id).item);
      if (fixture.page) {
        assert.ok(page.includes(fixture.page), fixture.id);
        assert.ok(content.includes(fixture.rss), `${fixture.id} RSS`);
        assert.ok(!page.includes('<ul>'), `${fixture.id} page became plural`);
        assert.ok(!content.includes('<ul>'), `${fixture.id} RSS became plural`);
      } else if (fixture.expected) {
        for (const [url, label] of fixture.expected) {
          assert.ok(page.includes(`<a href="${url}" rel="noopener">${label}</a>`), `${fixture.id} page ${url}`);
          assert.ok(content.includes(`<a href="${url}">${label}</a>`), `${fixture.id} RSS ${url}`);
        }
        if (fixture.expected.length === 1) {
          assert.ok(page.includes('<strong>Источник:</strong>'), fixture.id);
          assert.ok(content.includes('<strong>Источник:</strong>'), `${fixture.id} RSS`);
          assert.ok(!page.includes('<ul>'), `${fixture.id} page duplicate was not singular`);
          assert.ok(!content.includes('<ul>'), `${fixture.id} RSS duplicate was not singular`);
        } else {
          assert.ok(page.includes('<strong>Источники:</strong>'), fixture.id);
          assert.match(page, /<ul>[\s\S]*<li>/, fixture.id);
          assert.ok(content.includes('<strong>Источники:</strong>'), `${fixture.id} RSS`);
          assert.match(content, /<ul>[\s\S]*<li>/, `${fixture.id} RSS`);
        }
      } else {
        assert.ok(!page.includes('class="links"'), fixture.id);
        assert.ok(!content.includes('<strong>Источник'), `${fixture.id} RSS`);
        for (const link of fixture.links) {
          assert.ok(!page.includes(link.url), `${fixture.id} page leaked a source`);
          assert.ok(!content.includes(link.url), `${fixture.id} RSS leaked a source`);
        }
      }
    }
  });
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
    const newProducers = [];
    for (const producerSpec of NEW_PRODUCERS) {
      const { name, revision, digest, tags, audience } = producerSpec;
      const bytes = await readFile(join(FIXTURES, `site-generated-alert-${name}.md`));
      assert.equal(createHash('sha256').update(bytes).digest('hex'), digest, `${revision}: ${name}`);
      const id = `fixture-2026-09-05-producer-${name}`;
      await writeFile(join(site, 'src/content/incidents', `${id}.md`), bytes);
      assert.deepEqual(await readFile(join(site, 'src/content/incidents', `${id}.md`)), bytes);
      const data = frontmatter(bytes.toString('utf8'));
      assert.deepEqual(data.statusTags, tags);
      // Байты не правятся: аудитории проверяются такими, какими их прислал producer.
      assert.deepEqual(data.audience, audience, `${revision}: ${name} audience`);
      for (const field of ['urgency', 'exploitationStatus', 'fixStatus', 'updateSufficiency', 'actionTiming', 'reason', 'linkRefs', 'telegramUrl', 'sourceUrl']) {
        assert.ok(!(field in data), `${field} leaked into new producer ${name}`);
      }
      newProducers.push({ ...producerSpec, id, data });
    }

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
    assert.ok(!unknownPage.includes('class="links"'), 'empty links rendered a source block');

    assert.ok(!unknownPage.includes('class="u u-ok"'));
    assert.ok(!unknownPage.includes('#патч_есть'));
    assert.ok(!unknownPage.includes('class="u u-neutral"'));
    assert.ok(!unknownPage.includes('class="status-note"'));
    assert.ok(!unknownPage.includes('fixStatus=future_fix_state'));
    assert.ok(!unknownPage.includes('updateSufficiency=future_sufficiency_state'));
    assert.ok(!unknownPage.includes('actionTiming=future_timing_state'));
    assert.match(index, /<article class="card panel" style="--accent: var\(--dim\)">[\s\S]*?Unknown status fixture/);

    const holdersPosition = unknownPage.indexOf(audienceLink('holders', 'Ходлеры'));
    const developersPosition = unknownPage.indexOf(audienceLink('developers', 'Разработчики'));
    const unknownAudience = '&lt;audience &amp; unknown&gt;';
    assert.ok(holdersPosition >= 0, 'canonical holders label is missing');
    assert.ok(developersPosition > holdersPosition, 'known audiences are not in canonical order');
    assert.equal(unknownPage.split(audienceLink('holders', 'Ходлеры')).length - 1, 1, 'holders alias was not deduplicated');
    assert.equal(unknownPage.split(audienceLink('developers', 'Разработчики')).length - 1, 1, 'developers alias was not deduplicated');
    assert.ok(unknownPage.includes(legacyBadge(unknownAudience)), 'unknown audience was not escaped');
    // Неизвестное значение остаётся нейтральным бейджем: ссылки в фильтр у него нет.
    assert.ok(!unknownPage.includes(`href="/feed?audience=${unknownAudience}"`));
    assert.ok(index.includes(audienceLink('holders', 'Ходлеры')));
    assert.ok(index.includes(audienceLink('developers', 'Разработчики')));
    assert.ok(index.includes(legacyBadge(unknownAudience)));
    assert.ok(updatePage.includes(legacyBadge('операторы')), 'unlisted legacy alias was reclassified');
    assert.ok(!updatePage.includes(audienceLink('node_operators', 'Операторы нод')));
    assert.equal(legacyAudiencePage.split('Все — старая категория').length - 1, 1, 'broad aliases were not deduplicated');
    assert.ok(legacyAudiencePage.includes(legacyBadge('Все — старая категория')));
    assert.ok(!legacyAudiencePage.includes('class="aud aud-link"'), 'broad alias became a filter link');
    assert.ok(!emptyAudiencePage.includes('class="aud aud-'), 'empty audience invented a label');
    assert.ok(!missingAudiencePage.includes('class="aud aud-'), 'missing audience invented a label');
    // Legacy rows carry no canonical ID, so no audience filter can ever claim them.
    for (const legacyId of [LEGACY_AUDIENCE_FIXTURE_ID, EMPTY_AUDIENCE_FIXTURE_ID, MISSING_AUDIENCE_FIXTURE_ID]) {
      assert.deepEqual(rowAudiences(rowFor(feed, `/incidents/${legacyId}/`)), [], legacyId);
    }

    // The static page ships the full feed plus the controls the client filter drives.
    // Behavior itself is checked in a browser; here only the contract they share.
    assert.ok(feed.includes('data-audience-rows'), 'the feed exposes no filterable row host');
    assert.ok(feed.includes('aria-haspopup="dialog"'));
    assert.ok(feed.includes('aria-controls="aud-popover"'));
    assert.ok(feed.includes('aria-expanded="false"'), 'the trigger does not start closed');
    assert.match(feed, /<span class="vh">Фильтр по аудитории:\s*<\/span>/, 'the trigger has no accessible name');
    assert.ok(feed.includes('>Все аудитории</span>'), 'the trigger does not start unfiltered');
    assert.match(feed, /<div class="aud-popover panel"[^>]*role="dialog"[^>]*hidden/);
    assert.ok(feed.includes('<input type="checkbox" data-audience-all>'), 'the select-all control is missing');
    // All four options come from the fixed dictionary, never from current result tags.
    for (const [audienceId, label] of [
      ['holders', 'Ходлеры'],
      ['node_operators', 'Операторы нод'],
      ['developers', 'Разработчики'],
      ['merchant_infra', 'Мерчанты'],
    ]) {
      assert.ok(feed.includes(`<input type="checkbox" value="${audienceId}" data-audience-option>`), audienceId);
      assert.ok(feed.includes(`<span>${label}</span>`), label);
      assert.ok(feed.includes(`href="/feed?audience=${audienceId}"`), `${audienceId} has no feed link`);
    }
    assert.ok(feed.includes('>Выбрать</button>'));
    assert.ok(feed.includes('Выберите хотя бы одну аудиторию'));
    // Every filter state ships hidden: the build cannot know the reader query.
    for (const marker of ['data-audience-filter', 'data-audience-popover', 'data-audience-hint',
      'data-audience-invalid', 'data-audience-empty', 'data-audience-history', 'data-audience-archive-link']) {
      assert.match(feed, new RegExp(`${marker}[^>]*hidden`), marker);
    }
    assert.ok(feed.includes('id="archive"'), 'chronicles are missing from the unfiltered feed');
    assert.ok(feed.includes('href="/feed#archive"'), 'a filtered view cannot reach the chronicles');
    // Without JavaScript the page keeps the full feed and says filtering is unavailable.
    const noscript = feed.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
    assert.ok(noscript, 'the feed has no no-JavaScript notice');
    assert.ok(noscript.includes('фильтр по аудитории не работает'), noscript);
    assert.ok(!noscript.includes('Выбрано'), 'the no-JavaScript notice claims an applied filter');
    // The filter belongs to the feed only; the home page keeps plain audience badges.
    assert.ok(!index.includes('data-audience-filter'));
    assert.ok(!index.includes('data-audience-rows'));

    /**
     * Escape must be heard by the document while the panel is open.
     *
     * ⚠️ A listener bound to the filter subtree stops firing as soon as Tab moves
     * focus out of the popover — from `Выбрать` to the neighboring RSS link — and the
     * unconfirmed draft stayed open. Checked on the shipped bundle, because the
     * deterministic layer has no DOM; real key handling is covered in a browser.
     */
    const assets = join(site, 'dist/_astro');
    const bundles = await Promise.all(
      (await readdir(assets))
        .filter((file) => file.endsWith('.js'))
        .map((file) => text(join(assets, file))),
    );
    const filterScript = [feed, ...bundles].find((code) => code.includes('data-audience-popover') && code.includes('keydown'));
    assert.ok(filterScript, 'the audience filter script never listens for keys');
    assert.match(filterScript, /document\.addEventListener\(\s*[`'"]keydown[`'"]/);

    const nodeOperatorPage = await text(join(site, 'dist/incidents/cln-2026-08-27-offline-guidance/index.html'));
    const merchantPage = await text(join(site, 'dist/incidents/btcpay-2026-08-26-cln-routes-off/index.html'));
    assert.ok(rootPage.includes(audienceLink('holders', 'Ходлеры')));
    assert.ok(nodeOperatorPage.includes(audienceLink('node_operators', 'Операторы нод')));
    assert.ok(merchantPage.includes(audienceLink('merchant_infra', 'Мерчанты')));
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
    for (const { name, id, data, tags, labels } of newProducers) {
      const page = await text(join(site, 'dist/incidents', id, 'index.html'));
      const { canonical, item } = rssItemFor(rss, id);
      assert.ok(item.includes(`<guid isPermaLink="true">${canonical}</guid>`));
      assert.ok(item.includes('<pubDate>Sat, 05 Sep 2026 23:59:59 GMT</pubDate>'));
      assert.ok(page.includes('5 сентября 2026'));
      assert.ok(page.includes(`content="${canonical}"`));
      assert.ok(page.includes(`/og/${tags.length > 0 ? 'critical' : 'default'}.png`));
      for (const output of [page, rssContent(item)]) {
        assert.ok(output.includes(data.description));
        assert.ok(output.includes(data.action));
        assert.ok(output.includes('href="https://coldcard.com/security"'));
        assert.ok(!output.includes('reason'));
        assert.ok(!output.includes('Статус угрозы'));
      }
      // Каждая аудитория producer-байтов рендерится ровно один раз и ведёт в свой фильтр.
      const feedRow = rowFor(feed, `/incidents/${id}/`);
      for (const [audienceId, label] of labels) {
        assert.equal(page.split(audienceLink(audienceId, label)).length - 1, 1, `${name}: ${label}`);
        assert.equal(feedRow.split(audienceLink(audienceId, label)).length - 1, 1, `${name} row: ${label}`);
        assert.equal(item.split(`<category>${label}</category>`).length - 1, 1, `${name} rss: ${label}`);
      }
      // A multi-audience post matches every applicable filter and no other one.
      assert.deepEqual(rowAudiences(feedRow), labels.map(([audienceId]) => audienceId), name);
      for (const [absentId, absentLabel] of [['node_operators', 'Операторы нод'], ['merchant_infra', 'Мерчанты']]) {
        if (labels.some(([audienceId]) => audienceId === absentId)) continue;
        assert.ok(!page.includes(audienceLink(absentId, absentLabel)), `${name} invented ${absentLabel}`);
        assert.ok(!item.includes(`<category>${absentLabel}</category>`), `${name} rss invented ${absentLabel}`);
      }
      for (const label of ['Эксплуатация подтверждена', 'Патч есть', 'Патча нет']) {
        const expected = tags.length > 0 && label !== 'Патча нет';
        assert.equal(page.includes(`>${label}</span>`), expected);
        assert.equal(item.includes(`<category>${label}</category>`), expected);
      }
      if (data.parent) {
        assert.equal(data.parent, producer.parent);
        assert.ok(page.includes(`/incidents/${data.parent}/`));
        assert.ok(producerRoot.includes(`/incidents/${id}/`));
      } else {
        assert.ok(!page.includes('Апдейт инцидента:'));
      }
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
    const rssSourcesPosition = updateRssContent.indexOf('<strong>Источники:</strong>');
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
    assert.ok(!rssContent(audienceRssItem).includes('<strong>Источник'));
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
    ...NEW_PRODUCERS.map(({ name }) => `fixture-2026-09-05-producer-${name}`),
  ]) {
    assert.equal(existsSync(join(REPOSITORY, 'src/content/incidents', `${id}.md`)), false);
  }
});

// Synthetic reader cases only; these are separate from the exact producer evidence above.
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
      const row = rowFor(feed, `/incidents/synthetic-${name}/`);
      const { item } = rssItemFor(rss, `synthetic-${name}`);
      for (const label of ['Эксплуатация подтверждена', 'Патча нет', 'Патч есть']) {
        for (const output of [page, row]) {
          assert.equal(output.split(`>${label}</span>`).length - 1, labels.includes(label) ? 1 : 0, name + label);
        }
        assert.equal(item.split(`<category>${label}</category>`).length - 1, labels.includes(label) ? 1 : 0, name + label);
      }
      assert.ok(page.includes(`/og/${og}.png`), name);
      // The same audience badge links to the same filtered feed from page and row.
      assert.ok(page.includes(audienceLink('node_operators', 'Операторы нод')), name);
      assert.ok(row.includes(audienceLink('node_operators', 'Операторы нод')), name);
      assert.deepEqual(rowAudiences(row), ['node_operators'], name);
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

// Authored timeline scenarios, not producer byte evidence. Insertion order deliberately
// differs from publication time: a frozen legacy update can arrive after new posts.
test('mixed-format history keeps each publication own facts and frozen identity', async () => {
  const cases = [
    ['legacy-root', '2034-09-01', null, null, ['Эксплуатация подтверждена'], 'critical'],
    ['new-tagged', '2034-09-02', 'legacy-root', ['patch_available'], ['Патч есть'], 'patched'],
    ['new-empty', '2034-09-06', 'legacy-root', [], [], 'default'],
    ['new-root', '2034-09-03', null, ['patch_unavailable'], ['Патча нет'], 'unpatched'],
    ['legacy-queued', '2034-09-05', 'new-root', null, ['Эксплуатация подтверждена'], 'critical'],
  ];
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    for (const [name, date, parent, tags] of cases) {
      await writeFile(join(site, `src/content/incidents/mixed-${name}.md`), `---
title: "Mixed ${name}"
description: "A separately recorded publication"
pubDate: ${date}T23:59:59.000Z
${tags === null ? '' : `statusTags: ${JSON.stringify(tags)}`}
urgency: ["#эксплуатируется", "#патча_нет"]
exploitationStatus: observed
fixStatus: partial
audience: [holders, держатели]
incidentKey: "${parent ?? name}"
${parent ? `parent: mixed-${parent}` : ''}
action: "Follow this publication's advice"
links: [{label: Source, url: "https://source.example/advice"}]
---
`);
    }
    const build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    const feed = await text(join(site, 'dist/feed/index.html'));
    const rss = await text(join(site, 'dist/rss.xml'));
    const index = await text(join(site, 'dist/index.html'));
    const card = index.match(/<article class="card panel"[\s\S]*?<\/article>/)?.[0];
    assert.ok(card?.includes('Mixed new-empty'));
    assert.ok(card.includes('--accent: var(--dim)'));
    for (const label of ['Эксплуатация подтверждена', 'Патча нет', 'Патч есть']) assert.ok(!card.includes(label));
    assert.ok(index.includes('data-since="2034-09-03T23:59:59.000Z"'), 'late updates must not reset the root counter');
    const entries = await corpus(join(site, 'src/content'));
    const own = entries.filter(({ data }) => !data.external && !data.draft);
    const recentRoots = own.filter(({ data }) => !data.parent && data.pubDate.valueOf() >= Date.now() - 365 * 864e5);
    assert.ok(index.includes(`<span>за год<b>${recentRoots.length}</b></span>`));
    assert.ok(index.includes(`<span>всего<b>${own.length}</b></span>`));
    for (const output of [index, feed, rss]) assert.doesNotMatch(output, /Без патча|без патча/);
    for (const [name, date, parent, , labels, og] of cases) {
      const id = `mixed-${name}`;
      const page = await text(join(site, `dist/incidents/${id}/index.html`));
      const { canonical, item } = rssItemFor(rss, id);
      const row = rowFor(feed, `/incidents/${id}/`);
      assert.ok(page.includes(`content="${canonical}"`));
      assert.ok(page.includes(`/og/${og}.png`));
      assert.ok(page.includes(`${Number(date.slice(-2))} сентября 2034`));
      assert.ok(item.includes(`<guid isPermaLink="true">${canonical}</guid>`));
      assert.ok(item.includes(`<pubDate>${new Date(`${date}T23:59:59.000Z`).toUTCString()}</pubDate>`));
      for (const label of ['Эксплуатация подтверждена', 'Патча нет', 'Патч есть']) {
        for (const output of [page, row]) {
          assert.equal(output.split(`>${label}</span>`).length - 1, labels.includes(label) ? 1 : 0, `${id}: ${label}`);
        }
        assert.equal(item.includes(`<category>${label}</category>`), labels.includes(label), id);
      }
      // The canonical ID and its Russian alias collapse into one badge, link and row ID.
      assert.equal(page.split(audienceLink('holders', 'Ходлеры')).length - 1, 1);
      assert.equal(row.split(audienceLink('holders', 'Ходлеры')).length - 1, 1);
      assert.equal(item.split('<category>Ходлеры</category>').length - 1, 1);
      assert.deepEqual(rowAudiences(row), ['holders'], id);
      for (const output of [page, rssContent(item)]) {
        assert.ok(output.includes('href="https://source.example/advice"'));
        assert.ok(output.includes('Follow this publication'));
        assert.doesNotMatch(output, /status-note|Статус угрозы|Срочность действий/);
      }
      if (parent) assert.ok(page.includes(`Апдейт инцидента: <a href="/incidents/mixed-${parent}/"`));
      const members = cases.filter(([member, , memberParent]) => (parent ?? name) === (memberParent ?? member));
      const history = page.match(/<div class="thread">[\s\S]*?<\/div>/)?.[0];
      assert.ok(history);
      let position = -1;
      for (const [member] of members.sort((a, b) => a[1].localeCompare(b[1]))) {
        const next = history.indexOf(`Mixed ${member}`);
        assert.ok(next > position, `${id}: thread order ${member}`);
        position = next;
        if (member !== name) assert.ok(history.includes(`/incidents/mixed-${member}/`));
      }
    }
    for (const output of [feed, rss]) {
      let position = -1;
      for (const [name] of [...cases].sort((a, b) => b[1].localeCompare(a[1]))) {
        const next = output.indexOf(`/incidents/mixed-${name}/`);
        assert.ok(next > position, `publication order ${name}`);
        position = next;
      }
    }
  });
});

test('versioned English contract bytes stay paired with the authored Russian fixture', async () => {
  const ruBytes = await readFile(join(FIXTURES, 'site-generated-alert-ru-en-v1.md'));
  const enBytes = await readFile(join(FIXTURES, 'site-generated-alert-en-v1.md'));
  assert.equal(createHash('sha256').update(enBytes).digest('hex'), EN_V1_SHA256);
  const enSource = enBytes.toString('utf8');
  assert.doesNotMatch(enSource, /^\s*[A-Za-z][A-Za-z]+:/m, 'fixture keys must stay double-quoted');
  assert.doesNotMatch(enSource, /:\s*[>|]\s*$/m, 'fixture strings must not use YAML folding');

  const ru = frontmatter(ruBytes.toString('utf8'));
  const en = frontmatter(enSource);
  for (const field of [
    'pubDate',
    'statusTags',
    'audience',
    'product',
    'vendor',
    'hijacked',
    'incidentKey',
    'parent',
    'links',
  ]) {
    assert.deepEqual(en[field], ru[field], field);
  }
  assert.deepEqual(Object.keys(en), [
    'title',
    'description',
    'pubDate',
    'statusTags',
    'audience',
    'product',
    'vendor',
    'action',
    'hijacked',
    'incidentKey',
    'parent',
    'enPublishedAt',
    'links',
  ]);
  const enPublishedAt = new Date(en.enPublishedAt);
  assert.ok(Number.isFinite(enPublishedAt.valueOf()));
  assert.ok(enPublishedAt.valueOf() >= en.pubDate.valueOf());
  assert.notEqual(en.title, ru.title);
  assert.notEqual(en.description, ru.description);
  assert.notEqual(en.action, ru.action);
});

test('English and Russian collections isolate equal basenames and emit only real alternates', async () => {
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    await mkdir(join(site, 'src/content/en/incidents'), { recursive: true });

    const ruBytes = await readFile(join(FIXTURES, 'site-generated-alert-ru-en-v1.md'));
    const enBytes = await readFile(join(FIXTURES, 'site-generated-alert-en-v1.md'));
    await writeFile(join(site, 'src/content/incidents', `${EN_V1_FIXTURE_ID}.md`), ruBytes);
    await writeFile(join(site, 'src/content/en/incidents', `${EN_V1_FIXTURE_ID}.md`), enBytes);

    let build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);

    const ruRoute = await text(join(site, 'dist/incidents', EN_V1_FIXTURE_ID, 'index.html'));
    const enRoute = await text(join(site, 'dist/en/incidents', EN_V1_FIXTURE_ID, 'index.html'));
    const feed = await text(join(site, 'dist/feed/index.html'));
    const rss = await text(join(site, 'dist/rss.xml'));
    assert.match(ruRoute, /<html lang="ru">/);
    assert.match(enRoute, /<html lang="en">/);
    assert.ok(ruRoute.includes('Coldcard: обновление рекомендации'));
    assert.ok(!ruRoute.includes('Coldcard advisory update'));
    assert.ok(enRoute.includes('Coldcard advisory update'));
    assert.ok(!enRoute.includes('Coldcard: обновление рекомендации'));
    assert.ok(feed.includes('Coldcard: обновление рекомендации'));
    assert.ok(!feed.includes('Coldcard advisory update'));
    assert.ok(rss.includes('Coldcard: обновление рекомендации'));
    assert.ok(!rss.includes('Coldcard advisory update'));
    assert.ok(enRoute.includes(`rel="canonical" href="https://sec.21ideas.org/en/incidents/${EN_V1_FIXTURE_ID}/"`));
    for (const route of [ruRoute, enRoute]) {
      assert.ok(route.includes('hreflang="ru"'));
      assert.ok(route.includes('hreflang="en"'));
    }
    assert.ok(!enRoute.includes('type="application/rss+xml"'));

    await writeFile(join(site, 'src/content/en/incidents', `${EN_V1_FIXTURE_ID}.md`), '');
    build = buildSite(site);
    assert.notEqual(build.status, 0, 'an empty English artifact must fail instead of creating a route');
  });

  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    const build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    assert.equal(existsSync(join(site, 'dist/en/incidents/blink-2026-09-19-security-alert/index.html')), false);
    const enRoutes = existsSync(join(site, 'dist/en/incidents'))
      ? (await readdir(join(site, 'dist/en/incidents'), { recursive: true })).filter((path) => path.endsWith('index.html'))
      : [];
    assert.deepEqual(enRoutes, []);
    const ruOnly = await text(join(site, 'dist/incidents/blink-2026-09-19-security-alert/index.html'));
    assert.ok(!ruOnly.includes('hreflang="en"'));
  });
});

test('English orphan updates keep one RU-anchored incident before and after their English root arrives', async () => {
  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    const enDirectory = join(site, 'src/content/en/incidents');
    await mkdir(enDirectory, { recursive: true });
    const root = 'fixture-en-thread-root';
    const enArtifact = ({ title, pubDate, parent }) => `---
"title": "${title}"
"description": "Public English description"
"pubDate": "${pubDate}"
"statusTags": []
"audience":
  - "future_audience"
"product": "Fixture"
"vendor": "Fixture Vendor"
"action": "Use the safe release."
"hijacked": false
"incidentKey": "fixture|english-thread"
${parent ? `"parent": "${parent}"\n` : ''}"enPublishedAt": "2036-01-10T00:00:00.000Z"
"links": []
---
`;
    await writeFile(join(site, 'src/content/incidents', `${root}.md`), `---
title: "Russian root title"
description: "Russian root description"
pubDate: 2035-12-31T23:59:59.000Z
statusTags: []
audience: []
incidentKey: "fixture|english-thread"
links: []
---
`);
    const firstUpdate = enArtifact({
      title: 'English update one',
      pubDate: '2036-01-01T00:00:00.000Z',
      parent: root,
    });
    const secondUpdate = enArtifact({
      title: 'English update two',
      pubDate: '2036-01-02T00:00:00.000Z',
      parent: root,
    });
    await writeFile(join(enDirectory, 'fixture-en-thread-update-1.md'), firstUpdate);
    await writeFile(join(enDirectory, 'fixture-en-thread-update-2.md'), secondUpdate);

    let build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    assert.equal(existsSync(join(site, 'dist/en/incidents', root, 'index.html')), false);
    for (const id of ['fixture-en-thread-update-1', 'fixture-en-thread-update-2']) {
      const page = await text(join(site, 'dist/en/incidents', id, 'index.html'));
      assert.ok(page.includes('Update to incident'));
      assert.ok(page.includes(`href="/incidents/${root}/"`));
      assert.ok(page.includes('Russian incident history'));
      assert.ok(page.includes(`data-incident-root="${root}"`));
      assert.ok(page.includes('data-incident-date="2035-12-31T23:59:59.000Z"'));
    }

    await writeFile(join(enDirectory, `${root}.md`), enArtifact({
      title: 'English root',
      pubDate: '2035-12-31T23:59:59.000Z',
    }));
    await writeFile(join(enDirectory, 'fixture-en-thread-update-3.md'), enArtifact({
      title: 'English update three',
      pubDate: '2036-01-03T00:00:00.000Z',
      parent: root,
    }));
    build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    assert.equal(await text(join(enDirectory, 'fixture-en-thread-update-1.md')), firstUpdate);
    assert.equal(await text(join(enDirectory, 'fixture-en-thread-update-2.md')), secondUpdate);
    const ids = [root, 'fixture-en-thread-update-1', 'fixture-en-thread-update-2', 'fixture-en-thread-update-3'];
    const titles = new Map([
      [root, 'English root'],
      ['fixture-en-thread-update-1', 'English update one'],
      ['fixture-en-thread-update-2', 'English update two'],
      ['fixture-en-thread-update-3', 'English update three'],
    ]);
    for (const id of ids) {
      const page = await text(join(site, 'dist/en/incidents', id, 'index.html'));
      assert.equal(page.split(`data-incident-root="${root}"`).length - 1, 1, id);
      assert.ok(page.includes('data-incident-date="2035-12-31T23:59:59.000Z"'), id);
      for (const member of ids) assert.ok(page.includes(member === id ? `>${titles.get(member)}<` : `/en/incidents/${member}/`), `${id}: ${member}`);
      assert.ok(!page.includes('future_audience'));
    }
  });
});

test('English schema rejects malformed or private artifact fields while unknown IDs remain neutral', async () => {
  const valid = `
"title": "English fixture"
"description": "Public description"
"pubDate": "2036-01-01T00:00:00.000Z"
"statusTags": ["future_status"]
"audience": ["future_audience"]
"hijacked": false
"incidentKey": "fixture|shape"
"enPublishedAt": "2036-01-01T00:00:01.000Z"
"links": []
`;
  const cases = [
    [valid.replace('"statusTags": ["future_status"]\n', '"statusTags": "future_status"\n'), 'statusTags'],
    [valid.replace('"audience": ["future_audience"]\n', '"audience": "future_audience"\n'), 'audience'],
    [valid.replace('"pubDate": "2036-01-01T00:00:00.000Z"', '"pubDate": "2036-02-31T00:00:00.000Z"'), 'pubDate'],
    [valid.replace('"enPublishedAt": "2036-01-01T00:00:01.000Z"\n', ''), 'enPublishedAt'],
    [valid.replace('2036-01-01T00:00:01.000Z', '2035-12-31T23:59:59.000Z'), 'enPublishedAt'],
    [valid.replace('2036-01-01T00:00:01.000Z', '2036-01-01T04:00:01.000+04:00'), 'enPublishedAt'],
    [valid.replace('2036-01-01T00:00:01.000Z', '2036-99-99T99:99:99.999Z'), 'enPublishedAt'],
    [valid.replace('2036-01-01T00:00:01.000Z', '2036-02-31T00:00:01.000Z'), 'enPublishedAt'],
    [valid.replace('"links": []', '"links": [{"label": "unsafe"}]'), 'links'],
    [valid.replace('"links": []', '"links": [{"label": "unsafe", "url": "javascript:alert(1)"}]'), 'links'],
    [valid.replace('"links": []', '"links": [{"label": "source", "url": "https://example.com", "reason": "private"}]'), 'reason'],
    [`${valid}"reason": "private model reasoning"\n`, 'reason'],
    [`${valid}"rawModelUrl": "https://model.invalid/unverified"\n`, 'rawModelUrl'],
    [`${valid}"privateEvidence": "raw source text"\n`, 'privateEvidence'],
  ];
  for (const [fields, expectedField] of cases) {
    await withTemporaryDirectory(async (directory) => {
      const site = join(directory, 'site');
      await copySite(site);
      const enDirectory = join(site, 'src/content/en/incidents');
      await mkdir(enDirectory, { recursive: true });
      await writeFile(join(enDirectory, 'fixture-invalid-en.md'), `---${fields}---\n`);
      const build = buildSite(site);
      assert.notEqual(build.status, 0);
      assert.match(`${build.stdout}\n${build.stderr}`, new RegExp(expectedField));
      assert.match(`${build.stdout}\n${build.stderr}`, /InvalidContentEntryDataError/);
    });
  }

  await withTemporaryDirectory(async (directory) => {
    const site = join(directory, 'site');
    await copySite(site);
    const enDirectory = join(site, 'src/content/en/incidents');
    await mkdir(enDirectory, { recursive: true });
    await writeFile(join(enDirectory, 'fixture-neutral-en.md'), `---${valid}---\n`);
    const build = buildSite(site);
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    const page = await text(join(site, 'dist/en/incidents/fixture-neutral-en/index.html'));
    assert.ok(!page.includes('future_status'));
    assert.ok(!page.includes('future_audience'));
    for (const privateValue of ['reason', 'private model reasoning', 'rawModelUrl', 'private evidence']) {
      assert.ok(!page.includes(privateValue));
    }
  });
});
