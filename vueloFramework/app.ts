import type { ViteDevServer } from "vite";
import { createSSRApp } from "vue";
import path from "path";
import { fileURLToPath } from "url";

// Resolver el directorio del módulo actual (funciona tanto en desarrollo como en node_modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// El archivo por defecto está en vueloFramework/defaults/App.vue relativo a este archivo
const defaultAppPath = path.resolve(__dirname, "defaults", "App.vue");

export async function createApp(vite: ViteDevServer, component: any) {
  let module;
  try {
    module = await vite.ssrLoadModule("src/App.vue");
  } catch (error) {
    console.log("App.vue no found con src using default");
    // Usar el formato /@fs/ para que Vite pueda resolver la ruta absoluta
    module = await vite.ssrLoadModule(`/@fs/${defaultAppPath}`);
  }
  const app = createSSRApp(module.default);
  if (component) {
    app.component("RouteView", component.default);
  }
  return {app};
}
