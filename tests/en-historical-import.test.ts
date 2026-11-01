import assert from 'node:assert/strict';
import test from 'node:test';
import { isEnHistoricalImport, parseEnHistoricalImport } from '../src/en-historical-import.ts';

const catalog = () => ({ version: 1, sourceCommit: 'a'.repeat(40), preparedAt: '2026-11-01T06:51:04.634Z',
  entries: [{ slug: 'old-alert', sourceSha256: 'b'.repeat(64) }] });

test('the historical catalog is strict, unique and tied to immutable slugs', () => {
  assert.equal(parseEnHistoricalImport(catalog()).entries[0]!.slug, 'old-alert');
  const invalid = [
    { ...catalog(), privateEvidence: 'not allowed' },
    { ...catalog(), version: '1' },
    { ...catalog(), preparedAt: '2026-02-30T00:00:00.000Z' },
    { ...catalog(), preparedAt: '2026-11-01T06:51:04Z' },
    { ...catalog(), entries: [...catalog().entries, ...catalog().entries] },
    ...['../old-alert', '/old-alert', 'old-alert.md', ''].map(slug => ({ ...catalog(), entries: [{ ...catalog().entries[0], slug }] })),
    { ...catalog(), entries: [{ ...catalog().entries[0], sourceSha256: 'missing' }] },
    { ...catalog(), entries: [{ ...catalog().entries[0], manualIdentity: 'claimed-runtime-id' }] },
  ];
  for (const value of invalid) assert.throws(() => parseEnHistoricalImport(value), /Invalid EN historical import catalog/);
});

test('historical RSS suppression is exact and does not propagate to new updates', () => {
  assert.equal(isEnHistoricalImport('start9-2026-08-26-cln-update'), true);
  assert.equal(isEnHistoricalImport('start9-2026-08-26-cln-update-new-update'), false);
  assert.equal(isEnHistoricalImport('fresh-en-root'), false);
});

test('the Umbrel launch-window translation is suppressed without suppressing future updates', () => {
  assert.equal(isEnHistoricalImport('umbrel-2026-11-01-security-alert'), true);
  assert.equal(isEnHistoricalImport('umbrel-2026-11-01-security-alert-upd'), false);
});
