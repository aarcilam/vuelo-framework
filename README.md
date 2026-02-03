# 🚀 Vuelo

**Vuelo** es un framework ágil y ligero que combina la magia de Vue con la
velocidad impresionante de Bun. Diseñado para aquellos desarrolladores que
quieren crear aplicaciones web interactivas y de alto rendimiento, Vuelo
transforma la codificación en una experiencia placentera, ¡como un vuelo suave
hacia el éxito!

## ¿Por qué Vuelo?

Porque tu código merece ser elevado a otro nivel. Aquí cada componente es un
pasajero feliz en un vuelo directo hacia la productividad.

1. **Amo Vue**: La reactividad de Vue es un superpoder que te permite crear
   interfaces interactivas sin sudar la gota gorda. Su sistema de componentes es
   tan intuitivo que te sentirás como un maestro de ceremonias en un espectáculo
   de fuegos artificiales.

2. **Velocidad del servidor de Bun**: Hablemos de velocidad: el servidor de Bun
   es **fast as f*ck**. Maneja miles de solicitudes por segundo como un ninja,
   todo mientras te mantiene en la zona de desarrollo.

3. **Simplicidad**: Vuelo combina lo mejor de Vue y la velocidad de Bun,
   permitiéndote enfocarte en lo que realmente importa: construir algo increíble
   sin complicaciones innecesarias.

4. **Estático desde 0**: Desde el principio, todas las páginas y componentes
   (excepto las futuras islas) son completamente estáticos. Tu servidor envía
   únicamente HTML al cliente, asegurando que tu aplicación despegue con
   velocidad y eficiencia.

5. **Autoimportación de rutas**: En Vuelo, la carpeta `pages` es tu puerta de
   embarque. Cada archivo en `pages` se convierte en una ruta automáticamente,
   así que solo colócalo y ¡bam!, ¡listo para volar!

## Funcionalidad de Islas

Vuelo admite la funcionalidad de islas, que permite que componentes individuales
se carguen de manera interactiva. Esta funcionalidad se activa mediante los
atributos `data-hydrate` y `data-hydrate-event`.

- **data-hydrate="Counter"**: Este atributo debe coincidir con el componente que
  se encargará de hidratarlo.
- **data-hydrate-event="load"**: Este atributo indica el evento que se utilizará
  para hidratar el componente.

Si no se incluyen estos atributos, el componente se renderizará de forma plana y
no aprovechará la funcionalidad de hidratación. Además, los componentes deben
ubicarse en la carpeta `islands` para que sean servidos y detectados por el
hidratador.

Es importante mencionar que los componentes deben ser de Vue 2, ya que son
montados por Vue en el front, en el contenedor donde estaba el componente
anterior.

Aquí tienes ejemplos de uso:

```html
<Counter></Counter>
<Counter data-hydrate="Counter" data-hydrate-event="load"></Counter>
<Counter data-hydrate="Counter" data-hydrate-event="click"></Counter>
<Counter data-hydrate="Counter" data-hydrate-event="mouseover"></Counter>
```

## Instalación como Paquete NPM

Para usar Vuelo Framework en tu proyecto, instálalo con tu gestor de paquetes preferido:

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

## Uso Rápido

Después de instalar, crea un archivo `index.ts` en la raíz de tu proyecto:

```typescript
import { vuelo } from "vuelo-framework";

const vueloServer = await vuelo({
  mode: 'SSRIslands',
  port: 3000
});

console.log("Vuelo running on " + vueloServer.url);
```

Y crea la estructura de carpetas:

```
tu-proyecto/
├── index.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── pages/        # Tus páginas aquí
    │   └── index.vue
    └── islands/      # Componentes interactivos aquí
        └── counter.vue
```

## Desarrollo Local

Si estás desarrollando el framework mismo, instala las dependencias:

```bash
bun install
```

Y ejecuta el proyecto de ejemplo:

```bash
bun run index.ts
```

## Carpeta `pages`

La carpeta `pages` es donde la magia sucede. Cada archivo que pongas aquí es
como un pasajero que llega justo a tiempo para abordar. No te preocupes por las
importaciones; simplemente añade tu archivo y deja que Vuelo haga el trabajo
pesado.

## Origen del Proyecto

Este proyecto fue creado usando `bun init` en bun v1.1.29. [Bun](https://bun.sh)
es un runtime de JavaScript que hace que tu código vuele más rápido que un jet
privado.

¡Gracias por elegir Vuelo! Esperamos que disfrutes del viaje tanto como nosotros
disfrutamos construirlo. ¡Feliz codificación! ✈️
