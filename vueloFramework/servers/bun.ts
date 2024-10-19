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
  
        // manejar rutas de islas
        if (url.pathname.startsWith("/api/")) {
          for (const island of components.islands) {
            const name = "/api/islands/" + island.name;
            const path = island.path;
            console.log(url.pathname, island);
  
            if (url.pathname === name) {
              return new Response(name);
            }
          }
          // Si ninguna ruta de isla coincide, puedes retornar un 404 o un mensaje
          return new Response("Not Found", { status: 404 });
        } else {
          // manejar páginas del frontend
          try {
            let template = getTemplate();
            const rcomponent = resolveRouteComponent(components.pages, url);
            const appHtml = await createVueloApp(vite, rcomponent);
            const html = template.replace(`<!--vuelo-app-html-->`, appHtml);
            return new Response(html, {
              headers: { "Content-Type": "text/html" },
            });
          } catch (error) {
            console.error("Error during rendering:", error);
            return new Response("Internal Server Error", { status: 500 });
          }
        }
  
        // No debería llegar aquí, pero en caso de que sí, puedes retornar un 404 o un mensaje
        return new Response("Not Found", { status: 404 });
      },
      port: config.port,
    });
  }
  