import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const REPOSITORY = fileURLToPath(new URL('..', import.meta.url));
const LEGACY_OG = ['critical', 'unpatched', 'patched', 'default'];

/** PNG размеры из IHDR: без sharp, чтобы тест не зависел от devDependency генератора. */
async function pngSize(path) {
  const bytes = await readFile(path);
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path} is not a PNG`);
  assert.equal(bytes.subarray(12, 16).toString('ascii'), 'IHDR');
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

test('each locale has one checked-in 1200x630 OG card with its vector source', async () => {
  for (const locale of ['ru', 'en']) {
    assert.deepEqual(await pngSize(join(REPOSITORY, 'public/og', `${locale}.png`)), [1200, 630], locale);
    const svg = await readFile(join(REPOSITORY, 'scripts/og', `${locale}.svg`), 'utf8');
    assert.match(svg, /<svg [^>]*width="1200" height="630" viewBox="0 0 1200 630"/, locale);
    assert.match(svg, new RegExp(`<svg lang="${locale}"`), locale);
    // Контуры, а не набор: рендер не должен зависеть от установленных шрифтов.
    assert.doesNotMatch(svg, /<text\b|font-family|<image\b/, locale);
    if (locale === 'en') assert.doesNotMatch(svg, /\p{Script=Cyrillic}/u, 'EN card copy contains Cyrillic');
  }
});

test('legacy status cards stay published but the generator can only render locale cards', async () => {
  for (const legacy of LEGACY_OG) {
    assert.equal(existsSync(join(REPOSITORY, 'public/og', `${legacy}.png`)), true, legacy);
  }
  const generator = await readFile(join(REPOSITORY, 'scripts/make-og.mjs'), 'utf8');
  assert.match(generator, /const LOCALES = \['ru', 'en'\];/);
  assert.match(generator, /scripts\/og\/\$\{locale\}\.svg/);
  assert.match(generator, /public\/og\/\$\{locale\}\.png/);
  for (const legacy of LEGACY_OG) {
    assert.ok(!generator.includes(`'${legacy}.png'`), `generator still writes ${legacy}.png`);
  }
  const pkg = JSON.parse(await readFile(join(REPOSITORY, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.og, 'node scripts/make-og.mjs');
  assert.doesNotMatch(pkg.scripts.build, /og/, 'OG generation must stay out of deploy');
});
