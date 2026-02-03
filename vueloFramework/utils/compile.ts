import type { ViteDevServer } from "vite";
import fs from "fs";
import path from "path";

// Función para compilar un componente Vue usando Vite para el cliente
export async function compileVueComponent(
  vite: ViteDevServer,
  filePath: string,
): Promise<string> {
  // Usar transformRequest en lugar de pluginContainer.transform
  // transformRequest maneja mejor la optimización de dependencias y evita errores ERR_OUTDATED_OPTIMIZED_DEP
  const moduleId = `/@fs/${filePath}`;
  
  // Usar transformRequest que maneja automáticamente la optimización de dependencias
  // y evita el error ERR_OUTDATED_OPTIMIZED_DEP
  let result;
  try {
    result = await vite.transformRequest(moduleId, { ssr: false });
  } catch (error: any) {
    // Si transformRequest falla, intentar con pluginContainer como fallback
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const resolved = await vite.pluginContainer.resolveId(moduleId);
    const id = resolved?.id || moduleId;
    result = await vite.pluginContainer.transform(fileContent, id, { ssr: false });
  }
  
  if (!result || !result.code) {
    throw new Error(`Failed to transform component at ${filePath}`);
  }
  
  let code = result.code;
  
  // Reemplazar imports de Vite HMR (no necesarios en el cliente)
  code = code.replace(
    /import\s+.*from\s+['"]\/@vite\/client['"];?/g,
    '// HMR removed for client'
  );
  code = code.replace(
    /import\.meta\.hot\s*=.*;?/g,
    '// HMR removed for client'
  );
  
  // Reemplazar TODOS los imports de vue desde node_modules/.vite/deps/ con el CDN
  // Esto incluye imports con query strings como ?v=c407c0a3
  code = code.replace(
    /from\s+['"]\/node_modules\/\.vite\/deps\/vue\.js[^'"]*['"]/g,
    'from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"'
  );
  
  // Reemplazar imports de 'vue' para usar el CDN
  code = code.replace(
    /from\s+['"]vue['"]/g,
    'from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"'
  );
  
  // Verificar si el código usa funciones de Vue pero no tiene imports válidos
  // Si usa ref, reactive, etc. sin import, necesitamos agregarlo
  const usesRef = /\bref\s*\(/.test(code);
  const hasValidVueImport = /import\s+.*\{[^}]*ref[^}]*\}\s+from\s+['"]https:\/\/unpkg\.com\/vue@3\/dist\/vue\.esm-browser\.prod\.js['"]/.test(code) ||
                             /import\s+\*\s+as\s+Vue\s+from\s+['"]https:\/\/unpkg\.com\/vue@3\/dist\/vue\.esm-browser\.prod\.js['"]/.test(code);
  
  if (usesRef && !hasValidVueImport) {
    // Agregar import de ref y otras funciones comunes de Vue al inicio
    // Primero, encontrar qué funciones de Vue se están usando
    const vueImports = [];
    if (/\bref\s*\(/.test(code)) vueImports.push('ref');
    if (/\breactive\s*\(/.test(code)) vueImports.push('reactive');
    if (/\bcomputed\s*\(/.test(code)) vueImports.push('computed');
    if (/\bwatch\s*\(/.test(code)) vueImports.push('watch');
    
    // Agregar el import al inicio del código
    if (vueImports.length > 0) {
      code = `import { ${vueImports.join(', ')} } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";\n${code}`;
    }
  }
  
  // Reemplazar imports relativos con rutas absolutas usando /@fs/
  // Esto permite que Vite resuelva los imports cuando se sirven
  code = code.replace(
    /from\s+['"]\.\/([^'"]+)['"]/g,
    (match, importPath) => {
      const resolvedPath = path.resolve(path.dirname(filePath), importPath);
      return `from "/@fs/${resolvedPath}"`;
    }
  );
  
  // También manejar imports de '../'
  code = code.replace(
    /from\s+['"]\.\.\/([^'"]+)['"]/g,
    (match, importPath) => {
      const resolvedPath = path.resolve(path.dirname(filePath), "..", importPath);
      return `from "/@fs/${resolvedPath}"`;
    }
  );
  
  // Asegurarse de que el componente se exporte como default
  // El código compilado crea _sfc_main, necesitamos exportarlo
  if (code.includes('const _sfc_main') || code.includes('var _sfc_main')) {
    // Buscar si ya hay un export default
    if (!code.match(/export\s+default\s+_sfc_main/)) {
      // Agregar el export al final del código
      code += '\nexport default _sfc_main;';
    }
  }
  
  // Asegurarse de que el código exporte el componente correctamente
  // El código compilado por Vite para SFC con <script setup> ya debería tener export default
  // Pero verificamos que esté presente
  if (!code.includes('export default') && !code.includes('export {')) {
    console.warn(`[WARN] Compiled code for ${filePath} doesn't seem to have exports`);
  }
  
  // Eliminar código de HMR que no funciona en el cliente
  code = code.replace(/if\s*\(import\.meta\.hot\)\s*\{[\s\S]*?\}/g, '// HMR removed');
  code = code.replace(/__VUE_HMR_RUNTIME__[^}]*\}/g, '// HMR removed');
  code = code.replace(/typeof\s+[^=]*=\s*mod[\s\S]*?\}/g, '// HMR removed');
  code = code.replace(/_sfc_main\.__hmrId\s*=\s*[^;]+;?/g, '// HMR removed');
  
  // Eliminar import de _export_sfc que no funciona en el cliente
  code = code.replace(/import\s+_export_sfc\s+from\s+['"][^'"]*export-helper['"];?/g, '');
  
  // Buscar la función render (probablemente _sfc_render)
  const renderMatch = code.match(/function\s+(_sfc_render[^\s(]*)\s*\(/);
  if (renderMatch) {
    const renderFnName = renderMatch[1];
    
    // Primero, eliminar cualquier asignación incorrecta que esté dentro del setup
    code = code.replace(/_sfc_main\.render\s*=\s*_sfc_render\s*;?\s*\n/g, '');
    
    // Buscar donde termina la definición de _sfc_main (el cierre del objeto, no del setup)
    // El patrón es: const _sfc_main = { setup(...) { ... } } seguido de un salto de línea o import
    // Necesitamos encontrar el cierre del objeto _sfc_main, no el cierre de setup
    const sfcMainEndMatch = code.match(/(const _sfc_main = \{[\s\S]*?setup\([^)]*\)\s*\{[\s\S]*?\}\s*\n\})\s*(?=\n|import|function|const|let|var|export)/);
    
    if (sfcMainEndMatch) {
      // Insertar la asignación del render justo después de la definición completa de _sfc_main
      code = code.replace(sfcMainEndMatch[0], sfcMainEndMatch[1] + `\n_sfc_main.render = ${renderFnName};\n`);
    } else {
      // Fallback: buscar el patrón más simple - después del cierre del objeto _sfc_main
      // Buscar: const _sfc_main = { ... } seguido de algo que no sea parte del objeto
      const simpleMatch = code.match(/(const _sfc_main = \{[\s\S]*?\n\})\s*(?=\n|import|function|const|let|var|export)/);
      if (simpleMatch) {
        code = code.replace(simpleMatch[0], simpleMatch[1] + `\n_sfc_main.render = ${renderFnName};\n`);
      }
    }
  }
  
  // Reemplazar _export_sfc con asignación directa del render si existe
  const exportSfcMatch = code.match(/export\s+default\s+[^_]*_export_sfc\s*\(\s*_sfc_main\s*,\s*\[\s*\[\s*['"]render['"]\s*,\s*([^,\]]+)\s*\]/);
  if (exportSfcMatch) {
    const renderFnName = exportSfcMatch[1].trim();
    // Asignar el render directamente a _sfc_main si no está ya asignado
    if (!code.includes('_sfc_main.render =')) {
      code = code.replace(/(const _sfc_main = \{[\s\S]*?\n\})\s*/, (match) => {
        return match + `\n_sfc_main.render = ${renderFnName};\n`;
      });
    }
    // Eliminar el export con _export_sfc
    code = code.replace(/export\s+default\s+[^_]*_export_sfc\s*\([^)]+\)/, '');
  }
  
  // Eliminar todos los export default existentes
  code = code.replace(/export\s+default\s+[^;]+;?\s*/g, '');
  
  // Agregar un solo export default de _sfc_main al final
  if (code.includes('_sfc_main')) {
    code += '\nexport default _sfc_main;';
  }
  
  // Log para depuración (mostrar más caracteres para ver el template)
  console.log(`[DEBUG compile] Compiled code preview (first 1000 chars):`, code.substring(0, 1000));
  console.log(`[DEBUG compile] Code length: ${code.length}`);
  console.log(`[DEBUG compile] Has export default: ${code.includes('export default')}`);
  console.log(`[DEBUG compile] Has _sfc_main: ${code.includes('_sfc_main')}`);
  console.log(`[DEBUG compile] Has _sfc_main.render: ${code.includes('_sfc_main.render')}`);
  console.log(`[DEBUG compile] Last 500 chars:`, code.substring(code.length - 500));
  
  return code;
}
