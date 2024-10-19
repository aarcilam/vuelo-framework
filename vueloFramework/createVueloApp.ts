import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { createServer as createViteServer } from "vite";

export async function createVueloApp(url: string) {
  const vite = await createViteServer({
    server: { middlewareMode: true,port: 3001 },
  });

  // Usa el método de Vite para importar App.vue y transformarlo antes de usarlo
  const { default: App } = await vite.ssrLoadModule("/src/App.vue");

  const app = createSSRApp(App);
  try {
    const html = await renderToString(app);
    return html;
  } catch (error) {
    console.error("Error al renderizar la app:", error);
    return "<div>Error rendering the app</div>";
  }
}
