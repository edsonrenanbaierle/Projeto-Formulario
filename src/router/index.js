import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import baseLayout from "@/layouts/baseLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "home",
        path: "",
        component: () => import("../views/HomeView.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/checkout",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "checkoutResume",
        path: "",
        component: () => import("../views/cart/Cart.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/products",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "products",
        path: "",
        component: () => import("../views/products/Products.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/relatorio-pedidos",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "relatorio-pedidos",
        path: "",
        component: () => import("../views/relatorios/Pedidos-relatorio.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () => import("../views/errorPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let isNavigating = false;

router.beforeEach((to, from, next) => {
  if (isNavigating) {
    // Evita a navegação duplicada
    return;
  }

  isNavigating = true;
  next();
});

router.afterEach(() => {
  isNavigating = false;
});
export default router;
