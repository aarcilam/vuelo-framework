export function resolveRouteComponent(components: any[], url: string) {
  const route = components.find((c) => c.route.route === url); // Encuentra la ruta correspondiente
  if (!route) {
    return null; // Retornar null si no se encuentra la ruta
  }
  return route.component; // Retornar el componente si se encontró la ruta
}
