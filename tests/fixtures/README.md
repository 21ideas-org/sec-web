# Producer contract fixtures

`site-generated-alert.md` is an exact byte copy of
[`fixtures/site-generated-alert.md` in sec-watcher-bot at 3839ffb81659cdf0826b12dbcd058cea09789fbe](https://github.com/21ideas-org/sec-watcher-bot/blob/3839ffb81659cdf0826b12dbcd058cea09789fbe/fixtures/site-generated-alert.md).
That repository's `tests/site-render.test.ts` checks its equality with the renderer output.
SHA-256: `4703b93ff04788c0833c670ee9d5d93ccedf1425229f4846c9274c996a56ea21`.

Tests verify the digest and install these bytes only in a temporary site tree; no
neighboring checkout or network fetch is needed. When intentionally updating the
producer contract, copy its fixture unchanged and update the commit and digest here
and in the test together. This file is never public incident content.

The isolated build harness also creates synthetic audience fixtures at test time. They
exercise the website's canonical-ID reader contract and legacy fallbacks; they are not
examples of current producer output and are always removed with the temporary site.

Synthetic `statusTags` cases are authored in `tests/site-build.test.mjs` for the optional
reader contract: empty, single, compatible multiple, unknown and conflicting tags.
They are not new producer output. The exact legacy fixture above remains unchanged;
the new producer bytes below are pinned separately after the writer transition.

## Optional-tag producer output

Exact byte copies from merged `sec-watcher-bot` revision
`936392aa52d8c72060bb3baf5568ae0b2167886e` (central issue #122, PR #126):

| Local file | Committed producer source | SHA-256 |
| --- | --- | --- |
| `site-generated-alert-tags.md` | [`fixtures/site-generated-alert.md`](https://github.com/21ideas-org/sec-watcher-bot/blob/936392aa52d8c72060bb3baf5568ae0b2167886e/fixtures/site-generated-alert.md) | `a1cfc1379675680d3aee74c1a5d582b626f432d7ac2f7d67cfacfc15dfbabad3` |
| `site-generated-alert-empty.md` | [`fixtures/site-generated-alert-empty.md`](https://github.com/21ideas-org/sec-watcher-bot/blob/936392aa52d8c72060bb3baf5568ae0b2167886e/fixtures/site-generated-alert-empty.md) | `63faf211ed8b350ae1e8ba8944d208cba54ea2c295765db7c0cc494c04e2a072` |

The producer's `tests/site-render.test.ts` checks both files against its real renderer;
`fixtures/site-generated-alert.sha256` records the same hashes. The prior legacy file
above is unchanged (and matches the producer's `site-generated-alert-legacy.md` at
this revision). File names in the temporary website identify test publications only;
their frontmatter bytes, frozen timestamps and parent links are not edited.

The harness builds all three exact files together. Authored mixed-history fixtures
separately exercise new tagged/empty updates of legacy roots and a late legacy queued
update of a new root. Each publication uses its own format and facts, including an
explicit empty array overriding contradictory legacy metadata. These synthetic
scenarios are compatibility evidence, not model judgment or historical producer output.
No test or build reads the producer repository or fetches these links.
