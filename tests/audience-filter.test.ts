import assert from 'node:assert/strict';
import test from 'node:test';

import { AUDIENCE_IDS, type AudienceId } from '../src/audience.ts';
import {
  AUDIENCE_QUERY_KEY,
  EMPTY_DRAFT_MESSAGE,
  audienceHref,
  canApplyDraft,
  canonicalSelection,
  filterByAudience,
  matchesAudience,
  parseAudienceQuery,
  postAudienceIds,
  selectAllState,
  serializeAudienceQuery,
  toggleDraft,
  toggleSelectAll,
  triggerLabel,
} from '../src/audience-filter.ts';

const query = (search: string | URLSearchParams) => parseAudienceQuery(search);
const post = (...audience: string[]) => ({ id: audience.join('+') || 'none', audience });

test('the query key and reset target are the shareable contract', () => {
  assert.equal(AUDIENCE_QUERY_KEY, 'audience');
  for (const id of AUDIENCE_IDS) assert.equal(audienceHref(id), `/feed?audience=${id}`);
});

test('recognized values deduplicate and serialize in canonical order', () => {
  assert.deepEqual(query('?audience=developers&audience=holders&audience=developers'), {
    selected: ['holders', 'developers'],
    invalid: false,
    search: '?audience=holders&audience=developers',
  });
  assert.deepEqual(query('audience=merchant_infra&audience=node_operators').search,
    '?audience=node_operators&audience=merchant_infra');
  assert.deepEqual(query(new URLSearchParams([['audience', 'holders']])).selected, ['holders']);
});

test('no audience query and all four audiences are the same unfiltered feed', () => {
  for (const search of ['', '?', '?page=2', '?audience=holders&audience=node_operators&audience=developers&audience=merchant_infra']) {
    assert.deepEqual(query(search), { selected: [], invalid: false, search: '' }, search);
  }
  // Repeated and reordered full sets canonicalize to the same unfiltered URL.
  assert.deepEqual(
    query('?audience=merchant_infra&audience=developers&audience=developers&audience=node_operators&audience=holders'),
    { selected: [], invalid: false, search: '' },
  );
});

test('historical aliases reach the filter through the single normalization boundary', () => {
  assert.deepEqual(query('?audience=%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D1%82%D0%B5%D0%BB%D0%B8'), {
    selected: ['holders'],
    invalid: false,
    search: '?audience=holders',
  });
  assert.deepEqual(query('?audience=мерчанты').selected, ['merchant_infra']);
  assert.deepEqual(query('?audience=мерчанты&audience=merchant_infra').search, '?audience=merchant_infra');
});

test('unrecognized queries produce the invalid state instead of a silent feed', () => {
  for (const search of [
    '?audience=bogus',
    '?audience=',
    '?audience=all',
    '?audience=все',
    '?audience=Holders',
    '?audience=holders&audience=bogus',
  ]) {
    assert.deepEqual(query(search), { selected: [], invalid: true, search: '' }, search);
  }
});

test('a parsed query round-trips through its own canonical search string', () => {
  for (const selected of [[], ['holders'], ['holders', 'merchant_infra'], ['node_operators', 'developers', 'merchant_infra']] as AudienceId[][]) {
    const search = serializeAudienceQuery(selected);
    assert.deepEqual(query(search).selected, selected);
    assert.equal(query(search).search, search);
  }
});

test('matching is OR over the post own canonical audiences', () => {
  assert.deepEqual(postAudienceIds(['developers', 'держатели', 'holders']), ['holders', 'developers']);
  assert.deepEqual(postAudienceIds(['all', 'все', '<unknown>']), []);

  const multi = ['holders', 'developers'];
  assert.equal(matchesAudience(multi, ['holders']), true);
  assert.equal(matchesAudience(multi, ['developers']), true);
  assert.equal(matchesAudience(multi, ['holders', 'developers']), true);
  assert.equal(matchesAudience(multi, ['node_operators']), false);
  assert.equal(matchesAudience(multi, ['node_operators', 'developers']), true);
  assert.equal(matchesAudience(['держатели'], ['holders']), true);

  // Legacy breadth is never converted into membership in a specific group.
  for (const legacy of [['all'], ['все'], ['всем'], ['операторы'], []]) {
    for (const id of AUDIENCE_IDS) assert.equal(matchesAudience(legacy, [id]), false, `${legacy}/${id}`);
    // The unfiltered feed keeps them.
    assert.equal(matchesAudience(legacy, []), true, `${legacy} unfiltered`);
  }
});

test('filtering keeps date order and lists a multi-audience post once', () => {
  const list = [
    post('holders', 'developers'),
    post('node_operators'),
    post('all'),
    post(),
    post('разработчики'),
  ];
  assert.deepEqual(filterByAudience(list, ['holders', 'developers']).map((e) => e.id), [
    'holders+developers',
    'разработчики',
  ]);
  assert.deepEqual(filterByAudience(list, []), list);
  assert.deepEqual(filterByAudience(list, ['merchant_infra']), []);
});

test('the trigger label reflects the applied state', () => {
  assert.equal(triggerLabel([]), 'Все аудитории');
  assert.equal(triggerLabel(['holders']), 'Ходлеры');
  assert.equal(triggerLabel(['node_operators']), 'Операторы нод');
  assert.equal(triggerLabel(['developers']), 'Разработчики');
  assert.equal(triggerLabel(['merchant_infra']), 'Мерчанты');
  assert.equal(triggerLabel(['holders', 'developers']), 'Аудитории: 2');
  assert.equal(triggerLabel(['holders', 'node_operators', 'developers']), 'Аудитории: 3');
  // Four selected audiences are the unfiltered feed, never "Аудитории: 4".
  assert.equal(triggerLabel([...AUDIENCE_IDS]), 'Все аудитории');
});

test('draft edits stay in canonical order and never apply themselves', () => {
  assert.deepEqual(toggleDraft([], 'developers', true), ['developers']);
  assert.deepEqual(toggleDraft(['developers'], 'holders', true), ['holders', 'developers']);
  assert.deepEqual(toggleDraft(['holders', 'developers'], 'holders', false), ['developers']);
  assert.deepEqual(toggleDraft(['developers'], 'developers', true), ['developers']);
  assert.deepEqual(toggleDraft(['developers'], 'holders', false), ['developers']);
});

test('Все is a select-all control, not a fifth audience', () => {
  assert.equal(selectAllState([]), 'none');
  assert.equal(selectAllState(['holders']), 'partial');
  assert.equal(selectAllState(['holders', 'node_operators', 'developers']), 'partial');
  assert.equal(selectAllState([...AUDIENCE_IDS]), 'all');
  assert.deepEqual(toggleSelectAll(['holders'], true), [...AUDIENCE_IDS]);
  assert.deepEqual(toggleSelectAll([...AUDIENCE_IDS], false), []);
  // Manually completing the set is the same as checking Все.
  assert.equal(selectAllState(toggleDraft(['holders', 'node_operators', 'developers'], 'merchant_infra', true)), 'all');
});

test('an empty draft cannot be applied and explains itself', () => {
  assert.equal(EMPTY_DRAFT_MESSAGE, 'Выберите хотя бы одну аудиторию');
  assert.equal(canApplyDraft([]), false);
  assert.equal(canApplyDraft(['holders']), true);
  assert.equal(canApplyDraft([...AUDIENCE_IDS]), true);
});

test('applying a draft yields the URL state, and all four resets the filter', () => {
  assert.deepEqual(canonicalSelection(['developers', 'holders', 'developers']), ['holders', 'developers']);
  assert.equal(serializeAudienceQuery(['holders']), '?audience=holders');
  assert.equal(serializeAudienceQuery(['developers', 'holders']), '?audience=holders&audience=developers');

  // Applying all four is the unfiltered feed, in the selection and in the URL alike.
  assert.deepEqual(canonicalSelection([...AUDIENCE_IDS]), []);
  assert.equal(serializeAudienceQuery([...AUDIENCE_IDS]), '');
  assert.deepEqual(canonicalSelection([]), []);
  assert.equal(serializeAudienceQuery([]), '');
});
