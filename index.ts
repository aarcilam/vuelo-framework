import { start, type VueloConfig } from "./vueloFramework/server";

const config:VueloConfig = {}
start(config)

console.log("vuelo running: http://localhost:3000/");

