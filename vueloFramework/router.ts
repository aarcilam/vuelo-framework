import { getImports } from "./autoImport";

export async function resolveRouteComponent(vite: any, url: string) {
  const routes = (await getImports()).manifest.pages;
  const componentRoute = routes.find((route) => route.route === url);
  const { default: App } = await vite.ssrLoadModule(componentRoute?.path.replace("..",""));

  return App;
}
