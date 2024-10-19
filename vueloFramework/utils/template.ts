import { readFileSync } from "fs";
import { resolve } from "path";
import { join } from "path";

function getTemplate() {
  let template;

  try {
    // Intenta leer el archivo index.html en la ruta especificada
    template = readFileSync(resolve("index.html"), "utf-8");
  } catch (error) {
    // Si no se encuentra, intenta leerlo desde la carpeta defaults
    try {
      const file = join(__dirname, "../defaults/index.html");
      template = readFileSync(file, "utf-8");
    } catch (error) {
      // Maneja el error si tampoco se encuentra el archivo en defaults
      console.error(
        "No se pudo encontrar el template en ninguna de las rutas especificadas.",
      );
      template = ""; // O alguna otra acción que desees realizar
    }
  }

  return template;
}

export default getTemplate;
