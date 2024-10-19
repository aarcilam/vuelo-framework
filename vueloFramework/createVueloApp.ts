import { createSSRApp, h } from "vue";
import App from "../src/App.vue";
import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function createVueloApp(path: string) {
  const { app } = createApp();

  const ctx = {};
  const html = await renderToString(app, ctx);

  return html;
}
