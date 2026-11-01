# Selected English chronicles for owner review (#196)

Historical scope note: the eight titles/dates below were owner-approved and merged
in sec-web PR #39. The later #285 import adds five more direct title translations
without repeating source verification; see [en-historical-import.md](en-historical-import.md).
The original review record below describes the earlier eight-entry slice.

Owner scope, 2026-10-31: prepare exactly the eight external references selected from
the Russian Chronicles section. This extends the original active-root preparation
scope of [central #196](https://github.com/21ideas-org/sec-watcher-bot/issues/196) to a
specific human-maintained collection. It does not authorize translating the other
archive entries, turning these references into bot alerts, merging or deploying.
This slice does not complete #196's separate active-root inventory or editorial approval.

All eight RU entries have `external: true`: no own incident page, status/audience,
thread action or RSS item. Their EN copies retain the same basename, event date,
source label and URL. Only the title is authored in English. EN references live in
`src/content/en/archive/` and are read only by `enArchive` and the EN feed section.
The worker creates immutable artifacts only in `src/content/en/incidents/`, so these
references are not manual root candidates or automated-envelope jobs and cannot occupy
the worker's create-only destination. No EN publication time or frozen envelope is invented.

Sources were read afresh on 2026-10-31 to check the proposed titles. This is an
editorial check of currently accessible primary source material, not a recovery of
historical snapshots, gate-visible input or a model evaluation. The originals may have
been revised since the historical events. The dates below are the existing RU
chronology dates; they are not asserted to be each linked article's publication date.

| RU basename / retained event date | Proposed English title | Source and factual comparison |
| --- | --- | --- |
| `2026-07-30-coldcard-entropy` / 2026-07-30 | COLDCARD: weak seed-generation entropy and fund theft | [Coinkite](https://blog.coinkite.com/entropy-technical-backgrounder/) describes an RNG integration error, weak seed generation and offline theft. The current article is dated July 30 and includes later guidance. The RU title's numerical theft total is omitted because it was not established in the cited text checked today. |
| `2026-01-30-phpcoinaddress` / 2026-01-30 | PHPCoinAddress: years of weak Bitcoin wallets | [Milk Sad update 18](https://milksad.info/posts/research-update-18/) reports weak-wallet usage over multiple years. That linked follow-up is dated February 25, 2026; [part 1](https://milksad.info/posts/research-update-17/) is dated January 30. The existing RU date and part-2 reference are retained, without labelling January 30 as part 2's publication date. |
| `2025-04-03-pypi-bitcoinlib` / 2025-04-03 | Malicious PyPI packages target bitcoinlib users | [ReversingLabs](https://www.reversinglabs.com/blog/malicious-python-packages-target-popular-bitcoin-library), April 3, 2025, describes malicious packages impersonating fixes and attempting database theft. The title refers to users being targeted; it does not claim that the legitimate bitcoinlib package was compromised. |
| `2024-01-04-bip3x-weak-rng` / 2024-01-04 | Milk Sad: weak randomness in bip3x | [Milk Sad update 4](https://milksad.info/posts/research-update-4/), January 4, 2024, examines insecure random-generation paths in bip3x. No claim of confirmed theft, universal exploitability or a current patch state is added. |
| `2023-11-14-randstorm` / 2023-11-14 | Randstorm vulnerability disclosure | [Unciphered](https://www.unciphered.com/disclosure-of-vulnerable-bitcoin-wallet-library-2/), November 14, 2023, discloses weak wallet generation involving early BitcoinJS and its dependencies. No affected-year range or quantitative exposure claim is added to the title. |
| `2023-08-08-milk-sad` / 2023-08-08 | Milk Sad disclosure: weak seeds in libbitcoin | [Milk Sad disclosure](https://milksad.info/disclosure.html) explains the weak entropy path in Libbitcoin Explorer and resulting key recovery/thefts. The historical disclosure date remains the RU chronology date; this is not an English copy of its historical gate input. |
| `2022-06-07-electrum-file-scheme` / 2022-06-07 | Electrum: file:// vulnerability in BIP70 payment requests | [Electrum advisory](https://github.com/spesmilo/electrum/security/advisories/GHSA-4fh4-hx35-r355), June 7, 2022, identifies the BIP70 `file://` handling flaw. The title does not turn local-file opening into an unsupported arbitrary-code-execution claim. |
| `2021-05-11-cake-wallet-seeds` / 2021-05-11 | Cake Wallet: weak Bitcoin wallet seeds | [Milk Sad update 9](https://milksad.info/posts/research-update-9/) is a May 19, 2024 technical retrospective on the 2020/2021 flaw and confirms public disclosure in May 2021. May 11 is retained from the owner's RU chronology; the exact day was not independently established from this retrospective. |

## Review boundary

The Coldcard title deliberately drops the unverified numerical total. PHPCoinAddress
and Cake Wallet retain their existing event dates despite later linked research.
Owner review should approve those title/date choices together with the English copy
before public merge. The RU files and links remain unchanged.

The new external-reference schema is separate from strict EN bot artifacts. It accepts
only title/date/external/source/sourceUrl, requires `external: true` and an HTTP(S) URL
without credentials. The reader rejects nonempty body text. References never enter
the incident/audience/thread/RSS/counter readers and create no locale counterpart page.
The existing audience-filter behavior hides Chronicles while filtering alerts and
offers a link back to the complete English section.

Required local checks are `npm test`, `npm run check`, and `npm run build`. The
integration test uses these actual eight records to verify ordering, original RU
dates/source URLs, external links, unchanged RU display, absent EN incident routes and
RSS entries, unchanged alert counts, plus schema rejection of private fields/unsafe URLs.
