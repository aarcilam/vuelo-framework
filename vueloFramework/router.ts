import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../src/pages/index.vue"),
  },
  {
    path: "/welcome",
    component: () => import("../src/pages/about/index.vue"),
  },
];

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory("/")
      : createWebHistory("/"),
    routes,
  });
