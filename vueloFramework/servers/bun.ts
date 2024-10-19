import type { ViteDevServer } from "vite";
import { createVueloApp } from "../createVueloApp";
import { resolveRouteComponent } from "../router";
import getTemplate from "../utils/template";
import type { VueloConfig } from "../interfaces/vueloConfig";
import fs from 'fs'; // Asegúrate de importar el módulo fs para trabajar con el sistema de archivos
import path from 'path'; // Asegúrate de importar el módulo path para manejar rutas


export default function BunServer(
    vite: ViteDevServer,
    config: VueloConfig,
    components: any,
  ) {
    return Bun.serve({
      async fetch(req) {
        const url = new URL(req.url);
  
        // manejar rutas de islas
        if (url.pathname.startsWith("/api/islands/")) {
            for (const island of components.islands) {
                const name = "/api/islands/" + island.name;
                const filePath = path.join(__dirname, "../../",island.path); // Ruta al archivo de la isla
                console.log(url.pathname, island);
      
                if (url.pathname === name) {
                  try {
                    // Leer el contenido del archivo
                    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
                    return new Response(fileContent, {
                      headers: { "Content-Type": "text/plain" }, // Cambia el Content-Type según sea necesario
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
  