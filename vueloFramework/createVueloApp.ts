import { createSSRApp } from 'vue';

export function createVueloApp(path:string) {
  return createSSRApp({
    data: () => ({ path }),
    template: `<div><h1>Server Side Rendered Path: {{ path }}</h1></div>`,
  });
}
