import {
  createApp,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";

export function hydrateComponents() {
  const elements = document.querySelectorAll("[data-hydrate]");
  
  console.log(`[DEBUG] Found ${elements.length} elements to hydrate`);

  elements.forEach(async (element) => {
    const componentName = element.getAttribute("data-hydrate");
    const eventType = element.getAttribute("data-hydrate-event");

    console.log(`[DEBUG] Setting up hydration for ${componentName} with event ${eventType}`);

    if (!componentName || !eventType) {
      console.warn(`[WARN] Missing componentName or eventType for element:`, element);
      return;
    }

    const hydrate = async () => {
      console.log(`[DEBUG] Hydration triggered for ${componentName}`);
      try {
        // Importar dinámicamente el componente compilado como módulo ES
        const moduleUrl = `/api/islands/${componentName.toLowerCase()}`;
        
        console.log(`[DEBUG] Fetching component from: ${moduleUrl}`);
        
        // Crear un módulo dinámico usando import() con un data URL o fetch + eval
        // Como no podemos usar import() directamente con URLs relativas en todos los navegadores,
        // vamos a usar una técnica alternativa: crear un script module dinámicamente
        const response = await fetch(moduleUrl);
        if (!response.ok) {
          console.error(`[ERROR] Failed to fetch component: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const compiledCode = await response.text();
        
        console.log(`[DEBUG] Fetching component ${componentName}...`);
        console.log(`[DEBUG] Code length: ${compiledCode.length}`);
        console.log(`[DEBUG] First 300 chars:`, compiledCode.substring(0, 300));
        
        let Component;
        
        // Usar Blob URL para crear un módulo que el navegador pueda importar
        // Esto permite que los imports estáticos funcionen si están correctamente resueltos
        const blob = new Blob([compiledCode], { type: 'application/javascript' });
        const blobUrl = URL.createObjectURL(blob);
        
        try {
          // Intentar importar el módulo usando Blob URL
          // Los imports dentro del código deberían resolverse automáticamente
          const module = await import(blobUrl);
          
          // Limpiar el Blob URL después de importar
          URL.revokeObjectURL(blobUrl);
          
          console.log(`[DEBUG] Module imported:`, module);
          console.log(`[DEBUG] Module keys:`, Object.keys(module));
          console.log(`[DEBUG] Module.default:`, module.default);
          
          // Obtener el componente (puede estar en default o en exports)
          Component = module.default || module;
          
          if (!Component) {
            // Intentar acceder directamente a las propiedades del módulo
            Component = Object.values(module).find(v => v && typeof v === 'object' && (v.render || v.setup || v.__name));
            console.log(`[DEBUG] Component found in module values:`, Component);
          }
          
          // Verificar que el componente tenga las propiedades necesarias
          if (Component) {
            console.log(`[DEBUG] Component structure:`, {
              hasRender: !!Component.render,
              hasSetup: !!Component.setup,
              hasTemplate: !!Component.template,
              __name: Component.__name
            });
          }
        } catch (importError) {
          console.error("Blob URL import failed:", importError);
          console.error("Import error details:", importError.message, importError.stack);
          URL.revokeObjectURL(blobUrl);
          
          // Fallback: usar Function constructor para código sin imports complejos
          try {
            console.log(`[DEBUG] Trying Function constructor fallback...`);
            const moduleExports = {};
            const module = { exports: moduleExports };
            const exports = moduleExports;
            
            // Ejecutar el código compilado
            const moduleFunction = new Function('module', 'exports', compiledCode);
            moduleFunction(module, exports);
            
            Component = module.exports.default || module.exports;
            
            console.log(`[DEBUG] Component from Function constructor:`, Component);
            console.log(`[DEBUG] Component structure:`, {
              hasRender: Component?.render ? 'yes' : 'no',
              hasSetup: Component?.setup ? 'yes' : 'no',
              __name: Component?.__name
            });
          } catch (functionError) {
            console.error("Function constructor also failed:", functionError);
            console.error("Function error details:", functionError.message, functionError.stack);
            throw new Error(`Failed to load component ${componentName}: ${functionError.message}`);
          }
        }
        
        if (!Component) {
          console.error(`[ERROR] Component ${componentName} not found. Module structure:`, Object.keys(module || {}));
          throw new Error(`Component ${componentName} not found in module exports`);
        }
        
        console.log(`[DEBUG] Component found:`, Component);

        // Verificar que el componente sea válido
        if (typeof Component !== 'object' || !Component) {
          throw new Error(`Invalid component: ${Component}`);
        }

        // Verificar que el componente tenga render o setup
        if (!Component.render && !Component.setup && !Component.template) {
          console.warn(`[WARN] Component ${componentName} doesn't have render, setup, or template`);
        }

        // Extraer props de atributos data-*
        const props = {};
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          if (attr.name.startsWith('data-prop-')) {
            const propName = attr.name.replace('data-prop-', '');
            try {
              // Intentar parsear como JSON, si falla usar el valor directo
              props[propName] = JSON.parse(attr.value);
            } catch (e) {
              props[propName] = attr.value;
            }
          }
        }

        // Crea una nueva instancia de la aplicación Vue para el cliente
        // Usar createApp en lugar de createSSRApp para el cliente
        const app = createApp(Component, props);

        // Limpiar el contenido del elemento antes de montar
        // Esto asegura que Vue tenga control completo
        element.innerHTML = '';

        // Montar el componente en el elemento
        const instance = app.mount(element);

        console.log("hydrated:", componentName);
        console.log(`[DEBUG] Component mounted, instance:`, instance);
        
        // Verificar que el componente se montó correctamente
        if (!instance) {
          console.warn(`[WARN] Component ${componentName} mounted but instance is null`);
        }
      } catch (error) {
        console.error("Error hydrating component:", error);
      }
    };

    // Variable para rastrear si ya se hidrató este elemento
    let isHydrated = false;
    
    const doHydrate = async () => {
      if (isHydrated) {
        console.log(`[DEBUG] Component ${componentName} already hydrated, skipping`);
        return;
      }
      isHydrated = true;
      await hydrate();
    };

    switch (eventType) {
      case "load":
        // Para load, verificar si la página ya cargó
        if (document.readyState === 'complete') {
          // Si ya cargó, hidratar inmediatamente
          doHydrate();
        } else {
          // Si no, esperar al evento load
          window.addEventListener("load", doHydrate, { once: true });
        }
        break;
      case "click":
        // Para click, prevenir la propagación y solo hidratar una vez
        element.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          doHydrate();
        }, { once: true });
        break;
      case "mouseover":
        element.addEventListener("mouseover", doHydrate, { once: true });
        break;
      default:
        console.warn(`Unknown event type: ${eventType}`);
        break;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateComponents();
});
