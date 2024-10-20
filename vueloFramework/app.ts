import type { ViteDevServer } from "vite";
import { createSSRApp } from "vue";

export async function createApp(vite: ViteDevServer, component: any) {
  let module;
  try {
    module = await vite.ssrLoadModule("src/App.vue");
  } catch (error) {
    console.log("App.vue no found con src using default");
    module = await vite.ssrLoadModule("vueloFramework/defaults/App.vue");
  }
  const app = createSSRApp(module.default);
  if (component) {
    app.component("RouteView", component.default);
  }
  return app;
}
