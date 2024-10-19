import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    server: {
      middlewareMode: true, // Para que funcione como middleware en el servidor de Bun
    },
    ssr: {
      // Puedes agregar cualquier configuración que requiera la SSR aquí, si es necesario
      noExternal: ["vue"], // Esto asegura que `vue` no se externalice y esté disponible para el SSR
    },
});
