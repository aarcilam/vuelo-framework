export function resolveRouteComponent(components: any[], url: URL) {
  const route = components.find((c) => c.route.route === url.pathname); // Encuentra la ruta correspondiente
  if (!route) {
    return null; // Retornar null si no se encuentra la ruta
  }
  return route.component; // Retornar el componente si se encontró la ruta
}
