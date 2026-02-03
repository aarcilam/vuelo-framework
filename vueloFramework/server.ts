import { createServer } from "vite";
import { getImports, islandsComponents, pagesComponents } from "./autoImport";
import { type VueloConfig } from "./interfaces/vueloConfig";
import BunServer from "./servers/bun";
import path from "path";

export async function vuelo(config: VueloConfig = {}) {
  const defaultConfig: VueloConfig = {
    port: 9876,
    flavor: "bun",
    mode: "SSR",
  };
  const finalConfig = { ...defaultConfig, ...config };
  
  // Asegurar que Vite use el root del proyecto del usuario, no del paquete
  // Esto es crítico cuando el paquete está instalado en node_modules
  const projectRoot = process.cwd();
  
  const vite = await createServer({
    root: projectRoot, // Especificar explícitamente el root del proyecto
    server: { middlewareMode: true },
  });
  const autoImports = await getImports();
  const components = {
    pages: await pagesComponents(vite, autoImports.manifest.pages),
    islands: await islandsComponents(vite, autoImports.manifest.islands),
  };
  const server = BunServer(vite, finalConfig, components);
  return server;
}
