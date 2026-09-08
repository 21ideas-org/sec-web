import assert from 'node:assert/strict';
import test from 'node:test';

import { displayAudience } from '../src/audience.ts';

test('canonical IDs and explicit aliases deduplicate in canonical order', () => {
  assert.deepEqual(
    displayAudience([
      'merchant_infra',
      'разработчики',
      'node_operators',
      'держатели',
      'holders',
      'мерчанты',
    ]),
    [
      { id: 'holders', label: 'Ходлеры' },
      { id: 'node_operators', label: 'Операторы нод' },
      { id: 'developers', label: 'Разработчики' },
      { id: 'merchant_infra', label: 'Мерчанты' },
    ],
  );
});

test('legacy broad aliases stay unresolved and do not expand to canonical IDs', () => {
  for (const value of ['all', 'все', 'всем']) {
    assert.deepEqual(displayAudience([value]), [
      { id: null, label: 'Все — старая категория' },
    ]);
  }
  assert.deepEqual(displayAudience(['all', 'все', 'всем']), [
    { id: null, label: 'Все — старая категория' },
  ]);
});

test('unknown values remain literal, neutral, and distinct from explicit aliases', () => {
  assert.deepEqual(displayAudience(['операторы', '<legacy>&', 'операторы']), [
    { id: null, label: 'операторы' },
    { id: null, label: '<legacy>&' },
  ]);
  assert.deepEqual(displayAudience([]), []);
});
