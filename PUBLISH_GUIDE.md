# Guía para Publicar Vuelo Framework en NPM

Esta guía explica cómo publicar `vuelo-framework` como un paquete npm para que otros desarrolladores puedan instalarlo y usarlo.

## Prerrequisitos

1. **Cuenta de NPM**: Crea una cuenta en [npmjs.com](https://www.npmjs.com/) si no tienes una.

2. **Iniciar sesión en NPM**: Desde la terminal, ejecuta:
   ```bash
   npm login
   ```

3. **Verificar nombre del paquete**: Asegúrate de que el nombre `vuelo-framework` esté disponible en npm. Si no lo está, cambia el nombre en `package.json`.

4. **Configurar Autenticación de Dos Factores (2FA)**: NPM requiere 2FA o un token de acceso granular para publicar paquetes. Tienes dos opciones:

   **Opción A: Habilitar 2FA en tu cuenta de NPM (Recomendado)**
   
   1. Ve a [npmjs.com](https://www.npmjs.com/) e inicia sesión
   2. Ve a tu perfil → "Access Tokens" o directamente a: https://www.npmjs.com/settings/[tu-usuario]/tokens
   3. Haz clic en "Enable 2FA" o "Configure 2FA"
   4. Sigue las instrucciones para configurar 2FA usando una app como Google Authenticator o Authy
   5. Una vez configurado, vuelve a hacer login:
      ```bash
      npm login
      ```
      Te pedirá el código de 2FA cuando sea necesario.

   **Opción B: Crear un Token de Acceso Granular (Alternativa)**
   
   1. Ve a https://www.npmjs.com/settings/[tu-usuario]/tokens
   2. Haz clic en "Generate New Token" → "Granular Access Token"
   3. Configura el token:
      - **Token name**: `vuelo-framework-publish` (o el nombre que prefieras)
      - **Expiration**: Elige una fecha de expiración
      - **Type**: Selecciona "Automation" o "Publish"
      - **Packages**: Selecciona "All packages" o el paquete específico
      - **Permissions**: Marca "Read and write" para publicación
   4. Copia el token generado (solo se muestra una vez)
   5. Configura el token en tu terminal:
      ```bash
      npm config set //registry.npmjs.org/:_authToken TU_TOKEN_AQUI
      ```
      O crea/edita el archivo `~/.npmrc` y agrega:
      ```
      //registry.npmjs.org/:_authToken=TU_TOKEN_AQUI
      ```

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

### Error: "Two-factor authentication or granular access token required"
Este es el error más común al intentar publicar. NPM requiere 2FA para publicar paquetes por seguridad.

**Solución rápida:**
1. Ve a https://www.npmjs.com/settings/[tu-usuario]/tokens
2. Habilita 2FA siguiendo las instrucciones
3. O crea un token granular con permisos de publicación (ver sección de Prerrequisitos)
4. Vuelve a intentar `npm publish`

**Si usas un token:**
```bash
# Verifica que el token esté configurado
npm config get //registry.npmjs.org/:_authToken

# Si no está configurado, configúralo
npm config set //registry.npmjs.org/:_authToken TU_TOKEN
```

### Error: "Package name already exists"
- El nombre ya está tomado. Cambia el nombre en `package.json`.
- Puedes usar un scope: `@tu-usuario/vuelo-framework`

### Error: "You must verify your email"
- Verifica tu email en npmjs.com antes de publicar.
- Revisa tu bandeja de entrada (y spam) para el email de verificación.

### Error: "Insufficient permissions"
- Asegúrate de estar logueado con `npm login`.
- Si el paquete ya existe, necesitas ser el propietario o colaborador.
- Verifica que tu token tenga los permisos correctos.

### El paquete se publica pero no funciona
- Verifica que los archivos en `files` existan.
- Verifica que los `exports` en `package.json` sean correctos.
- Asegúrate de que las rutas de importación sean correctas.
- Prueba instalarlo en un proyecto nuevo: `npm install vuelo-framework`
