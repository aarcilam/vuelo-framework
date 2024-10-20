import { createServer } from "vite";
import { getImports, islandsComponents, pagesComponents } from "./autoImport";
import { type VueloConfig } from "./interfaces/vueloConfig";
import BunServer from "./servers/bun";

export async function vuelo(config: VueloConfig = {
  port: 9876,
  flavor: "bun",
}) {
  const vite = await createServer({
    server: { middlewareMode: true },
  });
  const autoImports = await getImports();
  const components = {
    pages: await pagesComponents(vite, autoImports.manifest.pages),
    islands: await islandsComponents(vite, autoImports.manifest.islands),
  };
  const server = BunServer(vite, config, components);

  console.log("Vuelo running on " + server.url);
}
