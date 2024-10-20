import { compileTemplate, parse } from "@vue/compiler-sfc";

// Función para compilar un componente Vue
export async function compileVueComponent(source: any) {
  const parced = parse(source);
  console.log(source, parced);

  if (!parced.descriptor.script) {
    throw new Error("No script found in the component");
  }

  const scriptContent = parced.descriptor.script.content;

  return {
    template: parced.descriptor.template?.content,
    script: scriptContent,
  };
}
