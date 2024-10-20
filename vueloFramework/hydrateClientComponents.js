import {
  createSSRApp,
  defineComponent,
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
          `/api/islands/${componentName.toLowerCase()}`,
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const componenteToHydrate = await response.json();

        // Define el componente a partir del código recibido
        const dynamicComponent = defineComponent({
          template: componenteToHydrate.template,
          ...eval(
            `(${componenteToHydrate.script.replace("export default ", "")})`,
          ),
        });

        // Crea una nueva instancia de la aplicación
        const app = createSSRApp(dynamicComponent);

        // Crea un nuevo elemento contenedor para el componente
        const newElement = document.createElement("div");

        // Monta el componente en el nuevo contenedor
        app.mount(newElement);

        // Reemplaza el elemento original con el nuevo contenedor
        element.replaceWith(newElement);

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
