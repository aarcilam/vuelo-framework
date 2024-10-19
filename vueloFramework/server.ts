import { createVueloApp } from "./createVueloApp";
import { createServer } from "vite";
import { pagesComponents } from "./autoImport";
import { resolveRouteComponent } from "./router";
import { type VueloConfig } from "./interfaces/vueloConfig";
import getTemplate from "./utils/template";

export async function vuelo(config:VueloConfig) {
  const vite = await createServer({
    server: { middlewareMode: true },
  });
  const components = {
    pages: await pagesComponents(vite),
  };
  Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);

      try {
        let template = getTemplate();
        const rcomponent = resolveRouteComponent(
          components.pages,
          url.pathname,
        );
        const appHtml = await createVueloApp(vite, rcomponent);
        const html = template.replace(`<!--app-html-->`, appHtml);
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        console.error("Error during rendering:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    },
    port: config.port,
  });

  console.log("Vuelo running on http://localhost:"+config.port);
}
