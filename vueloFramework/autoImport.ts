import { readdir } from 'fs/promises';
import path from 'path';

export async function getImports() {
  const pagesDir = path.resolve('src/pages');
  const islandsDir = path.resolve('src/islands');
  const componentsDir = path.resolve('src/components');

  const pages = await getFilesIfExists(pagesDir, '.vue');
  const islands = await getFilesIfExists(islandsDir, '.vue');
  const components = await getFilesIfExists(componentsDir, '.vue');

  const importMap = generateImportMap(pages, islands, components);
  return importMap;
}

async function getFilesIfExists(dir: string, ext: string) {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    const results: string[] = [];

    for (const file of files) {
      if (file.isDirectory()) {
        const subDirResults = await getFilesIfExists(path.join(dir, file.name), ext);
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

function generateImportMap(pages: string[], islands: string[], components: string[]) {
  const routeImports = pages.map(route => {
    const importName = path.basename(route, path.extname(route));
    return `import * as $${importName} from "${route}";`;
  });

  const islandImports = islands.map(island => {
    const importName = path.basename(island, path.extname(island));
    return `import * as $${importName} from "${island}";`;
  });

  const componentsImports = components.map(island => {
    const importName = path.basename(island, path.extname(island));
    return `import * as $${importName} from "${island}";`;
  });

  const manifest = {
    pages: Object.fromEntries(pages.map(route => [route, `$${path.basename(route, '.tsx')}`])),
    islands: Object.fromEntries(islands.map(island => [island, `$${path.basename(island, '.tsx')}`])),
    components: Object.fromEntries(components.map(component => [component, `$${path.basename(component, '.tsx')}`])),
    baseUrl: import.meta.url,
  };

  return {
    imports: [...routeImports, ...islandImports, ...componentsImports],
    manifest,
  };
}
