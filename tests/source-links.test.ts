import assert from 'node:assert/strict';
import test from 'node:test';

import { displaySourceLinks } from '../src/source-links.ts';

test('strict X status permalinks use a canonical href and author label', () => {
  assert.deepEqual(
    displaySourceLinks([
      { label: 'legacy label', url: 'https://twitter.com/Core_LN/status/123456?ref=feed#post' },
      { label: 'another legacy label', url: 'http://x.com:80/start9labs/status/789' },
      { label: 'case-insensitive host', url: 'HTTPS://TWITTER.COM/MixedCase/status/999' },
    ]),
    [
      { label: 'x.com - Core_LN', url: 'https://x.com/Core_LN/status/123456' },
      { label: 'x.com - start9labs', url: 'https://x.com/start9labs/status/789' },
      { label: 'x.com - MixedCase', url: 'https://x.com/MixedCase/status/999' },
    ],
  );
});

test('X status IDs deduplicate across host aliases while distinct IDs stay ordered', () => {
  assert.deepEqual(
    displaySourceLinks([
      { label: 'first', url: 'https://twitter.com/first_handle/status/42' },
      { label: 'duplicate', url: 'https://x.com/renamed_handle/status/42' },
      { label: 'second post', url: 'https://x.com/first_handle/status/43' },
    ]),
    [
      { label: 'x.com - first_handle', url: 'https://x.com/first_handle/status/42' },
      { label: 'x.com - first_handle', url: 'https://x.com/first_handle/status/43' },
    ],
  );
});

test('non-X and noncanonical X URLs retain their stored safe display values', () => {
  const links = [
    { label: 'Article', url: 'https://example.com/advisory' },
    { label: 'Lookalike', url: 'https://x.com.example/alice/status/1' },
    { label: 'Credentials', url: 'https://alice:secret@x.com/alice/status/2' },
    { label: 'Port', url: 'https://twitter.com:444/alice/status/3' },
    { label: 'Wrong path', url: 'https://x.com/alice/status/4/photo/1' },
    { label: 'Nonnumeric', url: 'https://x.com/alice/status/not-a-number' },
    { label: 'Wrong scheme', url: 'ftp://x.com/alice/status/5' },
  ];

  assert.deepEqual(displaySourceLinks(links), links);
});
