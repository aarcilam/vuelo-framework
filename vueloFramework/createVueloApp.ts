import { renderToString } from "vue/server-renderer";
import { createApp } from "./app";

export async function createVueloApp(vite: any, component: any) {
  const {app} = await createApp(vite, component);
  // TODO retornar un compoente de error
  try {
    const html = await renderToString(app);
    return html;
  } catch (error) {
    console.error("Error al renderizar la app:", error);
    return "<div>Error rendering the app</div>";
  }
}
