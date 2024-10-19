import { readFileSync } from "fs";
import { resolve } from "path";
import { createVueloApp } from "./createVueloApp";
import { createServer } from "vite";
import { pagesComponents } from "./autoImport";
import { resolveRouteComponent } from "./router";

export async function start() {
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
        let template = readFileSync(resolve("index.html"), "utf-8");
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
    port: 3000,
  });

  console.log("Vuelo running on http://localhost:3000/");
}
