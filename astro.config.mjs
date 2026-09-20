// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sec.21ideas.org',
  base: '/',
  // Tests symlink the locked node_modules tree into isolated site copies. Keep the
  // content store site-local so one fixture build cannot leak entries into another.
  cacheDir: './.astro-cache/',
  integrations: [sitemap()],
  // Не добавлять rehype-плагины и подсветку в critical path: approved target пишет
  // content create-only из sec-watcher-bot, а короткая сборка сужает окно custom 404.
});
