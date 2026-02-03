import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["vue"],
    // Evitar errores de dependencias desactualizadas durante el desarrollo
    holdUntilCrawlEnd: false,
    // Forzar re-optimización cuando sea necesario
    force: false, // No forzar siempre, pero permitir que se re-optimice cuando sea necesario
  },
  ssr: {
    noExternal: ["vue"],
    resolve: {
      conditions: ["import", "module", "browser", "default"],
      externalConditions: ["import", "module"],
    },
  },
});
