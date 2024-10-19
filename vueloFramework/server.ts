import { readFileSync } from "fs";
import { resolve } from "path";
import { createVueloApp } from "./createVueloApp";

export async function start() {
  Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);

      try {
        // Lee el archivo `index.html`
        let template = readFileSync(resolve("index.html"), "utf-8");

        // Renderiza la aplicación
        const appHtml = await createVueloApp(url.pathname);

        // Inyecta la app renderizada en el template
        const html = template.replace(`<!--app-html-->`, appHtml);

        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        console.error("Error during rendering:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    },
    port: 3000,
  });

  console.log("Vuelo running on http://localhost:3000/");
}
