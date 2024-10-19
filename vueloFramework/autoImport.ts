import { readdir } from "fs/promises";
import path from "path";

export async function getImports() {
  const pagesDir = path.resolve("src/pages");
  const islandsDir = path.resolve("src/islands");
  const componentsDir = path.resolve("src/components");

  const pages = await getFilesIfExists(pagesDir, ".vue");
  const islands = await getFilesIfExists(islandsDir, ".vue");
  const components = await getFilesIfExists(componentsDir, ".vue");

  const importMap = generateImportMap(pages, islands, components);
  return importMap;
}

async function getFilesIfExists(dir: string, ext: string) {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    const results: string[] = [];

    for (const file of files) {
      if (file.isDirectory()) {
        const subDirResults = await getFilesIfExists(
          path.join(dir, file.name),
          ext,
        );
        results.push(...subDirResults);
      } else if (file.isFile() && file.name.endsWith(ext)) {
        results.push(path.join(dir, file.name));
      }
    }

    return results;
  } catch (error) {
    // Si el directorio no existe, simplemente retorna un array vacío
    return [];
  }
}

async function getFiles(dir: string, ext: string) {
  const files = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      const subDirResults = await getFiles(path.join(dir, file.name), ext);
      results.push(...subDirResults);
    } else if (file.isFile() && file.name.endsWith(ext)) {
      results.push(path.join(dir, file.name));
    }
  }

  return results;
}

function generateImportMap(
  pages: string[],
  islands: string[],
  components: string[],
) {
  const pageImports = pages.map((page) => {
    const importName = path.basename(page, path.extname(page));
    return `import * as $${importName} from "${page}";`;
  });

  const islandImports = islands.map((island) => {
    const importName = path.basename(island, path.extname(island));
    return `import * as $${importName} from "${island}";`;
  });

  const componentsImports = components.map((island) => {
    const importName = path.basename(island, path.extname(island));
    return `import * as $${importName} from "${island}";`;
  });

  const manifest = {
    pages: pages.map((page) => {
      const name = path.basename(page, ".vue");
      let route = page.replace(/^.*\/pages\//, ""); // Remover la ruta hasta 'pages/'
      route = route.replace(/index\.vue$/, ""); // Eliminar 'index.vue'
      route = route.replace(/\.vue$/, ""); // Eliminar '.vue' de otros archivos
      route = route.endsWith("/") ? route.slice(0, -1) : route; // Eliminar barra final si existe
      route = `/${route}`; // Asegurar que empiece con '/'

      // Calcular la ruta relativa al directorio actual
      const relativePath = path.relative(__dirname, page);

      return {
        name,
        path: relativePath, // Aquí se usa la ruta relativa
        route,
      };
    }),
    islands: islands.map((island) => `${path.basename(island, ".vue")}`),
    components: components.map((component) =>
      `${path.basename(component, ".vue")}`
    ),
    baseUrl: import.meta.url,
  };

  return {
    imports: [...pageImports, ...islandImports, ...componentsImports],
    manifest,
  };
}

export async function pagesComponents(vite: any) {
  const routes = (await getImports()).manifest.pages;
  const components: { route: any; promise: Promise<any> }[] = []; // Almacena el objeto con la ruta y la promesa

  // Recopilar todas las promesas de los componentes junto con su ruta
  routes.forEach((componentRoute) => {
    components.push({
      route: componentRoute,
      promise: vite.ssrLoadModule(componentRoute.path.replace("..", "")),
    });
  });

  // Esperar a que todas las promesas se resuelvan
  const results = await Promise.all(components.map((c) => c.promise));

  // Combinar los resultados con sus rutas
  const componentsToImport = components.map((c, index) => ({
    route: c.route,
    component: { default: results[index].default }, // Asocia el componente resuelto con su ruta
  }));

  return componentsToImport;
}
