import assert from 'node:assert/strict';
import test from 'node:test';
import { enIncidentGroups } from '../src/en-incidents.ts';

const post = (id: string, pubDate: string, parent?: string) => ({
  id,
  data: { pubDate: new Date(pubDate), parent },
});

test('English thread groups count a shared root once and prefer the known Russian root date', () => {
  const root = 'shared-root';
  const russian = [post(root, '2035-12-31T23:59:59.000Z')];
  const first = post('update-one', '2036-01-01T00:00:00.000Z', root);
  const second = post('update-two', '2036-01-02T00:00:00.000Z', root);

  const orphanGroups = enIncidentGroups([second, first], russian);
  assert.equal(orphanGroups.length, 1);
  assert.equal(orphanGroups[0]!.rootSlug, root);
  assert.equal(orphanGroups[0]!.hasEnglishRoot, false);
  assert.equal(orphanGroups[0]!.date.toISOString(), '2035-12-31T23:59:59.000Z');
  assert.deepEqual(orphanGroups[0]!.posts.map(({ id }) => id), ['update-one', 'update-two']);

  const englishRoot = post(root, '2035-12-31T23:59:59.000Z');
  const third = post('update-three', '2036-01-03T00:00:00.000Z', root);
  const completeGroups = enIncidentGroups([second, third, englishRoot, first], russian);
  assert.equal(completeGroups.length, 1);
  assert.equal(completeGroups[0]!.hasEnglishRoot, true);
  assert.equal(completeGroups[0]!.date.toISOString(), '2035-12-31T23:59:59.000Z');
  assert.deepEqual(completeGroups[0]!.posts.map(({ id }) => id), [root, 'update-one', 'update-two', 'update-three']);
});
