import { vuelo } from "./vueloFramework/server";

const vueloServer = await vuelo({
    mode:'SSRIslands'
});

console.log("Vuelo running on " + vueloServer.url);