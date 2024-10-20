import type { ViteDevServer } from "vite";
import { createVueloApp } from "../createVueloApp";
import { resolveRouteComponent } from "../router";
import getTemplate from "../utils/template";
import type { VueloConfig } from "../interfaces/vueloConfig";
import fs from "fs"; // Asegúrate de importar el módulo fs para trabajar con el sistema de archivos
import path from "path"; // Asegúrate de importar el módulo path para manejar rutas
import { compileVueComponent } from "../utils/compile";

export default function BunServer(
  vite: ViteDevServer,
  config: VueloConfig,
  components: any,
) {
  return Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      // Servir hydrateClientComponents.js de forma estática
      if (url.pathname === "/vuelo/hydrateClientComponents.js") {
        const filePath = path.join(__dirname, "../hydrateClientComponents.js"); // Ajusta la ruta al archivo
        try {
          // Leer el archivo de forma asíncrona
          const fileContent = await fs.promises.readFile(filePath, "utf-8");
          return new Response(fileContent, {
            headers: { "Content-Type": "application/javascript" }, // Especifica el tipo MIME para JavaScript
          });
        } catch (error) {
          console.error("Error reading hydrateClientComponents.js:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      }
      // manejar rutas de islas
      if (url.pathname.startsWith("/api/islands/")) {
        for (const island of components.islands) {
          const name = "/api/islands/" + island.name;
          const filePath = path.join(__dirname, "../../", island.path); // Ruta al archivo de la isla

          if (url.pathname === name) {
            try {
              // Leer el contenido del archivo
              const fileContent = await fs.promises.readFile(filePath, "utf-8");
              const compiledComponent = await compileVueComponent(fileContent);

              return new Response(JSON.stringify(compiledComponent), {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (error) {
              console.error("Error reading file:", error);
              return new Response("Internal Server Error", { status: 500 });
            }
          }
        }
        // Si ninguna ruta de isla coincide, puedes retornar un 404 o un mensaje
        return new Response("Not Found", { status: 404 });
      } else {
        // manejar páginas del frontend
        try {
          let template = getTemplate();
          template = await vite.transformIndexHtml(url.origin, template)
          const rcomponent = resolveRouteComponent(components.pages, url);
          const appHtml = await createVueloApp(vite, rcomponent);
          let script = `
            <script type="module" src="/vuelo/hydrateClientComponents.js"></script>
          `;
          if (config.mode === "SSR") {
            script = `
            <script type="module" src="/vueloFramework/client.js"></script>
          `;
          }

          const html = template
            .replace(`<!--vuelo-app-html-->`, appHtml)
            .replace(`</body>`, `${script}</body>`);

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
