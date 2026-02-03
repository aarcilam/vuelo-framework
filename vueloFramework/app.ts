import type { ViteDevServer } from "vite";
import { createSSRApp, h } from "vue";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolver el directorio del módulo actual (funciona tanto en desarrollo como en node_modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// El archivo por defecto está en vueloFramework/defaults/App.vue relativo a este archivo
const defaultAppPath = path.resolve(__dirname, "defaults", "App.vue");

export async function createApp(vite: ViteDevServer, component: any) {
  let module;
  
  // Verificar si src/App.vue existe antes de intentar cargarlo
  // Esto evita que Vite registre errores innecesarios
  const projectRoot = process.cwd();
  const customAppPath = path.resolve(projectRoot, "src/App.vue");
  const hasCustomApp = fs.existsSync(customAppPath);
  
  if (hasCustomApp) {
    module = await vite.ssrLoadModule("src/App.vue");
  } else {
    // Usar el App.vue por defecto si no existe uno personalizado
    module = await vite.ssrLoadModule(`/@fs/${defaultAppPath}`);
  }
  const app = createSSRApp(module.default);
  
  // Siempre registrar RouteView, incluso si no hay componente (usar componente vacío)
  if (component && component.default) {
    app.component("RouteView", component.default);
  } else {
    // Registrar un componente vacío si no hay componente de ruta
    // Usar función render en lugar de template para compatibilidad con SSR
    // Vue SSR no soporta compilación de templates en tiempo de ejecución
    app.component("RouteView", {
      render() {
        return h('div', { class: 'text-center p-8 text-gray-500' }, 'Página no encontrada');
      }
    });
  }
  
  return {app};
}
