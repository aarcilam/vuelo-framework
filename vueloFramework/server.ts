import { createServer } from "vite";
import { getImports, islandsComponents, pagesComponents } from "./autoImport";
import { type VueloConfig } from "./interfaces/vueloConfig";
import BunServer from "./servers/bun";
import path from "path";
import fs from "fs";

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
  
  // Limpiar la caché de Vite antes de iniciar para evitar problemas con dependencias desactualizadas
  const viteCacheDir = path.join(projectRoot, "node_modules", ".vite");
  if (fs.existsSync(viteCacheDir)) {
    console.log(`[INFO] Limpiando caché de Vite...`);
    try {
      fs.rmSync(viteCacheDir, { recursive: true, force: true });
      console.log(`[INFO] Caché de Vite limpiada`);
    } catch (e) {
      console.log(`[WARN] No se pudo limpiar la caché de Vite: ${e}`);
    }
  }
  
  const vite = await createServer({
    root: projectRoot, // Especificar explícitamente el root del proyecto
    server: { middlewareMode: true },
    configFile: path.resolve(projectRoot, "vite.config.ts"), // Cargar la configuración de Vite
  });
  
  // Forzar la optimización de dependencias al inicio para evitar errores ERR_OUTDATED_OPTIMIZED_DEP
  // Esto asegura que Vue esté optimizado antes de compilar componentes
  console.log(`[INFO] Forzando optimización de dependencias...`);
  try {
    // Pre-cargar Vue múltiples veces para forzar su optimización completa
    // Esto ayuda a que Vite termine de optimizar antes de que intentemos compilar
    for (let i = 0; i < 5; i++) {
      try {
        await vite.transformRequest("vue", { ssr: false });
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        // Ignorar errores individuales
      }
    }
    // Esperar un momento adicional para asegurar que la optimización terminó completamente
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(`[INFO] Optimización de dependencias completada`);
  } catch (e) {
    // Ignorar errores de pre-carga, continuar de todas formas
    console.log(`[WARN] Error durante optimización inicial, continuando...`);
  }
  
  const autoImports = await getImports();
  const components = {
    pages: await pagesComponents(vite, autoImports.manifest.pages),
    islands: await islandsComponents(vite, autoImports.manifest.islands),
  };
  const server = BunServer(vite, finalConfig, components);
  return server;
}
