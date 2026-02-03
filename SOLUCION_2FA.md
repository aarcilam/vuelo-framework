# 🔐 Solución Rápida: Error de Autenticación 2FA en NPM

Si recibes este error al intentar publicar:
```
npm error 403 Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

## Solución Rápida (5 minutos)

### Opción 1: Habilitar 2FA (Recomendado)

1. **Ve a la configuración de tokens de NPM:**
   - Abre: https://www.npmjs.com/settings/[TU-USUARIO]/tokens
   - O ve a npmjs.com → Tu perfil → Access Tokens

2. **Habilita 2FA:**
   - Busca la sección "Two-Factor Authentication"
   - Haz clic en "Enable 2FA" o "Configure 2FA"
   - Escanea el código QR con una app como:
     - Google Authenticator
     - Authy
     - Microsoft Authenticator
   - Guarda los códigos de respaldo en un lugar seguro

3. **Vuelve a hacer login:**
   ```bash
   npm login
   ```
   Te pedirá tu código 2FA cuando sea necesario.

4. **Intenta publicar de nuevo:**
   ```bash
   npm publish
   ```

### Opción 2: Crear Token de Acceso Granular

Si prefieres no usar 2FA, puedes crear un token específico:

1. **Ve a crear un token:**
   - Abre: https://www.npmjs.com/settings/[TU-USUARIO]/tokens
   - Haz clic en "Generate New Token" → "Granular Access Token"

2. **Configura el token:**
   - **Token name**: `vuelo-framework-publish`
   - **Type**: Selecciona "Automation" o "Publish"
   - **Packages**: "All packages" (o el paquete específico)
   - **Permissions**: "Read and write"
   - **Expiration**: Elige una fecha (ej: 1 año)

3. **Copia el token** (solo se muestra una vez)

4. **Configura el token en tu terminal:**
   ```bash
   npm config set //registry.npmjs.org/:_authToken TU_TOKEN_AQUI
   ```
   
   O edita manualmente `~/.npmrc`:
   ```
   //registry.npmjs.org/:_authToken=TU_TOKEN_AQUI
   ```

5. **Verifica que esté configurado:**
   ```bash
   npm config get //registry.npmjs.org/:_authToken
   ```
   Debería mostrar tu token (parcialmente oculto).

6. **Intenta publicar de nuevo:**
   ```bash
   npm publish
   ```

## Verificar tu Configuración Actual

Para verificar si ya tienes 2FA habilitado o un token configurado:

```bash
# Verificar si estás logueado
npm whoami

# Verificar configuración de autenticación
npm config get //registry.npmjs.org/:_authToken

# Ver toda la configuración de npm
npm config list
```

## ¿Por qué NPM requiere esto?

NPM implementó esta política de seguridad para proteger los paquetes publicados y prevenir:
- Publicaciones no autorizadas
- Ataques a cuentas comprometidas
- Modificaciones maliciosas de paquetes

Es una medida de seguridad importante que protege tanto a los mantenedores como a los usuarios.

## ¿Necesitas más ayuda?

- Documentación oficial de NPM sobre 2FA: https://docs.npmjs.com/configuring-two-factor-authentication
- Documentación sobre tokens: https://docs.npmjs.com/about-access-tokens
- Guía completa de publicación: Ver `PUBLISH_GUIDE.md`
