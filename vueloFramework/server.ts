import { createServer } from "vite";
import { getImports, islandsComponents, pagesComponents } from "./autoImport";
import { type VueloConfig } from "./interfaces/vueloConfig";
import BunServer from "./servers/bun";

export async function vuelo(config: VueloConfig = {}) {
  const defaultConfig: VueloConfig = {
    port: 9876,
    flavor: "bun",
    mode: "SSR",
  };
  const finalConfig = { ...defaultConfig, ...config };
  const vite = await createServer({
    server: { middlewareMode: true },
  });
  const autoImports = await getImports();
  const components = {
    pages: await pagesComponents(vite, autoImports.manifest.pages),
    islands: await islandsComponents(vite, autoImports.manifest.islands),
  };
  const server = BunServer(vite, finalConfig, components);

  console.log("Vuelo running on " + server.url);
}
