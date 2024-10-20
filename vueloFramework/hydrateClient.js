import {
    createApp,
    defineComponent,
    createSSRApp,
  } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
  
  export function hydrateComponents() {
    const elements = document.querySelectorAll("[data-hydrate]");
  
    elements.forEach(async (element) => {
      const componentName = element.getAttribute("data-hydrate");
      const eventType = element.getAttribute("data-hydrate-event");
  
      if (!componentName || !eventType) return;
  
      const hydrate = async () => {
        try {
          // Realizar la solicitud al servidor para obtener el código del componente
          const response = await fetch(
            `/api/islands/${componentName.toLowerCase()}`
          );
          if (!response.ok) throw new Error("Network response was not ok");
  
          const { template, script } = await response.json();
  
          // Define el componente a partir del código recibido
          const dynamicComponent = defineComponent({
            template: template,
            ...(new Function('Vue', `${script}; return { setup }`)(Vue)),
          });
  
          // Monta el componente en el elemento
          const app = createSSRApp(dynamicComponent);
          app.mount(element);
  
          console.log("hydrated:", componentName);
        } catch (error) {
          console.error("Error fetching component:", error);
        }
      };
  
      switch (eventType) {
        case "load":
          window.addEventListener("load", hydrate);
          break;
        case "click":
          element.addEventListener("click", hydrate);
          break;
        case "mouseover":
          element.addEventListener("mouseover", hydrate);
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
  