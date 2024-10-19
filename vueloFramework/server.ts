import { renderToString } from 'vue/server-renderer';
import { createVueloApp } from './createVueloApp';
import { getImports } from './autoImport';

export interface VueloConfig{

}

export async function start(config:VueloConfig) {
  const {manifest} = await getImports();
  console.log(manifest.pages);
  Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      const app = createVueloApp(url.pathname);
      const html = await renderToString(app);

      return new Response(html, {
          headers: { 'Content-Type': 'text/html' },
      });
    },
    port: 3000,
  });
}