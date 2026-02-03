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
    // Deshabilitar la detección de dependencias desactualizadas durante la compilación
    // Esto evita el error ERR_OUTDATED_OPTIMIZED_DEP cuando compilamos en el servidor
    disabled: false, // Mantener habilitado, pero manejaremos el error de otra forma
  },
  ssr: {
    noExternal: ["vue"],
    resolve: {
      conditions: ["import", "module", "browser", "default"],
      externalConditions: ["import", "module"],
    },
  },
});
