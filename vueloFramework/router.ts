import { getImports } from "./autoImport";

export async function resolveRouteComponent(vite:any,url:string) {
    const routes = (await getImports()).manifest.pages;
    // console.log(url,routes)
    const { default: App } = await vite.ssrLoadModule("/src/pages/index.vue");

    return App;
}
