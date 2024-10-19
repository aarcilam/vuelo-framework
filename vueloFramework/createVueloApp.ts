import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { resolveRouteComponent } from "./router";

export async function createVueloApp(vite: any, url: string) {
  const { default: App } = await vite.ssrLoadModule("/src/App.vue");
  const routeComponent = await resolveRouteComponent(vite, url);
  console.log(routeComponent);
  const app = createSSRApp(App);
  if (routeComponent) {
    app.component("RouteView", routeComponent);
  }
  try {
    const html = await renderToString(app);
    return html;
  } catch (error) {
    console.error("Error al renderizar la app:", error);
    return "<div>Error rendering the app</div>";
  }
}
