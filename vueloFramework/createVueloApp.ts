import { createSSRApp, h } from "vue";
import App from "../src/App.vue";
import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function createVueloApp(path: string) {
  const { app } = createApp();
  try {
    const html = await renderToString(app);
    return html;
  } catch (error) {
    console.error("Error rendering app:", error);
    return "<!-- Error rendering app -->";
  }
}
