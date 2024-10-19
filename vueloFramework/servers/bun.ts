import type { ViteDevServer } from "vite";
import { createVueloApp } from "../createVueloApp";
import { resolveRouteComponent } from "../router";
import getTemplate from "../utils/template";
import type { VueloConfig } from "../interfaces/vueloConfig";

export default function BunServer(
  vite: ViteDevServer,
  config: VueloConfig,
  components: any,
) {
  return Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      //handres islands pages
      console.log(components.islands);
      // handre front end pages
      try {
        let template = getTemplate();
        const rcomponent = resolveRouteComponent(
          components.pages,
          url.pathname,
        );
        const appHtml = await createVueloApp(vite, rcomponent);
        const html = template.replace(`<!--vuelo-app-html-->`, appHtml);
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
}
