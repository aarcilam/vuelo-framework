import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

export async function createVueloApp(vite: any, component: any) {
  const { default: App } = await vite.ssrLoadModule("/src/App.vue");
  const app = createSSRApp(App);
  if (component) {
    app.component("RouteView", component.App);
  }
  // TODO retornar un compoente de error
  try {
    const html = await renderToString(app);
    return html;
  } catch (error) {
    console.error("Error al renderizar la app:", error);
    return "<div>Error rendering the app</div>";
  }
}
