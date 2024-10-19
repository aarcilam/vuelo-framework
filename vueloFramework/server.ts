import { createServer as createViteServer } from "vite";
import { getImports } from "./autoImport";
import Index from "../src/pages/index.vue";
import About from "../src/pages/about/index.vue";
import { readFileSync } from "fs";
import { resolve } from "path";
import { createVueloApp } from "./createVueloApp";

export interface VueloConfig {
}

const routes = {
  "/": Index,
  "/about": About,
};

export async function start(config: VueloConfig) {
  // Crear el servidor Vite
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  const { manifest } = await getImports();
  Bun.serve({
    async fetch(req) {
      const url = req.url;

      try {
        let template;

        template = readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);

        const appHtml = await createVueloApp(url);

        const html = template
          .replace(`<!--app-html-->`, appHtml);

        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      } catch (e:any) {
        console.log(e.stack);
        return new Response("", {
          headers: { "Content-Type": "text/html" },
        });
      }
    },
    port: 3000,
  });
}
