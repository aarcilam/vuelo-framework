# Ejemplo de Uso de Vuelo Framework

Este documento muestra cómo los usuarios pueden usar `vuelo-framework` después de instalarlo.

## Instalación

```bash
# Con npm
npm install vuelo-framework

# Con yarn
yarn add vuelo-framework

# Con pnpm
pnpm add vuelo-framework

# Con bun
bun add vuelo-framework
```

## Estructura del Proyecto del Usuario

Después de instalar el paquete, el usuario solo necesita crear esta estructura mínima:

```
mi-proyecto/
├── index.ts          # Punto de entrada
├── package.json
├── vite.config.ts    # Configuración de Vite (opcional, puede usar la del framework)
├── tsconfig.json     # Configuración de TypeScript
└── src/
    ├── pages/        # Páginas de la aplicación
    │   ├── index.vue
    │   ├── about.vue
    │   └── contact.vue
    └── islands/      # Componentes interactivos (Islands)
        ├── counter.vue
        ├── TodoList.vue
        └── ContactForm.vue
```

## Ejemplo de index.ts

```typescript
import { vuelo } from "vuelo-framework";

const vueloServer = await vuelo({
  mode: 'SSRIslands',
  port: 3000,
  flavor: 'bun'
});

console.log("Vuelo running on " + vueloServer.url);
```

## Ejemplo de package.json del Usuario

```json
{
  "name": "mi-proyecto-vuelo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch index.ts",
    "start": "bun run index.ts"
  },
  "dependencies": {
    "vuelo-framework": "^1.0.0",
    "vue": "^3.5.12"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "^5.0.0"
  }
}
```

## Ejemplo de vite.config.ts del Usuario

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["vue"],
  },
});
```

## Ejemplo de tsconfig.json del Usuario

```json
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Ejemplo de Página (src/pages/index.vue)

```vue
<template>
  <div>
    <h1>Bienvenido a Vuelo</h1>
    <p>Esta es la página principal</p>
    <Counter />
  </div>
</template>

<script setup>
import Counter from '../islands/counter.vue';
</script>
```

## Ejemplo de Island (src/islands/counter.vue)

```vue
<template>
  <div>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>
```

## Configuración Disponible

El método `vuelo()` acepta las siguientes opciones:

```typescript
interface VueloConfig {
  port?: number;           // Puerto del servidor (default: 9876)
  flavor?: "bun" | "deno" | "node";  // Runtime a usar (default: "bun")
  mode?: "SSR" | "SSRIslands" | "static";  // Modo de renderizado (default: "SSR")
}
```
