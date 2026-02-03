# Guía para Publicar Vuelo Framework en NPM

Esta guía explica cómo publicar `vuelo-framework` como un paquete npm para que otros desarrolladores puedan instalarlo y usarlo.

## Prerrequisitos

1. **Cuenta de NPM**: Crea una cuenta en [npmjs.com](https://www.npmjs.com/) si no tienes una.

2. **Iniciar sesión en NPM**: Desde la terminal, ejecuta:
   ```bash
   npm login
   ```

3. **Verificar nombre del paquete**: Asegúrate de que el nombre `vuelo-framework` esté disponible en npm. Si no lo está, cambia el nombre en `package.json`.

## Pasos para Publicar

### 1. Preparar el Proyecto

Asegúrate de que tu `package.json` esté correctamente configurado:

- ✅ `name`: Nombre único del paquete
- ✅ `version`: Versión semántica (ej: "1.0.0")
- ✅ `description`: Descripción clara del paquete
- ✅ `main`: Punto de entrada principal
- ✅ `types`: Archivos de definición TypeScript
- ✅ `files`: Qué archivos incluir en el paquete
- ✅ `exports`: Exportaciones del módulo

### 2. Verificar Archivos a Publicar

El archivo `.npmignore` controla qué archivos NO se incluirán en el paquete publicado. Por defecto, incluirá:
- ✅ `vueloFramework/` (todo el código del framework)
- ✅ `README.md`
- ✅ `LICENSE` (si existe)

NO incluirá:
- ❌ `src/` (código del usuario)
- ❌ `index.ts` (archivo del usuario)
- ❌ `node_modules/`
- ❌ Archivos de configuración del usuario

### 3. Verificar la Versión

Antes de publicar, verifica que la versión en `package.json` sea la correcta:

```bash
npm version patch  # Para 1.0.0 -> 1.0.1 (cambios menores)
npm version minor  # Para 1.0.0 -> 1.1.0 (nuevas características)
npm version major  # Para 1.0.0 -> 2.0.0 (cambios incompatibles)
```

O edita manualmente el campo `version` en `package.json`.

### 4. Publicar el Paquete

Para publicar por primera vez:

```bash
npm publish
```

Para publicar una versión beta o de prueba:

```bash
npm publish --tag beta
```

Para publicar como paquete privado (requiere cuenta de pago):

```bash
npm publish --access restricted
```

### 5. Verificar la Publicación

Después de publicar, verifica que el paquete esté disponible:

```bash
npm view vuelo-framework
```

O visita: `https://www.npmjs.com/package/vuelo-framework`

## Actualizar el Paquete

Para publicar una nueva versión:

1. Haz los cambios necesarios en el código
2. Actualiza la versión:
   ```bash
   npm version patch  # o minor, o major
   ```
3. Publica la nueva versión:
   ```bash
   npm publish
   ```

## Estructura del Paquete Publicado

Cuando alguien instala `vuelo-framework`, recibirá:

```
node_modules/vuelo-framework/
├── vueloFramework/
│   ├── server.ts (o .js si compilas)
│   ├── app.ts
│   ├── router.ts
│   ├── autoImport.ts
│   ├── createVueloApp.ts
│   ├── defaults/
│   │   ├── App.vue
│   │   └── index.html
│   ├── interfaces/
│   │   └── vueloConfig.ts
│   ├── servers/
│   │   └── bun.ts
│   └── utils/
│       ├── compile.ts
│       └── template.ts
├── package.json
└── README.md
```

## Notas Importantes

### TypeScript en el Paquete

Actualmente, el paquete incluye archivos `.ts` directamente. Esto funciona bien con:
- **Bun**: Soporta TypeScript nativamente
- **Vite**: Puede procesar TypeScript directamente
- **ts-node**: Para proyectos Node.js

Si necesitas soportar entornos que no procesan TypeScript, deberías:
1. Compilar el código a JavaScript
2. Generar archivos `.d.ts` para TypeScript
3. Actualizar `package.json` para apuntar a los archivos `.js`

### Dependencias

Las dependencias en `dependencies` se instalarán automáticamente cuando alguien instale tu paquete. Las dependencias en `peerDependencies` deben ser instaladas por el usuario.

### Scope de NPM (Opcional)

Si quieres publicar bajo un scope (ej: `@tu-usuario/vuelo-framework`):

1. Cambia el nombre en `package.json`:
   ```json
   {
     "name": "@tu-usuario/vuelo-framework"
   }
   ```

2. Publica con acceso público:
   ```bash
   npm publish --access public
   ```

## Ejemplo de Uso por Parte del Usuario

Después de publicar, los usuarios pueden usar tu paquete así:

```bash
# Instalar
npm install vuelo-framework

# Crear index.ts
echo 'import { vuelo } from "vuelo-framework";
const server = await vuelo({ mode: "SSRIslands" });
console.log("Running on", server.url);' > index.ts

# Crear estructura
mkdir -p src/pages src/islands

# Ejecutar
bun run index.ts
```

## Troubleshooting

### Error: "Package name already exists"
- El nombre ya está tomado. Cambia el nombre en `package.json`.

### Error: "You must verify your email"
- Verifica tu email en npmjs.com antes de publicar.

### Error: "Insufficient permissions"
- Asegúrate de estar logueado con `npm login`.
- Si el paquete ya existe, necesitas ser el propietario o colaborador.

### El paquete se publica pero no funciona
- Verifica que los archivos en `files` existan.
- Verifica que los `exports` en `package.json` sean correctos.
- Asegúrate de que las rutas de importación sean correctas.
