# Producer contract fixture

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
