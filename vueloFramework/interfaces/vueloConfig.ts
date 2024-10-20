export interface VueloConfig {
  port?: number;
  flavor?: "bun" | "deno" | "node";
  mode?: "SSR" | "SSRIslands" | "static";
}
