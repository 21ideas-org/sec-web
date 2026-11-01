# Manual English history import (#285)

This finite import contains direct English translations of 162 published Russian
announcements from `sec-web` revision `682418481d8b8d7d9fae8599de1519a5204c195e`,
plus five Chronicle titles completing the 13 external references. The eight earlier
English Chronicles are retained unchanged. The owner authorized translation and PR
preparation without renewed source, eligibility, semantic or factual review. These
are manual translations of the existing public text, not outputs reconstructed from
historical EN worker envelopes or a claim that the underlying advice was reverified.

## Identity and chronology

The translated files reuse the original basenames, UTC `pubDate`, parent slugs,
product/vendor and source links. Status/audience aliases were converted using the
site's existing presentation rules; no new classification was inferred. All 37
updates have translated roots. The strict EN v1 frontmatter/body schema and exact
producer fixture are unchanged. `enPublishedAt` records the actual preparation time,
`2026-11-01T06:51:04.634Z`; it does not pretend that English versions existed on the
original Russian publication dates.

`src/data/en-historical-import.json` records the fixed source revision, preparation
time and each imported slug with its original RU file SHA-256. The hash is provenance
for that snapshot, not an assertion that the source claims are correct. Tangem's
`tangem-2026-10-11-support-data-breach` is the sole RU entry without `incidentKey`;
its catalog entry records a stable `manual-translation:<slug>` site identity. This
opaque key is not a recovered runtime incident identity and creates no bot state.

## RSS boundary

`src/en-historical-import.ts` strictly validates the catalog, including unique safe
slugs. The English RSS reader excludes exactly these imported IDs. The pages,
chronological feed, audience filters, counters, locale pairing and thread history
continue to use all English content. The catalog never filters by age, title, source
or parent: a future alert or a new update to an imported root remains eligible for
RSS, using its own frozen `enPublishedAt` and stable permalink/GUID.

Malformed catalog metadata stops the build. Files do not gain a bypass flag, the
producer schema is not relaxed and Russian RSS is unchanged. Do not remove an import
entry just to make an old page appear as a new notification. Later factual corrections
or a broader historical import require their own scoped review.

## Worker and publication boundary

This site-owned import neither enqueues nor drains jobs in `sec-watcher-bot`. The
merged #283 activation cutoff must keep old jobs dormant during the later #197
rollout; never enable a worker revision that can try to recreate these historical
files. Website writes remain create-only. No deployment, production DB/service change,
worker activation or new runtime model invocation is part of this PR. Merging content
does not prove live English generation quality or complete #197.

## Deterministic verification

The regression first demonstrated that the prepared history flooded RSS with new
items. Actual-corpus tests now verify all 162 historical pages/feed entries remain
visible and absent from RSS; an additional standalone fixture and an update to an
imported root enter RSS with their frozen timestamps and GUIDs. The actual-corpus
RSS regression retains a preexisting
live artifact and derives its expected baseline from all non-imported entries, so
future worker publications do not break the test.
Empty/partial English corpus scenarios explicitly clear only the EN incident directory in their temporary
site trees, preserving those original coverage boundaries alongside the actual corpus.
Metadata checks compare original dates, links, parent identities and source hashes;
they do not reassess prose or incident facts. Required checks: `npm test`,
`npm run check`, `npm run build` and `git diff --check`.
