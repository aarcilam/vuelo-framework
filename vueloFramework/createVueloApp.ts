import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

export async function createVueloApp(vite: any, component: any) {
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
  // TODO retornar un compoente de error©
  try {
    const html = await renderToString(app);
    return html;
  } catch (error) {
    console.error("Error al renderizar la app:", error);
    return "<div>Error rendering the app</div>";
  }
}
