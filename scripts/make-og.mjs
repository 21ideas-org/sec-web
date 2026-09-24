// Ручная пересборка OG-карточек: `npm run og`.
//
// ⚠️ Карточек ровно две — по одной на локаль, и они КОММИТЯТСЯ в public/og.
// Источник — утверждённые векторные scripts/og/<locale>.svg: только контуры, без
// <text> и шрифтов, поэтому рендер не зависит от машины. Генератор их не рисует и
// не правит, а только растеризует. Персональных и статусных карточек нет: ссылка
// уже разослана раньше, чем деплой успел бы их собрать. По той же причине sharp —
// devDependency и в деплое не запускается.
//
// Legacy critical/unpatched/patched/default.png остаются в public/og ради уже
// собранных превью, но этот скрипт их не создаёт и не трогает.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const W = 1200, H = 630;
const LOCALES = ['ru', 'en'];

for (const locale of LOCALES) {
  const svg = await readFile(`scripts/og/${locale}.svg`);
  const png = await sharp(svg).png().toBuffer();
  const { width, height } = await sharp(png).metadata();
  if (width !== W || height !== H) {
    throw new Error(`scripts/og/${locale}.svg rendered ${width}x${height}, expected ${W}x${H}`);
  }
  await writeFile(`public/og/${locale}.png`, png);
  console.log('og →', `${locale}.png`, `${width}x${height}`, png.length, 'байт');
}
