export function createIslandRoutes(vite: any, url: URL, islands: any[]) {
  islands.forEach((island) => {
    const name = "/api/islands/" + island.name;
    console.log(url.pathname, name);

    if (url.pathname == name) return new Response(name);
  });
}
