import { createVueloApp } from "./createVueloApp";
import { createServer } from "vite";
import { pagesComponents } from "./autoImport";
import { resolveRouteComponent } from "./router";
import { type VueloConfig } from "./interfaces/vueloConfig";
import getTemplate from "./utils/template";
import BunServer from "./servers/bun";

export async function vuelo(config:VueloConfig = {
  port: 3000,
  flavor: "bun",
}) {
  const vite = await createServer({
    server: { middlewareMode: true },
  });
  const components = {
    pages: await pagesComponents(vite),
  };
  const server = BunServer(vite,config,components);
  
  console.log("Vuelo running on "+server.url);
}
