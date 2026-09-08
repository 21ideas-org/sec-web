import assert from 'node:assert/strict';
import test from 'node:test';
import { displayUrgency } from '../src/status.ts';

test('present empty and unknown statusTags are authoritative over legacy facts', () => {
  for (const statusTags of [[], ['future_status']]) {
    assert.deepEqual(displayUrgency({ statusTags, urgency: ['#эксплуатируется', '#патч_есть'], exploitationStatus: 'active', fixStatus: 'available' }), []);
  }
});

test('recognized tags are deduplicated in canonical order', () => {
  assert.deepEqual(displayUrgency({ statusTags: ['patch_available', 'exploitation_confirmed', 'patch_available'] }), ['Эксплуатация подтверждена', 'Патч есть']);
});

test('legacy precedence preserves recorded facts without inferring partial fix or current exploitation', () => {
  assert.deepEqual(displayUrgency({ urgency: ['#патча_нет'], exploitationStatus: 'observed', fixStatus: 'available' }), ['Эксплуатация подтверждена', 'Патч есть']);
  assert.deepEqual(displayUrgency({ urgency: ['#эксплуатируется', '#патча_нет'], fixStatus: 'unknown' }), ['Эксплуатация подтверждена']);
  assert.deepEqual(displayUrgency({ urgency: ['#патч_частичный'], fixStatus: 'partial' }), []);
  assert.deepEqual(displayUrgency({ urgency: ['#патч_частичный'] }), []);
  assert.deepEqual(displayUrgency({ urgency: ['#эксплуатируется', '#патча_нет'], exploitationStatus: 'unknown' }), ['Патча нет']);
  assert.deepEqual(displayUrgency({ urgency: ['#эксплуатируется', '#патча_нет'], exploitationStatus: 'none_observed' }), ['Патча нет']);
  assert.deepEqual(displayUrgency({ urgency: ['future_status'], exploitationStatus: 'future', fixStatus: 'future' }), []);
});

test('conflicting patch claims are both omitted while exploitation survives', () => {
  assert.deepEqual(displayUrgency({ statusTags: ['patch_available', 'patch_unavailable', 'exploitation_confirmed'] }), ['Эксплуатация подтверждена']);
  assert.deepEqual(displayUrgency({ urgency: ['#патч_есть', '#патча_нет'] }), []);
});

test('each fact combination has the agreed accent and OG priority with textual labels', async () => {
  const { urgencyAccent, urgencyClass, ogFor, statusDiagnostic } = await import('../src/status.ts');
  for (const [statusTags, accent, image] of [
    [[], 'dim', 'default'],
    [['patch_available'], 'ok-fg', 'patched'],
    [['patch_unavailable'], 'warn-fg', 'unpatched'],
    [['exploitation_confirmed'], 'crit-fg', 'critical'],
    [['patch_available', 'exploitation_confirmed'], 'crit-fg', 'critical'],
    [['patch_unavailable', 'exploitation_confirmed'], 'crit-fg', 'critical'],
    [['patch_available', 'patch_unavailable'], 'dim', 'default'],
  ] as const) {
    const labels = displayUrgency({ statusTags });
    assert.equal(urgencyAccent(labels), `var(--${accent})`);
    assert.equal(ogFor(labels), `/og/${image}.png`);
    assert.ok(labels.every((label) => urgencyClass(label) !== 'u-neutral'));
  }
  assert.equal(urgencyClass('future'), 'u-neutral');
  assert.equal(statusDiagnostic({ statusTags: ['future'] }), undefined);
  assert.equal(statusDiagnostic({ statusTags: ['patch_available', 'patch_unavailable'] }), 'Conflicting patch status tags: both patch claims omitted.');
});
